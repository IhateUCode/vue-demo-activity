<template>
    <div>
        <actHeader></actHeader>
        <router-view/>
    </div>
</template>

<script>
import actHeader from '../components/ActHeader'
export default {
    data(){
        return {

        }
    },
    components: {
        actHeader
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
