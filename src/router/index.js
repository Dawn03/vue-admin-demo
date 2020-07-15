import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '仪表盘',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/organazation',
    name: 'sys',
    meta: {
      title: '系统管理',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'organazation',
        component: () => import('@/views/sys/organazation'), // Parent router-view
        name: 'organazation',
        meta: {
          title: '组织管理'
        },
        children: [
          {
            path: 'userManager',
            component: () => import('@/views/sys/organazation/userManager'),
            name: 'userManager',
            meta: {
              title: '用户管理'
            }
          },
          {
            path: 'institution',
            component: () => import('@/views/sys/organazation/institution'),
            name: 'institution',
            meta: {
              title: '机构管理'
            }
          },
          {
            path: 'company',
            component: () => import('@/views/sys/organazation/company'),
            name: 'company',
            meta: {
              title: '公司管理'
            }
          },
          {
            path: 'post',
            component: () => import('@/views/sys/organazation/post'),
            name: 'post',
            meta: {
              title: '岗位管理'
            }
          }
        ]
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role/index'),
        meta: {
          title: '系统设置'
        },
        children: [
          {
            path: 'listData',
            component: () => import('@/views/sys/role/role'),
            name: 'role',
            meta: {
              title: '角色管理'
            }
          },
          {
            path: 'secAdmin',
            component: () => import('@/views/sys/role/secAdmin'),
            name: 'secAdmin',
            meta: {
              title: '二级管理员'
            }
          },
          {
            path: 'corpAdmin',
            component: () => import('@/views/sys/role/corpAdmin'),
            name: 'corpAdmin',
            meta: {
              title: '系统管理员'
            }
          }
        ]
      },
      {
        path: 'systemSet',
        component: () => import('@/views/sys/systemSet/index'),
        meta: {
          title: '系统设置'
        },
        children: [
          {
            path: 'menu',
            component: () => import('@/views/sys/systemSet/menu'),
            name: 'menu',
            meta: {
              title: '菜单管理'
            }
          },
          {
            path: 'module',
            component: () => import('@/views/sys/systemSet/module'),
            name: 'module',
            meta: {
              title: '模块管理'
            }
          },
          {
            path: 'config',
            component: () => import('@/views/sys/systemSet/config'),
            name: 'config',
            meta: {
              title: '参数设置'
            }
          },
          {
            path: 'dictType',
            component: () => import('@/views/sys/systemSet/dictType'),
            name: 'dictType',
            meta: {
              title: '字典管理'
            }
          },
          {
            path: 'area',
            component: () => import('@/views/sys/systemSet/area'),
            name: 'area',
            meta: {
              title: '行政区划'
            }
          },
          {
            path: 'licence',
            component: () => import('@/views/sys/systemSet/licence'),
            name: 'licence',
            meta: {
              title: '产品许可信息'
            }
          }
        ]

      }

    ]
  },
  {
    path: '/sysM',
    component: Layout,
    redirect: '/sysM/systemMonitor',
    name: 'sysM',
    meta: {
      title: '系统监控',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'log',
        component: () => import('@/views/sys/systemMonitor/log'),
        name: 'log',
        meta: {
          title: '访问日志'
        }
      },
      {
        path: 'cache',
        component: () => import('@/views/sys/systemMonitor/cache'),
        name: 'cache',
        meta: {
          title: '缓存监控'
        }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
