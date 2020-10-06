<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link class="back-link" to="/dashboard" title="DashBoard">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <span class="title-page">{{ generateTitleView('moduleManagement', 'module') }}</span>
        </div>
        <div class="action-container" />
      </div>
    </sticky>
    <div class="filter">
      <div class="filter-content">
        <el-form ref="form" class="user-form" label-position="top" label-width="150px">
          <el-form-item :label="generateTitleView('moduleName', 'module')" prop="name" class="item-account">
            <el-input v-model="listQuery.name" :disabled="false" />
          </el-form-item>
          <el-form-item :label="generateTitleView('activityStatus', 'module')" prop="status" class="item-status">
            <el-select v-model="listQuery.status" :placeholder="generateTitleView('placeholder', 'module')">
              <el-option
                v-for="(item, index) in listStatus"
                :key="index"
                :value="item.value"
                :label="item.label"
              >{{ item.label }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="item-action">
          <el-button plain class="btn-reset" @click="resetFilter">{{ generateTitleView('reset', 'module') }}</el-button>
          <el-button type="primary" plain class="btn-search" @click="getModule">{{
            generateTitleView('search', 'module')
          }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="table-users">
      <el-table
        :key="0"
        v-loading="isLoading"
        class="table-list"
        fit
        :data="listModule"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column :label="generateTitleView('stt', 'module')" prop="id" align="center" width="80">
          <template slot-scope="{row, $index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('moduleName', 'module')" width="200">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('description', 'module')" min-width="150">
          <template slot-scope="{row}">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('status', 'module')" class-name="status-col" width="120">
          <template slot-scope="{row}">
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
                @change="updateModuleStatus(row.id, $event)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          :label="generateTitleView('actions', 'module')"
          align="center"
          width="130"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('update', 'role')"
              placement="top"
            >

              <el-button type="primary" size="mini" rounded @click="editModule(row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalModules>0"
        class="pagination-hotel"
        :total="totalModules"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getModule"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import { generateTitleView } from '@/help/utils/i18n'
import { hasPermissionAction } from '@/help/utils/index'
import ElToggleButton from '@/components/ToggleButton'
import { FETCH_ALL_MODULE } from '../../store/constants/module'

const LABEL = {
  model: 'module/'
}
export default {
  name: 'Module',
  components: {
    Pagination,
    Sticky,
    ElToggleButton
  },
  data() {
    return {
      modules: [],
      total: 0,
      listQuery: {
        page: 1,
        name: '',
        status: null,
        limit: 10
      },
      listStatus: [
        { value: false, label: this.generateTitleView('deactive', 'module') },
        { value: true, label: this.generateTitleView('active', 'module') }
      ],
      isLoading: true,
      roleList: []
    }
  },
  computed: {
    ...mapGetters({
      language: 'language',
      roles: 'roles',
      listModule: 'module/listModule',
      totalModules: 'module/totalModules'
    })
  },
  watch: {
    language: {
      immediate: true,
      handler(val, oldVal) {
        this.listStatus = [
          { value: false, label: this.generateTitleView('deactive', 'module') },
          { value: true, label: this.generateTitleView('active', 'module') }
        ]
      }
    }
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
    this.roleList = this.$store.state.auth.roles
    this.getModule()
  },
  methods: {
    getModule() {
      this.isLoading = true
      const data = this.$store
          .dispatch(LABEL.model + FETCH_ALL_MODULE, {
            current_page: this.listQuery.page,
            status: this.listQuery.status,
            name: this.listQuery.name,
            limit: this.listQuery.limit
          })
          .then(res => {
            this.isLoading = false
          })
      return data
    },
    resetFilter() {
      this.listQuery.status = null
      this.listQuery.name = ''
      this.getModule()
    },
    editModule(id) {
      this.hasPermissionAction(this.roleList, 'Module_Edit', 'users/module/edit/' + id, this.generateTitleView('permissionMessage', 'message'))
    },
    generateTitleView,
    hasPermissionAction,
    updateModuleStatus(id, event) {
      const permissionAction = this.hasPermissionAction(this.roles, 'Module_Edit', '', this.generateTitleView('permissionMessage', 'message'))
      if (permissionAction) {
        var dataUpdate = {
          isActive: event.value,
          id: id
        }
        const data = this.$store
            .dispatch(LABEL.model + 'UpdateStatus', dataUpdate)
            .then(res => {
              if (res.isSuccess) {
                this.$notify.success({
                  title: this.generateTitleView('success', 'message'),
                  message: this.generateTitleView('successMessage', 'message'),
                  duration: 2000
                })
              } else {
                this.$notify.error({
                  title: this.generateTitleView('error', 'message'),
                  message: this.generateTitleView('errorMessage', 'message'),
                  duration: 2000
                })
              }
            })
        return data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-container {
  padding: 0;

  .back-link {
    display: inline-flex;
    align-items: center;
    margin-bottom: 5px;
  }

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

  }

  .filter {
    margin: 10px 10px 10px;

    .filter-content {
      padding: 10px;
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: flex-start;

      .user-form {
        display: flex;

        /deep/ .el-form-item__label {
          line-height: 20px;
          font-weight: normal;
        }

        .item-account {
          margin-bottom: 0;
          width: 400px;

          /deep/ .el-input__inner {
            padding: 5px 10px;
            height: 32px;
            margin-bottom: 0;
          }

        }

        .item-status {
          margin-left: 20px;
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
        margin-left: 50px;
      }

      .btn-reset {
        background: #8e97a9;
        color: #fff;
        padding: 8px 20px;
      }

      .btn-search {
        background: #123d8b;
        color: #fff;
        padding: 8px 20px;
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
      }

      .status-user {
        font-size: 12px;
      }

    }
  }

  .pagination-hotel {
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
}
</style>

