export function isVideoCallUrl() {
    var url = window.location.hash
    if (url.includes('users/robots/call')) {
        return true
    }
    return false
}
export function getRobotId() {
    var url = window.location.hash
    if (url.includes('users/robots/call')) {
        var segments = location.href.split('/')
        var currentRobotId = segments[segments.length - 1]
        return currentRobotId
    }
    return ''
}
