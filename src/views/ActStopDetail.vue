<template>
<div style="height:100%;">
    <div class="detail_img_box">
        <img v-bind:src="stopInfoData.cover" alt="">
        <div class="tips-box">
            <p>已结束</p>
        </div>
        <div @click="back" class="back_btn">
            <div class="back_inner_btn">
                <img src="../../static/aaa_03.png" alt="">
            </div>
        </div> 
    </div>  
    <div class="info-box">
        <div class="left-box">
            <p class="title">{{ stopInfoData.title }}</p>
            <p class="info">
                <i v-if="stopInfoData.is_trial_product">试用装</i>
                <i v-else>正装</i>{{ stopInfoData.spec }} | ¥{{ stopInfoData.price }} | <span>{{ stopInfoData.amount }}份</span>    
            </p>
        </div>
        <p class="roll">{{ stopInfoData.applayed.applay_num }}人已申请<img src="../../static/2323_03.png" alt=""></p>
    </div>
    <div @click="gotoReward(stopInfoData.id)" class="apply-people">
        <div class="apply-photo">
            <p class="apply-number">中奖名单</p>
            <img src="../../static/56_03.png" alt="">
        </div>
        <img class="popo" src="../../static/2323_03.png" alt="">
    </div>
    <div class="product-intro">有{{ stopInfoData.try_report.reportsnum }}个试验报告</div>
    <p class="nothing" v-if="stopInfoData.try_report.reportsnum === 0">暂无数据</p>
    <div v-else class="report_box">
        <div v-for="(value,index) in stopInfoData.try_report.userInfo" v-bind:key="index" class="report_content_box">
            <div class="first_row">
                <p class="user_name">{{ value.user_name }}</p>
                <div class="score_box">
                    <img v-for="(num,index) in Number(value.score.substring(0,1))" v-bind:key="index" src="../../static/last_03.png" alt="">
                    <span>{{ value.score }}</span>
                </div>
            </div>
            <div class="second_row" v-bind:class="{judgeStyle: isSpread}">
                {{ value.report_content }}
            </div>
            <div v-bind:class="{toTop: isTop}" class="arrow" v-if="value.report_content.length > 119">
                <img @click="moreContent" src="../../static/arrow_05.png" alt="">
            </div>
            <div class="third_row">
                <img @click="showBigImg(img)" v-for="(img,index) in value.report_img" v-bind:key="index" v-bind:src="img" alt="">
            </div>
        </div>
    </div> 
    <div v-on:click="showImg = false" class="pop" v-if="showImg">
        <img @click.stop="stopMaopao" class="pp_img" v-bind:src="imgSrc" alt="">
    </div>
</div>    
</template>

