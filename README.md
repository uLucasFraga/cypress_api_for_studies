# CYPRESS API FOR STUDIES
-----------------------

[![ServeRest API](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/PauloGoncalvesBH/ServeRest/)
[![CONTINUOUS INTEGRATIONS](https://github.com/uLucasFraga/cypress_api_for_studies/actions/workflows/dev.yml/badge.svg?branch=main)](https://github.com/uLucasFraga/cypress_api_for_studies/actions/workflows/dev.yml)

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
    "email": "fulano@qa.com",
    "password": "teste"
}
```

**Nota Importante:** Isso foi feito para simular uma possível _"não exposição"_ para o tratamento quanto a dados sensíveis. Porém, coloquei os dados no README para facilitar a todos.

O arquivo **_cypress.env.json_** neste projeto, encontra-se no _.gitignore_. Logo, faz-se necessário cria-lo assim que baixar.

### Instalação

> Clonar projeto

- Clonar este repositório usando _ssh_ ou _https_, por exemplo:

`git clone https://github.com/uLucasFraga/cypress_api_for_studies.git`

- Instalar todas as dependências via package.json, por exemplo:

`cd /{desafio_api_for_studies}`

`npm run pre-test`

> Dicas

- Utilize o seu _package.json_ para incluir ou excluir novas libs ao seu projeto


-----------------------

### Como testar

> Para limpar e instalar as dependências do repositório

`npm run pre-test`

> Para rodar os testes no modo interativo do cypress

`npm run cy:open`

> Para rodar todos os testes do repositório

`npm run cy:run`

> Para limpar todo o repositório

`npm run clean-all`


-----------------------

### Reporte

> Para gerar relatórios depois dos testes:

`npm run post-test`

-----------------------

### Suporte

- Linkedin <a href="https://www.linkedin.com/in/ulucasfraga/" target="_blank">`Lucas Fraga`</a>

- E-mail: `lucass.fragaa@gmail.com`

-----------------------

### Licença

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2021 © <a href="https://www.linkedin.com/in/ulucasfraga" target="_blank">Lucas Fraga</a>

