<template>
    <div class="doc" id="doc">
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view class="main-router-view" v-bind:style="{ height:mainRVHeight+'px' }"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
<script>
import { InfoStat } from './components/InfoStat'
export default {
    name: 'app',
    mounted () {
        this.docHeight = document.querySelector('.doc').getBoundingClientRect().height
        // hack bug of the init-height not real height
        var ua = window.navigator.userAgent
        var isMobile = ua.match(/(Android|iPhone|iPad)/)
        if (isMobile && this.docHeight > 1000) {
            var createStyle = function (cssText) {
                var document = window.document
                var styleTag = document.createElement('style')
                styleTag.setAttribute('type', 'text/css')
                styleTag.innerHTML = cssText
                document.getElementsByTagName('head').item(0).appendChild(styleTag)
            }
            var width = window.innerWidth
            var height = window.innerHeight
            createStyle('html { font-size: ' + width * 75 / 750 + 'px; font-family: "Helvetica"; }')
            createStyle('.doc { width: ' + width + 'px; height: ' + height + 'px; }')
        }
        if (this.$el.querySelector('header')) {
            this.headerHeight = document.querySelector('header').getBoundingClientRect().height
        }
        this.mainRVHeight = this.docHeight - this.headerHeight - 2
        // 首屏时间统计
        var perf = (window.performance ? window.performance : window.webkitPerformance)
        if (perf && perf.now) {
            InfoStat(2, perf.now())
        } else {
            InfoStat(2, 1000.00)
        }
    }
}
</script>