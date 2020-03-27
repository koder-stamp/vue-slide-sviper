const gradient = [
  [
    0,
    [240, 77, 107]
  ],
  [
    25,
    [240, 80, 103]
  ],
  [
    50,
    [242, 125, 67]
  ],
  [
    75,
    [182, 168, 44]
  ],
  [
    100,
    [113, 172, 55]
  ]
]
export function getColor (persent) {
  let colorRange = []
  for (let i = 0; i < gradient.length; i++) {
    if (persent <= gradient[i][0]) {
      if ((i - 1) < 0) {
        colorRange = [1, i]
      } else {
        colorRange = [i - 1, i]
      }
      break
    }
  }
  let firstColor = gradient[colorRange[0]][1]
  let secondColor = gradient[colorRange[1]][1]
  let firstColorX = (gradient[colorRange[0]][0] / 100)
  let secondColorX = (gradient[colorRange[1]][0] / 100) - firstColorX
  let sliderX = (persent / 100) - firstColorX
  let ratio = sliderX / secondColorX
  let result = pickHex(secondColor, firstColor, ratio)
  return `rgb(${result.join()})`
  // this.$refs.fireCount.style.setProperty('background-color', `rgb(${result.join()})`)
}

function pickHex (color1, color2, weight) {
  const p = weight
  const w = p * 2 - 1
  const w1 = (w / 1 + 1) / 2
  const w2 = 1 - w1
  let rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)]
  return rgb
}
