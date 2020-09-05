<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/" class="back-link">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <router-link to="/dashboard" title="DashBoard" class="title-page">
            {{ generateTitleView('cameraList', 'camera') }}
          </router-link>
        </div>
        <div class="action-container">
          <el-button icon="el-icon-plus" type="primary" class="btn-create-hotel" @click="redirectCreate">
            {{ generateTitleView('create', 'camera') }}
          </el-button>
        </div>
      </div>
    </sticky>
    <v-card class="filter">
      <v-container fluid>
        <v-row>
          <v-col md="3" cols="12" sm="6" class="vibotCol">
            <v-text-field
              v-model="listQuery.name"
              class="vibotField"
              :label="generateTitleView('cameraName', 'camera')"
            />
          </v-col>

          <v-col md="6" sm="1" />
          <v-col md="3" sm="5" class="search-right-wrap">
            <el-button plain class="btn-reset" @click="resetFilter">{{
              generateTitleView('clear',
                                'usermanagement')
            }}
            </el-button>
            <el-button type="primary" plain class="btn-search" @click="getCameras">
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
        :data="listCameras"
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
        <el-table-column :label="generateTitleView('cameraName', 'camera')">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('code', 'camera')">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('position', 'camera')">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.position }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('selectType', 'camera')">
          <template slot-scope="{row}">
            <span v-if="row.type == 1"> USB</span>
            <span v-else>IP</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('cameraIp', 'camera')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.ip }}</span>
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
                placement="top"
                :content="row.isActive ? generateTitleView('active', 'camera') : generateTitleView('deactive', 'camera')"
              >
                <el-toggle-button
                  v-model="row.isActive"
                  :value="true"
                  color="#123D8B"
                  :sync="true"
                  @change="updateCameraStatus(row.id, $event)"
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
              :content="generateTitleView('updateTooltip', 'camera')"
              placement="top"
            >
              <el-button type="primary" size="mini" rounded @click="editCamera(row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('deleteTooltip', 'camera')"
              placement="top"
            >
              <el-button size="mini" type="danger" @click="deleteCamera(row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalCameras>0"
        class="pagination-hotel"
        :total="totalCameras"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getCameras"
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
import * as ACTIONS from '../../store/constants/camera'

const LABEL = {
  name: '',
  title: 'Camera',
  model: 'camera/',
  edit: 'Sửa',
  create: 'Tạo mới'
}

const defaultUpdateStatus = {
  isActive: true
}
export default {
  name: 'CameraIndex',
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
        status: null
      },
      dialogForm: false,
      currentUser: '',
      formUpdateStatus: JSON.parse(JSON.stringify(defaultUpdateStatus))
    }
  },
  computed: {
    ...mapGetters({
      language: 'language',
      listCameras: LABEL.model + 'listCameras',
      totalCameras: LABEL.model + 'totalCameras'
    })
  },
  mounted() {
    this.roleList = this.$store.state.auth.roles
    this.getCameras()
    this.currentUser = this.$store.state.auth.name
  },
  methods: {
    getCameras() {
      this.$store.dispatch(LABEL.model + ACTIONS.ACT_FETCH_CAMERA_PAGING, {
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit,
        is_delete: this.listQuery.isDelete
      }).then(res => {
        this.loading = false
      })
    },
    deleteCamera(userID) {
      console.log(this.roleList)
      const permissionAction = this.hasPermissionAction(this.roleList, Permissions.CameraDelete, '', this.generateTitleView('permissionMessage', 'message'))
      if (permissionAction) {
        this.$confirm(this.generateTitleView('textMessageDelete', 'message'), this.generateTitleView('titleMessageDelete', 'message'), {
          confirmButtonText: this.generateTitleView('textBtnOk', 'message'),
          cancelButtonText: this.generateTitleView('textBtnCancel', 'message'),
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(LABEL.model + ACTIONS.ACT_DELETE_CAMERA, { userID })
        })
      }
    },
    editCamera(id) {
      this.hasPermissionAction(this.roleList, Permissions.CameraEdit, 'users/cameras/edit/' + id, this.generateTitleView('permissionMessage', 'message'))
    },
    resetFilter() {
      this.listQuery.status = null
      this.listQuery.name = ''
      this.getCameras()
    },
    updateCameraStatus(userId, event) {
      const permissionAction = this.hasPermissionAction(this.roleList, Permissions.CameraEdit, '', this.generateTitleView('permissionMessage', 'message'))
      if (permissionAction) {
        var dataUpdate = {
          isActive: event.value,
          id: userId
        }
        this.$store
            .dispatch(LABEL.model + ACTIONS.ACT_UPDATE_CAMERA_STATUS, dataUpdate)
            .then(res => {
              if (res.isSuccess) {
                this.$notify.success({
                  title: this.generateTitleView('success', 'message'),
                  message: this.generateTitleView('successMessage', 'message'),
                  duration: 2000
                })
                window.location.href = '/#/users/cameras/index'
              } else {
                this.$notify.error({
                  title: this.generateTitleView('error', 'message'),
                  message: this.generateTitleView('errorMessage', 'message'),
                  duration: 2000
                })
                window.location.href = '/#/users/cameras/index'
              }
            })
      }
    },
    redirectCreate() {
      this.hasPermissionAction(this.roleList, Permissions.CameraCreate, 'users/cameras/create', this.generateTitleView('permissionMessage', 'message'))
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
</style>
