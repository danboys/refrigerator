var ui = ui || {};
ui.util = ui.util || {};
ui.util = {
    controller : function(appId, callback){
        var sAppId = appId;
        if ($('[data-app]').data('app') == sAppId){
            callback();
        }
    },
    getUrlVars: function () {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return ui.util.getUrlVars()[name];
    },
    wait: function (e) {
        var t = $.Deferred();
        setTimeout(t.resolve, e);
        return t.promise();
    },
    UserEvent: function () {
        var _events = {};
        this.addListener = this.on = function (types, listener) {
            var typeArray = types.split(" ");
            for (var i = 0; i < typeArray.length; i++) {
                var type = typeArray[i];
                if (_events[type] == undefined) _events[type] = [];

                _events[type].push(listener);
            }
        };

        this.once = function (types, listener) {
            var typeArray = types.split(" ");
            for (var i = 0; i < typeArray.length; i++) {
                var type = typeArray[i];
                if (_events[type] == undefined) _events[type] = [];

                _events[type].push((function (type) {
                    return function () {
                        listener.apply(null, arguments);

                        var index = _events[type].indexOf(this);
                        _events[type].splice(index, 1);
                    };
                })(type));
            }
        };

        this.removeListener = function (types, listener) {
            var typeArray = types.split(" ");
            for (var i = 0; i < typeArray.length; i++) {
                if (!_events[typeArray[i]]) continue;
                var type = typeArray[i], index = _events[type].indexOf(listener);
                if (index != -1) _events[type].splice(index, 1);
            }
        };

        this.removeAllListeners = function (types) {
            var typeArray = types.split(" ");
            for (var i = 0; i < typeArray.length; i++) {
                var type = typeArray[i];
                _events[type] = [];
            }

        };

        this.emit = function (types) {
            var typeArray = types.split(" ");

            var args = new Array(arguments.length - 1);
            for (i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];

            for (var i = 0; i < typeArray.length; i++) {
                var type = typeArray[i], targetEvent = _events[type];
                if (targetEvent == undefined) continue;

                targetEvent.forEach(function (v) {
                    v.apply(null, args);
                });
            }
        };
    },
    checkOs: function () {
        var oAgent = new jindo.$Agent();
        var oOS = oAgent.os();
        // console.log(oOS);
        if (oOS.win) {
            $('html').addClass('win');
            if (oOS.win7) {
                $('html').addClass('osWin');
            } else if (oOS.win7) {
                $('html').addClass('osWin7');
            } else if (oOS.win8) {
                $('html').addClass('osWin8');
            } else if (oOS.win2000) {
                $('html').addClass('osWin2000');
            } else if (oOS.winxp) {
                $('html').addClass('osWinxp');
            } else if (oOS.xpsp2) {
                $('html').addClass('osWinxp');
            } else if (oOS.version == "10.0") {
                $('html').addClass('osWin10');
            }
        }
        if (oOS.mac) {
            $('html').addClass('osMac')
        }
        if (oOS.ios) {
            $('html').addClass('osIos')
            if (oOS.ipad) {
                $('html').addClass('osIpad')
            } else if (oOS.iphone) {
                $('html').addClass('osIphone');
                $('html').addClass('osMobile');
            }
        }
        if (oOS.android) {
            $('html').addClass('osAndroid');
            $('html').addClass('osMobile');
        }

        if (oOS.nokia) {
            $('html').addClass('osNokia');
            $('html').addClass('osMobile');
        }
    },
    checkBrowser: function () {
        var oAgent = new jindo.$Agent().navigator();
        //console.log(oAgent);
        if (oAgent.chrome) {
            $('html').addClass('browserChrome');
        }
        if (oAgent.edge) {
            $('html').addClass('browserEdge');
        }
        if (oAgent.firefox) {
            $('html').addClass('browserFirefox');
        }
        if (oAgent.ie) {
            $('html').addClass('browserIe');
        }
        if (oAgent.mozilla) {
            $('html').addClass('browserMozilla');
        }
        if (oAgent.msafari) {
            $('html').addClass('browserMsafari');
        }
        if (oAgent.safari) {
            $('html').addClass('browserSafari');
        }
        if (oAgent.webkit) {
            $('html').addClass('browserWebkit');
        }
        if (oAgent.version != null) {
            $('html').addClass('browserVer' + oAgent.version);
        }
    }
};











/* 수공 화면 */
var fn_format01 = function(num,point){
    var getResult = "";
    if(point =='0'){
        getResult = numeral(num).format('0,0');
    }else if(point =='-1'){
        getResult = numeral(num).format('0,0.0');
    }else if(point =='-2'){
        getResult = numeral(num).format('0,0.00');
    }else if(point =='-3'){
        getResult = numeral(num).format('0,0.000');
    }else if(point > 0){
        var calText = num;
        if(calText.indexOf(".") > 0){
            calText = calText.substring(0,calText.indexOf("."));
        }
        calText = calText.substring(0, calText.length-point);
        getResult = numeral(calText).format('0,0');
    }else{
        getResult = numeral(num).format('0,0');
    }
    // console.log(getResult);
    return getResult;
};

var fn_format00 = function (num){
    var intTb = num;
    intTb = intTb.substring(0,1);
    if(intTb =='.'){
        intTb = "0"+num;
    }else if(intTb =='-'){
        intTb = "0"+num.substring(1);
    }else{
        intTb = num;
    }
    return intTb;
};

var fn_formatNComma = function(text){
    return text.replace(/,/g,"");
};