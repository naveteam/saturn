const { version } = require('./package')

module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  },
  version,
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'Guide',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md',
          description: 'The description for the installation section'
        }
      ]
    },
    {
      name: 'Components',
      defaultExample: true,
      components: `src/**/[A-Z]*.js`,
      exampleMode: 'expand',
      usageMode: 'expand'
    }
  ]
}
