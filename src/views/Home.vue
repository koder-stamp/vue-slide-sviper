<template>
  <v-container class="pa-0 dashboard" fill-height fluid>
    <v-layout fill-height="">
      <div class="dashboard-slider overflow-hidden">
        <div class="slider_pagination" ref="sliderPagination" v-show="currentSlide !== 0">
          <ul class="slider_pagination__list">
            <li :class="{active: currentSlide === index-1}" :key="index" v-for="index in slideLength"></li>
          </ul>
        </div>
        <div class="dashboard-slider_wrapper" ref="sliderWrapper" v-hammer:pan="handlerPan"
             v-hammer:swipe.left.right.up.down="onSwipe">
          <div :class="{active: currentSlide === 0}" class="dashboard-slide " ref="slideFear">
            <div class="dashboard-top" ref="cardContainer">
              <div class="d-flex flex-wrap text-center pl-5 pr-5 fill-height align-center justify-center">
                <div class="dashboard-top-content">
                  <div class="headline white--text" ref="firstTitle">Fear & Greed Index</div>
                  <div class="top-hidden" ref="topHidden">
                    <div class="white--text caption">Emotions and sentiments from different sources <br> crunched into
                      one simple number (1-100)
                    </div>
                    <div class="subtitle-1  white--text semibold--text shadow--text">
                      Now: <span :style="{'color': setColor(fearNow.value)}">{{fearNow.fear}}</span>
                    </div>
                    <speedometer :fireNow="currentSlide === 0 ? fearNow.value: '0'" :startSpeed="currentSlide === 0"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-sheet-swiping no-moving" ref="fearBottomSheet">
              <div class="event_element">
                <span class="drag_el"></span>
              </div>
              <div @scroll="onScroll" class="bottom-sheet-swiping-content">
                <!--                <div class="px-5  semibold&#45;&#45;text black&#45;&#45;text">Historical Values</div>-->
                <v-list class="py-0" two-line>
                  <template v-for="(item, index) in fears">
                    <v-list-item :key="item.when" class="px-5 balance-list ">
                      <v-list-item-content>
                        <v-list-item-title class="black--text">{{item.when}}</v-list-item-title>
                        <v-list-item-subtitle :style="{'color': setColor(item.value)}">{{item.fear}}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action-text class="text-right">
                        <v-avatar :color="setColor(item.value)" class="fear-num" size="36">
                          <span class="white--text ">{{item.value}}</span>
                        </v-avatar>
                      </v-list-item-action-text>
                    </v-list-item>
                    <v-divider :key="`divider-${item.when}`" v-if="index !== fears.length - 1"/>
                  </template>
                </v-list>
              </div>
            </div>
          </div>
          <div :class="{active: currentSlide === 1}" class="dashboard-slide slide-home" ref="slideHome">
            <div class="dashboard-top">
              <div class="balance-container white--text" ref="balanceContainer">
                <div class="slide-anim" ref="balanceElement">
                  <v-skeleton-loader :loading="userBalanceRequestWaiting && isFirstRender"
                                     class="skeleton-loader-custom skeleton-loader-custom__white" max-width="100px"
                                     type="text">
                    <div class="small-text spindle--text">Total balance</div>
                  </v-skeleton-loader>
                  <v-skeleton-loader :loading="userBalanceRequestWaiting && isFirstRender"
                                     class="skeleton-loader-custom skeleton-loader-custom__white d-flex align-center"
                                     height="57px" type="heading" width="190px">
                    <div class="large-text balance-text" v-html="totalBalanceHtml"></div>
                  </v-skeleton-loader>
                </div>
                <v-skeleton-loader :loading="userBalanceRequestWaiting && isFirstRender"
                                   class="skeleton-loader-custom skeleton-loader-custom__white" max-width="100px"
                                   type="text">
                  <div class="small-text spindle--text change-opacity" ref="opacityAnimate">{{ totalBTC }}</div>
                </v-skeleton-loader>
              </div>
              <div class="buttons_group" ref="buttonsGroup">
                <v-skeleton-loader :loading="userBalanceRequestWaiting && isFirstRender"
                                   class="skeleton-loader-custom skeleton-loader-custom__white head-menu-button-wrapper white--text font-weight-medium"
                                   type="avatar">
                  <v-btn  color="#010101" fab light>
                    <v-icon color="white">fz-send-to-mobile</v-icon>
                  </v-btn>
                  <span class="label">Send to Mobile</span>
                </v-skeleton-loader>
                <v-skeleton-loader :loading="userBalanceRequestWaiting && isFirstRender"
                                   class="skeleton-loader-custom skeleton-loader-custom__white head-menu-button-wrapper white--text font-weight-medium"
                                   type="avatar">
                  <v-btn color="#010101" fab light>
                    <v-icon color="white">fz-voucher</v-icon>
                  </v-btn>
                  <span class="label">Voucher</span>
                </v-skeleton-loader>
                <v-skeleton-loader :loading="userBalanceRequestWaiting && isFirstRender"
                                   class="skeleton-loader-custom skeleton-loader-custom__white head-menu-button-wrapper white--text font-weight-medium"
                                   type="avatar">
                  <v-btn color="#010101" fab light>
                    <v-icon color="white">fz-escrow</v-icon>
                  </v-btn>
                  <span class="label">Escrow</span>
                </v-skeleton-loader>
              </div>
            </div>
            <div class="bottom-sheet-swiping d-flex flex-column" ref="homeBottomSheet">
              <div class="event_element flex-grow-0">
                <span class="drag_el" ></span>
              </div>
              <div @scroll="onScroll" class="bottom-sheet-swiping-content flex-grow-1">
                <v-tabs-items
                  touchless
                  v-model="currentTab"
                >
                  <v-tab-item :reverse-transition="false" :transition="false"
                              value="home"
                  >
                    <template v-if="userBalanceRequestWaiting && isFirstRender">
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                      <v-divider/>
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                      <v-divider/>
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                    </template>

                    <draggable-list :disabled="isPreAuthenticated" @swipe="onListSwipe" v-else>
                      <template v-for="(wallet, index) in walletsBalance">
                        <wallet-list-item :asset-currency="wallet.code" :balance="trimZeros(wallet.total)"
                                          :balance-converted="formatMoneys(wallet.total_currency)"
                                          :icon="wallet.icon"
                                          :id="wallet.id_currency"
                                          :key="wallet.id_currency"
                                          :progress-value="wallet.h24" :rate="formatMoneys(wallet.rate)"
                                          :title="wallet.name"
                                          @click="exchangeOpen(wallet.id_currency)"></wallet-list-item>
                        <v-divider :key="`divider-${wallet.id_currency}`" v-if="index !== walletsBalance.length - 1"/>
                      </template>
                    </draggable-list>
                  </v-tab-item>
                  <v-tab-item :reverse-transition="false" :transition="false"
                              value="topup"
                  >
                    <div class="pg-42 d-flex align-center justify-center fill-height">Soon</div>
                  </v-tab-item>
                  <v-tab-item :reverse-transition="false" :transition="false"
                              value="activity"
                  >
                    <template v-if="(lastActivityRequestWaiting || userBalanceRequestWaiting) && (isFirstRender || !lastActivity.length)">
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                      <v-divider/>
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                      <v-divider/>
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                      <v-divider/>
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                      <v-divider/>
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                      <v-divider/>
                      <v-skeleton-loader class="skeleton-loader-custom-list" height="64"
                                         type="list-item-avatar-two-line"></v-skeleton-loader>
                    </template>
                    <v-list class="pa-0 " v-else>
                      <template v-for="(item, index) in lastActivity">
                        <v-list-item :key="item.id" class="balance-list" two-line>
                          <v-list-item-avatar class="my-0" height="36px" min-height="36px" min-width="36px" tile
                                              width="36px">
                            <v-icon :color="item.arrow === 'in' ? '#71AC37' : '#F04D6B'">{{item.arrow === 'in' ?
                              'fz-arrow-bold-down' : 'fz-arrow-bold-up'}}
                            </v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="black--text">
                              {{item.arrow === 'in' ? 'Received ' : 'Sent '}}{{item.currency_name}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{item.comment}}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action-text class="text-right">
                            <v-list-item-title class="align-self-end black--text">{{item.arrow === 'in' ? '+ ' : '- '}}
                              {{item.total}} {{item.currency_code}}
                            </v-list-item-title>
                          </v-list-item-action-text>
                        </v-list-item>
                        <v-divider :key="`divider-${item.id}`" v-if="index !== lastActivity.length - 1"/>
                      </template>
                    </v-list>
                    <transition name="fade">
                      <div class="d-flex align-center justify-center pa-6" v-if="lastActivityRequestWaiting">
                        <v-progress-circular
                          color="primary"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </transition>
                  </v-tab-item>
                  <v-tab-item :reverse-transition="false" :transition="false"
                              value="rewards"
                  >
                    <div class="pg-42 d-flex align-center justify-center fill-height">Soon</div>
                  </v-tab-item>
                </v-tabs-items>
              </div>
            </div>
          </div>
          <div :class="{active: currentSlide === 2}" class="dashboard-slide" ref="slideCard">
            <div class="dashboard-top" ref="cardContainer">
              <div class="card_container">
                <div class="card_wrapper" ref="cardElement">
                  <div class="ferz-card">
                    <div class="card-header">
                      <div class="card-logo">
                        <img alt="" class="card-logo-image" src="../assets/images/logo.svg">
                        <div class="card-logo-name">Ferz | <span>paywallet</span></div>
                      </div>
                      <v-icon>fz-nfc</v-icon>
                    </div>
                    <div class="card-center">
                      <div class="card-number">
                        5128 0101 2525 0001
                      </div>
                      <div class="card-date">12/22</div>
                    </div>
                    <div class="card-footer">
                      <img alt="" class="card-payment-logo" src="../assets/images/mastercard-icon.svg">
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom-text">
                Pay online anonymously at any store Anytime. Anywhere.
              </div>
            </div>
            <div class="bottom-sheet-swiping pb-54" ref="cardBottomSheet">
              <div class="event_element">
                <span class="drag_el"></span>
              </div>
              <div @scroll="onScroll" class="bottom-sheet-swiping-content">
                <div class="bottom-sheet-content">
                  <p class="black--text pt-3">
                    *FERZ card is a pseudo-anonymous debit card, without any personal details. Online store wont get any
                    information about you unless you provide it.
                  </p>
                  <em>
                    <span class="font-weight-medium">Please note.</span> FERZ card issuing bank resides outside of OECD
                    jurisdiction and technically can not participate in Automatic Exchange of Information, it is your
                    own responsibility to declare any gains from crypto currencies to your TAX authorities.
                  </em>

                </div>

              </div>
            </div>
            <v-btn block bottom
                   class="text-capitalize white--text fixed-bottom-0"
                   color="orange"
                   fixed
                   tile
                   x-large>Get Early Access
            </v-btn>
          </div>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { formatMoney, SCREEN_ELEMENT } from '@/utils/utils'
