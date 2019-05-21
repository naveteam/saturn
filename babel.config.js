module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-proposal-object-rest-spread', 'transform-react-remove-prop-types'].filter(Boolean)
}
