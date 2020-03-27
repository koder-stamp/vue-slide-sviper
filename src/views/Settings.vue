<template>
  <v-container class="pa-0 dashboard" fill-height fluid>
    <v-layout fill-height="">
      <div class="dashboard-slider overflow-hidden">
        <div class="dashboard-slider_wrapper_single"   ref="sliderWrapper" v-hammer:pan="handlerPan"
             v-hammer:swipe.up.down="onSwipe">
          <div   class="dashboard-slide slide-home" ref="slideHome">
            <div class="d-flex justify-space-between align-center pa-5 status-hidden" ref="statusHidden">
            <div class="orange--text text-uppercase semibold--text">Status: Legend</div>
            <div class="white--text" >FID: {{userProfile.phone}}</div>
          </div>
            <div class="dashboard-top" ref="cardContainer">
              <div class="d-flex flex-wrap text-center pl-5 pr-5 fill-height align-center justify-center">
                <div>
                  <div class="headline white--text text-uppercase headline_single" ref="balanceContainer">User STATUS </div>
                  <div class="text-center">
                    <div  class="pulse pulse_check">
                      <div class="pulse-inside">
                        <div class="pulse-inside-text text-uppercase">Legend</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom-text text--small">Your unique FERZ identifier
                <div>{{userProfile.phone}}</div>
              </div>
            </div>
            <div class="bottom-sheet-swiping d-flex flex-column pb-54" ref="settingsBottomSheet">
              <div class="event_element flex-grow-0">
                <span class="drag_el"></span>
              </div>
              <div @scroll="onScroll" class="bottom-sheet-swiping-content flex-grow-1">
                <div class="pg-42">
                  <ValidationProvider mode="lazy" name="email" ref="email" rules="email" v-slot="{ errors }">
                  <v-text-field @focus="$bus.$emit('APP_RESIZE', false)" @blur="$bus.$emit('APP_RESIZE', false)"
                                height="40"
                                :error-messages="errors"
                                placeholder="Email"
                                v-model="updatedProfile.email"
                                />
                  </ValidationProvider>
                  <div class="text-end">
                    <v-btn :ripple="false" text class="btn-link" @click="sendEmail" :disabled="!validateEmail ||  updatedProfile.email.length === 0" v-text="'Validate Email'" />
                  </div>
                  <div class=" list-settings">
                    <v-list-item two-line class="list-item-switch">
                      <v-list-item-content>
                        <v-list-item-title>Pay commissions with $Token </v-list-item-title>
                        <v-list-item-title>token (50% discount)</v-list-item-title>

                      </v-list-item-content>
                      <v-switch
                        inset
                        color="#fff"
                      ></v-switch>
                    </v-list-item>
                    <v-list-item  class="list-item-switch">
                      <v-list-item-content>
                        <v-list-item-title>Daily Backups</v-list-item-title>
                      </v-list-item-content>
                      <v-switch
                        inset
                        color="#fff"
                      ></v-switch>
                    </v-list-item>
                    <div class="title-list">
                      General Settings
                    </div>
                    <v-list-item>
                      <v-icon left>fz-alert</v-icon>
                      <v-list-item-content>
                        <v-list-item-title>Notifications</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-subtitle >Not available</v-list-item-subtitle>
                      </v-list-item-action>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <v-list-item>
                      <v-icon left>fz-wallet</v-icon>
                      <v-list-item-content>
                        <v-list-item-title>My Wallets</v-list-item-title>
                      </v-list-item-content>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <v-list-item
                      @click.prevent="onClickShare"
                    >
                      <v-icon left>mdi-share-variant</v-icon>
                      <v-list-item-content>
                        <v-list-item-title>Referral</v-list-item-title>
                      </v-list-item-content>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <div class="title-list">
                      Language and Region
                    </div>
                    <v-list-item >
                      <v-list-item-content>
                        <v-list-item-title>Language</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-subtitle >English</v-list-item-subtitle>
                      </v-list-item-action>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Your Country</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-subtitle >USA</v-list-item-subtitle>
                      </v-list-item-action>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Currency</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-subtitle >USD</v-list-item-subtitle>
                      </v-list-item-action>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <div class="title-list">
                      Other
                    </div>
                    <v-list-item >
                      <v-list-item-content>
                        <v-list-item-title>About</v-list-item-title>
                      </v-list-item-content>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Support</v-list-item-title>
                      </v-list-item-content>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <v-list-item @click="logout">
                      <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                      </v-list-item-content>
                      <v-icon right>fz-menu-up</v-icon>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Close My Account</v-list-item-title>
                      </v-list-item-content>
                      <v-switch  inset
                                 color="#fff"></v-switch>
                    </v-list-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-btn block bottom
             class="text-capitalize white--text fixed-bottom-56"
             color="orange"
             fixed
             tile
             x-large>Increase Limits (KYC)
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import { setStyle } from '@/utils/dom'
import { SCREEN_ELEMENT } from '@/utils/utils'
import { mapGetters, mapActions } from 'vuex'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'Settings',
  data: () => ({
    lastEvent: null,
    currentTransformY: 0,
    MAX_HOME_BOTTOM_SHEET: 0,
    errorMessage: '',
    email: '',
    disableButton: true,
    updatedProfile: {
      email: ''
    }
  }),
  computed: {
    ...mapGetters({
      userProfile: 'user/userProfile'
    }),
    validateEmail () {
      return this.userProfile.verify_mail || this.updatedProfile.email !== this.userProfile.email
    },
    currentBottomSheet () {
      return this.$refs['settingsBottomSheet']
    }
  },
  components: {
    ValidationProvider
  },
  methods: {
    ...mapActions({
      checkEmail: 'user/checkEmail',
      logout: 'auth/logout'
    }),
    onClickShare (event) {
      const data = {
        title: 'Ferz Wallet',
        text: 'https://app.2charge.net/',
        url: 'https://app.2charge.net/'
      }
      if (navigator.share) {
        navigator.share(data)
      } else {
        this.$store.commit('app/SET_SNACKBAR_MESSAGE', 'Share option is not supported')
      }
    },
    cardMoveY (transformY, opacity, revert) {
      setStyle(this.$refs['cardContainer'], {
        transform: `translateY(${transformY}px)`,
        opacity: `${opacity}`
      })
      setStyle(this.$refs['statusHidden'], {
        transform: `translateY(${revert}px)`,
        opacity: `${Math.min(1, (1 - opacity))}`
      })
    },
    sendEmail () {
      this.$refs['email'].validate().then(result => {
        if (result.valid) {
          this.disableButton = false
          this.checkEmail(this.updatedProfile.email).finally(() => {
            this.disableButton = true
          })
        }
      })
    },
    onScroll (event) {
      if (event.target.scrollTop === 0) {
        event.target.closest('.bottom-sheet-swiping').classList.remove('bottom-sheet-swiping_open')
      }
      if (event.target.scrollTop > 0) {
        event.target.closest('.bottom-sheet-swiping').querySelector('.event_element').classList.add('bottom-sheet-swiping_scroll')
      } else {
        event.target.closest('.bottom-sheet-swiping').querySelector('.event_element').classList.remove('bottom-sheet-swiping_scroll')
      }
    },
    onSwipe ({ type, target }) {
      switch (type) {
        case 'swipeup':
        case 'swipedown':
          if (target.closest('.no-moving-y')) return
          this.toggleBottomSheet(type, true)
          break
      }
    },
    toggleWrapperClass () {
      this.$refs['sliderWrapper'].classList.add('moving')
      this.$refs['sliderWrapper'].addEventListener('transitionend', (e) => {
        if (e.target === this.$refs['sliderWrapper'] || e.target === this.currentBottomSheet) {
          this.$refs['sliderWrapper'].classList.remove('moving')
        }
      }, false)
    },
    toggleBottomSheet (eventType, doTransition) {
      if (doTransition) {
        this.toggleWrapperClass()
      }
      const finalY = eventType === 'swipeup' ? this.MAX_HOME_BOTTOM_SHEET : 0
      switch (eventType) {
        case 'swipeup':
          setStyle(this.currentBottomSheet, {
            transform: `translateY(${finalY}%)`
          })
          this.cardMoveY(this.MAX_HOME_BOTTOM_SHEET * this.currentBottomSheet.clientHeight / 100, 0, 0)
          this.currentBottomSheet.classList.add('open')
          break
        case 'swipedown':
          setStyle(this.currentBottomSheet, {
            transform: `translateY(${finalY}%)`
          })
          this.cardMoveY(0, 1, this.$refs['statusHidden'].clientHeight * -1)
          if (finalY === 0) {
            this.currentBottomSheet.querySelector('.bottom-sheet-swiping-content').scrollTop = 0
          }
          this.currentBottomSheet.classList.remove('open', 'bottom-sheet-swiping_open')
          break
      }
      this.currentTransformY = finalY
    },
    transformY (event) {
      this.$refs['sliderWrapper'].classList.remove('moving')
      const dragOffsetY = 100 / this.currentBottomSheet.clientHeight * event.deltaY
      const transformY = Math.min(0, Math.max(this.currentTransformY + dragOffsetY, this.MAX_HOME_BOTTOM_SHEET))
      let transformCardY = transformY * this.currentBottomSheet.clientHeight / 100
      let opacityChange = 1 - (100 * transformCardY * 2 / (this.MAX_HOME_BOTTOM_SHEET * this.currentBottomSheet.clientHeight / 100) / 100)
      let transformYRevert = Math.min(0, this.$refs['statusHidden'].clientHeight * opacityChange * -1)
      if (this.lastEvent === 'panup' && !this.currentBottomSheet.classList.contains('bottom-sheet-swiping_open') && this.currentBottomSheet.classList.contains('open')) {
        this.currentBottomSheet.querySelector('.bottom-sheet-swiping-content').scrollTop = event.deltaY * -1
        if (event.isFinal) {
          if (this.currentBottomSheet.querySelector('.bottom-sheet-swiping-content').scrollTop > 0) {
            this.currentBottomSheet.classList.add('bottom-sheet-swiping_open')
          }
        }
      }
      this.cardMoveY(transformCardY, opacityChange, transformYRevert)
      setStyle(this.currentBottomSheet, {
        transform: `translateY(${transformY}%)`
      })
      if (event.isFinal) {
        let type = 'swipeup'
        if (Math.abs(dragOffsetY) > 10) {
          this.currentTransformY = transformY
          if (event.deltaY < 0) {
            type = 'swipeup'
          } else {
            type = 'swipedown'
          }
          this.toggleBottomSheet(type, true)
        } else {
          if (event.deltaY > 0) {
            type = 'swipeup'
          } else {
            type = 'swipedown'
          }
          this.toggleBottomSheet(type, true)
        }
      }
    },
    handlerPan (event) {
      event.preventDefault()
      if (event.additionalEvent && !this.lastEvent) {
        this.lastEvent = event.additionalEvent
      }
      switch (this.lastEvent) {
        case 'panright':
        case 'panleft':
          if ((event.target.closest('.dashboard-top') || this.$refs['sliderWrapper'].classList.contains('pan-x')) && (!this.currentBottomSheet.classList.contains('open') && !this.currentBottomSheet.classList.contains('bottom-sheet-swiping_open'))) {
            this.$bus.$emit('disabledDrag', true)
          }
          break
        case 'panup':
        case 'pandown':
          if (event.target.closest('.no-moving-y')) return
          this.$bus.$emit('disabledDrag', true)
          this.transformY(event)
          break
      }

      if (event.isFinal) {
        this.lastEvent = null
        this.$bus.$emit('disabledDrag', false)
      }
    }
  },
  mounted () {
    // this.updatedProfile.email = this.userProfile.email
    this.updatedProfile = Object.assign(this.updatedProfile, this.userProfile)
    this.$nextTick(() => {
      // this.MAX_HOME_BOTTOM_SHEET = (window.innerHeight * SCREEN_ELEMENT.top / 100 - this.$refs['balanceContainer'].clientHeight - 25) * 100 / this.$refs['homeBottomSheet'].clientHeight * -1
      this.MAX_HOME_BOTTOM_SHEET = (window.innerHeight * SCREEN_ELEMENT.top / 100 - this.$refs['statusHidden'].clientHeight) * 100 / this.currentBottomSheet.clientHeight * -1
    })
    // document.documentElement.style.setProperty('--slide-home-sheet-height', `${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-min-height-bottom-sheet-without-nav')) - this.$refs['balanceContainer'].getBoundingClientRect().height - 24}px`)
    document.documentElement.style.setProperty('--slide-home-sheet-height', `${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-min-height-bottom-sheet-without-nav')) - this.$refs['balanceContainer'].getBoundingClientRect().height - 24}px`)
  }
}
</script>

