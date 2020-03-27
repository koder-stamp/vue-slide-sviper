const ratiosArray = ['19.5:9', '18:9', '16:9', '16:10', '3:2', '4:3', '1:1', '4:3', '3:2', '16:10', '16:9', '18:9', '19.5:9']
const ratioFloatsArray = [2.16, 2, 1.77, 1.6, 1.5, 1.33, 1, 0.75, 0.66, 0.625, 0.56, 0.5, 0.46]

function closest (num, arr) {
  let curr = arr[0]
  let diff = Math.abs(num - curr)
  for (let val = 0; val < arr.length; val++) {
    let newdiff = Math.abs(num - arr[val])
    if (newdiff < diff) {
      diff = newdiff
      curr = arr[val]
    }
  }
  return curr
}

export const deviceRatio = (width, height) => {
  const currentRatioFloat = width / height
  const matchedRatioFloat = parseFloat(closest(currentRatioFloat, ratioFloatsArray))
  return ratiosArray[ratioFloatsArray.indexOf(matchedRatioFloat)]
}
