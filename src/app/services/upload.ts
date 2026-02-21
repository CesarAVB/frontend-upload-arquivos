import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UploadResponse {
  nomeArquivo: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadArquivo(bucket: string, file: File): Observable<UploadResponse> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/${bucket}/arquivo`, form);
  }

  uploadLote(bucket: string, files: File[]): Observable<UploadResponse[]> {
    const form = new FormData();
    files.forEach(f => form.append('files', f));
    return this.http.post<UploadResponse[]>(`${this.apiUrl}/${bucket}/arquivos`, form);
  }
}