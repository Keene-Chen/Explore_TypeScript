<script lang="ts" setup>
import Request from '@/utils/request';
import { ref } from 'vue';

const data = ref();

(async () => {
  const  res  = await Request.get('https://jsonplaceholder.typicode.com/todos/p1');
  data.value = res;
  console.log(res);
})();
</script>

<template>
  {{ data }}
</template>
