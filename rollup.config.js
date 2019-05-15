import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import localResolve from 'rollup-plugin-local-resolve'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

function makeExternalPredicate(externalArr) {
  if (!externalArr.length) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
}

function getExternal(isUMD) {
  const external = Object.keys(pkg.peerDependencies || {});
  const allExternal = [...external, ...Object.keys(pkg.dependencies || {})];
  return isUMD ? external : makeExternalPredicate(allExternal);
}

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'index',
        exports: "named",
        interop: false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      },
      {
        file: pkg.main,
        interop: false,
        format: 'cjs',
        exports: "named"
      },
      {
        file: pkg.module,
        interop: false,
        format: 'es',
      },
    ],
    external: getExternal(true),
    plugins: [
      peerDepsExternal(),
      babel({
        exclude: 'node_modules/**',
      }),
      localResolve(),
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      filesize(),
    ],
  },
]
