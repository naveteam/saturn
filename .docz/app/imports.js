export const imports = {
  'CONTRIBUTING.md': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "contributing" */ 'CONTRIBUTING.md'
    ),
  'license.md': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "license" */ 'license.md'
    ),
  'readme.md': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "readme" */ 'readme.md'),
  'src/Button/Button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-button-button" */ 'src/Button/Button.mdx'
    ),
  'src/Navbar/DataExample.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-navbar-data-example" */ 'src/Navbar/DataExample.mdx'
    ),
  'src/Navbar/Navbar.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-navbar-navbar" */ 'src/Navbar/Navbar.mdx'
    ),
  'src/Typography/Typography.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-typography-typography" */ 'src/Typography/Typography.mdx'
    ),
}
