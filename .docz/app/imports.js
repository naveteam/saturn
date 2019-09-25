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
  'src/Input/Input.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-input-input" */ 'src/Input/Input.mdx'
    ),
  'src/Typography/Typography.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-typography-typography" */ 'src/Typography/Typography.mdx'
    ),
  'src/Checkbox/Checkbox.mdx': () =>
    import(
    /* webpackPrefetch: true, webpackChunkName: "src-checkbox-checkbox" */ 'src/Checkbox/Checkbox.mdx'
    ),
}
