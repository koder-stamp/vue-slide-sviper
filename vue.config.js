module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
        `
      }
    }
  },
  pwa: {
    name: 'Ferz Wallet',
    themeColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    msTileColor: '#525D7F',
    iconPaths: {
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      msTileImage: 'img/icons/icons/mstile-144x144.png'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }
}
