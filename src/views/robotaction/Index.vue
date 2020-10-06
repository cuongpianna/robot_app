<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/" class="back-link">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <router-link
            to="/dashboard"
            title="DashBoard"
            class="title-page"
          >Quản lý lệnh điều khiển robot
          </router-link>
        </div>
        <div class="action-container">
          <el-button
            icon="el-icon-plus"
            type="primary"
            class="btn-create-hotel"
            @click="redirectCreate"
          >Tạo mới
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
              label="Tên lệnh điều khiển"
            />
          </v-col>

          <v-col offset-md="7" />
          <v-col md="4" sm="6" class="search-right-wrap">
            <el-button plain class="btn-reset" @click="backHistory">Quay lại</el-button>
            <el-button plain class="btn-reset" @click="resetFilter">
              {{
                generateTitleView('clear',
                                  'usermanagement')
              }}
            </el-button>
            <el-button
              type="primary"
              plain
              class="btn-search"
              @click="getRobotActions"
            >Tìm kiếm
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
        :data="listRobotActions"
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
        <el-table-column label="Tên lệnh đk" min-width="120">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.actionName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Mã lệnh đk" align="center">
          <template slot-scope="{row}">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Hiển thị trên bảng đk tự động" align="center">
          <template slot-scope="{row}">
            <span v-if="row.showInRobotDashboard">Có</span>
            <span v-else>Không</span>
          </template>
        </el-table-column>
        <el-table-column label="Hiển thị trên bảng đk bằng tay" align="center">
          <template slot-scope="{row}">
            <span v-if="row.showInManualRobotDashboard">Có</span>
            <span v-else>Không</span>
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
              content="Cập nhật điều khiển"
              placement="top"
            >
              <el-button type="primary" size="mini" rounded @click="editRobotAction(row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="Xóa lệnh điều khiển"
              placement="top"
            >
              <el-button size="mini" type="danger" @click="deleteRobotAction(row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalRobotActions>0"
        class="pagination-hotel"
        :total="totalRobotActions"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getPagination"
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
import * as ACTIONS from '../../store/constants/robotaction'

const LABEL = {
  model: 'robotaction/',
  robotModel: 'robot/'
}

const defaultUpdateStatus = {
  isActive: true
}
export default {
  name: 'Index',
  components: {
    Pagination,
    Sticky
  },
  data() {
    return {
      robotSelected: [],
      loading: true,
      showDialog1: false,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        status: null
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
      listRobotActions: LABEL.model + 'listRobotActions',
      totalRobotActions: LABEL.model + 'totalRobotActions'
    })
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
    this.roleList = this.$store.state.auth.roles
    this.currentUser = this.$store.state.auth.name
    this.currentUserId = this.$store.state.auth.id
    this.getRobotActions()
  },
  methods: {
    ...mapActions({
      actFetchAllRobotActions: LABEL.model + ACTIONS.ACT_FETCH_ROBOT_ACTION_PAGING,
      actInsertRobotAction: LABEL.model + ACTIONS.ACT_INSERT_ROBOT_ACTION,
      actDeleteRobotAction: LABEL.model + ACTIONS.ACT_DELETE_ROBOT_ACTION,
      actUpdateRobotAction: LABEL.model + ACTIONS.ACT_INSERT_ROBOT_ACTION
    }),
    getRobotActions() {
      this.actFetchAllRobotActions({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit
      }).then(res => {
        this.loading = false
      })
    },
    deleteRobotAction(mediaId) {
      this.$confirm(
          'Bạn có chắc chắn muốn xóa lệnh điều khiển?',
          this.generateTitleView('titleMessageDelete', 'message'),
          {
            confirmButtonText: this.generateTitleView('textBtnOk', 'message'),
            cancelButtonText: this.generateTitleView('textBtnCancel', 'message'),
            type: 'warning'
          }
      ).then(() => {
        const permissionAction = this.hasPermissionAction(
            this.roleList,
            Permissions.RobotDelete,
            '',
            this.generateTitleView('permissionMessage', 'message')
        )
        if (permissionAction) {
          this.actDeleteRobotAction(mediaId).then(res => {
            if (res.isSuccess) {

            }
          })
        }
      })
    },
    editRobotAction(id) {
      this.hasPermissionAction(this.roleList, Permissions.RobotDelete, 'users/robot/editRobotAction/' + id, this.generateTitleView('permissionMessage', 'message'))
    },
    resetFilter() {
      this.listQuery.status = null
      this.listQuery.name = ''
      this.getRobotActions()
    },
    backHistory() {
      window.history.back()
    },
    redirectCreate() {
      this.hasPermissionAction(
          this.roleList,
          Permissions.RobotDelete,
          'users/robot/createRobotAction',
          this.generateTitleView('permissionMessage', 'message')
      )
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

    .btn-create-hotel {
      padding: 5px 10px;
    }
  }

  .filter {
    margin: 10px 10px 10px;
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
        background: #123d8b;
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
      background: #123d8b;
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
