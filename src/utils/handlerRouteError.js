export const getRouteBuildError = message => {
  const errorMessage = message
  if (!errorMessage) return false
  if (typeof errorMessage === 'string' && errorMessage.includes('Could not find point')) {
    return {
      type: 'Not found point',
      point: +errorMessage.split(':')[0].slice(-1)
    }
  } else {
    return 'Unknown error'
  }
}
