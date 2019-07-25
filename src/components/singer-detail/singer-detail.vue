<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail, getPurl} from 'api/singer'
import {createSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.singer.data.songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      for (let i in list) {
        let songlist = list[i]
        // console.log(songlist)
        if (songlist.id && songlist.album.mid) {
          getPurl(songlist.mid).then((res) => {
            const songVkey = res.req_0.data.midurlinfo[0].purl
            // console.log(songVkey)
            ret.push(createSong(songlist, songVkey))
          })
        }
      }
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
