<template>
  <div class="components-container" @click="imagecropperShow=true">
    <pan-thumb :image="storage_public + img" :hoverable="false" />

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      :url="uploadUri"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
    import ImageCropper from '@/components/ImageCropper'
    import PanThumb from '@/components/PanThumb'

    export default {
        name: 'AvatarUpload',
        components: { ImageCropper, PanThumb },
        props: {
            img: {
                type: String,
                required: true
            },
            apiUrl: {
                type: String,
                required: true
            },
          folderUpload: {
            type: String,
            required: true
          }
        },
        data() {
            return {
                // storage_public: process.env.VUE_APP_STORAGE_HOTEL_AVATAR_PUBLIC + '/',
                storage_public: '',
                uploadUri: '',
                imagecropperShow: false,
                imagecropperKey: 0
            }
        },
        mounted() {
            this.uploadUri = this.apiUrl,
            this.storage_public = this.folderUpload
        },
        methods: {
            cropSuccess(resData) {
                this.imagecropperShow = false
                this.imagecropperKey = this.imagecropperKey + 1
                const image = resData
                this.$emit('update:img', image)
            },
            close() {
                this.imagecropperShow = false
            }
        }
    }
</script>

<style scoped>
    .avatar {
        width: 200px;
        height: 200px;
        border-radius: 0%;
    }
</style>

