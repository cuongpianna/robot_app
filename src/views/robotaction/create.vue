<template>
  <div class="app-container" data-app>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="role-info__inners" @submit.prevent="handleSubmit(handleSubmitUser)">
        <sticky :z-index="10" class-name="sub-navbar">
          <div class="page-title">
            <div class="title-container">
              <router-link to="/users/robot/robotAction" class="back-link">
                <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
              </router-link>
              <span class="title-page">{{ formTitle }}</span>
            </div>
            <div class="action-container">
              <router-link to="/users/robot/robotAction">
                <el-button
                  plain
                  class="btn-back"
                >{{ generateTitleView('cancel', 'usermanagement') }}
                </el-button>
              </router-link>
              <button
                type="submit"
                plain
                class="btn-save"
              >{{ generateTitleView('save', 'usermanagement') }}
              </button>
            </div>
          </div>
        </sticky>
        <md-card class="role-infor">
          <div class="role-info__inner">
            <div class="role-info__inners">
              <div class="info-title">Thêm mới lệnh điều khiển</div>
              <div class="info-content">
                <div class="form">
                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        :name="generateTitleView('Tên lệnh điều khiển', 'veeValidate')"
                      >
                        <v-text-field
                          v-model="formCreate.actionName"
                          label="Tên lệnh điều khiển"
                          outlined
                          height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        :name="generateTitleView('Mã lệnh điều khiển', 'veeValidate')"
                      >
                        <v-text-field
                          v-model="formCreate.code"
                          label="Mã lệnh điều khiển"
                          outlined
                          height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <v-text-field
                        v-model="formCreate.orderIndex"
                        label="Thứ tự"
                        outlined
                        height="10"
                        type="number"
                        min="0"
                      />
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="12">
                      <v-checkbox
                        v-model="formCreate.showInRobotDashboard"
                        label="Hiển thị trên bảng đk tự động"
                        outlined
                        height="10"
                        class="vCheckbox"
                      />
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="12">
                      <v-checkbox
                        v-model="formCreate.showInManualRobotDashboard"
                        label="Hiển thị trên bảng đk bằng tay"
                        outlined
                        height="10"
                        class="vCheckbox"
                      />
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="12">
                      <v-checkbox
                        v-model="formCreate.needRoom"
                        label="Cần danh sách phòng để thực thi lệnh"
                        outlined
                        height="10"
                        class="vCheckbox"
                      />
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </md-card>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'
import { generateTitleView } from '@/help/utils/i18n'
import { mapGetters, mapActions } from 'vuex'
import * as ACTIONS from '../../store/constants/robotaction'

const LABEL = {
  model: 'robotaction/',
  title: 'medias',
  edit: 'Sửa',
  create: 'Tạo mới'
}
const defaultCreate = {
  name: '',
  needRoom: false
}

