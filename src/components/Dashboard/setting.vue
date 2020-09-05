<template>
  <div v-clickoutside="closeActive" class="setting-bar">
    <a title="Cài đặt" class="setting" @click.prevent="toggleActive">
      <font-awesome-icon icon="bars" color="#fff" />
    </a>
    <div class="sidebar-setting" :class="{ 'active' : isOpenInChild }">
      <div class="sidebar">
        <div class="sidebar-header">
          <span class="title">{{ generateTitleView('setting', 'dashboard') }}</span>
          <span class="close-menu" @click.prevent="closeActive">
            <span class="line-1" />
            <span class="line-2" />
          </span>
        </div>
        <div class="sidebar-body">
          <div class="option-list">
            <div class="option-bg">
              <div class="bg-header">
                {{ generateTitleView('choseColor', 'dashboard') }}
              </div>
              <div id="bgColor" class="bg-list">
                <div class="item blue-green" data-color="#0095B6" @click="toggleBackgroundColor($event, '#0095B6')" />
                <div class="item purple" data-color="purple" @click="toggleBackgroundColor($event, 'purple')" />
                <div class="item cyan" data-color="cyan" @click="toggleBackgroundColor($event, 'cyan')" />
                <div class="item green" data-color="green" @click="toggleBackgroundColor($event, 'green')" />
                <div class="item amethyst" data-color="#9966CC" @click="toggleBackgroundColor($event, '#9966CC')" />
                <div class="item amber" data-color="#FFBF00" @click="toggleBackgroundColor($event, '#FFBF00')" />
                <div class="item orange" data-color="orange" @click="toggleBackgroundColor($event, 'orange')" />
                <div class="item puce" data-color="#CC8899" @click="toggleBackgroundColor($event, '#CC8899')" />
                <div class="item pink" data-color="pink" @click="toggleBackgroundColor($event, 'pink')" />
              </div>
            </div>
            <div class="option-img">
              <div class="img-header">{{ generateTitleView('imageLibrary', 'dashboard') }}</div>
              <div id="bgImage" class="img-list">
                <img
                  v-for="(item, index) in bgImages || []"
                  :key="index"
                  :src="storage_public + '/' + item"
                  :data-src="'/' + item"
                  @click="toggleBackgroundImage($event)"
                >
              </div>
            </div>
            <div class="option-upload">
              <div class="img-header">
                <input id="fileUpload" type="file" hidden @change="uploadBgImage">
                <a
                  title="Tải ảnh"
                  class="btn-upload-bg"
                  @click.stop.prevent="fileUploadGallery"
                >{{ generateTitleView('uploadImage', 'dashboard') }}</a>
              </div>
            </div>
          </div>
          <div class="option-city">
            <div class="city-header">{{ generateTitleView('choseCity', 'dashboard') }}</div>
            <el-select
              v-if="!isLoading"
              v-model="city"
              :placeholder="generateTitleView('choseCity', 'dashboard')"
              :value="city"
              class="cities-list"
            >
              <el-option
                v-for="(item, index) in citiesArray || []"
                :key="index + item.city"
                :label="item.city"
                :value="item.city"
              >
                {{ item['city'] }}
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import ThemePicker from '@/components/ThemePicker'
import { mapGetters } from 'vuex'
import { generateTitleView } from '@/help/utils/i18n'

