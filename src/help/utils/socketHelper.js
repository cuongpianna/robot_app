export function initSocket(callBackFunc) {
    var webSocketURI = settings.downloadMediaSocketURI
    var socket = new WebSocket(webSocketURI)

    socket.onopen = function () {
        console.log('Connected.')
    }

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log('Disconnected.')
        } else {
            console.log('Connection lost.') // for example if server processes is killed
        }
        console.log('Code: ' + event.code + '. Reason: ' + event.reason)
    }

    socket.onmessage = function (event) {
        var message = event.data
        console.log('Data received: ' + message)
        if (message.includes('DownloadMedia_')) {
            var signals = message.split('_')
            var robotID = signals.length >= 2 ? signals[1] : ''
            var mediaId = signals.length >= 3 ? signals[2] : ''

            var segments = location.href.split('/')
            var currentRobotId = segments[segments.length - 1]
            if (currentRobotId == robotID) {
                var mediaIds = []
                mediaIds.push(mediaId)
                var data = { RobotId: currentRobotId, MediaIds: mediaIds }
                RobotMediaService.export(data).then(res => {
                    if (res.isSuccess) {
                        var exportDatas = res.records
                        if (exportDatas != null) {
                            exportDatas.forEach(element => {
                                dowloadFile(element)
                            })
                        }
                    }
                })
            }
        }
    }

    socket.onerror = function (error) {
        console.log('Error: ' + error.message)
    }
    return socket
}