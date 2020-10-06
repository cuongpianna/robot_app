<template>
  <div class="app-header" :class="className">
    <div class="left">
      <div class="back-to-home">
        <router-link to="/" class="router-back" v-if="this.className != 'light'">
          <font-awesome-icon icon="chevron-left" color="#fff" class="back-btn"/>
        </router-link>

        <!--        <div v-else class="doctor-weather__inner" :style="{'background-image': 'url(' + require('@/assets/doctor.png') + ')'}"></div>-->
        <div v-else class="logoWrap">
          <img :src="require('@/assets/watermark.png')" alt="">
        </div>
      </div>
      <div v-if="agencyName.length > 0" class="agency-info">
        <img :src="storage_public + agencyAvatar" :alt="agencyName" class="agency-avatar">
        <a href="#" class="agency-name"><span class="agency-code">{{ agencyCode }}</span> - {{ agencyName }}</a>
      </div>
      <div v-else class="agency-info">
        <span class="agency-name">{{ appTitle }}</span>
      </div>
    </div>
    <div class="user-info">
      <el-tooltip :content="generateTitleView('search', 'header')" effect="dark" placement="bottom">
        <search id="header-search" class="right-menu-item"/>
      </el-tooltip>
      <el-tooltip :content="generateTitleView('screenFull', 'header')" effect="dark" placement="bottom">
        <screenfull id="screenfull" class="right-menu-item hover-effect"/>
      </el-tooltip>
      <el-tooltip :content="generateTitleView('fontsize', 'header')" effect="dark" placement="bottom">
        <size-select id="size-select" class="right-menu-item hover-effect"/>
      </el-tooltip>
      <el-tooltip :content="generateTitleView('language', 'header')" effect="dark" placement="bottom">
        <el-dropdown class="avatar-container language-change" trigger="click">
          <div class="avatar-wrapper">
            <svg-icon class-name="international-icon" icon-class="language"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown" style="overflow: hidden;">
            <el-dropdown-item style="padding: 0;">
              <div style="width: 100%; height: 100%; padding: 0 20px;" @click="setLang('vi')">Vietnamese</div>
            </el-dropdown-item>
            <el-dropdown-item divided style="padding: 0;">
              <div style="width: 100%; height: 100%; padding: 0 20px;" @click="setLang('en')">English</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <font-awesome-icon icon="user-circle" color="#fff" class="user-icon"/>
          <span class="username">{{ this.userName }}</span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="logout">{{ generateTitleView('logout', 'dashboard') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <font-awesome-icon icon="bell" color="#fff" class="notification"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { generateTitleView } from '@/help/utils/i18n'

export default {
  components: {
    Screenfull,
    SizeSelect,
    Search
  },
  props: {
    /**
     * Component class
     */
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['appTitle'])
  },
  data() {
    return {
      userName: '',
      agencyCode: '',
      agencyName: '',
      agencyAvatar: '',
      storage_public: process.env.VUE_APP_STORAGE_AGENCY_AVATAR_PUBLIC + '/',
      icon: ''
    }
  },
  mounted() {
    this.userName = this.$store.state.auth.name
    this.agencyCode = this.$store.state.auth.agencyCode
    this.agencyName = this.$store.state.auth.agencyName
    this.agencyAvatar = this.$store.state.auth.agencyAvatar
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    setLang(locale) {
      this.$i18n.locale = locale
      this.$store.dispatch('app/setLanguage', locale)
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 5px 10px;
  background: #0b5db1;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    justify-content: flex-start;
    width: 50%;
  }

  .back-to-home {
    width: 45px;
    height: 60px;
    margin-top: -5px;
    margin-bottom: -5px;
    display: flex;
    justify-content: center;
    cursor: pointer;

    .router-back {
      align-self: center;

      .back-btn {
        font-size: 25px;
      }

      &:hover {
        opacity: 0.8;
      }

    }
  }

  .agency-info {
    display: flex;
    justify-content: flex-start;
    margin-left: 0px;

    .agency-avatar {
      border-radius: 100%;
      width: 50px;
    }

    .agency-name {
      align-self: center;
      font-weight: bold;
      font-size: 15px;
      line-height: 18px;
      color: #fff;
      margin-left: 10px;

      &:hover {
        opacity: 0.8;
        text-decoration: none;
      }

    }
  }

  .international-icon {
    font-size: 20px;
    margin-right: 15px;
  }

  .user-info {
    width: 50%;
    display: flex;
    justify-content: flex-end;

    /deep/ .header-search {
      position: relative;
      top: 5px;
      margin-right: 10px;
      cursor: pointer;
    }

    /deep/ #screenfull {
      position: relative;
      top: 17px;
      margin-right: 15px;
      cursor: pointer;
    }

    /deep/ #size-select {
      position: relative;
      top: 17px;
      margin-right: 15px;
      cursor: pointer;
    }

    /deep/ .svg-icon {
      fill: #fff;
    }

    /deep/ .el-input__inner {
      background-color: transparent;
      color: #fff;
    }

    .avatar-container {
      align-self: center;
      cursor: pointer;
    }

    .user-icon {
      font-size: 20px;
      align-self: center;
    }

    .username {
      font-size: 15px;
      color: #fff;
      align-self: center;
      margin-left: 5px;
    }

    .notification {
      font-size: 20px;
      align-self: center;
      margin-left: 20px;
    }

    .setting {
      margin-left: 20px;
      align-self: center;
      margin-top: 2px;

      .setting-btn {
        font-size: 20px;
        align-self: center;
        cursor: pointer;
      }

    }
  }
}

.dropdown-setting {
  top: 69px !important;
}

.agency-name {
  text-transform: uppercase;
  font-size: 16px;
}

.doctor-weather__inner {
  width: 20px;
  height: 20px;
}

.logoWrap {
  line-height: 60px;

  img {
    width: 100%;
  }
}
</style>
