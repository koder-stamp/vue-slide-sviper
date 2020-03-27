/* eslint-disable no-undef */

self.addEventListener('message', (e) => {
  if (!e.data) {
    return
  }
  switch (e.data) {
    case 'skipWaiting':
      self.skipWaiting()
      break
    default:
      // NOOP
      break
  }
})

if (workbox) {
  console.log(`%c Workbox is loaded `, 'background: #ddd; color: #0000ff')
  workbox.core.setCacheNameDetails({
    prefix: 'd4',
    precache: 'precache',
    runtime: 'runtime'
  })

  workbox.clientsClaim()

  self.__precacheManifest = [].concat(self.__precacheManifest || [])
  workbox.precaching.suppressWarnings()
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
  /*
   * API Cached
   * */
  workbox.routing.registerRoute(
    new RegExp('https://api.2charge.net'),
    workbox.strategies.networkFirst()
  )

  workbox.routing.registerNavigationRoute('index.html')
} else {
  console.log('Workbox didn\'t load')
}
