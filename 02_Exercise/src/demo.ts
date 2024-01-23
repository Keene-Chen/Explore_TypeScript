import axios from 'axios';

const ghapi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: 'Bearer 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',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
  },
});

const { data } = await ghapi.get('/user/starred', {
  params: {
    sort: 'created',
    per_page: 1,
    page: 1,
  },
});

const { id, full_name, created_at, updated_at, pushed_at, git_url, language, stargazers_count } =
  data[0];

console.log(id, full_name, created_at, updated_at, pushed_at, git_url, language, stargazers_count);
