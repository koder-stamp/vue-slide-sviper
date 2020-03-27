import { deviceRatio } from '@/utils/device'

const DEVICE_RATIO = deviceRatio(window.innerWidth, window.innerHeight)

const SCREEN_HEIGHT = 812
const MAX_FONT_SIZE_REGULAR = 14
const MIN_FONT_SIZE_REGULAR = 10
const MAX_FONT_SIZE_SMALL = 12
const MIN_FONT_SIZE_SMALL = 9
const MAX_PADDING_TOP = 36
const MIN_PADDING_TOP = 26
const MAX_PADDING = 30
const MIN_PADDING = 20
const NAV_HEIGHT = 56

const GET_SCREEN_ELEMENT = () => {
  switch (DEVICE_RATIO) {
    case '19.5:9': {
      return {
        top: 55,
        bottom: 45
      }
    }
    case '18:9': {
      return {
        top: 55,
        bottom: 45
      }
    }
    case '16:9':
      return {
        top: 60,
        bottom: 40
      }
    default:
      return {
        top: 60,
        bottom: 40
      }
  }
}

export const SCREEN_ELEMENT = GET_SCREEN_ELEMENT()

export const getChromeVersion = () => {
  let pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/)
  if (pieces == null || pieces.length !== 5) {
    return undefined
  }
  pieces = pieces.map(piece => parseInt(piece, 10))
  return {
    major: pieces[1],
    minor: pieces[2],
    build: pieces[3],
    patch: pieces[4]
  }
}

export const isAndroid = () => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('android') > -1
}

export const viewPort = () => {
  window.addEventListener('resize', applyViewPort)
  window.addEventListener('orientationchange', () => {
    orientationChanged().then(() => {
      applyViewPort()
    })
  })
  applyViewPort()
}

export function formatMoney (amount, decimalCount = 2, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    let j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log(e)
  }
}

function sizeCoefficient (size, maxSize) {
  return size / maxSize
}

export function getSize (maxFontSize, minFontSize, elementHeight = window.innerHeight, cof) {
  const coff = cof || sizeCoefficient(SCREEN_HEIGHT, maxFontSize)
  const size = elementHeight / coff

  if (size < minFontSize) {
    return minFontSize
  } else if (size > maxFontSize) {
    return maxFontSize
  } else {
    return Math.round(elementHeight / coff)
  }
}

export function applicationElementSize () {
  const doc = document.documentElement
  doc.style.setProperty('--app-font-size-regular', `${getSize(MAX_FONT_SIZE_REGULAR, MIN_FONT_SIZE_REGULAR)}px`)
  doc.style.setProperty('--app-font-size-small', `${getSize(MAX_FONT_SIZE_SMALL, MIN_FONT_SIZE_SMALL)}px`)
  doc.style.setProperty('--app-padding-top', `${getSize(MAX_PADDING_TOP, MIN_PADDING_TOP)}px`)
  doc.style.setProperty('--app-padding', `${getSize(MAX_PADDING, MIN_PADDING)}px`)
  doc.style.setProperty('--app-min-height-bottom-sheet', `${window.innerHeight * SCREEN_ELEMENT.bottom / 100}px`)
  doc.style.setProperty('--app-min-height-bottom-sheet-without-nav', `${window.innerHeight - NAV_HEIGHT}px`)
  doc.style.setProperty('--app-bottom-sheet-height', `${window.innerHeight - NAV_HEIGHT}px`)
  doc.style.setProperty('--app-bottom-sheet-height-max', `${window.innerHeight - NAV_HEIGHT}px`)
  doc.style.setProperty('--top-bottom-sheet', `${(window.innerHeight * SCREEN_ELEMENT.top) / 100}px`)
  doc.style.setProperty('--head-height', `${(window.innerHeight * SCREEN_ELEMENT.top) / 100}px`)
  doc.style.setProperty('--dashboard-btn-fab', `${getSize(52, 48)}px`)
  doc.style.setProperty('--dashboard-btn-icon', `${getSize(22, 18)}px`)
}

function applyViewPort () {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

function orientationChanged () {
  const timeout = 120
  return new Promise(resolve => {
    const go = (i, height) => {
      window.innerHeight !== height || i >= timeout ? resolve() : window.requestAnimationFrame(() => go(i + 1, height))
    }
    go(0, window.innerHeight)
  })
}

// const RATIO_FONT_SIZE = 57
