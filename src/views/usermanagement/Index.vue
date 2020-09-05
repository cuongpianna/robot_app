<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/" class="back-link">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <router-link to="/dashboard" title="DashBoard" class="title-page">
            {{ generateTitleView('user_management', 'usermanagement') }}
          </router-link>
        </div>
        <div class="action-container">
          <el-button icon="el-icon-plus" type="primary" class="btn-create-hotel" @click="redirectCreate">
            {{ generateTitleView('create', 'usermanagement') }}
          </el-button>
        </div>
      </div>
    </sticky>
    <md-card class="filter">
      <div class="filter-content">
        <el-form
          ref="form"
          class="user-form"
          label-position="top"
          label-width="150px"
        >
          <el-form-item
            :label="generateTitleView('username', 'usermanagement')"
            prop="name"
            class="item-account"
          >
            <el-input v-model="listQuery.name" />
          </el-form-item>

          <el-form-item
            :label="generateTitleView('status', 'usermanagement')"
            prop="status"
            class="item-status"
          >
            <el-select v-model="listQuery.status">
              <el-option
                v-for="(item, index) in USER_STATUS"
                :key="index"
                :value="item.value"
                :label="item.label"
              >{{ item.label }}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="generateTitleView('usertype', 'usermanagement')"
            prop="status"
            class="item-status"
          >
            <el-select v-model="listQuery.userType">
              <el-option
                v-for="(item, index) in USER_TYPE"
                :key="index"
                :value="item.value"
                :label="item.label"
              >{{ item.label }}
              </el-option>
            </el-select>
          </el-form-item>

