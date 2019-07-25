import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
const axios = require('axios')

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    format: 'json'
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = '/api/getSingerDetail'
  const data = Object.assign({}, {}, {
    g_tk: 5381,
    platform: 'yqq.json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    format: 'json',
    data: '{"comm":{"ct":24,"cv":0},"singer":{"method":"get_singer_detail_info","param":{"sort":5,"singermid":"' + singerId + '","sin":0,"num":10},"module":"music.web_singer_info_svr"}}'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getPurl(songMid) {
  const url = '/api/getPurl'
  const data = Object.assign({}, {}, {
    g_tk: 5381,
    platform: 'yqq.json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    format: 'json',
    data: '{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"2896769150","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"2896769150","songmid":["' + songMid + '"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
