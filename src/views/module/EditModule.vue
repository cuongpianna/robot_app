<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/users/module">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <span class="title-page">{{ generateTitleView('editModule', 'module') }}</span>
        </div>
        <div class="action-container">
          <router-link to="/users/module">
            <el-button plain class="btn-back">{{ generateTitleView('skip', 'module') }}</el-button>
          </router-link>
          <el-button type="primary" plain class="btn-save" @click="editModule()">{{
            generateTitleView('save', 'module')
          }}
          </el-button>
        </div>
      </div>
    </sticky>
    <div class="role-info">
      <div class="info-title">{{ generateTitleView('moduleInfo', 'module') }}</div>
      <div class="info-content">
        <el-form
          ref="form"
          class="user-form"
          :model="formCreate"
          :rules="rules"
          label-position="top"
          label-width="150px"
        >
          <el-form-item :label="generateTitleView('moduleName', 'module')" prop="name" class="item-name">
            <el-input v-model="formCreate.name" :disabled="true" />
          </el-form-item>
          <el-form-item :label="generateTitleView('description', 'module')" prop="description" class="item-description">
            <el-input v-model="formCreate.description" :disabled="false" type="textarea" rows="5" />
          </el-form-item>
          <el-form-item :label="generateTitleView('status', 'module')" prop="isActive" class="item-status">
            <el-select v-model="formCreate.isActive" :placeholder="generateTitleView('placeholder', 'module')">
              <el-option
                v-for="(item, index) in listStatus"
                :key="index"
                :value="item.value"
                :label="item.label"
              >{{ item.label }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="generateTitleView('functions', 'module')" prop="functions" class="item-role">
            <el-drag-select v-model="functions" style="width:100%;" multiple>
              <el-option
                v-for="(item, index) in functionList"
                :key="index + '_' + item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-drag-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ElDragSelect from '@/components/DragSelect'
import Sticky from '@/components/Sticky'
import { generateTitleView } from '@/help/utils/i18n'

const LABEL = {
  model: 'module',
  moduleFunctions: 'functions',
}

const defaultCreate = {
  name: '',
  description: '',
  isActive: null
}

export default {
  name: 'EditModule',
  components: {
    ElDragSelect,
    Sticky
  },
  data() {
    return {
      formCreate: JSON.parse(JSON.stringify(defaultCreate)),
      isLoading: false,
      rules: {
        name: [
          {
            required: true,
            message: this.generateTitleView('nameRequired', 'module'),
            trigger: 'blur'
          }
        ],
        description: [
          { required: true, message: this.generateTitleView('descriptionRequired', 'module'), trigger: 'blur' }
        ]
      },
      listStatus: [
        { value: false, label: this.generateTitleView('deactive', 'module') },
        { value: true, label: this.generateTitleView('active', 'module') }
      ],
      moduleId: null,
      functions: [],
      functionList: []
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language: {
      immediate: true,
      handler() {
        this.rules = {
          name: [
            {
              required: true,
              message: this.generateTitleView('nameRequired', 'module'),
              trigger: 'blur'
            }
          ],
          description: [
            { required: true, message: this.generateTitleView('descriptionRequired', 'module'), trigger: 'blur' }
          ]
        }
        this.listStatus = [
          { value: false, label: this.generateTitleView('deactive', 'module') },
          { value: true, label: this.generateTitleView('active', 'module') }
        ]
      }
    }
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
    const moduleId = this.$router.currentRoute.params.id
    if (typeof moduleId !== 'undefined' && moduleId != null) {
      this.getModuleDetail(moduleId)
      this.getFunctionAll()
    }
  },
  methods: {
    editModule() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.isLoading = true

          var functionAdd = []
          for (const item of this.functionList) {
            for (const select of this.functions) {
              if (select === item.id) {
                functionAdd.push(item)
              }
            }
          }
          this.formCreate.ModuleFunction = functionAdd
          const data = this.$store
              .dispatch(LABEL.model + '/Edit', this.formCreate)
              .then(res => {
                this.isLoading = false
                if (res.isSuccess) {
                  this.$notify.success({
                    title: this.generateTitleView('success', 'message'),
                    message: this.generateTitleView('successMessage', 'message'),
                    duration: 2000
                  })
                  window.location.href = '/#/users/module'
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
    getModuleDetail(id) {
      const data = this.$store
          .dispatch(LABEL.model + '/FetchOne', { id: id })
          .then(res => {
            const moduleDetail = res.payload.records[0]
            const formAttr = {
              id: moduleDetail.id,
              name: moduleDetail.name,
              description: moduleDetail.description,
              isActive: moduleDetail.isActive
            }
            const frmFunction = []
            if (moduleDetail.moduleFunction.length) {
              moduleDetail.moduleFunction.forEach((item) => {
                frmFunction.push(item.id)
              })
            }
            this.functions = frmFunction
            this.formCreate = JSON.parse(JSON.stringify(formAttr))
          })
      return data
    },
    getFunctionAll() {
      const data = this.$store
          .dispatch(LABEL.moduleFunctions + '/FetchList', { current_page: 1, limit: 100 })
          .then(res => {
            this.functionList = res.payload.records
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

  .role-info {
    margin: 10px 10px 10px;
    background: #fff;
    padding: 20px;

    .info-title {
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
