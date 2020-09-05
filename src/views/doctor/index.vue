<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/" class="back-link">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <router-link to="/dashboard" title="DashBoard" class="title-page">
            {{ generateTitleView('doctorManagement', 'doctor') }}
          </router-link>
        </div>
        <div class="action-container">
          <el-button icon="el-icon-plus" type="primary" class="btn-create-hotel" @click="redirectCreate">
            {{ generateTitleView('create', 'doctor') }}
          </el-button>
        </div>
      </div>
    </sticky>
    <v-card class="filter">
      <v-container fluid>
        <v-row>
          <v-col md="3" cols="12" sm="6" class="vibotCol">
            <v-text-field v-model="listQuery.name" class="vibotField" :label="generateTitleView('doctorName', 'doctor')" />
          </v-col>

          <v-col md="6" sm="1"/>
          <v-col md="3" sm="5" class="search-right-wrap">
            <el-button plain class="btn-reset" @click="resetFilter">{{ generateTitleView('clear',
                                                                                         'usermanagement') }}
            </el-button>
            <el-button type="primary" plain class="btn-search" @click="getDoctors">
              {{ generateTitleView('search', 'usermanagement') }}
            </el-button>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="table-users">
      <el-table
        :key="0"
        v-loading="loading"
        class="table-list"
        fit
        :data="listDoctors"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          :label="generateTitleView('stt', 'usermanagement')"
          prop="id"
          align="center"
          width="80"
        >
          <template slot-scope="{row, $index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('fullname', 'usermanagement')" min-width="120">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('birthday', 'doctor')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.birthday | dayMonthYear }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('phone', 'doctor')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('email', 'usermanagement')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('position', 'doctor')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.position }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('workat', 'doctor')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.workAt }}</span>
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
                  @change="updateDoctorStatus(row.id, $event)"
                />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-loading="loading"
          label="Actions"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('updateTooltip', 'doctor')"
              placement="top"
            >
              <el-button type="primary" size="mini" rounded @click="editDoctor(row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('deleteTooltip', 'doctor')"
              placement="top"
            >
              <el-button size="mini" type="danger" @click="deleteDoctor(row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalDoctors>0"
        class="pagination-hotel"
        :total="totalDoctors"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getDoctors"
      />
    </v-card>
  </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import ElToggleButton from '@/components/ToggleButton'
    import Sticky from '@/components/Sticky'
    import { hasPermissionAction } from '@/help/utils/index'
    import { generateTitleView } from '@/help/utils/i18n'
    import { mapGetters } from 'vuex'
    import * as Permissions from '../../contants/permissions'
    import * as ACTIONS from '../../store/constants/doctor'

    const LABEL = {
        name: '',
        title: 'Doctor',
        model: 'doctor/',
        slug: 'doctor',
        edit: 'Sửa',
        create: 'Tạo mới'
    }

    const defaultUpdateStatus = {
        isActive: true
    }
    export default {
        name: 'DoctorIndex',
        components: {
            Pagination,
            ElToggleButton,
            Sticky
        },
        data() {
            return {
                loading: true,
                listQuery: {
                    page: 1,
                    limit: 10,
                    name: '',
                    status: null,
                    userType: null,
                    isDelete: false
                },
                dialogForm: false,
                user_id: '',
                currentUser: '',
                formUpdateStatus: JSON.parse(JSON.stringify(defaultUpdateStatus))
            }
        },
        computed: {
            ...mapGetters({
                language: 'language',
                listDoctors: LABEL.model + 'listDoctors',
                totalDoctors: LABEL.model + 'totalDoctors'
            })
        },
        mounted() {
            this.roleList = this.$store.state.auth.roles
            this.getDoctors()
            this.currentUser = this.$store.state.auth.name
        },
        methods: {
            getDoctors() {
                this.$store.dispatch(LABEL.model + ACTIONS.ACT_FETCH_DOCTOR_PAGING, {
                    current_page: this.listQuery.page,
                    name: this.listQuery.name,
                    is_active: this.listQuery.status,
                    limit: this.listQuery.limit,
                    is_delete: this.listQuery.isDelete
                }).then(res => {
                    this.loading = false
                })
            },
            deleteDoctor(userID) {
                const permissionAction = this.hasPermissionAction(this.roleList, Permissions.DoctorDelete, '', this.generateTitleView('permissionMessage', 'message'))
                if(permissionAction) {
                  this.$confirm(this.generateTitleView('textMessageDelete', 'message'), this.generateTitleView('titleMessageDelete', 'message'), {
                    confirmButtonText: this.generateTitleView('textBtnOk', 'message'),
                    cancelButtonText: this.generateTitleView('textBtnCancel', 'message'),
                    type: 'warning'
                  }).then(() => {
                    this.$store.dispatch(LABEL.model + ACTIONS.ACT_DELETE_DOCTOR, { userID })
                  })
                }
            },
            editDoctor(id) {
                this.hasPermissionAction(this.roleList, Permissions.DoctorEdit, 'users/doctors/edit/' + id, this.generateTitleView('permissionMessage', 'message'))
            },
            resetFilter() {
                this.listQuery.status = null
                this.listQuery.name = ''
                this.listQuery.userType = null
                this.listQuery.isDelete = null
                this.getDoctors()
            },
            updateDoctorStatus(userId, event) {
                const permissionAction = this.hasPermissionAction(this.roleList, Permissions.UserEdit, '', this.generateTitleView('permissionMessage', 'message'))
                if(permissionAction) {
                    var dataUpdate = {
                        isActive: event.value,
                        id: userId
                    }
                    this.$store
                        .dispatch(LABEL.model + ACTIONS.ACT_UPDATE_DOCTOR_STATUS, dataUpdate)
                        .then(res => {
                            if (res.isSuccess) {
                                this.$notify.success({
                                    title:  this.generateTitleView('success', 'message'),
                                    message: this.generateTitleView('successMessage', 'message'),
                                    duration: 2000
                                })
                                window.location.href = '/#/users/doctors/index'
                            } else {
                                this.$notify.error({
                                    title:  this.generateTitleView('error', 'message'),
                                    message:  this.generateTitleView('errorMessage', 'message'),
                                    duration: 2000
                                })
                                window.location.href = '/#/users/doctors/index'
                            }
                        })
                }
            },
            redirectCreate() {
                this.hasPermissionAction(this.roleList, Permissions.DoctorCreate, 'users/doctors/create', this.generateTitleView('permissionMessage', 'message'))
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

    .vibotField /deep/ .v-text-field__slot label{
        right: unset !important;
    }

    .app-container .container{
        padding-top: 0;
        padding-bottom: 0;
    }

    .vibotCol{
        padding-top: 0;
        padding-bottom: 0;
    }

    .search-right-wrap{
        text-align: right;
    }

    .filter {
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
</style>
