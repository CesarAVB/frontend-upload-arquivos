import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService, UploadResponse } from '../services/upload';

type TabType = 'single' | 'batch';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class UploadComponent {
  activeTab = signal<TabType>('single');

  bucket = '';
  singleFile: File | null = null;
  batchFiles: File[] = [];
  loading = false;
  submitted = false;
  errorMsg = '';
  results: UploadResponse[] = [];
  isDragging = false;
  // Toasts
  toasts: { id: number; type: 'success' | 'error'; message: string }[] = [];
  private nextToastId = 1;

  constructor(private uploadService: UploadService) {}

  onSingleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.singleFile = input.files[0];
  }

  onBatchFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const incoming = Array.from(input.files);
      const existing = this.batchFiles.map(f => f.name);
      incoming.forEach(f => { if (!existing.includes(f.name)) this.batchFiles.push(f); });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDropSingle(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.singleFile = file;
  }

  onDropBatch(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = Array.from(event.dataTransfer?.files ?? []);
    const existing = this.batchFiles.map(f => f.name);
    files.forEach(f => { if (!existing.includes(f.name)) this.batchFiles.push(f); });
  }

  removeSingle(event: Event) {
    event.stopPropagation();
    this.singleFile = null;
  }

  removeBatchFile(index: number, event: Event) {
    event.stopPropagation();
    this.batchFiles.splice(index, 1);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  copyUrl(url: string) {
    navigator.clipboard.writeText(url);
  }

  submit() {
    this.submitted = true; // Marca como enviado para mostrar mensagens de validação
    this.errorMsg = ''; // Limpa mensagens de erro anteriores
    this.results = [];  // Limpa resultados anteriores
    this.bucket = this.bucket.toLowerCase().trim(); // Normaliza o nome do bucket

    const isSingle = this.activeTab() === 'single';

    if (!this.bucket) return;
    if (isSingle && !this.singleFile) return;
    if (!isSingle && this.batchFiles.length === 0) return;

    this.loading = true;

    if (isSingle) {
      this.uploadService.uploadArquivo(this.bucket, this.singleFile!).subscribe({
        next: (res) => {
          this.results = [res];
          this.singleFile = null;
          this.submitted = false;
          this.loading = false;
          const msg = res?.nomeArquivo ? `Arquivo ${res.nomeArquivo} enviado com sucesso!` : 'Arquivo enviado com sucesso!';
          this.showToast('success', msg);
        },
        error: (err) => {
          this.errorMsg = err?.error?.message ?? 'Erro ao enviar o arquivo. Verifique o servidor.';
          this.loading = false;
          this.showToast('error', this.errorMsg);
        }
      });
    } else {
      this.uploadService.uploadLote(this.bucket, this.batchFiles).subscribe({
        next: (res) => {
          this.results = res;
          this.batchFiles = [];
          this.submitted = false;
          this.loading = false;
          const count = Array.isArray(res) ? res.length : 0;
          const msg = count > 0 ? `${count} arquivo(s) enviados com sucesso!` : 'Arquivos enviados com sucesso!';
          this.showToast('success', msg);
        },
        error: (err) => {
          this.errorMsg = err?.error?.message ?? 'Erro ao enviar os arquivos. Verifique o servidor.';
          this.loading = false;
          this.showToast('error', this.errorMsg);
        }
      });
    }
  }

  showToast(type: 'success' | 'error', message: string, timeout = 4000) {
    const id = this.nextToastId++;
    this.toasts.push({ id, type, message });
    if (timeout > 0) {
      setTimeout(() => this.dismissToast(id), timeout);
    }
  }

  dismissToast(id: number) {
    const idx = this.toasts.findIndex(t => t.id === id);
    if (idx >= 0) this.toasts.splice(idx, 1);
  }
}