# 🖥️ Upload Arquivos UI

![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-7.2-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

> Frontend Angular de estudo para upload de arquivos individuais e em lote com feedback visual de progresso integrado ao microservico upload-arquivos-api

---

## 📋 Tópicos

`angular` `typescript` `upload` `file-upload` `bootstrap` `standalone-components` `signals` `rxjs` `drag-and-drop` `frontend` `study-project`

---

## 🚀 Funcionalidades

- Upload de **arquivo único** com drag and drop
- Upload de **múltiplos arquivos** em lote com drag and drop
- **Validação** de campos antes do envio
- Exibição da **URL gerada** pelo MinIO com botão de cópia
- **Toasts** de feedback para sucesso e erro
- **Spinner** de loading durante o envio
- Criação do bucket informado pelo usuário de forma **automática e transparente**
- Layout responsivo com **Bootstrap 5**

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Angular | 20 | Framework principal |
| TypeScript | 5.9 | Linguagem principal |
| Bootstrap | 5.3 | Estilização e layout |
| Font Awesome | 7.2 | Ícones |
| RxJS | 7.8 | Requisições HTTP reativas |

---

## ⚙️ Configuração

### Ambientes

**`src/environments/environment.ts`** — desenvolvimento local:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1/upload'
};
```

**`src/environments/environment.prod.ts`** — produção:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://sua-api.com/api/v1/upload'
};
```

---

## ▶️ Como executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/upload-arquivos-ui.git

# Acesse a pasta
cd upload-arquivos-ui

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

Acesse em `http://localhost:4200`

> **Pré-requisito:** o microserviço [upload-arquivos-api](https://github.com/seu-usuario/upload-arquivos-api) deve estar em execução.

---

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── footer/          # Componente de rodapé
│   ├── services/
│   │   └── upload.ts    # Service HTTP para comunicação com a API
│   ├── upload/          # Componente principal de upload
│   ├── app.ts
│   ├── app.html
│   └── app.config.ts
├── environments/        # Configuração por ambiente
├── styles.css           # Variáveis CSS globais e reset
└── index.html
```

---

## 🔮 Melhorias Futuras

- [ ] **Barra de progresso real** — exibir percentual do upload via `HttpClient` com `reportProgress: true`
- [ ] **Validação de tipo e tamanho** — restringir extensões e tamanho máximo no próprio frontend antes do envio
- [ ] **Preview de imagens** — exibir thumbnail ao selecionar arquivos de imagem
- [ ] **Testes unitários** — cobertura dos componentes e do service com Jasmine/Karma
- [ ] **Feedback por arquivo no lote** — exibir status individual de cada arquivo no upload em lote
- [ ] **Internacionalização (i18n)** — suporte a múltiplos idiomas com Angular i18n
- [ ] **PWA** — transformar a aplicação em Progressive Web App para uso offline
- [ ] **Dark mode** — alternar entre tema claro e escuro com variáveis CSS

---

## 👨‍💻 Autor

Feito por **cesaravb** — projeto de estudo sobre upload de arquivos com Angular e MinIO.
