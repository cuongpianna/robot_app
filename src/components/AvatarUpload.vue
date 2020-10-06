<template>
  <div class="components-container">
    <div class="title">{{ title }}: <div class="btn-upload" @click="imagecropperShow=true"><font-awesome-icon icon="angle-double-up" />  Upload</div></div>
    <pan-thumb :image="storage_public + img" :hoverable="false"/>
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
    },
    title: {
      type: String,
      default : () => ''
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

<style scoped lang="scss">
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 0%;
}

.btn-upload{
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  padding: 5px 32px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 10px;
  transition: all ease .3s;
  cursor: pointer;

  &:hover{
    background: #46a6ff;
    border-color: #46a6ff;
    color: #fff;
  }
}

.components-container{
  //display: flex;
  //align-items: flex-end;
}

.title{
  align-items: center;
  display: flex;
  margin-bottom: 10px;
}
</style>

