<template>
<div>
    <div class="detail_img_box">
        <img v-bind:src="infoData.cover" alt="">
        <div class="tips-box">
            <p>距离结束</p>
            <p>{{ infoData.try_span_time }}</p>
        </div>
        <div @click="back" class="back_btn">
            <div class="back_inner_btn">
                <img src="../../static/aaa_03.png" alt="">
            </div>
        </div> 
    </div>   
    <div class="detail_info">
        <p class="title">{{ infoData.title }}</p>
        <p class="info">
            <i v-if="infoData.is_trial_product">试用装</i>
            <i v-else>正装</i>{{ infoData.spec }} | ¥{{ infoData.price }} | <span>{{ infoData.amount }}份</span>    
        </p>        
    </div> 
    <div @click="gotoCommentInfo(infoData.id)" class="detail_info_2">
        <div class="apply-photo">
            <img v-for="(item,index) in infoData.applayed.list" v-bind:key="index" v-bind:src="item" alt="">
            <img src="../../static/56_13.png" alt="">
        </div>
        <p class="apply-number">{{ infoData.applayed.applay_num }}人已经申请</p>  
    </div> 
    <div class="product-intro">产品介绍</div>
    <div v-bind:class="{judgeStyle: isSpread}" class="product-intro-content" ref="mybox">
        {{ infoData.product.description }}
    </div>
    <div v-bind:class="{toTop: isTop}" class="arrow" v-if="showIt">
        <img @click="moreContent" src="../../static/arrow_05.png" alt="">
    </div>
    <div class="product-intro">产品介绍</div>
    <div class="product-intro-content">
        {{ infoData.product.try_rule[0] }}
    </div>
</div>    
</template>

<script>
export default {
    data(){
        return {
            showIt: false,
            isSpread: true,
            isTop: false,
            infoData: null
        }
    },
    methods: {
        spreadWord(){
            var wordLehgth = this.infoData.product.description.length
            if(wordLehgth >= 119){
               this.showIt = true
            }
        },
        moreContent(){
            if(this.isSpread){
                this.isSpread = false
                this.isTop = true                
            }else {
                this.isSpread = true
                this.isTop = false               
            }
        },
        back(){
            this.$router.go(-1)
        },
        gotoCommentInfo(id){
            this.$router.push({path: `/application/${id}`})
        },
        getListInfo(){
            this.$jsonp('https://tryapi.yoka.com/trydetail/gettrydetail',{
                format: 'jsonp',
                status: 1,
                try_id: this.$route.params.id,
                callback: '__jp2'
            }).then(json=>{
                console.log(json)
                this.infoData = json.data
                this.spreadWord()
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.getListInfo()
    }
}
</script>


<style scoped>
.back_btn {
    width: 72px;
    height: 72px;
    padding: 9px;
    background-color: #bfbfbf;
    border-radius: 100%;
    position: absolute;
    left: 20px;
    top: 20px;
}

.back_inner_btn {
    width: 54px !important;
    height: 54px !important;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
}

.back_inner_btn img {
    width: 17px !important;
    height: 30px !important;
    margin: auto;
}

.detail_img_box {
    height: 375px;
    position: relative;
}

.detail_img_box img {
    height: 375px;
    width: 100%;
}

.detail_info {
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    padding-top: 20px;
}

.detail_info_2 {
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;  
    padding-bottom: 28px;
    align-items: center;
    justify-content: space-between;  
}

.detail_info .title {
    font-size: 28px;
    color: #000;
    margin-bottom: 5px;
}

.detail_info .info {
    font-size: 24px;
    color: #999999;
}

.detail_info .info span {
    font-size: 24px;
    color: #ff8b3b;
}

.apply-photo img {
    height: 58px;
    margin-right: 8px;
}

.apply-number {
    font-size: 22px;
    color: #ff8b3b;
}

.product-intro {
    height: 77px;
    background-color: #fff;
    border-bottom: solid 2px #f2f2f2;
    line-height: 57px;
    padding-left: 30px;
    font-size: 28px;
    color: #000;
    border-top: solid 20px #f2f7f7;
}

.product-intro-content {
    padding: 20px 30px 0px 30px;
    font-size: 24px;
    color: #999999;
    line-height: 38px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 将对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
}

.judgeStyle {
    -webkit-line-clamp: 4; /** 显示的行数 **/
}

.arrow {
    padding-bottom: 15px;
    text-align: center;
    display: flex;
}

.arrow img {
    height: 16px;
    margin: auto;
}

.toTop {
    transform: rotate(180deg);
    padding-bottom: 0;
    padding-top: 15px;
    transition: rotate .5s ease-in;
}

.tips-box {
    position: absolute;
    right:0;
    top: 20px;
    width: 156px;
    height: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAABNCAYAAACxBha+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEZGNERBMUM2MkUyMTFFN0IyMkNCQzBDNDM3ODI3NjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEZGNERBMUQ2MkUyMTFFN0IyMkNCQzBDNDM3ODI3NjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RkY0REExQTYyRTIxMUU3QjIyQ0JDMEM0Mzc4Mjc2NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4RkY0REExQjYyRTIxMUU3QjIyQ0JDMEM0Mzc4Mjc2NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pjvp0qsAAAH/SURBVHja7N3dSlRRGIfxNY4jlKkFhdKnCoZ2JR11+YlpFpTQQSgkRfal76LxEtb/YPg98DJz/PCwNmvPmr0nrbW1mtc1uzV3GjCI5Zo3NXtUYDRLNds0IBUbEIvtggakYjujAanYTmhAKrb3Nf+oQCK2nzWfqMBopvPPWc1LOjB6Zeu8dSlFKrbvNR/oQOIyevt9nxKMXtk6hzV/KUEitr4rdc8NkctoZ1LzihaMXtk6RzV/aEEitl81p7QgEdvt6gZEYntXc00NErFdNseOEIqtc0wNUrHZJCAW29l8ZwoMj62fAPlMDxKxdRyoRCw2O1LEYvtCD1Kxfav5QRESsXW+UoRUbP4tj1hs5xQhFdslRUjFZoMAsWHxYvP7KGKxOUSJWGy/KUIqthlFSMU2pQip2FYoQiq2uxQhFdsqRUjFdo8ipGK7TxFSsT2gCKnYHlGERGwbzSshEYptkx6kYntCD1KxPaYHidj6s3Wf0oNEbJs2B0jFtkMNxIaFim0mNqRi22lO6CIU2x4tSMXmJbeIxNZveWzQgkRs3jeKWGwHlCARWz8ouUUJErFZ1SA2LFZsa80pD4Ri67vQCR1IxQYMj2255gUVSMT2fB4cMDw2x4kQi+0ZDUjF9pAGpGLzDDbEYruiAanYjmlAgv6A5o/t/0P/1pv/HmAgNwIMAIh/MY4FnPsoAAAAAElFTkSuQmCC);
}

.tips-box p {
    font-size: 20px;
    color: #fff;
}
</style>
