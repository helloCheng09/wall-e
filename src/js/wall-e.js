/*!

@Title: wall-e
@Description: 小破移动端模块化前端框架
@Site: www.xiaofuni.cn
@Author: 瓦力
@License: 

*/
;
!(function () {
    "use strict";

    function WallE() {
        this.v = '1.0.0'; // 版本号
    }

    /*!
     *textarea 自动适应高度
     * @ textarea 的id值
     */
    WallE.prototype.autoTextarea = function (textareaId) {
        /**
         * 文本框根据输入内容自适应高度
         * @param                {HTMLElement}        输入框元素
         * @param                {Number}                设置光标与输入框保持的距离(默认0)
         * @param                {Number}                设置最大高度(可选)
         */
        var autoTextarea = function (elem, extra, maxHeight) {
            extra = extra || 0;
            var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                    elem.addEventListener ?
                        elem.addEventListener(type, callback, false) :
                        elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                    var val = elem.currentStyle[name];
                    if (name === 'height' && val.search(/px/i) !== 1) {
                        var rect = elem.getBoundingClientRect();
                        return rect.bottom - rect.top -
                            parseFloat(getStyle('paddingTop')) -
                            parseFloat(getStyle('paddingBottom')) + 'px';
                    };
                    return val;
                } : function (name) {
                    return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));
            elem.style.resize = 'none';
            var change = function () {
                var scrollTop, height,
                    padding = 0,
                    style = elem.style;
                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;
                if (!isFirefox && !isOpera) {
                    padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle(
                        'paddingBottom'));
                };
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                    if (maxHeight && elem.scrollHeight > maxHeight) {
                        height = maxHeight - padding;
                        style.overflowY = 'auto';
                    } else {
                        height = elem.scrollHeight - padding;
                        style.overflowY = 'hidden';
                    };
                    style.height = height + extra + 'px';
                    scrollTop += parseInt(style.height) - elem.currHeight;
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    elem.currHeight = parseInt(style.height);
                };
            };
            addEvent('propertychange', change);
            addEvent('input', change);
            addEvent('focus', change);
            change();
        };
        var text = document.getElementById(textareaId);
        autoTextarea(text);
    }
    /*!
     * 获取地址栏中参数值
     */
    WallE.prototype.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    /**
     *  全屏滚动 元素是否在可见范围内
     */
    WallE.prototype.elemVisible = function () {
        // 可视区域上边界限 $(window).scrollTop()
        // 下边界 $(window).scrollTop() + $(window).height()
        // 元素 顶边距离顶部距离要大于上边界 elem.offset().top
        // 元素 底边距离底部距离要小于下边界 elem.offset().top + elem.height()
        var midHeight = $(scrollPn) / 2
        var winTop = $(scrollPn).scrollTop()
        var winBot = $(scrollPn).scrollTop() + $(scrollPn).height() - 50
        var elemTop = elem.offset().top
        var elemBot = elem.offset().top + elem.height()

        // 在可视范围内
        if (elemTop > winTop && elemBot < winBot) {
            return true
        } else {
            return false
        }
    }

    /**
     * 获取当前手机网络状态 
     * 返回 Number 3 为wifi 6为4G
     */
    WallE.prototype.showNet = function () {
        myNetInfo = plus.networkinfo.getCurrentType()
        return myNetInfo
        // if(window.plus){
        //     root.showNet();
        // }else{
        //     document.addEventListener("plusready", showNet, false);
        // }
    }

    /**
     * 扩展方法和属性
     * extend
     */
    WallE.prototype.extend = function (obj) {
        Object.keys(obj).forEach(function (key) {
            var index = key
            var item = obj[key]
            wall[index] = item
        })
    }

    /**
     * 判断ios 和 android
     * 返回 ios android pc
     */
    WallE.prototype.whichEnd = function () {
        // 判断设备
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'android'
        } else if (isiOS) {
            return 'ios'
        } else {
            return 'pc'
        }
    }
    /**
     * animation 动画效果
     * #1 弹簧式
     * #2 淡入淡出
     * #3 不规则下落
     * 
     */
    WallE.prototype.animation = function () {
        
    }
    
    /**
     * alert弹窗
     */
    WallE.prototype.alert = function () {
        var alert_ele = $('.wall-alert-content')
        var halfalertcontentheight =  - alert_ele.height() / 2 + 'px'
        // alert_ele.css("marginTop", halfalertcontentheight)

    }

    


    /**
     * 基于jq layui的ajax请求加载动画设置
     * iconNum layui 加载动画号
     * loadingAnimation 自定义加载动画
     */
    WallE.prototype.loadingShow = function (loadingAnimation) {
        // iconNum ? iconNum : iconNum = 0
        // 用户未自定义加载动画
        if (!loadingAnimation) {
            var index
            $('html,body').ajaxStart(function () {
                index = layer.load(iconNum, {
                    shade: false
                }); //0代表加载的风格，支持0-2
            });
            $('html,body').ajaxStop(function () {
                layer.close(index)
            });

            return false
        }

        // 用户已自定义加载动画
        $('html,body').ajaxStart(function () {
            
        });
        $('html,body').ajaxStop(function () {
            
        });
    }





    window.wall = new WallE()
})()