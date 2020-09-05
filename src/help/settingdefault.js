import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Smart Agency'

class SettingDefaul {
    getPageTitle(pageTitle) {
        if (pageTitle) {
            return `${pageTitle} - ${title}`
        }
        return `${title}`
    }
}
export default new SettingDefaul()