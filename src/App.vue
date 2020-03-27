<template>
  <transition mode="out-in" name="fade" v-if="renderComponent">
      <router-view/>
  </transition>
</template>

<script>
import AppOnlineMixin from '@/mixins/AppOnlineMixin'
import CheckPwaMixin from '@/mixins/CheckPwaMixin'
import AppResizeMixin from '@/mixins/AppResizeMixin'

export default {
  name: 'App',
  mixins: [AppOnlineMixin, CheckPwaMixin, AppResizeMixin]
}
</script>
