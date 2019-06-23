export const imports = {
  'CONTRIBUTING.md': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "contributing" */ 'CONTRIBUTING.md'
    ),
  'README.md': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "readme" */ 'README.md'),
  'license.md': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "license" */ 'license.md'
    ),
  'dist/README.md': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "dist-readme" */ 'dist/README.md'
    ),
  'docs/installation.md': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-installation" */ 'docs/installation.md'
    ),
  'src/Button/Button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-button-button" */ 'src/Button/Button.mdx'
    ),
  'src/Typography/Typography.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-typography-typography" */ 'src/Typography/Typography.mdx'
    ),
}
