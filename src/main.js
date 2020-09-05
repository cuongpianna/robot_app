import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import i18n from './lang' // internationalization
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import vi from 'vee-validate/dist/locale/vi.json'
import * as rules from 'vee-validate/dist/rules'
import pretty from 'pretty'
import VueParticles from 'vue-particles'

import '@/assets/js/jspmeg.js'
import '@/assets/js/jspmeg.js'
import '@/styles/index.scss' // global css
import '@/icons' // icon
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import vuetify from '@/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as filters from './filters'
import './plugins/vee-validate'
import Embed from 'v-video-embed'

import {
    faChevronLeft,
    faAddressBook,
    faUsersCog,
    faUserCircle,
    faBell,
    faBars,
    faDollarSign,
    faCog,
    faList,
    faDotCircle,
    faPhone,
    faPlay,
    faHome,
    faUserTag,
    faListAlt,
    faSync,
    faThLarge,
    faUser,
    faSearch,
    faClipboardList,
    faEllipsisV,
    faChartBar,
    faUsers,
    faPlusCircle,
    faPlus,
    faCheck,
    faFilter,
    faVideo,
    faUserPlus,
    faFileAlt,
    faArrowUp,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faPause,
    faDrawPolygon,
    faTimes,
    faCamera,
    faMinus,
    faHandPointUp,
    faCaretUp,
    faRobot,
    faArrowsAlt,
    faCodeBranch,
    faBatteryHalf,
    faMapMarkerAlt,
    faSignInAlt,
    faWifi,
    faCertificate,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faChevronLeft,
    faAddressBook,
    faUsersCog,
    faUserCircle,
    faBell,
    faBars,
    faDollarSign,
    faCog,
    faList,
    faDotCircle,
    faPhone,
    faPlay,
    faHome,
    faUserTag,
    faListAlt,
    faSync,
    faThLarge,
    faUser,
    faSearch,
    faClipboardList,
    faEllipsisV,
    faChartBar,
    faUsers,
    faPlusCircle,
    faPlus,
    faCheck,
    faFilter,
    faVideo,
    faUserPlus,
    faFileAlt,
    faArrowUp,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faPause,
    faDrawPolygon,
    faTimes,
    faCamera,
    faMinus,
    faHandPointUp,
    faCaretUp,
    faRobot,
    faArrowsAlt,
    faCodeBranch,
    faBatteryHalf,
    faMapMarkerAlt,
    faSignInAlt,
    faWifi,
    faCertificate,
    faFilePdf
)

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
})

localize('vi', vi)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.config.productionTip = true
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueMaterial)
Vue.use(VueParticles)
Vue.use(Vuex)
Vue.prototype.$prettyDom = pretty

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Embed)
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)
Vue.directive('click-outside', {
    bind: function(el, binding, vnode) {
        el.eventSetDrag = function() {
            el.setAttribute('data-dragging', 'yes')
        }
        el.eventClearDrag = function() {
            el.removeAttribute('data-dragging')
        }
        el.eventOnClick = function(event) {
            var dragging = el.getAttribute('data-dragging')
            // Check that the click was outside the el and its children, and wasn't a drag
            if (!(el === event.target || el.contains(event.target)) && !dragging) {
                // call method provided in attribute value
                vnode.context[binding.expression](event)
            }
        }
        document.addEventListener('touchstart', el.eventClearDrag)
        document.addEventListener('touchmove', el.eventSetDrag)
        document.addEventListener('click', el.eventOnClick)
        document.addEventListener('touchend', el.eventOnClick)
    }, unbind: function(el) {
        document.removeEventListener('touchstart', el.eventClearDrag)
        document.removeEventListener('touchmove', el.eventSetDrag)
        document.removeEventListener('click', el.eventOnClick)
        document.removeEventListener('touchend', el.eventOnClick)
        el.removeAttribute('data-dragging')
    }
})

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <input>.'
Vue.config.warnHandler = function(msg, vm, trace) {
    // `trace` is the component hierarchy trace
    if (msg === ignoreWarnMessage) {
        msg = null
        vm = null
        trace = null
    }
}

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
}).$mount('#app')
