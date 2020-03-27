<template>
  <v-app>
    <v-content>
      <router-view :currentPage="activeBtn"/>
    </v-content>
    <v-slide-y-reverse-transition>
      <v-bottom-navigation
        active-class="active_navigation"
        app
        color="primary"
        grow
        v-if="hasNavigation"
        v-model="activeBtn"
      >
        <v-btn @click="setPage('home')" small value="home" exact to='/' >
          <span>Home</span>
          <v-icon class="hidden-icon" >fz-home</v-icon>
          <v-icon class="show-icon">fz-home-outline</v-icon>
        </v-btn>
        <v-btn @click="setPage('topup')" small value="topup" exact to="/?page=topup">
          <span>Top Up</span>
          <v-icon class="hidden-icon" >fz-topup</v-icon>
          <v-icon class="show-icon">fz-topup-outline</v-icon>
        </v-btn>
        <v-btn @click="setPage('activity')" exact to="/?page=activity" small value="activity">
          <span>Activity</span>
          <v-icon class="hidden-icon" >fz-poll-box</v-icon>
          <v-icon class="show-icon">fz-poll-box-outline</v-icon>
        </v-btn>
        <v-btn @click="setPage('rewards')"  exact to="/?page=rewards"   small value="rewards">
          <span>Rewards</span>
          <v-icon class="hidden-icon" >fz-star</v-icon>
          <v-icon class="show-icon">fz-star-outline</v-icon>
        </v-btn>
        <v-btn   small value="settings"  to='/settings' >
          <span>Settings</span>
          <v-icon class="hidden-icon" >fz-settings</v-icon>
          <v-icon class="show-icon">fz-settings-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-slide-y-reverse-transition>
  </v-app>
</template>

<script>

export default {
  name: `LayoutDefault`,
  data () {
    return {
      activeBtn: 'home'
    }
  },
  watch: {
    '$route' (val) {
      if (!val.query.page) {
        this.activeBtn = 'home'
      }
    }
  },
  computed: {
    hasNavigation () {
      return this.$route.meta.hasNavigation
    }
  },
  methods: {
    setPage (page) {
      this.$bus.$emit('setSlide', page)
    }
  },
  created () {
    if (this.$route.query.page) {
      this.activeBtn = this.$route.query.page
    } else {
      this.activeBtn = 'home'
    }
  }
}
</script>
<style lang="scss">
  @import "../assets/scss/variables";
  .snackbar-under-nav {
    bottom: 80px;
  }

  .v-snack {
    &__content {
      justify-content: space-between;
      .v-icon {
        &:before {
          font-size: 18px !important;
          color: $red;
        }
      }
    }
  }
  .v-bottom-navigation{
    .v-btn{
      .hidden-icon{
        display: none;
      }
    }
    .v-btn--active.v-btn{
        .hidden-icon{
          display: block;
        }
      .show-icon{
        display: none;
      }
      }
  }
</style>
