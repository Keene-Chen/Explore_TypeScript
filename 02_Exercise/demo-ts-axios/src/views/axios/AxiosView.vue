<script lang="ts" setup>
import useAxiosApi from '@/utils/useAxiosApi';
import { ref } from 'vue';

const doGet = async () => {
  const res = await useAxiosApi.get('https://jsonplaceholder.typicode.com/todos/1');
  console.log(res);
};
</script>

<template>
  <button @click="doGet">doGet</button>
</template>
