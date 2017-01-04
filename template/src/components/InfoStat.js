export function InfoStat (type, info) {
    var img = new Image()
    img.onload = img.onerror = function () {
        img = null
    }
    var url
    if (type === 1) {
        url = '/api/err?err=' + encodeURIComponent(info)
    } else if (type === 2) {
        url = '/api/time?time=' + info
    }
    //img.src = url
}
