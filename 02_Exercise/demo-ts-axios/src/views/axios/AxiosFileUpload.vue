<script lang="ts" setup>
import type { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ref } from 'vue';

const upload = (event) => {
  const file: File = event.target.files[0];
  const config: AxiosRequestConfig = {
    onUploadProgress(progressEvent: AxiosProgressEvent) {
      // 进度计算
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`上传进度：${percentCompleted}%`);
      percentage.value = percentCompleted;
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  const formData = new FormData();
  formData.append('file', file);

  return axios
    .post('https://httpbin.org/anything', formData, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

/*  */
const percentage = ref(0);

const add = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 0;
  }
};

const minus = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 100;
  }
};
</script>

<template>
  <n-space vertical>
    <n-upload multiple directory-dnd action="https://www.mocky.io/v2" :max="5">
      <n-upload-dragger>
        <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
    </n-upload>

    <n-el>
      <n-progress
        type="multiple-circle"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="[
          percentage,
          (percentage + 10) % 100,
          (percentage + 20) % 100,
          (percentage + 30) % 100
        ]"
        :color="[
          'var(--info-color)',
          'var(--success-color)',
          'var(--warning-color)',
          'var(--error-color)'
        ]"
        :rail-style="[
          { stroke: 'var(--info-color)', opacity: 0.3 },
          { stroke: 'var(--success-color)', opacity: 0.3 },
          { stroke: 'var(--warning-color)', opacity: 0.3 },
          { stroke: 'var(--error-color)', opacity: 0.3 }
        ]"
      >
        <div style="text-align: center; color: aqua">圈圈赛跑！</div>
      </n-progress>
    </n-el>
    <n-space>
      <n-button type="primary" ghost @click="minus"> 减 10% </n-button>
      <n-button type="info" ghost @click="add"> 加 10% </n-button>
      <input type="file" @change="upload" />
    </n-space>
  </n-space>
</template>

<style scoped>
.n-upload-dragger {
  background-color: transparent;
}
</style>
