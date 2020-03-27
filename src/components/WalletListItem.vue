<template>
  <div class="draggable_list">
    <template v-if="!withoutPseudo">
      <v-list-item class="px-5 balance-list pseudo pseudo-receive white--text" v-if="isLeft">
        <span>Receive</span>
      </v-list-item>
      <v-list-item class="px-5 balance-list pseudo pseudo-send white--text" v-else>
        <span>Send</span>
      </v-list-item>
    </template>

    <v-list-item :data-id="id" @click="onClick" :ripple="false" class="px-5 balance-list list-drag" ref="dragList">
      <v-list-item-avatar class="my-0" height="36px" min-height="36px" min-width="36px" tile width="36px">
        <img src="https://api.2charge.net/upload/btc.svg">
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="black--text" v-text="title"></v-list-item-title>
        <v-list-item-subtitle>{{profileCurrency}}{{rate}} <span :class="progressStyle" class="ml-2"
                                                                v-if="Boolean(+progressValue)">{{progressValue.charAt(0) === '-' ? progressValue : `+${progressValue}`}}%</span>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action-text class="text-right">
        <v-list-item-title class="align-self-end black--text">{{balance}} {{assetCurrency}}</v-list-item-title>
        <v-list-item-subtitle class="align-self-end">{{profileCurrency}}{{balanceConverted}}</v-list-item-subtitle>
      </v-list-item-action-text>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'WalletListItem',
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    withoutPseudo: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Name'
    },
    icon: {
      type: String,
      default: '../assets/images/logo.svg'
    },
    balance: {
      type: String,
      default: '0'
    },
    progressValue: {
      type: String,
      default: '0'
    },
    assetCurrency: {
      type: String,
      default: '$'
    },
    profileCurrency: {
      type: String,
      default: '$'
    },
    rate: {
      type: String
    },
    balanceConverted: {
      type: String
    }
  },
  data: () => ({
    isLeft: false,
    currentX: 0,
    lastEvent: null
  }),
  computed: {
    progressStyle () {
      return this.progressValue.charAt(0) === '-' ? 'red--text' : 'light-green--text'
    }
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  },
  mounted () {
    this.$bus.$on('movingLeft', event => {
      this.isLeft = event
    })
  }
}
</script>

<style scoped>

</style>
