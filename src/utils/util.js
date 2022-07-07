// 过滤对象中属性为空的值
export function filterData(Data) {
  let params = {};
  for (const item in Data) {
    if (Data[item]) {
      params[item] = Data[item];
    }
  }
  return params;
}
