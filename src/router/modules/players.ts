import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const playerRouter: RouteConfig = {
  path: '/players',
  component: Layout,
  meta: {
    title: 'playerMgt', // i18n信息
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/player/list.vue'),
      meta: {
        title: 'playerList',
        icon: 'players'
      }
    }, {
      path: 'create',
      component: () => import('@/views/player/create.vue'),
      meta: {
        title: 'createPlayer',
        icon: 'edit'
      }
    }
  ]
}

export default playerRouter 