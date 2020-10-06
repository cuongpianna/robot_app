<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/" class="back-link">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <router-link
            :to="to"
            title="DashBoard"
            class="title-page"
          >{{ generateTitleView('robotMediaManagement', 'robotMedia') }}</router-link>
        </div>
        <div class="action-container">
          <el-button
            icon="el-icon-plus"
            type="primary"
            class="btn-create-hotel"
            @click="redirectCreate"
          >{{ generateTitleView('create', 'robotMedia') }}</el-button>
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
              :label="generateTitleView('mediaName', 'robotMedia')"
            />
          </v-col>

          <v-col offset-md="7" />
          <v-col md="4" sm="6" class="search-right-wrap">
            <el-button plain class="btn-reset" @click="resetFilter">
              {{ generateTitleView('clear', 'usermanagement') }}
            </el-button>
            <el-button
              type="primary"
              plain
              class="btn-search"
              @click="getMedias"
            >{{ generateTitleView('search', 'usermanagement') }}</el-button>
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
        :data="listMedias"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column prop="id" align="center" width="40">
          <template slot-scope="{row}">
            <!-- <v-checkbox :value="row.id" v-model="robotMedia"/> -->
            <input v-model="mediaSelected" type="checkbox" :value="row.mediaId">
          </template>
        </el-table-column>
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
        <el-table-column :label="generateTitleView('mediaName', 'robotMedia')" min-width="120">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('mediaType', 'robotMedia')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.fileType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('mediaPath', 'robotMedia')" align="center">
          <template slot-scope="{row}">
            <a :href="row.mediaPath" target="_blank">Tải về</a>
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
              :content="generateTitleView('deleteTooltip', 'robotMedia')"
              placement="top"
            >
              <el-button size="mini" type="danger" @click="deleteMedia(row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalMedias>0"
        class="pagination-hotel"
        :total="totalMedias"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getPagination"
      />
    </v-card>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import { hasPermissionAction } from '@/help/utils/index'
import { generateTitleView } from '@/help/utils/i18n'
import { mapGetters, mapActions } from 'vuex'
import * as Permissions from '../../contants/permissions'
import * as ACTIONS from '../../store/constants/usermedia'
import { ACT_FETCH_ROBOT_PAGING } from '../../store/constants/robot'
import * as ROBOT_ACTIONS from '../../store/constants/robot'
import { b64EncodeUnicode } from '../../help/utils/stringHelper'
const LABEL = {
  name: '',
  title: 'Robot',
  model: 'robotmedia/',
  robotModel: 'robot/',
  slug: 'robotmedia',
  edit: 'Sửa',
  create: 'Tạo mới'
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
      to: '',
      dialogForm: false,
      user_id: '',
      currentUser: '',
      formUpdateStatus: JSON.parse(JSON.stringify(defaultUpdateStatus)),
      mediaSelected: [],
      socket: null,
      robotInfo: {}
    }
  },
  computed: {
    ...mapGetters({
      language: 'language',
      listMedias: LABEL.model + 'listMedias',
      totalMedias: LABEL.model + 'totalMedias',
      listRobots: LABEL.robotModel + 'listRobots'
    })
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
    this.socket = this.initSocket()
    this.roleList = this.$store.state.auth.roles
    this.currentUser = this.$store.state.auth.name
    this.currentUserId = this.$store.state.auth.id
    this.robotInfo = this.getRobotInfo()
    this.getMedias()
    const robotId = this.$router.currentRoute.params.robotId
    this.to = '/users/robots/call/' + robotId
  },
  methods: {
    ...mapActions({
      actFetchAllMedia: LABEL.model + ACTIONS.ACT_FETCH_MEDIA_PAGING,
      actUploadMediaToRobot: LABEL.model + ACTIONS.ACT_UPLOAD_MEDIA_TO_ROBOT,
      actInsertMedia: LABEL.model + ACTIONS.ACT_INSERT_MEDIA,
      actFetchAllRobot: LABEL.robotModel + ACT_FETCH_ROBOT_PAGING,
      actDeleteMedia: LABEL.model + ACTIONS.ACT_DELETE_MEDIA,
      actGetRobotInfo: LABEL.robotModel + ROBOT_ACTIONS.ACT_FETCH_ONE_ROBOT
    }),
    getMedias() {
      var robotId = this.$router.currentRoute.params.robotId
      this.actFetchAllMedia({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        robot_id: robotId,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit
      }).then(res => {
        this.loading = false
      })
    },
    getRobots() {
      this.actFetchAllRobot({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        robot_id: robotId,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit
      }).then(res => {
        this.loading = false
      })
    },
    onSelect(items) {
      if (items != null) {
        items.forEach(element => {
          this.robotSelected.push(element.id)
        })
      }
    },
    getRobotInfo() {
      var robotId = this.$router.currentRoute.params.robotId
      this.actGetRobotInfo(robotId).then(res => {
        this.robotInfo = res.payload.records
      })
    },
    deleteMedia(mediaId) {
      this.$confirm(
        'Bạn có chắc chắn muốn xóa media?',
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
          this.actDeleteMedia(mediaId).then(res => {
            if (res.isSuccess) {
              var robotCode = this.robotInfo.code
              var encoded = b64EncodeUnicode(
                'DeletedMedia_' + robotCode + '_' + mediaId
              )
              this.socket.send(encoded)
            }
          })
        }
      })
    },
    resetFilter() {
      this.listQuery.status = null
      this.listQuery.name = ''
      this.getMedias()
    },
    backHistory() {
      window.history.back()
    },
    redirectCreate() {
      var robotId = this.$router.currentRoute.params.robotId
      this.hasPermissionAction(
        this.roleList,
        Permissions.RobotDelete,
        'users/robots/createMedia/' + robotId,
        this.generateTitleView('permissionMessage', 'message')
      )
    },
    initSocket() {
      var webSocketURI = process.env.VUE_APP_DOWNLOAD_MEDIA_SOCKET_URI
      var socket = new WebSocket(webSocketURI)
      const _this = this
      socket.onopen = function() {
        console.log('Connected.')
      }

      socket.onclose = function(event) {
        if (event.wasClean) {
          console.log('Disconnected.')
        } else {
          console.log('Connection lost.') // for example if server processes is killed
        }
        console.log('Code: ' + event.code + '. Reason: ' + event.reason)
        setTimeout(function() {
          _this.socket = _this.initSocket()
        }, 1000)
      }

      socket.onmessage = function(event) {
        var message = event.data
        console.log('Data received: ' + message)
      }

      socket.onerror = function(error) {
        console.log('Error: ' + error.message)
      }
      return socket
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

  .user-diaglog /deep/ {
    .el-dialog__header {
      font-weight: bold;
      font-size: 20px;
    }

    .el-dialog__body {
      padding: 0 20px;
    }

    .el-dialog__footer {
      button {
        background: #123d8b;
        color: #fff;
        padding: 8px 20px;
        border: none;
      }
      button.el-button--info {
        background: #8e97a9;
      }
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
