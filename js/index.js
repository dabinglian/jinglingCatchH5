var mian, view, imgFrom;
var addr = "广州公元前";
var pageName = "螺旋圆舞曲换装H5";

window.onload = function () {
    var bgm = document.getElementById("bgm");

    $("#img").click(function () {
        console.log("body-click")
        if (!bgm.onContral) {
            bgm.play();
            console.log("bgm-play")
        }
        bgm.onContral = true;
        
    })

    resources.assetLoad(function () {
        $(".loading_page").css({
            opacity: 0,
            transform: "scale(1.5)"
        });

        setTimeout(function () {
            view = new View();
            view.showView(0);
            $(".loading_page").hide();
            //_hmt && _hmt.push(['_trackPageview', '/waltz/activity/showH5/home']);
        }, 500)

    });

}