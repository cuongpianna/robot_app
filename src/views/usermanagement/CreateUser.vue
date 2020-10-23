<template>
  <div class="app-container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="role-info__inners" @submit.prevent="handleSubmit(handleSubmitUser)">
        <sticky :z-index="10" class-name="sub-navbar">
          <div class="page-title">
            <div class="title-container">
              <router-link to="/users/index" class="back-link">
                <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back"/>
              </router-link>
              <span class="title-page">{{ formTitle }}</span>
            </div>
            <div class="action-container">
              <router-link to="/users/index">
                <el-button plain class="btn-back">{{ generateTitleView('cancel', 'usermanagement') }}</el-button>
              </router-link>
              <button type="submit" plain class="btn-save">{{ generateTitleView('save', 'usermanagement') }}
              </button>
            </div>
          </div>
        </sticky>
        <v-container fluid>
          <v-card class="role-info">
            <div class="role-info__inner">
              <div class="role-info__inners">
                <div class="info-title">{{ generateTitleView('info', 'usermanagement') }}</div>
                <div class="info-content">
                  <div class="form">
                    <el-row :gutter="40" class="mb-10">
                      <el-col :span="12">
                        <ValidationProvider v-slot="{ errors }" rules="required"
                                            :name="generateTitleView('username', 'veeValidate')">
                          <v-text-field
                              v-model="formCreate.userName"
                              :label="generateTitleView('username', 'usermanagement')"
                              outlined
                              :height="10"
                          />
                          <span class="vee-errors">{{ errors[0] }}</span>
                        </ValidationProvider>

                      </el-col>

                      <el-col :span="12">
                        <ValidationProvider v-slot="{ errors }" rules="required"
                                            :name="generateTitleView('fullName', 'veeValidate')">
                          <v-text-field
                              v-model="formCreate.name"
                              :label="generateTitleView('fullname', 'usermanagement')"
                              outlined
                              :height="10"
                          />
                          <span class="vee-errors">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </el-col>
                    </el-row>

                    <el-row :gutter="40" class="mb-10">
                      <el-col :span="12">
                        <md-field>
                          <label>{{ generateTitleView('usertype', 'usermanagement') }}</label>
                          <md-select id="movie" v-model="formCreate.userType" name="movie">
                            <md-option v-for="(item, index) in userType" :key="index" :value="item.value">{{
                                item.label
                              }}
                            </md-option>
                          </md-select>
                        </md-field>

                        <div>
                          <ValidationProvider v-slot="{ errors }" rules="required"
                                              :name="generateTitleView('Position', 'veeValidate')">
                            <v-text-field
                                v-model="formCreate.position"
                                :label="generateTitleView('position', 'usermanagement')"
                                outlined
                                :height="10"
                            />
                            <span class="vee-errors">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <thumb-upload
                            :img.sync="formCreate.thumbnail"
                            :api-url="urlUpload"
                            :folder-upload="folderUpload"
                            title="Ảnh"
                        />
                      </el-col>
                    </el-row>

                    <el-row :gutter="40" class="mb-10">
                      <el-col :span="12">
                        <ValidationProvider v-slot="{ errors }" rules="required|email"
                                            :name="generateTitleView('Email', 'veeValidate')">
                          <v-text-field
                              v-model="formCreate.email"
                              :label="generateTitleView('email', 'usermanagement')"
                              outlined
                              :height="10"
                          />
                          <span class="vee-errors">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </el-col>

                      <el-col :span="12">
                        <ValidationProvider v-slot="{ errors }" :rules="{regex: /([0-9]{10})\b/}"
                                            :name="generateTitleView('phone', 'veeValidate')">
                          <v-text-field
                              v-model="formCreate.phone"
                              :label="generateTitleView('phone', 'usermanagement')"
                              outlined
                              :height="10"
                          />
                          <span class="vee-errors">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </el-col>
                    </el-row>

                    <el-row :gutter="40" class="mb-10">
                      <el-col :span="12">
                        <ValidationProvider v-slot="{ errors }" rules="required"
                                            :name="generateTitleView('Fax', 'veeValidate')">
                          <v-text-field
                              v-model="formCreate.fax"
                              :label="generateTitleView('Fax', 'usermanagement')"
                              outlined
                              :height="10"
                          />
                          <span class="vee-errors">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </el-col>

                      <el-col :span="12">

                        <ValidationProvider v-slot="{ errors }" rules="required" name="Quyền">
                          <div class="selectRole">
                            <v-select
                                v-model="formCreate.roleUser"
                                :items="roleList"
                                item-text="name"
                                :label="generateTitleView('selectRole', 'usermanagement')"
                                return-object
                                multiple
                                chips
                                dense
                                clearable="true"
                            />
                            <span class="vee-errors">{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </el-col>
                    </el-row>

                    <el-row :gutter="40" class="mb-20" align="center">
                      <el-col :span="12">
                        <div>
                          <v-combobox
                              v-model="formCreate.doctor"
                              :items="allDoctors"
                              item-text="name"
                              dense
                              clearable="true"
                              item-value="id"
                              return-object
                              :allow-overflow="false"
                              :label="generateTitleView('selectDoctor', 'usermanagement')"
                              class="vb-select"
                          />
                        </div>
                      </el-col>
                    </el-row>

                    <el-row :gutter="40" class="mb-20">
                      <el-col :span="12">
                        <v-select
                            v-model="parentId"
                            :items="listParentArea"
                            item-text="name"
                            item-value="id"
                            :label="generateTitleView('selectBigArea', 'robot')"
                            dense
                            class="vb-select"
                            @change="changeAreaParent"
                        />
                      </el-col>

                      <el-col :gutter="40" :span="12">
                        <v-select
                            v-model="childId"
                            :items="listChildrenArea"
                            item-text="name"
                            :label="generateTitleView('selectChildArea', 'robot')"
                            dense
                            item-value="id"
                            class="vb-select"
                            @change="changeAreaChild"
                        />
                      </el-col>
                    </el-row>

                    <el-row :gutter="40" class="mb-20">
                      <el-col :span="24">
                        <v-select
                            v-model="formCreate.robotList"
                            :items="listRobotByArea"
                            item-text="name"
                            :label="generateTitleView('selectRobot', 'usermanagement')"
                            return-object
                            multiple
                            chips
                            dense
                            clearable="true"
                            class="vb-select"
                        />
                      </el-col>
                    </el-row>

                    <el-row :gutter="40" class="mb-10">

                      <el-col :span="24">
                        <ValidationProvider v-slot="{ errors }" rules="required"
                                            :name="generateTitleView('Address', 'veeValidate')">
                          <v-text-field
                              v-model="formCreate.contact"
                              :label="generateTitleView('address', 'usermanagement')"
                              outlined
                              :height="10"
                          />
                          <span class="vee-errors">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-container>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'
import ThumbUpload from '@/components/AvatarUpload'
import { generateTitleView } from '@/help/utils/i18n'
import { mapGetters, mapActions } from 'vuex'
import { ACT_INSERT_USER, ACT_FETCH_ONE_USER, ACT_FETCH_ROLES, ACT_EDIT_USER } from '../../store/constants/user'
import { ACT_FETCH_ALL_ROBOTS } from '../../store/constants/robot'
import { ACT_GET_ALL_DOCTORS } from '../../store/constants/doctor'
import * as ACTIONS from '../../store/constants/user'

const LABEL = {
  model: 'usermanagement/',
  modelRobot: 'robot/',
  modelDoctor: 'doctor/',
  title: 'user',
  edit: 'Sửa',
  create: 'Tạo mới'
}

const defaultCreate = {
  name: '',
  contact: '',
  email: '',
  phone: '',
  isActive: true,
  password: '123456',
  roleUser: [],
  thumbnail: '',
  userType: 1,
  fax: '',
  position: '',
  doctor: null
}

export default {
  name: 'CreateUser',
  components: {
    Sticky,
    ThumbUpload
  },
  data() {
    return {
      parentId: '',
      childId: '',
      roles: [],
      formCreate: JSON.parse(JSON.stringify(defaultCreate)),
      isLoading: false,
      formTitle: this.$router.currentRoute.params.id != null ? this.generateTitleView('editUser', 'usermanagement') : this.generateTitleView('createUser', 'usermanagement'),
      currentUser: '',
      currentDate: '',
      isEdit: false,
      urlUpload: 'file/upUserAvatar',
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC,
      userType: [
        {
          label: 'System Admin',
          value: 1
        },
        {
          label: 'Bác sĩ',
          value: 2
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      language: 'language',
      roleList: 'usermanagement/listRoles',
      allRobots: 'robot/allRobots',
      allDoctors: LABEL.modelDoctor + 'allDoctors',
      listParentArea: LABEL.model + 'listParentArea',
      listChildrenArea: LABEL.model + 'listChildrenArea',
      listRobotByArea: LABEL.model + 'listRobotByArea'
    })
  },
  watch: {
    language: {
      immediate: true,
      handler(val, oldVal) {
      }
    }
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
    const userId = this.$router.currentRoute.params.id
    if (typeof userId !== 'undefined' && userId !== null) {
      this.getUser(userId)
    }
    this.getRole()
    this.currentUser = this.$store.state.auth.name
    if (this.formTitle === LABEL.edit) {
      this.isEdit = true
    }
    this.getAllRobots()
    this.getAllDoctors()
    this.getParentArea()
  },
  methods: {
    ...mapActions({
      getAllRobots: LABEL.modelRobot + ACT_FETCH_ALL_ROBOTS,
      getAllDoctors: LABEL.modelDoctor + ACT_GET_ALL_DOCTORS,
      getParentArea: LABEL.model + ACTIONS.ACT_GET_PARENT_AREA,
      actGetChildAreaByParent: LABEL.model + ACTIONS.ACT_GET_CHILD_AREA_BY_PARENT,
      actRobotByArea: LABEL.model + ACTIONS.ACT_GET_ROBOT_BY_AREA
    }),
    handleSubmitUser() {
      this.formTitle === this.generateTitleView('editUser', 'usermanagement') ? this.editUser() : this.createUser()
    },
    getUser(id) {
      const data = this.$store
          .dispatch(LABEL.model + ACT_FETCH_ONE_USER, id)
          .then(res => {
            const dataUser = res.payload.records[0]

            if (dataUser.roleUser != null) {
              for (const item of dataUser.roleUser) {
                this.roles.push(item.id)
              }
            }
            this.formCreate = JSON.parse(JSON.stringify(dataUser))
            if (this.formCreate.robotList.length > 0) {
              var robot1 = this.formCreate.robotList[0]
              this.parentId = robot1.map.parentId
              this.actGetChildAreaByParent({ ParentId: this.parentId })
              this.childId = robot1.map.id
              this.actRobotByArea(this.childId)
            }
          })
      return data
    },
    getRole() {
      this.$store
          .dispatch(LABEL.model + ACT_FETCH_ROLES, {
            current_page: 1,
            status: true,
            name: '',
            limit: 100
          })
    },
    createUser() {
      if (this.formCreate.userType === 'admin') {
        this.formCreate.isSystemAdmin = true
        this.formCreate.isAgencyOwner = false
      } else if (this.formCreate.userType === 'hotel') {
        this.formCreate.isSystemAdmin = false
        this.formCreate.isAgencyOwner = true
      }
      this.formCreate['created'] = new Date().toJSON()
      this.formCreate['createdBy'] = this.currentUser
      const data = this.$store
          .dispatch(LABEL.model + ACT_INSERT_USER, this.formCreate)
          .then(res => {
            if (res.isSuccess) {
              this.$notify.success({
                title: this.generateTitleView('success', 'message'),
                message: this.generateTitleView('successMessage', 'message'),
                duration: 2000
              })
              setTimeout(() => {
                window.location.href = '/#/users/index'
              }, 2000)
            } else {
              this.$notify.error({
                title: 'Thất bại',
                message: res.message,
                duration: 2000
              })
            }
          })
      return data
    },
    editUser() {
      this.formCreate['modified'] = new Date().toJSON()
      this.formCreate['modifiedBy'] = this.currentUser
      const data = this.$store
          .dispatch(LABEL.model + ACT_EDIT_USER, this.formCreate)
          .then(res => {
            if (res.isSuccess) {
              this.$notify.success({
                title: this.generateTitleView('success', 'message'),
                message: this.generateTitleView('successMessage', 'message'),
                duration: 2000
              })
              setTimeout(() => {
                window.location.href = '/#/users/index'
              }, 2000)
            } else {
              this.$notify.error({
                title: 'Thất bại',
                message: 'Dữ liệu cập nhật thất bại!',
                duration: 2000
              })
              setTimeout(() => {
                window.location.href = '/#/users/index'
              }, 2000)
            }
          })
      return data
    },
    changeAreaParent(vals) {
      this.actGetChildAreaByParent({ ParentId: vals })
    },
    changeAreaChild(vals) {
      this.actRobotByArea(vals)
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>

.vb-select /deep/ .v-select__selection {
  font-size: 14px;
}

.vb-select /deep/ input {
  font-size: 14px;
}

.mb-20 {
  margin-bottom: 10px;
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

  .role-info {
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
  color: #CE5454;
}

.role-info /deep/ .v-text-field__slot label.v-label.v-label--active {
  left: -8px !important;
  right: auto !important;
}

.role-info /deep/ .v-text-field__slot label.v-label {
  left: 0px !important;
  right: auto !important;
}

.role-info /deep/ .v-text-field--outlined fieldset {
  padding-left: 8px;
}

.role-info /deep/ .v-input__slot legend {
  text-align: left;
}

.role-info /deep/ .v-input__slot {
  min-height: 40px !important;
}

.role-info /deep/ .v-text-field--outlined .v-label {
  top: 10px;
}

.role-info /deep/ .v-text-field__slot label {
  font-weight: normal !important;
  font-size: 14px;
}

.role-info /deep/ .v-text-field__details {
  display: none;
}

.mb-10 {
  margin-bottom: 12px;
}

.mb-20 {
  margin-bottom: 25px;
}

.btn-add-camera {
  color: #fff;
  padding: 6px 15px;
  border-radius: 4px;
  font-size: 14px;
  background: #4b74db;
  cursor: pointer;
}

@media only screen and (max-width: 1400px) {
  .app-container .role-info .role-info__inner {
    flex-basis: 80%;
  }
}

@media only screen and (max-width: 1024px) {
  .app-container .role-info .role-info__inner {
    flex-basis: 100%;
  }
}
</style>
