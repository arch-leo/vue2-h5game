import Vue from 'vue'
import Router from 'vue-router'
import ViewIndex from '@/pages/ViewIndex'
import ViewGame from '@/pages/ViewGame'
import ViewUser from '@/pages/ViewUser'
import ViewUserReal from '@/pages/ViewUserReal'
import ViewUserPhone from '@/pages/ViewUserPhone'
import ViewUserPwd from '@/pages/ViewUserPwd'
import ViewGift from '@/pages/ViewGift'
import Logreg from '@/pages/ViewLogreg'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      meta: {isParent: true, keepAlive: true},
      component: ViewIndex
    },
    {
      path: '/game',
      meta: {isParent: true, keepAlive: true},
      component: ViewGame
    },
    {
      path: '/user',
      meta: {isParent: true, keepAlive: true},
      component: ViewUser,
      children: [
        {
          path: 'user-real',
          meta: {isParent: false, isChild: true},
          component: ViewUserReal,
          children: [
            {
              path: ':id',
              meta: {isParent: false, isChild: true},
              component: ViewUserPhone
            }
          ]
        },
        {
          path: 'user-phone',
          meta: {isParent: false, isChild: true},
          component: ViewUserPhone
        },
        {
          path: 'user-pwd',
          meta: {isParent: false, isChild: true},
          component: ViewUserPwd
        }
      ]
    },
    {
      path: '/gift',
      meta: {isParent: false, keepAlive: false},
      component: ViewGift
    },
    {
      path: '/logreg',
      meta: {isParent: false, keepAlive: false},
      component: Logreg
    }
  ]
})