<!--          <el-form-item-->
<!--            :label="generateTitleView('isdelete', 'usermanagement')"-->
<!--            prop="status"-->
<!--            class="item-status"-->
<!--          >-->
<!--            <el-select v-model="listQuery.isDelete">-->
<!--              <el-option-->
<!--                v-for="(item, index) in USER_DELETE"-->
<!--                :key="index"-->
<!--                :value="item.value"-->
<!--                :label="item.label"-->
<!--              >{{ item.label }}-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
        </el-form>

        <div class="item-action">
          <el-button plain class="btn-reset" @click="resetFilter">{{ generateTitleView('clear',
                                                                                       'usermanagement') }}
          </el-button>
          <el-button type="primary" plain class="btn-search" @click="getUsers">
            {{ generateTitleView('search', 'usermanagement') }}
          </el-button>
        </div>
      </div>
    </md-card>
    <md-card class="table-users">
      <el-table
        :key="0"
        v-loading="loading"
        class="table-list"
        fit
        :data="listUsers"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          :label="generateTitleView('stt', 'usermanagement')"
          prop="id"
          align="center"
          width="70"
        >
          <template slot-scope="{row, $index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('username', 'usermanagement')" width="150" align="center">
          <template slot-scope="{row}">
            <span>{{ row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('fullname', 'usermanagement')" min-width="130">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="generateTitleView('resetpassword', 'usermanagement')"
          align="center"
        >
          <template slot-scope="{row}">
            <font-awesome-icon
              icon="sync"
              color="#123D8B"
              class="icon-reset"
              @click="showResetPassword(row.id)"
            />
          </template>
        </el-table-column>

        <el-table-column :label="generateTitleView('email', 'usermanagement')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('usertype', 'usermanagement')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.userType == 1 ? 'System Admin' : generateTitleView('doctor', 'usermanagement') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="generateTitleView('status', 'usermanagement')"
          class-name="status-col"
          align="center"
        >
          <template slot-scope="{row}">
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                :content="generateTitleView('account_status', 'usermanagement')"
                placement="top"
              >
                <el-toggle-button
                  v-model="row.isActive"
                  :value="true"
                  color="#123D8B"
                  :sync="true"
                  @change="updateUserStatus(row.id, $event)"
                />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="generateTitleView('role', 'usermanagement')" align="center" min-width="220">
          <template slot-scope="{row}">
            <el-tag v-for="(role, index) in row.roleUser" :key="index" class="role-bg">
              {{ role.name }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          v-loading="loading"
          label="Actions"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('update', 'usermanagement')"
              placement="top"
            >
              <el-button type="primary" size="mini" rounded @click="editUser(row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('delete', 'usermanagement')"
              placement="top"
            >
              <el-button size="mini" type="danger" @click="deleteUser(row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalUsers>0"
        class="pagination-hotel"
        :total="totalUsers"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getUsers"
      />
    </md-card>
    <el-dialog
      :width="'660px'"
      :visible.sync="dialogForm"
      :title="generateTitleView('labelResetPassword', 'usermanagement')"
      :close-on-click-modal="clickOutsideDialog"
      class="user-diaglog"
    >
      <el-form
        ref="form-resetpassword"
        class="resetpassword-form"
        :model="formReset"
        :rules="rules"
      >
        <el-form-item
          :label="generateTitleView('password', 'usermanagement')"
          prop="password"
          class="item-name"
        >
          <el-input v-model="formReset.password" :disabled="false" type="password" />
        </el-form-item>

        <el-form-item
          :label="generateTitleView('repassword', 'usermanagement')"
          prop="repassword"
          class="item-name"
        >
          <el-input v-model="formReset.repassword" :disabled="false" type="password" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="handleClosePopup">{{ generateTitleView('close', 'usermanagement') }}</el-button>
        <el-button type="success" @click="handleResetPassword">{{ generateTitleView('save', 'usermanagement') }}</el-button>
      </span>

    </el-dialog>
  </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import ElToggleButton from '@/components/ToggleButton'
    import Sticky from '@/components/Sticky'
    import { hasPermissionAction } from '@/help/utils/index'
    import { checkLengthPassword } from '@/help/utils/validate'
    import { generateTitleView } from '@/help/utils/i18n'
    import { mapGetters } from 'vuex'
    import * as Permissions from '../../contants/permissions'
    import { ACT_FETCH_USER_PAGING, ACT_RESET_PASSWORD, ACT_UPDATE_STATUS, ACT_DELETE_USER } from '../../store/constants/user'

    const LABEL = {
        name: '',
        title: 'User',
        model: 'usermanagement/',
        slug: 'user',
        edit: 'Sửa',
        create: 'Tạo mới'
    }
    const defaultReset = {
        password: '',
        repassword: ''
    }
    const defaultUpdateStatus = {
        isActive: true
    }
    export default {
        name: 'UserIndex',
        components: {
            Pagination,
            ElToggleButton,
            Sticky
        },
        data() {
            const checkConfirmPassword = (rule, value, callback) => {
                if (this.formReset.password !== '') {
                    if (value !== this.formReset.password) {
                        callback(new Error())
                    } else {
                        callback()
                    }
                }
            }

            return {
                loading: true,
                rules: {
                    password: [
                        {
                            required: true,
                            message: this.generateTitleView('passwordRequired', 'usermanagement'),
                            trigger: 'blur'
                        },
                        {
                            validator: checkLengthPassword,
                            message: this.generateTitleView('passwordLength', 'usermanagement'),
                            trigger: 'blur'
                        }
                    ],
                    repassword: [
                        {
                            required: true,
                            message: this.generateTitleView('passwordRequired', 'usermanagement'),
                            trigger: 'blur'
                        },
                        {
                            validator: checkConfirmPassword,
                            message: this.generateTitleView('passwordConfirm', 'usermanagement'),
                            trigger: 'blur'
                        }
                    ]
                },
                users: [],
                total: 0,
                USER_STATUS: [
                    { value: true, label: this.generateTitleView('active', 'usermanagement') },
                    { value: false, label: this.generateTitleView('deactive', 'usermanagement') }
                ],
                USER_TYPE: [
                    { value: 1, label: 'System Admin' },
                    { value: 2, label: this.generateTitleView('doctor', 'usermanagement') }
                ],
                USER_DELETE: [
                    { value: true, label: this.generateTitleView('deleted', 'usermanagement') },
                    { value: false, label: this.generateTitleView('working', 'usermanagement') }
                ],
                listQuery: {
                    page: 1,
                    limit: 10,
                    name: '',
                    status: null,
                    userType: null,
                    isDelete: false
                },
                dialogForm: false,
                formReset: JSON.parse(JSON.stringify(defaultReset)),
                clickOutsideDialog: false,
                user_id: '',
                currentUser: '',
                formUpdateStatus: JSON.parse(JSON.stringify(defaultUpdateStatus)),
                roleList: []
            }
        },
        computed: {
            ...mapGetters({
              language: 'language',
              listUsers: LABEL.model + 'listUsers',
              totalUsers: LABEL.model + 'totalUsers'
            })
        },
        watch: {
            language: {
                immediate: true,
                handler(val, oldVal) {
                    this.USER_STATUS = [
                        { value: true, label: this.generateTitleView('active', 'module') },
                        { value: false, label: this.generateTitleView('deactive', 'module') }
                    ]

                    this.USER_TYPE = [
                        { value: 1, label: 'System Admin' },
                        { value: 2, label: this.generateTitleView('doctor', 'usermanagement') }
                    ]

                    this.USER_DELETE = [
                        { value: true, label: this.generateTitleView('deleted', 'usermanagement') },
                        { value: false, label: this.generateTitleView('working', 'usermanagement') }
                    ]
                    this.rules = {
                    password: [
                      {
                        required: true,
                        message: this.generateTitleView('passwordRequired', 'usermanagement'),
                        trigger: 'blur'
                      },
                      {
                        validator: checkLengthPassword,
                        message: this.generateTitleView('passwordLength', 'usermanagement'),
                        trigger: 'blur'
                      }
                    ],
                            repassword: [
                      {
                        required: true,
                        message: this.generateTitleView('passwordRequired', 'usermanagement'),
                        trigger: 'blur'
                      }
                    ]
                  }
                }
            }
        },
        mounted() {
            this.roleList = this.$store.state.auth.roles
            this.getUsers()
            this.currentUser = this.$store.state.auth.name
        },
        methods: {
            getUsers() {
                const data = this.$store.dispatch(LABEL.model + ACT_FETCH_USER_PAGING, {
                    current_page: this.listQuery.page,
                    name: this.listQuery.name,
                    is_active: this.listQuery.status,
                    limit: this.listQuery.limit,
                    user_type: this.listQuery.userType,
                    is_delete: this.listQuery.isDelete
                }).then(res => {
                    this.loading = false
                })
                return data
            },
            resetForm() {
                this.resetForm.password = ''
                this.resetForm.repassword = ''
            },
            deleteUser(userID) {
              const permissionAction = this.hasPermissionAction(this.roleList, Permissions.UserDelete, '', this.generateTitleView('permissionMessage', 'message'))
              if(permissionAction) {

                this.$confirm(this.generateTitleView('textMessageDelete', 'message'), this.generateTitleView('titleMessageDelete', 'message'), {
                  confirmButtonText: this.generateTitleView('textBtnOk', 'message'),
                  cancelButtonText: this.generateTitleView('textBtnCancel', 'message'),
                  type: 'warning'
                }).then(() => {
                  this.$store.dispatch(LABEL.model + ACT_DELETE_USER, { userID })
                })
              }
            },
            editUser(id) {
              this.hasPermissionAction(this.roleList, Permissions.UserEdit, 'users/edit/' + id, this.generateTitleView('permissionMessage', 'message'))
            },
            showResetPassword(user_id) {
              const permissionAction = this.hasPermissionAction(this.roleList, Permissions.UserEdit, '', this.generateTitleView('permissionMessage', 'message'))
              if(permissionAction) {
                this.user_id = user_id
                this.dialogForm = true
              }
            },
            handleClosePopup() {
                this.dialogForm = false
                this.formReset.password = ''
                this.formReset.repassword = ''
            },
            resetFilter() {
                this.listQuery.status = null
                this.listQuery.name = ''
                this.listQuery.userType = null
                this.listQuery.isDelete = false
                this.getUsers()
            },
            handleResetPassword() {
                this.$refs['form-resetpassword'].validate(valid => {
                    if (valid) {
                        this.formReset['id'] = this.user_id
                        this.formReset['modified'] = new Date().toJSON()
                        this.formReset['modifiedBy'] = this.currentUser
                        const data = this.$store
                            .dispatch(LABEL.model + ACT_RESET_PASSWORD, this.formReset)
                            .then(res => {
                                this.handleClosePopup()
                                this.resetForm()
                                if (res.isSuccess) {
                                    this.formReset.password = ''
                                    this.formReset.repassword = ''
                                    this.$notify.success({
                                        title:  this.generateTitleView('success', 'message'),
                                        message: this.generateTitleView('successMessage', 'message'),
                                        duration: 2000
                                    })
                                    setTimeout(() => {
                                        window.location.href = '/#/users/index'
                                    }, 2000)
                                } else {
                                    this.$notify.error({
                                        title:  this.generateTitleView('error', 'message'),
                                        message:  this.generateTitleView('errorMessage', 'message'),
                                        duration: 2000
                                    })
                                    setTimeout(() => {
                                        window.location.href = '/#/users/index'
                                    }, 2000)
                                }
                            })
                        return data
                    }
                })
            },
            updateUserStatus(userId, event) {
              const permissionAction = this.hasPermissionAction(this.roleList, Permissions.UserEdit, '', this.generateTitleView('permissionMessage', 'message'))
              if(permissionAction) {
                var dataUpdate = {
                  isActive: event.value,
                  id: userId
                }
                const data = this.$store
                        .dispatch(LABEL.model + ACT_UPDATE_STATUS, dataUpdate)
                        .then(res => {
                          this.resetForm()
                          if (res.isSuccess) {
                            this.$notify.success({
                              title:  this.generateTitleView('success', 'message'),
                              message: this.generateTitleView('successMessage', 'message'),
                              duration: 2000
                            })
                            window.location.href = '/#/users/index'
                          } else {
                            this.$notify.error({
                              title:  this.generateTitleView('error', 'message'),
                              message:  this.generateTitleView('errorMessage', 'message'),
                              duration: 2000
                            })
                            window.location.href = '/#/users/index'
                          }
                        })
                return data
              }
            },
            redirectCreate() {
              this.hasPermissionAction(this.roleList, Permissions.UserCreate, 'users/create', this.generateTitleView('permissionMessage', 'message'))
            },
            generateTitleView,
            hasPermissionAction
        }
    }
</script>

<style lang='scss' scoped>

    .app-container {
        .action-container {
            margin-right: 25px;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            margin-bottom: 5px;
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

            .btn-export-excel {
                padding: 5px 10px;
            }

            .btn-create-hotel {
                padding: 5px 10px;
            }
        }

        .filter {
            margin: 10px 10px 10px;

            .filter-content {
                padding: 10px;
                width: 100%;
                background: #fff;
                display: flex;
                justify-content: space-between;

                .user-form {
                    display: flex;

                    /deep/ .el-form-item__label {
                        line-height: 20px;
                        font-weight: normal;
                    }

                    .item-account {
                        margin-bottom: 0;
                        width: 300px;

                        /deep/ .el-input__inner {
                            padding: 5px 10px;
                            height: 32px;
                            margin-bottom: 0;
                        }
                    }

                    .item-status {
                        margin-left: 10px;
                        margin-bottom: 0;

                        /deep/ .el-input__inner {
                            padding: 5px 10px;
                            height: 32px;
                            margin-bottom: 0;
                        }
                    }
                }

                .item-action {
                    margin-top: 33px;
                    margin-left: 10px;
                    margin-right: 0;
                }

                .btn-reset {
                    background: #8e97a9;
                    color: #fff;
                    padding: 8px 15px;
                }

                .btn-search {
                    background: #123d8b;
                    color: #fff;
                    padding: 8px 15px;
                }
            }
        }

        .table-users {
            margin: 0 10px;

            .table-list {
                /deep/ tr:nth-child(odd) {
                    background: rgb(252, 235, 214);
                }

                /deep/ tr:nth-child(even) {
                    background: #fff;
                }

                .role-bg {
                    font-size: 11px;
                    background: #123D8B;
                    line-height: 32px;
                    color: #fff;
                    margin-right: 2px;
                    margin-bottom: 2px;
                }

                .status-user {
                    font-size: 12px;
                }
            }
        }

        .pagination-hotel {
            text-align: right;

            &.pagination-container {
                padding: 10px;
            }

            /deep/ .el-pagination__total {
                display: none;
            }

            /deep/ .el-pagination__sizes {
                display: none;
            }

            /deep/ .el-pagination__jump {
                display: none;
            }

            /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
                background: #123D8B;
            }
        }

        .icon-reset {
            &:hover {
                cursor: pointer;
            }
        }

      .user-diaglog /deep/ {
        .el-dialog__header{
          font-weight: bold;
          font-size: 20px;
        }

        .el-dialog__body{
          padding: 0 20px;
        }

        .el-dialog__footer{
          button{
            background: #123d8b;
            color: #fff;
            padding: 8px 20px;
            border: none;
          }
          button.el-button--info{
            background: #8e97a9;
          }
        }
      }
    }

    .table-users /deep/  .table-list tr:nth-child(odd){
      background: none !important;
    }

    @media only screen and (max-width: 1200px) {
      .filter-content{
          .user-form{
            flex-basis: 70%;
          }
      }
    }
</style>
