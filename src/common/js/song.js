import {getLyric} from 'api/song'
import {Base64} from 'js-base64'
// import axios from 'axios'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === 0) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong(songlist, songKey) {
  return new Song({
    id: songlist.id,
    mid: songlist.mid,
    singer: filterSinger(songlist.singer),
    name: songlist.name,
    album: songlist.album.name,
    duration: songlist.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songlist.album.mid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/${songKey}`
  })
}

export function createSongSearch(songlist) {
  return new Song({
    id: songlist.songid,
    mid: songlist.songmid,
    singer: filterSinger(songlist.singer),
    name: songlist.songname,
    album: songlist.albumname,
    duration: songlist.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songlist.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((song) => {
    ret.push(song.name)
  })
  return ret.join('/')
}

// function getPurl(songMid) {
//   const url = '/api/getPurl'
//   const data = Object.assign({}, {}, {
//     g_tk: 5381,
//     platform: 'yqq.json',
//     inCharset: 'utf-8',
//     outCharset: 'utf-8',
//     notice: 0,
//     loginUin: 0,
//     hostUin: 0,
//     needNewCode: 0,
//     format: 'json',
//     data: '{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"2896769150","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"2896769150","songmid":["' + songMid + '"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}'
//   })
//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }
//
// export function abc(songlist) {
//   getPurl(songlist.songmid).then((res) => {
//     const songVKey = res.req_0.data.midurlinfo[0].purl
//     return `http://dl.stream.qqmusic.qq.com/${songVKey}`
//   })
// }
