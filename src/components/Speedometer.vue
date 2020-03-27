<template>
  <v-layout justify-center>
    <div class="speed-wrap">
      <div class="speed-wrap-arrow" ref="speedArrow"></div>
      <div class="speed-wrap-count" ref="fireCount">
        <ICountUp
          :delay="delay"
          :endVal="fireCount"
          :options="options"
        />
      </div>
      <!--      <div class="speed-wrap-count" >-->
      <!--        <span>34</span>-->
      <!--      </div>-->
      <div class="speed-label white--text">Volatility (25 %), Market Momentum/Volume (25%), Social Media (15%), Surveys (15%), Dominance (10%), Trends (10%)</div>
    </div>
  </v-layout>
</template>

<script>
import { setStyle } from '@/utils/dom'
import { getColor } from '../utils/speedColor.js'
import ICountUp from 'vue-countup-v2'

export default {
  name: 'Speedometer',
  components: {
    ICountUp
  },
  props: {
    startSpeed: {
      type: Boolean,
      default: false
    },
    fireNow: {
      type: String,
      default: '0'
    }
  },
  data: () => ({
    timerId: null,
    fireCount: 0,
    delay: 0,
    options: {
      useEasing: false,
      duration: 0.4
    }
  }),
  watch: {
    startSpeed (val) {
      if (val) {
        this.fireRotated()
        this.fireCount = 100
        this.timerId = setTimeout(() => {
          this.fireCount = +this.fireNow
        }, 500)
      } else {
        clearTimeout(this.timerId)
        this.fireRotated('start')
      }
    },
    fireNow () {
      this.initSpeed()
    }
  },
  methods: {
    setColor () {
      setStyle(this.$refs.fireCount, {
        backgroundColor: getColor(this.fireNow)
      })
    },
    setRotate (rotate) {
      // setStyle(this.$refs['speedArrow'], {
      //   transform: `rotate(${rotate}deg)`
      // })
      document.documentElement.style.setProperty('--rotateSpeed', rotate + 'deg')
      this.$refs.speedArrow.classList.add('animated')
    },
    fireRotated (val) {
      let num = Number(this.fireNow)
      if (val === 'start') {
        this.setRotate(-150)
        this.$refs.speedArrow.classList.remove('animated')
      } else {
        let rotate = -150 + num * 2.4
        this.setRotate(rotate)
      }
    },
    initSpeed () {
      this.setColor()
    }
  },
  mounted () {
    this.initSpeed()
  }
}
</script>

<style lang="scss">

  .speed-label{
    position: absolute;
    width: 11rem;
    font-size: 0.625rem;
    text-align: left;
    top: 8.125rem;
    left: 4.5rem;
  }
  .speed-wrap {
    width: 12.6875rem;
    height: 12.6875rem;
    background: url("../assets/images/speedometer.svg") top center no-repeat;
    margin-left: 1.25rem;
    position: relative;
    .speed-wrap-count {
      width: 2rem;
      height: 2rem;
      background: #F37D44;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1.3rem;
      margin-top: -1.1rem;
      font-size: 1.1rem;
      transition: all 2s;
      line-height: 1.1;
    }

    /*&-count{
      width: 2.125rem;
      height: 2.125rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transform-origin: 0 8.5rem;
      transform: rotate(-10deg);
      margin: 0 auto;
      border-radius: 50%;
      background: #ff0000;
      position: absolute;
      left: 6.3rem;
      top: -2.3rem;
      span{
        transform: rotate(10deg);
      }
    }*/
    &-arrow {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 1.8125rem;
      height: 1.8125rem;
      /*background: #F37D44;*/
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      border-radius: 50%;
      margin-left: -1.3rem;
      margin-top: -1.1rem;
      transition: transform .4s;
      transform: rotate(var(--rotateSpeed));
      &.animated{
        animation: rotateAnimation 1s;
      }
      &:before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0.5rem 4.2rem 0.5rem;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        bottom: 50%;
      }
    }
  }
</style>
