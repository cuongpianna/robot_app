<template>
  <div class="app-container">
    <div class="dashboard-container">
      <dashboard-footer :name="name" :city.sync="city" />
      <v-container class="v-container" fluid>
        <dashboard-map />
      </v-container>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import request from '@/help/request'
import axios from 'axios'
import { mapGetters } from 'vuex'
import DashboardFooter from '@/components/Dashboard/footer'
import DashboardMap from '@/components/Dashboard/map'
import RobotFilter from '@/components/Dashboard/RobotFilter'
import RobotList from '@/components/Dashboard/RobotList'

const LABEL = {
  name: 'Agency',
  title: 'HOTEL',
  model: 'hotel',
  slug: 'hotel',
  edit: 'Sửa',
  create: 'Tạo mới'
}

const defaultCreate = {
  name: '',
  country: '',
  city: '',
  address: '',
  telephoneNumber: '',
  status: 1,
  description: ''
}

export default {
  name: LABEL.name,
  components: {
    DashboardFooter,
    DashboardMap
  },
  data() {
    return {
      isUploadThumb: false,
      storage_public: process.env.VUE_APP_STORAGE_BG_DASHBOARD_PUBLIC,
      countryArray: [],
      citiesArray: [],
      PAGE_TITLE: LABEL.title,
      formTitle: LABEL.create,
      isLoading: false,
      dialogForm: false,
      formEdit: null,
      formCreate: JSON.parse(JSON.stringify(defaultCreate)),
      tableData: [],
      pagination: {
        current_page: 1,
        per_page: 0,
        total: 0
      },
      isActive: false,
      hotelList: [],
      city: Cookies.get('cookieCity') || 'Hà Nội',
      background: Cookies.get('backgroundAgency') || '#0095B6',
      backgroundUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'email',
      'avatar'
    ])
  },
  watch: {
    '$route': {
      handler: function(nextValue) {
        const { path } = nextValue
        if (path === `/${LABEL.slug}/index`) {
          this.getApi()
        }
      },
      deep: true,
      immediate: true
    },
    'background': {
      immediate: true,
        handler: function(val, oldVal) {
            if (val.startsWith('http')) {
                this.backgroundUrl = `background-image: url(${val}); background-repeat: no-repeat; background-size: cover;`
        } else {
          this.backgroundUrl = `background: ${val};`
        }
      }
    }
  },
  mounted() {
      this.getApi()
      this.$store.commit('app/CLOSE_SIDEBAR')
  },
  methods: {
    getApi(current_page = 1) {
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
    updatePagination(
      current_page = this.pagination.current_page,
      total = this.pagination.total,
      per_page = this.pagination.per_page) {
      const updatedPagination = {
        current_page
      }
      total && (updatedPagination.total = total)
      per_page && (updatedPagination.per_page = per_page)
      this.pagination = JSON.parse(JSON.stringify(updatedPagination))
      this.showPagi = updatedPagination.per_page && total > updatedPagination.per_page
    },
    handleClosePopup() {
      this.dialogForm = false
      setTimeout(() => {
        this.formTitle = LABEL.create
        this.formCreate = JSON.parse(JSON.stringify(defaultCreate))
        this.resetForm()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>

  .app-container {
    padding: 0;
  }
.pagination-container {
  display: flex;
  justify-content: flex-end;
}

.filter-container {
  display: flex;
  justify-content: flex-end;
}

.el-button--mini.is-round:hover {
  box-shadow: 0px 1px 5px 0px rgb(179, 216, 255) !important;
}

input[type=text] {
  border: none;
  border-bottom: 1px solid #dcdfe6;
  outline: none;
}
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      /*margin-top: 60px;*/
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}

  .dashboard-container{
    background: linear-gradient(180deg, #6196EF 0%, #3A6FD0 100%);
      min-height: calc(100vh - 60px) !important;
      padding-left: 40px;
      padding-right: 80px;
      padding-bottom: 60px;
  }

  .v-container{
    padding-top: 0;
    padding-bottom: 0;
  }

  @media only screen and (max-width: 480px) {
    .dashboard-container{
      padding-left: 10px;
      padding-right: 10px;
    }
  }

</style>