<style lang="scss">
  .v-btn--absolute.v-btn--bottom.fixed-bottom-56, .v-btn--fixed.v-btn--bottom.fixed-bottom-56{
    bottom: 56px;
  }
  .status-hidden{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    transform: translateY(-100%);
    opacity: 0;
  }
  .bottom-sheet-swiping-content{
    .v-text-field{
      padding: 0;
      font-size: 0.75rem;
      .v-input__slot{
        margin-bottom: 0;
      }
      .v-text-field__details{
        padding-top: 4px;
        margin-bottom: -4px;
      }
    }
  }
  .title-list{
    font-size: 0.875rem;
    font-weight: 600;
    color: #000000;
    line-height: 2.9375rem;
    padding: 1.4rem 0 0.5rem;
    text-transform: uppercase;
  }
  .list-settings{
    .v-input--selection-controls{
      margin-top: 7px;
      margin-bottom: -10px;
    }
    .v-list-item--two-line {
      min-height: 50px;
    }
    .v-input--is-label-active .v-input--switch__track{
      background: #525D7F;
      opacity: 1;
    }
    .v-list-item{
      padding: 0;
      border-bottom: 1px solid #E5E5E5;
      min-height: 3.125rem;
      &.list-item-switch{
        border: 0;
      }
      .v-icon--right{
        font-size: 0.7rem;
        transform: rotate(90deg);
        margin-right: 0.8rem;
      }
      .v-list-item__title{
        font-size: .75rem;
      }
      .v-list-item__subtitle{
        font-size: 0.625rem;
      }
    }
  }
  .pg-42{
    padding-left: 2.625rem;
    padding-right: 2.625rem;
  }
  .dashboard-slider_wrapper_single {
    height: 100%;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    backface-visibility: hidden;
    will-change: transform;
  }
  .pulse_check {
    border: 0;
    .pulse-inside {
      background: #F2994A;
      &-text{
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        border-radius: 50%;
        object-fit: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        font-weight: 600;
      }
    }
  }
</style>
