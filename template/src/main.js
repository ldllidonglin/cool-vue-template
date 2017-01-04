import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Init from './Components/Init'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.devtools = true
const routes = [
    { path: '/', component: Init }
]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

new Vue({
    el: '#app',
    render: h => h(App),
    router: router
})
window.onerror = function (msg, url, line, columnNo, error) {
    var info = msg + ';' + url + ';' + line
    if (columnNo) {
        info += ';' + columnNo
    }
    if (error) {
        info += ';' + JSON.stringify(error)
    }
    info += ';' + window.navigator.userAgent
    InfoStat(1, info)
}