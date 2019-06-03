<template>
  <div class="ele-upload-video">
    <!-- 上传组件 -->
    <el-upload
      :action="url"
      :before-upload="handleBeforeUploadVideo"
      :data="data"
      :disabled="videoUploadPercent > 0 && videoUploadPercent < 100"
      :on-error="handleUploadError"
      :on-progress="handleUploadProcess"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      drag
      v-bind="customAttrs"
      v-if="!value"
    >
      <!-- 上传进度 -->
      <el-progress
        :percentage="videoUploadPercent"
        style="margin-top: 20px;"
        type="circle"
        v-if="videoUploadPercent > 0"
      />

      <!-- 上传提示 -->
      <template v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将视频拖到此处，或
          <em>点击上传</em>
        </div>
        <div
          slot="tip"
          style="margin-top: 8px;"
        >
          请保证视频格式正确，且文件大小不超过
          <span style="color: #F56C6C">{{limit}}</span>&nbsp;M
        </div>
      </template>
    </el-upload>

    <!-- 视频缩略 -->
    <vue-hover-mask v-if="value">
      <video
        :autoplay="false"
        :src="value"
        :style="{width: width + 'px', height: height ? height + 'px' : 'auto'}"
      >您的浏览器不支持视频播放</video>
      <template v-slot:action>
        <span
          @click="handlePlayerVideo"
          class="ele-upload-video_mask__item"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          @click="handleDeleteVideo"
          class="ele-upload-video_mask__item"
        >
          <i class="el-icon-delete"></i>
        </span>
      </template>
    </vue-hover-mask>

    <!-- 弹窗播放 -->
    <el-dialog :visible.sync="isShowVideo">
      <video
        :autoplay="true"
        :src="value"
        controls="controls"
        style="width: 100%"
        v-if="isShowVideo"
      >您的浏览器不支持视频播放</video>
    </el-dialog>
  </div>
</template>

<script>
import VueHoverMask from 'vue-hover-mask/src/index'

export default {
  name: 'EleUploadVideo',
  components: {
    VueHoverMask
  },
  props: {
    // 值
    value: {
      type: String,
      required: true
    },
    // 上传地址
    url: {
      type: String,
      required: true
    },
    // 文件大小限制(Mb), 默认10Mb
    limit: {
      type: Number,
      default: 10
    },
    // 显示宽度(px)
    width: {
      type: Number,
      default: 360
    },
    // 显示高度(默认auto)
    height: {
      type: Number
    },
    // 上传时附带的数据, 选填
    data: {
      type: Object
    },
    // 文件类型
    fileType: {
      type: Array,
      default () {
        return ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb']
      }
    },
    // upload组件属性
    customAttrs: {
      type: Object
    }
  },
  data () {
    return {
      isShowVideo: false,
      videoUploadPercent: 0
    }
  },
  methods: {
    // 上传大小和格式检测
    handleBeforeUploadVideo (file) {
      // 校检格式
      if (!this.fileType.includes(file.type)) {
        this.$message.error(`${file.name}格式不正确, 请上传格式正确的视频`)
        return false
      }
      // 校检文件大小
      const isLt = file.size / 1024 / 1024 < this.limit
      if (!isLt) {
        this.$message.error(`上传视频大小不能超过${this.limit}MB哦!`)
        return false
      }

      return true
    },

    // 上传进度
    handleUploadProcess (event, file) {
      this.videoUploadPercent = Number(file.percentage.toFixed(0))
    },

    // 上传成功
    handleUploadSuccess (response, file, fileList) {
      this.videoUploadPercent = 0
      this.$message.success('上传成功!')
      this.$emit('success', response, file, fileList)
    },

    // 上传失败
    handleUploadError (err, file, fileList) {
      this.$message.error('上传失败, 请重试!')
      this.videoUploadPercent = 0
      this.$emit('error', err, file, fileList)
    },

    // 删除视频
    handleDeleteVideo () {
      this.$emit('delete')
      this.$emit('input', '')
    },

    // 播放视频
    handlePlayerVideo () {
      this.isShowVideo = true
    }
  }
}
</script>

<style>
.ele-upload-video_mask__item {
  padding: 0 10px;
}
</style>
