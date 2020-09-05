import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import auth from './modules/auth'
import settings from './modules/settings'
import usermanagement from './modules/usermanagement'
import file from './modules/file'
import functions from './modules/functions'
import module from './modules/module'
import role from './modules/role'
import doctor from './modules/doctor'
import robot from './modules/robot'
import usermedia from './modules/usermedia'
import robotmedia from './modules/robotmedia'
import area from './modules/area'
import dashboard from './modules/dashboard'
import camera from './modules/camera'
import robotversion from './modules/robotversion'
import setting from './modules/setting'
import robotcontrol from './modules/robotcontrol'
import robotaction from './modules/robotaction'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        permission,
        auth,
        settings,
        usermanagement,
        file,
        functions,
        module,
        role,
        doctor,
        robot,
        usermedia,
        area,
        dashboard,
        camera,
        robotversion,
        robotmedia,
        setting,
        robotcontrol,
        robotaction
    },
    getters
})

export default store
