<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/dashboard" title="DashBoard" class="back-link"><font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" /></router-link>
          <span class="title-page">{{ generateTitleView('roleManagement', 'role') }}</span>
        </div>
        <div class="action-container">
          <el-button icon="el-icon-plus" type="primary" class="btn-create-hotel" @click="hasPermissionAction(roles, 'Role_Create', 'users/role/create', permissionMessage)">{{ generateTitleView('createRole', 'role') }}</el-button>
        </div>
      </div>
    </sticky>
    <div class="filter">
      <div class="filter-content">
        <el-form ref="form" class="user-form" label-position="top" label-width="150px">
          <el-form-item :label="generateTitleView('roleName', 'role')" prop="name" class="item-account">
            <el-input v-model="listQuery.name" :disabled="false" />
          </el-form-item>

          <el-form-item :label="generateTitleView('activityStatus', 'role')" prop="status" class="item-status">
            <el-select v-model="listQuery.status" :placeholder="generateTitleView('placeholder', 'role')">
              <el-option
                v-for="(item, index) in listStatus"
                :key="index"
                :value="item.value"
                :label="item.label"
              >{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="item-action">
          <el-button plain class="btn-reset" @click="resetFilter">{{ generateTitleView('reset', 'role') }}</el-button>
          <el-button type="primary" plain class="btn-search" @click="getRole">{{ generateTitleView('search', 'role') }}</el-button>
        </div>
      </div>
    </div>
    <div class="table-users">
      <el-table
        :key="0"
        v-loading="isLoading"
        class="table-list"
        fit
        :data="listRoles"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column :label="generateTitleView('stt', 'role')" prop="id" align="center" width="80">
          <template slot-scope="{row, $index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('roleName', 'role')" min-width="150">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('role', 'role')" align="center" width="220">
          <template slot-scope="{row}">
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('permission', 'role')"
              placement="top"
            >
              <el-button type="primary" size="mini" @click="showPopup(row.id)">
                <i class="el-icon-setting" />
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>
        <el-table-column :label="generateTitleView('status', 'role')" class-name="status-col" width="120">
          <template slot-scope="{row}">
            <el-toggle-button
              v-model="row.isActive"
              :value="true"
              color="#123D8B"
              :sync="true"
              @change="updateRoleStatus(row.id, $event)"
            />
          </template>
        </el-table-column>

        <el-table-column
          :label="generateTitleView('actions', 'role')"
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
              <el-button type="primary" size="mini" rounded @click="editRole(row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('delete', 'role')"
              placement="top"
            >
              <el-button size="mini" type="danger" @click="removeItem(row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalRoles>0"
        class="pagination-hotel"
        :total="totalRoles"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getRole"
      />
    </div>
    <div class="permission-popup">
      <div class="header-popup">
        {{ generateTitleView('permissionForRole', 'role') }}
        <el-button class="btn-save-permission" @click="updatePermission">Lưu</el-button>
        <i class="el-icon-close" @click="hiddenPopup" />
      </div>
      <el-scrollbar>
        <div class="permission-list">
          <div v-for="(item, index) in modules" :key="index" class="item item-permission" :data-module-id="item.id">
            <div class="item-header">
              <div class="title">
                <font-awesome-icon icon="user-circle" color="#888" class="user-icon" />
                <span>{{ item.description }}</span>
              </div>
              <div class="full-control">
                <!--<span>Full Quyền</span>-->
                <el-checkbox :data-module-id="item.id" class="check-all" @change="setOrUnSetFullPermission($event, item.id)" />
              </div>
            </div>
            <ul v-if="item.moduleFunction.length" class="item-body" :data-module-id="item.id">
              <li
                v-for="(itemModule, indexModule) in item.moduleFunction"
                :key="indexModule.id + itemModule.name"
              >
                <span>{{ itemModule.name }}</span>
                <el-checkbox v-model="itemModule.isChecked" class="checkbox-item" :data-module-id="item.id" :data-function-id="itemModule.id" @change="checkFullPermission($event, item.id)" />
              </li>
            </ul>
          </div>
        </div>
      </el-scrollbar>
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
    import { ACT_FETCH_ALL_ROLE, ACT_UPDATE_ROLE_MODULE_FUNCTION } from '../../store/constants/role'
    import { FETCH_LIST_MODULE } from '../../store/constants/module'

    const LABEL = {
        name: '',
        title: 'ROLE',
        model: 'role/',
        modelModule: 'module/',
        modelFunction: 'function',
        slug: 'role',
        edit: 'Sửa',
        create: 'Tạo mới',
        formPermissionRole: 'Phân quyền từng module'
    }

    export default {
        name: 'Role',
        components: {
            Pagination,
            Sticky,
            ElToggleButton
        },
        data() {
            return {
                role: {},
                listRole: [],
                modules: [],
                moduleFunctions: [],
                listQuery: {
                    page: 1,
                    name: '',
                    status: null,
                    limit: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                listStatus: [
                    { value: false, label: this.generateTitleView('deactive', 'role') },
                    { value: true, label: this.generateTitleView('active', 'role') }
                ],
                dialogForm: true,
                PAGE_TITLE: LABEL.formPermissionRole,
                roleId: '',
                roleUpdate: {},
                isLoading: true,
                permissionMessage: this.generateTitleView('error', 'permissionMessage')
            }
        },
        computed: {
            ...mapGetters({
                language: 'language',
                roles: 'roles',
                listRoles: LABEL.model + 'listRoles',
                totalRoles: LABEL.model + 'totalRoles'
            })
        },
        watch: {
            language: {
                immediate: true,
                handler(val, oldVal) {
                    this.listStatus = [
                        { value: false, label: this.generateTitleView('deactive', 'role') },
                        { value: true, label: this.generateTitleView('active', 'role') }
                    ]
                    this.permissionMessage = this.generateTitleView('error', 'permissionMessage')
                }
            }
        },
        mounted() {
            this.getRole()
        },
        methods: {
            getRole() {
                this.isLoading = true
                const data = this.$store
                    .dispatch(LABEL.model + ACT_FETCH_ALL_ROLE, {
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
                this.getRole()
            },
            removeItem(id) {
                this.$confirm(this.generateTitleView('textMessageDelete', 'message'), this.generateTitleView('titleMessageDelete', 'message'), {
                    confirmButtonText: this.generateTitleView('textBtnOk', 'message'),
                    cancelButtonText: this.generateTitleView('textBtnCancel', 'message'),
                    type: 'warning'
                }).then(() => {
                    const permissionAction = this.hasPermissionAction(this.roles, 'Role_Delete', '', this.permissionMessage)
                    if (permissionAction) {
                        this.isLoading = true
                        const data = this.$store
                            .dispatch(LABEL.model + 'Remove', id)
                            .then(res => {
                                this.isLoading = false
                                if (res.isSuccess) {
                                    this.getRole()
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
                })
            },
            showPopup(id) {
                this.roleId = id
                const data = this.$store
                    .dispatch(LABEL.modelModule + FETCH_LIST_MODULE, { id: id, isActive: true }, {
                        current_page: 1,
                        limit: 100
                    })
                    .then(res => {
                        this.modules = res.payload.records
                    })

                const popup = document.querySelector('.permission-popup')
                if (typeof popup !== 'undefined') {
                    popup.classList.add('active')
                }
                return data
            },
            hiddenPopup() {
                const popup = document.querySelector('.permission-popup')
                if (typeof popup !== 'undefined') {
                    popup.classList.remove('active')
                }
            },
            updatePermission() {
                if (this.roleId !== '') {
                    var me = this
                    const eleItems = document.querySelectorAll('.item-permission')
                    const permissionList = []
                    if (eleItems.length) {
                        for (let i = 0; i < eleItems.length; i++) {
                            const item = eleItems[i]
                            const moduleId = item.getAttribute('data-module-id')
                            const eleItemCheckBox = item.querySelectorAll('.checkbox-item')
                            if (eleItemCheckBox.length) {
                                const objectPermission = {
                                    roleId: this.roleId,
                                    moduleId: moduleId,
                                    functionList: []
                                }
                                for (let j = 0; j < eleItemCheckBox.length; j++) {
                                    const functionId = eleItemCheckBox[j].getAttribute('data-function-id')
                                    const input = eleItemCheckBox[j].getElementsByTagName('input')[0]
                                    if (input.checked) {
                                        objectPermission.functionList.push(functionId)
                                    }
                                }
                                permissionList.push(objectPermission)
                            }
                        }
                        if (permissionList.length) {
                            this.$store
                                .dispatch(LABEL.model + ACT_UPDATE_ROLE_MODULE_FUNCTION, permissionList)
                                .then(res => {
                                    if (res.isSuccess) {
                                        this.hiddenPopup()
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
                        }
                    }
                }
            },
            setOrUnSetFullPermission(event, id) {
                if (event) {
                    const itemBody = document.querySelector('.item-body[data-module-id="' + id + '"]')
                    const checkboxList = itemBody.getElementsByTagName('input')
                    if (checkboxList.length) {
                        for (let i = 0; i < checkboxList.length; i++) {
                            if (!checkboxList[i].checked) {
                                checkboxList[i].click()
                            }
                        }
                    }
                } else {
                    const itemBody = document.querySelector('.item-body[data-module-id="' + id + '"]')
                    const checkboxList = itemBody.getElementsByTagName('input')
                    if (checkboxList.length) {
                        let count = 0
                        for (let i = 0; i < checkboxList.length; i++) {
                            if (checkboxList[i].checked) {
                                count++
                            }
                        }
                        if (count === checkboxList.length) {
                            for (let i = 0; i < checkboxList.length; i++) {
                                checkboxList[i].click()
                            }
                        }
                    }
                }
            },
            checkFullPermission(event, id) {
                const checkAllEle = document.querySelector('.check-all[data-module-id="' + id + '"]')
                const btnCheckAll = checkAllEle.querySelector('input')
                if (event) {
                    const itemBody = document.querySelector('.item-body[data-module-id="' + id + '"]')
                    const checkboxList = itemBody.getElementsByTagName('input')
                    if (checkboxList.length) {
                        let count = 0
                        for (let i = 0; i < checkboxList.length; i++) {
                            if (checkboxList[i].checked) {
                                count++
                            }
                        }
                        if (checkboxList.length === count) {
                            if (!btnCheckAll.checked) {
                                btnCheckAll.click()
                            }
                        }
                    }
                } else {
                    if (btnCheckAll.checked) {
                        btnCheckAll.click()
                    }
                }
            },
            editRole(id) {
                this.hasPermissionAction(this.roles, 'Role_Edit', 'users/role/edit/' + id, this.permissionMessage)
            },
            generateTitleView,
            hasPermissionAction,
            updateRoleStatus(id, event) {
                const permissionAction = this.hasPermissionAction(this.roles, 'Role_Edit', '', this.generateTitleView('permissionMessage', 'message'))
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
                                    duration: 4000
                                })
                                window.location.href = '/#/users/role'
                            } else {
                                this.$notify.error({
                                    title: this.generateTitleView('error', 'message'),
                                    message: this.generateTitleView('errorMessage', 'message'),
                                    duration: 4000
                                })
                                window.location.href = '/#/users/role'
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
        .back-link

    {
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
        .title-container

    {
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
        .filter-content

    {
        padding: 10px;
        width: 100%;
        background: #fff;
        display: flex;
        justify-content: flex-start;
        .user-form

    {
        display: flex;
        /deep/ .el-form-item__label

    {
        line-height: 20px;
        font-weight: normal;
    }

    .item-account {
        margin-bottom: 0;
        width: 400px;
        /deep/ .el-input__inner

    {
        padding: 5px 10px;
        height: 32px;
        margin-bottom: 0;
    }

    }

    .item-status {
        margin-left: 20px;
        margin-bottom: 0;
        /deep/ .el-input__inner

    {
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
        .table-list

    {
        /deep/ tr:nth-child(odd)

    {
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
        &.pagination-container

    {
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

    .permission-popup {
        position: fixed;
        background: #fff;
        width: 0;
        height: 100vh;
        top: 0;
        right: 0;
        transition: all 0.3s ease-in-out;
        border: 1px solid #d9d9d9;
        border-radius: 4px 4px 0 0;
        z-index: 9999;
        &.active

    {
        width: 80%;
        .header-popup

    {
        i

    {
        left: -22px;
    }

    }
    }

    .header-popup {
        padding: 15px;
        border-bottom: 1px solid #d9d9d9;
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        i

    {
        position: absolute;
        left: 0;
        top: 38px;
        background: #fff;
        font-size: 20px;
        border: 1px solid #d9d9d9;
        border-radius: 4px 0 0 4px;
        cursor: pointer;
        z-index: 1000;
    }

    .btn-save-permission {
        padding: 8px 20px;
        background: #123d8b;
        color: #fff;
    }

    }

    .permission-list {
        margin-top: 15px;
        padding: 5px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        height: calc(100vh - 80px);
        .item

    {
        width: 32%;
        margin-bottom: 1%;
        margin-right: 1%;
        &:nth-child(3n)

    {
        margin-right: 0
    }

    .item-header {
        padding: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 4px 4px 0 0;
        display: flex;
        justify-content: space-between;
        background: #f4f5f4;
    }

    .item-body {
        padding: 10px;
        border-left: 1px solid #d9d9d9;
        border-right: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        li

    {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #d9d9d9;
        display: flex;
        justify-content: space-between;
        &:last-child

    {
        border-bottom: none;
        margin-bottom: 0;
    }

    }
    }
    }
    }
    }
    }
</style>

