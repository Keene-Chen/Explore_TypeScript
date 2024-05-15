import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath, URL } from 'url';

const obj = {
  a: '1',
  c: 2,
  b: true,
  f: 6,
  d: 4,
  e: {
    i: 5,
    g: '2',
    h: 3,
    j: [
      {
        k: 7,
        l: 8,
      },
      {
        n: 10,
        m: 9,
      },
    ],
  },
};

const sortObjectKeys = (obj: Record<string, any>): Record<string, any> => {
  // 帮助函数：判断一个值是否为对象
  const isObject = (value: any): boolean => value && typeof value === 'object' && !Array.isArray(value);

  // 帮助函数：判断一个值是否为数组
  const isArray = (value: any): boolean => Array.isArray(value);

  // 排序并处理对象
  const sortedObj = Object.fromEntries(
    Object.entries(obj)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // 按键的字母顺序排序
      .map(([key, value]) => {
        if (isObject(value)) {
          // 如果值是对象，递归调用 sortObjectKeys
          return [key, sortObjectKeys(value)];
        } else if (isArray(value)) {
          // 如果值是数组，递归处理数组中的每个元素
          return [key, value.map((item: any) => (isObject(item) ? sortObjectKeys(item) : item))];
        } else {
          // 如果值不是对象或数组，直接返回值
          return [key, value];
        }
      })
  );

  return sortedObj;
};

console.dir(sortObjectKeys(obj), { depth: null });

async function sortAndWriteJSON(fileURL: URL) {
  try {
    const jsonData = await readFile(fileURLToPath(fileURL), 'utf8');
    const sortedObject = sortObjectKeys(JSON.parse(jsonData));
    const sortedJSONData = JSON.stringify(sortedObject);

    await writeFile(fileURLToPath(fileURL), sortedJSONData, 'utf8');

    console.log('JSON file written successfully');
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  const fileURL = new URL('../data/test1.json', import.meta.url);
  await sortAndWriteJSON(fileURL);
})();
