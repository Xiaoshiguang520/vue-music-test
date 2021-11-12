var app=new Vue({
    el:'#app',
    data:{
        xuanzhongid:'',
        name:'未知',
        // 查询关键字
        query: "",
        // 歌曲数组
        musicList: [],
        // 歌曲地址
        musicUrl: "",
        // 歌曲封面
        musicCover: "img/1.jpg",
        // 歌曲评论
        hotComments: [],
        // 动画播放状态
        isPlaying: false,
        // 遮罩层的显示状态
        isShow: false,
        // mv地址
        mvUrl: ""
    },
    methods:{
        gets:function(){
            var that=this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
                function(response) {
                    that.musicList = response.data.result.songs;
                    //console.log(response.data.result);
                },
                function(err) {}
            );
        },
        bofang:function(id,name,auto){
            this.xuanzhongid=id;
            //歌曲链接
            var that=this;
            this.name=name+'--'+auto;
            this.musicUrl="https://music.163.com/song/media/outer/url?id="+id+".mp3";
            //歌曲封面
            axios.get("https://v2.alapi.cn/api/music/detail?token=&id=" + id).then(
                function(response) {
                    //console.log(response.data.data.songs[0].al.picUrl);
                    that.musicCover=response.data.data.songs[0].al.picUrl;
                },
                function(err) {}
            );
            // 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + id).then(
                function(response) {
                    console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments;
                },
                function(err) {}
            );
        }
    }
});