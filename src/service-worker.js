/* eslint-disable no-undef */

self.addEventListener('message', (e) => {
  if (!e.data) {
    return
  }

  if (e.data === 'skipWaiting') {
    self.skipWaiting()
  } else {
  }
})

if (workbox) {
  workbox.core.clientsClaim()

  workbox.core.setCacheNameDetails({
    prefix: 'fz',
    precache: 'static',
    runtime: 'runtime'
  })

  self.__precacheManifest = [].concat(self.__precacheManifest || [])

  workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

  workbox.routing.registerRoute(
    new RegExp('https://api.2charge.net'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'fz-runtime'
    })
  )

  workbox.routing.registerNavigationRoute('/index.html')
} else {
  console.log('Workbox didn\'t load')
}
