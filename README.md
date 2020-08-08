# vue-ele-upload-video | 使得视频上传更加容易

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-upload-video.svg)](https://www.npmjs.com/package/vue-ele-upload-video)
[![size](https://img.shields.io/bundlephobia/minzip/vue-ele-upload-video.svg)](https://www.npmjs.com/package/vue-ele-upload-video)
[![download](https://img.shields.io/npm/dw/vue-ele-upload-video.svg)](https://npmcharts.com/compare/vue-ele-upload-video?minimal=true)

## 介绍

vue-ele-upload-video 对 element-ui 中 upload 组件进一步封装，使得视频上传更加容易

## 效果图

![效果图](./public/example.gif)

## 在线示例

[https://codepen.io/dream2023/pen/ZNVvBg/](https://codepen.io/dream2023/pen/ZNVvBg/)

## 安装

```bash
npm install vue-ele-upload-video --save
```

## 使用

```js
// 全局引入
import EleUploadVideo from "vue-ele-upload-video";
Vue.component(EleUploadVideo.name, EleUploadVideo);
```

```js
// 局部引入
import EleUploadVideo from "vue-ele-upload-video";
export default {
  components: {
    EleUploadVideo
  }
};
```

## 示例(上传到七牛云)

```html
<template>
  <ele-upload-video
    :data="{
      token: token
    }"
    :fileSize="20"
    @error="handleUploadError"
    :responseFn="handleResponse"
    style="margin: 50px"
    action="https://upload.qiniup.com/"
    v-model="video"
  />
</template>

<script>
  export default {
    data() {
      return {
        // 上传时需要携带后台请求的token
        token: "xxxx",
        video: ""
      };
    },
    methods: {
      handleUploadError(error) {
        console.log("error", error);
      },
      handleResponse(response) {
        return "https://www.xxx.com/upload/video/" + response.id;
      }
    }
  };
</script>
```

## Props 参数

```js
props: {
  // 值
  value: {
    type: String
  },
  // 上传地址
  action: {
    type: String,
    required: true
  },
  // 响应处理函数
  responseFn: Function,
  // 文件大小限制(Mb)
  fileSize: {
    type: Number
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
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true
  },
  // 是否显示上传成功的提示
  isShowSuccessTip: {
    type: Boolean,
    default: true,
  },
  // 文件类型
  fileType: {
    type: Array
  },
    // 设置上传的请求头部(同官网)
  headers: Object,
  // 支持发送 cookie 凭证信息 (同官网)
  withCredentials: {
    type: Boolean,
    default: false
  },
  // 上传时附带的额外参数(同官网)
  data: {
    type: Object
  },
  // 上传的文件字段名 (同官网)
  name: {
    type: String,
    default: 'file'
  },
    // 覆盖默认的上传行为，可以自定义上传的实现 (同官网)
  httpRequest: Function,
  // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）(同官网)
  accept: String,
  // 删除前的操作(同官网)
  beforeRemove: Function,
}
```

## 参考链接

- [element-ui upload 组件](https://element.eleme.cn/#/zh-CN/component/upload)
- [element-ui progress 组件](https://element.eleme.cn/#/zh-CN/component/progress)
