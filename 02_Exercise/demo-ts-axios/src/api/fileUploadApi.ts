import useAxiosApi from '@/utils/useAxiosApi';

export const doFileUpload = async () => {
  const { data } = await useAxiosApi.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
  });

  return data;
};
