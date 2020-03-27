export default {
  data: () => ({
    renderComponent: true,
    isOnline: false
  }),
  methods: {
    forceRerender () {
      this.renderComponent = false
      this.$nextTick(() => {
        this.renderComponent = true
      })
    },
    handlerOnline () {
      this.$notify.closeAll()
      this.$notify({
        message: 'You are online',
        type: 'success',
        showClose: false,
        duration: 2000
      })
      this.isOnline = true
      this.forceRerender()
    },
    handlerOffline () {
      this.$notify.closeAll()
      this.offlineNotification()
      this.isOnline = false
    },
    offlineNotification () {
      this.$notify({
        message: 'You are offline',
        type: 'error',
        showClose: false,
        duration: 0
      })
    }
  },
  created () {
    this.isOnline = navigator.onLine
    window.addEventListener('online', this.handlerOnline)
    window.addEventListener('offline', this.handlerOffline)
    if (!this.isOnline) {
      this.offlineNotification()
    }
  }
}