<script>
export default {
    data(){
        return {
            stopInfoData:null,
            isSpread: true,
            isTop: false,
            scoreGrade: 0,
            imgSrc: '',
            showImg: false
        }
    },
    methods: {
        stopMaopao(){
            console.log('ok')
        },
        back(){
            this.$router.go(-1)
        },
        showBigImg(img){
            this.imgSrc = img;
            this.showImg = true;
            console.log(this.imgSrc)
        },
        gotoReward(id){
            this.$router.push({path: `/reward/${id}`})
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
        getInfoData(){
            this.$jsonp('https://tryapi.yoka.com/trydetail/gettrydetail',{
                format: 'jsonp',
                status: 2,
                try_id: this.$route.params.id,
                callback: '__jp1'                
            }).then(json=>{
                console.log(json)
                this.stopInfoData = json.data
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.getInfoData()
    }
}
</script>


<style scoped>
.pop {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 500;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    display: flex;
}

.pp_img {
    width: 700px !important;
    height: 700px !important;
    margin: auto;
    border-radius: 10px;
}

.toTop {
    transform: rotate(180deg);
    padding-bottom: 0;
    padding-top: 15px;
    transition: rotate .5s ease-in;
}

.arrow {
    padding-top: 15px;
    text-align: center;
    display: flex;
}

.arrow img {
    height: 16px !important;
    width: 28px !important;
    margin: auto;
}

.judgeStyle {
    -webkit-line-clamp: 4; /** 显示的行数 **/
}

.report_box {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
}

.report_content_box {
    padding-left: 50px;
    padding-bottom: 30px;
    padding-top: 30px;
    border-bottom: solid 2px #ccc;
}

.first_row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
}

.user_name {
    font-size: 24px;
    color: #676767;
}

.score_box {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.score_box img {
    width: 16px !important;
    height: 16px !important;
    margin-right: 7px;
}

.score_box span {
    font-size: 18px;
    color: #ff8b3b;
}

.second_row {
    font-size: 26px;
    color: #000;
    line-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 将对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
}

.third_row {
    width: 100%;
    height: 150px;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}

.third_row img {
    width: 150px !important;
    height: 150px !important;
    margin-right: 10px;
}

.third_row img:last-child {
    margin-right: 0;
}

.nothing {
    text-align: center;
    font-size: 24px;
    color: #000;
    margin: 24px 0;
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

.back_btn {
    width: 72px;
    height: 72px;
    padding: 9px;
    background-color: rgba(0, 0, 0, 0.2);
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

.tips-box {
    position: absolute;
    right:0;
    top: 20px;
    width: 156px;
    height: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAAAjCAYAAACD+HiUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEM5NjNBNTg2MkU2MTFFN0IyMkNCQzBDNDM3ODI3NjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEM5NjNBNTk2MkU2MTFFN0IyMkNCQzBDNDM3ODI3NjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Qzk2M0E1NjYyRTYxMUU3QjIyQ0JDMEM0Mzc4Mjc2NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Qzk2M0E1NzYyRTYxMUU3QjIyQ0JDMEM0Mzc4Mjc2NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoD2wMAAAAFLSURBVHja7Ny7SkNRFIThnYsGFG8Eb6CIpAyComCQSAIB25DXDXkA30EELVUIEbFQC52Fp7VzTfV/MEVSDsO5FGfXSilXypmyrrQKkKSpDJVlqkC2hrKl7FMFstWVmfJOFXBc2b6UZ+VEqVEJMscW5tXz2xGVIHts4bEa2ya1IHts38q9cqosUQ0yxxY+lYXSpRpkjy28KNvKDvXgP9X/+H9avaUCqVe28KGsKIdUhOwrW7itXhqA9LG9Kg9UBMfYwh0VwTW2JyqCa2xvVATX2ADb2NaoCK6x7VIRXGPrUBEcY4tb6DEVwTG2C14g4BjbqtKjHjjG1i98QwrD2PaUS6pB9tji95hnNTjGdl34YBmGsR0oAypB9tjirI8Jt084xnajtKkD2WOL2+c5VcAxtlHhjA8Yr2xAuviUL47L2ii/Ry40qQRZfgQYABP5GngVtvqcAAAAAElFTkSuQmCC);
}

.tips-box p {
    font-size: 20px;
    color: #fff;
}

.info-box {
    height: 120px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom: solid 2px #f2f2f2;
}

.left-box .title {
    font-size: 26px;
    color: #000;
    margin-bottom: 5px;
}

.left-box .info {
    font-size: 24px;
    color: #999;
}

.roll {
    font-size: 24px;
    margin-top: 35px;
    color: #ff8b3b;
}

.roll img {
    width: 12px;
    height: 22px;
    margin-top: -4px;
    margin-left: 5px;
}

.apply-people {
    height: 107px;
    padding: 0 34px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.apply-photo {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.apply-photo img {
    width: 58px;
    height: 58px;
    margin-right: 8px;
}

.apply-number {
    font-size: 22px;
    color: #ff8b3b;
    margin-right: 36px;
}

.popo {
    width: 12px !important;
    height: 22px !important;
    margin-top: -4px !important;
    margin-left: 5px !important;
}
</style>
