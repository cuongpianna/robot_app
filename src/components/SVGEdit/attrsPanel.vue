<template>
    <collapse-panel label="Dữ liệu">
        <template v-for="attr in compAttrs">
            <el-row class="ctrl-item" :span="12">
                <label class="bind-label">{{ attr.name }}</label>
                <template v-for="items in attr.data">
                    <el-col :span="12">
                        <label class="bind-label">{{ items.label }}</label>
                        <el-input v-model="items.value"
                                  class="attr-input"
                                  @change="compValInputChanged" />
                    </el-col>
                </template>
            </el-row>
        </template>
    </collapse-panel>
</template>
<script>
    export default {
        props: {
            compAttrs: null,
            dataBinds: null
        },
        data() {
            return {
                cascaderProps: {
                    value: 'label',
                    children: 'cities'
                }
            }
        },
        computed: {

        },
        mounted() {
            // setInterval(() => {
            //   this.compAttrs[0].value += 2
            //   this.$emit('compValInputChanged')
            // }, 3000)
        },
        methods: {
            compValInputChanged() {
                this.$emit('compValInputChanged')
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ #attr_panel {
        .panel-content

    {
        padding-top: 0;
    }

    }

    /deep/ .ctrl-item {
        margin: 4px 4px;
        label

    {
        display: block;
        margin-top: 6px;
        padding-left: 2px;
    }

    /deep/ label.bind-label {
        margin-bottom: 6px;
        margin-top: 10px;
    }

    /deep/ label.label-preview {
        color: #666;
    }

    /deep/ .attr-input input {
        max-width: 100px !important;
    }

    /deep/ .el-col {
        margin-bottom: 4px;
    }

    /deep/ .el-cascader {
        width: 100%;
        margin-bottom: 2px;
    }
    }
</style>
