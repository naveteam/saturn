# CONTRIBUTING

Nós adoramos pull requests, mas para contribuir com o projeto você precisa seguir algumas premissas para garantir que seu código esteja de acordo com o restante do projeto.

## ✅ Requisitos

Os únicos requisitos necessários para executar o projeto são o [nodejs](https://nodejs.org/) e um editor de texto a sua escolha (nós recomendamos o [Visual Studio Code](https://code.visualstudio.com/))

## ⚙️ Configuração Inicial

Recomendamos o uso do Visual Studio Code pois ele oferece diversas extensões que facilitam a padronização do código para seguir os o _code style_ [standard](https://standardjs.com/). Dentre as extensões, recomendamos o uso de:

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 🚧 Desenvolvimento

Após instalação e configuração de seu ambiente, tudo que você têm a fazer é seguir essas etapas:

```shell
// clonar o repositório
git clone git@github.com:naveteam/saturn.git

// acessar a pasta do projeto
cd saturn

// instalar as dependências
yarn // ou npm install

// executar o projeto
yarn start // ou npm run start 
```

Isso irá abrir o playground do StoryBook, onde todos os nossos componentes serão desenvolvidos.

Para executar novas tasks, você pode selecionar qualquer card da coluna `To Do` presente no nosso [roadmap](https://github.com/naveteam/saturn/projects/2).

## 📁 Estrutura de pastas

O core do projeto está presente na pasta `src`. Na maioria dos casos ela será a única pasta que você precisará mexer. Dentro dela, existem as supastas:

- 📁**components**: Nessa pasta estão presentes todos os componentes do projeto. Cada componente deverá possuir seu próprio diretório, seguindo o padrão já presente no projeto (um arquivo `index.js` contendo todos os possíveis _exports_ que esse componente possui e um _export default_ com o componente que deve ser apresentado por padrão ao importar diretamente o componente, e cada variação do componente em questão em seu próprio arquivo `.jsx` separado).

- 📁**stories**: A pasta stories contêm os descritivos de cada componente previamente criado. Para cada pasta de componentes dentro de `components`, deve existir um arquivo `.stories.mdx` com a descrição do componente. São esses stories que serão mostrados no StoryBook e que servirão de documentação para futuras utilizações dessa lib.

- 📁**theme**: Nessa pasta estão presentes as constantes utilizadas pelo [styled-system](https://styled-system.com/) para tornar a criação dos componentes mais homogênea. Qualquer alteração em arquivos dessa pasta deve ser feita com muito cuidado pois altera de forma global como os componentes são renderizados. Você pode utilizar os arquivos dessa pasta para entender melhor quais são as constantes que o projeto usa, e qual melhor se encaixa no seu uso.

## 🛑 Considerações

Para que a execução de sua task seja feita da melhor maneira possível, algumas considerações devem ser seguidas a fim de manter o padrão necessário para aprovação e deploy do seu código. Podemos separar essas considerações em:

### 🔙 Antes de iniciar o desenvolvimento

- Certificar-se que seu repositório está atualizado e que todas as dependências estão instaladas e compatíveis com as versões descritas no `package.json`.
- Garantir que o `ESLint` e o `EditorConfig` estejam corretamente configurados afim de manter o padrão de código.
- Criar uma nova `branch` baseada na main mais atualizada para a criação do seu componente. Utilizar o prefixo `feat/<nome-do-componente>` para novos componentes e `fix/<resumo-do-bugfix>` para bugfixes.

### 🔛 Durante o desenvolvimento

- Manter o padrão de estrutura de pastas descrito acima.
- Utilizar sempre que possível propriedades disponibilizadas pelo `styled-sytem` (uma lista com todas as propriedades disponíveis pode ser encontrada [aqui](https://styled-system.com/api)).
- Manter o código limpo e organizado para fins de mantenabilidade, com declarações de variáveis e funções com nomes descritivos, e com eventuais funções muito extensas ou complexas com comentários sobre seu funcionamento.
- Utilizar `PropTypes` para definir todos os parâmetros que seu componente pode possuir (caso seu componente receba propriedades do `styled-system`, utilizar as `PropTypes` previamente criadas pelo pacote [@styled-system/prop-types](https://www.npmjs.com/package/@styled-system/prop-types)).
- Seguir os padrões de layout definidos no [Figma](https://www.figma.com/file/O3bKxIcsj2rc1FNIRclJyT/Design-System) criado pelo time da Nave.
- Documentar o componente no StoryBook através de `stories`. Nessa documentação deverão estar presentes todas as _props_ que seu componente e variantes podem receber, bem como descrições detalhadas de seus funcionamentos e eventuais peculiaridades que eles possam ter. Cada variante deve ter sua própria `story`.
- Revisar todo o código criado afim de procurar e remover eventuais `logs` utilizados durante o desenvolvimento e minimizar ao máximo códigos comentários (caso eventuais códigos comentados existam, informar o motivo do comentário existir).
- Utilizar o comando `yarn commit` para criar os commits durante o desenvolvimento. Esse comando é necessário para manter o padrão do [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional).

### 🔜 Após o desenvolvimento

- Abrir um `Pull Request` com sua branch seguindo um dos modelos de PR presentes no repositório. Descrever de maneira clara e objetiva seu PR e certificar-se que todo o checklist seja cumprido.
- Executar o comando `yarn chromatic` em seu terminal para criar um build do seu projeto dentro da ferramenta do Chromatic. Esse comando é essencial para aprovação do seu PR, mesmo se não houverem mudanças visuais no componente.
- Após um mínimo de 2 (dois) approves, mergear seu PR na `main` e testar em ambiente de produção se o comportamento de seu componente está de acordo com o esperado.
- Sentar, tomar um café e admirar seu componente recém criado disponível em produção. ☕️

## 🌀 Workflow

Você pode visualizar a abstração do workflow desenvolvido para o saturn [aqui](https://miro.com/app/board/o9J_kqytVp0=)
