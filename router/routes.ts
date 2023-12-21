import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: 'immunization',
        name: 'immunization',
        component: () => import('pages/ImmunizationPage.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: 'rules',
        name: 'rules',
        component: () => import('pages/RulesPage.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('pages/CreatePage.vue'),
        meta: {requiresAuth: false}
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: {requiresAuth: false}
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('pages/AboutPage.vue'),
        meta: {requiresAuth: false}
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
