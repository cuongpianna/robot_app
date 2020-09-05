<template>
  <div class="hotel-header">
    <div class="header-title">
      <md-icon class="home-icon">house</md-icon>
      <span class="header-text">{{ generateTitleView('title', 'dashboard') }}</span>
    </div>
    <div class="user-profile">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span v-if="avatar" class="avatar">
            <font-awesome-icon icon="user" color="#fff" />
          </span>
          <span v-else class="avatar">
            <img src="@/assets/avatar.svg" alt="">
          </span>
          <span class="username">
            {{ name }}
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span
              style="display:block;"
              @click="logout"
            >{{ generateTitleView('logout', 'dashboard') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="user-action">
        <el-dialog
          :width="'660px'"
          :before-close="handleClosePopup"
          :title="PAGE_TITLE + ' - ' + formTitle.toUpperCase() "
          :close-on-click-modal="clickOutsideDialog"
          :close-on-press-escape="escapePressDialog"
          :visible.sync="dialogForm"
        >
          <el-form ref="form" :model="formCreate" :rules="rules" label-position="left" label-width="150px">
            <el-form-item
              label="Tên"
              prop="name"
            >
              <el-input v-model="formCreate.name" :disabled="false" />
            </el-form-item>

            <el-form-item
              label="Trạng thái"
              prop="status"
            >
              <el-select v-model="formCreate.status" placeholder="Select">
                <el-option
                  v-for="item in statusArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="Quốc gia"
              prop="country"
            >
              <el-select v-model="formCreate.country" placeholder="Select">
                <el-option
                  v-for="item in countryArray || []"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                </el-option>
              </el-select>
              <el-select
                v-if="!isLoading"
                v-model="formCreate.city"
                placeholder="Select"
              >
                <el-option
                  v-for="(item, index) in citiesArray || []"
                  :key="index + item.province"
                  :label="item.province"
                  :value="item.province"
                >
                  <span style="float: left">{{ item['province'] }}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="Địa chỉ"
              prop="address"
            >
              <el-input v-model="formCreate.address" :disabled="false" />
            </el-form-item>

            <avatar-upload v-if="isUploadThumb" :img.sync="formCreate.thumbnail" @change="updateThumbail" />

            <el-form-item
              label="Số điện thoại"
              prop="telephoneNumber"
            >
              <el-input v-model="formCreate.telephoneNumber" :disabled="false" />
            </el-form-item>

            <el-form-item
              label="Ảnh đại diện"
              prop="thumbnail"
            >
              <thumb-upload v-if="dialogForm" :img.sync="formCreate.thumbnail" />
            </el-form-item>

            <el-form-item
              label="Mô tả"
              prop="description"
            >
              <el-input
                v-model="formCreate.description"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
              />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="info" icon="el-icon-circle-close" plain @click="handleClosePopup">Tắt</el-button>
            <el-button type="primary" icon="el-icon-refresh" plain @click="resetForm('form')">Đặt lại</el-button>
            <el-button type="success" icon="el-icon-check" @click="handleSubmit">{{ formTitle }}</el-button>
          </span>
        </el-dialog>
      </div>

      <dashboard-setting
        :is-open.sync="isOpen"
        :chose-city.sync="choseCity"
        :chose-background.sync="choseBackground"
      />
    </div>
  </div>
</template>

<script>
import request from '@/help/request'
import axios from 'axios'
import { mapGetters } from 'vuex'
import DashboardSetting from '@/components/Dashboard/setting'
import ThumbUpload from '@/components/AvatarUpload'
import { checkNumber } from '@/help/utils'
import { generateTitleView } from '@/help/utils/i18n'

const LABEL = {
  name: 'Agency',
  title: 'HOTEL',
  model: 'hotel',
  slug: 'hotel',
  edit: 'Sửa',
  create: 'Tạo mới'
}

const CUSTOMIZE = {
  status: [
    { value: 1, label: 'Ngừng hoạt động' },
    { value: 2, label: 'Đang bảo trì' },
    { value: 3, label: 'Đang hoạt động' }
  ]
}
const defaultCreate = {
  name: '',
  country: '',
  city: '',
  address: '',
  telephoneNumber: '',
  status: 1,
  description: '',
  thumbnail: ''
}

const rules = {
  name: [
    { required: true, message: `Vui lòng nhập tên ${LABEL.title.toLowerCase()}!`, trigger: 'blur' }
  ],
  address: [
    { required: true, message: 'Vui lòng nhập mô tả!', trigger: 'blur' }
  ],
  telephoneNumber: [
    { required: true, message: 'Vui lòng nhập mô tả!', trigger: 'blur' },
    { validator: checkNumber, message: 'Vui lòng nhập đúng dạng số', trigger: 'blur' }
  ]
}

export default {
  name: 'DashboardHeader',
  components: {
    DashboardSetting,
    ThumbUpload
  },
  props: {
    'isActive': {
      type: Boolean,
      default() {
        return false
      }
    },
    'name': {
      type: String,
      default() {
        return ''
      }
    },
    'avatar': {
      type: String,
      default() {
        return ''
      }
    },
    'city': {
      type: String,
      default() {
        return ''
      }
    },
    'background': {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      isOpen: this.isActive,
      choseCity: this.city,
      choseBackground: this.background,
      formCreate: JSON.parse(JSON.stringify(defaultCreate)),
      countryArray: [],
      citiesArray: [],
      tableData: [],
      statusArray: CUSTOMIZE.status,
      storage_public: process.env.VUE_APP_STORAGE_PUBLIC,
      isUploadThumb: false,
      rules,
      PAGE_TITLE: LABEL.title,
      formTitle: LABEL.create,
      isLoading: false,
      dialogForm: false,
      clickOutsideDialog: false,
      escapePressDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'hotels'
    ])
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(val, oldVal) {
        this.$emit('update:isActive', val)
      }
    },
    choseCity: {
      immediate: true,
      handler(val, oldVal) {
        this.$emit('update:city', val)
      }
    },
    choseBackground: {
      immediate: true,
      handler(val, oldVal) {
        this.$emit('update:background', val)
      }
    }
  },
  mounted() {
    this.getApi()
  },
  methods: {
    updateThumbail(img) {
      if (!img) return
      this.formCreate.thumbnail = img
    },
    handleClosePopup() {
      this.dialogForm = false
      setTimeout(() => {
        this.formTitle = LABEL.create
        this.formCreate = JSON.parse(JSON.stringify(defaultCreate))
        this.resetForm()
      }, 300)
    },
    getApi() {
      // this.getApiCountry()
      // this.getApiCities()
    },
    getApiCountry() {
      this.isLoading = true
      const data = request({
        url: '/country',
        method: 'get',
        data: data
      }).then(res => {
        this.countryArray = res || []
        this.getApiCities()
        this.isLoading = false
      })
      return data
    },
    getApiCities() {
      this.isLoading = true
      const data = axios({
        url: 'https://raw.githubusercontent.com/hienvd/vietnam-cities-list/master/cities.json',
        method: 'get',
        data: data
      }).then(res => {
        this.citiesArray = res.data ? JSON.parse(JSON.stringify(res.data)) : []
        this.isLoading = false
      })
      return data
    },
    handleSubmit() {
      this.formTitle === LABEL.edit ? this.editItem() : this.createItem()
    },
    createItem() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const tableData = this.tableData
          this.$store.dispatch(LABEL.model + '/Create', this.formCreate)
              .then(res => {
                if (res.success) {
                  const newItem = res.data.hotel
                  if (tableData && (tableData.length === 0)) {
                    tableData.push(newItem)
                  } else {
                    if (!tableData.some(item => item.id === newItem.id)) {
                      tableData.unshift(newItem)
                    }
                    const isRemoveEnd = tableData.length > this.pagination.per_page
                    if (isRemoveEnd) {
                      tableData.pop()
                      ++this.pagination.total
                      this.showPagi = true
                    }
                  }
                }
                this.$notify.success({
                  title: 'Thành công',
                  message: 'Dữ liệu tạo mới thành công !',
                  duration: 4000
                })
                this.tableData = JSON.parse(JSON.stringify(tableData))
                this.handleClosePopup()
              })
              .catch(_err => {
                console.log(_err)
                this.isLoading = false
                this.$notify.error({
                  title: 'Lỗi',
                  message: 'Đang gặp sự cố, vui lòng báo hệ thống xử lý!',
                  duration: 4000
                })
              })
        } else {
          this.handleClosePopup()
          return false
        }
      })
    },
    handleChangeActions(items) {
      const { type, data } = items
      switch (type) {
        case 'edit':
          this.formTitle = LABEL.edit
          this.formCreate = JSON.parse(JSON.stringify(data))
          this.dialogForm = true
          break
        case 'create':
          this.formTitle = LABEL.create
          this.formCreate = JSON.parse(JSON.stringify(defaultCreate))
          this.dialogForm = true
          break
        default:
          break
      }
    },
    resetForm() {
      let formCreate = JSON.parse(JSON.stringify(this.formCreate))
      this.$refs['form'].resetFields()
      if (this.formTitle === LABEL.create) {
        formCreate = JSON.parse(JSON.stringify(defaultCreate))
      } else {
        formCreate = JSON.parse(JSON.stringify(this.tableData.find(item => item.id === formCreate.id)))
      }
      this.formCreate = formCreate
    },
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>
$color1: #2F80ED;
.hotel-header {
  height: 60px;
  background: #ffffff;
  align-items: center;
  padding: 0 30px 0 12px;
  display: flex;
  justify-content: space-between;

  .header-title {
    .header-text {
      margin-top: 5px;
      color: $color1;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: bold;
      margin-left: 5px;
    }

  }

  .user-profile {
    display: flex;
    justify-content: flex-start;

    .avatar-container {
      .avatar-wrapper {
        display: flex;
        justify-content: flex-start;
      }

    }

    .avatar {
      cursor: pointer;
      position: relative;
      top: 0;

      img {
        display: block;
        border-radius: 100%;
        width: 25px;
        height: 25px;
      }

    }

    .username {
      cursor: pointer;
      color: black;
      font-size: 15px;
      margin-left: 10px;
      display: inline-flex;
      align-items: center;
    }

    .notification {
      margin-left: 10px;
      position: relative;
      top: -3px;

      .number {
        color: black;
        font-size: 12px;
        padding: 5px 7px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
      }

    }

    .user-action {
      margin-left: 10px;
      position: relative;
      top: 1px;
      cursor: pointer;
    }

    .setting-bar {
      margin-left: 10px;

      .setting {
        color: black;
      }

    }
  }

  .home-icon {
    color: $color1 !important;
  }

  a:hover {
    text-decoration: none;
  }

}
</style>
