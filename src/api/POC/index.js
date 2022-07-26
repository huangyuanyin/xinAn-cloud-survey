import request from "@/utils/request.js";

export function datas(params) {
  return request({
    url: "/datas/datas/",
    method: "get",
    urlType: "POC",
    params,
  });
}

export function xtermApi(params) {
  return request({
    url: "/WEBt/terminals/",
    method: "post",
    urlType: "Xterm",
    params,
  });
}