const LABEL = {
  model: 'file'
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

export default {
  name: 'DashboardSetting',
  components: { ThemePicker },
  directives: {
    clickoutside: {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          // here I check that click was outside the el and his childrens
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
        document.body.addEventListener('touchstart', el.clickOutsideEvent)
      },
      unbind: function(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
        document.body.removeEventListener('touchstart', el.clickOutsideEvent)
      },
      stopProp(event) {
        event.stopPropagation()
      }
    }
  },
  props: {
    'isOpen': {
      type: Boolean,
      default() {
        return false
      }
    },
    'choseCity': {
      type: String,
      default() {
        return ''
      }
    },
    'choseBackground': {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      cityUrl: 'https://raw.githubusercontent.com/hienvd/vietnam-cities-list/master/cities.json',
      isLoading: false,
      isOpenInChild: this.isOpen,
      citiesArray: [],
      city: this.choseCity,
      storage_public: process.env.VUE_APP_STORAGE_BG_DASHBOARD_PUBLIC
    }
  },
  computed: {
    ...mapGetters([
      'bgImages'
    ])
  },
  watch: {
    city: {
      immediate: true,
      handler(val, oldVal) {
        Cookies.set('cookieCity', val, { expires: 365 })
        this.$emit('update:choseCity', val)
      }
    },
    choseBackground: {
      immediate: true,
      handler(val, oldVal) {
        const me = this
        Cookies.set('backgroundAgency', val, { expires: 365 })
        this.$emit('update:choseBackground', val)
        setTimeout(() => {
          me.addSelected()
        }, 500)
      }
    }
  },
  mounted() {
    this.getApiCities()
    this.getApiBgImages()
  },
  methods: {
    toggleActive() {
      this.isOpenInChild = !this.isOpenInChild
      this.$emit('update:isOpen', this.isOpenInChild)
    },
    closeActive() {
      this.isOpenInChild = false
      this.$emit('update:isOpen', this.isOpenInChild)
    },
    fileUploadGallery() {
      document.getElementById('fileUpload').click()
    },
    uploadBgImage(event) {
      const me = this
      const imagePath = event.target.files[0]
      if (imagePath) {
        const base64 = toBase64(imagePath).then(result => {
          const formData = new FormData()
          formData.append('base64Image', result)
          formData.enctype = 'multipart/form-data'
          const data = this.$store.dispatch(LABEL.model + '/UploadBgAgencyApi', formData).then(res => {
            if (res.isSuccess) {
              me.getApiBgImages()
              me.$emit('update:choseBackground', me.storage_public + '/' + res.data)
            }
          })
          return data
        })
        return base64
      }
    },
    getApiCities() {
      this.isLoading = true
      const data = axios({
        url: this.cityUrl,
        method: 'get',
        data: data
      }).then(res => {
        this.citiesArray = res.data ? JSON.parse(JSON.stringify(res.data)) : []
        this.isLoading = false
      })
      return data
    },
    getApiBgImages() {
      const data = this.$store.dispatch(LABEL.model + '/FetchImages').then()
      return data
    },
    toggleBackgroundColor(event, bgVal) {
      Cookies.set('backgroundAgency', bgVal, { expires: 365 })
      this.$emit('update:choseBackground', bgVal)
    },
    toggleBackgroundImage(event) {
      const el = event.currentTarget
      const src = el.getAttribute('src')
      Cookies.set('backgroundAgency', src, { expires: 365 })
      this.$emit('update:choseBackground', src)
    },
    removeSelected() {
      const lstElColor = document.getElementById('bgColor').querySelectorAll('.item')
      const lstElImage = document.getElementById('bgImage').querySelectorAll('img')
      lstElColor.forEach(function(item, index) {
        item.classList.remove('active')
      })
      lstElImage.forEach(function(item, index) {
        item.classList.remove('active')
      })
    },
    addSelected() {
      const me = this
      const lstElColor = document.getElementById('bgColor').querySelectorAll('.item')
      const lstElImage = document.getElementById('bgImage').querySelectorAll('img')
      me.removeSelected()
      lstElColor.forEach(function(item, index) {
        const attr = item.getAttribute('data-color')
        if (me.choseBackground === attr) {
          item.classList.add('active')
        }
      })
      lstElImage.forEach(function(item, index) {
        const attr = item.getAttribute('data-src')
        if (me.choseBackground.endsWith(attr)) {
          item.classList.add('active')
        }
      })
    },
    themeChange(val) {
      Cookies.set('backgroundAgency', val, { expires: 365 })
      this.$emit('update:choseBackground', val)
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>
.sidebar-setting {
  position: fixed;
  right: 0;
  top: 0;
  width: 0;
  background: #1f2d3d;
  height: 100%;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all ease-in-out .3s;

  &.active {
    width: 402px;
    opacity: 1;
    visibility: visible;

    .sidebar-body {
      display: block;
    }

  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: rgba(0, 0, 0, 0.2);

    .title {
      color: #fff;
      font-size: 15px;
      font-weight: bold;
    }

    .close-menu {
      position: relative;
      cursor: pointer;
      width: 20px;
      height: 20px;

      .line-1 {
        background: #fff;
        width: 20px;
        height: 2px;
        border-radius: 2px;
        position: absolute;
        right: 0;
        top: 8px;
        transform: rotate(45deg);
      }

      .line-2 {
        background: #fff;
        width: 20px;
        height: 2px;
        border-radius: 2px;
        position: absolute;
        right: 0;
        top: 8px;
        transform: rotate(-45deg);
      }

    }
  }

  .sidebar-body {
    display: none;
    padding: 10px 20px;

    .option-list {
      .option-bg {
        border-bottom: 1px solid #b2b2b2;
        margin-bottom: 10px;

        .bg-header {
          color: #b2b2b2;
          font-size: 15px;
          padding: 0 0 10px;
        }

        .bg-list {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;

          .item {
            width: 52px;
            height: 30px;
            margin-left: 10px;
            margin-bottom: 10px;
            border: 3px solid transparent;
            cursor: pointer;

            &:first-child {
              margin-left: 0;
            }

            &:nth-child(6n+1) {
              margin-left: 0;
            }

            &.active {
              border-color: #f2f2f2;
            }

          }

          .blue-green {
            background: #0095B6;
          }

          .purple {
            background: purple;
          }

          .cyan {
            background: cyan;
          }

          .green {
            background: green;
          }

          .amethyst {
            background: #9966CC;
          }

          .amber {
            background: #FFBF00;
          }

          .orange {
            background: orange;
          }

          .puce {
            background: #CC8899;
          }

          .pink {
            background: pink;
          }

        }
      }

      .option-img {
        border-bottom: 1px solid #b2b2b2;
        margin-bottom: 10px;

        .img-header {
          font-size: 15px;
          color: #b2b2b2;
          padding: 0 0 10px;
        }

        .img-list {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;

          img {
            margin-left: 10px;
            width: 83px;
            height: 50px;
            display: block;
            margin-bottom: 10px;
            border: 3px solid transparent;
            cursor: pointer;

            &:first-child {
              margin-left: 0;
            }

            &:nth-child(4n+1) {
              margin-left: 0;
            }

            &.active {
              border-color: #f2f2f2;
            }

          }
        }
      }

      .option-upload {
        .img-header {
          .btn-upload-bg {
            font-size: 15px;
            color: #b2b2b2;
            display: block;
          }

        }
      }
    }

    .option-city {
      margin-top: 10px;
      padding: 10px 0;
      border-top: 5px solid rgba(0, 0, 0, 0.2);

      .city-header {
        color: #b2b2b2;
        font-size: 15px;
        padding: 0 0 10px;
      }

      .cities-list {
        width: 100%;
      }

    }
  }
}
</style>
