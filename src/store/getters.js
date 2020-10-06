const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    size: state => state.app.size,
    language: state => state.app.language,
    token: state => state.auth.token,
    avatar: state => state.auth.avatar,
    name: state => state.auth.name,
    email: state => state.auth.email,
    roles: state => state.auth.roles,
    permission_routes: state => state.permission.routes,
    cachedViews: state => state.tagsView.cachedViews,
    visitedViews: state => state.tagsView.visitedViews,
    showSettings: state => state.showSettings,
    userType: state => state.auth.userType,
    //agency
    userId: state => state.auth.id,
    bgImages: state => state.file.listImages || [],
    appTitle: state => state.app.appTitle
}
export default getters
