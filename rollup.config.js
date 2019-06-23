import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import localResolve from 'rollup-plugin-local-resolve'

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/umd/nave-design-system.min.js',
      format: 'umd',
      name: 'index',
      exports: 'named',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        'styled-components': 'styled'
      }
    }
  ],
  plugins: [
    localResolve(),
    resolve(),
    peerDepsExternal(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs({
      include: /node_modules/,
      ignoreGlobal: true
    }),
    nodeGlobals(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    terser()
  ]
}

export default config
