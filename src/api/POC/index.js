import request from '@/utils/request.js'

export function datas() {
    return request({
        url: '/datas/datas/',
        method: 'get',
        urlType: 'POC'
    })
}