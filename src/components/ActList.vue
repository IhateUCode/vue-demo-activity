<template>
    <div class="big_box">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="2">
            <li class="list_box" v-for="(item,index) in DataArr" v-bind:key="index">
                <img @click="gotoDetail(item.id)" class="pic" v-bind:src="item.product.cover" alt="">
                <div @click="gotoDetail(item.id)" class="product-box">
                    <div class="pro-name">
                        <p class="title">{{ item.product.title }}</p>
                        <p class="info">
                            <i v-if="item.is_trial_product">试用装</i>
                            <i v-else>正装</i>{{ item.spec }} | ¥{{ item.price }} | <span>{{ item.amount }}份</span>
                        </p>
                    </div>
                    <div class="apply-btn">免费申请</div>
                </div>
                <div @click="gotoApplication(item.id)" class="apply-people">
                    <div class="apply-photo">
                        <!-- <img v-for="(item,index) in item.list" v-bind:key="index" v-bind:src="item" alt="">
                        <img src="../../static/56_13.png" alt=""> -->
                    </div>
                    <p class="apply-number">{{ item.try_applys }}人已经申请</p>
                </div>
                <div class="tips-box">
                    <p>距离结束</p>
                    <p>{{ item.try_end_date }}</p>
                </div>
            </li>
            <p class="load" v-if="this.loading" ref="loading">加载中...</p>
        </ul>
        <!-- <p class="init_loading" v-if="init_loading">初始化加载中...</p> -->
    </div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
export default {
    data(){
        return {
            loading: false,
            count: 1,
            DataArr: []
        }
    },
    methods: {
        gotoDetail(id){
            this.$router.push({path: `/detail/${id}`})
        },
        gotoApplication(id){
            this.$router.push({path: `/application/${id}`})
        },
        getData(){
            if(!this.loading){
                this.loading = true
                this.$jsonp('https://tryapi.yoka.com/yokatry/gettrylist',{
                        format: 'jsonp',
                        status: 3,
                        page: this.count,
                        callback: '__jp0'
                }).then(json => {
                　　// 返回数据 json， 返回的数据就是json格式
                    console.log(json.data)
                    if(json.data.length === 0){
                        this.loading = true
                        this.$refs.loading.innerHTML = '已到底部'
                        return 
                    }
                    if(this.DataArr.length === 0){
                        this.loading = false
                        this.DataArr.push(...json.data)
                    }else if(this.DataArr.length > 0){
                        setTimeout(()=>{
                            this.loading = false
                            this.DataArr.push(...json.data)
                        },1500)
                    }
                }).catch(err => {
                　　console.log(err)
                })
            }
        },
        loadNextPage(){
            this.count++
            this.getData()
        },
        loadMore() {
            this.loadNextPage()             
        }
    },
    mounted(){
        this.getData()
    }
}
</script>


<style scoped>
.load {
    text-align: center;
    padding: 10px 0;
    font-size: 20px;
}

.big_box {
    background-color: #f2f7f7;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
}

.list_box {
    margin-bottom: 20px;
    position: relative;
}

.pic {
    border-radius: 5px;
    height: 345px;
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

.product-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    border-bottom: solid 2px #f2f2f2;
    padding: 0 34px;
    background-color: #fff;
}

.pro-name {
    display:flex;
    flex-direction: column;
}

.pro-name .title {
    font-size: 28px;
    color: #000;
    margin-bottom: 5px;
}

.pro-name .info {
    font-size: 24px;
    color: #999999;
}

.pro-name .info span {
    font-size: 24px;
    color: #ff8b3b;
}

.apply-btn {
    width: 130px;
    height: 44px;
    background-color: #ff8b3b;
    border-radius: 20px;
    color: #fff;
    line-height: 44px;
    text-align: center;
    font-size: 20px;
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

.apply-photo img {
    height: 58px;
    margin-right: 8px;
    border-radius: 100%;
}

.apply-number {
    font-size: 22px;
    color: #ff8b3b;
}
</style>
