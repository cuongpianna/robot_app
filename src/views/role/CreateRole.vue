<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link class="link-back" to="/users/role"><font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" /></router-link>
          <span class="title-page">{{ formTitle }}</span>
        </div>
        <div class="action-container">
          <router-link to="/users/role">
            <el-button plain class="btn-back">{{ generateTitleView('skip', 'role') }}</el-button>
          </router-link>
          <el-button type="primary" plain class="btn-save" @click="handleSubmit">{{ generateTitleView('save', 'role') }}</el-button>
        </div>
      </div>
    </sticky>
    <div class="role-infor">
      <div class="info-title">{{ generateTitleView('roleInfo', 'role') }}</div>
      <div class="info-content">
        <el-form
          ref="form"
          class="user-form"
          :model="formCreate"
          :rules="rules"
          label-position="top"
          label-width="150px"
        >
          <el-form-item :label="generateTitleView('roleName', 'role')" prop="name" class="item-name">
            <el-input v-model="formCreate.name" :disabled="false" />
          </el-form-item>
          <el-form-item :label="generateTitleView('description', 'role')" prop="description" class="item-description">
            <el-input v-model="formCreate.description" :disabled="false" type="textarea" rows="5" />
          </el-form-item>
          <el-form-item :label="generateTitleView('status', 'role')" prop="isActive" class="item-status">
            <el-select v-model="formCreate.isActive" :placeholder="generateTitleView('placeholder', 'role')">
              <el-option
                v-for="(item, index) in listStatus"
                :key="index"
                :value="item.value"
                :label="item.label"
              >{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
    import Cookies from 'js-cookie'
    import request from '@/help/request'
    import axios from 'axios'
    import { mapGetters } from 'vuex'
    import Loading from '@/components/Loading'
    import Sticky from '@/components/Sticky'
    import { generateTitleView } from '@/help/utils/i18n'

    const LABEL = {
        name: '',
        title: 'Role',
        model: 'role',
        slug: 'role',
        edit: 'Sửa',
        create: 'Tạo mới'
    }

    const defaultCreate = {
        name: '',
        description: '',
        isActive: true,
        roleType: 1
    }

    const rules = {
        name: [
            {
                required: true,
                message: `Vui lòng nhập tên ${LABEL.title.toLowerCase()}!`,
                trigger: 'blur'
            }
        ],
        description: [
            { required: true, message: 'Vui lòng nhập mô tả!', trigger: 'blur' }
        ]
    }

    export default {
        name: 'CreateRole',
        components: {
            Sticky
        },
        data() {
            return {
                formCreate: JSON.parse(JSON.stringify(defaultCreate)),
                isLoading: false,
                rules,
                listStatus: [
                    { value: false, label: this.generateTitleView('deactive', 'role') },
                    { value: true, label: this.generateTitleView('active', 'role') }
                ],
                formTitle: this.$router.currentRoute.params.id != null ? this.generateTitleView('editRole', 'role') : this.generateTitleView('createRole', 'role')
            }
        },
        computed: {
            ...mapGetters(['language'])
        },
        watch: {
            language: {
                immediate: true,
                handler(val, oldVal) {
                    this.rules = {
                        name: [
                            {
                                required: true,
                                message: this.generateTitleView('nameRequired', 'role'),
                                trigger: 'blur'
                            }
                        ],
                        description: [
                            { required: true, message: this.generateTitleView('descriptionRequired', 'role'), trigger: 'blur' }
                        ]
                    }
                    this.listStatus = [
                        { value: false, label: this.generateTitleView('deactive', 'role') },
                        { value: true, label: this.generateTitleView('active', 'role') }
                    ]
                }
            }
        },
        mounted() {
            this.formTitle = this.generateTitleView('createRole', 'role')
            const roleId = this.$router.currentRoute.params.id
            if (typeof roleId !== 'undefined' && roleId != null) {
                this.getRoleDetail(roleId)
                this.formTitle = this.generateTitleView('editRole', 'role')
            }
        },
        methods: {
            handleSubmit() {
                this.formTitle === this.generateTitleView('editRole', 'role') ? this.editRole() : this.createRole()
            },
            createRole() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.isLoading = true
                        const data = this.$store
                            .dispatch(LABEL.model + '/Create', this.formCreate)
                            .then(res => {
                                this.isLoading = false
                                if (res.isSuccess) {
                                    this.formCreate = JSON.parse(JSON.stringify(defaultCreate))
                                    this.$notify.success({
                                        title:  this.generateTitleView('success', 'message'),
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
            editRole() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.isLoading = true
                        const data = this.$store
                            .dispatch(LABEL.model + '/Edit', this.formCreate)
                            .then(res => {
                                this.isLoading = false
                                if (res.isSuccess) {
                                    this.$notify.success({
                                        title: 'Thành công',
                                        message: 'Dữ liệu cập nhật thành công !',
                                        duration: 2000
                                    })
                                    window.location.href = '/#/users/role'
                                } else {
                                    this.$notify.error({
                                        title: 'Thất bại',
                                        message: 'Dữ liệu cập nhật thất bại!',
                                        duration: 2000
                                    })
                                }
                            })
                        return data
                    }
                })
            },
            getRoleDetail(id) {
                const data = this.$store
                    .dispatch(LABEL.model + '/FetchOne', { id: id })
                    .then(res => {
                        const roleDetail = res.payload.records[0]
                        const formAttr = {
                            id: roleDetail.id,
                            name: roleDetail.name,
                            description: roleDetail.description,
                            isActive: roleDetail.isActive
                        }
                        this.formCreate = JSON.parse(JSON.stringify(formAttr))
                    })
                return data
            },
            generateTitleView
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .app-container {
        padding: 0;
        .page-title

    {
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
        position: relative;
        top: -4px;
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
        padding: 8px 20px;
    }

    }

    .role-infor {
        margin: 10px 10px 10px;
        background: #fff;
        padding: 20px;
        .info-title

    {
        font-weight: 600;
        font-size: 17px;
        line-height: 28px;
        color: #212121;
    }

    .item-description /deep/ .el-form-item__label,
    .item-name /deep/ .el-form-item__label,
    .item-status /deep/ .el-form-item__label {
        padding: 0;
    }

    .item-name /deep/ .el-input__inner {
        width: 300px;
    }

    }
    }
</style>
