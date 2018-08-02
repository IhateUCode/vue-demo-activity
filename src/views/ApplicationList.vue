<template>
<div>
    <div class="application-header">
        <div @click="back" class="back_btn">
            <img src="../../static/back_04.png" alt="">    
        </div>  
        <p>申请名单</p>
    </div>   
    <div v-for="(item,index) in commentData" v-bind:key="index" class="application-info-box">
        <img class="customer-photo" v-bind:src="item.avatar" alt="">
        <div class="customer-info-box">
            <p class="name">{{ item.name }}</p>
            <p class="comment">{{ item.apply_content }}</p>
        </div>
    </div>
</div>    
</template>

<script>
export default {
    data(){
        return {
            count: 1,
            commentData: []
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        getCommentData(){
            this.$jsonp('http://tryapi.yoka.com/yokatry/getuserlist',{
                format: 'jsonp',
                page: this.count,
                type:3,
                try_id: this.$route.params.id,
                callback: '__jp4'
            }).then(json=>{
                console.log(json)
                this.commentData.push(...json.data)
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.getCommentData()
    }
}
</script>


<style scoped>
.application-header {
    height: 98px;
    border-bottom: solid 2px #f2f2f2;
    display: flex;
    flex-direction: row;
    padding: 0 20px;
    align-items: center;
    text-align: center;
}

.application-header p {
    font-size: 30px;
    color: #000;
    font-weight: bold;
    align-self: center;
    text-align: center;
    margin-left: 225px;
}

.back_btn {
    width: 72px;
    height: 72px;
    padding: 9px;
    background-color: #bfbfbf;
    border-radius: 100%;
}

.back_btn img {
    width: 54px !important;
    height: 54px !important;
    border-radius: 100%;
}

.application-info-box {
    display: flex;
    flex-direction: row;
    padding-top: 25px;
    padding-left: 30px;
    padding-right: 30px;
}

.customer-photo {
    width: 90px !important;
    height: 90px !important;
    margin-right: 15px;
}

.customer-info-box .name {
    font-size: 24px;
    color: #717171;
    margin-bottom: 15px;
}

.customer-info-box .comment {
    font-size: 26px;
    color: #000;
    line-height: 42px;
}

.customer-info-box {
    border-bottom: solid 2px #f2f2f2;
    padding-bottom: 20px;
}
</style>
