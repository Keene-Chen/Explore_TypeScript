import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/home/AboutView.vue')
  },
  {
    path: '/axios',
    children: [
      {
        path: '',
        component: () => import('@/views/axios/AxiosView.vue')
      },
      {
        path: 'file_upload',
        name: 'file_upload',
        component: () => import('@/views/axios/AxiosFileUpload.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
