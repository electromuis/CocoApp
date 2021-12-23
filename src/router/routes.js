
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
      
      { path: '/rooms', component: () => import('pages/Rooms.vue') },
      { path: '/rooms/add', component: () => import('pages/Rooms/Add.vue') },
      { path: '/rooms/:roomId/details', component: () => import('pages/Rooms/Details.vue') },
      
      { path: '/invites', component: () => import('pages/Invites.vue') },
      { path: '/alerts', component: () => import('pages/Alerts.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
