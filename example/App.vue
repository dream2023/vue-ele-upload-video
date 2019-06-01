<template>
  <ele-upload-video
    :data="{
        token: token
      }"
    :limit="20"
    @error="handleUploadError"
    @success="handleUploadSuccess"
    style="margin: 50px"
    url="https://upload.qiniup.com/"
    v-model="video"
  />
</template>

<script>
export default {
  data () {
    return {
      token: 'Nx6ehv5XlzuIhvP1mvVffM_jZbsyLErLMc4B2Gor:AkxaVbVUr5d76RGbM6t2NMFhI6o=:eyJzY29wZSI6ImxlYWd1ZSIsImRlYWRsaW5lIjoxNTU5Mzk2MTE4fQ==',
      video: 'https://s3.pstatp.com/aweme/resource/web/static/image/index/tvc-v2_30097df.mp4'
    }
  },
  methods: {
    handleUploadError (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
    },
    handleUploadSuccess({ key }) {
      this.video = 'https://static.qiudin.com/' + key
    }
  }
}
</script>

