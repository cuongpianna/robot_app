<template>
  <div v-if="!showLoading" :class="classObj" class="app-wrapper">
    <app-header/>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <app-main :hotel-id="hotelId"/>
    </div>
    <right-panel v-if="showSettings">
      <settings/>
    </right-panel>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import Sidebar from '@/components/Sidebar'
import AppMain from '@/components/AppMain'
import AppHeader from '@/components/AppHeader'
import Settings from '@/components/Settings/index'
import ResizeMixin from './mixin/ResizeHandler'
import Cookies from 'js-cookie'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    AppHeader,
    RightPanel,
    Settings
  },
  mixins: [ResizeMixin],
  data() {
    return {
      hotelId: '',
      showLoading: false
    }
  },
  computed: {
    showSettings() {
      return this.$store.state.settings.showSettings
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    if (this.$router.currentRoute.params.id) {
      this.hotelId = this.$router.currentRoute.params.id
      Cookies.set('hotelId', this.hotelId, { expires: 365 })
    } else {
      this.hotelId = Cookies.get('hotelId')
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background: #f0f2f5;
  //overflow-x: hidden;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}

.main-container {
  top: 60px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
