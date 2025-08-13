
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'Konzertkompass',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Konzertkompass/login",
    "route": "/Konzertkompass"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XMHMYZ6A.js",
      "chunk-Z2P47XQY.js"
    ],
    "route": "/Konzertkompass/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4AZKLOND.js",
      "chunk-Z2P47XQY.js"
    ],
    "route": "/Konzertkompass/bands"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-F73DVUOM.js",
      "chunk-Z2P47XQY.js"
    ],
    "route": "/Konzertkompass/find-my-concert"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-NDRDGXSG.js"
    ],
    "route": "/Konzertkompass/find-my-concert/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2685, hash: '3714bf7f2a259b0f01818c25f20bd5153a182107741026fa1f0470f3cfc53c39', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1352, hash: 'cf073525e27142e1a6b539c05e84cd4d0382d12121c93e6b7666df5c1fac3d40', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-2NBAKKI7.css': {size: 2120, hash: 'U6VrwmOuOxM', text: () => import('./assets-chunks/styles-2NBAKKI7_css.mjs').then(m => m.default)}
  },
};
