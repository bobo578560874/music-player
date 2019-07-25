import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false, // 是否正在播放
  fullScreen: false, // 是否全屏播放
  playlist: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 在config.js里面定义的播放顺序模式
  currentIndex: -1, // 当前播放的歌曲
  disc: {}, // 歌单对象
  topList: {}, // 排行榜歌曲列表
  searchHistory: loadSearch(), // 搜索历史
  playHistory: loadPlay(), // 播放历史
  favoriteList: loadFavorite() // 喜爱列表
}

export default state
