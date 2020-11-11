/* mituJQ */
$("#head_foot .mitu").mouseover(function() {
    $("#mi-logo").animate({
        left: "59px"
    }, 100)
    $("#mi-home").animate({
        left: "6px"
    }, 100)
});
$("#head_foot .mitu").mouseleave(function() {
    $("#mi-logo").animate({
        left: "8px"
    }, 100)
    $("#mi-home").animate({
        left: "-52px"
    }, 100)
});
/* 二维码JQ */
$("#xiazai").mouseover(function() {
    $("#xala").css({
        "display": "block"
    })
    $("#erweima").stop().animate({
        height: "147px"
    }, 200)
});
$("#xiazai").mouseout(function() {
    $("#xala").css({
        "display": "none"
    })
    $("#erweima").stop().animate({
        height: "0px"
    }, 200)
});
/* 购物车下拉 */
$(".nav_right").mouseover(function() {
    $("#gocar").stop().animate({
        height: "100px"
    }, 200)
    $(".nav_right").css({
        "background": "#ffffff"
    })
    $(".nav_right span").css({
        "color": "#ff6700"
    })
});
$(".nav_right").mouseout(function() {
    $("#gocar").stop().animate({
        height: "0px"
    }, 200)
    $(".nav_right").css({
        "background": "#424242"
    })
    $(".nav_right span").css({
        "color": "#b0b0b0"
    })
});
/* 轮播图1 */
var swiper = new Swiper('#swidth1', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    grabCursor: true,
    waitForTransition: false,
    preventClicksPropagation: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,

    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});
//鼠标覆盖停止自动切换
swiper.el.onmouseover = function() {
        swiper.autoplay.stop();
    }
    //鼠标离开开始自动切换
swiper.el.onmouseout = function() {
        swiper.autoplay.start();
    }
    /*  轮播图2  */
var swiper1 = new Swiper('#swipt2', {
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 4,
    loopFillGroupWithBlank: false,
    navigation: {
        nextEl: '#next',
        prevEl: '#prev',
    },
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
});
//鼠标覆盖停止自动切换
swiper1.el.onmouseover = function() {
        swiper1.autoplay.stop();
    }
    //鼠标离开开始自动切换
swiper1.el.onmouseout = function() {
        swiper1.autoplay.start();
    }
    // 图片转换
var tu3 = document.getElementsByClassName("truestetu3")[0]
var tu4 = document.getElementsByClassName("truestetu4")[0]

function time1() {
    setInterval(function() {
        tu4.style.display = "block"
        tu3.style.display = "none"
        setTimeout(function() {
            tu3.style.display = "block"
            tu4.style.display = "none"
        }, 2000)
    }, 4000)
}
// 回到顶部
$(window).scroll(function() {
    if ($(window).scrollTop() > 800) {
        $("#hdtop").css({
            "display": "block"
        })
    } else {
        $("#hdtop").css({
            "display": "none"
        })
    }
})
$("#hdtop").click(function() {
        scrollTo(0)
    })
    // 手机APP

$(".weixin_box").hover(
    function() {
        $(".weixin2").css({
            "display": "block"
        });
    },
    function() {
        $(".weixin2").css({
            "display": "none"
        });
    }
);
// 京东倒计时
let hous = document.getElementsByClassName("hous")[0]
let minute = document.getElementsByClassName("minute")[0]
let second = document.getElementsByClassName("second")[0]
let jieshu = document.getElementsByClassName("jieshu")[0]

function time(dat) {
    var nowDate = new Date();
    var hs = Math.floor((dat - nowDate) / 1000);
    var h = Math.floor(hs / 3600);
    var m = Math.floor(hs / 60 % 60);
    var s = Math.floor(hs % 60);

    function format(num) {
        return num < 10 ? "0" + num : num;
    }
    h = format(h);
    m = format(m);
    s = format(s);
    hous.innerText = h;
    minute.innerText = m;
    second.innerText = s;
    if (hs <= 0) {
        clearInterval(timer);
        jieshu.innerText = "秒杀结束";
    }
}

var oDate = new Date("2020/11/11 16:19:20");
time(oDate);
var timer = setInterval(function() {
    time(oDate);
    if (h == 0 || m == 0 || s == 0) {
        clearInterval(timer)
    }
}, 1000)


var arr = '';
axios.get("http://localhost:3000/shangpin", {}).then(res => {

    for (let i in res.data) {
        arr += `
           <a href="list.html?id=${res.data[i].id}" target="_blank" data-id=${res.data[i].id}>
                <img src="${res.data[i].img}" alt="">
                <h3>${res.data[i].nem}</h3>
                <span>${res.data[i].peizhi}</span>
                <span>${res.data[i].jag}元<del>${res.data[i].jj}</del></span>
            </a>
           `
    }

    var odiv1 = document.getElementsByClassName("shouji_right")[0]
    odiv1.innerHTML = arr

})