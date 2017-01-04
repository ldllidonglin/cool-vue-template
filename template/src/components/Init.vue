<template>
    <div class="container">
        <div class="cover-wrapper" v-if="loading">
            <div class="load-container loading">
                <div class="loader active"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* loading */
.load-container.loading {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%) translateZ(0);
    transform: translate(-50%, -50%) translateZ(0);
}

.load-container {
    display: inline-block;
    width: 50px;
    height: 50px;
}

.load-container .loader {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #9a9a9a;
    background: -webkit-linear-gradient(left, #9a9a9a 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #9a9a9a 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    
}
.load-container .loader.active {
    -webkit-animation: loading 1.4s infinite linear;
    animation: loading 1.4s infinite linear;
}

.load-container .loader:before {
    width: 50%;
    height: 50%;
    background: #9a9a9a;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
}
.load-container .loader:after {
    background: #fff;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
@-webkit-keyframes loading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes loading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

</style>
<script>
import { InfoStat } from './InfoStat'
export default {
    name: 'Init',
    data () {
        return {
            loading: true
        }
    },
    mounted () {

    }
}
</script>