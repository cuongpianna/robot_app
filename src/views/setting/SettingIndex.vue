<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link class="back-link" to="/dashboard" title="DashBoard">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back"/>
          </router-link>
          <span class="title-page">{{ generateTitleView('settingManagement', 'setting') }}</span>
        </div>

      </div>
    </sticky>

    <v-card class="content_wrap">
      <div class="content">
        <div class="online-setting rows">
          <div class="label">{{ generateTitleView('onlineSetting', 'setting') }}</div>
          <div class="select-right">
            <v-select
                v-model="formCreate.isOnline"
                :items="isInternetSettings"
                solo
                item-text="label"
                item-value="value"
                :label="generateTitleView('Select' ,'setting')"
                dense
            />
          </div>
        </div>

        <div class="online-setting rows">
          <div class="label">{{ generateTitleView('hideVideo', 'setting') }}</div>
          <div class="select-right">
            <v-select
                v-model="formCreate.isTwoCamera"
                :items="cameraSettings"
                solo
                item-text="label"
                item-value="value"
                :label="generateTitleView('Select' ,'setting')"
                dense
            />
          </div>
        </div>

        <div class="online-setting">
          <div class="label">Cấu hình hệ thống sử dụng mạng Lan</div>
          <div class="select-right-ip" style="padding-top: 5px">
            <vs-input
                label-placeholder="Địa chỉ video call"
                v-model="formCreate.jistiDomain"
            />
          </div>
        </div>

        <div class="online-setting" style="margin-top: 15px">
          <div class="label">Cấu hình hệ thống sử dụng mạng Internet</div>
          <div class="select-right-ip" style="padding-top: 5px">
            <vs-input
                label-placeholder="Địa chỉ video call"
                v-model="formCreate.jistiDomainInternet"
            />
          </div>
        </div>

        <div class="submit-row">
          <v-btn small class="btnSubmit" @click="saveSetting">{{ generateTitleView('save', 'usermanagement') }}</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Sticky from '@/components/Sticky'
import { generateTitleView } from '@/help/utils/i18n'
import { hasPermissionAction } from '@/help/utils/index'
import * as ACTIONS from '../../store/constants/setting'

const LABEL = {
  model: 'setting/'
}

const defaultCreate = {
  isOnline: '',
  isTwoCamera: true,
  jistiDomain: '',
  jistiDomainInternet: ''
}

export default {
  name: 'SettingIndex',
  components: {
    Sticky
  },
  data() {
    return {
      modules: [],
      listQuery: {
        page: 1,
        name: '',
        status: null,
        limit: 10
      },
      isLoading: true,
      roleList: [],
      formCreate: JSON.parse(JSON.stringify(defaultCreate)),
      cameraSettings: [
        { label: this.generateTitleView('show', 'setting'), value: true },
        { label: this.generateTitleView('hide', 'setting'), value: false }
      ],
      isInternetSettings: [
        { label: 'Mạng Internet', value: true },
        { label: 'Mạng Lan', value: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      language: 'language',
      settingObject: LABEL.model + 'settingObject'
    })
  },
  watch: {
    language: {
      immediate: true,
      handler() {
        this.listStatus = [
          { value: false, label: this.generateTitleView('deactive', 'module') },
          { value: true, label: this.generateTitleView('active', 'module') }
        ]
      }
    }
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
    this.roleList = this.$store.state.auth.roles
    this.getSetting()
  },
  methods: {
    ...mapActions({
      actGetSetting: LABEL.model + ACTIONS.ACT_GET_SETTING,
      actUpdateSetting: LABEL.model + ACTIONS.ACT_UPDATE_SETTING
    }),
    getSetting() {
      this.actGetSetting({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit
      }).then(res => {
        this.formCreate = JSON.parse(JSON.stringify(res.payload.records[0]))
      })
    },
    saveSetting() {
      this.formCreate['modified'] = new Date().toJSON()
      this.formCreate['modifiedBy'] = this.currentUser
      this.actUpdateSetting(this.formCreate).then(res => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })
        } else {
          this.$notify.error({
            title: 'Thất bại',
            message: 'Dữ liệu cập nhật thất bại!',
            duration: 2000
          })
        }
      })
    },
    generateTitleView,
    hasPermissionAction
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.select-right {
  max-width: 205px;
}

.select-right-ip {
  max-width: 350px;
}

.app-container {
  padding: 0;

  .back-link {
    display: inline-flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .page-title {
    padding: 0 25px;
    background: #fff;
    font-size: 24px;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .title-container {
      display: flex;
    }

    .icon-back {
      font-size: 12px;
      margin-top: 4px;
    }

    .title-page {
      margin-left: 10px;
      font-weight: bold;
      color: rgba(33, 33, 33, 0.85);
    }

    .btn-export-excel {
      padding: 5px 10px;
    }

    .btn-create-hotel {
      padding: 5px 10px;
    }

  }
}

.content_wrap {
  margin: 10px;
  display: flex;

  .content {
    flex-basis: 50%;
    padding: 15px;

    .label {
      font-size: 15px;
      font-weight: 600;
    }

    .rows {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .submit-row {
      margin-top: 15px;
      text-align: right;

      .btnSubmit {
        background: #1867c0 !important;
        color: #fff;
      }
    }
  }
}
</style>

