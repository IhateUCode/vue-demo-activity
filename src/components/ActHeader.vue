<template>
    <div class="act-header">
        <a @click="chooseOne(index)" v-bind:class="{select: a_index === item}" v-for="(item,index) in a_list" v-bind:key="index">{{ item }}</a>
    </div>
</template>

<script>
export default {
    data(){
        return {
            a_list: ['进行中','已结束'],
            a_index:'进行中'
        }
    },
    methods: {
        chooseOne(index){
            this.a_index = this.a_list[index]
            switch(this.a_index){
                case '进行中':
                this.$router.push({path: '/progress'})
                break;
                case '已结束':
                this.$router.push({path: '/cease'})
                break;
            }
        }
    },
    mounted(){
        this.a_index = this.$route.name   //防止网页刷新 导航栏状态 改变
    }
}
</script>

<style scoped>
.act-header {
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
}

.act-header a {
    flex: 1;
    text-align: center;
    display: block;
    line-height: 80px;
    color: #000;
    font-size: 28px;
}

.select {
    color: #ff8b3b !important;
    border-bottom: solid 1px #ff8b3b;
}
</style>
