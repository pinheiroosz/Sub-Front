# Catálogo de Filmes - PapagaioFlix



## Funcionalidades
- Listagem de filmes com pôster, título e ano
- Adicionar novo filme (CRUD)
- Editar filme existente
- Excluir filme
- Feedback visual com react-toastify
- Layout responsivo e visual moderno

## Tecnologias Utilizadas
- [Next.js](https://nextjs.org/) (React + SSR)
- [TypeScript](https://www.typescriptlang.org/)
- [JSON-Server](https://github.com/typicode/json-server) (API fake)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

## Como rodar o projeto

### 1. Instale as dependências
```cmd
npm install
```

### 2. Inicie o JSON-Server (API fake)
```cmd
npx json-server --watch db.json --port 3001
```
Acesse os dados da API em: [http://localhost:3001/filmes](http://localhost:3001/filmes)

### 3. Inicie o projeto Next.js
```cmd
npm run dev
```
Acesse a aplicação em: [http://localhost:3000/catalogo](http://localhost:3000/catalogo)

## Estrutura esperada do db.json
```json
{
  "filmes": [
    {
      "id": 1,
      "titulo": "Interestelar",
      "ano": 2014,
      "poster": "https://cinemaeargumento.com/wp-content/uploads/2014/11/interstellarposter.jpg?w=584"
    }
  ]
}
```


## Dicas
- Para editar/excluir, use os botões nos cards dos filmes.
- O feedback de sucesso aparece no topo da tela.
- O layout é responsivo e funciona em desktop e mobile.

## Scripts úteis
- `npm run dev` — inicia o Next.js
- `npx json-server --watch db.json --port 3001` — inicia o backend fake

---


