import { SiteService } from '@/services/site.service'

export const getSiteSettings = async ({ commit }) => {
  commit('SITE_SETTINGS_LOADING', true)
  try {
    const { data: siteSettings } = await SiteService.siteSettings()
    commit('SET_SITE_SETTINGS', siteSettings)
    commit('SITE_SETTINGS_LOADING', false)
    return siteSettings
  } catch (error) {
    throw error
  } finally {
    commit('SITE_SETTINGS_LOADING', false)
  }
}

export const getUserIP = async ({ commit }) => {
  try {
    const { ip } = await SiteService.getUserIP()
    commit('SET_USER_IP', ip)
    return ip
  } catch (e) {

  }
}

export const getNotificationPermission = async ({ commit }) => {
  try {
    const permission = await SiteService.checkUserNotificationPermission()
    commit('SET_NOTIFICATION_PERMISSION', permission)
    return permission
  } catch (error) {
    commit('SET_NOTIFICATION_PERMISSION', 'off')
    throw error
  }
}

export const getFear = async () => {
  try {
    return await SiteService.getSpeed()
  } catch (error) {
    throw error
  }
}
