<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {createSong} from 'common/js/song'
import {getPurl} from 'api/singer'

const ZERO = 0

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        console.log(res)
        if (res.code === ZERO) {
          const list = res.cdlist[0].songlist
          this.songs = this._normalize(list)
          // console.log(this.songs)
        }
      })
    },
    _normalize(list) {
      console.log(list)
      let ret = []
      list.forEach((musicData) => {
        if (musicData.id && musicData.album.id) {
          getPurl(musicData.mid).then((res) => {
            const songVKey = res.req_0.data.midurlinfo[0].purl
            ret.push(createSong(musicData, songVKey))
          })
        }
        // console.log(ret)
      })
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
