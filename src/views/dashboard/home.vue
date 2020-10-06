<template>
  <div class="app-container">
    <div class="dashboard-container">
      <dashboard-footer :name="name" :city.sync="city"/>
      <v-container class="v-container" fluid>
        <dashboard-map/>
      </v-container>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
import DashboardFooter from '@/components/Dashboard/footer'
import DashboardMap from '@/components/Dashboard/map'

export default {
  name: 'HomeDashboard',
  components: {
    DashboardFooter,
    DashboardMap
  },
  data() {
    return {
      city: Cookies.get('cookieCity') || 'Hà Nội',
      background: Cookies.get('backgroundAgency') || '#0095B6',
      backgroundUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  watch: {
    'background': {
      immediate: true,
      handler: function(val) {
        if (val.startsWith('http')) {
          this.backgroundUrl = `background-image: url(${val}); background-repeat: no-repeat; background-size: cover;`
        } else {
          this.backgroundUrl = `background: ${val};`
        }
      }
    }
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT ROBOT')
    this.$store.commit('app/CLOSE_SIDEBAR')
  }
}
</script>

<style lang="scss" scoped>

.app-container {
  padding: 0;
}


input[type=text] {
  border: none;
  border-bottom: 1px solid #dcdfe6;
  outline: none;
}

.dashboard-container {
  background: linear-gradient(180deg, #6196EF 0%, #3A6FD0 100%);
  min-height: calc(100vh - 60px) !important;
  padding-left: 40px;
  padding-right: 80px;
  padding-bottom: 60px;
}

.v-container {
  padding-top: 0;
  padding-bottom: 0;
}

@media only screen and (max-width: 480px) {
  .dashboard-container {
    padding-left: 10px;
    padding-right: 10px;
  }
}

</style>
