/**
 * Created by jo.chan on 2017/12/15.
 */

var md5 = require("../js/md5");
var $ = require("jquery");
var store = require("../js/localStorage");

window.CLocalStorage = {
    getItem: function (key) {
        try {
            if (window.localStorage) {
                return store.get(key);
            } else {
                return Cookies.get(key);
            }
        } catch (e) {
            console.error(e);
        }
    },
    getJsonItem: function (key) {
        try {
            if (window.localStorage) {
                return store.get(key);
            } else {
                return JSON.parse(Cookies.get(key));
            }
        } catch (e) {
            console.error(e);
        }
    },
    setItem: function (key, value) {
        try {
            if (window.localStorage) {
                store.set(key, value);
            } else {
                Cookies.set(key, value, {
                    expires: 30
                });
            }
        } catch (e) {
            console.error(e);
        }
    },
    removeItem: function (key) {
        try {
            if (window.localStorage) {
                store.remove(key);
            } else {
                Cookies.remove(key);
            }
        } catch (e) {
            console.error(e);
        }
    },
    clear: function () {
        try {
            if (window.localStorage) {
                store.clearAll();
            } else {
                var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                if (keys) {
                    for (var i = 0; i < keys.length; i++) {
                        Cookies.remove(keys[i]);
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
};

var MyLocalStorage = {
    getItem: function (key) {
        return CLocalStorage.getItem(key);
    },
    getJsonItem: function (key) {
        return CLocalStorage.getJsonItem(key);
    },
    setItem: function (key, val) {
        CLocalStorage.setItem(key, val)
    },
    removeItem: function (key) {
        CLocalStorage.removeItem(key);
    },
    clear: function () {
        CLocalStorage.clear();
    }
};
window.pg_config = {
    status: {
        102: "Hãy nhập tài khoản hoặc mật mã chính xác",
        300: 'not login',
        404: " Thiếu tham số",
        406: "Không tìm thấy nhân vật",
        405: " Game không tồn tại",
        402: "Hoạt động kết thúc",
        401: "Hoạt động chưa bắt đầu",
        403: " Đã hết code, xin liên hệ adm.",
        200: "Success",
        400: "Chưa đạt",
        441: "Đợt này đã công bố kết quà, không thẻ chọn anh hùng nữa！",
        1000: "Chưa đạt điều kiện",
        1001: "Chưa đăng nhập hôm này",
        1006: "Số ngày tích lũy đăng nhập chưa đủ ",
        1005: "Đã nhận",
        1003: "Thời gian online không đủ",
        1004: "Số lượng mời không đủ",
        1101: "Lỗi API hoạt động",
        1002: "Số người tham gia chưa đạt"
    },
    api: {
        // server: 'http://10.10.3.144:8081',
        server: 'https://activity.pocketgamesol.com',
    },
    //支撑
    data: {
        appId: 10002,
        fbId: '311294709063394',
        groupId: '5a615156422ebf1530ae6c03',
        version: 'v3',
        //累计日登陆
        actId1: '5a615156422ebf1530ae6c04',
        //活动竞猜
        actId2: '5a615156422ebf1530ae6c05',
        //活跃人数
        actId3: '5a615156422ebf1530ae6c06',
        //累计充值
        actId4: '5a615156422ebf1530ae6c07',
        giftId: ["5a615156422ebf1530ae6c0f", "5a615156422ebf1530ae6c10", "5a615156422ebf1530ae6c11"],
        startTime: ["Thời gian dự đoán đợt 0h 14/2 - 21h30 16/2  , Thời gian công bố kết quả :22h 16/2",
            "Thời gian dự đoán đợt 2 : 22h05 16/2 - 21h30 18/2 , Thời gian công bố kết quả : 22h 18/2",
            "Thời gian dự đoán đợt 3 : 22h05 18/2 - 21h30 21/2, Thời gian công bố kết quả : 22h 21/2 "
        ],
        userCount: ["0", "5"],
        count: 0,
        guessHis: []
    },
    tip: {
        //抱歉，你今天还没登录游戏，无法参与活动
        tip1: 'Hôm nay bạn vẫn chưa đăng nhập, không thể tham gia event',
        //领取成功，请到游戏中查看奖励
        tip2: 'Đã nhận được:',
        //等待开奖
        tip3: 'Chờ mở giải',
        //恭喜中奖竞猜
        tip4: 'Chúc mừng trúng giải dự đoán',
        //遗憾没奖
        tip6: 'Chưa trúng giải',
        //您未选够5只宠物
        tip8: 'Bạn chưa chọn đủ 5 anh hùng',
    }
};

var requestUrl = {
    //平台登录
    login: pg_config.api.server + '/user/sdk/login',
    //fb登录
    fbLogin: pg_config.api.server + '/user/fb/login',
    fb_redirect_uri: 'http://sieuanhhung.pocketgamesol.com/newyear/',
    // fb_redirect_uri: 'http://10.10.12.40:8020/happyNewYear/',
    //获取区服
    zone: pg_config.api.server + '/user/sdk/zones',
    //获取角色
    role: pg_config.api.server + '/user/player/list',
    //参与活动
    joinActivityUrl: pg_config.api.server + '/activity/join',
    //获取活动信息
    infoActivity: pg_config.api.server + '/activity/info',
    //历史奖励
    getHistroy: pg_config.api.server + '/activity/cdKeys'
};

var globalData = {
    zones: [],
    playerId: null,
    playerName: null,
    gameZoneId: null,
    token: null,
    userId: null,
    username: null,
    activetime: null,
    canGuessCount: 0
};

//竞猜状态数组
//guessArr[1][2] 表示第二期下第三只宠物
var guessArr = new Array();

//通用ajax
function ajaxDataController(url, params, successCallback) {
    $.ajax({
        url: url,
        type: "GET",
        data: params,
        beforeSend: function () {
            showBox('.loading');
        },
        success: function (result) {
            hideBox('.loading');
            successCallback(result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            tip('request error');
        }
    });
}

//领取奖励,查询历史,查询情况封装
_checkAndclickAward = {
    /**封装领取奖励
     * @param e    当前dom
     * @param clickDom_class
     * @param actId  活动ID
     * @param type
     */
    get_award_click: function (e, clickDom_class, actId, type) {
        var rewardId = $(e).attr('data-rewardId');
        var params = {
            groupId: pg_config.data.groupId,
            rewardId: rewardId,
            actId: actId,
            token: globalData.token
        };
        ajaxDataController(requestUrl.joinActivityUrl, params, function (result) {
            // result = {"code": 200, "state": {"cdKeys": "14f9d109\r"}};
            if (result.code == 200) {
                awardTip(pg_config.tip.tip2, result.state.cdKeys);
                if (type == 1) {
                    $("." + clickDom_class).removeClass("getBtn").addClass("haveAwardBtn").off("click");
                }
                else {
                    $("." + clickDom_class).removeClass("event4-btn").addClass("haveAwardBtn2").off("click");
                }
            }
            else {
                tip(pg_config.status[result.code]);
            }
        })
    },
    /**
     * 封装查询历史领取情况
     * @param actId
     * @param histroyDom_class
     * @param btn
     * @param type
     */
    check_award_History: function (actId, histroyDom_class, btn, type) {
        var params = {
            actId: actId,
            groupId: pg_config.data.groupId,
            token: globalData.token
        };
        ajaxDataController(requestUrl.getHistroy, params, function (result) {
            if (result.code == 200) {
                if (type == 1) {
                    resultFun(result, histroyDom_class, btn, "getBtn", "haveAwardBtn");
                }
                else if (type == 2) {
                    resultFun(result, histroyDom_class, btn, "event4-btn", "haveAwardBtn2");
                }
                else {
                    if (result.state.length > 0) {
                        pg_config.data.guessHis = result.state;
                    }
                }
            }
            else {
                tip(pg_config.status[result.code]);
            }
        })
    },
    check_info: function (actId, rewardId, type) {
        var params = {
            actId: actId,
            groupId: pg_config.data.groupId,
            rewardId: rewardId,
            token: globalData.token
        };
        ajaxDataController(requestUrl.infoActivity, params, function (result) {
            if (result.code == 200) {
                if (type == 1) {
                    var peopleNum = result.state.countTimes;
                    $(".point-people span").text(peopleNum);
                }
                else {
                    var PayCharge = result.state.PayCharge;
                    $(".charge-money span").text(PayCharge);
                }
            }
            else {
                tip(pg_config.status[result.code]);
            }
        })
    }
};

var resultFun = function (result, a, b, c, d) {
    $(a).each(function () {
        for (var j = 0; j < result.state.length; j++) {
            var rewardId = result.state[j].rewardId;
            var dataRewardId = $(this).find(b).attr('data-rewardId');
            if (rewardId == dataRewardId) {
                $(this).find(b).removeClass(c).addClass(d).off("click");
            }
        }
    });
};

function initCheck() {
    //日登陆 查奖励领取情况
    _checkAndclickAward.check_award_History(pg_config.data.actId1, '.award-main-1', 'button.dayBtn', 1);
    //活跃人数  查奖励领取情况
    _checkAndclickAward.check_award_History(pg_config.data.actId3, ".award-main-3", "button.pointBtn", 1);
    //累计充值 查奖励领取情况
    _checkAndclickAward.check_award_History(pg_config.data.actId4, ".award-main-4", "button.event4Btn", 2);
    //活跃人数 查当前到达人数
    _checkAndclickAward.check_info(pg_config.data.actId3, '5a615156422ebf1530ae6c12', 1);
    //充值金额 查询当前充值金额情况
    _checkAndclickAward.check_info(pg_config.data.actId4, '5a615156422ebf1530ae6c17', 2);
};

var action = function (e) {
    $(e).on("click", function () {
        if (isLogin() && isChoose()) {
            var _this = $(this);
            var testName = _this.attr('class').slice(-5);
            var fatherBox = _this.parent().parent().parent();
            var actId = fatherBox.attr('data-actId');
            var type = fatherBox.attr('data-type');
            _checkAndclickAward.get_award_click(_this, testName, actId, type);
        }
        else {
            showBox(".login-form");
        }
    });
};
// 日登陆领取奖励
action($(".dayBtn"));
// 活跃人数领奖
action($(".pointBtn"));
// 累计充值领奖
action($(".event4-btn"));

//竞猜 查竞猜期数
function guessInfoActivity() {
    //我1分系统2分
    //0: 我没选系统没选
    //1: 我选了系统没选
    //2: 我没选系统选了
    //3: 我选了系统选了
    for (var i = 0; i < 3; i++) {
        guessArr[i] = new Array();
        for (var k = 0; k < 10; k++) {
            guessArr[i][k] = 0;
        }
    }
    var params = {
        actId: pg_config.data.actId2,
        groupId: pg_config.data.groupId,
        token: globalData.token,
        rewardId: '5a615156422ebf1530ae6c0f'
    };
    var d = $.Deferred();
    ajaxDataController(requestUrl.infoActivity, params, function (result) {
        if (result.code == 200) {
            //循环
            for (var z = 0; z < 3; z++) {
                if (result.state.SystemTicket && result.state.UserTicket) {
                    if (result.state.SystemTicket[z]) {
                        for (var x = 0; x < 5; x++) {
                            var cur = result.state.SystemTicket[z][x];
                            guessArr[z][cur] += 2;
                        }
                    }
                    if (result.state.UserTicket[z]) {
                        $(".menu-bar ul li").eq(z).addClass("disClick");
                        for (var y = 0; y < 5; y++) {
                            var cur = result.state.UserTicket[z][y];
                            guessArr[z][cur] += 1;
                        }
                    }
                    $(".startTime").text(pg_config.data.startTime[z - 1]);
                }
            }
            getJsonLength(result.state.UserTicket);
            $(".act-desc span").text(globalData.canGuessCount);
            $(".menu-bar ul li").eq(0).removeClass("step").trigger("click");
            $(".submitBtn").removeClass('haveAward_btn');
            if (result.state.SystemTicket && result.state.SystemTicket[0]) {
                $(".menu-bar ul li").eq(1).removeClass("step").trigger("click");
                $(".submitBtn").removeClass('haveAward_btn');
            }
            if (result.state.SystemTicket && result.state.SystemTicket[1]) {
                $(".menu-bar ul li").eq(2).removeClass("step").trigger("click");
                $(".submitBtn").removeClass('haveAward_btn');
            }
        }
        else {
            tip(pg_config.status[result.code]);
        }
    })
    return d.promise();
};

//竞猜 查竞猜历史
function guessGetHistory() {
    if (isLogin() && isChoose()) {
        //竞猜历史
        _checkAndclickAward.check_award_History(pg_config.data.actId2, "", "", 3);
        pg_config.data.shutNum = new Array();
        for (var x = 0; x < 3; x++) {
            var shutNum = 0;
            for (var y = 0; y < 10; y++) {
                if (guessArr && guessArr[x] && guessArr[x][y] > 2) {
                    shutNum += 1;
                }
            }
            pg_config.data.shutNum[x] = shutNum;
        }
        return true;
    }
    return false;
}

//获取激活码历史记录
$(".his-btn").on("click", function () {
    if (isLogin() && isChoose()) {
        var index = $(this).attr('data-index');
        var hisActId = ['5a615156422ebf1530ae6c04', '5a615156422ebf1530ae6c05', '5a615156422ebf1530ae6c06', '5a615156422ebf1530ae6c07'];
        var params = {
            actId: hisActId[index - 1],
            groupId: pg_config.data.groupId,
            token: globalData.token
        };
        ajaxDataController(requestUrl.getHistroy, params, function (result) {
            if (result.code == 200) {
                if (result.state.length > 0) {
                    var dom = '', dataList = [], historyData = result.state;
                    for (var i = 0; i < historyData.length; i++) {
                        dataList = historyData[i];
                        dom += '<li><p class="code-key">' + dataList.cdKeys + '</p>' + '<p class="code-name">' + dataList.rewardName + '</p></li>';
                    }
                    $(".code-list").empty().append(dom);
                    showBox('.code-box');
                }
                else {
                    tip('Chưa có nhận code.');
                }
            }
            else {
                tip(pg_config.status[result.code]);
                console.log('getHistroyLotteryBtn' + pg_config.status[result.code]);
            }
        })
    }
    else {
        showBox(".login-form");
    }
});

//点击选中图标进行竞猜
$(".guess-item").on("click", function () {
    //当前开的这一期,可以点击的情况下
    if (!$('.menu-bar li.active').hasClass("disClick")) {
        //小于5只切预选人物还未被选中时
        if (pg_config.data.count < 5 && !$(this).hasClass("active")) {
            pg_config.data.count++;
            $(".act-choose span").text(pg_config.data.count);
            $(this).addClass("active");
        } else if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            pg_config.data.count--;
            $(".act-choose span").text(pg_config.data.count);
        }
    }
});

//点击提交竞猜
$(".submitBtn").on("click", function () {
    if (isLogin() && isChoose()) {
        if ($(".submitBtn").hasClass("guessAward_btn")) {
            //领取竞猜奖励
            getGuessAward();
        } else {
            if (!$(".menu-bar ul li.active").hasClass("disClick")) {
                //如果是竞猜
                pg_config.data.dataActId = "";
                for (var i = 0; i < 10; i++) {
                    if ($(".guess-item").eq(i).hasClass("active")) {
                        pg_config.data.dataActId += i;
                    }
                }
                if (pg_config.data.dataActId.length < 5) {
                    tip(pg_config.tip.tip8);
                } else {
                    sumbitGuess();
                }
            }
        }
    }
    else {
        showBox(".login-form");
    }
});

//竞猜状态 提交竞猜
function sumbitGuess() {
    var params = {
        groupId: pg_config.data.groupId,
        actId: pg_config.data.actId2,
        ticket: pg_config.data.dataActId,
        token: globalData.token,
        step: $(".menu-bar ul li.active").index()
    };
    ajaxDataController(requestUrl.joinActivityUrl, params, function (result) {
        if (result.code == 200) {
            tip('Bạn đã xác nhận lựa chọn cuối cùng, không thể sửa đổi');
            $(".submitBtn").addClass('wait_btn');
            if (globalData.canGuessCount < 3) {
                globalData.canGuessCount++;
                $(".act-desc span").text(globalData.canGuessCount);
            }
            $(".black-bg2").show();
            guessInfoActivity();
        }
        else if (result.code == 1005) {
            tip('Bạn đã gửi rồi, xin hãy đợi kết quả');
        }
        else {
            tip(pg_config.status[result.code]);
            console.log('submitBtnClick' + pg_config.status[result.code]);
        }
    });
}

//竞猜状态 领取竞猜奖励
function getGuessAward() {
    var x = $(".menu-bar ul li.active").index();
    var shutNum = 0;
    for (var y = 0; y < 10; y++) {
        if (guessArr && guessArr[x] && guessArr[x][y] > 2) {
            shutNum += 1;
        }
    }
//如果小于3,提示遗憾没有中奖
    if (shutNum < 3) {
        tip(pg_config.tip.tip6);
    } else {
        var temp = pg_config.data.giftId[shutNum - 3];
        //领取竞猜奖励
        var data = {
            groupId: pg_config.data.groupId,
            actId: pg_config.data.actId2,
            rewardId: temp,//对应期数的rewardId
            token: globalData.token,
            step: $(".menu-bar ul li.active").index()
        };
        ajaxDataController(requestUrl.joinActivityUrl, data, function (result) {
            if (result.code == 200) {
                $(".submitBtn").addClass('haveAward_btn');
                $(".lookAward-ul ul li").hide();
                $(".lookAward-ul").removeClass('top');
                $(".lookAwardbox p.tip-desc").text(pg_config.tip.tip4).show();
                $(".lookAwardbox p.code").text(result.state.cdKeys).show();
                showBox('.show-award-box');
                switch (result.state.rewardId) {
                    case pg_config.data.giftId[0]:
                        $(".lookAwardbox div").removeClass("award-img-1 award-img-2 award-img-3").addClass("award-img-3").show();
                        break;
                    case pg_config.data.giftId[1]:
                        $(".lookAwardbox div").removeClass("award-img-1 award-img-2 award-img-3").addClass("award-img-2").show();
                        break;
                    case  pg_config.data.giftId[2]:
                        $(".lookAwardbox div").removeClass("award-img-1 award-img-2 award-img-3").addClass("award-img-1").show();
                        break;
                }
            }
            else {
                tip(pg_config.status[result.code]);
                console.log('submitBtnGetAwardClick' + pg_config.status[result.code]);
            }
        });
    }
}

//点击对应期数进行竞猜
$(".menu-bar ul li").on("click", function () {
    if ($(this).hasClass('step')) {
        tip('Event chưa mở');
    }
    else {
        pg_config.data.count = 0;
        if (!$(this).hasClass("active")) {
            $(".menu-bar ul li").removeClass("active");
            $(this).addClass("active");
        }
        $(".submitBtn").removeClass('haveAward_btn');
        //我1分系统2分
        //0: 我没选系统没选 actItem-unchar
        //1: 我选了系统没选 actItem-out
        //2: 我没选系统选了 system-icon
        //3: 我选了系统选了 actItem-win
        var index = $(this).index();//第几期
        $(".startTime").text(pg_config.data.startTime[index]);
        var all = 0;
        var systemFlag = false; //系统是否出结果了
        var userFlag = false; //我是否选了
        for (var i = 0; i < 10; i++) {
            if (guessArr && guessArr[index]) {
                switch (guessArr[index][i]) {
                    case 1:
                        $(".guess-main").find("div.guess-item").eq(i).addClass("active").removeClass("out win");
                        break;
                    case 2:
                        $(".guess-main").find("div.guess-item").eq(i).addClass("out").removeClass("active win");
                        break;
                    case 3:
                        $(".guess-main").find("div.guess-item").eq(i).addClass("win").removeClass("out active");
                        break;
                    default:
                        $(".guess-main").find("div.guess-item").eq(i).removeClass("active out win");
                        $(".guess-main").find("div.guess-item").eq(i).removeClass("active out win");
                        break;
                }
                if (guessArr[index][i] > 1) {
                    systemFlag = true;
                }
                if (guessArr[index][i] == 1 || guessArr[index][i] == 3) {
                    userFlag = true;
                }
                all += guessArr[index][i];
            }
        }
        if (userFlag && !systemFlag) {
            $(".act-choose span").text('5');
            $(".submitBtn").removeClass("guessAward_btn guessHaveAward_btn noAward_btn").addClass("wait_btn");
        }
        if (userFlag && systemFlag) {
            $(".act-choose span").text('5');
            $(".submitBtn").removeClass("guessHaveAward_btn noAward_btn wait_btn").addClass("guessAward_btn");
        }
        if (!userFlag) {
            $(".act-choose span").text('0');
            $(".submitBtn").removeClass("guessAward_btn guessHaveAward_btn noAward_btn wait_btn");
        }
    }
});

//点击获取竞猜历史
$(".guessHisBtn").on("click", function () {
    if (!guessGetHistory()) {
        showBox(".login-form");
    } else {
        $(".lookAward-ul ul li").show().eq(0).trigger("click");
        showBox(".show-award-box");
    }
});

//点击查看获取竞猜期数历史奖励
$(".lookAward-ul ul li").on("click", function () {
    $(".lookAward-ul ul li.active").removeClass("active");
    $(".lookAwardbox p.tip-desc").hide();
    $(".lookAward-ul").addClass('top');
    $(this).addClass("active");
    var index = $(this).index();  //3
    console.log(pg_config.data.shutNum);
    var flag = false;
    var num = 0;
    for (var i = 0; i < pg_config.data.guessHis.length; i++) {
        if (pg_config.data.guessHis[i].extInfo.step == index) {
            flag = true;
            num = i;
            break;
        }
    }
    if (flag) {
        switch (pg_config.data.shutNum[index]) {  //3
            case 3:
                $(".lookAwardbox p.code").text(pg_config.data.guessHis[num].cdKeys).show();
                $(".lookAwardbox div").removeClass("award-img-1 award-img-2 award-img-3").addClass("award-img-3").show();
                break;
            case 4:
                $(".lookAwardbox p.code").text(pg_config.data.guessHis[num].cdKeys).show();
                $(".lookAwardbox div").removeClass("award-img-1 award-img-2 award-img-3").addClass("award-img-2").show();
                break;
            case 5:
                $(".lookAwardbox p.code").text(pg_config.data.guessHis[num].cdKeys).show();
                $(".lookAwardbox div").removeClass("award-img-1 award-img-2 award-img-3").addClass("award-img-1").show();
                break;
            default:
                $(".lookAwardbox div").removeClass("award-img-1 award-img-2 award-img-3").hide();
                var tips = pg_config.tip.tip3;
                for (var i = 0; i < 10; i++) {
                    if (guessArr && guessArr[index] && guessArr[index][i] > 1) {
                        tips = pg_config.tip.tip6
                    }
                }
                $(".lookAwardbox p.code").empty();
                $(".lookAwardbox p.tip-desc").text(tips).show();
                break;
        }
    }
    else {
        var vflag = false;
        //循环长度,如果分数大于1的，说明我选了也系统出结果了,但是可能没中奖或者我没有领取奖励
        for (var k = 0; k < guessArr[index].length; k++) {
            if (guessArr[index][k] > 1) {
                vflag = true;
            }
        }
        $(".lookAwardbox div").removeClass("award-img-1 award-img-2 award-img-3").hide();
        $(".lookAwardbox p.code").empty();
        if (vflag) {
            $(".lookAwardbox p.tip-desc").text('Chưa trúng giải').show();
        } else {
            $(".lookAwardbox p.tip-desc").text('Đợt này chưa công bố kết quà hoặc chưa nhận code hoặc chưa trúng giải').show();
        }
    }
});


//初始化
function initInfoActivity() {
    initCheck();
    guessGetHistory();
    guessInfoActivity();
}

//提示
function tip(html) {
    showBox(".tip-box");
    $(".tishi").text(html);
}

//提示
function awardTip(awardHtml, codeKey) {
    showBox('.tip-box-2');
    $(".code span").text(codeKey);
    $(".tishi").text(awardHtml);
}

//查json对象长度
function getJsonLength(jsonData) {
    var jsonLength = 0;
    if (jsonData) {
        for (var item in jsonData) {
            jsonLength++;
        }
    }
    globalData.canGuessCount = jsonLength;
    return jsonLength;
}

$(".menu ul li").click(function () {
    $(".menu ul li").removeClass('active');
    $(this).addClass('active');
    var index = this.title;
    var id = '#' + 'index_' + index;
    $("html,body").animate({scrollTop: $(id).offset().top - 100}, 600);
});


$(".act-rule").on("click", function () {
    var ruleIndex = $(this).attr('data-index');
    var ruleClass = '.' + 'rule-' + ruleIndex;
    $(".black-bg").show();
    $(ruleClass).show();
});

function checkLocalStorage() {
    try {
        if (!window.localStorage) {
            alert('not support localStorage');
        }
    } catch (e) {
        console.log(e);
    }
}

checkLocalStorage();


//-----------------------------------------------------------------------------以下代码都是登录的

//通用登录ajax
function loginAjax(url, params, successCallback) {
    $.ajax({
        url: url,
        type: "GET",
        data: params,
        beforeSend: function () {
            $('.loadingButton').show();
        },
        success: function (result) {
            $('.loadingButton').hide();
            successCallback(result);
        },
        error: function () {
            tip('request error');
        }
    });
}


var showBox = function (_className) {
    $(".black-bg").show();
    $(_className).show();
};
var hideBox = function (_className) {
    $(".black-bg").hide();
    $(_className).hide();
};


function checkFBLogin() {
    var FB_CODE = $.trim(getParameterByName("code"));
    if (FB_CODE == "") {
        return;
    }
    var params = {
        clientId: pg_config.data.appId,
        redirectUrl: requestUrl.fb_redirect_uri,
        code: FB_CODE
    };
    loginAjax(requestUrl.fbLogin, params, function (result) {
        handleLogin(result);
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};


$('.loginBtn').on('click', function () {
    var username = $(".username").val();
    var password = md5($(".password").val());
    if (username == "" || password == "") {
        $(".login-tip").show();
        $(".login-tip").text("Hãy nhập tài khoản hoặc mật mã chính xác");
        return;
    }
    var params = {
        userName: username,
        password: password,
        version: 'v3'
    };
    loginAjax(requestUrl.login, params, function (result) {
        handleLogin(result);
    });
});

function handleLogin(result) {
    if (result.code == 200) {
        globalData.userId = result.state.userId;
        globalData.username = result.state.userName;
        globalData.token = result.state.token;
        MyLocalStorage.setItem('userId', result.state.userId);
        MyLocalStorage.setItem('username', result.state.userName);
        MyLocalStorage.setItem('token', result.state.token);
        var myTimer = new Date().getTime();
        globalData.activetime = myTimer;
        MyLocalStorage.setItem('activetime', myTimer);
        hideBox('.login-form');
        showBox('.choose-form');
        loadGameZones();
        if (MyLocalStorage.getItem('facebook') == 1) {
            window.location.href = requestUrl.fb_redirect_uri;
        }
    }
    else {
        $(".login-tip").show();
        $(".login-tip").text(pg_config.status[result.code]);
    }
}

/**
 * load GameZones
 */
function loadGameZones() {
    var zones = globalData.zones;
    if (zones && zones.length > 2) {
        setZones(zones);
    } else {
        var params = {
            appId: pg_config.data.appId,
            token: globalData.token
        };
        loginAjax(requestUrl.zone, params, function (result) {
            if (result.code == 200) {
                $(".tip").hide();
                globalData.zones = result.state;
                setZones(globalData.zones);
                MyLocalStorage.setItem("zones", globalData.zones);
            }
            else {
                $(".tip").show().text(pg_config.status[result.code]);
            }
        });
    }
}

//寻找对应区服角色
function loadPlayer() {
    globalData.gameZoneId = $(".zoneSelect").val();
    MyLocalStorage.setItem("gameZoneId", $(".zoneSelect").val());
    var params = {
        appId: pg_config.data.appId,
        gameZoneId: globalData.gameZoneId,
        token: globalData.token
    }
    loginAjax(requestUrl.role, params, function (result) {
        if (result.code == 200) {
            if (result.state == '') {
                $(".tip").show().text('Chọn server có nhân vật');
                globalData.playerId = null;
                globalData.playerName = null;
                MyLocalStorage.removeItem("playerId");
                MyLocalStorage.removeItem("playerName");
            } else {
                $(".tip").hide();
                var data = result.state[0];
                globalData.playerId = data.playerId;
                globalData.playerName = data.playerName;
                MyLocalStorage.setItem("playerId", data.playerId);
                MyLocalStorage.setItem("playerName", data.playerName);
            }
        }
        else {
            $(".tip").show().text(pg_config.status[result.code]);
        }
    });
}

/**
 * select list
 * @param list
 */
var recentGameZones = function (list) {
    var dom = '<option selected="selected">Chọn server</option>',
        zoneList = null;
    $(".zoneSelect").empty();
    for (var i = 0; i < list.length; i++) {
        zoneList = list[i];
        dom += '<option value="' + zoneList.gameZoneId + '" data-localName="' + zoneList.localName + '">' + zoneList.localName + '</option>';
    }
    $(".zoneSelect").append(dom);
};

function setZones(data) {
    var list = data;
    var openList = [];
    for (var i = 0; i < list.length; i++) {
        openList.push(list[i]);
    }
    recentGameZones(openList);
}

$(".zoneSelect").change(function () {
    globalData.gamePlayer = $('.zoneSelect option:selected').text();
    MyLocalStorage.setItem("gamePlayer", $('.zoneSelect option:selected').text());
    loadPlayer();
});

function isLogin() {
    if (MyLocalStorage.getItem('userId') && MyLocalStorage.getItem('token')) {
        var active = new Date().getTime();
        active -= 1800000;
        if (active < parseInt(MyLocalStorage.getItem('activetime'))) {
            globalData.token = MyLocalStorage.getItem('token');
            globalData.username = MyLocalStorage.getItem('username');
            globalData.playerName = MyLocalStorage.getItem('playerName');
            globalData.gamePlayer = MyLocalStorage.getItem('gamePlayer');
            globalData.userId = MyLocalStorage.getItem('userId');
            globalData.playerId = MyLocalStorage.getItem('playerId');
            globalData.zones = MyLocalStorage.getJsonItem('zones');
            globalData.gameZoneId = MyLocalStorage.getItem('gameZoneId');
            return true;
        } else {
            MyLocalStorage.clear();
            return false;
        }
    } else {
        return false;
    }
}

//判断是否选择角色
function isChoose() {
    if (globalData.playerId) {
        {
            return true;
        }
    } else {
        return false;
    }
}

$(".btn-channel").on("click", function () {
    if (isChoose()) {
        hideBox('.choose-form');
        showMessage();
        initInfoActivity();
    } else {
        $(".tip").show().text('Chọn server có nhân vật');
    }
});


$(".btn-login").on("click", function () {
    showBox(".login-form")
});


$(".btn-close").on("click", function () {
    $(".black-bg2").hide();
    hideBox('.box');
});


$('.userInit').on('click', function () {
    MyLocalStorage.clear();
    globalData = {
        zones: [],
        playerId: null,
        playerName: null,
        gamePlayer: null,
        gameZoneId: null,
        token: null,
        userId: null,
        username: null,
        activetime: null,
    };
    $('.userMessage span').text();
    $('.userMessage').hide();
    $('.btn-login').show();
    $('.menu-bar li.active').removeClass("disClick");
});


$('.fbBtn').on('click', function () {
    sessionStorage.setItem('facebook', 1);
    var random = Math.random() * 1000;
    var loginURL = "https://www.facebook.com/v2.6/dialog/oauth?client_id=" + pg_config.data.fbId
        + "&redirect_uri=" + encodeURIComponent(requestUrl.fb_redirect_uri) + "&r=" + random;
    window.location.href = loginURL;
});

function showMessage() {
    var gamePlayer = globalData.gamePlayer,
        playerId = globalData.playerId, userName = globalData.username;
    $(".qf").html(gamePlayer);
    $(".id").html(playerId);
    $(".zh").html(userName);
    $(".userMessage").show();
    $(".btn-login").hide();
}


$(function () {
    if (isLogin()) {
        if (isChoose()) {
            showMessage();
            initInfoActivity();
        } else {
            showBox('.choose-form');
            loadGameZones();
        }
    } else {
        checkFBLogin();
    }
});
