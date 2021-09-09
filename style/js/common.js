jQuery(document).ready(function () {
    if ($(window).width() >= 992) { //只有当大屏幕的时候才显示回到顶部
        var offset = 220;
        var duration = 500;
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.back-to-top').fadeIn(duration);
            } else {
                jQuery('.back-to-top').fadeOut(duration);
            }
        });

        jQuery('.back-to-top').click(function (event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, 0);
            return false;
        });
    } else { //否则进行隐藏
        jQuery(".back-to-top").css("display", "none");
    }
});

function changePay(index) {
    $("#paytype").val(index);
    $("#paytext").text("使用" + (index === 1 ? "支付宝" : "微信") + "支付");
    if (index === 1) {
        $("#type1").addClass("s-payment-selected");
        $("#type2").removeClass("s-payment-selected");
    } else {
        $("#type2").addClass("s-payment-selected");
        $("#type1").removeClass("s-payment-selected");
    }
}

function requestOrder(ele, paytype) {
    $.ajax({
        url: "/handler.ashx",
        data: "action=checkuser&mobile=" + $("#usermobile").val(),
        cache: false,
        async: false,
        success: function (result) {
            if (result === "-1") {
                $("#t_wait").hide();
                $("#t_neu").show();
                $("#paydone").hide();
                $("#b_colse").show();
            } else {
                $("#t_wait").show();
                $("#t_neu").hide();
                $("#paydone").show();
                $("#b_colse").hide();
                $(ele).addClass("disabled");
                $(ele).text("请求支付中...");
                window.open("/createalipayrequest.aspx?mobile=" + $("#usermobile").val() + "&paytype=" + paytype);
            }
            $("#afterPayModal").modal({
                keyboard: false
            });
            $("#paydone").focus();
        }
    });
}

function requestAlipayOrder(mobile, paytype) {
    $.ajax({
        url: "/handler.ashx",
        data: "action=order&mobile=" + mobile + "&paytype=" + paytype,
        cache: false,
        async: false,
        success: function (result) {
            window.location.href = result;
        }
    });
}

function afterpaydone() {
    window.location.href = "/orderfinished/";
}