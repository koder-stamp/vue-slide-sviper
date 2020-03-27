<template>
  <div>
<!--    <input v-model="inputValue" @blur="onBlur" @focus="onFocus" @input="onInput" @change="onChange" v-currency="currencyOption" ref="currencyInput" />-->
    <input type="text" v-model="inputValue" @focus="onFocus" @input="formatValue" @blur="onBlur" inputmode="decimal" class="input_hidden" ref="currencyInput">
    <div class="custom_input" @click="focusInput">
     <slot>{{inputValue}}</slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'numberMaskedInput',
  props: {
    value: {
      default: ''
    },
    precision: {
      type: Number,
      default: 2
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    inputValue: ''
  }),
  computed: {
    numberValue () {
      return this.$parseCurrency(this.inputValue, this.currencyOption)
    }
  },
  methods: {
    formatNumber (n) {
      return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')
    },
    formatValue (blur) {
      if (this.inputValue === '') {
        this.inputValue = '0'
      }

      if (this.inputValue.indexOf('.') >= 0 || this.inputValue.indexOf(',') >= 0) {
        let decimalPos = this.inputValue.indexOf('.') >= 0 ? this.inputValue.indexOf('.') : this.inputValue.indexOf(',') >= 0 ? this.inputValue.indexOf(',') : 0

        let leftSide = this.inputValue.substring(0, decimalPos)
        let rightSide = this.inputValue.substring(decimalPos)

        // add commas to left side of number
        leftSide = this.formatNumber(leftSide)

        // validate right side
        rightSide = this.formatNumber(rightSide)
        // Limit decimal to only 2 digits

        if (!leftSide && decimalPos === 0) {
          leftSide = 0
        }
        rightSide = rightSide.substring(0, this.precision)
        this.inputValue = leftSide + '.' + rightSide
      } else {
        this.inputValue = this.formatNumber(this.inputValue.length > 1 && this.inputValue.indexOf('0') === 0 ? this.inputValue.substring(1) : this.inputValue) ? this.formatNumber(this.inputValue.length > 1 && this.inputValue.indexOf('0') === 0 ? this.inputValue.substring(1) : this.inputValue) : '0'
      }
      if (+this.inputValue > this.max) {
        this.$emit('input', this.inputValue)
        this.inputValue = `${this.max}`
      }
      this.$emit('input', this.inputValue)
    },
    clearDecimalPos () {
      if (this.inputValue.indexOf('.') >= 0 || this.inputValue.indexOf(',') >= 0) {
        let decimalPos = this.inputValue.indexOf('.') >= 0 ? this.inputValue.indexOf('.') : this.inputValue.indexOf(',') >= 0 ? this.inputValue.indexOf(',') : 0
        let leftSide = this.inputValue.substring(0, decimalPos)
        let rightSide = this.inputValue.substring(decimalPos)
        if (rightSide.length === 1) {
          rightSide = ''
          this.inputValue = leftSide
        }
        if (+this.inputValue === 0) {
          this.inputValue = '0'
        }
      }
    },
    focusInput () {
      this.$refs['currencyInput'].focus()
    },
    onInput () {
      this.$emit('input', this.inputValue)
    },
    onChange () {
      this.$emit('change', this.inputValue)
    },
    onBlur (event) {
      this.$emit('blur', event)
      this.clearDecimalPos()
      this.$emit('input', this.inputValue)
    },
    onFocus (event) {
      this.$emit('focus', event)
      this.$refs['currencyInput'].selectionStart = this.$refs['currencyInput'].selectionEnd = 100
    },
    setValue (value) {
      this.inputValue = `${value}`
    }
  },
  mounted () {
    this.inputValue = this.value
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/_variables.scss";
.input_hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0)
}

  .custom_input{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 500;
    font-size: 30px;
    color: $grey-1;
  }
</style>
