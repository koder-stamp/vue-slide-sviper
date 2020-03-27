<template>
  <v-list class="pa-0 drag-list" ref="dragList" two-line v-hammer:pan="onPan">
    <slot></slot>
  </v-list>
</template>

<script>
import { TweenMax } from 'gsap'

export default {
  name: 'DraggableList',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    allList: [],
    isAnimate: false,
    currentX: 0,
    currentTransformX: 0,
    lastEvent: null,
    movingElement: null,
    disabledDrag: false
  }),
  methods: {
    /*    handlerPan (event) {
      if (this.disabledDrag) return
      const ALL_LIST = this.$refs['dragList'].$el.querySelectorAll('.list-drag')
      const ITEM_LIST = event.target.closest('.draggable_list')
      const ITEM_LIST_DRAG = ITEM_LIST.querySelector('.list-drag')
      if (!Array.from(ALL_LIST).some(list => list.classList.contains('moving-list'))) {
        ITEM_LIST_DRAG.classList.add('moving-list')
        this.movingElement = ITEM_LIST_DRAG
      }
      if (event.additionalEvent && !this.lastEvent) {
        this.lastEvent = event.additionalEvent
      }
      const dragOffsetX = 100 / window.innerWidth * event.deltaX
      this.isLeft = dragOffsetX < 0
      this.$bus.$emit('movingLeft', this.isLeft)
      const transformX = this.currentX + dragOffsetX
      let finalX = 0
      ITEM_LIST_DRAG.style.setProperty('--list-x', transformX)
      this.$emit('move', transformX)
      const elementId = ITEM_LIST_DRAG.dataset['id'] ? ITEM_LIST_DRAG.dataset['id'] : undefined

      if (event.isFinal && Math.abs(event.velocityX) < 0.3 && event.distance > 15) {
        if (Math.abs(dragOffsetX) > 45) {
          if (dragOffsetX < 0) {
            finalX = -100
            this.setPosition(transformX, finalX, {
              event: 'swipe',
              type: 'left',
              elementId
            })
          } else {
            finalX = 100
            this.setPosition(transformX, finalX, {
              event: 'swipe',
              type: 'right',
              elementId
            })
          }
        } else {
          finalX = 0
          this.setPosition(transformX, finalX)
        }
      } else if (event.isFinal) {
        finalX = 0
        this.setPosition(transformX, finalX)
      }

      // switch (this.lastEvent) {
      //   case 'panright':
      //     console.log('panright')
      //     break
      //   case 'panleft':
      //     console.log('panleft')
      //     break
      // }
    }, */
    setPosition (transformX, finalX, options) {
      this.isAnimate = true
      TweenMax.fromTo(this.movingElement, 0.2, {
        '--list-x': transformX
      }, {
        '--list-x': finalX,
        onComplete: () => {
          this.isAnimate = false
          this.currentX = finalX
          if (options) {
            const { event, type, elementId } = options
            this.$emit(event, {
              type: type,
              elementId
            })
          }
          this.allList.forEach(list => {
            list.classList.remove('moving-list')
            const listX = Math.abs(+list.style.getPropertyValue('--list-x'))
            if (listX > 0) {
              TweenMax.fromTo(list, 0.2, {
                '--list-x': +list.style.getPropertyValue('--list-x')
              }, {
                '--list-x': 0
              })
              // list.style.setProperty('--list-x', 0)
            }
          })
        }
      })
    },
    onPan (event) {
      if (this.disabledDrag) return
      const ITEM_LIST = event.target.closest('.draggable_list')
      const ITEM_LIST_DRAG = ITEM_LIST.querySelector('.list-drag')
      if (!Array.from(this.allList).some(list => list.classList.contains('moving-list'))) {
        ITEM_LIST_DRAG.classList.add('moving-list')
        this.movingElement = ITEM_LIST_DRAG
      }
      if (event.additionalEvent && !this.lastEvent) {
        this.lastEvent = event.additionalEvent
      }
      if ((this.lastEvent === 'panup' || this.lastEvent === 'pandown')) {
        this.lastEvent = null
        return
      }
      const dragOffsetX = 100 / window.innerWidth * event.deltaX
      this.isLeft = dragOffsetX < 0
      this.$bus.$emit('movingLeft', this.isLeft)
      const transformX = this.currentX + dragOffsetX
      let finalX = 0
      ITEM_LIST_DRAG.style.setProperty('--list-x', transformX)
      this.$emit('move', transformX)
      const elementId = ITEM_LIST_DRAG.dataset['id'] ? ITEM_LIST_DRAG.dataset['id'] : undefined
      if (event.eventType === 4 && event.velocityX < -0.2 && event.distance > 15) {
        finalX = -100
        this.setPosition(transformX, finalX, {
          event: 'swipe',
          type: 'left',
          elementId
        })
      } else if (event.eventType === 4 && event.velocityX > 0.2 && event.distance > 15) {
        finalX = 100
        this.setPosition(transformX, finalX, {
          event: 'swipe',
          type: 'right',
          elementId
        })
      } else {
        if (event.isFinal) {
          if (Math.abs(dragOffsetX) > 45) {
            if (dragOffsetX < 0) {
              finalX = -100
              this.setPosition(transformX, finalX, {
                event: 'swipe',
                type: 'left',
                elementId
              })
            } else {
              finalX = 100
              this.setPosition(transformX, finalX, {
                event: 'swipe',
                type: 'right',
                elementId
              })
            }
          } else {
            finalX = 0
            this.setPosition(transformX, finalX)
          }
        }
      }
      if (event.isFinal) {
        this.movingElement = this.lastEvent = null
        // this.allList.forEach(list => {
        //   list.classList.remove('moving-list')
        //   const listX = Math.abs(+list.style.getPropertyValue('--list-x'))
        //   if (listX > 0) {
        //     TweenMax.fromTo(list, 0.2, {
        //       '--list-x': +list.style.getPropertyValue('--list-x')
        //     }, {
        //       '--list-x': 0
        //     })
        //     // list.style.setProperty('--list-x', 0)
        //   }
        // })
        this.$emit('end', finalX)
      }
    }
  },
  mounted () {
    this.disabledDrag = this.disabled
    this.$bus.$on('disabledDrag', event => {
      this.disabledDrag = event
    })
    this.allList = this.$refs['dragList'].$el.querySelectorAll('.list-drag')
  }
}
</script>

<style scoped>

</style>
