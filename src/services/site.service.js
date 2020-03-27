const SiteService = {
  getSpeed: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{ 'when': 'Now', 'fear': 'Extreme Fear', 'value': '14' }, { 'when': 'Yesterday', 'fear': 'Extreme Fear', 'value': '13' }, { 'when': 'Last week', 'fear': 'Extreme Fear', 'value': '9' }])
    }, 1000)
  })
}

export { SiteService }
