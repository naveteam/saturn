<p align="center">
  <a href="https://nave.rs/" rel="noopener" target="_blank"><img width="150" style="border-radius: 10px;" src="https://avatars3.githubusercontent.com/u/33161449?s=200&v=4" alt="Nave.rs logo"></a></p>
</p>

<h1 align="center">Nave Kit</h1>

<p align="center">Repositório de componentes React baseado no <a href='https://www.figma.com/file/O3bKxIcsj2rc1FNIRclJyT/Design-System'>design system</a> da Nave.</p>

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)
[![NPM](https://img.shields.io/npm/v/@naveteam/ui-components.svg)](https://www.npmjs.com/package/@naveteam/ui-components)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![ci](https://github.com/naveteam/nave-kit/workflows/ci/badge.svg)

## ❗️ Motivação

Diversas vezes precisamos prototipar rapidamente novas aplicações e sempre precisamos recorrer à libs de componentes de layout como [Material UI](https://material-ui.com/pt/) ou [Ant Design](https://ant.design/). 

A criação de um design system próprio pode aumentar a familiaridade da equipe com determinado padrão de código, fazendo com que gradativamente esses protótipos sejam criados de forma mais rápida e homogênea, abstraindo a necessidade de se preocupar com o layout que a aplicação terá.

## 🛠 Tecnologias utilizadas

Baseamos nosso desenvolvimento em:

- [React](https://reactjs.org/)
- [Styled Components](https://www.styled-components.com/)
- [Styled System](https://styled-system.com/)
- [Storybook](https://github.com/storybooks/storybook)

## 🚀 Instalação

No terminal, execute

```shell
yarn add @naveteam/ui-components
// ou npm install @naveteam/ui-components
```

## 💡 Utilização

Com a lib instalada, o seguinte código já é o suficiente para iniciar o desenvolvimento da aplicação

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, Input } from '@naveteam/ui-components'

const App = () => {
  return (
    <ThemeProvider>
      <Input name='naveteam' label='Simple Input' />
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

Você pode encontrar em nosso [Storybook](https://naveteam.github.io/nave-kit) a documentação necessária de todos os componentes disponíveis no projeto.

## 🤝 Contribuição

Sinta-se livre para contribuir com o projeto, criando novos componentes, abrindo PRs para ajustar bugs ou mesmo levantando dúvidas, sugestões ou pedidos de ajustes através de issues. Para contribuir com nosso projeto, por favor siga nosso guia de [CONTRIBUTING](CONTRIBUTING.md).


## 🐛 Bugs Conhecidos

### O Storyblok não renderiza PropTypes passadas dinamicamente para meu componente

Isso é uma limitação do Addon do Storyblok responsável por criar a tela de Docs. Esse comportamento já foi reportado e existe uma issue aberta para tratar essa questão [aqui](https://github.com/storybookjs/storybook/issues/10536). Enquanto esse problema não é resolvido, você pode declarar as PropTypes do Styled System de forma estática, ou informar na descrição do componente quais módulos do Design System estão importados no componente.

## Licença

MIT © [Nave Team](https://github.com/naveteam)
