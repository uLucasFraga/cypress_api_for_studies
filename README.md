# CYPRESS API FOR STUDIES
-----------------------

[![SERVREST API](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/PauloGoncalvesBH/ServeRest/)
[![CONTINUOUS INTEGRATIONS](https://github.com/uLucasFraga/cypress_api_for_studies/actions/workflows/dev.yml/badge.svg?branch=main)](https://github.com/uLucasFraga/cypress_api_for_studies/actions/workflows/dev.yml)
[![CODE QUALITY](https://www.code-inspector.com/project/21255/score/svg)](https://frontend.code-inspector.com/public/project/21255/cypress_api_for_studies/dashboard)


Repositório com exemplos de testes automatizados para API Rest utilizando os frameworks e lib:
- cypress
- mocha

A web evoluiu. Finalmente, o teste também.
Testes rápidos, fáceis e confiáveis para qualquer coisa que seja executada em um navegador.

> O **Cypress** veio para realizar testes rápidos, fáceis e confiáveis: [CONHECER CYPRESS](https://github.com/cypress-io/cypress)

**Nota:** Incluída a lib **Mocha** para uma estrutura de teste (JS) simples, flexível e divertida.
[CONHECER MOCHA](https://github.com/mochajs/mocha)

-----------------------

## Tabela de contexto

> Índice `README`.

  - [Pré Requisitos](#pré-requisitos)
  - [Configuração](#configuração)
  - [Instalação](#instalação)
  - [Como Testar](#como-testar)
  - [Reporte](#report)
  - [Suporte](#suporte)
  - [Licença](#licença)

-----------------------

### Pré Requisitos

- [node e npm](https://nodejs.org/en/)
- [vscode ou outra IDE](https://code.visualstudio.com/download)
- [cypress](https://www.cypress.io/)

-----------------------

### Configuração

- Criar um arquivo na raiz do projeto chamado _cypress.env.json_ e incluir os seguintes dados:

```
{
    "EMAIL": "email@valido.com",
    "PASSWORD": "senha_valida"
}
```

**Nota Importante:** Isso foi feito para simular uma possível _"não exposição"_ para o tratamento quanto a dados sensíveis. Porém, coloquei os dados no README para facilitar a todos.

O arquivo **_cypress.env.json_** neste projeto, encontra-se no _.gitignore_. Logo, faz-se necessário cria-lo assim que baixar. Há um arquivo chamado **_.cypress.env.example_** ilustrando o local e como o arquivo precisa ser preenchido.

### Instalação

> Clonar projeto

- Clonar este repositório usando _ssh_ ou _https_, por exemplo:

`git clone https://github.com/uLucasFraga/cypress_api_for_studies.git`

- Instalar todas as dependências via package.json, por exemplo:

`cd /{desafio_api_for_studies}`

`npm ci`

> Dicas

- Utilize o seu _package.json_ para incluir ou excluir novas libs ao seu projeto


-----------------------

### Como testar


> Para instalar as dependências do repositório

`npm ci`

> Para limpar o repositório

`npm run pre-cy:run`

> Para rodar os testes no modo interativo do cypress

`npm run cy:open`

> Para rodar todos os testes do repositório

`npm run cy:run`


-----------------------

### Reporte

> Para gerar relatórios depois dos testes:

`npm run post-cy:run`

-----------------------

### Suporte

- Linkedin <a href="https://www.linkedin.com/in/ulucasfraga/" target="_blank">`Lucas Fraga`</a>

- E-mail: `lucass.fragaa@gmail.com`

-----------------------

### Licença

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2021 © <a href="https://www.linkedin.com/in/ulucasfraga" target="_blank">Lucas Fraga</a>

