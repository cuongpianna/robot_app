<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/" class="back-link">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <router-link to="/dashboard" title="DashBoard" class="title-page">
            {{ generateTitleView('areaManagement', 'area') }}
          </router-link>
        </div>
        <div class="action-container">
          <el-button icon="el-icon-plus" type="primary" class="btn-create-hotel" @click="redirectCreate">
            {{ generateTitleView('create', 'area') }}
          </el-button>
        </div>
      </div>
    </sticky>
    <v-card class="filter">
      <v-container fluid>
        <v-row>
          <v-col md="2" cols="12" sm="6" class="vibotCol">
            <v-text-field
              v-model="listQuery.name"
              class="vibotField"
              :label="generateTitleView('area', 'area')"
            />
          </v-col>

          <v-col md="2" cols="12" sm="6" class="vibotCol">
            <v-select
              v-model="listQuery.parentId"
              :items="listParentAreas"
              :label="generateTitleView('selectBigArea', 'area')"
              item-value="id"
              item-text="name"
            />
          </v-col>

          <v-col offset-md="5" />
          <v-col md="2" sm="6" class="search-right-wrap">
            <el-button plain class="btn-reset" @click="resetFilter">{{
              generateTitleView('clear','usermanagement') }}
            </el-button>
            <el-button type="primary" plain class="btn-search" @click="getAreas">
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
        :data="listAreas"
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
        <el-table-column :label="generateTitleView('thumb', 'area')" prop="id" align="center" width="80">
          <template slot-scope="{row}">
            <span><img :src="folderUpload + row.thumb" :alt="row.name" class="avatar-employee"></span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('areaName', 'area')">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('areaNo', 'area')">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.areaNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('areaParentName', 'area')" min-width="120">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.parentName }}</span>
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
                  @change="updateAreaStatus(row.id, $event)"
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
          :width="200"
        >
          <template slot-scope="{row}">
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('updateTooltip', 'area')"
              placement="top"
            >
              <el-button type="primary" size="mini" rounded @click="editArea(row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('deleteTooltip', 'area')"
              placement="top"
            >
              <el-button size="mini" type="danger" @click="deleteArea(row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('editMap', 'area')"
              placement="top"
            >
              <el-button size="mini" class="editMapbtn" @click="editMap(row.id)">
                <i class="el-icon-share" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalAreas>0"
        class="pagination-hotel"
        :total="totalAreas"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getAreas"
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
    import { mapGetters, mapActions } from 'vuex'
    import * as Permissions from '../../contants/permissions'
    import * as ACTIONS from '../../store/constants/area'

    const LABEL = {
        name: '',
        title: 'Area',
        model: 'area/',
        slug: 'area',
        edit: 'Sửa',
        create: 'Tạo mới'
    }

    const defaultUpdateStatus = {
        isActive: true
    }
    export default {
        name: 'AreaIndex',
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
                    parentId: '',
                    isDelete: false
                },
                dialogForm: false,
                user_id: '',
                currentUser: '',
                folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC + '/',
                formUpdateStatus: JSON.parse(JSON.stringify(defaultUpdateStatus))
            }
        },
        computed: {
            ...mapGetters({
                language: 'language',
                listAreas: LABEL.model + 'listAreas',
                totalAreas: LABEL.model + 'totalAreas',
                listParentAreas: LABEL.model + 'listParentAreas'
            })
        },
        mounted() {
            this.roleList = this.$store.state.auth.roles
            this.getAreas()
            this.currentUser = this.$store.state.auth.name
            this.getParentArea()
        },
        methods: {
            ...mapActions({
                getParentArea: LABEL.model + ACTIONS.ACT_FETCH_AREA_PARENT
            }),
            getAreas() {
                this.loading = true
                this.$store.dispatch(LABEL.model + ACTIONS.ACT_FETCH_AREA_PAGING, {
                    current_page: this.listQuery.page,
                    name: this.listQuery.name,
                    is_active: this.listQuery.status,
                    limit: this.listQuery.limit,
                    is_delete: this.listQuery.isDelete,
                    parent_id: this.listQuery.parentId
                }).then(res => {
                    this.loading = false
                })
            },
            deleteArea(userID) {
                const permissionAction = this.hasPermissionAction(this.roleList, Permissions.AreaDelete, '', this.generateTitleView('permissionMessage', 'message'))
                if (permissionAction) {
                    this.$confirm(this.generateTitleView('textMessageDelete', 'message'), this.generateTitleView('titleMessageDelete', 'message'), {
                        confirmButtonText: this.generateTitleView('textBtnOk', 'message'),
                        cancelButtonText: this.generateTitleView('textBtnCancel', 'message'),
                        type: 'warning'
                    }).then(() => {
                        this.$store.dispatch(LABEL.model + ACTIONS.ACT_DELETE_AREA, { userID })
                    })
                }
            },
            editArea(id) {
                this.hasPermissionAction(this.roleList, Permissions.AreaEdit, 'users/areas/edit/' + id, this.generateTitleView('permissionMessage', 'message'))
            },
            editMap(id) {
                this.hasPermissionAction(this.roleList, Permissions.AreaEdit, 'users/areas/create-map/' + id, this.generateTitleView('permissionMessage', 'message'))
            },
            resetFilter() {
                this.listQuery.status = null
                this.listQuery.name = ''
                this.listQuery.userType = null
                this.listQuery.isDelete = null
                this.listQuery.parentId = ''
                this.getAreas()
            },
            updateAreaStatus(userId, event) {
                const permissionAction = this.hasPermissionAction(this.roleList, Permissions.UserEdit, '', this.generateTitleView('permissionMessage', 'message'))
                if (permissionAction) {
                    var dataUpdate = {
                        isActive: event.value,
                        id: userId
                    }
                    this.$store
                        .dispatch(LABEL.model + ACTIONS.ACT_UPDATE_AREA_STATUS, dataUpdate)
                        .then(res => {
                            if (res.isSuccess) {
                                this.$notify.success({
                                    title: this.generateTitleView('success', 'message'),
                                    message: this.generateTitleView('successMessage', 'message'),
                                    duration: 2000
                                })
                                window.location.href = '/#/users/areas/index'
                            } else {
                                this.$notify.error({
                                    title: this.generateTitleView('error', 'message'),
                                    message: this.generateTitleView('errorMessage', 'message'),
                                    duration: 2000
                                })
                                window.location.href = '/#/users/areas/index'
                            }
                        })
                }
            },
            redirectCreate() {
                this.hasPermissionAction(this.roleList, Permissions.AreaCreate, 'users/areas/create', this.generateTitleView('permissionMessage', 'message'))
            },
            generateTitleView,
            hasPermissionAction
        }
    }
</script>

<style lang='scss' scoped>

    .editMapbtn {
        background: #009688;

        i {
            color: #ffffff;
        }
    }

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
    }

    .table-users /deep/ .table-list tr:nth-child(odd) {
        background: none !important;
    }

    .vibotField /deep/ .v-text-field__slot label {
        right: unset !important;
    }

    .app-container .container {
        padding-top: 0;
        padding-bottom: 0;
    }

    .vibotCol {
        padding-top: 0;
        padding-bottom: 0;
    }

    .search-right-wrap {
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

    .app-container {
        overflow: hidden;
    }
</style>
