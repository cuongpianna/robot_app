// translate router.meta.title, be used in breadcrumb sidebar tags view
export function generateTitle(title) {
    const hasKey = this.$te('route.' + title)
  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)
    return translatedTitle
  }
  return title
}

export function generateTitleView(title, view = '') {
    const hasKey = this.$te(view + '.' + title)
    if (hasKey) {
        // $t :this method from vue-i18n, inject in @/lang/index.js
        const translatedTitle = this.$t(view + '.' + title)
        return translatedTitle
    }
    return title
}