export default {
  name: 'CreateUser',
  components: {
    Sticky
  },
  data() {
    return {
      menu: false,
      formCreate: JSON.parse(JSON.stringify(defaultCreate)),
      formTitle: 'Thêm mới lệnh điều khiển',
      currentUser: '',
      currentDate: '',
      isEdit: false
    }
  },
  computed: {
    ...mapGetters({
      language: 'language'
    })
  },
  mounted() {
    this.currentUserId = this.$store.state.auth.id
    this.currentUser = this.$store.state.auth.name

    const robotActionId = this.$router.currentRoute.params.id
    if (typeof robotActionId !== 'undefined' && robotActionId !== null) {
      this.getRobotAction(robotActionId)
      this.formTitle = 'Chỉnh sửa lệnh điều khiển'
      this.isEdit = true
    }
  },
  methods: {
    ...mapActions({
      actCreateRobotAction: LABEL.model + ACTIONS.ACT_INSERT_ROBOT_ACTION,
      actUpdateRobotAction: LABEL.model + ACTIONS.ACT_UPDATE_ROBOT_ACTION,
      actGetRobotAction: LABEL.model + ACTIONS.ACT_FETCH_ONE_ROBOT_ACTION
    }),
    handleSubmitUser() {
      if (!this.isEdit) {
        this.createRobotAction()
      } else {
        this.editRobotAction()
      }
    },

    createRobotAction() {
      this.actCreateRobotAction(this.formCreate).then((res) => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })

          setTimeout(() => {
            window.location.href = '/#/users/robot/robotAction'
          }, 2000)
        } else {
          this.$notify.error({
            title: this.generateTitleView('commonError', 'message'),
            message: res.message,
            duration: 2000
          })
        }
      })
    },
    editRobotAction() {
      this.actUpdateRobotAction(this.formCreate).then((res) => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })

          setTimeout(() => {
            window.location.href = '/#/users/robot/robotAction'
          }, 2000)
        } else {
          this.$notify.error({
            title: this.generateTitleView('commonError', 'message'),
            message: res.message,
            duration: 2000
          })
        }
      })
    },
    getRobotAction(id) {
      this.actGetRobotAction(id).then((res) => {
        const data = res.payload.records
        this.formCreate = JSON.parse(JSON.stringify(data))
      })
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>
.myInput /deep/ .v-label {
  /*left: 0 !important;*/
}

.app-container {
  .action-container {
    margin-right: 25px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
  }

  padding: 0;

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

    .btn-back {
      background: #8e97a9;
      color: #fff;
      padding: 8px 20px;
    }

    .btn-save {
      background: #123d8b;
      color: #fff;
      padding: 5px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
  }

  .role-infor {
    margin: 10px 10px 10px;
    background: #fff;
    padding: 20px;
    display: flex;

    .role-info__inner {
      flex-basis: 50%;
    }

    .info-title {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 17px;
      line-height: 28px;
      color: #212121;
    }

    .item-name /deep/ .el-input__inner {
      width: 100%;
    }

    .item-username /deep/ label,
    .item-name /deep/ label,
    .item-email /deep/ label,
    .item-phone /deep/ label,
    .item-address /deep/ label,
    .item-role /deep/ label {
      padding-bottom: 0;
    }

    .el-form-item {
      margin-bottom: 9px;
    }

    .label-hotel_admin {
      display: flex;
      margin-bottom: 0;
      margin-top: 10px;

      label {
        padding: 0;
      }

      .admin-checkbox {
        display: inline-block;
        margin-left: 15px;
      }
    }
  }
}

.selectRole /deep/ {
  .el-select.drag-select {
    height: 36px !important;
  }

  input {
    border: none !important;
    height: 36px !important;
  }
}

.vee-errors {
  color: #ce5454;
}

.role-infor /deep/ .v-text-field__slot label.v-label.v-label--active {
  left: -8px !important;
  right: auto !important;
}

.role-infor /deep/ .v-text-field__slot label.v-label {
  left: 0px !important;
  right: auto !important;
}

.role-infor /deep/ .v-text-field--outlined fieldset {
  padding-left: 8px;
}

.role-infor /deep/ .v-input__slot legend {
  text-align: left;
}

.role-infor /deep/ .v-input__slot {
  min-height: 40px !important;
}

.role-infor /deep/ .v-text-field--outlined .v-label {
  top: 10px;
}

.role-infor /deep/ .v-text-field__slot label {
  font-weight: normal !important;
  font-size: 14px;
}

.role-infor /deep/ .v-text-field__details {
  display: none;
}

.mb-10 {
  margin-bottom: 12px;
}

.vibotDateWrap /deep/ .v-text-field {
  padding-top: 0 !important;
}

@media only screen and (max-width: 1400px) {
  .app-container .role-infor .role-info__inner {
    flex-basis: 80%;
  }
}

@media only screen and (max-width: 1024px) {
  .app-container .role-infor .role-info__inner {
    flex-basis: 100%;
  }
}

.vCheckbox{
  margin-top: 0;

  /deep/ .v-messages{
    display: none;
  }

  /deep/ {
    .v-input__slot{
      margin: 0;
    }
  }
}
</style>
