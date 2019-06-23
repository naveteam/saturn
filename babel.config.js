let defaultPresets

if (process.env.BABEL_ENV === 'es') {
  defaultPresets = []
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm', 'production-umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs'
      }
    ]
  ]
}

const productionPlugins = [
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap'
    }
  ]
]

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-runtime',
    // for IE 11 support
    '@babel/plugin-transform-object-assign'
  ],
  env: {
    cjs: {
      plugins: productionPlugins
    },
    esm: {
      plugins: productionPlugins
    },
    es: {
      plugins: productionPlugins
    },
    'production-umd': {
      plugins: productionPlugins
    }
  }
}
