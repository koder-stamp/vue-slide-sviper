<template>
  <div class="bottom-sheet-swiping" v-touch:end="onPanEnd" v-touch:moving="onPanMove"
       v-touch:start="onPanStart">
    <div class="bottom-sheet-swiping-content" :class="classes">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'

export default {
  name: 'BottomSheetSwiping',
  props: {
    minTransformY: {
      type: Number,
      default: 0
    },
    maxTransformY: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    initialPoint: null,
    initTransform: 0,
    transformY: 0,
    MIN_TRANSFORM_Y: 0,
    MAX_TRANSFORM_Y: 0
  }),
  watch: {
    maxTransformY (val) {
      this.MAX_TRANSFORM_Y = val
    }
  },
  computed: {
    isActiveBottomSheet () {
      return this.transformY === this.MAX_TRANSFORM_Y
    },
    classes () {
      return [this.isActiveBottomSheet ? 'overflow-y-auto' : 'overflow-y-hidden']
    }
  },
  methods: {
    onPanStart (event) {
      console.log('start')
      this.initTransform = this.transformY
      this.initialPoint = event.changedTouches[0]
    },
    onPanMove (event) {
      console.log('move')
      let delta = event.touches[0].pageY - this.initialPoint.pageY
      console.log(Math.min(this.MIN_TRANSFORM_Y, Math.max(this.initTransform + delta, this.MAX_TRANSFORM_Y)))
      this.transformY = Math.min(this.MIN_TRANSFORM_Y, Math.max(this.initTransform + delta, this.MAX_TRANSFORM_Y))
      TweenLite.to(this.$el, 0.2, { translateY: this.transformY })
    },
    onPanEnd (event) {
      console.log('end')
      let finalPoint = event.changedTouches[0]
      let xAbs = Math.abs(this.initialPoint.pageX - finalPoint.pageX)
      let yAbs = Math.abs(this.initialPoint.pageY - finalPoint.pageY)
      if (xAbs > 15 || yAbs > 15) {
        if (xAbs > yAbs) {
          if (finalPoint.pageX < this.initialPoint.pageX) {
            console.log('СВАЙП ВЛЕВО')
          } else {
            console.log('СВАЙП ВПРАВО')
          }
        } else {
          if (this.transformY - this.initTransform > 0) {
            this.initTransform = this.MIN_TRANSFORM_Y
            this.transformY = this.MIN_TRANSFORM_Y
          } else {
            this.initTransform = this.MAX_TRANSFORM_Y
            this.transformY = this.MAX_TRANSFORM_Y
          }
        }
      }

      TweenLite.to(this.$el, 0.2, { translateY: this.transformY })
    }
  },
  mounted () {
    this.MIN_TRANSFORM_Y = this.minTransformY ? this.minTransformY : 0
    this.MAX_TRANSFORM_Y = this.maxTransformY ? this.maxTransformY : this.$el.getBoundingClientRect().top * -1
    console.log(this.$el.getBoundingClientRect().top * -1)
  }
}
</script>
