// https://umijs.org/zh-CN/docs/routing
export default [
  {
    path: '/',
    title:'首页',
    component: '@/pages/index/index',
  },

  {
    routes: [
      { component: './Exception/500', path: '/500' },
      { component: './Exception/403', path: '/403' },
      { component: './Exception/404', path: '/404' },
    ]
  }
];
