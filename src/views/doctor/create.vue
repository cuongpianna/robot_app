<template>
  <div class="app-container" data-app>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="role-info__inners" @submit.prevent="handleSubmit(handleSubmitUser)">
        <sticky :z-index="10" class-name="sub-navbar">
          <div class="page-title">
            <div class="title-container">
              <router-link to="/users/doctors/index" class="back-link">
                <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back"/>
              </router-link>
              <span class="title-page">{{ formTitle }}</span>
            </div>
            <div class="action-container">
              <router-link to="/users/doctors/index">
                <el-button plain class="btn-back">{{ generateTitleView('cancel', 'usermanagement') }}</el-button>
              </router-link>
              <button type="submit" plain class="btn-save">{{ generateTitleView('save', 'usermanagement') }}
              </button>
            </div>
          </div>
        </sticky>
        <md-card class="role-info">
          <div class="role-info__inner">
            <div class="role-info__inners">
              <div class="info-title">{{ generateTitleView('info', 'usermanagement') }}</div>
              <div class="info-content">
                <div class="form">
                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <ValidationProvider v-slot="{ errors }" rules="required"
                                          :name="generateTitleView('doctorName', 'veeValidate')">
                        <v-text-field
                            v-model="formCreate.name"
                            :label="generateTitleView('doctorName', 'doctor')"
                            outlined
                            :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>

                    </el-col>

                    <el-col :span="12">
                      <ValidationProvider v-slot="{ errors }" rules="required"
                                          :name="generateTitleView('education', 'veeValidate')">
                        <v-text-field
                            v-model="formCreate.education"
                            :label="generateTitleView('education', 'doctor')"
                            outlined
                            :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
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

                        <ValidationProvider v-slot="{ errors }" rules="required"
                                            :name="generateTitleView('Position', 'veeValidate')">
                          <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="formCreate.birthday"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                  v-model="formCreate.birthday"
                                  :label="generateTitleView('birthday', 'doctor')"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                              />
                            </template>
                            <v-date-picker v-model="formCreate.birthday" no-title scrollable>
                              <v-spacer/>
                              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                              <v-btn text color="primary" @click="$refs.menu.save(formCreate.birthday)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                          <span class="vee-errors">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </el-col>
                    <el-col :span="12" class="vibotDateWrap">
                      <thumb-upload
                          :img.sync="formCreate.thumbnail"
                          :api-url="urlUpload"
                          :folder-upload="folderUpload"
                          title="Ảnh bác sĩ"
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
                                          :name="generateTitleView('workat', 'veeValidate')">
                        <v-text-field
                            v-model="formCreate.workAt"
                            :label="generateTitleView('workat', 'doctor')"
                            outlined
                            :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>

                    <el-col :span="12">
                      <ValidationProvider v-slot="{ errors }" rules="required"
                                          :name="generateTitleView('specialize', 'veeValidate')">
                        <v-text-field
                            v-model="formCreate.specialize"
                            :label="generateTitleView('specialize', 'doctor')"
                            outlined
                            :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="24">
                      <v-textarea
                          v-model="formCreate.description"
                          solo
                          :label="generateTitleView('description', 'doctor')"
                          outlined
                          rows="3"
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
import ThumbUpload from '@/components/AvatarUpload'
import { mapGetters, mapActions } from 'vuex'
import * as ACTIONS from '../../store/constants/doctor'

const LABEL = {
  model: 'doctor/'
}

const defaultCreate = {
  name: '',
  birthday: new Date().toISOString().substr(0, 10),
  specialize: '',
  description: '',
  email: '',
  phone: '',
  isActive: true,
  position: '',
  education: '',
  workAt: '',
  thumbnail: ''
}

export default {
  name: 'CreateUser',
  components: {
    Sticky,
    ThumbUpload
  },
  data() {
    return {
      menu: false,
      formCreate: JSON.parse(JSON.stringify(defaultCreate)),
      formTitle: this.$router.currentRoute.params.id != null ? this.generateTitleView('editDoctor', 'doctor') : this.generateTitleView('createDoctor', 'doctor'),
      currentUser: '',
      isEdit: false,
      urlUpload: 'file/upUserAvatar',
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC
    }
  },
  computed: {
    ...mapGetters({
      language: 'language'
    })
  },
  mounted() {
    const doctorId = this.$router.currentRoute.params.id
    if (typeof doctorId !== 'undefined' && doctorId !== null) {
      this.getDoctor(doctorId)
    }
    this.currentUser = this.$store.state.auth.name
    if (this.formTitle === LABEL.edit) {
      this.isEdit = true
    }
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
  },
  methods: {
    ...mapActions({
      actCreateDoctor: LABEL.model + ACTIONS.ACT_INSERT_DOCTOR,
      actGetCurrentDoctor: LABEL.model + ACTIONS.ACT_FETCH_ONE_DOCTOR,
      actEditDoctor: LABEL.model + ACTIONS.ACT_EDIT_DOCTOR
    }),
    handleSubmitUser() {
      this.formTitle === this.generateTitleView('editDoctor', 'doctor') ? this.editDoctor() : this.createDoctor()
    },
    getDoctor(id) {
      this.actGetCurrentDoctor(id).then(res => {
        const dataUser = res.payload.records
        this.formCreate = JSON.parse(JSON.stringify(dataUser))
      })
    },
    createDoctor() {
      this.formCreate['created'] = new Date().toJSON()
      this.formCreate['createdBy'] = this.currentUser
      this.actCreateDoctor(this.formCreate).then(res => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })
          setTimeout(() => {
            window.location.href = '/#/users/doctors/index'
          }, 2000)
        } else {
          this.$notify.error({
            title: this.generateTitleView('doctors', 'message'),
            message: res.message,
            duration: 2000
          })
        }
      })
    },
    editDoctor() {
      this.formCreate['modified'] = new Date().toJSON()
      this.formCreate['modifiedBy'] = this.currentUser
      this.actEditDoctor(this.formCreate).then(res => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })
          setTimeout(() => {
            window.location.href = '/#/users/doctors/index'
          }, 2000)
        } else {
          this.$notify.error({
            title: this.generateTitleView('error', 'message'),
            message: this.generateTitleView('errorMessage', 'message'),
            duration: 2000
          })
          setTimeout(() => {
            window.location.href = '/#/users/doctors/index'
          }, 2000)
        }
      })
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>

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


    .el-form-item {
      margin-bottom: 9px;
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

.vibotDateWrap /deep/ .v-text-field {
  padding-top: 0 !important;
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
