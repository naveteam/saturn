import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import localResolve from 'rollup-plugin-local-resolve'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

function makeExternalPredicate(externalArr) {
  if (!externalArr.length) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => pattern.test(id)
}

function getExternal(isUMD) {
  const external = Object.keys(pkg.peerDependencies || {})
  const allExternal = [...external, ...Object.keys(pkg.dependencies || {})]
  return isUMD ? external : makeExternalPredicate(allExternal)
}

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'index',
      exports: 'named',
      sourcemap: true,
      interop: false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        'styled-components': 'styled'
      }
    },
    {
      file: pkg.main,
      interop: false,
      format: 'cjs',
      exports: 'named'
    },
    {
      file: pkg.module,
      interop: false,
      format: 'es'
    }
  ],
  external: getExternal(true),
  plugins: [
    localResolve(),
    peerDepsExternal(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    filesize()
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config
