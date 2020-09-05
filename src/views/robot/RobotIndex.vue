<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/" class="back-link">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <router-link to="/dashboard" title="DashBoard" class="title-page">
            {{ generateTitleView('robotManagement', 'robot') }}
          </router-link>
        </div>
        <div class="action-container">
          <el-button icon="el-icon-plus" type="primary" class="btn-create-hotel" @click="redirectCreate">
            {{ generateTitleView('create', 'robot') }}
          </el-button>
        </div>
      </div>
    </sticky>
    <v-card class="filter">
      <v-container fluid>
        <v-row>
          <v-col md="3" cols="12" sm="6" class="vibotCol">
            <v-text-field v-model="listQuery.name" class="vibotField" :label="generateTitleView('robotName', 'robot')" />
          </v-col>

          <v-col md="6" sm="1"/>
          <v-col md="3" sm="5" class="search-right-wrap">
            <el-button plain class="btn-reset" @click="resetFilter">{{ generateTitleView('clear',
                                                                                         'usermanagement') }}
            </el-button>
            <el-button type="primary" plain class="btn-search" @click="getRobots">
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
        :data="listRobots"
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
        <el-table-column :label="generateTitleView('robotName', 'robot')" min-width="120">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('code', 'robot')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('ip', 'robot')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('port', 'robot')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.port }}</span>
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
                :content="generateTitleView('robotStatus', 'robot')"
                placement="top"
              >
                <el-toggle-button
                  v-model="row.isActive"
                  :value="true"
                  color="#123D8B"
                  :sync="true"
                  @change="updateRobotStatus(row.id, $event)"
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
              :content="generateTitleView('updateTooltip', 'robot')"
              placement="top"
            >
              <el-button type="primary" size="mini" rounded @click="editDoctor(row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('deleteTooltip', 'robot')"
              placement="top"
            >
              <el-button size="mini" type="danger" @click="deleteDoctor(row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('setMap', 'robot')"
              placement="top"
            >
              <el-button size="mini" class="editMapbtn" @click="openSetMapModal(row)">
                <i class="el-icon-share" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalRobots>0"
        class="pagination-hotel"
        :total="totalRobots"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getRobots"
      />
    </v-card>

    <v-dialog v-model="showDialog" max-width="550">
      <v-card>
        <v-card-title>{{ generateTitleView('setAreaTitle', 'area') }}</v-card-title>

        <div class="search">
          <v-select
            v-model="parentAreaModel"
            :items="listParentArea"
            item-text="name"
            item-value="id"
            :label="generateTitleView('selectArea', 'robot')"
            dense
            @change="changeAreaParent"
          />
        </div>

        <div class="md-contents">
          <v-data-table
            v-if="listChildrenArea.length > 0"
            v-model="selectedRobot.map"
            :headers="headers"
            :items="listChildrenArea"
            :single-select="true"
            item-key="name"
            show-select
            class="elevation-1"
          />
          <div v-else class="noCamera">
            {{ generateTitleView('noCamera', 'camera') }}
          </div>
        </div>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">{{ generateTitleView('close', 'camera') }}</md-button>
          <button class="btn-control btn-primary" @click="setMap">{{ generateTitleView('addCamera', 'camera') }}</button>
        </md-dialog-actions>
      </v-card>
    </v-dialog>
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
    import * as ACTIONS from '../../store/constants/robot'
    import { ACT_GET_ALL_CHILD_AREA } from '../../store/constants/area'

    const LABEL = {
        name: '',
        title: 'Doctor',
        model: 'robot/',
        modelArea: 'area/',
        slug: 'doctor',
        edit: 'Sửa',
        create: 'Tạo mới'
    }

    const defaultUpdateStatus = {
        isActive: true
    }
    export default {
        name: 'RobotIndex',
        components: {
            Pagination,
            ElToggleButton,
            Sticky
        },
        data() {
            return {
                areaSelected: {},
                showDialog: false,
                selectedRobot: {
                  map: {}
                },
                loading: true,
                listQuery: {
                    page: 1,
                    limit: 10,
                    name: '',
                    status: null
                },
                dialogForm: false,
                user_id: '',
                currentUser: '',
                formUpdateStatus: JSON.parse(JSON.stringify(defaultUpdateStatus)),
                listMapQuery: {
                  page: 1,
                  limit: 10,
                  name: '',
                  status: null
                },
                headers: [
                  { text: 'Tên địa điểm', value: 'name' }
                ]
            }
        },
        computed: {
            ...mapGetters({
                language: 'language',
                listRobots: LABEL.model + 'listRobots',
                totalRobots: LABEL.model + 'totalRobots',
                listAreas: LABEL.modelArea + 'listAllChildArea',
                listParentArea: LABEL.model + 'listParentArea',
                parentAreaModel: LABEL.model + 'parentAreaModel',
                listChildrenArea: LABEL.model + 'listChildrenArea',
                userType: 'userType',
                userId: 'userId'
            })
        },
        mounted() {
            this.roleList = this.$store.state.auth.roles
            this.getRobots()
            this.currentUser = this.$store.state.auth.name
        },
        methods: {
            ...mapActions({
                actFetchAllRobot: LABEL.model + ACTIONS.ACT_FETCH_ROBOT_PAGING,
                actDeleteRobot: LABEL.model + ACTIONS.ACT_DELETE_ROBOT,
                actUpdateStatusRobot: LABEL.model + ACTIONS.ACT_UPDATE_ROBOT_STATUS,
                actGetChildArea: LABEL.modelArea + ACT_GET_ALL_CHILD_AREA,
                actSetMap: LABEL.model + ACTIONS.ACT_SET_MAP,
                actGetParentArea: LABEL.model + ACTIONS.ACT_GET_PARENT_AREA,
                actGetChildAreaByParent: LABEL.model + ACTIONS.ACT_GET_CHILD_AREA_BY_PARENT,
                actSetParentArea: LABEL.model + ACTIONS.ACT_SET_PARENT_AREA
            }),
            getRobots() {
                this.actFetchAllRobot({
                    current_page: this.listQuery.page,
                    name: this.listQuery.name,
                    is_active: this.listQuery.status,
                    limit: this.listQuery.limit,
                    user_type: this.userType,
                    user_id: this.userId
                }).then(res => {
                    this.loading = false
                })
            },
            deleteDoctor(userID) {
                const permissionAction = this.hasPermissionAction(this.roleList, Permissions.RobotDelete, '', this.generateTitleView('permissionMessage', 'message'))
                if(permissionAction) {
                  this.$confirm(this.generateTitleView('textMessageDelete', 'message'), this.generateTitleView('titleMessageDelete', 'message'), {
                    confirmButtonText: this.generateTitleView('textBtnOk', 'message'),
                    cancelButtonText: this.generateTitleView('textBtnCancel', 'message'),
                    type: 'warning'
                  }).then(() => {
                    this.actDeleteRobot({ userID })
                  })
                }
            },
            editDoctor(id) {
                this.hasPermissionAction(this.roleList, Permissions.RobotEdit, 'users/robots/edit/' + id, this.generateTitleView('permissionMessage', 'message'))
            },
            resetFilter() {
                this.listQuery.status = null
                this.listQuery.name = ''
                this.getRobots()
            },
            updateRobotStatus(userId, event) {
                const permissionAction = this.hasPermissionAction(this.roleList, Permissions.UserEdit, '', this.generateTitleView('permissionMessage', 'message'))
                if(permissionAction) {
                    var dataUpdate = {
                        isActive: event.value,
                        id: userId
                    }
                    this.actUpdateStatusRobot(dataUpdate).then(res => {
                        if (res.isSuccess) {
                            this.$notify.success({
                                title:  this.generateTitleView('success', 'message'),
                                message: this.generateTitleView('successMessage', 'message'),
                                duration: 2000
                            })
                            window.location.href = '/#/users/robots/index'
                        } else {
                            this.$notify.error({
                                title:  this.generateTitleView('error', 'message'),
                                message:  this.generateTitleView('errorMessage', 'message'),
                                duration: 2000
                            })
                            window.location.href = '/#/users/robots/index'
                        }
                    })
                }
            },
            redirectCreate() {
                this.hasPermissionAction(this.roleList, Permissions.RobotDelete, 'users/robots/create', this.generateTitleView('permissionMessage', 'message'))
            },
            openSetMapModal(row) {
              var rw = JSON.parse(JSON.stringify(row))
              this.showDialog = true
              this.selectedRobot = rw
              this.selectedRobot.map = [this.selectedRobot.map]
              if(rw.map && rw.map[0] != null) {
                this.actSetParentArea(rw.map[0].parentId)
                this.actGetParentArea().then(() => {
                  this.actGetChildAreaByParent({ ParentId: rw.map[0].parentId })
                })
              }else {
                this.actGetParentArea()
                this.actSetParentArea('')
              }
            },
            onSelect(items) {
              this.areaSelected = items
            },
            setMap() {
              this.selectedRobot.map = this.selectedRobot.map[0]
              this.actSetMap(this.selectedRobot).then(res => {
                if (res.isSuccess) {
                  this.$notify.success({
                    title:  this.generateTitleView('success', 'message'),
                    message: this.generateTitleView('successMessage', 'message'),
                    duration: 2000
                  })
                  this.showDialog = false
                  this.getRobots()
                } else {
                  this.$notify.error({
                    title:  this.generateTitleView('error', 'message'),
                    message:  this.generateTitleView('errorMessage', 'message'),
                    duration: 2000
                  })
                  this.showDialog = false
                }
              })
            },
            changeAreaParent(vals) {
                this.actGetChildAreaByParent({ ParentId: vals })
            },
            generateTitleView,
            hasPermissionAction
        }
    }
</script>

<style lang='scss' scoped>
  .search{
    width: 70%;
    padding-left: 30px;
    margin-top: 10px;
  }

  .editMapbtn{
    background: #009688 ;

    i{
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

  .noCamera{
    padding-left: 30px;
  }
</style>
