import { mapMutations } from 'vuex'

export default {
  data: () => ({
    deferredPrompt: null
  }),
  methods: {
    ...mapMutations({
      setPwa: 'app/SET_PWA'
    }),
    promptInstall () {
      if (this.deferredPrompt && 'prompt' in this.deferredPrompt) {
        // Show the prompt:
        this.deferredPrompt.prompt()
        // Wait for the user to respond to the prompt:
        this.deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            this.setPwa(false)
            console.log('User accepted the install prompt')
          } else {
            this.setPwa(false)
            console.log('User dismissed the install prompt')
          }
          this.deferredPrompt = null
        })
      }
    }
  },
  computed: {
  },
  created () {
    window.addEventListener('load', () => {
      if (navigator.standalone) {
        console.log('Launched: Installed (iOS)')
        this.setPwa(false)
      } else if (matchMedia('(display-mode: standalone)').matches) {
        this.setPwa(false)
        console.log('Launched: Installed')
      } else {
        if (this.deferredPrompt) {
          this.setPwa(true)
        } else {
          this.setPwa(false)
        }
        console.log('Launched: Browser Tab')
      }
    })
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
      this.setPwa(true)
      // Update UI notify the user they can install the PWA
      // showInstallPromotion()
    })
  }
}
