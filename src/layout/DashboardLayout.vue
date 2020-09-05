<template>
  <div :class="classObj" class="app-wrapper">
    <app-header class-name="light"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <app-main/>
    </div>
  </div>
</template>

<script>
import AppMain from '@/components/AppMain'
import Sidebar from '@/components/Sidebar'
import ResizeMixin from './mixin/ResizeHandler'
import AppHeader from '@/components/AppHeader'

export default {
  name: 'DashboardLayout',
  components: {
    AppMain,
    Sidebar,
    AppHeader
  },
  mixins: [ResizeMixin],
  computed: {
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
  methods: {
    async getPermission() {
      const role = 'super-admin'
      const rolesRouter = this.$route.meta.roles
      if (rolesRouter) {
        const hasPermission = rolesRouter.indexOf(role)
        if (hasPermission === -1) {
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
      }
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

#app {
  .app-wrapper {
    background: #fff;

    .app-main {
    }
  }
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

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
  top: 0;
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
  /*height: 100% !important;*/
  top: 60px;
  /*background: linear-gradient(180deg, #6196EF 0%, #3A6FD0 100%);*/
  /*min-height: calc(100vh - 60px) !important;*/
  /*padding-left: 40px;*/
  /*padding-right: 80px;*/
  /*padding-bottom: 60px;*/
}

/*#app .main-container {*/
/*  margin-left: 0;*/
/*}*/

</style>
