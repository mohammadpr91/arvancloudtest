const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        name: 'dashboard',
        meta: { title: 'Dashboard' }
      },
      {
        path: '/newArticle',
        component: () => import('src/pages/NewArticle.vue'),
        name: 'newArticle',
        meta: { title: 'NewArticle' }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
    name: 'login',
    meta: { title: 'Login' }
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    name: 'E404',
    meta: { title: 'Page Not Found' }
  },
  
];

export default routes

