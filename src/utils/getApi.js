import { datas } from "@/api/POC/index.js";

// 根据任务ID 调取接口
export const getDataApi = async (id) => {
  let tableData = [];
  const params = {
    resultid: id,
  };
  const res = await datas(params);
  if (res.code == 1000) {
    tableData = res.data;
  }
  return tableData;
};