import DraggableList from '@/components/DraggableList'
import WalletListItem from '@/components/WalletListItem'
import { formatStringWithNumber } from '@/utils/util'
import { setStyle } from '@/utils/dom'
import Speedometer from '@/components/Speedometer'
import { getColor } from '../utils/speedColor.js'
import getCurrency from '@/helpers/currency-symbol'
import CheckPwaMixin from '@/mixins/CheckPwaMixin'

export default {
  name: 'Home',
  props: {
    currentPage: {
      type: String
    }
  },
  mixins: [CheckPwaMixin],
  components: {
    Speedometer,
    DraggableList,
    WalletListItem
  },
  watch: {
    currentPage (val, oldVal) {
      val !== 'settings' ? this.currentTab = val : this.currentTab = oldVal
    }
  },
  data: () => ({
    isFirstRender: true,
    nextItem: 1,
    currentTab: '',
    currentSlide: 1,
    slideLength: 3,
    currentTransformX: 0,
    currentTransformY: 0,
    MAX_TRANSFORM_X: 0,
    MIN_TRANSFORM_X: 0,
    lastEvent: null,
    MAX_OFFSET_CARD: 12,
    MAX_HOME_BOTTOM_SHEET: 0,
    MAX_PX: 0,
    MAX_PY: 0,
    isMove: false,
    currentCardY: 0,
    fearNow: {},
    fears: [],
    fire: [{ 'when': 'Now', 'fear': 'Extreme Fear', 'value': '14' }, { 'when': 'Yesterday', 'fear': 'Extreme Fear', 'value': '13' }, { 'when': 'Last week', 'fear': 'Extreme Fear', 'value': '9' }],
    fearYesterday: {},
    fearWeek: {},
    fearMonth: {},
    startVerificationNumber: true,
    sms: '',
    offset: 0,
    limit: 15,
    countRowsMax: 0
  }),
  computed: {
    ...mapGetters({
      exchangeModal: 'modals/exchangeModal',
      userProfile: 'user/userProfile',
      balanceTotal: 'user/balanceTotal',
      totalBTC: 'user/totalBTC',
      walletsBalance: 'user/walletsBalance',
      isPreAuthenticated: 'auth/isPreAuthenticated',
      activeCurrency: 'user/activeCurrency',
      userPhone: 'user/userPhone',
      verificationModal: 'modals/verificationModal',
      isAuthenticated: 'auth/isAuthenticated',
      lastActivityRequestWaiting: 'user/lastActivityRequestWaiting',
      userBalanceRequestWaiting: 'user/userBalanceRequestWaiting',
      lastActivity: 'user/lastActivity',
      isPwa: 'app/isPwa'
    }),
    verificationText () {
      return 'Verifying Phone Number'
    },
    currentSlideElement () {
      switch (this.currentSlide) {
        case 0:
          return this.$refs['slideFear']
        case 1:
          return this.$refs['slideHome']
        case 2:
          return this.$refs['slideCard']
        default:
          return this.$refs['slideHome']
      }
    },
    currentBottomSheet () {
      switch (this.currentSlide) {
        case 0:
          return this.$refs['fearBottomSheet']
        case 1:
          return this.$refs['homeBottomSheet']
        case 2:
          return this.$refs['cardBottomSheet']
        default:
          return this.$refs['homeBottomSheet']
      }
    },
    totalBalanceHtml () {
      const balanceValue = formatMoney(this.balanceTotal, 2, '.', ' ').split('.')
      return `${getCurrency(this.userProfile.active_currency || this.activeCurrency).symbol} ${balanceValue[0]}<span>.${balanceValue[1]}</span>`
    },
    activeSlide () {
      return ((window.innerWidth * this.currentSlide) * 100 / window.innerWidth) * -1
    },
    overflowRatio () {
      return this.$refs['sliderWrapper'].scrollWidth / this.$refs['sliderWrapper'].offsetWidth
    },
    itemWidth () {
      return this.$refs['sliderWrapper'].scrollWidth / this.slideLength
    }
  },
  methods: {
    ...mapActions({
      getUserBalance: 'user/getUserBalance',
      getFear: 'app/getFear',
      getStartBalance: 'user/getStartBalance',
      sendingPhoneRequest: 'auth/sendingPhoneRequest',
      sendingSmsCodeRequest: 'auth/sendingSmsCodeRequest',
      getLastActivity: 'user/getLastActivity'
    }),
    ...mapMutations({
      openVerificationModal: 'modals/OPEN_VERIFICATION_MODAL',
      openExchangeModal: 'modals/OPEN_EXCHANGE_MODAL',
      clearLastActivity: 'user/SET_LAST_ACTIVITY_CLEAR'
    }),
    resendSms () {
      const mobile = this.userPhone.replace(/ /g, '')
      this.sendingPhoneRequest(mobile).then(() => {
        const data = {
          isOpen: true
        }
        this.openVerificationModal(data)
      })
    },
    setColor (val) {
      if (!val) return
      let value = +val
      return getColor(value)
    },
    onListSwipe (event) {
      switch (event.type) {
        case 'left':

          break
        case 'right':

          break
        default:
          break
      }
    },
    trimZeros (value) {
      return formatStringWithNumber(value)
    },

    formatMoneys (value) {
      return formatMoney(value)
    },

    onScroll (event) {
      this.infinitiveScroll(event)
      if (event.target.scrollTop === 0) {
        event.target.closest('.bottom-sheet-swiping').classList.remove('bottom-sheet-swiping_open')
      }
      if (event.target.scrollTop > 0) {
        event.target.closest('.bottom-sheet-swiping').querySelector('.event_element').classList.add('bottom-sheet-swiping_scroll')
      } else {
        event.target.closest('.bottom-sheet-swiping').querySelector('.event_element').classList.remove('bottom-sheet-swiping_scroll')
      }
    },

    onSwipe (event) {
      switch (event.type) {
        case 'swipeleft':
          if (this.isPreAuthenticated) return
          if (!event.target.closest('.dashboard-top') || this.currentBottomSheet.classList.contains('open')) return
          if (this.currentSlide < this.slideLength - 1) {
            this.currentSlide += 1
          }
          this.setSlide(true)
          this.cardMove(this.currentSlide === 1 ? this.MAX_OFFSET_CARD * -1 : 0)
          break
        case 'swiperight':
          if (this.isPreAuthenticated) return
          if (!event.target.closest('.dashboard-top') || this.currentBottomSheet.classList.contains('open')) return
          if (this.currentSlide > 0) {
            this.currentSlide -= 1
          }
          this.setSlide(true)
          this.cardMove(this.currentSlide === 1 ? this.MAX_OFFSET_CARD * -1 : 0)
          break
        case 'swipeup':
        case 'swipedown':
          if (event.target.closest('.no-moving-y')) return
          this.toggleBottomSheet(event.type, true)
          break
      }
    },

    handlerPan (event) {
      if (event.additionalEvent && !this.lastEvent) {
        this.lastEvent = event.additionalEvent
      }
      switch (this.lastEvent) {
        case 'panright':
        case 'panleft':
          if (this.isPreAuthenticated) return
          if ((event.target.closest('.dashboard-top') || this.$refs['sliderWrapper'].classList.contains('pan-x')) && (!this.currentBottomSheet.classList.contains('open') && !this.currentBottomSheet.classList.contains('bottom-sheet-swiping_open'))) {
            this.$bus.$emit('disabledDrag', true)
            this.sliderTransform(event)
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
    },

    sliderTransform (event) {
      if (!this.currentBottomSheet.classList.contains('open')) {
        this.$refs['sliderWrapper'].classList.add('pan-x')
      } else {
        this.$refs['sliderWrapper'].classList.remove('pan-x')
      }

      const dragOffsetX = 100 / this.itemWidth * event.deltaX * 0.4 / this.slideLength * this.overflowRatio
      const transformX = Math.min(this.MIN_TRANSFORM_X, Math.max(this.currentTransformX + dragOffsetX, this.MAX_TRANSFORM_X))
      setStyle(this.$refs['sliderWrapper'], {
        transform: `translateX(${transformX}%)`
      })
      const currentCardTransform = Math.min(0, Math.max(((200 + transformX) / 100 * this.MAX_OFFSET_CARD) * -1, this.MAX_OFFSET_CARD * -1))
      this.cardMove(currentCardTransform)
      if (event.isFinal && Math.abs(event.velocityX) < 0.3 && event.distance > 15) {
        if (Math.abs(dragOffsetX) > 45) {
          if (dragOffsetX < 0) {
            if (this.currentSlide < this.slideLength - 1) {
              this.currentSlide += 1
            }
          } else {
            if (this.currentSlide > 0) {
              this.currentSlide -= 1
            }
          }
        }
        this.cardMove(this.currentSlide === 1 ? this.MAX_OFFSET_CARD * -1 : 0)
        this.setSlide(true)
      } else if (event.isFinal) {
        this.setSlide(true)
        this.cardMove(this.currentSlide === 1 ? this.MAX_OFFSET_CARD * -1 : 0)
        this.$refs['sliderWrapper'].classList.remove('pan-x')
      }
    },

    transformY (event) {
      this.$refs['sliderWrapper'].classList.remove('moving')
      const dragOffsetY = 100 / this.currentBottomSheet.clientHeight * event.deltaY
      const transformY = Math.min(0, Math.max(this.currentTransformY + dragOffsetY, this.MAX_HOME_BOTTOM_SHEET))
      let transformCardY = transformY * this.currentBottomSheet.clientHeight / 100
      let opacityChange = 1 - (100 * transformCardY * 2 / (this.MAX_HOME_BOTTOM_SHEET * this.currentBottomSheet.clientHeight / 100) / 100)
      if (this.lastEvent === 'panup' && !this.currentBottomSheet.classList.contains('bottom-sheet-swiping_open') && this.currentBottomSheet.classList.contains('open')) {
        this.currentBottomSheet.querySelector('.bottom-sheet-swiping-content').scrollTop = event.deltaY * -1
        if (event.isFinal) {
          if (this.currentBottomSheet.querySelector('.bottom-sheet-swiping-content').scrollTop > 0) {
            this.currentBottomSheet.classList.add('bottom-sheet-swiping_open')
          }
        }
      }
      if (this.currentSlide === 0) {
        this.cardOpacityChange(opacityChange)
      }
      if (this.currentSlide === 1) {
        this.movingHomeBottomSheet(transformY)
      }
      if (this.currentSlide === 2) {
        this.cardMoveY(transformCardY)
      }

      const paginationStyle = {
        opacity: (1 - ((transformY * 100) * 5 / this.MAX_HOME_BOTTOM_SHEET) / 100),
        scale: (1 - ((transformY * 100) / this.MAX_HOME_BOTTOM_SHEET) / 100),
        translateY: transformY / 2
      }

      this.animationPagination(paginationStyle)

      setStyle(this.currentBottomSheet, {
        transform: `translateY(${transformY}%)`
      })
      if (event.isFinal) {
        this.currentCardY = transformCardY
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

    cardMove (transformX) {
      setStyle(this.$refs['cardElement'], {
        transform: `translateX(${transformX}%)`
      })
    },

    cardMoveY (transformY) {
      setStyle(this.$refs['cardContainer'], {
        transform: `translateY(${transformY}px)`
      })
    },
    cardOpacityChange (opacity) {
      setStyle(this.$refs['topHidden'], {
        opacity: `${opacity}`
      })
    },
    setSlide (doTransition) {
      if (!this.$refs['sliderWrapper']) return
      if (doTransition) {
        this.toggleWrapperClass()
      }
      this.currentTransformX = this.activeSlide
      setStyle(this.$refs['sliderWrapper'], {
        transform: `translateX(${this.activeSlide}%)`
      })
    },

    toggleWrapperClass () {
      if (!this.$refs['sliderWrapper']) return
      this.$refs['sliderWrapper'].classList.add('moving')
      this.$refs['sliderWrapper'].addEventListener('transitionend', (e) => {
        if (e.target === this.$refs['sliderWrapper'] || e.target === this.currentBottomSheet) {
          this.$refs['sliderWrapper'].classList.remove('moving')
        }
      }, false)
    },
    async main () {
      if (!navigator.sms) {
        this.resendSms()
        return
      }
      try {
        let { content } = await navigator.sms.receive()
        alert('sms received! ' + content)
      } catch (e) {
        alert('time out!')
      }
    },
    movingHomeBottomSheet (transformY) {
      this.MAX_PX = (this.MAX_HOME_BOTTOM_SHEET * (27 * 100 / this.$refs['balanceContainer'].clientWidth) / this.MAX_HOME_BOTTOM_SHEET) * -1
      this.MAX_PY = (((this.MAX_HOME_BOTTOM_SHEET * ((this.$refs['balanceElement'].clientHeight - 15) * 100 / this.$refs['balanceContainer'].clientHeight)) / this.MAX_HOME_BOTTOM_SHEET)) * -1
      const TRIGGER_CARD_VERTICAL = this.MAX_HOME_BOTTOM_SHEET / 3
      const currentCardTransform = Math.min(0, this.MAX_OFFSET_CARD * (transformY * 100 / TRIGGER_CARD_VERTICAL) / 100 - this.MAX_OFFSET_CARD)

      const balanceStyle = {
        px: (transformY * (27 * 100 / this.$refs['balanceContainer'].clientWidth) / this.MAX_HOME_BOTTOM_SHEET) * -1,
        py: ((transformY * (this.$refs['balanceElement'].clientHeight - 15) * 100 / this.$refs['balanceContainer'].clientHeight) / this.MAX_HOME_BOTTOM_SHEET) * -1,
        opacity: 1 - ((transformY * 100) * 2 / this.MAX_HOME_BOTTOM_SHEET) / 100,
        scale: 1 - ((transformY * 100) / this.MAX_HOME_BOTTOM_SHEET) / 100
      }
      const buttonsGroupStyle = {
        opacity: (1 - ((transformY * 100) * 2 / this.MAX_HOME_BOTTOM_SHEET) / 100),
        translateY: transformY * 3
      }
      if (this.currentSlide === 1) {
        this.cardMove(currentCardTransform)
        this.animationBalance(balanceStyle)
        this.animationButtons(buttonsGroupStyle)
      }
    },

    toggleBottomSheet (eventType, doTransition) {
      if (doTransition) {
        this.toggleWrapperClass()
      }
      const finalY = eventType === 'swipeup' ? this.MAX_HOME_BOTTOM_SHEET : 0
      const balanceStyle = {
        px: eventType === 'swipeup' ? this.MAX_PX : 0,
        py: eventType === 'swipeup' ? this.MAX_PY : 0,
        opacity: eventType === 'swipeup' ? 0 : 1,
        scale: eventType === 'swipeup' ? 0 : 1
      }
      const paginationStyle = {
        opacity: eventType === 'swipeup' ? 0 : 1,
        scale: eventType === 'swipeup' ? 0 : 1,
        translateY: eventType === 'swipeup' ? this.MAX_HOME_BOTTOM_SHEET * 2 : 0
      }
      const buttonsGroupStyle = {
        opacity: eventType === 'swipeup' ? 0 : 1,
        translateY: eventType === 'swipeup' ? this.MAX_HOME_BOTTOM_SHEET * 3 : 0
      }

      this.animationPagination(paginationStyle)

      switch (eventType) {
        case 'swipeup':
          if (this.currentSlide === 0) {
            this.cardOpacityChange(0)
          }
          if (this.currentSlide === 1) {
            this.cardMove(0)
            this.animationBalance(balanceStyle)
            this.animationButtons(buttonsGroupStyle)
          }
          if (this.currentSlide === 2) {
            this.cardMoveY(this.MAX_HOME_BOTTOM_SHEET * this.currentBottomSheet.clientHeight / 100)
          }
          setStyle(this.currentBottomSheet, {
            transform: `translateY(${finalY}%)`
          })
          this.currentBottomSheet.classList.add('open')
          break
        case 'swipedown':
          if (this.currentSlide === 0) {
            this.cardOpacityChange(1)
          }
          if (this.currentSlide === 1) {
            this.cardMove(this.MAX_OFFSET_CARD * -1)
            this.animationBalance(balanceStyle)
            this.animationButtons(buttonsGroupStyle)
          }
          if (this.currentSlide === 2) {
            this.cardMoveY(0)
          }
          setStyle(this.currentBottomSheet, {
            transform: `translateY(${finalY}%)`
          })
          if (finalY === 0) {
            this.currentBottomSheet.querySelector('.bottom-sheet-swiping-content').scrollTop = 0
          }
          this.currentBottomSheet.classList.remove('open', 'bottom-sheet-swiping_open')
          break
      }
      this.currentTransformY = finalY
    },

    animationBalance ({ px, py, opacity, scale }) {
      setStyle(this.$refs['balanceContainer'], {
        transform: `translate(${px}%, ${py}%)`
      })
      setStyle(this.$refs['opacityAnimate'], {
        opacity,
        transform: `scale(${scale})`
      })
    },

    animationPagination ({ opacity, scale, translateY }) {
      setStyle(this.$refs['sliderPagination'], {
        opacity,
        transform: `scale(${scale}) translate(-50%, ${translateY}%)`
      })
    },

    animationButtons ({ opacity, translateY }) {
      setStyle(this.$refs['buttonsGroup'], {
        opacity,
        transform: ` translate(0, ${translateY}%)`
      })
    },

    loadMore () {
      const data = {
        offset: this.offset,
        limit: this.limit
      }
      if (this.countRowsMax > this.lastActivity.length || this.lastActivity.length === 0) {
        this.getLastActivity(data).then((res) => {
          this.countRowsMax = res.count_rows
          if (res.count_rows >= this.offset) {
            this.offset += this.limit
          }
        })
      }
    },
    infinitiveScroll (event) {
      if ((event.target.clientHeight + event.target.scrollTop >= event.target.scrollHeight) && !this.lastActivityRequestWaiting) {
        this.loadMore()
      }
    }

  },
  created () {
    this.$bus.$on('setSlide', (val) => {
      if (!this.$refs['sliderWrapper']) return
      this.toggleBottomSheet('swipedown', true)
      this.currentSlide = 1
      this.setSlide(true)
      this.cardMove(this.currentSlide === 1 ? this.MAX_OFFSET_CARD * -1 : 0)
      if (val === 'activity') {
        this.loadMore()
      }
    })
  },
  mounted () {
    if (this.currentPage === 'activity') {
      console.log(this.currentPage)
      this.loadMore()
    }
    this.clearLastActivity()
    this.currentTab = this.currentPage
    this.openVerificationModal({ closeVerificationTitle: false })
    this.MAX_TRANSFORM_X = ((window.innerWidth * (this.slideLength - 1)) * 100 / window.innerWidth) * -1
    this.currentTransformX = this.activeSlide
    this.$nextTick(() => {
      this.MAX_HOME_BOTTOM_SHEET = (window.innerHeight * SCREEN_ELEMENT.top / 100 - this.$refs['balanceElement'].clientHeight - 25) * 100 / this.$refs['homeBottomSheet'].clientHeight * -1
    })
    this.MAX_PX = (this.MAX_HOME_BOTTOM_SHEET * (27 * 100 / this.$refs['balanceContainer'].clientWidth) / this.MAX_HOME_BOTTOM_SHEET) * -1
    this.MAX_PY = (((this.MAX_HOME_BOTTOM_SHEET * ((this.$refs['balanceElement'].clientHeight - 15) * 100 / this.$refs['balanceContainer'].clientHeight)) / this.MAX_HOME_BOTTOM_SHEET)) * -1
    // this.$refs.sliderWrapper.style.setProperty('--x', this.activeSlide)
    setStyle(this.$refs['sliderWrapper'], {
      transform: `translateX(${this.activeSlide}%)`
    })
    // --slide-home-sheet-height
    // --pagination-top
    this.$refs['sliderPagination'].style.setProperty('--pagination-top', `${this.$refs['buttonsGroup'].getBoundingClientRect().top - 30}px`)
    document.documentElement.style.setProperty('--slide-home-sheet-height', `${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-min-height-bottom-sheet-without-nav')) - this.$refs['balanceElement'].getBoundingClientRect().height - 24}px`)
    this.getFear().then(result => {
      if (result) {
        this.fears = result.data
        this.fearNow = this.fire
      }
    })
    if (this.isPreAuthenticated) {
      this.getStartBalance().then(() => {
        this.main()
      }).catch(() => {
      })
    } else {
      this.getUserBalance().then(() => {
        this.isFirstRender = false
      }).catch(() => {
      })
    }
  }
}
</script>
