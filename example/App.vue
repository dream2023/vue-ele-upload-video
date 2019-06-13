<template>
  <ele-upload-video
    :file-type="['mp4', 'avi']"
    :limit="20"
    @error="handleUploadError"
    @success="handleUploadSuccess"
    style="margin: 50px"
    url="ttps://jsonplaceholder.typicode.com/posts/"
    v-model="video"
  />
</template>

<script>
export default {
  data () {
    return {
      video: null
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

