<template>
  <div class="navbar">
    <span class="txt-description">Thu nh?</span>
    <hamburger v-if="isShowIcon" class="hamburger-container" @toggleClick="toggleSideBar"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'Navbar',
  components: {
    Hamburger
  },
  props: {
    isShowIcon: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'email'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 30px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #409EFF;
  display: flex;
  justify-content: flex-end;

  .txt-description {
    color: #fff;
  }

  .hamburger-container {
    line-height: 30px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;
    fill: #fff;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }

  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }

      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }

      }
    }
  }
}
</style>
