export const SET_SITE_SETTINGS = (state, payload) => {
  state.applicationSettings = payload
}

export const SITE_SETTINGS_LOADING = (state, payload) => {
  state.applicationSettingsLoading = payload
}

export const SET_NOTIFICATION_PERMISSION = (state, payload) => {
  state.notificationPermission = payload
}

export const SET_USER_IP = (state, ip) => {
  state.userIP = ip
}

export const SET_SNACKBAR_MESSAGE = (state, message) => {
  state.snackbarMessage = message
}

export const SET_PWA = (state, res) => {
  state.isPwa = res
}
