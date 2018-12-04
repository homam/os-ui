export const imports = {
  'index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "index" */ 'index.mdx'),
  'src/common-components/msisdn/msisdn.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-common-components-msisdn-msisdn" */ 'src/common-components/msisdn/msisdn.mdx'),
  'src/landing-pages/bid-win/components/Docs.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-landing-pages-bid-win-components-docs" */ 'src/landing-pages/bid-win/components/Docs.mdx'),
  'src/landing-pages/first/components/Docs.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-landing-pages-first-components-docs" */ 'src/landing-pages/first/components/Docs.mdx'),
}
