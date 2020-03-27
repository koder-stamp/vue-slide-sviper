import { applicationElementSize } from '@/utils/utils'

export default {
  data: () => ({
    isResize: true,
    isOrientationChange: false
  }),
  methods: {
    onResize () {
      if (!this.isResize || this.isOrientationChange) return
      applicationElementSize()
      this.isOrientationChange = false
    },
    onOrientationChange () {
      this.isOrientationChange = true
    },
    onAppResize (resizeStatus) {
      this.isResize = resizeStatus
    },
    viewPort () {
      this.$bus.$on('APP_RESIZE', this.onAppResize)
      window.addEventListener('resize', this.onResize)
      window.addEventListener('orientationchange', this.onOrientationChange)
      applicationElementSize()
    }
  },
  created () {
    this.viewPort()
  },
  beforeDestroy () {
    this.$bus.$off('APP_RESIZE', this.onAppResize)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('orientationchange', this.onOrientationChange)
  }
}
