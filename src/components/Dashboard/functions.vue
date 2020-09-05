<template>
  <div class="hotel-body">
    <div class="search-container">
      <font-awesome-icon icon="search" color="#fff" class="btn-search" @click="searchRouter" />
      <input
        id="keywords"
        :placeholder="generateTitleView('searchText', 'dashboard')"
        class="input-search"
        autocomplete="off"
        @keyup="searchRouter"
      >
    </div>
    <div class="hotel-list">
      <loading v-if="isLoading" />
      <div v-else>

        <swiper :options="swiperOption">
          <swiper-slide v-for="(child, index) in lstRouter" :key="index" class="item">
            <router-link
              :to="child.path"
              :title="generateTitle(child.title)"
              class="avatar"
            >
              <!--              <font-awesome-icon :icon="child.icon" style="color: #ffffff" class="icon-dashboard" />-->
              <md-icon class="icon-dashboard md-size-2x" style="color: #ffffff">{{ child.icon }}</md-icon>
            </router-link>
            <div class="clearfix" />
            <router-link
              :to="child.path"
              :title="generateTitle(child.title)"
              class="title"
            >
              <span>{{ generateTitle(child.title) }}</span>
            </router-link>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination" />
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading'
import SvgIcon from '@/components/SvgIcon'
import Fuse from 'fuse.js'
import path from 'path'
import { generateTitle } from '@/help/utils/i18n'
import { generateTitleView } from '@/help/utils/i18n'

const LABEL = {
  model: 'hotel',
  limit: 100
}

export default {
  name: 'DashboardFunctions',
  components: {
    swiper,
    swiperSlide,
    Loading
  },
  props: {
    hotelList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoading: false,
      lstRouter: [],
      fuse: undefined,
      storage_public: process.env.VUE_APP_STORAGE_BG_DASHBOARD_PUBLIC,
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['permission_routes'])
  },
  mounted() {
    this.lstRouter = []
    this.searchRouter()
  },
  methods: {
    searchRouter() {
      const keywords = document.getElementById('keywords').value || ''
      if (keywords !== '') {
        this.lstRouter = this.fuse.search(keywords)
      } else {
        const res = this.generateRoutes(this.permission_routes)
        this.initFuse(res)
        this.lstRouter = this.fuse.list
      }
    },
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      const res = []

      for (const router of routes) {
        if (router.children) {
          for (const child of router.children) {
            if (child.hidden || child.disabled) {
              continue
            }
            const data = {
              path: path.resolve(basePath, router.path, child.path),
              title: [...prefixTitle],
              icon: ''
            }
            if (child.meta && child.meta.title) {
              data.title = this.generateTitle(child.meta.title)
              if (child.meta.icon) {
                data.icon = child.meta.icon
              }
              if (child.redirect !== 'noRedirect') {
                // only push the routes with title
                // special case: need to exclude parent router without redirect
                res.push(data)
              }
            }
          }
        }
      }

      return res
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    generateTitle,
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>
.hotel-body {
  width: 1000px;
  margin: 50px auto 20px;

  .search-container {
    position: relative;
    width: 100%;

    .btn-search {
      position: absolute;
      left: 8px;
      top: 10px;
      font-size: 25px;
      cursor: pointer;
    }

    .input-search {
      width: 100%;
      padding: 15px 20px 15px 40px;
      background: rgba(0, 0, 0, 0.3);
      border: none;
      border-radius: 3px;
      color: #fff;

      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #e2e2e2;
        opacity: 1; /* Firefox */
      }

    }
  }

  .md-card {
    box-shadow: none;
  }

  .hotel-list {
    margin: 40px auto 0;
    width: 100%;

    > div {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
    }

    .item {
      width: 175px !important;
      text-align: center;
      margin-bottom: 50px;
      margin-left: 10px;
      margin-right: 10px;

      .avatar {
        display: block;
        text-align: center;

        img {
          display: block;
          width: 60px;
          height: 60px;
          margin: 0 auto;
        }

        .icon-dashboard {
          font-size: 40px;
        }

        .icon-receptionist {
          font-size: 40px;
        }

        .icon-flat {
          font-size: 40px;
        }

        .icon-ware-house {
          font-size: 40px;
        }

      }

      .title {
        font-size: 15px;
        color: #fff;
        margin-top: 8px;
        display: block;
        font-weight: bold;
      }

      .description {
        font-size: 12px;
        color: #f8f8f8;
        margin-top: 5px;
      }

      /*&:nth-child(5n + 1),
      &:first-child {
          margin-left: 10px;
      }*/

    }
  }

  .swiper-pagination {
    &.hidden {
      display: none;
    }

  }

  a:hover {
    text-decoration: none;
    opacity: 0.8;
  }
}
</style>
