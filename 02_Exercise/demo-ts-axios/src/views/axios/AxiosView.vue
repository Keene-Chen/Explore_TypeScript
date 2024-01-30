<script lang="ts" setup>
import router from '@/router';
import useAxiosApi from '@/utils/useAxiosApi';
import { NButton, NButtonGroup } from 'naive-ui';

const doGet = async () => {
  const { data } = await useAxiosApi.get('https://jsonplaceholder.typicode.com/todos/1');
  console.log(data);
};

const doPost = async () => {
  const { data } = await useAxiosApi.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
  });
  console.log(data);
};
</script>

<template>
  <n-button-group>
    <n-button type="primary" ghost @click="doGet">doGet</n-button>
    <n-button type="info" ghost @click="doPost">doPost</n-button>
    <n-button type="success" ghost @click="router.replace({ name: 'file_upload' })"
      >file_upload</n-button
    >
    <n-button type="warning" ghost @click="doGet">doGet</n-button>
    <n-button type="error" ghost @click="doGet">doGet</n-button>
  </n-button-group>
</template>
