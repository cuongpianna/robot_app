import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/help/auth'
import SettingDefaul from '@/help/settingdefault'
import AppLayout from '@/layout/AppLayout'
import store from '@/store'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/AppLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import { getRobotId } from '@/help/utils/routeHelper'
/**
 * Note: sub-menu only appear when route children.length >= 1
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
    icon: 'icon-name'             the icon show in the sidebar
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/robots-call/:id',
        component: () => import('@/views/robots/RobotsIndex'),
        hidden: true
    },
    {
        path: '/robots-get-camera',
        component: () => import('@/views/robots/GetRobotCameraConfig'),
        hidden: true
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                hidden: true,
                component: () => import('@/views/redirect/index')
            }
        ]
    },
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
        redirect: 'dashboard',
        component: DashboardLayout,
        // meta: { permissions: [] },
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/home'),
                name: 'Dashboard',
                meta: { title: 'dashboard', icon: 'home', affix: true }
            }
        ]
    }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    {
        path: '/users',
        component: AppLayout,
        name: 'User',
        redirect: 'users/index',
        meta: {
            title: 'systemManagement',
            icon: 'settings'
        },
        children: [
            {
                path: 'index',
                component: () => import('@/views/usermanagement/Index'), // Parent router-view
                name: 'UserAgency',
                meta: {
                    title: 'userManagement',
                    icon: 'people',
                    permissions: ['UserManagement_View', 'UserManagement_Delete']
                }
            },
            {
                hidden: true,
                path: 'create',
                component: () => import('@/views/usermanagement/CreateUser'), // Parent router-view
                name: 'CreateUser',
                meta: {
                    title: 'createUser',
                    icon: 'link',
                    permissions: ['UserManagement_Create']
                }
            },
            {
                path: 'role',
                component: () => import('@/views/role/Index'), // Parent router-view
                name: 'UserRole',
                meta: {
                    title: 'roleManagement',
                    icon: 'policy',
                    permissions: ['Role_View']
                }
            },
            {
                path: 'role/create',
                hidden: true,
                component: () => import('@/views/role/CreateRole'), // Parent router-view
                name: 'CreateRole',
                meta: {
                    title: 'createRole',
                    icon: 'link',
                    permissions: ['Role_Create']
                }
            },
            {
                path: 'module',
                component: () => import('@/views/module/Index'), // Parent router-view
                name: 'ModuleManagement',
                meta: {
                    title: 'moduleManagement',
                    icon: 'apps',
                    permissions: ['Module_View']
                }
            },
            {
                path: 'role/edit/:id',
                hidden: true,
                component: () => import('@/views/role/CreateRole'), // Parent router-view
                name: 'EditRole',
                meta: {
                    title: 'editRole',
                    icon: 'link',
                    permissions: ['Role_Edit']
                }
            },
            {
                path: 'module/edit/:id',
                hidden: true,
                component: () => import('@/views/module/EditModule'), // Parent router-view
                name: 'EditModule',
                meta: {
                    title: 'editModule',
                    icon: 'link',
                    permissions: ['Module_Edit']
                }
            },
            {
                hidden: true,
                path: 'edit/:id',
                component: () => import('@/views/usermanagement/CreateUser'), // Parent router-view
                name: 'EditUser',
                meta: {
                    title: 'editUser',
                    icon: 'link',
                    permissions: ['UserManagement_Edit']
                }
            },
            {
                path: 'setting',
                component: () => import('@/views/setting/SettingIndex'), // Parent router-view
                name: 'SettingManagement',
                meta: {
                    title: 'Setting',
                    icon: 'data_usage',
                    permissions: ['Setting_Edit']
                }
            },
            {
                path: 'doctors/index',
                component: () => import('@/views/doctor/index'), // Parent router-view
                name: 'DoctorIndex',
                meta: {
                    title: 'doctorManagement',
                    icon: 'assignment_ind',
                    permissions: ['Doctor_View', 'Doctor_Delete']
                }
            },
            {
                hidden: true,
                path: 'doctors/create',
                component: () => import('@/views/doctor/create'), // Parent router-view
                name: 'CreateDoctor',
                meta: {
                    title: 'createDoctor',
                    icon: 'link',
                    permissions: ['Doctor_Create']
                }
            },
            {
                hidden: true,
                path: 'doctors/edit/:id',
                component: () => import('@/views/doctor/create'), // Parent router-view
                name: 'EditDoctor',
                meta: {
                    title: 'editDoctor',
                    icon: 'link',
                    permissions: ['Doctor_Create']
                }
            },
            // robot
            {
                path: 'robots/index',
                component: () => import('@/views/robot/RobotIndex'), // Parent router-view
                name: 'RobotIndex',
                meta: {
                    title: 'robotManagement',
                    icon: 'android',
                    permissions: ['Robot_View', 'Robot_Delete']
                }
            },
            {
                hidden: true,
                path: 'robots/create',
                component: () => import('@/views/robot/RobotCreate'), // Parent router-view
                name: 'CreateRobot',
                meta: {
                    title: 'CreateDoctor',
                    icon: 'link',
                    permissions: ['Robot_Create']
                }
            },
            {
                hidden: true,
                path: 'robots/edit/:id',
                component: () => import('@/views/robot/RobotCreate'), // Parent router-view
                name: 'EditRobot',
                meta: {
                    title: 'EditRobot',
                    icon: 'link',
                    permissions: ['Robot_Create']
                }
            },
            {
                hidden: true,
                path: 'robots/control/:id',
                component: () => import('@/views/robot/RobotControl'), // Parent router-view
                name: 'RobotControl',
                meta: {
                    title: 'Robot Control',
                    icon: 'link',
                    permissions: ['Robot_View']
                }
            },
            {
                hidden: true,
                path: 'robots/media/:robotId',
                component: () => import('@/views/robotmedia/Index'), // Parent router-view
                name: 'RobotMediaIndexx',
                meta: {
                    title: 'RobotMediaManagement',
                    icon: 'perm_media'
                    // permissions: ['UserMedia_View', 'UserMedia_Delete']
                }
            },
            {
                hidden: true,
                path: 'robots/createMedia/:robotId',
                component: () => import('@/views/robotmedia/create'), // Parent router-view
                name: 'CreateRobotMedia',
                meta: {
                    title: 'createRobotMedia',
                    icon: 'link'
                    // permissions: ['UserMedia_Create']
                }
            },
            {
                hidden: true,
                path: 'robots/call/:id',
                component: () => import('@/views/robot/RobotCall'), // Parent router-view
                name: 'RobotCall',
                meta: {
                    title: 'Call',
                    icon: 'link',
                    permissions: ['Robot_View']
                }
            },
            // areas

            {
                path: 'areas/index',
                component: () => import('@/views/area/index'), // Parent router-view
                name: 'AreaIndex',
                meta: {
                    title: 'areaManagement',
                    icon: 'place',
                    permissions: ['Area_View', 'Area_Delete']
                }
            },
            {
                hidden: true,
                path: 'areas/create',
                component: () => import('@/views/area/create'), // Parent router-view
                name: 'CreateArea',
                meta: {
                    title: 'CreateArea',
                    icon: 'link',
                    permissions: ['Area_Create']
                }
            },
            {
                hidden: true,
                path: 'areas/edit/:id',
                component: () => import('@/views/area/create'), // Parent router-view
                name: 'EditArea',
                meta: {
                    title: 'EditArea',
                    icon: 'link',
                    permissions: ['Area_Create']
                }
            },
            {
                hidden: true,
                path: 'areas/create-map/:id',
                component: () => import('@/views/area/createMap'), // Parent router-view
                name: 'CreateMap',
                meta: {
                    title: 'Create Map',
                    icon: 'link',
                    permissions: ['Area_Edit']
                }
            },
            // camera
            {
                path: 'cameras/index',
                component: () => import('@/views/camera/CameraIndex'), // Parent router-view
                name: 'CameraIndex',
                meta: {
                    title: 'CameraManagement',
                    icon: 'photo_camera',
                    permissions: ['Camera_View', 'Camera_Delete']
                }
            },
            {
                hidden: true,
                path: 'cameras/create',
                component: () => import('@/views/camera/CameraCreate'), // Parent router-view
                name: 'CreateCamera',
                meta: {
                    title: 'CreateCamera',
                    icon: 'link',
                    permissions: ['Camera_Create']
                }
            },
            {
                hidden: true,
                path: 'cameras/edit/:id',
                component: () => import('@/views/camera/CameraCreate'), // Parent router-view
                name: 'EditCamera',
                meta: {
                    title: 'EditCamera',
                    icon: 'link',
                    permissions: ['Camera_Create']
                }
            },
            {
                path: 'robot-version/index',
                component: () => import('@/views/robotversion/RobotVersionIndex'), // Parent router-view
                name: 'RobotVersionIndex',
                meta: {
                    title: 'RobotVersionManagement',
                    icon: 'layers',
                    permissions: ['RobotVersion_View', 'RobotVersion_Delete']
                }
            },
            {
                hidden: true,
                path: 'robot-version/create',
                component: () => import('@/views/robotversion/RobotVersionCreate'), // Parent router-view
                name: 'CreateRobotVersion',
                meta: {
                    title: 'CreateRobotVersion',
                    icon: 'link',
                    permissions: ['RobotVersion_Create']
                }
            },
            {
                hidden: true,
                path: 'robot-version/edit/:id',
                component: () => import('@/views/robotversion/RobotVersionCreate'), // Parent router-view
                name: 'EditRobotVersion',
                meta: {
                    title: 'EditRobotVersion',
                    icon: 'link',
                    permissions: ['RobotVersion_Create']
                }
            },
            {
                path: 'robot/robotAction',
                component: () => import('@/views/robotaction/Index'), // Parent router-view
                name: 'RobotActionIndex',
                meta: {
                    title: 'RobotActionManagement',
                    icon: 'settings',
                    permissions: ['RobotAction_View']
                }
            },
            {
                hidden: true,
                path: 'robot/createRobotAction',
                component: () => import('@/views/robotaction/create'), // Parent router-view
                name: 'CreateRobotAction',
                meta: {
                    title: 'CreateRobotAction',
                    icon: 'link',
                    permissions: ['RobotAction_View']
                }
            },
            {
                hidden: true,
                path: 'robot/editRobotAction/:id',
                component: () => import('@/views/robotaction/create'), // Parent router-view
                name: 'EditRobotAction',
                meta: {
                    title: 'EditRobotAction',
                    icon: 'link'
                    // permissions: ['RobotVersion_Create']
                }
            }
        ]
    },
    // {
    //     path: '/camera',
    //     component: AppLayout,
    //     name: 'Camera',
    //     redirect: 'cameras/tracking',
    //     meta: {
    //         title: 'systemManagement',
    //         icon: 'users-cog',
    //         permissions: ['Area_View']
    //     },
    //     children: [
    //         {
    //             path: 'tracking',
    //             component: () => import('@/views/camera/CameraTracking'), // Parent router-view
    //             name: 'TrackingCamera',
    //             meta: {
    //                 title: 'trackingCamera',
    //                 icon: 'photo_camera',
    //                 permissions: ['Camera_Create']
    //             },
    //         }
    //     ]
    // },
    {
        path: '/usermedia',
        component: AppLayout,
        name: 'UserMedia',
        redirect: 'usermedia/index',
        meta: {
            title: 'systemManagement',
            icon: 'users-cog',
            permissions: ['Area_View']
        },
        children: [
            {
                path: 'index',
                component: () => import('@/views/usermedia/Index'), // Parent router-view
                name: 'UserMediaIndex',
                meta: {
                    title: 'UserMediaManagement',
                    icon: 'perm_media'
                }
            },
            {
                hidden: true,
                path: 'create',
                component: () => import('@/views/usermedia/create'), // Parent router-view
                name: 'CreateUserMedia',
                meta: {
                    title: 'createUserMedia',
                    icon: 'link'
                }
            }
        ]
    },

    {
        path: 'users/robots/media/' + getRobotId(),
        component: AppLayout,
        hidden: true,
        name: 'RobotMedia',
        redirect: 'robots/media/:robotId',
        meta: {
            title: 'RobotMediaManagement',
            icon: 'perm_media',
            permissions: ['Area_View']
        },
        children: [
            {
                hidden: true,
                path: 'robots/media/:robotId',
                component: () => import('@/views/robotmedia/Index'),
                name: 'UserRobotMediaIndex',
                meta: {
                    title: 'RobotMediaManagement',
                    icon: 'perm_media'
                }
            },
            {
                hidden: true,
                path: 'robots/createMedia/:robotId',
                component: () => import('@/views/robotmedia/create'),
                name: 'UserCreateRobotMedia',
                meta: {
                    title: 'createRobotMedia',
                    icon: 'link'
                    // permissions: ['UserMedia_Create']
                }
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 }) // NProgress Configuration

const whiteList = ['login', 'robots-call'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()
    // set page title
    document.title = SettingDefaul.getPageTitle(to.meta.title)
    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) { // tao biên check lần 2
            next()
        } else {
            try { // lần 1 chạy băt buojc vào bước này
                // get user info
                // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                const authorize = await store.dispatch('auth/getInfo')
                if (authorize && authorize.listRoles.length > 0) {
                    // generate accessible routes map based on roles
                    const accessRoutes = await store.dispatch('permission/generateRoutes', authorize)

                    // dynamically add accessible routes
                    router.addRoutes(accessRoutes)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } else {
                    await store.dispatch('auth/resetToken')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            } catch (error) {
                console.log(error)
                // remove token and go to login page to re-login
                await store.dispatch('auth/resetToken')
                Message.error(error || 'Has Error')
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
    } else {
        /* has no token*/
        const hash = to.path.split('/')
        if (whiteList.indexOf(hash[1]) !== -1) {
            // in the free login whitelist, go directly /robots-call/:id
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

export default router
