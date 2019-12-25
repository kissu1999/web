var settingButton = document.getElementById('settingButton');









settingButton.onclick = function() {
	if(main_roll.style.top == "-765px"){
            animate(main_roll,{top: 0});
            ksBtn.disabled = true;
    }else{
    	animate(main_roll,{top:-765});
    	ksBtn.disabled = false;
    }
    
};



var tl,jg,sc,djs_span,df_div,ksBtn,ztBtn,tzBtn;
var dz_div,ld_div;
var imgs;
var djs_id,jg_id,tl_id,play_id;
var isStart = false;//判断是否开始，游戏开始为true，游戏暂停为false
var isZT = false;//是否为暂停
var djs_data;//倒计时的时间
var jxGame_sc;//继续游戏的总时长
var isOneStart = false;//判断是否开始
var dz=0,ld=0,df=0;//游戏计分

//获取HTML元素
tl = document.getElementById("tl");
jg = document.getElementById("jg");
sc = document.getElementById("sc");
djs_span = document.getElementById("djs");
df_div = document.getElementById("defen");
dz_div = document.getElementById("MZ");
ld_div = document.getElementById("LD");
ksBtn = document.getElementById("ksBtn");
ztBtn = document.getElementById("ztBtn");
tzBtn = document.getElementById("tzBtn");
imgs = document.images;
zt_div = document.getElementById("zt_div");

//游戏开始事件
ksBtn.onclick = function(){
	if(isStart == false){
		//计分板初始化
		init();

	    tl_time = parseInt(tl.value);//停留时间
	    jg_time = parseInt(jg.value);//间隔时间
	    sc_time = parseInt(sc.value);//游戏时长

	    // //设置游戏开始
	    // isStart = true;

	    //记录游戏开始时间
	    start_Time = new Date();

	    //执行倒计时方法
	    djs();
	    //执行地鼠出现的方法
	    mouse_show();

	    //禁止用户操作输入框和开始按钮
	    isStart = true;
	    jinzhi();

	}
}

//游戏暂停事件
ztBtn.onclick = function(){
	if(isStart = true){
		if(isZT){
	        //继续游戏
	        // isOneStart = false;
	        zt_div.style.display = "none";
	        // ztBtn.textContent = "暂停游戏";
	        isZT = false;

	        //继续游戏开始的时间
	        jxGame_startTime = new Date();
	        game_jx();
	        //执行地鼠出现的方法
	        qingchang();
	        mouse_show();

	        //禁止用户操作输入框
	        jinzhi();

	    }else{
	        //暂停游戏

	        game_zt();
	    }

	}
    

}


//游戏结束事件
tzBtn.onclick = function(){

    game_over();
    jinzhi();
}

//倒计时方法
function djs(){
    //实时记录游戏时间
    var game_time = new Date();
    //计算倒计时
    djs_data = sc_time*60 - parseInt((game_time-start_Time)/1000);

    //显示倒计时
    djs_span.innerHTML = djs_data;

    if(djs_data < 1 ){

        alert("游戏结束");
        game_over();
        return;
    }

    //倒计时的计时器
    djs_id = setTimeout("djs()",1000);


}

//游戏暂停方法
function game_zt(){
    clearTimeout(djs_id);
    clearTimeout(jg_id);
    clearTimeout(tl_id);
    if(!isStart){
        clearTimeout(jxDJS_id);
    }
    zt_div.style.display = "block";
    // ztBtn.textContent = "继续游戏";
    isZT = true;

    //获取倒计时，作为继续游戏的总时长
    jxGame_sc = djs_data;

}

//游戏继续方法
function game_jx(){

    //继续游戏进行时
    var jxGame_timming = new Date();

    //重新计算倒计时
    djs_data = jxGame_sc - parseInt((jxGame_timming - jxGame_startTime)/1000);
    djs_span.innerHTML = djs_data;

    if(djs_data < 1 ){

        alert("游戏结束");
        game_over();
        return;
    }

    jxDJS_id = setTimeout("game_jx()",1000);

}

//游戏结束
function game_over(){
    clearTimeout(tl_id);
    clearTimeout(jg_id);
    clearTimeout(djs_id);
    clearTimeout(play_id);
    if(!isStart){
        clearTimeout(jxDJS_id);
    }
    isStart = false;
    djs_span.innerHTML = 0;

    //恢复游戏场地
    zt_div.style.display = "none";

    //地鼠清场
    qingchang();

}

//地鼠清场
function qingchang(){
    for (var i=0;i<25;i++) {
        imgs[i].src = "img/00.jpg";
    }
}

//地鼠出现方法
function mouse_show(){

    //生成随机的数组下标
    var i = parseInt(Math.floor(Math.random()*25));
    //随机改变图片
    imgs[i].src = "img/01.jpg";

    //地鼠出现间隔
    jg_id = setTimeout("mouse_show()",(jg_time)*1000);
    //地鼠停留时间
    tl_id = setTimeout("mouse_hide("+i+")",(tl_time)*1000);

}

//地鼠消失，没打中
function mouse_hide(i){

    var name = imgs[i].src.substr(imgs[i].src.length-5,1);

    if(name == 1){
        imgs[i].src = "img/00.jpg";

        //计分
        ld++;
        df--;
        if(df<=0){
            df = 0;
        }
        df_div.innerHTML = df;
        dz_div.innerHTML = dz;
        ld_div.innerHTML = ld;
    }



}

//打中地鼠
function play(obj){

    //获取图片的名称
    var name = obj.src.substr(obj.src.length-5,1);

    if(name == 1){
        obj.src = "img/02.jpg";

        //计分
        dz++;
        df+=2;
        df_div.innerHTML = df;
        dz_div.innerHTML = dz;
        ld_div.innerHTML = ld;


        //打中后还原
        play_id = setTimeout(function(){
            obj.src = "img/00.jpg";
//                      clearTimeout(tl_id);
        },500);

    }

}
function init(){
	dz = 0;
	ld = 0;
	df = 0;
	df_div.innerHTML = 0;
    dz_div.innerHTML = 0;
    ld_div.innerHTML = 0;
}
//禁止用户操作方法
function jinzhi(){
    if(isStart){
        tl.disabled = true;
        jg.disabled = true;
        sc.disabled = true;
        ksBtn.disabled = true;
    }else{
        tl.disabled = false;
        jg.disabled = false;
        sc.disabled = false;
        ksBtn.disabled = false;
    }
}