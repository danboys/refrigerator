/*
 * Jindo
 * @type mobile
 * @version 2.12.1
 *
 * NAVER Corp; JindoJS JavaScript Framework
 * http://jindo.dev.naver.com/
 *
 * Released under the LGPL v2 license
 * http://www.gnu.org/licenses/old-licenses/lgpl-2.0.html
 */

function _settingPolyfill(e, t, n, r, i) {
    (i || !e[t].prototype[n]) && (e[t].prototype[n] = r)
}
function polyfillArray(e) {
    function t(e) {
        if ("function" != typeof e)throw new TypeError("callback is not a function.")
    }

    _settingPolyfill(e, "Array", "forEach", function (e, n) {
        t(e);
        for (var r = arguments.length >= 2 ? n : void 0, i = 0, o = this.length; o > i; i++)e.call(r, this[i], i, this)
    }), _settingPolyfill(e, "Array", "every", function (e, n) {
        t(e);
        for (var r = arguments.length >= 2 ? n : void 0, i = 0, o = this.length; o > i; i++)if (!e.call(r, this[i], i, this))return !1;
        return !0
    })
}
function polyfillTimer(e) {
    function t() {
        var t, n = e.Date.now(), r = {};
        for (var i in l) {
            var o = l[i];
            f[o.clearType](l[i].key), delete l[i], o.timerType == d && (t = n - o.createdTime, o.delay = t >= o.delay ? 0 : o.delay - t), o.isCall || (o.key = f[o.timerType](o.callback.bind(o), o.delay), r[i] = o)
        }
        l = r, r = null
    }

    var n, r = e.navigator.userAgent, i = /i(Pad|Phone|Pod)/.test(r);
    if (i) {
        var o = r.match(/OS\s(\d)/);
        o && (n = parseInt(o[1], 10))
    }
    var s = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame, a = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.msCancelAnimationFrame;
    if (s && !a) {
        var c = {}, u = s;
        s = function (e) {
            function t() {
                c[n] && e()
            }

            var n = u(t);
            return c[n] = !0, n
        }, a = function (e) {
            delete c[e]
        }
    } else s && a || (s = function (t) {
        return e.setTimeout(t, 16)
    }, a = e.clearTimeout);
    if (e.requestAnimationFrame = s, e.cancelAnimationFrame = a, n >= 6 && e.requestAnimationFrame(function () {
        }), 6 == n) {
        var l = {}, d = "setTimeout", p = "clearTimeout", h = "setInterval", m = "clearInterval", f = {
            setTimeout: e.setTimeout.bind(e),
            clearTimeout: e.clearTimeout.bind(e),
            setInterval: e.setInterval.bind(e),
            clearInterval: e.clearInterval.bind(e)
        };
        [[d, p], [h, m]].forEach(function (t) {
            e[t[0]] = function (t, n) {
                return function (r, i) {
                    var o = {
                        key: "", isCall: !1, timerType: t, clearType: n, realCallback: r, callback: function () {
                            var e = this.realCallback;
                            e(), this.timerType === d && (this.isCall = !0, delete l[this.key])
                        }, delay: i, createdTime: e.Date.now()
                    };
                    return o.key = f[t](o.callback.bind(o), i), l[o.key] = o, o.key
                }
            }(t[0], t[1]), e[t[1]] = function (e) {
                return function (t) {
                    t && l[t] && (f[e](l[t].key), delete l[t])
                }
            }(t[1])
        }), e.addEventListener("scroll", function () {
            t()
        })
    }
    return e
}
var jindo = window.jindo || {};
jindo._p_ = {}, jindo._p_.jindoName = "jindo", !function () {
    if (window[jindo._p_.jindoName]) {
        var e = window[jindo._p_.jindoName];
        for (var t in e)jindo[t] = e[t]
    }
}(), window.__isPolyfillTestMode || polyfillArray(window), Function.prototype.bind || (Function.prototype.bind = function (e) {
    if ("function" != typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var t = Array.prototype.slice.call(arguments, 1), n = this, r = function () {
    }, i = function () {
        return n.apply(r.prototype && this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
    };
    return r.prototype = this.prototype, i.prototype = new r, i
}), window.__isPolyfillTestMode || polyfillTimer(window), jindo._p_._j_ag = navigator.userAgent, jindo._p_._JINDO_IS_FF = jindo._p_._j_ag.indexOf("Firefox") > -1, jindo._p_._JINDO_IS_OP = jindo._p_._j_ag.indexOf("Opera") > -1, jindo._p_._JINDO_IS_SP = /Version\/[\d\.]+\s(Mobile\/[\d\w]+\s)?(?=Safari)/.test(jindo._p_._j_ag), jindo._p_._JINDO_IS_CH = /(Chrome|CriOS)\/[\d\.]+\s(Mobile(\/[\w\d]+)?\s)?Safari\/[\d\.]+(\s\([\w\d-]+\))?$/.test(jindo._p_._j_ag), jindo._p_._JINDO_IS_WK = jindo._p_._j_ag.indexOf("WebKit") > -1, jindo._p_._JINDO_IS_MO = /(iPhone|iPod|Mobile|Tizen|Android|Nokia|webOS|BlackBerry|Opera Mobi|Opera Mini)/.test(jindo._p_._j_ag), jindo._p_.trim = function (e) {
    var t = "\\s|\\t|" + String.fromCharCode(12288), n = new RegExp(["^(?:", ")+|(?:", ")+$"].join(t), "g");
    return e.replace(n, "")
}, jindo.$Jindo = function () {
    var e = arguments.callee, t = e._cached;
    return t ? t : this instanceof e ? void(t || (e._cached = this)) : new e
}, jindo._p_.addExtension = function (e, t, n) {
    jindo[e][t] ? jindo.$Jindo._warn(e + "." + t + " was overwrite.") : /^x/.test(t) ? jindo[e][t] = n : jindo.$Jindo._warn("The Extension Method(" + e + "." + t + ") must be used with x prefix.")
}, jindo.$Jindo.compatible = function () {
    return !1
}, jindo.$Jindo.mixin = function (e, t) {
    g_checkVarType(arguments, {obj: ["oDestination:Hash+", "oSource:Hash+"]}, "<static> $Jindo#mixin");
    var n = {};
    for (var r in e)n[r] = e[r];
    for (r in t)t.hasOwnProperty(r) && !jindo.$Jindo.isHash(t[r]) && (n[r] = t[r]);
    return n
}, jindo._p_._objToString = Object.prototype.toString, jindo.$Error = function (e, t) {
    this.message = "	method : " + t + "\n	message : " + e, this.type = "Jindo Custom Error", this.toString = function () {
        return this.message + "\n	" + this.type
    }
}, jindo.$Except = {
    CANNOT_USE_OPTION: "해당 옵션은 사용할 수 없습니다.",
    CANNOT_USE_HEADER: "type이 jsonp 또는 데스크탑 환경에서 CORS 호출시 XDomainRequest(IE8,9) 객체가 사용되는 경우 header메서드는 사용할 수 없습니다.",
    PARSE_ERROR: "파싱중 에러가 발생했습니다.",
    NOT_FOUND_ARGUMENT: "파라미터가 없습니다.",
    NOT_STANDARD_QUERY: "css셀렉터가 정상적이지 않습니다.",
    INVALID_DATE: "날짜 포멧이 아닙니다.",
    REQUIRE_AJAX: "가 없습니다.",
    NOT_FOUND_ELEMENT: "엘리먼트가 없습니다.",
    HAS_FUNCTION_FOR_GROUP: "그룹으로 지우지 않는 경우 detach할 함수가 있어야 합니다.",
    NONE_ELEMENT: "에 해당하는 엘리먼트가 없습니다.",
    NOT_SUPPORT_SELECTOR: "는 지원하지 않는 selector입니다.",
    NOT_SUPPORT_CORS: "현재 브라우저는 CORS를 지원하지 않습니다.",
    NOT_SUPPORT_METHOD: "desktop에서 지원하지 않는 메서드 입니다.",
    JSON_MUST_HAVE_ARRAY_HASH: "get메서드는 json타입이 hash나 array타입만 가능합니다.",
    MUST_APPEND_DOM: "document에 붙지 않은 엘리먼트를 기준 엘리먼트로 사용할 수 없습니다.",
    NOT_USE_CSS: "는 css를 사용 할수 없습니다.",
    NOT_WORK_DOMREADY: "domready이벤트는 iframe안에서 사용할 수 없습니다.",
    CANNOT_SET_OBJ_PROPERTY: "속성은 오브젝트입니다.\n클래스 속성이 오브젝트이면 모든 인스턴스가 공유하기 때문에 위험합니다.",
    NOT_FOUND_HANDLEBARS: "{{not_found_handlebars}}"
}, jindo._p_._toArray = function (e) {
    return Array.prototype.slice.apply(e)
};
try {
    Array.prototype.slice.apply(document.documentElement.childNodes)
} catch (e) {
    jindo._p_._toArray = function (e) {
        for (var t = [], n = e.length, r = 0; n > r; r++)t.push(e[r]);
        return t
    }
}
jindo.$Jindo.isNumeric = function (e) {
    return !isNaN(parseFloat(e)) && !jindo.$Jindo.isArray(e) && isFinite(e)
}, function () {
    var e = {Element: 1, Document: 9};
    for (var t in e)jindo.$Jindo["is" + t] = function (e, t) {
        return function (n) {
            return new RegExp(e).test(jindo._p_._objToString.call(n)) ? !0 : "[object Object]" == jindo._p_._objToString.call(n) && null !== n && void 0 !== n && n.nodeType == t ? !0 : !1
        }
    }(t, e[t]);
    for (var n = ["Function", "Array", "String", "Boolean", "Date", "RegExp"], t = 0, r = n.length; r > t; t++)jindo.$Jindo["is" + n[t]] = function (e) {
        return function (t) {
            return jindo._p_._objToString.call(t) == "[object " + e + "]"
        }
    }(n[t])
}(), jindo.$Jindo.isNode = function (e) {
    try {
        return !(!e || !e.nodeType)
    } catch (t) {
        return !1
    }
}, jindo.$Jindo.isHash = function (e) {
    return "[object Object]" == jindo._p_._objToString.call(e) && null !== e && void 0 !== e && !e.nodeType && !jindo.$Jindo.isWindow(e)
}, jindo.$Jindo.isNull = function (e) {
    return null === e
}, jindo.$Jindo.isUndefined = function (e) {
    return void 0 === e
}, jindo.$Jindo.isWindow = function (e) {
    return e && (e == window.top || e == e.window)
}, jindo.$Jindo.Break = function () {
    if (!(this instanceof arguments.callee))throw new arguments.callee
}, jindo.$Jindo.Continue = function () {
    if (!(this instanceof arguments.callee))throw new arguments.callee
}, jindo.$Jindo._F = function (e) {
    return e
}, jindo.$Jindo._warn = function (e) {
    window.console && (console.warn && console.warn(e), !0)
}, jindo.$Jindo._maxWarn = function (e, t, n) {
    e > t && jindo.$Jindo._warn("추가적인 파라미터가 있습니다. : " + n)
}, jindo.$Jindo.checkVarType = function (e, t, n) {
    var n = n || e.callee.name || "anonymous", r = jindo.$Jindo, i = r.compatible(), o = e.callee["_checkVarType_" + i];
    if (o)return o(e, t, n);
    var s = [];
    s.push("var nArgsLen = aArgs.length;"), s.push("var $Jindo = " + jindo._p_.jindoName + ".$Jindo;"), i && (s.push("var nMatchScore;"), s.push("var nMaxMatchScore = -1;"), s.push("var oFinalRet = null;"));
    var a = [], c = 0;
    for (var u in t)t.hasOwnProperty(u) && (c = Math.max(t[u].length, c));
    for (var u in t)if (t.hasOwnProperty(u)) {
        var l = t[u], d = l.length, p = [], h = [], m = [];
        i || h.push(c > d ? "nArgsLen === " + d : "nArgsLen >= " + d), m.push("var oRet = new $Jindo._varTypeRetObj();");
        for (var f = d, _ = 0; d > _; ++_) {
            var g = /^([^:]+):([^\+]*)(\+?)$/.exec(l[_]), y = g[1], v = g[2], j = !!g[3];
            if ("Variant" === v)i && h.push(_ + " in aArgs"), m.push('oRet["' + y + '"] = aArgs[' + _ + "];"), f--; else if (r._varTypeList[v]) {
                var $ = "tmp" + v + "_" + _;
                p.push("var " + $ + " = $Jindo._varTypeList." + v + "(aArgs[" + _ + "], " + j + ");"), h.push($ + " !== " + jindo._p_.jindoName + ".$Jindo.VARTYPE_NOT_MATCHED"), m.push('oRet["' + y + '"] = ' + $ + ";")
            } else if (/^\$/.test(v) && jindo[v]) {
                var E, b = "";
                j && (E = {
                        $Fn: "Function",
                        $S: "String",
                        $A: "Array",
                        $H: "Hash",
                        $ElementList: "Array"
                    }[v] || v.replace(/^\$/, ""), jindo.$Jindo["is" + E] && (b = " || $Jindo.is" + E + "(vNativeArg_" + _ + ")")), h.push("(aArgs[" + _ + "] instanceof " + jindo._p_.jindoName + "." + v + b + ")"), m.push('oRet["' + y + '"] = ' + jindo._p_.jindoName + "." + v + "(aArgs[" + _ + "]);")
            } else {
                if (!jindo.$Jindo["is" + v])throw new Error("VarType(" + v + ") Not Found");
                var w, b = "";
                j && (w = {
                        Function: "$Fn",
                        String: "$S",
                        Array: "$A",
                        Hash: "$H"
                    }[v] || "$" + v, jindo[w] && (b = " || aArgs[" + _ + "] instanceof " + jindo._p_.jindoName + "." + w)), h.push("($Jindo.is" + v + "(aArgs[" + _ + "])" + b + ")"), m.push('oRet["' + y + '"] = vNativeArg_' + _ + ";")
            }
        }
        m.push('oRet.__type = "' + u + '";'), i ? (m.push("nMatchScore = " + (1e3 * d + 10 * f) + " + (nArgsLen === " + d + " ? 1 : 0);"), m.push("if (nMatchScore > nMaxMatchScore) {"), m.push("	nMaxMatchScore = nMatchScore;"), m.push("	oFinalRet = oRet;"), m.push("}")) : m.push("return oRet;"), a.push(p.join("\n")), h.length && a.push("if (" + h.join(" && ") + ") {"), a.push(m.join("\n")), h.length && a.push("}")
    }
    s.push("	$Jindo._maxWarn(nArgsLen," + c + ',"' + n + '");');
    for (var _ = 0; c > _; ++_) {
        var T = "aArgs[" + _ + "]";
        s.push(["var vNativeArg_", _, " = ", T, " && ", T, ".$value ? ", T, ".$value() : ", T + ";"].join(""))
    }
    return i || a.push("$Jindo.checkVarType._throwException(aArgs, oRules, sFuncName);"), a.push("return oFinalRet;"), e.callee["_checkVarType_" + i] = o = new Function("aArgs,oRules,sFuncName", s.join("\n") + a.join("\n")), o(e, t, n)
};
var g_checkVarType = jindo.$Jindo.checkVarType;
jindo.$Jindo._varTypeRetObj = function () {
}, jindo.$Jindo._varTypeRetObj.prototype.toString = function () {
    return this.__type
}, jindo.$Jindo.checkVarType._throwException = function (e, t, n) {
    for (var r = function (e) {
        for (var t in jindo)if (jindo.hasOwnProperty(t)) {
            var n = jindo[t];
            if ("function" != typeof n)continue;
            if (e instanceof n)return t
        }
        var r = jindo.$Jindo;
        for (var t in r)if (r.hasOwnProperty(t)) {
            if (!/^is(.+)$/.test(t))continue;
            var i = RegExp.$1, o = r[t];
            if (o(e))return i
        }
        return "Unknown"
    }, i = function (e, t, n) {
        var r = ["잘못된 파라미터입니다.", ""];
        if (e && (r.push("호출한 형태 :"), r.push("	" + e), r.push("")), t.length) {
            r.push("사용 가능한 형태 :");
            for (var i = 0, o = t.length; o > i; i++)r.push("	" + t[i]);
            r.push("")
        }
        return n && (r.push("매뉴얼 페이지 :"), r.push("	" + n), r.push("")), r.unshift(), r.join("\n")
    }, o = [], s = 0, a = e.length; a > s; ++s)try {
        o.push(r(e[s]))
    } catch (c) {
        o.push("Unknown")
    }
    var u = n + "(" + o.join(", ") + ")", l = [];
    for (var d in t)if (t.hasOwnProperty(d)) {
        var p = t[d];
        l.push("" + n + "(" + p.join(", ").replace(/(^|,\s)[^:]+:/g, "$1") + ")")
    }
    var h;
    throw/(\$\w+)#(\w+)?/.test(n) && (h = "http://jindo.dev.naver.com/docs/jindo/2.12.1/desktop/ko/classes/jindo." + encodeURIComponent(RegExp.$1) + ".html#method_" + RegExp.$2), new TypeError(i(u, l, h))
}, jindo.$Jindo.varType = function () {
    var e = this.checkVarType(arguments, {
        s4str: ["sTypeName:String+", "fpFunc:Function+"],
        s4obj: ["oTypeLists:Hash+"],
        g: ["sTypeName:String+"]
    }), t = jindo.$Jindo._denyTypeListComma;
    switch (e + "") {
        case"s4str":
            var n = "," + e.sTypeName.replace(/\+$/, "") + ",";
            if (t.indexOf(n) > -1)throw new Error("Not allowed Variable Type");
            return this._varTypeList[e.sTypeName] = e.fpFunc, this;
        case"s4obj":
            var r, i = e.oTypeLists;
            for (var o in i)i.hasOwnProperty(o) && (r = i[o], arguments.callee.call(this, o, r));
            return this;
        case"g":
            return this._varTypeList[e.sTypeName]
    }
}, jindo.$Jindo.VARTYPE_NOT_MATCHED = {}, function () {
    var e = jindo.$Jindo._varTypeList = {}, t = jindo.$Jindo, n = t.VARTYPE_NOT_MATCHED;
    e.Numeric = function (e) {
        return t.isNumeric(e) ? 1 * e : n
    }, e.Hash = function (e, r) {
        return r && jindo.$H && e instanceof jindo.$H ? e.$value() : t.isHash(e) ? e : n
    }, e.$Class = function (e) {
        return t.isFunction(e) && e.extend ? e : n
    };
    var r = [];
    for (var i in t)t.hasOwnProperty(i) && /^is(.+)$/.test(i) && r.push(RegExp.$1);
    t._denyTypeListComma = r.join(","), t.varType("ArrayStyle", function (e) {
        return e && (/(Arguments|NodeList|HTMLCollection|global|Window)/.test(jindo._p_._objToString.call(e)) || /Object/.test(jindo._p_._objToString.call(e)) && t.isNumeric(e.length)) ? jindo._p_._toArray(e) : n
    }), t.varType("Form", function (e, t) {
        return e ? (t && e.$value && (e = e.$value()), e.tagName && "FORM" == e.tagName.toUpperCase() ? e : n) : n
    })
}(), jindo._p_._createEle = function (e, t, n, r) {
    var i = "R" + (new Date).getTime() + parseInt(1e5 * Math.random(), 10), o = n.createElement("div");
    switch (e) {
        case"select":
        case"table":
        case"dl":
        case"ul":
        case"fieldset":
        case"audio":
            o.innerHTML = "<" + e + ' class="' + i + '">' + t + "</" + e + ">";
            break;
        case"thead":
        case"tbody":
        case"col":
            o.innerHTML = "<table><" + e + ' class="' + i + '">' + t + "</" + e + "></table>";
            break;
        case"tr":
            o.innerHTML = '<table><tbody><tr class="' + i + '">' + t + "</tr></tbody></table>";
            break;
        default:
            o.innerHTML = '<div class="' + i + '">' + t + "</div>"
    }
    var s;
    for (s = o.firstChild; s && s.className != i; s = s.firstChild);
    return r ? s : s.childNodes
}, jindo.$ = function () {
    if (!arguments.length)throw new jindo.$Error(jindo.$Except.NOT_FOUND_ARGUMENT, "$");
    var e = [], t = arguments, n = t.length, r = t[n - 1], i = document, o = null, s = /^<([a-z]+|h[1-5])>$/i, a = /^<([a-z]+|h[1-5])(\s+[^>]+)?>/i;
    n > 1 && "string" != typeof r && r.body && (t = Array.prototype.slice.apply(t, [0, n - 1]), i = r);
    for (var c = 0; n > c; c++) {
        if (o = t[c] && t[c].$value ? t[c].$value() : t[c], jindo.$Jindo.isString(o) || jindo.$Jindo.isNumeric(o))if (o += "", o = o.replace(/^\s+|\s+$/g, ""), o = o.replace(/<!--(.|\n)*?-->/g, ""), o.indexOf("<") > -1) {
            if (s.test(o))o = i.createElement(RegExp.$1); else if (a.test(o)) {
                for (var u = {
                    thead: "table",
                    tbody: "table",
                    tr: "tbody",
                    td: "tr",
                    dt: "dl",
                    dd: "dl",
                    li: "ul",
                    legend: "fieldset",
                    option: "select",
                    source: "audio"
                }, l = RegExp.$1.toLowerCase(), d = jindo._p_._createEle(u[l], o, i), c = 0, p = d.length; p > c; c++)e.push(d[c]);
                o = null
            }
        } else o = i.getElementById(o);
        o && o.nodeType && (e[e.length] = o)
    }
    return e.length > 1 ? e : e[0] || null
}, jindo.$Class = function (oDef) {
    function typeClass() {
        for (var t = this, a = [], superFunc = function (m, superClass, func) {
            if ("constructor" != m && func.toString().indexOf("$super") > -1) {
                var funcArg = func.toString().replace(/function\s*\(([^\)]*)[\w\W]*/g, "$1").split(","), funcStr = func.toString().replace(/function[^{]*{/, "").replace(/(\w|\.?)(this\.\$super|this)/g, function (e, t, n) {
                    return t ? e : n + ".$super"
                });
                funcStr = funcStr.substr(0, funcStr.length - 1), func = superClass[m] = eval("false||function(" + funcArg.join(",") + "){" + funcStr + "}")
            }
            return function () {
                var e = this.$this[m], t = this.$this, n = (t[m] = func).apply(t, arguments);
                return t[m] = e, n
            }
        }; void 0 !== t._$superClass;) {
            t.$super = new Object, t.$super.$this = this;
            for (var x in t._$superClass.prototype)t._$superClass.prototype.hasOwnProperty(x) && (void 0 === this[x] && "$init" != x && (this[x] = t._$superClass.prototype[x]), t.$super[x] = "constructor" != x && "_$superClass" != x && "function" == typeof t._$superClass.prototype[x] ? superFunc(x, t._$superClass, t._$superClass.prototype[x]) : t._$superClass.prototype[x]);
            "function" == typeof t.$super.$init && (a[a.length] = t), t = t.$super
        }
        for (var i = a.length - 1; i > -1; i--)a[i].$super.$init.apply(a[i].$super, arguments);
        if (this.$autoBind)for (var i in this)/^\_/.test(i) && "function" == typeof this[i] && (this[i] = jindo.$Fn(this[i], this).bind());
        "function" == typeof this.$init && this.$init.apply(this, arguments)
    }

    var oArgs = g_checkVarType(arguments, {"4obj": ["oDef:Hash+"]}, "$Class");
    if (void 0 !== oDef.$static) {
        var i = 0, x;
        for (x in oDef)oDef.hasOwnProperty(x) && ("$static" == x || i++);
        for (x in oDef.$static)oDef.$static.hasOwnProperty(x) && (typeClass[x] = oDef.$static[x]);
        if (!i)return oDef.$static;
        delete oDef.$static
    }
    return typeClass.prototype = oDef, typeClass.prototype.constructor = typeClass, typeClass.prototype.kindOf = function (e) {
        return jindo._p_._kindOf(this.constructor.prototype, e.prototype)
    }, typeClass.extend = jindo.$Class.extend, typeClass
}, jindo._p_._kindOf = function (e, t) {
    return e != t ? e._$superClass ? jindo._p_._kindOf(e._$superClass.prototype, t) : !1 : !0
}, jindo.$Class.extend = function (e) {
    g_checkVarType(arguments, {"4obj": ["oDef:$Class"]}, "<static> $Class#extend");
    this.prototype._$superClass = e;
    var t = e.prototype;
    for (var n in t)jindo.$Jindo.isHash(t[n]) && jindo.$Jindo._warn(jindo.$Except.CANNOT_SET_OBJ_PROPERTY);
    for (var r in e)if (e.hasOwnProperty(r)) {
        if ("prototype" == r)continue;
        this[r] = e[r]
    }
    return this
}, jindo.VERSION = "2.12.1", jindo.TYPE = "mobile", jindo.$$ = jindo.cssquery = function () {
    function e() {
        var e = m._dummyWrap;
        e || (m._dummyWrap = e = document.createElement("div"), e.id = "__jindo_cssquery_mockdiv", e.style.cssText = "display:none !important;", e.className = "This element is for jindo.$$.test", document.body.insertBefore(e, document.body.firstChild)), m._dummyWrap = e
    }

    function t(e) {
        return /\[\s*(?:checked|selected|disabled)/.test(e)
    }

    function n(e, t) {
        return e.replace(/\,/gi, t)
    }

    function r(e) {
        return /^[~>+]/.test(e)
    }

    function i(e) {
        if (!e)return document;
        var t;
        return e = e && e.$value ? e.$value() : e, jindo.$Jindo.isString(e) && (e = document.getElementById(e)), t = e.nodeType, 1 != t && 9 != t && 10 != t && 11 != t && (e = e.ownerDocument || e.document), e || e.ownerDocument || e.document
    }

    function o(e, t) {
        var n, r;
        return /^\w+$/.test(e.id) ? n = "#" + e.id : (r = "C" + (new Date).getTime() + Math.floor(1e6 * Math.random()), e.setAttribute(t, r), n = "[" + t + "=" + r + "]"), n
    }

    function s(e, t) {
        var n = {method: null, query: null};
        return /^\s*[a-z]+\s*$/i.test(e) ? n.method = "getElementsByTagName" : /^\s*([#\.])([\w\-]+)\s*$/i.test(e) && (n.method = "#" == RegExp.$1 ? "getElementById" : "getElementsByClassName", n.query = RegExp.$2), (!t[n.method] || "#" == RegExp.$1 && 9 != t.nodeType) && (n.method = n.query = null), n
    }

    function a(e) {
        var t, n, r, i = [], o = {};
        for (r = 0; n = e[r]; r++)t = c(n), o[t] || (i.push(n), o[t] = !0);
        return i
    }

    function c(e) {
        var t = e._cssquery_UID;
        return t && _[t] == e ? t : (e._cssquery_UID = t = f++, _[t] = e, t)
    }

    function u(e) {
        var t = [], n = e.match(g);
        if (n)if (y.test(n[3])) {
            var r, i = n[3].replace(v, function (e, t) {
                return r = t, jindo._p_.trim(e.replace(t, ""))
            });
            t.push({left: n[1], com: n[2], right: jindo._p_.trim(r)});
            for (var o = u(i), s = 0, a = o.length; a > s; s++)t.push(o[s])
        } else t.push({left: n[1], com: n[2], right: n[3]}); else t.push({left: e, com: "", right: ""});
        return t
    }

    function l(e, t, n) {
        var r = t;
        1 == t.nodeType && (r = t.ownerDocument || t.document);
        for (var i = u(e), o = [r], s = 0, c = i.length; c > s; s++)o = d(i[s], o, n && n.single && s == i.length - 1);
        return o ? a(o) : []
    }

    function d(e, t, n) {
        var r = e.com;
        switch (r) {
            case"!":
            case"!>":
                return p("parentNode", e, t, "!" == r, n);
            case"!~":
            case"!+":
                return p("previousElementSibling", e, t, "!~" == r, n);
            default:
                return h(e, t, n)
        }
    }

    function p(e, t, n, r, i) {
        var o = [], s = [];
        if (t.left)for (var a = 0, c = n.length; c > a; a++)o = o.concat(m(t.left, n[a])); else o = n;
        for (var u, l = t.right, a = 0, c = o.length; c > a; a++) {
            if (u = o[a][e], r)for (; u && !(m.test(u, l) && (s.push(u), s.length > 0 && i));)u = u[e]; else u && m.test(u, l) && s.push(u);
            if (s.length > 0 && i)break
        }
        return s
    }

    function h(e, t, n) {
        for (var r = [], i = 0, o = t.length; o > i && (r = r.concat(m(e.left, t[i])), !(r.length > 0 && n)); i++);
        return r
    }

    var m;
    this._dummyWrap;
    var f = 1, _ = {}, g = /(.*?)\s*(![>+~]?)\s*(.*)/, y = /[!>~+\s]/, v = /(.*?)[!>~+\s]/, j = document.createElement("div");
    return m = function (e, a, c) {
        var u, d, p, h, m, f, _, g, y, v = (jindo.$Jindo.checkVarType(arguments, {
            "4str": ["sQuery:String+"],
            "4var": ["sQuery:String+", "oParent:Variant"],
            "4var2": ["sQuery:String+", "oParent:Variant", "oOptions:Variant"]
        }, "cssquery"), "queryid");
        a = i(a), c = c && c.$value ? c.$value() : c;
        var $ = /\[(.*?)=([\w\d]*)\]/g;
        if ($.test(e) && (e = e.replace($, "[$1='$2']")), t(e))throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_SELECTOR, c && c.single ? "<static> cssquery.getSingle" : "cssquery");
        if (d = a.nodeType, _ = (a.tagName || "").toUpperCase(), y = s(e, a), y.query && (e = y.query), y = y.method, 9 !== d && "HTML" != _)11 === d && (a = a.cloneNode(!0), f = j.cloneNode(!0), f.appendChild(a), a = f, f = null), y || (m = o(a, v), e = n(m + " " + e, ", " + m + " ")), (g = a.parentNode) || "BODY" === _ || jindo.$Element._contain((a.ownerDocument || a.document).body, a) ? y || (h = a, a = g) : y || (f = j.cloneNode(!0), h = a, f.appendChild(h), a = f); else if (a = a.ownerDocument || a.document || a, r(e))return [];
        try {
            !/!=/.test(e) && e.indexOf("!") > -1 ? u = l(e, a, c) : c && c.single ? y ? (u = a[y](e), u = ["getElementById" == y ? u : u[0]]) : u = [a.querySelector(e)] : (y ? (u = a[y](e), "getElementById" == y && (u = u ? [u] : [])) : u = a.querySelectorAll(e), u = jindo._p_._toArray(u))
        } catch (E) {
            throw E
        } finally {
            p && (h.removeAttribute(v), f = null)
        }
        return u
    }, m.test = function (t, n) {
        m._dummyWrap || e();
        var r = !1;
        if (1 == t.nodeType) {
            var i = t.cloneNode(!1);
            m._dummyWrap.appendChild(i), r = m.getSingle(n, m._dummyWrap) ? !0 : !1, m._dummyWrap.innerHTML = ""
        }
        return r
    }, m.useCache = function () {
    }, m.clearCache = function () {
    }, m.release = function () {
    }, m.getSingle = function (e, t) {
        return m(e, t, {single: !0})[0] || null
    }, m.extreme = function () {
    }, m._makeQueryParseTree = u, m
}(), jindo.$Agent = function () {
    var e = arguments.callee, t = e._cached;
    return t ? t : this instanceof e ? (t || (e._cached = this), this._navigator = navigator, void(this._dm = document.documentMode)) : new e
}, jindo.$Agent.prototype.navigator = function () {
    function e(e, t) {
        return (t || "").indexOf(e) > -1
    }

    var t = {}, n = -1, r = -1, i = this._navigator.userAgent, o = (this._navigator.vendor || "", this._dm);
    t.getName = function () {
        var e = "";
        for (var n in t)"mobile" !== n && "boolean" == typeof t[n] && t[n] && t.hasOwnProperty(n) && (e = n);
        return e
    }, t.webkit = e("WebKit", i), t.opera = void 0 !== window.opera || e("Opera", i) || e("OPR", i), t.chrome = t.webkit && !t.opera && e("Chrome", i) || e("CriOS", i), t.firefox = e("Firefox", i), t.mobile = (e("Mobile", i) || e("Android", i) || e("Nokia", i) || e("webOS", i) || e("Opera Mini", i) || e("Opera Mobile", i) || e("BlackBerry", i) || e("Windows", i) && e("PPC", i) || e("Smartphone", i) || e("IEMobile", i)) && !(e("iPad", i) || e("Tablet", i)), t.msafari = (!e("IEMobile", i) && e("Mobile", i) || e("iPad", i) && e("Safari", i)) && !t.chrome && !t.opera && !t.firefox, t.mopera = e("Opera Mini", i), t.mie = e("PPC", i) || e("Smartphone", i) || e("IEMobile", i);
    try {
        if (t.mie)if (o > 0)if (n = o, i.match(/(?:Trident)\/([\d.]+)/)) {
            var s = parseInt(RegExp.$1, 10);
            s > 3 && (r = s + 4)
        } else r = n; else r = n = i.match(/(?:MSIE) ([\d.]+)/)[1]; else t.msafari ? (n = parseFloat(i.match(/Safari\/([\d.]+)/)[1]), n = 100 == n ? 1.1 : i.match(/Version\/([\d.]+)/) ? RegExp.$1 : [1, 1.2, -1, 1.3, 2, 3][Math.floor(n / 100)]) : t.mopera ? n = i.match(/(?:Opera\sMini)\/([\d.]+)/)[1] : t.opera ? n = i.match(/(?:Version|OPR|Opera)[\/\s]?([\d.]+)(?!.*Version)/)[1] : t.firefox ? n = i.match(/Firefox\/([\d.]+)/)[1] : t.chrome && (n = i.match(/Chrome[ \/]([\d.]+)/)[1]);
        t.version = parseFloat(n), t.nativeVersion = parseFloat(r), isNaN(t.version) && (t.version = -1)
    } catch (a) {
        t.version = -1
    }
    return this.navigator = function () {
        return t
    }, t
}, jindo.$Agent.prototype.os = function () {
    var e = {}, t = this._navigator.userAgent, n = (this._navigator.platform, function (e, t) {
        return t.indexOf(e) > -1
    }), r = null;
    return e.getName = function () {
        var t = "";
        for (var n in e)e[n] === !0 && e.hasOwnProperty(n) && (t = n);
        return t
    }, e.ipad = n("iPad", t), e.iphone = n("iPhone", t) && !e.ipad, e.android = n("Android", t), e.nokia = n("Nokia", t), e.blackberry = n("BlackBerry", t), e.mwin = n("PPC", t) || n("Smartphone", t) || n("IEMobile", t) || n("Windows Phone", t), e.ios = e.ipad || e.iphone, e.symbianos = n("SymbianOS", t), e.version = null, e.android ? (r = t.match(/Android ([\d|\.]+)/), null != r && void 0 != r[1] && (e.version = r[1])) : e.ios ? (r = t.match(/(iPhone )?OS ([\d|_]+)/), null != r && void 0 != r[2] && (e.version = String(r[2]).split("_").join("."))) : e.blackberry ? (r = t.match(/Version\/([\d|\.]+)/), null == r && (r = t.match(/BlackBerry\s?\d{4}\/([\d|\.]+)/)), null != r && void 0 != r[1] && (e.version = r[1])) : e.symbianos ? (r = t.match(/SymbianOS\/(\d+.\w+)/), null != r && void 0 != r[1] && (e.version = r[1])) : e.mwin && (r = t.match(/Windows CE ([\d|\.]+)/), null != r && void 0 != r[1] && (e.version = r[1]), !e.version && (r = t.match(/Windows Phone (OS )?([\d|\.]+)/)) && (e.version = r[2])), this.os = function () {
        return e
    }, e
}, jindo.$A = function (e) {
    var t = arguments.callee;
    if (e instanceof t)return e;
    if (!(this instanceof t))try {
        return jindo.$Jindo._maxWarn(arguments.length, 1, "$A"), new t(e)
    } catch (n) {
        if (n instanceof TypeError)return null;
        throw n
    }
    var r = g_checkVarType(arguments, {
        "4voi": [],
        "4arr": ["aPram:Array+"],
        "4nul": ["oNull:Null"],
        "4und": ["oUndefined:Undefined"],
        arrt: ["aPram:ArrayStyle"]
    }, "$A");
    switch (null == r && (e = []), r + "") {
        case"arrt":
        case"4arr":
            e = r.aPram;
            break;
        case"4nul":
        case"4und":
        case"4voi":
            e = []
    }
    this._array = [];
    for (var i = 0; i < e.length; i++)this._array[this._array.length] = e[i]
}, jindo.$A.checkVarTypeObj = {
    "4fun": ["fCallback:Function+"],
    "4thi": ["fCallback:Function+", "oThis:Variant"]
}, jindo.$A.prototype.toString = function () {
    return this._array.toString()
}, jindo.$A.prototype.get = function (e) {
    return g_checkVarType(arguments, {"4num": ["nIndex:Numeric"]}, "$A#get"), this._array[e]
}, jindo.$A.prototype.set = function (e, t) {
    return g_checkVarType(arguments, {"4num": ["nIndex:Numeric", "vValue:Variant"]}, "$A#set"), this._array[e] = t, this
}, jindo.$A.prototype.length = function (e) {
    var t = g_checkVarType(arguments, {
        "4num": [jindo.$Jindo._F("nLen:Numeric")],
        sv: ["nLen:Numeric", "vValue:Variant"],
        "4voi": []
    }, "$A#length");
    switch (t + "") {
        case"4num":
            return this._array.length = t.nLen, this;
        case"sv":
            var n = this._array.length;
            this._array.length = t.nLen;
            for (var r = n; e > r; r++)this._array[r] = t.vValue;
            return this;
        case"4voi":
            return this._array.length
    }
}, jindo.$A.prototype.has = function (e) {
    return this.indexOf(e) > -1
}, jindo.$A.prototype.indexOf = function (e) {
    return this._array.indexOf(e)
}, jindo.$A.prototype.$value = function () {
    return this._array
}, jindo.$A.prototype.push = function () {
    return this._array.push.apply(this._array, jindo._p_._toArray(arguments))
}, jindo.$A.prototype.pop = function () {
    return this._array.pop()
}, jindo.$A.prototype.shift = function () {
    return this._array.shift()
}, jindo.$A.prototype.unshift = function () {
    return this._array.unshift.apply(this._array, jindo._p_._toArray(arguments)), this._array.length
}, jindo.$A.prototype.forEach = function (e, t) {
    function n() {
        try {
            e.apply(t || r, jindo._p_._toArray(arguments))
        } catch (n) {
            if (!(n instanceof r.constructor.Continue))throw n
        }
    }

    var r = (g_checkVarType(arguments, jindo.$A.checkVarTypeObj, "$A#forEach"), this);
    try {
        this._array.forEach(n)
    } catch (i) {
        if (!(i instanceof this.constructor.Break))throw i
    }
    return this
}, jindo.$A.prototype.slice = function (e, t) {
    var n = this._array.slice.call(this._array, e, t);
    return jindo.$A(n)
}, jindo.$A.prototype.splice = function () {
    var e = this._array.splice.apply(this._array, jindo._p_._toArray(arguments));
    return jindo.$A(e)
}, jindo.$A.prototype.shuffle = function () {
    return this._array.sort(function () {
        return Math.random() > Math.random() ? 1 : -1
    }), this
}, jindo.$A.prototype.reverse = function () {
    return this._array.reverse(), this
}, jindo.$A.prototype.empty = function () {
    return this._array.length = 0, this
}, jindo.$A.prototype.concat = function () {
    var e = [];
    if (arguments.length) {
        e = this._array.concat();
        for (var t, n = 0; t = arguments[n]; n++)e = e.concat(t instanceof jindo.$A ? t._array : t);
        return jindo.$A(e)
    }
    return this
}, jindo.$A.prototype.sort = function (e) {
    var t = g_checkVarType(arguments, {"void": [], "4fp": ["fpSort:Function+"]}, "$A#sort");
    return e ? this._array.sort(jindo.$Fn(t.fpSort, this).bind()) : this._array.sort(), this
}, jindo.$A.Break = jindo.$Jindo.Break, jindo.$A.Continue = jindo.$Jindo.Continue, jindo.$A.prototype.map = function (e, t) {
    function n(n) {
        try {
            i.push(e.apply(t || this, jindo._p_._toArray(arguments)))
        } catch (r) {
            if (!(r instanceof o.constructor.Continue))throw r;
            i.push(n)
        }
    }

    var r = g_checkVarType(arguments, jindo.$A.checkVarTypeObj, "$A#map");
    if (null == r)return this;
    var i = [], o = this;
    return this.forEach(n), jindo.$A(i)
}, jindo.$A.prototype.filter = function (e, t) {
    function n(n) {
        try {
            e.apply(t || o, jindo._p_._toArray(arguments)) && i.push(n)
        } catch (r) {
            if (!(r instanceof o.constructor.Continue))throw r
        }
    }

    var r = g_checkVarType(arguments, jindo.$A.checkVarTypeObj, "$A#filter");
    if (null == r)return this;
    var i = [], o = this;
    try {
        this.forEach(n)
    } catch (s) {
        if (!(s instanceof this.constructor.Break))throw s
    }
    return jindo.$A(i)
}, jindo.$A.prototype.every = function (e, t) {
    return g_checkVarType(arguments, jindo.$A.checkVarTypeObj, "$A#every"), this._array.every(e, t || this)
}, jindo.$A.prototype.some = function (e, t) {
    return g_checkVarType(arguments, jindo.$A.checkVarTypeObj, "$A#some"), this._array.some(e, t || this)
}, jindo.$A.prototype.refuse = function () {
    var e = jindo.$A(jindo._p_._toArray(arguments));
    return this.filter(function (t) {
        return !(e.indexOf(t) > -1)
    })
}, jindo.$A.prototype.unique = function () {
    var e, t, n = this._array, r = [], i = n.length;
    for (e = 0; i > e; e++) {
        for (t = 0; t < r.length && n[e] != r[t]; t++);
        t >= r.length && (r[t] = n[e])
    }
    return this._array = r, this
}, jindo.$H = function (e) {
    var t = arguments.callee;
    if (e instanceof t)return e;
    if (!(this instanceof t))try {
        return jindo.$Jindo._maxWarn(arguments.length, 1, "$H"), new t(e || {})
    } catch (n) {
        if (n instanceof TypeError)return null;
        throw n
    }
    g_checkVarType(arguments, {"4obj": ["oObj:Hash+"], "4vod": []}, "$H");
    this._table = {};
    for (var r in e)e.hasOwnProperty(r) && (this._table[r] = e[r])
}, jindo.$H.prototype.$value = function () {
    return this._table
}, jindo.$H.prototype.$ = function (e, t) {
    var n = g_checkVarType(arguments, {
        s4var: [jindo.$Jindo._F("key:String+"), "value:Variant"],
        s4var2: ["key:Numeric", "value:Variant"],
        g4str: ["key:String+"],
        s4obj: ["oObj:Hash+"],
        g4num: ["key:Numeric"]
    }, "$H#$");
    switch (n + "") {
        case"s4var":
        case"s4var2":
            return this._table[e] = t, this;
        case"s4obj":
            var r = n.oObj;
            for (var i in r)r.hasOwnProperty(i) && (this._table[i] = r[i]);
            return this;
        default:
            return this._table[e]
    }
}, jindo.$H.prototype.length = function () {
    var e = 0, t = this.__jindo_sorted_index;
    if (t)return t.length;
    for (var n in this._table)if (this._table.hasOwnProperty(n)) {
        if (void 0 !== Object.prototype[n] && Object.prototype[n] === this._table[n])continue;
        e++
    }
    return e
}, jindo.$H.prototype.forEach = function (e, t) {
    var n = (g_checkVarType(arguments, {
        "4fun": ["callback:Function+"],
        "4obj": ["callback:Function+", "thisObject:Variant"]
    }, "$H#forEach"), this._table), r = this.constructor, i = this.__jindo_sorted_index;
    if (i)for (var o = 0, s = i.length; s > o; o++)try {
        var a = i[o];
        e.call(t || this, n[a], a, n)
    } catch (c) {
        if (c instanceof r.Break)break;
        if (c instanceof r.Continue)continue;
        throw c
    } else for (var a in n)if (n.hasOwnProperty(a)) {
        if (!n.propertyIsEnumerable(a))continue;
        try {
            e.call(t || this, n[a], a, n)
        } catch (c) {
            if (c instanceof r.Break)break;
            if (c instanceof r.Continue)continue;
            throw c
        }
    }
    return this
}, jindo.$H.prototype.filter = function (e, t) {
    var n = (g_checkVarType(arguments, {
        "4fun": ["callback:Function+"],
        "4obj": ["callback:Function+", "thisObject:Variant"]
    }, "$H#filter"), jindo.$H()), r = this._table, i = this.constructor;
    for (var o in r)if (r.hasOwnProperty(o)) {
        if (!r.propertyIsEnumerable(o))continue;
        try {
            e.call(t || this, r[o], o, r) && n.add(o, r[o])
        } catch (s) {
            if (s instanceof i.Break)break;
            if (s instanceof i.Continue)continue;
            throw s
        }
    }
    return n
}, jindo.$H.prototype.map = function (e, t) {
    var n = (g_checkVarType(arguments, {
        "4fun": ["callback:Function+"],
        "4obj": ["callback:Function+", "thisObject:Variant"]
    }, "$H#map"), jindo.$H()), r = this._table, i = this.constructor;
    for (var o in r)if (r.hasOwnProperty(o)) {
        if (!r.propertyIsEnumerable(o))continue;
        try {
            n.add(o, e.call(t || this, r[o], o, r))
        } catch (s) {
            if (s instanceof i.Break)break;
            if (!(s instanceof i.Continue))throw s;
            n.add(o, r[o])
        }
    }
    return n
}, jindo.$H.prototype.add = function (e, t) {
    var n = (g_checkVarType(arguments, {
        "4str": ["key:String+", "value:Variant"],
        "4num": ["key:Numeric", "value:Variant"]
    }, "$H#add"), this.__jindo_sorted_index);
    return n && void 0 == this._table[e] && this.__jindo_sorted_index.push(e), this._table[e] = t, this
}, jindo.$H.prototype.remove = function (e) {
    g_checkVarType(arguments, {"4str": ["key:String+"], "4num": ["key:Numeric"]}, "$H#remove");
    if (void 0 === this._table[e])return null;
    var t = this._table[e];
    delete this._table[e];
    var n = this.__jindo_sorted_index;
    if (n) {
        for (var r = [], i = 0, o = n.length; o > i; i++)n[i] != e && r.push(n[i]);
        this.__jindo_sorted_index = r
    }
    return t
}, jindo.$H.prototype.search = function (e) {
    var t = (g_checkVarType(arguments, {"4str": ["value:Variant"]}, "$H#search"), !1), n = this._table;
    for (var r in n)if (n.hasOwnProperty(r)) {
        if (!n.propertyIsEnumerable(r))continue;
        var i = n[r];
        if (i === e) {
            t = r;
            break
        }
    }
    return t
}, jindo.$H.prototype.hasKey = function (e) {
    g_checkVarType(arguments, {"4str": ["key:String+"], "4num": ["key:Numeric"]}, "$H#hasKey");
    return void 0 !== this._table[e]
}, jindo.$H.prototype.hasValue = function (e) {
    g_checkVarType(arguments, {"4str": ["value:Variant"]}, "$H#hasValue");
    return this.search(e) !== !1
}, jindo._p_.defaultSort = function (e, t, n) {
    var r = [], i = e.fpSort;
    for (var o in t._table)t._table.hasOwnProperty(o) && !function (e, t) {
        r.push({key: e, val: t})
    }(o, t._table[o]);
    e + "" == "vo" && (i = function (e, t) {
        return e === t ? 0 : e > t ? 1 : -1
    }), r.sort(function (e, r) {
        return i.call(t, e[n], r[n])
    });
    for (var s = [], a = 0, c = r.length; c > a; a++)s.push(r[a].key);
    return s
}, jindo.$H.prototype.sort = function () {
    var e = g_checkVarType(arguments, {vo: [], "4fp": ["fpSort:Function+"]}, "$H#sort");
    return this.__jindo_sorted_index = jindo._p_.defaultSort(e, this, "val"), this
}, jindo.$H.prototype.ksort = function () {
    var e = g_checkVarType(arguments, {vo: [], "4fp": ["fpSort:Function+"]}, "$H#ksort");
    return this.__jindo_sorted_index = jindo._p_.defaultSort(e, this, "key"), this
}, jindo.$H.prototype.keys = function () {
    var e = this.__jindo_sorted_index;
    if (!e)if (Object.keys)e = Object.keys(this._table); else {
        e = [];
        for (var t in this._table)this._table.hasOwnProperty(t) && e.push(t)
    }
    return e
}, jindo.$H.prototype.values = function () {
    var e = [];
    for (var t in this._table)this._table.hasOwnProperty(t) && (e[e.length] = this._table[t]);
    return e
}, jindo.$H.prototype.toQueryString = function () {
    var e = [], t = null;
    for (var n in this._table)if (this._table.hasOwnProperty(n))if (t = this._table[n], jindo.$Jindo.isArray(t))for (var r = 0; r < t.length; r++)e[e.length] = encodeURIComponent(n) + "[]=" + encodeURIComponent(t[r] + ""); else e[e.length] = encodeURIComponent(n) + "=" + encodeURIComponent(this._table[n] + "");
    return e.join("&")
}, jindo.$H.prototype.empty = function () {
    return this._table = {}, delete this.__jindo_sorted_index, this
}, jindo.$H.Break = jindo.$Jindo.Break, jindo.$H.Continue = jindo.$Jindo.Continue, jindo.$Fn = function (func, thisObject) {
    var cl = arguments.callee;
    if (func instanceof cl)return func;
    if (!(this instanceof cl))try {
        return jindo.$Jindo._maxWarn(arguments.length, 2, "$Fn"), new cl(func, thisObject)
    } catch (e) {
        if (e instanceof TypeError)return null;
        throw e
    }
    var oArgs = g_checkVarType(arguments, {
        "4fun": ["func:Function+"],
        "4fun2": ["func:Function+", "thisObject:Variant"],
        "4str": ["func:String+", "thisObject:String+"]
    }, "$Fn");
    switch (this._tmpElm = null, this._key = null, oArgs + "") {
        case"4str":
            this._func = eval("false||function(" + func + "){" + thisObject + "}");
            break;
        case"4fun":
        case"4fun2":
            this._func = func, this._this = thisObject
    }
}, jindo.$Fn._commonPram = function (e, t) {
    return g_checkVarType(e, {
        "4ele": ["eElement:Element+", "sEvent:String+"],
        "4ele2": ["eElement:Element+", "sEvent:String+", "bUseCapture:Boolean"],
        "4str": ["eElement:String+", "sEvent:String+"],
        "4str2": ["eElement:String+", "sEvent:String+", "bUseCapture:Boolean"],
        "4arr": ["aElement:Array+", "sEvent:String+"],
        "4arr2": ["aElement:Array+", "sEvent:String+", "bUseCapture:Boolean"],
        "4doc": ["eElement:Document+", "sEvent:String+"],
        "4win": ["eElement:Window+", "sEvent:String+"],
        "4doc2": ["eElement:Document+", "sEvent:String+", "bUseCapture:Boolean"],
        "4win2": ["eElement:Window+", "sEvent:String+", "bUseCapture:Boolean"]
    }, t)
}, jindo.$Fn.prototype.$value = function () {
    return this._func
}, jindo.$Fn.prototype.bind = function () {
    var e, t = jindo._p_._toArray(arguments), n = this._func, r = this._this || this;
    return n.bind ? (t.unshift(r), e = Function.prototype.bind.apply(n, t)) : e = function () {
        var e = jindo._p_._toArray(arguments);
        return t.length && (e = t.concat(e)), n.apply(r, e)
    }, e
}, jindo.$Fn.prototype.attach = function (e, t, n) {
    {
        var r, i = jindo.$Fn._commonPram(arguments, "$Fn#attach"), o = null, s = t, a = e;
        jindo._p_._j_ag
    }
    switch (n !== !0 && (n = !1), this._bUseCapture = n, i + "") {
        case"4arr":
        case"4arr2":
            for (var a = i.aElement, s = i.sEvent, c = 0, r = a.length; r > c; c++)this.attach(a[c], s, !!n);
            return this
    }
    return o = this._bind = this._bind ? this._bind : this.bind(), jindo.$Element(a).attach(s, o), this
}, jindo.$Fn.prototype.detach = function (e, t, n) {
    {
        var r, i = jindo.$Fn._commonPram(arguments, "$Fn#detach"), o = null, s = e, a = t;
        jindo._p_._j_ag
    }
    switch (i + "") {
        case"4arr":
        case"4arr2":
            for (var s = i.aElement, a = i.sEvent, c = 0, r = s.length; r > c; c++)this.detach(s[c], a, !!n);
            return this
    }
    return o = this._bind = this._bind ? this._bind : this.bind(), jindo.$Element(i.eElement).detach(i.sEvent, o), this
}, jindo.$Fn.prototype.delay = function (e, t) {
    var n = g_checkVarType(arguments, {"4num": ["nSec:Numeric"], "4arr": ["nSec:Numeric", "args:Array+"]}, "$Fn#delay");
    switch (n + "") {
        case"4num":
            t = t || [];
            break;
        case"4arr":
            t = n.args
    }
    return this._delayKey = setTimeout(this.bind.apply(this, t), 1e3 * e), this
}, jindo.$Fn.prototype.setInterval = function (e, t) {
    var n = g_checkVarType(arguments, {
        "4num": ["nSec:Numeric"],
        "4arr": ["nSec:Numeric", "args:Array+"]
    }, "$Fn#setInterval");
    switch (n + "") {
        case"4num":
            t = t || [];
            break;
        case"4arr":
            t = n.args
    }
    return this._repeatKey = setInterval(this.bind.apply(this, t), 1e3 * e), this
}, jindo.$Fn.prototype.repeat = jindo.$Fn.prototype.setInterval, jindo.$Fn.prototype.stopDelay = function () {
    return void 0 !== this._delayKey && (window.clearTimeout(this._delayKey), delete this._delayKey), this
}, jindo.$Fn.prototype.stopRepeat = function () {
    return void 0 !== this._repeatKey && (window.clearInterval(this._repeatKey), delete this._repeatKey), this
}, jindo.$Event = function (e) {
    var t = arguments.callee;
    return e instanceof t ? e : this instanceof t ? (this._event = this._posEvent = e, this._globalEvent = window.event, this.type = e.type.toLowerCase(), "dommousescroll" == this.type ? this.type = "mousewheel" : "domcontentloaded" == this.type && (this.type = "domready"), this.realType = this.type, this.isTouch = !1, this.type.indexOf("touch") > -1 && (this._posEvent = e.changedTouches[0], this.isTouch = !0), this.canceled = !1, this.srcElement = this.element = e.target || e.srcElement, this.currentElement = e.currentTarget, this.relatedElement = null, this.delegatedElement = null, void(jindo.$Jindo.isUndefined(e.relatedTarget) ? e.fromElement && e.toElement && (this.relatedElement = e["mouseout" == this.type ? "toElement" : "fromElement"]) : this.relatedElement = e.relatedTarget)) : new t(e)
}, jindo._p_.customEvent = {}, jindo._p_.customEventStore = {}, jindo._p_.normalCustomEvent = {}, jindo._p_.hasCustomEvent = function (e) {
    return !(!jindo._p_.getCustomEvent(e) && !jindo._p_.normalCustomEvent[e])
}, jindo._p_.getCustomEvent = function (e) {
    return jindo._p_.customEvent[e]
}, jindo._p_.addCustomEventListener = function (e, t, n, r, i) {
    jindo._p_.customEventStore[t] || (jindo._p_.customEventStore[t] = {}, jindo._p_.customEventStore[t].ele = e), jindo._p_.customEventStore[t][n] || (jindo._p_.customEventStore[t][n] = {}), jindo._p_.customEventStore[t][n][r] || (jindo._p_.customEventStore[t][n][r] = {custom: i})
}, jindo._p_.setCustomEventListener = function (e, t, n, r, i) {
    jindo._p_.customEventStore[e][t][n].real_listener = r, jindo._p_.customEventStore[e][t][n].wrap_listener = i
}, jindo._p_.getCustomEventListener = function (e, t, n) {
    var r = jindo._p_.customEventStore[e];
    return r && r[t] && r[t][n] ? r[t][n] : {}
}, jindo._p_.getNormalEventListener = function (e, t, n) {
    var r = jindo._p_.normalCustomEvent[t];
    return r && r[e] && r[e][n] ? r[e][n] : {}
}, jindo._p_.hasCustomEventListener = function (e, t, n) {
    var r = jindo._p_.customEventStore[e];
    return r && r[t] && r[t][n] ? !0 : !1
}, jindo.$Event.customEvent = function (e, t) {
    var n = g_checkVarType(arguments, {
        s4str: ["sName:String+"],
        s4obj: ["sName:String+", "oEvent:Hash+"]
    }, "$Event.customEvent");
    switch (n + "") {
        case"s4str":
            if (jindo._p_.hasCustomEvent(e))throw new jindo.$Error("The Custom Event Name have to unique.");
            return jindo._p_.normalCustomEvent[e] = {}, this;
        case"s4obj":
            if (jindo._p_.hasCustomEvent(e))throw new jindo.$Error("The Custom Event Name have to unique.");
            jindo._p_.normalCustomEvent[e] = {}, jindo._p_.customEvent[e] = function () {
                this.name = e, this.real_listener = [], this.wrap_listener = []
            };
            var r = jindo._p_.customEvent[e].prototype;
            r.events = [];
            for (var i in t)r[i] = t[i], r.events.push(i);
            return jindo._p_.customEvent[e].prototype.fireEvent = function (e) {
                for (var t = 0, n = this.wrap_listener.length; n > t; t++)this.wrap_listener[t](e)
            }, this
    }
}, jindo.$Event.prototype.mouse = function () {
    var e = this._event, t = (this.srcElement, 0), n = {};
    return e.wheelDelta ? t = e.wheelDelta / 120 : e.detail && (t = -e.detail / 3), n = {delta: t}, this.mouse = function () {
        return n
    }, n
}, jindo.$Event.prototype.key = function () {
    var e = this._event, t = e.keyCode || e.charCode, n = {
        keyCode: t,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey,
        shift: e.shiftKey,
        up: 38 == t,
        down: 40 == t,
        left: 37 == t,
        right: 39 == t,
        enter: 13 == t,
        esc: 27 == t
    };
    return this.key = function () {
        return n
    }, n
}, jindo.$Event.prototype.pos = function (e) {
    g_checkVarType(arguments, {voi: [], bol: ["bGetOffset:Boolean"]});
    var t = this._posEvent, n = this.srcElement.ownerDocument || document, r = n.body, i = n.documentElement, o = [r.scrollLeft || i.scrollLeft, r.scrollTop || i.scrollTop], s = {
        clientX: t.clientX,
        clientY: t.clientY,
        pageX: "pageX" in t ? t.pageX : t.clientX + o[0] - r.clientLeft,
        pageY: "pageY" in t ? t.pageY : t.clientY + o[1] - r.clientTop
    };
    if (e && jindo.$Element) {
        var a = jindo.$Element(this.srcElement).offset();
        s.offsetX = s.pageX - a.left, s.offsetY = s.pageY - a.top
    }
    return s
}, jindo.$Event.prototype.stop = function (e) {
    g_checkVarType(arguments, {voi: [], num: ["nCancel:Numeric"]}), e = e || jindo.$Event.CANCEL_ALL;
    var t = window.event && window.event == this._globalEvent ? this._globalEvent : this._event, n = !!(e & jindo.$Event.CANCEL_BUBBLE), r = !!(e & jindo.$Event.CANCEL_DEFAULT), i = this.realType;
    return !n || "focusin" !== i && "focusout" !== i || jindo.$Jindo._warn("The " + i + " event can't stop bubble."), this.canceled = !0, r && void 0 !== t.preventDefault && t.preventDefault(), n && void 0 !== t.stopPropagation && t.stopPropagation(), this
}, jindo.$Event.prototype.stopDefault = function () {
    return this.stop(jindo.$Event.CANCEL_DEFAULT)
}, jindo.$Event.prototype.stopBubble = function () {
    return this.stop(jindo.$Event.CANCEL_BUBBLE)
}, jindo.$Event.CANCEL_BUBBLE = 1, jindo.$Event.CANCEL_DEFAULT = 2, jindo.$Event.CANCEL_ALL = 3, jindo.$Event.prototype.$value = function () {
    return this._event
}, function (e) {
    for (var t = "Touch", n = "", r = 0, i = e.length; i > r; r++)n = e[r] + t, e[r] || (n = n.toLowerCase()), jindo.$Event.prototype[n] = function (e) {
        return function () {
            if (this.isTouch) {
                for (var t, n = [], r = this._event[e + "es"], i = r.length, o = 0; i > o; o++)t = r[o], n.push({
                    id: t.identifier,
                    event: this,
                    element: t.target,
                    _posEvent: t,
                    pos: jindo.$Event.prototype.pos
                });
                this[e] = function (t) {
                    var r = g_checkVarType(arguments, {"void": [], "4num": ["nIndex:Numeric"]}, "$Event#" + e);
                    return r + "" == "void" ? n : n[t]
                }
            } else this[e] = function () {
                throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_METHOD, "$Event#" + e)
            };
            return this[e].apply(this, jindo._p_._toArray(arguments))
        }
    }(n)
}(["changed", "target", ""]),jindo.$Element = function (e) {
    var t = arguments.callee;
    if (e && e instanceof t)return e;
    if (!(this instanceof t))try {
        return jindo.$Jindo._maxWarn(arguments.length, 1, "$Element"), new t(e)
    } catch (n) {
        if (n instanceof TypeError)return null;
        throw n
    }
    var r = jindo.$Jindo, i = r.checkVarType(arguments, {
        "4str": ["sID:String+"],
        "4nod": ["oEle:Node"],
        "4doc": ["oEle:Document+"],
        "4win": ["oEle:Window+"]
    }, "$Element");
    switch (i + "") {
        case"4str":
            e = jindo.$(e);
            break;
        default:
            e = i.oEle
    }
    if (this._element = e, null == this._element)throw new TypeError("{not_found_element}");
    this._element.__jindo__id ? this._key = this._element.__jindo__id : this._element.__jindo__id = this._key = jindo._p_._makeRandom(), this.tag = (this._element.tagName || "").toLowerCase()
},jindo._p_.NONE_GROUP = "_jindo_event_none",jindo._p_.splitEventSelector = function (e) {
    var t = e.match(/^([a-z_]*)(.*)/i), n = jindo._p_.trim(t[1]), r = jindo._p_.trim(t[2].replace("@", ""));
    return {type: r ? "delegate" : "normal", event: n, selector: r}
},jindo._p_._makeRandom = function () {
    return "e" + (new Date).getTime() + parseInt(1e8 * Math.random(), 10)
},jindo._p_.releaseEventHandlerForAllChildren = function (e) {
    var t, n = e._element.all || e._element.getElementsByTagName("*"), r = n.length, i = null;
    for (t = 0; r > t; t++)i = n[t], 1 == i.nodeType && i.__jindo__id && jindo.$Element.eventManager.cleanUpUsingKey(i.__jindo__id, !0);
    n = i = null
},jindo._p_.canUseClassList = function () {
    return jindo._p_.canUseClassList = function () {
        return "classList" in document.body && "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")
    }, jindo._p_.canUseClassList()
},jindo._p_.vendorPrefixObj = {
    "-moz": "Moz",
    "-ms": "ms",
    "-o": "O",
    "-webkit": "webkit"
},jindo._p_.cssNameToJavaScriptName = function (e) {
    if (/^(\-(?:moz|ms|o|webkit))/.test(e)) {
        var t = RegExp.$1;
        e = e.replace(t, jindo._p_.vendorPrefixObj[t])
    }
    return e.replace(/(:?-(\w))/g, function (e, e, t) {
        return t.toUpperCase()
    })
},jindo._p_.getStyleIncludeVendorPrefix = function (e) {
    for (var t = ["Transition", "Transform", "Animation", "Perspective"], n = ["webkit", "-", "Moz", "O", "ms"], r = "", i = "", o = "", s = {}, a = e || document.body.style, c = 0, u = t.length; u > c; c++) {
        r = t[c];
        for (var l = 0, d = n.length; d > l; l++) {
            if (i = n[l], o = "-" != i ? i + r : r.toLowerCase(), "undefined" != typeof a[o]) {
                s[r.toLowerCase()] = o;
                break
            }
            s[r.toLowerCase()] = !1
        }
    }
    return e ? s : (jindo._p_.getStyleIncludeVendorPrefix = function () {
        return s
    }, jindo._p_.getStyleIncludeVendorPrefix())
},jindo._p_.getTransformStringForValue = function (e) {
    var t = jindo._p_.getStyleIncludeVendorPrefix(e), n = t.transform;
    return "MozTransform" === t.transform ? n = "-moz-transform" : "webkitTransform" === t.transform ? n = "-webkit-transform" : "OTransform" === t.transform ? n = "-o-transform" : "msTransform" === t.transform && (n = "-ms-transform"), e ? n : (jindo._p_.getTransformStringForValue = function () {
        return n
    }, jindo._p_.getTransformStringForValue())
},jindo._p_.setOpacity = function (e, t) {
    e.offsetHeight, e.style.opacity = t
},jindo.$Element._eventBind = function (e, t, n, r) {
    e.addEventListener(t, n, !!r)
},jindo.$Element._unEventBind = function (e, t, n) {
    e.removeEventListener(t, n, !1)
},jindo.$Element.prototype.$value = function () {
    return this._element
},jindo.$Element.prototype.visible = function (e, t) {
    var n = g_checkVarType(arguments, {
        g: [],
        s4bln: [jindo.$Jindo._F("bVisible:Boolean")],
        s4str: ["bVisible:Boolean", "sDisplay:String+"]
    }, "$Element#visible");
    switch (n + "") {
        case"g":
            return "none" != this._getCss(this._element, "display");
        case"s4bln":
            return this[e ? "show" : "hide"](), this;
        case"s4str":
            return this[e ? "show" : "hide"](t), this
    }
},jindo.$Element.prototype.show = function (e) {
    var t = g_checkVarType(arguments, {
        "4voi": [],
        "4str": ["sDisplay:String+"]
    }, "$Element#show"), n = this._element.style, r = "block", i = {
        p: r,
        div: r,
        form: r,
        h1: r,
        h2: r,
        h3: r,
        h4: r,
        ol: r,
        ul: r,
        fieldset: r,
        td: "table-cell",
        th: "table-cell",
        li: "list-item",
        table: "table",
        thead: "table-header-group",
        tbody: "table-row-group",
        tfoot: "table-footer-group",
        tr: "table-row",
        col: "table-column",
        colgroup: "table-column-group",
        caption: "table-caption",
        dl: r,
        dt: r,
        dd: r
    };
    try {
        switch (t + "") {
            case"4voi":
                var o = i[this.tag];
                n.display = o || "inline";
                break;
            case"4str":
                n.display = e
        }
    } catch (s) {
        n.display = "block"
    }
    return this
},jindo.$Element.prototype.hide = function () {
    return this._element.style.display = "none", this
},jindo.$Element.prototype.toggle = function () {
    g_checkVarType(arguments, {"4voi": [], "4str": ["sDisplay:String+"]}, "$Element#toggle");
    return this["none" == this._getCss(this._element, "display") ? "show" : "hide"].apply(this, arguments), this
},jindo.$Element.prototype.opacity = function (e) {
    var t, n = g_checkVarType(arguments, {
        g: [],
        s: ["nOpacity:Numeric"],
        str: ["sOpacity:String"]
    }, "$Element#opacity"), r = this._element, i = "none" != this._getCss(r, "display");
    switch (n + "") {
        case"g":
            return i = "none" != this._getCss(r, "display"), (t = r.style.opacity).length || (t = this._getCss(r, "opacity")), t = parseFloat(t), isNaN(t) && (t = i ? 1 : 0), t;
        case"s":
            return e = n.nOpacity, r.style.zoom = 1, e = Math.max(Math.min(e, 1), 0), r.style.opacity = e, this;
        case"str":
            return "" === e && (r.style.zoom = r.style.opacity = ""), this
    }
},jindo._p_._revisionCSSAttr = function (e, t) {
    var n = jindo.$Element.hook(e);
    return e = n ? n : jindo._p_.cssNameToJavaScriptName(e).replace(/^(animation|perspective|transform|transition)/i, function (e) {
        return t[e.toLowerCase()]
    })
},jindo._p_.changeTransformValue = function (e, t) {
    return (e + "").replace(/([\s|-]*)(?:transform)/, function (e, n) {
        return jindo._p_.trim(n).length > 0 ? e : n + jindo._p_.getTransformStringForValue(t)
    })
},jindo.$Element.prototype.css = function (e, t) {
    var n = g_checkVarType(arguments, {
        g: ["sName:String+"],
        s4str: [jindo.$Jindo._F("sName:String+"), jindo.$Jindo._F("vValue:String+")],
        s4num: ["sName:String+", "vValue:Numeric"],
        s4obj: ["oObj:Hash+"]
    }, "$Element#css"), r = this._element;
    switch (n + "") {
        case"s4str":
        case"s4num":
            var i = {};
            e = jindo._p_._revisionCSSAttr(e, jindo._p_.getStyleIncludeVendorPrefix()), i[e] = t, e = i;
            break;
        case"s4obj":
            e = n.oObj;
            var i = {}, o = jindo._p_.getStyleIncludeVendorPrefix();
            for (var s in e)e.hasOwnProperty(s) && (i[jindo._p_._revisionCSSAttr(s, o)] = e[s]);
            e = i;
            break;
        case"g":
            var o = jindo._p_.getStyleIncludeVendorPrefix();
            e = jindo._p_._revisionCSSAttr(e, o);
            var a = this._getCss;
            if ("opacity" == e)return this.opacity();
            if ("padding" == e || "margin" == e) {
                var c = a(r, e + "Top"), u = a(r, e + "Right"), l = a(r, e + "Bottom"), d = a(r, e + "Left");
                return c == u && l == d ? c : c == l && u == d ? c + " " + u : c + " " + u + " " + l + " " + d
            }
            return a(r, e)
    }
    var p;
    for (var h in e)if (e.hasOwnProperty(h)) {
        if (p = e[h], !jindo.$Jindo.isString(p) && !jindo.$Jindo.isNumeric(p))continue;
        if ("opacity" == h) {
            this.opacity(p);
            continue
        }
        if ("backgroundPositionX" == h || "backgroundPositionY" == h) {
            var m = this.css("backgroundPosition").split(/\s+/);
            p = "backgroundPositionX" == h ? p + " " + m[1] : m[0] + " " + p, this._setCss(r, "backgroundPosition", p)
        } else this._setCss(r, h, /transition/i.test(h) ? jindo._p_.changeTransformValue(p) : p)
    }
    return this
},jindo.$Element.prototype._getCss = function (e, t) {
    try {
        "cssFloat" == t && (t = "float");
        var n = e.ownerDocument || e.document || document, r = e.style[t];
        if (!e.style[t]) {
            var i = n.defaultView.getComputedStyle(e, null);
            t = t.replace(/([A-Z])/g, "-$1").replace(/^(webkit|ms)/g, "-$1").toLowerCase(), r = i.getPropertyValue(t), r = void 0 === r ? i[t] : r
        }
        return "textDecoration" == t && (r = r.replace(",", "")), r
    } catch (o) {
        throw new jindo.$Error((e.tagName || "document") + jindo.$Except.NOT_USE_CSS, "$Element#css")
    }
},jindo.$Element.prototype._setCss = function (e, t, n) {
    e.style[t] = "#top#left#right#bottom#".indexOf(t + "#") > 0 && ("number" == typeof n || /\d$/.test(n)) ? parseInt(n, 10) + "px" : n
},jindo.$Element.prototype.attr = function (e, t) {
    var n, r, i, o, s, a = g_checkVarType(arguments, {
        g: ["sName:String+"],
        s4str: ["sName:String+", "vValue:String+"],
        s4num: ["sName:String+", "vValue:Numeric"],
        s4nul: ["sName:String+", "vValue:Null"],
        s4bln: ["sName:String+", "vValue:Boolean"],
        s4arr: ["sName:String+", "vValue:Array+"],
        s4obj: [jindo.$Jindo._F("oObj:Hash+")]
    }, "$Element#attr"), c = this._element, u = null;
    switch (a + "") {
        case"s4str":
        case"s4nul":
        case"s4num":
        case"s4bln":
        case"s4arr":
            var l = {};
            l[e] = t, e = l;
            break;
        case"s4obj":
            e = a.oObj;
            break;
        case"g":
            if ("class" == e || "className" == e)return c.className;
            if ("style" == e)return c.style.cssText;
            if ("checked" == e || "disabled" == e)return !!c[e];
            if ("value" == e) {
                if ("button" == this.tag)return c.getAttributeNode("value").value;
                if ("select" == this.tag) {
                    if (c.multiple) {
                        for (n = 0, r = c.options.length; r > n; n++)o = c.options[n], o.selected && (u || (u = []), t = o.value, "" == t && (t = o.text), u.push(t));
                        return u
                    }
                    return c.selectedIndex < 0 ? null : (t = c.options[c.selectedIndex].value, "" == t ? c.options[c.selectedIndex].text : t)
                }
                return c.value
            }
            return "href" == e ? c.getAttribute(e, 2) : c.getAttribute(e)
    }
    i = function (e, t) {
        var n, r, i, o = -1;
        for (n = 0, r = e.length; r > n; n++)if (i = e[n], i.value === t || i.text === t) {
            o = n;
            break
        }
        return o
    };
    for (var d in e)if (e.hasOwnProperty(d)) {
        var p = e[d];
        if (jindo.$Jindo.isNull(p))if ("select" == this.tag)if (c.multiple)for (n = 0, r = c.options.length; r > n; n++)c.options[n].selected = !1; else c.selectedIndex = -1; else c.removeAttribute(d); else if ("class" == d || "className" == d)c.className = p; else if ("style" == d)c.style.cssText = p; else if ("checked" == d || "disabled" == d)c[d] = p; else if ("value" == d)if ("select" == this.tag)if (c.multiple)if (jindo.$Jindo.isArray(p))for (s = jindo.$A(p), n = 0, r = c.options.length; r > n; n++)o = c.options[n], o.selected = s.has(o.value) || s.has(o.text); else c.selectedIndex = i(c.options, p); else c.selectedIndex = i(c.options, p); else c.value = p; else c.setAttribute(d, p)
    }
    return this
},jindo.$Element.prototype.width = function (e) {
    var t = g_checkVarType(arguments, {g: [], s: ["nWidth:Numeric"]}, "$Element#width");
    switch (t + "") {
        case"g":
            return this._element.offsetWidth;
        case"s":
            e = t.nWidth;
            var n = this._element;
            n.style.width = e + "px";
            var r = n.offsetWidth;
            if (r != e && 0 !== r) {
                var i = 2 * e - r;
                i > 0 && (n.style.width = i + "px")
            }
            return this
    }
},jindo.$Element.prototype.height = function (e) {
    var t = g_checkVarType(arguments, {g: [], s: ["nHeight:Numeric"]}, "$Element#height");
    switch (t + "") {
        case"g":
            return this._element.offsetHeight;
        case"s":
            e = t.nHeight;
            var n = this._element;
            n.style.height = e + "px";
            var r = n.offsetHeight;
            if (r != e && 0 !== r) {
                var e = 2 * e - r;
                e > 0 && (n.style.height = e + "px")
            }
            return this
    }
},jindo.$Element.prototype.className = function (e) {
    var t = g_checkVarType(arguments, {
        g: [],
        s: [jindo.$Jindo._F("sClass:String+")]
    }, "$Element#className"), n = this._element;
    switch (t + "") {
        case"g":
            return n.className;
        case"s":
            return n.className = e, this
    }
},jindo.$Element.prototype.hasClass = function () {
    var e = g_checkVarType;
    return jindo.$Element.prototype.hasClass = jindo._p_.canUseClassList() ? function (t) {
        e(arguments, {"4str": ["sClass:String+"]}, "$Element#hasClass");
        return this._element.classList.contains(t)
    } : function (t) {
        e(arguments, {"4str": ["sClass:String+"]}, "$Element#hasClass");
        return (" " + this._element.className + " ").indexOf(" " + t + " ") > -1
    }, this.hasClass.apply(this, arguments)
},jindo.$Element.prototype.addClass = function () {
    return jindo.$Element.prototype.addClass = this._element.classList ? function (e) {
        if (null == this._element)return this;
        for (var t = (g_checkVarType(arguments, {"4str": ["sClass:String+"]}, "$Element#addClass"), (e + "").split(/\s+/)), n = this._element.classList, r = t.length; r--;)"" != t[r] && n.add(t[r]);
        return this
    } : function (e) {
        for (var t, n = (g_checkVarType(arguments, {"4str": ["sClass:String+"]}, "$Element#addClass"), this._element), r = n.className, i = (e + "").split(" "), o = i.length - 1; o >= 0; o--)t = i[o], -1 == (" " + r + " ").indexOf(" " + t + " ") && (r = r + " " + t);
        return n.className = r.replace(/\s+$/, "").replace(/^\s+/, ""), this
    }, this.addClass.apply(this, arguments)
},jindo.$Element.prototype.removeClass = function () {
    return jindo.$Element.prototype.removeClass = this._element.classList ? function (e) {
        g_checkVarType(arguments, {"4str": ["sClass:String+"]}, "$Element#removeClass");
        if (null == this._element)return this;
        for (var t = this._element.classList, n = (e + "").split(" "), r = n.length; r--;)"" != n[r] && t.remove(n[r]);
        return this
    } : function (e) {
        for (var t = (g_checkVarType(arguments, {"4str": ["sClass:String+"]}, "$Element#removeClass"), this._element), n = t.className, r = (e + "").split(" "), i = r.length - 1; i >= 0; i--)/\W/g.test(r[i]) && (r[i] = r[i].replace(/(\W)/g, "\\$1")), n = (" " + n + " ").replace(new RegExp("\\s+" + r[i] + "(?=\\s+)", "g"), " ");
        return t.className = n.replace(/\s+$/, "").replace(/^\s+/, ""), this
    }, this.removeClass.apply(this, arguments)
},jindo.$Element.prototype.toggleClass = function () {
    var e = g_checkVarType;
    return jindo.$Element.prototype.toggleClass = jindo._p_.canUseClassList() ? function (t, n) {
        var r = e(arguments, {
            "4str": ["sClass:String+"],
            "4str2": ["sClass:String+", "sClass2:String+"]
        }, "$Element#toggleClass");
        switch (r + "") {
            case"4str":
                this._element.classList.toggle(t + "");
                break;
            case"4str2":
                t += "", n += "", this.hasClass(t) ? (this.removeClass(t), this.addClass(n)) : (this.addClass(t), this.removeClass(n))
        }
        return this
    } : function (t, n) {
        e(arguments, {
            "4str": ["sClass:String+"],
            "4str2": ["sClass:String+", "sClass2:String+"]
        }, "$Element#toggleClass");
        return n = n || "", this.hasClass(t) ? (this.removeClass(t), n && this.addClass(n)) : (this.addClass(t), n && this.removeClass(n)), this
    }, this.toggleClass.apply(this, arguments)
},jindo.$Element.prototype.cssClass = function (e) {
    var t = g_checkVarType(arguments, {
        g: ["sClass:String+"],
        s4bln: ["sClass:String+", "bCondition:Boolean"],
        s4obj: ["oObj:Hash+"]
    }, "$Element#cssClass");
    switch (t + "") {
        case"g":
            return this.hasClass(t.sClass);
        case"s4bln":
            return t.bCondition ? this.addClass(t.sClass) : this.removeClass(t.sClass), this;
        case"s4obj":
            var n = this._element;
            e = t.oObj;
            var r = n.className;
            for (var i in e)e.hasOwnProperty(i) && (e[i] ? -1 == (" " + r + " ").indexOf(" " + i + " ") && (r = (r + " " + i).replace(/^\s+/, "")) : (" " + r + " ").indexOf(" " + i + " ") > -1 && (r = (" " + r + " ").replace(" " + i + " ", " ").replace(/\s+$/, "").replace(/^\s+/, "")));
            return n.className = r, this
    }
},jindo.$Element.prototype.text = function (e) {
    var t, n, r = g_checkVarType(arguments, {
        g: [],
        s4str: ["sText:String+"],
        s4num: [jindo.$Jindo._F("sText:Numeric")],
        s4bln: ["sText:Boolean"]
    }, "$Element#text"), i = this._element, o = this.tag;
    switch (r + "") {
        case"g":
            return t = void 0 !== i.textContent ? "textContent" : "innerText", ("textarea" == o || "input" == o) && (t = "value"), i[t];
        case"s4str":
        case"s4num":
        case"s4bln":
            try {
                if ("textarea" == o || "input" == o)i.value = e + ""; else {
                    var n = i.ownerDocument || i.document || document;
                    this.empty(), i.appendChild(n.createTextNode(e))
                }
            } catch (s) {
                return i.innerHTML = (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;")
            }
            return this
    }
},jindo.$Element.prototype.html = function (e) {
    var t = g_checkVarType(arguments, {
        g: [],
        s4str: [jindo.$Jindo._F("sText:String+")],
        s4num: ["sText:Numeric"],
        s4bln: ["sText:Boolean"]
    }, "$Element#html");
    switch (t + "") {
        case"g":
            return this._element.innerHTML;
        case"s4str":
        case"s4num":
        case"s4bln":
            e += "";
            var n, r = this._element;
            if ("table" == this._element.tagName.toLowerCase() && !e.match(/<tbody[^>]*>/i) && e.match(/<(thead|tfoot|caption|colgroup|col|th|tr|td)[^>]*>(?:.*?)(<\/\1>)?/i)) {
                var i = r.ownerDocument || r.document || document;
                i.createDocumentFragment().appendChild(n = r.cloneNode(1)), n.innerHTML = e, n.getElementsByTagName("tbody").length || (e = n.innerHTML = ["<tbody>", "</tbody>"].join(n.innerHTML)), i = null
            }
            return r.innerHTML = e, this
    }
},jindo.$Element.prototype.outerHTML = function () {
    var e = this._element;
    if (e = jindo.$Jindo.isDocument(e) ? e.documentElement : e, void 0 !== e.outerHTML)return e.outerHTML;
    var t = e.ownerDocument || e.document || document, n = t.createElement("div"), r = e.parentNode;
    if (!r)return e.innerHTML;
    r.insertBefore(n, e), n.style.display = "none", n.appendChild(e);
    var i = n.innerHTML;
    return r.insertBefore(e, n), r.removeChild(n), i
},jindo.$Element.prototype.toString = function () {
    return this.outerHTML() || "[object $Element]"
},jindo.$Element.prototype.attach = function (e, t) {
    var n, r, i = g_checkVarType(arguments, {
        "4str": ["sEvent:String+", "fpCallback:Function+"],
        "4obj": ["hListener:Hash+"]
    }, "$Element#attach");
    switch (i + "") {
        case"4str":
            n = jindo._p_.splitEventSelector(i.sEvent), this._add(n.type, n.event, n.selector, t);
            break;
        case"4obj":
            r = i.hListener;
            for (var o in r)this.attach(o, r[o])
    }
    return this
},jindo.$Element.prototype.detach = function (e, t) {
    var n, r, i = g_checkVarType(arguments, {
        "4str": ["sEvent:String+", "fpCallback:Function+"],
        "4obj": ["hListener:Hash+"]
    }, "$Element#detach");
    switch (i + "") {
        case"4str":
            n = jindo._p_.splitEventSelector(i.sEvent), this._del(n.type, n.event, n.selector, t);
            break;
        case"4obj":
            r = i.hListener;
            for (var o in r)this.detach(o, r[o])
    }
    return this
},jindo.$Element.prototype.delegate = function (e, t, n) {
    g_checkVarType(arguments, {
        "4str": ["sEvent:String+", "vFilter:String+", "fpCallback:Function+"],
        "4fun": ["sEvent:String+", "vFilter:Function+", "fpCallback:Function+"]
    }, "$Element#delegate");
    return this._add("delegate", e, t, n)
},jindo.$Element.prototype.undelegate = function (e, t, n) {
    g_checkVarType(arguments, {
        "4str": ["sEvent:String+", "vFilter:String+", "fpCallback:Function+"],
        "4fun": ["sEvent:String+", "vFilter:Function+", "fpCallback:Function+"],
        group_for_string: ["sEvent:String+", "vFilter:String+"],
        group_for_function: ["sEvent:String+", "vFilter:Function+"]
    }, "$Element#undelegate");
    return this._del("delegate", e, t, n)
},jindo._p_.customEventAttach = function (e, t, n, r, i, o, s) {
    if (jindo._p_.hasCustomEventListener(o.__jindo__id, t, n)) {
        var a = jindo._p_.getCustomEventListener(o.__jindo__id, t, n).custom;
        a.real_listener && (a.real_listener.push(r), a.wrap_listener.push(i))
    } else {
        var c = jindo._p_.getCustomEvent(t), a = new c, u = a.events;
        a.real_listener.push(r), a.wrap_listener.push(i);
        for (var l = 0, d = u.length; d > l; l++)a["_fp" + u[l]] = jindo.$Fn(a[u[l]], a).bind(), s(e, u[l], n, a["_fp" + u[l]]);
        jindo._p_.addCustomEventListener(o, o.__jindo__id, t, n, a)
    }
},jindo._p_.normalCustomEventAttach = function (e, t, n, r, i, o) {
    jindo._p_.normalCustomEvent[t][n] || (jindo._p_.normalCustomEvent[t][n] = {}, jindo._p_.normalCustomEvent[t][n].ele = e, jindo._p_.normalCustomEvent[t][n][r] = {}, jindo._p_.normalCustomEvent[t][n][r].real_listener = [], jindo._p_.normalCustomEvent[t][n][r].wrap_listener = []), jindo._p_.normalCustomEvent[t][n][r].real_listener.push(i), jindo._p_.normalCustomEvent[t][n][r].wrap_listener.push(o)
},jindo.$Element.prototype._add = function (e, t, n, r) {
    var i = jindo.$Element.eventManager, o = t;
    t = t.toLowerCase();
    var s = i.splitGroup(t);
    t = s.event;
    var a = s.group, c = this._element, u = c.__jindo__id, l = c.ownerDocument || c.document || document;
    if (jindo._p_.hasCustomEvent(t)) {
        n = n || "_NONE_";
        var d = jindo.$Fn(r, this).bind();
        jindo._p_.normalCustomEventAttach(c, t, u, n, r, d), jindo._p_.getCustomEvent(t) && jindo._p_.customEventAttach(e, t, n, r, d, c, jindo.$Fn(this._add, this).bind())
    } else {
        if ("domready" == t && jindo.$Jindo.isWindow(c))return jindo.$Element(l).attach(t, r), this;
        if ("load" == t && c === l)return jindo.$Element(window).attach(t, r), this;
        t = i.revisionEvent(e, t, o), r = i.revisionCallback(e, t, o, r), i.isInit(this._key) || i.init(this._key, c), i.hasEvent(this._key, t, o) || i.initEvent(this, t, o, a), i.hasGroup(this._key, t, a) || i.initGroup(this._key, t, a), i.addEventListener(this._key, t, a, e, n, r)
    }
    return this
},jindo._p_.customEventDetach = function (e, t, n, r, i, o) {
    for (var s = jindo._p_.getCustomEventListener(i.__jindo__id, t, n), a = s.custom, c = a.events, u = 0, l = c.length; l > u; u++)o(e, c[u], n, a["_fp" + c[u]])
},jindo.$Element.prototype._del = function (e, t, n, r) {
    var i = jindo.$Element.eventManager, o = t;
    t = t.toLowerCase();
    var s = i.splitGroup(t);
    t = s.event;
    var a = s.group, c = this._element.ownerDocument || this._element.document || document;
    if (jindo._p_.hasCustomEvent(t)) {
        var u = this._element.__jindo__id;
        n = n || "_NONE_";
        for (var l = jindo._p_.getNormalEventListener(u, t, n), d = l.wrap_listener, p = l.real_listener, h = [], m = [], f = 0, _ = p.length; _ > f; f++)p[f] != r && (h.push(d[f]), m.push(p[f]));
        if (0 == m.length) {
            var g = jindo._p_.normalCustomEvent[t][u], y = 0;
            for (var f in g)if ("ele" !== f) {
                y++;
                break
            }
            0 === y ? delete jindo._p_.normalCustomEvent[t][u] : delete jindo._p_.normalCustomEvent[t][u][n]
        }
        jindo._p_.customEvent[t] && (jindo._p_.setCustomEventListener(u, t, n, m, h), 0 == m.length && (jindo._p_.customEventDetach(e, t, n, r, this._element, jindo.$Fn(this._del, this).bind()), delete jindo._p_.customEventStore[u][t][n]))
    } else {
        if ("domready" == t && jindo.$Jindo.isWindow(this._element))return jindo.$Element(c).detach(t, r), this;
        if ("load" == t && this._element === c)return jindo.$Element(window).detach(t, r), this;
        if (t = i.revisionEvent(e, t, o), a === jindo._p_.NONE_GROUP && !jindo.$Jindo.isFunction(r) && !n)throw new jindo.$Error(jindo.$Except.HAS_FUNCTION_FOR_GROUP, "$Element#" + ("normal" == e ? "detach" : "delegate"));
        i.removeEventListener(this._key, t, a, e, n, r)
    }
    return this
},jindo._p_.mouseTouchPointerEvent = function (e) {
    var t = {};
    return window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 ? t = {
        mousedown: "MSPointerDown",
        mouseup: "MSPointerUp",
        mousemove: "MSPointerMove",
        mouseover: "MSPointerOver",
        mouseout: "MSPointerOut",
        touchstart: "MSPointerDown",
        touchend: "MSPointerUp",
        touchmove: "MSPointerMove",
        pointerdown: "MSPointerDown",
        pointerup: "MSPointerUp",
        pointermove: "MSPointerMove",
        pointerover: "MSPointerOver",
        pointerout: "MSPointerOut",
        pointercancel: "MSPointerCancel"
    } : jindo._p_._JINDO_IS_MO && (t = {
        mousedown: "touchstart",
        mouseup: "touchend",
        mousemove: "touchmove",
        pointerdown: "touchstart",
        pointerup: "touchend",
        pointermove: "touchmove"
    }), jindo._p_.mouseTouchPointerEvent = function (e) {
        return t[e] ? t[e] : e
    }, jindo._p_.mouseTouchPointerEvent(e)
},jindo.$Element.eventManager = function () {
    function e(e, t, n) {
        return function () {
            var r = jindo._p_._toArray(arguments);
            return n.length && (r = n.concat(r)), e.apply(t, r)
        }
    }

    var t = {};
    return {
        revisionCallback: function (e, t, n, r) {
            if ("mouseenter" == n || "mouseleave" == n) {
                var i = jindo.$Element.eventManager._fireWhenElementBoundary(e, r);
                i._origin_ = r, r = i
            }
            return r
        }, _fireWhenElementBoundary: function (e, t) {
            return function (n) {
                var r = n.relatedElement ? jindo.$Element(n.relatedElement) : null, i = n.currentElement;
                "delegate" == e && (i = n.element), r && (r.isEqual(i) || r.isChildOf(i)) || t(n)
            }
        }, revisionEvent: function (e, t, n) {
            if (/^ms/i.test(n))return n;
            var r = jindo.$Event.hook(t);
            if (r)return jindo.$Jindo.isFunction(r) ? jindo._p_.customEvent() : r;
            if (t = t.toLowerCase(), "domready" == t || "domcontentloaded" == t)t = "DOMContentLoaded"; else if ("mousewheel" != t || jindo._p_._JINDO_IS_WK || jindo._p_._JINDO_IS_OP)if ("mouseenter" == t)t = "mouseover"; else if ("mouseleave" == t)t = "mouseout"; else if ("transitionend" == t || "transitionstart" == t) {
                var i = t.replace("transition", ""), o = jindo._p_.getStyleIncludeVendorPrefix();
                "transition" != o.transition && (i = i.substr(0, 1).toUpperCase() + i.substr(1)), t = o.transition + i
            } else if ("animationstart" == t || "animationend" == t || "animationiteration" == t) {
                var i = t.replace("animation", ""), o = jindo._p_.getStyleIncludeVendorPrefix();
                "animation" != o.animation && (i = i.substr(0, 1).toUpperCase() + i.substr(1)), t = o.animation + i
            } else("focusin" === t || "focusout" === t) && (t = "focusin" === t ? "focus" : "blur"); else t = "DOMMouseScroll";
            return jindo._p_.mouseTouchPointerEvent(t)
        }, test: function () {
            return t
        }, isInit: function (e) {
            return !!t[e]
        }, init: function (e, n) {
            t[e] = {ele: n, event: {}}
        }, getEventConfig: function (e) {
            return t[e]
        }, hasEvent: function (e, n) {
            try {
                return !!t[e].event[n]
            } catch (r) {
                return !1
            }
        }, hasGroup: function (e, n, r) {
            return !!t[e].event[n].type[r]
        }, createEvent: function (e, t, n, r) {
            void 0 === e.currentTarget && (e.currentTarget = n);
            var i = jindo.$Event(e);
            return i.currentElement || (i.currentElement = n), i.realType = t, i.delegatedElement = r, i
        }, initEvent: function (n, r, i) {
            var o = n._key, s = t[o].event, a = e(function (e, t, n, r) {
                r = r || window.event;
                var i = r.target || r.srcElement, o = jindo.$Element.eventManager, s = o.getEventConfig((r.currentTarget || this._element).__jindo__id), a = s.event[e].type;
                for (var c in a)if (a.hasOwnProperty(c)) {
                    for (var u = a[c].normal, l = 0, d = u.length; d > l; l++)u[l].call(this, n.createEvent(r, t, this._element, null));
                    var p, h, m = a[c].delegate;
                    for (var f in m)if (m.hasOwnProperty(f) && (p = m[f].checker(i), p[0])) {
                        h = m[f].callback;
                        for (var _, g = 0, y = h.length; y > g; g++)_ = n.createEvent(r, t, this._element, p[1]), _.element = p[1], h[g].call(this, _)
                    }
                }
            }, n, [r, i, this]);
            s[r] = {
                listener: a,
                type: {}
            }, jindo.$Element._eventBind(n._element, r, a, "focusin" === i || "focusout" === i)
        }, initGroup: function (e, n, r) {
            var i = t[e].event[n].type;
            i[r] = {normal: [], delegate: {}}
        }, addEventListener: function (e, n, r, i, o, s) {
            var a = t[e].event[n].type[r];
            "normal" === i ? a.normal.push(s) : "delegate" === i && (this.hasDelegate(a, o) || this.initDelegate(t[e].ele, a, o), this.addDelegate(a, o, s))
        }, hasDelegate: function (e, t) {
            return !!e.delegate[t]
        }, containsElement: function (e, t, n, r) {
            if (e == t && r)return jindo.$$.test(t, n);
            for (var i = jindo.$$(n, e), o = 0, s = i.length; s > o; o++)if (i[o] == t)return !0;
            return !1
        }, initDelegate: function (t, n, r) {
            var i;
            i = jindo.$Jindo.isString(r) ? e(function (e, t, n) {
                var r = n, i = this.containsElement(e, n, t, !0);
                if (!i)for (var o = this._getParent(e, n), s = 0, a = o.length; a > s; s++)if (r = o[s], this.containsElement(e, r, t)) {
                    i = !0;
                    break
                }
                return [i, r]
            }, this, [t, r]) : e(function (e, t, n) {
                var r = n, i = t(e, n);
                if (!i)for (var o = this._getParent(e, n), s = 0, a = o.length; a > s; s++)if (r = o[s], t(e, r)) {
                    i = !0;
                    break
                }
                return [i, r]
            }, this, [t, r]), n.delegate[r] = {checker: i, callback: []}
        }, addDelegate: function (e, t, n) {
            e.delegate[t].callback.push(n)
        }, removeEventListener: function (e, n, r, i, o, s) {
            var a;
            try {
                a = t[e].event[n].type[r]
            } catch (c) {
                return
            }
            var u, l = [];
            if (u = "normal" === i ? a.normal : a.delegate[o].callback, n == jindo._p_.NONE_GROUP || jindo.$Jindo.isFunction(s))for (var d = 0, p = u.length; p > d; d++)(u[d]._origin_ || u[d]) != s && l.push(u[d]);
            "normal" === i ? (delete a.normal, a.normal = l) : "delegate" === i && (delete a.delegate[o].callback, a.delegate[o].callback = l), this.cleanUp(e, n)
        }, cleanUpAll: function () {
            for (var e in t)t.hasOwnProperty(e) && this.cleanUpUsingKey(e, !0)
        }, cleanUpUsingKey: function (e, n) {
            var r;
            if (t[e] && t[e].event) {
                r = t[e].event;
                for (var i in r)r.hasOwnProperty(i) && this.cleanUp(e, i, n)
            }
        }, cleanUp: function (e, n, r) {
            var i;
            try {
                i = t[e].event[n].type
            } catch (o) {
                return
            }
            var s, a = !1;
            if (!r)for (var c in i)if (i.hasOwnProperty(c)) {
                if (s = i[c], s.normal.length) {
                    a = !0;
                    break
                }
                var u = s.delegate;
                for (var l in u)if (u.hasOwnProperty(l) && u[l].callback.length) {
                    a = !0;
                    break
                }
                if (a)break
            }
            if (!a) {
                jindo.$Element._unEventBind(t[e].ele, n, t[e].event[n].listener), delete t[e].event[n];
                var d = !0, p = t[e].event;
                for (var h in p)if (p.hasOwnProperty(h)) {
                    d = !1;
                    break
                }
                d && delete t[e]
            }
        }, splitGroup: function (e) {
            var t = /\s*(.+?)\s*\(\s*(.*?)\s*\)/.exec(e);
            return t ? {event: t[1].toLowerCase(), group: t[2].toLowerCase()} : {
                event: e.toLowerCase(),
                group: jindo._p_.NONE_GROUP
            }
        }, _getParent: function (e, t) {
            for (var n = e, r = [], i = null, o = t.ownerDocument || t.document || document; t.parentNode && i != n && (i = t.parentNode, i != o.documentElement);)r[r.length] = i, t = i;
            return r
        }
    }
}(),jindo.$Element.prototype.appear = function (e, t) {
    var n = g_checkVarType(arguments, {
        "4voi": [],
        "4num": ["nDuration:Numeric"],
        "4fun": ["nDuration:Numeric", "fpCallback:Function+"]
    }, "$Element#appear");
    switch (n + "") {
        case"4voi":
            e = .3, t = function () {
            };
            break;
        case"4num":
            e = n.nDuration, t = function () {
            };
            break;
        case"4fun":
            e = n.nDuration, t = n.fpCallback
    }
    var r = this;
    if (this.visible())return setTimeout(function () {
        t.call(r, r)
    }, 16), this;
    var i = this._element, o = jindo._p_.getStyleIncludeVendorPrefix(), s = o.transition, a = "transition" == s ? "end" : "End", c = function () {
        r.show(), i.style[s + "Property"] = "", i.style[s + "Duration"] = "", i.style[s + "TimingFunction"] = "", i.style.opacity = "", t.call(r, r), i.removeEventListener(s + a, arguments.callee, !1)
    };
    return this.visible() || (i.style.opacity = i.style.opacity || 0, r.show()), i.addEventListener(s + a, c, !1), i.style[s + "Property"] = "opacity", i.style[s + "Duration"] = e + "s", i.style[s + "TimingFunction"] = "linear", jindo._p_.setOpacity(i, "1"), this
},jindo.$Element.prototype.disappear = function (e, t) {
    var n = g_checkVarType(arguments, {
        "4voi": [],
        "4num": ["nDuration:Numeric"],
        "4fun": ["nDuration:Numeric", "fpCallback:Function+"]
    }, "$Element#disappear");
    switch (n + "") {
        case"4voi":
            e = .3, t = function () {
            };
            break;
        case"4num":
            e = n.nDuration, t = function () {
            };
            break;
        case"4fun":
            e = n.nDuration, t = n.fpCallback
    }
    var r = this;
    if (!this.visible())return setTimeout(function () {
        t.call(r, r)
    }, 16), this;
    var i = this._element, o = jindo._p_.getStyleIncludeVendorPrefix(), s = o.transition, a = "transition" == s ? "end" : "End", c = function () {
        r.hide(), i.style[s + "Property"] = "", i.style[s + "Duration"] = "", i.style[s + "TimingFunction"] = "", i.style.opacity = "", t.call(r, r), i.removeEventListener(s + a, arguments.callee, !1)
    };
    return i.addEventListener(s + a, c, !1), i.style[s + "Property"] = "opacity", i.style[s + "Duration"] = e + "s", i.style[s + "TimingFunction"] = "linear", jindo._p_.setOpacity(i, "0"), this
},jindo.$Element.prototype.offset = function () {
    var e = g_checkVarType(arguments, {g: [], s: ["nTop:Numeric", "nLeft:Numeric"]}, "$Element#offset");
    switch (e + "") {
        case"g":
            return this.offset_get();
        case"s":
            return this.offset_set(e.nTop, e.nLeft)
    }
},jindo.$Element.prototype.offset_set = function (e, t) {
    var n = this._element;
    isNaN(parseFloat(this._getCss(n, "top"))) && (n.style.top = "0px"), isNaN(parseFloat(this._getCss(n, "left"))) && (n.style.left = "0px");
    var r = this.offset_get(), i = {top: e - r.top, left: t - r.left};
    return n.style.top = parseFloat(this._getCss(n, "top")) + i.top + "px", n.style.left = parseFloat(this._getCss(n, "left")) + i.left + "px", this
},jindo.$Element.prototype.offset_get = function () {
    var e = this._element, t = null, n = {
        left: 0,
        top: 0
    }, r = e.ownerDocument || e.document || document, i = r.documentElement, o = r.body;
    if (e.getBoundingClientRect) {
        if (!t) {
            var s = window == top;
            if (!s)try {
                s = window.frameElement && 1 == window.frameElement.frameBorder
            } catch (a) {
            }
            t = {left: 0, top: 0}
        }
        var c = e.getBoundingClientRect();
        e !== i && e !== o && (n.left = c.left - t.left, n.top = c.top - t.top, n.left += i.scrollLeft || o.scrollLeft, n.top += i.scrollTop || o.scrollTop)
    } else if (r.getBoxObjectFor) {
        var c = r.getBoxObjectFor(e), u = r.getBoxObjectFor(i || o);
        n.left = c.screenX - u.screenX, n.top = c.screenY - u.screenY
    } else {
        for (var l = e; l; l = l.offsetParent)n.left += l.offsetLeft, n.top += l.offsetTop;
        for (var l = e.parentNode; l && "BODY" != l.tagName; l = l.parentNode)"TR" == l.tagName && (n.top += 2), n.left -= l.scrollLeft, n.top -= l.scrollTop
    }
    return n
},jindo.$Element.prototype.evalScripts = function (sHTML) {
    var oArgs = g_checkVarType(arguments, {"4str": ["sHTML:String+"]}, "$Element#evalScripts"), aJS = [], leftScript = "<script(\\s[^>]+)*>(.*?)</", rightScript = "script>";
    return sHTML = sHTML.replace(new RegExp(leftScript + rightScript, "gi"), function (e, t, n) {
        return aJS.push(n), ""
    }), eval(aJS.join("\n")), this
},jindo.$Element.prototype.clone = function (e) {
    var t = g_checkVarType(arguments, {"default": [], set: ["bDeep:Boolean"]}, "$Element#clone");
    return t + "" == "default" && (e = !0), jindo.$Element(this._element.cloneNode(e))
},jindo.$Element._common = function (e, t) {
    try {
        return jindo.$Element(e)._element
    } catch (n) {
        throw TypeError(n.message.replace(/\$Element/g, "$Element#" + t).replace(/Element\.html/g, "Element.html#" + t))
    }
},jindo.$Element._prepend = function (e, t) {
    var n = e.childNodes;
    n.length > 0 ? e.insertBefore(t, n[0]) : e.appendChild(t)
},jindo.$Element.prototype.append = function (e) {
    return this._element.appendChild(jindo.$Element._common(e, "append")), this
},jindo.$Element.prototype.prepend = function (e) {
    return jindo.$Element._prepend(this._element, jindo.$Element._common(e, "prepend")), this
},jindo.$Element.prototype.replace = function (e) {
    e = jindo.$Element._common(e, "replace"), jindo.cssquery && jindo.cssquery.release();
    var t = this._element, n = t.parentNode;
    if (n && n.replaceChild)return n.replaceChild(e, t), this;
    var r = e;
    return n.insertBefore(r, t), n.removeChild(t), this
},jindo.$Element.prototype.appendTo = function (e) {
    return jindo.$Element._common(e, "appendTo").appendChild(this._element), this
},jindo.$Element.prototype.prependTo = function (e) {
    return jindo.$Element._prepend(jindo.$Element._common(e, "prependTo"), this._element), this
},jindo.$Element.prototype.before = function (e) {
    var t = jindo.$Element._common(e, "before");
    return this._element.parentNode.insertBefore(t, this._element), this
},jindo.$Element.prototype.after = function (e) {
    return e = jindo.$Element._common(e, "after"), this.before(e), jindo.$Element(e).before(this), this
},jindo.$Element.prototype.parent = function (e, t) {
    var n = g_checkVarType(arguments, {
        "4voi": [],
        "4fun": ["fpFunc:Function+"],
        "4nul": ["fpFunc:Null"],
        for_function_number: ["fpFunc:Function+", "nLimit:Numeric"],
        for_null_number: ["fpFunc:Null", "nLimit:Numeric"]
    }, "$Element#parent"), r = this._element;
    switch (n + "") {
        case"4voi":
            return r.parentNode ? jindo.$Element(r.parentNode) : null;
        case"4fun":
        case"4nul":
            t = -1;
            break;
        case"for_function_number":
        case"for_null_number":
            0 == n.nLimit && (t = -1)
    }
    for (var i = [], o = null; r.parentNode && 0 != t--;) {
        try {
            o = jindo.$Element(r.parentNode)
        } catch (s) {
            o = null
        }
        if (r.parentNode == document.documentElement)break;
        (!e || e && e.call(this, o)) && (i[i.length] = o), r = r.parentNode
    }
    return i
},jindo.$Element.prototype.child = function (e, t) {
    var n = g_checkVarType(arguments, {
        "4voi": [],
        "4fun": ["fpFunc:Function+"],
        "4nul": ["fpFunc:Null"],
        for_function_number: ["fpFunc:Function+", "nLimit:Numeric"],
        for_null_number: ["fpFunc:Null", "nLimit:Numeric"]
    }, "$Element#child"), r = this._element, i = [], o = null;
    switch (n + "") {
        case"4voi":
            for (var s = r.childNodes, a = [], c = 0, u = s.length; u > c; c++)if (1 == s[c].nodeType)try {
                a.push(jindo.$Element(s[c]))
            } catch (l) {
                a.push(null)
            }
            return a;
        case"4fun":
        case"4nul":
            t = -1;
            break;
        case"for_function_number":
        case"for_null_number":
            0 == n.nLimit && (t = -1)
    }
    return (o = function (t, n, r) {
        for (var s = null, a = null, c = 0; c < t.childNodes.length; c++)if (s = t.childNodes[c], 1 == s.nodeType) {
            try {
                a = jindo.$Element(t.childNodes[c])
            } catch (u) {
                a = null
            }
            (!e || e && e.call(r, a)) && (i[i.length] = a), 0 != n && o(t.childNodes[c], n - 1)
        }
    })(r, t - 1, this), i
},jindo.$Element.prototype.prev = function (e) {
    var t = g_checkVarType(arguments, {
        "4voi": [],
        "4fun": ["fpFunc:Function+"],
        "4nul": ["fpFunc:Null"]
    }, "$Element#prev"), n = this._element, r = [];
    switch (t + "") {
        case"4voi":
            if (!n)return null;
            do if (n = n.previousSibling, n && 1 == n.nodeType)try {
                return null == n ? null : jindo.$Element(n)
            } catch (n) {
                return null
            } while (n);
            try {
                return null == n ? null : jindo.$Element(n)
            } catch (n) {
                return null
            }
        case"4fun":
        case"4nul":
            if (!n)return r;
            do if (n = n.previousSibling, n && 1 == n.nodeType && (!e || e.call(this, n)))try {
                r[r.length] = null == n ? null : jindo.$Element(n)
            } catch (n) {
                r[r.length] = null
            } while (n);
            try {
                return r
            } catch (n) {
                return null
            }
    }
},jindo.$Element.prototype.next = function (e) {
    var t = g_checkVarType(arguments, {
        "4voi": [],
        "4fun": ["fpFunc:Function+"],
        "4nul": ["fpFunc:Null"]
    }, "$Element#next"), n = this._element, r = [];
    switch (t + "") {
        case"4voi":
            if (!n)return null;
            do if (n = n.nextSibling, n && 1 == n.nodeType)try {
                return null == n ? null : jindo.$Element(n)
            } catch (n) {
                return null
            } while (n);
            try {
                return null == n ? null : jindo.$Element(n)
            } catch (n) {
                return null
            }
        case"4fun":
        case"4nul":
            if (!n)return r;
            do if (n = n.nextSibling, n && 1 == n.nodeType && (!e || e.call(this, n)))try {
                r[r.length] = null == n ? null : jindo.$Element(n)
            } catch (n) {
                r[r.length] = null
            } while (n);
            try {
                return r
            } catch (n) {
                return null
            }
    }
},jindo.$Element.prototype.first = function () {
    var e = this._element.firstElementChild || this._element.firstChild;
    if (!e)return null;
    for (; e && 1 != e.nodeType;)e = e.nextSibling;
    try {
        return e ? jindo.$Element(e) : null
    } catch (t) {
        return null
    }
},jindo.$Element.prototype.last = function () {
    var e = this._element.lastElementChild || this._element.lastChild;
    if (!e)return null;
    for (; e && 1 != e.nodeType;)e = e.previousSibling;
    try {
        return e ? jindo.$Element(e) : null
    } catch (t) {
        return null
    }
},jindo.$Element._contain = function (e, t) {
    if (document.compareDocumentPosition)return !!(16 & e.compareDocumentPosition(t));
    for (var n = e, r = t; n && n.parentNode;)if (n = n.parentNode, n == r)return !0;
    return !1
},jindo.$Element.prototype.isChildOf = function (e) {
    try {
        return jindo.$Element._contain(jindo.$Element(e)._element, this._element)
    } catch (t) {
        return !1
    }
},jindo.$Element.prototype.isParentOf = function (e) {
    try {
        return jindo.$Element._contain(this._element, jindo.$Element(e)._element)
    } catch (t) {
        return !1
    }
},jindo.$Element.prototype.isEqual = function (e) {
    try {
        return this._element === jindo.$Element(e)._element
    } catch (t) {
        return !1
    }
},jindo._p_.fireCustomEvent = function (e, t, n) {
    var r, i, o = jindo._p_.normalCustomEvent[t];
    for (var s in o) {
        i = o[s], r = i.ele;
        var a;
        for (var c in i)if ("_NONE_" === c) {
            if (r == e || n.isChildOf(r)) {
                a = i[c].wrap_listener;
                for (var u = 0, l = a.length; l > u; u++)a[u]()
            }
        } else if (jindo.$Element.eventManager.containsElement(r, e, c, !1)) {
            a = i[c].wrap_listener;
            for (var u = 0, l = a.length; l > u; u++)a[u]()
        }
    }
},jindo.$Element.prototype.fireEvent = function (e, t) {
    var n = g_checkVarType(arguments, {
        "4str": [jindo.$Jindo._F("sEvent:String+")],
        "4obj": ["sEvent:String+", "oProps:Hash+"]
    }, "$Element#fireEvent"), r = this._element, i = e;
    if (e = jindo.$Element.eventManager.revisionEvent("", e, e), jindo._p_.normalCustomEvent[e])return jindo._p_.fireCustomEvent(r, e, this, !!jindo._p_.normalCustomEvent[e]), this;
    var o = "HTMLEvents";
    e = (e + "").toLowerCase(), "click" == e || 0 == e.indexOf("mouse") ? o = "MouseEvent" : i.indexOf("wheel") > 0 ? (e = "DOMMouseScroll", o = jindo._p_._JINDO_IS_FF ? "MouseEvent" : "MouseWheelEvent") : 0 == e.indexOf("key") ? o = "KeyboardEvent" : e.indexOf("pointer") > 0 && (o = "MouseEvent", e = i);
    var s;
    switch (n + "") {
        case"4obj":
            switch (t = n.oProps, t.button = 0 + (t.middle ? 1 : 0) + (t.right ? 2 : 0), t.ctrl = t.ctrl || !1, t.alt = t.alt || !1, t.shift = t.shift || !1, t.meta = t.meta || !1, o) {
                case"MouseEvent":
                    s = document.createEvent(o), s.initMouseEvent(e, !0, !0, null, t.detail || 0, t.screenX || 0, t.screenY || 0, t.clientX || 0, t.clientY || 0, t.ctrl, t.alt, t.shift, t.meta, t.button, t.relatedElement || null);
                    break;
                case"KeyboardEvent":
                    if (window.KeyEvent)s = document.createEvent("KeyEvents"), s.initKeyEvent(e, !0, !0, window, t.ctrl, t.alt, t.shift, t.meta, t.keyCode, t.keyCode); else try {
                        s = document.createEvent("Events")
                    } catch (a) {
                        s = document.createEvent("UIEvents")
                    } finally {
                        s.initEvent(e, !0, !0), s.ctrlKey = t.ctrl, s.altKey = t.alt, s.shiftKey = t.shift, s.metaKey = t.meta, s.keyCode = t.keyCode, s.which = t.keyCode
                    }
                    break;
                default:
                    s = document.createEvent(o), s.initEvent(e, !0, !0)
            }
            break;
        case"4str":
            s = document.createEvent(o), s.initEvent(e, !0, !0)
    }
    var c = this._element;
    return jindo.$Jindo.isWindow(c) && /(iPhone|iPad|iPod).*OS\s+([0-9\.]+)/.test(jindo._p_._j_ag) && parseFloat(RegExp.$2) < 4 && (c = c.document), c.dispatchEvent(s), this
},jindo.$Element.prototype.empty = function () {
    return jindo.cssquery && jindo.cssquery.release(), this.html(""), this
},jindo.$Element.prototype.remove = function (e) {
    jindo.cssquery && jindo.cssquery.release();
    var t = jindo.$Element;
    return t(t._common(e, "remove")).leave(), this
},jindo.$Element.prototype.leave = function () {
    var e = this._element;
    return e.parentNode && (jindo.cssquery && jindo.cssquery.release(), e.parentNode.removeChild(e)), this
},jindo.$Element.prototype.wrap = function (e) {
    var t = this._element;
    return e = jindo.$Element._common(e, "wrap"), t.parentNode && t.parentNode.insertBefore(e, t), e.appendChild(t), this
},jindo.$Element.prototype.ellipsis = function (e) {
    g_checkVarType(arguments, {"4voi": [], "4str": ["stringTail:String+"]}, "$Element#ellipsis");
    e = e || "...";
    var t = this.text(), n = t.length, r = parseInt(this._getCss(this._element, "paddingTop"), 10) + parseInt(this._getCss(this._element, "paddingBottom"), 10), i = this._element.offsetHeight - r, o = 0, s = this.text("A")._element.offsetHeight - r;
    if (1.5 * s > i)return this.text(t), this;
    for (i = s; 1.5 * s > i;)o += Math.max(Math.ceil((n - o) / 2), 1), i = this.text(t.substring(0, o) + e)._element.offsetHeight - r;
    for (; i > 1.5 * s;)o--, i = this.text(t.substring(0, o) + e)._element.offsetHeight - r;
    return this
},jindo.$Element.prototype.indexOf = function (e) {
    try {
        for (var t = jindo.$Element(e)._element, n = this._element.childNodes, r = 0, i = n.length, o = 0; i > o; o++)if (1 == n[o].nodeType) {
            if (n[o] === t)return r;
            r++
        }
    } catch (t) {
    }
    return -1
},jindo.$Element.prototype.queryAll = function (e) {
    for (var t = (g_checkVarType(arguments, {"4str": ["sSelector:String+"]}, "$Element#queryAll"), jindo.cssquery(e, this._element)), n = [], r = 0, i = t.length; i > r; r++)n.push(jindo.$Element(t[r]));
    return n
},jindo.$Element.prototype.query = function (e) {
    var t = (g_checkVarType(arguments, {"4str": ["sSelector:String+"]}, "$Element#query"), jindo.cssquery.getSingle(e, this._element));
    return null === t ? t : jindo.$Element(t)
},jindo.$Element.prototype.test = function (e) {
    g_checkVarType(arguments, {"4str": ["sSelector:String+"]}, "$Element#test");
    return jindo.cssquery.test(this._element, e)
},jindo.$Element.prototype.xpathAll = function (e) {
    for (var t = (g_checkVarType(arguments, {"4str": ["sXPath:String+"]}, "$Element#xpathAll"), jindo.cssquery.xpath(e, this._element)), n = [], r = 0, i = t.length; i > r; r++)n.push(jindo.$Element(t[r]));
    return n
},jindo.$Element.insertAdjacentHTML = function (e, t, n, r, i, o) {
    var s = [t];
    s.callee = arguments.callee;
    var a = (g_checkVarType(s, {"4str": ["sHTML:String+"]}, "$Element#" + o), e._element);
    if (t += "", a.insertAdjacentHTML && !/^<(option|tr|td|th|col)(?:.*?)>/.test(jindo._p_.trim(t).toLowerCase()))a.insertAdjacentHTML(n, t); else {
        var c, u = a.ownerDocument || a.document || document, l = u.createDocumentFragment(), d = jindo._p_.trim(t), p = {
            option: "select",
            tr: "tbody",
            thead: "table",
            tbody: "table",
            col: "table",
            td: "tr",
            th: "tr",
            div: "div"
        }, h = /^<(option|tr|thead|tbody|td|th|col)(?:.*?)\>/i.exec(d), m = null === h ? "div" : h[1].toLowerCase(), f = p[m];
        c = jindo._p_._createEle(f, d, u, !0);
        for (var _ = c.getElementsByTagName("script"), g = 0, y = _.length; y > g; g++)_[g].parentNode.removeChild(_[g]);
        if ("table" == a.tagName.toLowerCase() && !a.getElementsByTagName("tbody").length && !d.match(/<tbody[^>]*>/i)) {
            var v = u.createElement("tbody"), j = d.match(/^<t(head|foot)[^>]*>/i);
            j || (l.appendChild(v), l = v)
        }
        for (; c[r];)l.appendChild(c[r]);
        j && l.appendChild(v), i(l.cloneNode(!0))
    }
    return e
},jindo.$Element.prototype.appendHTML = function (e) {
    return jindo.$Element.insertAdjacentHTML(this, e, "beforeEnd", "firstChild", jindo.$Fn(function (e) {
        var t = this._element;
        if ("table" === t.tagName.toLowerCase())for (var n = t.childNodes, r = 0, i = n.length; i > r; r++)if (1 == n[r].nodeType) {
            t = n[r];
            break
        }
        t.appendChild(e)
    }, this).bind(), "appendHTML")
},jindo.$Element.prototype.prependHTML = function (e) {
    var t = jindo.$Element;
    return t.insertAdjacentHTML(this, e, "afterBegin", "firstChild", jindo.$Fn(function (e) {
        var n = this._element;
        if ("table" === n.tagName.toLowerCase())for (var r = n.childNodes, i = 0, o = r.length; o > i; i++)if (1 == r[i].nodeType) {
            n = r[i];
            break
        }
        t._prepend(n, e)
    }, this).bind(), "prependHTML")
},jindo.$Element.prototype.beforeHTML = function (e) {
    return jindo.$Element.insertAdjacentHTML(this, e, "beforeBegin", "firstChild", jindo.$Fn(function (e) {
        this._element.parentNode.insertBefore(e, this._element)
    }, this).bind(), "beforeHTML")
},jindo.$Element.prototype.afterHTML = function (e) {
    return jindo.$Element.insertAdjacentHTML(this, e, "afterEnd", "firstChild", jindo.$Fn(function (e) {
        this._element.parentNode.insertBefore(e, this._element.nextSibling)
    }, this).bind(), "afterHTML")
},jindo.$Element.prototype.hasEventListener = function (e) {
    var t, n = g_checkVarType(arguments, {"4str": ["sEvent:String+"]}, "$Element#hasEventListener"), r = !1, i = n.sEvent.toLowerCase();
    if (this._key) {
        if (t = this._element.ownerDocument || this._element.document || document, "load" == i && this._element === t)r = jindo.$Element(window).hasEventListener(n.sEvent); else if ("domready" == i && jindo.$Jindo.isWindow(this._element))r = jindo.$Element(t).hasEventListener(n.sEvent); else {
            var o = jindo.$Element.eventManager.revisionEvent("", e);
            r = !!jindo.$Element.eventManager.hasEvent(this._key, o, n.sEvent)
        }
        return r
    }
    return !1
},jindo.$Element.prototype.preventTapHighlight = function () {
    if (jindo._p_._JINDO_IS_MO) {
        var e = "no_tap_highlight" + (new Date).getTime(), t = document.createElement("style"), n = document.getElementsByTagName("html")[0];
        t.type = "text/css", n.insertBefore(t, n.firstChild);
        var r = t.sheet || t.styleSheet;
        r.insertRule("." + e + " { -webkit-tap-highlight-color: rgba(0,0,0,0); }", 0), r.insertRule("." + e + " * { -webkit-tap-highlight-color: rgba(0,0,0,.25); }", 0), jindo.$Element.prototype.preventTapHighlight = function (t) {
            return this[t ? "addClass" : "removeClass"](e)
        }
    } else jindo.$Element.prototype.preventTapHighlight = function () {
        return this
    };
    return this.preventTapHighlight.apply(this, jindo._p_._toArray(arguments))
},jindo.$Element.prototype.data = function (sKey, vValue) {
    function toCamelCase(e) {
        return e.replace(/\-(.)/g, function (e, t) {
            return t.toUpperCase()
        })
    }

    function toDash(e) {
        return e.replace(/[A-Z]/g, function (e) {
            return "-" + e.toLowerCase()
        })
    }

    var oType = {
        g: ["sKey:String+"],
        s4var: ["sKey:String+", "vValue:Variant"],
        s4obj: ["oObj:Hash+"]
    }, jindoKey = "_jindo";
    return jindo.$Element.prototype.data = document.body.dataset ? function (e, t) {
        var n, r = g_checkVarType(arguments, oType, "$Element#data"), i = jindo.$Jindo.isNull;
        switch (r + "") {
            case"g":
                e = toCamelCase(e);
                var o = this._element.dataset[e + jindoKey], s = this._element.dataset[e];
                return s ? o ? window.JSON.parse(s) : s : null;
            case"s4var":
                var a;
                if (i(t))return e = toCamelCase(e), delete this._element.dataset[e], delete this._element.dataset[e + jindoKey], this;
                a = {}, a[e] = t, e = a;
            case"s4obj":
                var c;
                for (var u in e)c = toCamelCase(u), i(e[u]) ? (delete this._element.dataset[c], delete this._element.dataset[c + jindoKey]) : (n = jindo.$Json._oldToString(e[u]), null != n && (this._element.dataset[c] = n, this._element.dataset[c + jindoKey] = "jindo"));
                return this
        }
    } : function (sKey, vValue) {
        var sToStr, oArgs = g_checkVarType(arguments, oType, "$Element#data"), isNull = jindo.$Jindo.isNull;
        switch (oArgs + "") {
            case"g":
                sKey = toDash(sKey);
                var isMakeFromJindo = this._element.getAttribute("data-" + sKey + jindoKey), sVal = this._element.getAttribute("data-" + sKey);
                return isMakeFromJindo ? null != sVal ? eval("(" + sVal + ")") : null : sVal;
            case"s4var":
                var oData;
                if (isNull(vValue))return sKey = toDash(sKey), this._element.removeAttribute("data-" + sKey), this._element.removeAttribute("data-" + sKey + jindoKey), this;
                oData = {}, oData[sKey] = vValue, sKey = oData;
            case"s4obj":
                var sChange;
                for (var i in sKey)sChange = toDash(i), isNull(sKey[i]) ? (this._element.removeAttribute("data-" + sChange), this._element.removeAttribute("data-" + sChange + jindoKey)) : (sToStr = jindo.$Json._oldToString(sKey[i]), null != sToStr && (this._element.setAttribute("data-" + sChange, sToStr), this._element.setAttribute("data-" + sChange + jindoKey, "jindo")));
                return this
        }
    }, this.data.apply(this, jindo._p_._toArray(arguments))
},jindo.$ElementList = function (e) {
    var t = arguments.callee;
    if (e instanceof t)return e;
    if (!(this instanceof t))try {
        return new t(e)
    } catch (n) {
        if (n instanceof TypeError)return null;
        throw n
    }
    var r = g_checkVarType(arguments, {
        "4arr": ["aEle:Array+"],
        "4str": ["sCssQuery:String+"],
        "4nul": ["oEle:Null"],
        "4und": ["oEle:Undefined"]
    }, "$ElementList");
    switch (r + "") {
        case"4arr":
            e = r.aEle;
            break;
        case"4str":
            e = jindo.cssquery(r.sCssQuery);
            break;
        case"4nul":
        case"4und":
            e = []
    }
    this._elements = [];
    for (var i = 0, o = e.length; o > i; i++)this._elements.push(jindo.$Element(e[i]))
},function (e) {
    for (var t = ["show", "hide", "toggle", "addClass", "removeClass", "toggleClass", "fireEvent", "leave", "empty", "className", "width", "height", "text", "html", "css", "attr"], n = 0, r = t.length; r > n; n++) {
        var i = t[n];
        jindo.$Element.prototype[i] && (e[t[n]] = function (e) {
            return function () {
                try {
                    for (var t = [], n = 0, r = arguments.length; r > n; n++)t.push(arguments[n]);
                    for (var i = 0, o = this._elements.length; o > i; i++)this._elements[i][e].apply(this._elements[i], t);
                    return this
                } catch (s) {
                    throw TypeError(s.message.replace(/\$Element/g, "$Elementlist#" + e).replace(/Element\.html/g, "Elementlist.html#" + e))
                }
            }
        }(t[n]))
    }
    for (var o = ["appear", "disappear"], n = 0, r = o.length; r > n; n++)jindo.$Element.prototype[i] && (e[o[n]] = function (e) {
        return function (t, n) {
            try {
                for (var r = this, i = 0, o = this._elements.length; o > i; i++)i == o - 1 ? this._elements[i][e](t, function () {
                    n && n(r)
                }) : this._elements[i][e](t);
                return this
            } catch (s) {
                throw TypeError(s.message.replace(/\$Element/g, "$Elementlist#" + e).replace(/Element\.html/g, "Elementlist.html#" + e))
            }
        }
    }(o[n]))
}(jindo.$ElementList.prototype),jindo.$ElementList.prototype.get = function (e) {
    g_checkVarType(arguments, {"4num": ["nIdx:Numeric"]}, "$ElementList#get");
    return this._elements[e]
},jindo.$ElementList.prototype.getFirst = function () {
    return this._elements[0]
},jindo.$ElementList.prototype.getLast = function () {
    return this._elements[Math.max(this._elements.length - 1, 0)]
},jindo.$ElementList.prototype.length = function () {
    var e = (g_checkVarType(arguments, {
        "4voi": [],
        "4num": [jindo.$Jindo._F("nLen:Numeric")],
        "4var": ["nLen:Numeric", "oValue:Variant"]
    }, "$ElementList#length"), jindo.$A(this._elements));
    try {
        return e.length.apply(e, jindo._p_._toArray(arguments))
    } catch (t) {
        throw TypeError(t.message.replace(/\$A/g, "$Elementlist#length").replace(/A\.html/g, "Elementlist.html#length"))
    }
},jindo.$ElementList.prototype.$value = function () {
    return this._elements
},jindo.$Form = function (e) {
    var t = arguments.callee;
    if (e instanceof t)return e;
    if (!(this instanceof t))try {
        return jindo.$Jindo._maxWarn(arguments.length, 1, "$Form"), new t(e)
    } catch (n) {
        if (n instanceof TypeError)return null;
        throw n
    }
    var r = g_checkVarType(arguments, {"4str": ["oForm:String+"], "4ele": ["oForm:Element+"]}, "$Form+");
    switch (r + "") {
        case"4str":
            e = jindo.$(e)
    }
    if (!e.tagName || "FORM" != e.tagName.toUpperCase())throw TypeError("only form");
    this._form = e
},jindo.$Form.prototype.$value = function () {
    return this._form
},jindo.$Form.prototype.serialize = function () {
    var e = this, t = {}, n = arguments.length, r = function (n, r) {
        if (!n.disabled) {
            var i = e.value(r);
            void 0 !== i && (t[r] = i)
        }
    };
    if (0 == n)for (var i = this._form.elements.length, o = 0; i > o; o++) {
        var s = this._form.elements[o];
        s.name && r(s, s.name)
    } else for (var o = 0; n > o; o++)r(this.element(arguments[o]), arguments[o]);
    return jindo.$H(t).toQueryString()
},jindo.$Form.prototype.element = function (e) {
    var t = g_checkVarType(arguments, {"4voi": [], "4str": [jindo.$Jindo._F("sKey:String+")]}, "$Form#element");
    switch (t + "") {
        case"4voi":
            return jindo._p_._toArray(this._form.elements);
        case"4str":
            return this._form.elements[e + ""]
    }
},jindo.$Form.prototype.enable = function (e) {
    var t = g_checkVarType(arguments, {
        s4bln: ["sName:String+", "bEnable:Boolean"],
        s4obj: ["oObj:Hash+"],
        g: [jindo.$Jindo._F("sName:String+")]
    }, "$Form#enable");
    switch (t + "") {
        case"s4bln":
            var n = this._form[e];
            if (!n)return this;
            n = 1 == n.nodeType ? [n] : n;
            for (var r = t.bEnable, i = 0; i < n.length; i++)n[i].disabled = !r;
            return this;
        case"s4obj":
            e = t.oObj;
            var o = this;
            for (var s in e)e.hasOwnProperty(s) && o.enable(s, e[s]);
            return this;
        case"g":
            var n = this._form[e];
            if (!n)return this;
            n = 1 == n.nodeType ? [n] : n;
            for (var a = !0, i = 0; i < n.length; i++)if (n[i].disabled) {
                a = !1;
                break
            }
            return a
    }
},jindo.$Form.prototype.value = function (e) {
    var t = g_checkVarType(arguments, {
        s4str: ["sKey:String+", "vValue:Variant"],
        s4obj: [jindo.$Jindo._F("oObj:Hash+")],
        g: ["sKey:String+"]
    }, "$Form#value");
    if (t + "" == "s4obj") {
        var n = this;
        e = t.oObj;
        for (var r in e)e.hasOwnProperty(r) && n.value(r, e[r]);
        return this
    }
    var i = this._form[e];
    if (!i)throw new jindo.$Error(e + jindo.$Except.NONE_ELEMENT, "$Form#value");
    switch (i = 1 == i.nodeType ? [i] : i, t + "") {
        case"s4str":
            for (var o = t.vValue, s = i.length, a = 0; s > a; a++) {
                var c = i[a];
                switch (c.type) {
                    case"radio":
                        c.checked = c.value == o;
                        break;
                    case"checkbox":
                        c.checked = o.constructor == Array ? jindo.$A(o).has(c.value) : c.value == o;
                        break;
                    case"select-one":
                        for (var u = -1, a = 0, l = c.options.length; l > a; a++)c.options[a].value == o && (u = a);
                        c.selectedIndex = u;
                        break;
                    case"select-multiple":
                        var u = -1;
                        if (o.constructor == Array)for (var d = jindo.$A(o), a = 0, l = c.options.length; l > a; a++)c.options[a].selected = d.has(c.options[a].value); else {
                            for (var a = 0, l = c.options.length; l > a; a++)c.options[a].value == o && (u = a);
                            c.selectedIndex = u
                        }
                        break;
                    default:
                        c.value = o
                }
            }
            return this;
        case"g":
            for (var p = [], s = i.length, a = 0; s > a; a++) {
                var c = i[a];
                switch (c.type) {
                    case"radio":
                    case"checkbox":
                        c.checked && p.push(c.value);
                        break;
                    case"select-one":
                        -1 != c.selectedIndex && p.push(c.options[c.selectedIndex].value);
                        break;
                    case"select-multiple":
                        if (-1 != c.selectedIndex)for (var a = 0, l = c.options.length; l > a; a++)c.options[a].selected && p.push(c.options[a].value);
                        break;
                    default:
                        p.push(c.value)
                }
            }
            return p.length > 1 ? p : p[0]
    }
},jindo.$Form.prototype.submit = function () {
    var e = g_checkVarType(arguments, {
        voi: [],
        "4str": ["sTargetName:String+"],
        "4fun": ["fValidation:Function+"],
        "4fun2": ["sTargetName:String+", "fValidation:Function+"]
    }, "$Form#submit"), t = null;
    switch (e + "") {
        case"4str":
            t = this._form.target, this._form.target = e.sTargetName;
            break;
        case"4fun":
        case"4fun2":
            if (!e.fValidation.call(this, this._form))return this;
            e + "" == "4fun2" && (t = this._form.target, this._form.target = e.sTargetName)
    }
    return this._form.submit(), jindo.$Jindo.isNull(t) || (this._form.target = t), this
},jindo.$Form.prototype.reset = function (e) {
    var t = g_checkVarType(arguments, {"4voi": [], "4fun": ["fValidation:Function+"]}, "$Form#reset");
    return t + "" != "4fun" || e.call(this, this._form) ? (this._form.reset(), this) : this
},jindo.$Document = function (e) {
    var t = arguments.callee;
    if (e instanceof t)return e;
    if (!(this instanceof t))try {
        return jindo.$Jindo._maxWarn(arguments.length, 1, "$Document"), new t(e || document)
    } catch (n) {
        if (n instanceof TypeError)return null;
        throw n
    }
    var r = g_checkVarType(arguments, {"4doc": ["oDocument:Document+"]}, "$Document");
    this._doc = null == r ? document : e, this._docKey = "documentElement"
},function () {
    var e = jindo.cssquery, t = {query: e.getSingle, queryAll: e, xpathAll: e.xpath};
    for (var n in t)jindo.$Document.prototype[n] = function (e, t) {
        return function (n) {
            g_checkVarType(arguments, {"4str": ["sQuery:String+"]}, "$Document#" + e);
            return t(n, this._doc)
        }
    }(n, t[n])
}(),jindo.$Document.prototype.$value = function () {
    return this._doc
},jindo.$Document.prototype.scrollSize = function () {
    var e = this._doc[jindo._p_._JINDO_IS_WK ? "body" : this._docKey];
    return {width: Math.max(e.scrollWidth, e.clientWidth), height: Math.max(e.scrollHeight, e.clientHeight)}
},jindo.$Document.prototype.scrollPosition = function () {
    var e = this._doc[jindo._p_._JINDO_IS_WK ? "body" : this._docKey];
    return {
        left: e.scrollLeft || window.pageXOffset || window.scrollX || 0,
        top: e.scrollTop || window.pageYOffset || window.scrollY || 0
    }
},jindo.$Document.prototype.clientSize = function () {
    var e = this._doc[this._docKey];
    return {width: e.clientWidth, height: e.clientHeight}
},jindo.$S = function (e) {
    var t = arguments.callee;
    if (e instanceof t)return e;
    if (!(this instanceof t))try {
        return jindo.$Jindo._maxWarn(arguments.length, 1, "$Json"), new t(e || "")
    } catch (n) {
        if (n instanceof TypeError)return null;
        throw n
    }
    var r = g_checkVarType(arguments, {nul: ["nul:Null"], unde: ["unde:Undefined"], "4var": ["str:Variant"]}, "$S");
    switch (r + "") {
        case"nul":
        case"unde":
            this._str = "";
            break;
        case"4var":
            this._str = r.str.toString()
    }
},jindo.$S.prototype.$value = function () {
    return this._str
},jindo.$S.prototype.toString = jindo.$S.prototype.$value,jindo.$S.prototype.trim = function () {
    return jindo.$S.prototype.trim = "".trim ? function () {
        return jindo.$S(this._str.trim())
    } : function () {
        return jindo._p_.trim(this._str)
    }, jindo.$S(this.trim())
},jindo.$S.prototype.escapeHTML = function () {
    var e = {
        '"': "quot",
        "&": "amp",
        "<": "lt",
        ">": "gt",
        "'": "#39"
    }, t = this._str.replace(/[<>&"']/g, function (t) {
        return e[t] ? "&" + e[t] + ";" : t
    });
    return jindo.$S(t)
},jindo.$S.prototype.stripTags = function () {
    return jindo.$S(this._str.replace(/<\/?(?:h[1-5]|[a-z]+(?:\:[a-z]+)?)[^>]*>/gi, ""))
},jindo.$S.prototype.times = function () {
    var e = g_checkVarType(arguments, {"4str": ["nTimes:Numeric"]}, "$S#times");
    return e ? jindo.$S(Array(e.nTimes + 1).join(this._str)) : this
},jindo.$S.prototype.unescapeHTML = function () {
    var e = {
        quot: '"',
        amp: "&",
        lt: "<",
        gt: ">",
        "#39": "'"
    }, t = this._str.replace(/&([a-z]+|#[0-9]+);/g, function (t, n) {
        return e[n] ? e[n] : t
    });
    return jindo.$S(t)
},jindo.$S.prototype.escape = function () {
    var e = this._str.replace(/([\u0080-\uFFFF]+)|[\n\r\t"'\\]/g, function (e, t, n) {
        return t ? escape(t).replace(/%/g, "\\") : (n = {"\n": "\\n", "\r": "\\r", "	": "\\t"})[e] ? n[e] : "\\" + e
    });
    return jindo.$S(e)
},jindo.$S.prototype.bytes = function (e) {
    var t, n, r = g_checkVarType(arguments, {
        "4voi": [],
        "4num": ["nConfig:Numeric"],
        "4obj": ["nConfig:Hash+"]
    }, "$S#bytes"), i = 0, o = 0, s = 0, a = this._str.length, c = (document.charset || document.characterSet || document.defaultCharset) + "";
    switch (r + "") {
        case"4voi":
            t = !1;
            break;
        case"4num":
            t = !0, n = e;
            break;
        case"4obj":
            c = e.charset || c, n = e.size || !1, t = !!n
    }
    if ("utf-8" == c.toLowerCase()) {
        for (s = 0; a > s; s++)if (i = this._str.charCodeAt(s), o += 128 > i ? 1 : 2048 > i ? 2 : 65536 > i ? 3 : 4, t && o > n) {
            this._str = this._str.substr(0, s);
            break
        }
    } else for (s = 0; a > s; s++)if (o += this._str.charCodeAt(s) > 128 ? 2 : 1, t && o > n) {
        this._str = this._str.substr(0, s);
        break
    }
    return t ? this : o
},jindo.$S.prototype.parseString = function () {
    if ("" == this._str)return {};
    for (var e, t, n, r = this._str.split(/&/g), i = {}, o = !1, s = 0; s < r.length; s++) {
        t = r[s].substring(0, e = r[s].indexOf("=")), o = !1;
        try {
            n = decodeURIComponent(r[s].substring(e + 1))
        } catch (a) {
            o = !0, n = decodeURIComponent(unescape(r[s].substring(e + 1)))
        }
        "[]" == t.substr(t.length - 2, 2) ? (t = t.substring(0, t.length - 2), jindo.$Jindo.isUndefined(i[t]) && (i[t] = []), i[t][i[t].length] = o ? escape(n) : n) : i[t] = o ? escape(n) : n
    }
    return i
},jindo.$S.prototype.escapeRegex = function () {
    var e = this._str, t = /([\?\.\*\+\-\/\(\)\{\}\[\]\:\!\^\$\\\|])/g;
    return jindo.$S(e.replace(t, "\\$1"))
},jindo.$S.prototype.format = function () {
    var e = arguments, t = 0, n = this._str.replace(/%([ 0])?(-)?([1-9][0-9]*)?([bcdsoxX])/g, function (n, r, i, o, s) {
        var a = e[t++], c = "", u = "";
        if (o = o ? +o : 0, "s" == s)c = a + ""; else if (" bcdoxX".indexOf(s) > 0) {
            if (!jindo.$Jindo.isNumeric(a))return "";
            c = "c" == s ? String.fromCharCode(a) : a.toString({
                b: 2,
                d: 10,
                o: 8,
                x: 16,
                X: 16
            }[s]), " X".indexOf(s) > 0 && (c = c.toUpperCase())
        }
        return c.length < o && (u = jindo.$S(r || " ").times(o - c.length)._str), "-" == i ? c += u : c = u + c, c
    });
    return jindo.$S(n)
},jindo.$Json = function (e) {
    var t = arguments.callee;
    if (e instanceof t)return e;
    if (!(this instanceof t))try {
        return jindo.$Jindo._maxWarn(arguments.length, 1, "$Json"), new t(arguments.length ? e : {})
    } catch (n) {
        if (n instanceof TypeError)return null;
        throw n
    }
    g_checkVarType(arguments, {"4var": ["oObject:Variant"]}, "$Json"), this._object = e
},jindo.$Json._oldMakeJSON = function (sObject, sType) {
    try {
        if (!jindo.$Jindo.isString(sObject) || !/^(?:\s*)[\{\[]/.test(sObject))return sObject;
        sObject = eval("(" + sObject + ")")
    } catch (e) {
        throw new jindo.$Error(jindo.$Except.PARSE_ERROR, sType)
    }
    return sObject
},jindo.$Json.fromXML = function (e) {
    var t = jindo.$Jindo, n = (t.checkVarType(arguments, {"4str": ["sXML:String+"]}, "<static> $Json#fromXML"), {}), r = /\s*<(\/?[\w:\-]+)((?:\s+[\w:\-]+\s*=\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'))*)\s*((?:\/>)|(?:><\/\1>|\s*))|\s*<!\[CDATA\[([\w\W]*?)\]\]>\s*|\s*>?([^<]*)/gi, i = /^[0-9]+(?:\.[0-9]+)?$/, o = {
        "&amp;": "&",
        "&nbsp;": " ",
        "&quot;": '"',
        "&lt;": "<",
        "&gt;": ">"
    }, s = {tags: ["/"], stack: [n]}, a = function (e) {
        return t.isUndefined(e) ? "" : e.replace(/&[a-z]+;/g, function (e) {
            return t.isString(o[e]) ? o[e] : e
        })
    }, c = function (e, t) {
        e.replace(/([\w\:\-]+)\s*=\s*(?:"((?:\\"|[^"])*)"|'((?:\\'|[^'])*)')/g, function (e, n, r, i) {
            t[n] = a((r ? r.replace(/\\"/g, '"') : void 0) || (i ? i.replace(/\\'/g, "'") : void 0))
        })
    }, u = function (e) {
        for (var t in e)if (e.hasOwnProperty(t)) {
            if (Object.prototype[t])continue;
            return !1
        }
        return !0
    }, l = function (e, n, r, o, l, d) {
        var p, h = "", m = s.stack.length - 1;
        if (t.isString(n) && n)if ("/" != n.substr(0, 1)) {
            var f = "string" == typeof r && r, _ = "string" == typeof o && o, g = !f && _ ? "" : {};
            if (p = s.stack[m], t.isUndefined(p[n]))p[n] = g, p = s.stack[m + 1] = p[n]; else if (p[n] instanceof Array) {
                var y = p[n].length;
                p[n][y] = g, p = s.stack[m + 1] = p[n][y]
            } else p[n] = [p[n], g], p = s.stack[m + 1] = p[n][1];
            f && c(r, p), s.tags[m + 1] = n, _ && (s.tags.length--, s.stack.length--)
        } else s.tags.length--, s.stack.length--; else t.isString(l) && l ? h = l : t.isString(d) && d && (h = a(d));
        if (h.replace(/^\s+/g, "").length > 0) {
            var v = s.stack[m - 1], j = s.tags[m];
            if (i.test(h) ? h = parseFloat(h) : "true" == h ? h = !0 : "false" == h && (h = !1), t.isUndefined(v))return;
            if (v[j] instanceof Array) {
                var $ = v[j];
                t.isHash($[$.length - 1]) && !u($[$.length - 1]) ? ($[$.length - 1].$cdata = h, $[$.length - 1].toString = function () {
                    return h
                }) : $[$.length - 1] = h
            } else t.isHash(v[j]) && !u(v[j]) ? (v[j].$cdata = h, v[j].toString = function () {
                return h
            }) : v[j] = h
        }
    };
    return e = e.replace(/<(\?|\!-)[^>]*>/g, ""), e.replace(r, l), jindo.$Json(n)
},jindo.$Json.prototype.get = function (e) {
    var t = jindo.$Jindo, n = (t.checkVarType(arguments, {"4str": ["sPath:String+"]}, "$Json#get"), jindo.$Json._oldMakeJSON(this._object, "$Json#get"));
    if (!t.isHash(n) && !t.isArray(n))throw new jindo.$Error(jindo.$Except.JSON_MUST_HAVE_ARRAY_HASH, "$Json#get");
    for (var r, i, o, s, a, c = e.split("/"), u = /^([\w:\-]+)\[([0-9]+)\]$/, l = [[n]], d = l[0], p = c.length, h = 0; p > h; h++)if ("." != c[h] && "" != c[h]) {
        if (".." == c[h])l.length--; else {
            if (o = [], i = -1, r = d.length, 0 == r)return [];
            for (u.test(c[h]) && (i = +RegExp.$2), s = 0; r > s; s++)a = d[s][c[h]], t.isUndefined(a) || (t.isArray(a) ? i > -1 ? i < a.length && (o[o.length] = a[i]) : o = o.concat(a) : -1 == i && (o[o.length] = a));
            l[l.length] = o
        }
        d = l[l.length - 1]
    }
    return d
},jindo.$Json.prototype.toString = function () {
    return jindo.$Json._oldToString(this._object)
},jindo.$Json._oldToString = function (e) {
    var t = jindo.$Jindo, n = {
        $: function (e) {
            return t.isNull(e) || !t.isString(e) && 1 / 0 == e ? "null" : t.isFunction(e) ? void 0 : t.isUndefined(e) ? void 0 : t.isBoolean(e) ? e ? "true" : "false" : t.isString(e) ? this.s(e) : t.isNumeric(e) ? e : t.isArray(e) ? this.a(e) : t.isHash(e) ? this.o(e) : t.isDate(e) ? e + "" : "object" == typeof e || t.isRegExp(e) ? "{}" : isNaN(e) ? "null" : void 0
        }, s: function (e) {
            var t = {'"': '\\"', "\\": "\\\\", "\n": "\\n", "\r": "\\r", "	": "\\t"}, n = function (e) {
                return void 0 !== t[e] ? t[e] : e
            };
            return '"' + e.replace(/[\\"'\n\r\t]/g, n) + '"'
        }, a: function (e) {
            for (var n = "[", r = "", i = e.length, o = 0; i > o; o++)t.isFunction(e[o]) || (n += r + this.$(e[o]), r || (r = ","));
            return n + "]"
        }, o: function (e) {
            e = jindo.$H(e).ksort().$value();
            var n = "{", r = "";
            for (var i in e)if (e.hasOwnProperty(i)) {
                if (t.isUndefined(e[i]) || t.isFunction(e[i]))continue;
                n += r + this.s(i) + ":" + this.$(e[i]), r || (r = ",")
            }
            return n + "}"
        }
    };
    return n.$(e)
},jindo.$Json.prototype.toXML = function () {
    var e = function (t, n) {
        var r = function (e, t) {
            return "<" + n + (t || "") + ">" + e + "</" + n + ">"
        };
        switch (typeof t) {
            case"undefined":
            case"null":
                return r("");
            case"number":
                return r(t);
            case"string":
                return r(t.indexOf("<") < 0 ? t.replace(/&/g, "&amp;") : "<![CDATA[" + t + "]]>");
            case"boolean":
                return r(String(t));
            case"object":
                var i = "";
                if (t instanceof Array)for (var o = t.length, s = 0; o > s; s++)i += e(t[s], n); else {
                    var a = "";
                    for (var c in t)if (t.hasOwnProperty(c)) {
                        if ("$cdata" == c || "function" == typeof t[c])continue;
                        i += e(t[c], c)
                    }
                    n && (i = r(i, a))
                }
                return i
        }
    };
    return e(jindo.$Json._oldMakeJSON(this._object, "$Json#toXML"), "")
},jindo.$Json.prototype.toObject = function () {
    return jindo.$Json._oldMakeJSON(this._object, "$Json#toObject")
},jindo.$Json.prototype.compare = function (e) {
    function t(e, t) {
        if (n.isArray(e)) {
            if (e.length !== t.length)return !1;
            for (var r = 0, i = e.length; i > r; r++)if (!arguments.callee(e[r], t[r]))return !1;
            return !0
        }
        if (n.isRegExp(e) || n.isFunction(e) || n.isDate(e))return String(e) === String(t);
        if ("number" == typeof e && isNaN(e))return isNaN(t);
        if (n.isHash(e)) {
            var i = 0;
            for (var o in e)i++;
            for (var o in t)i--;
            if (0 !== i)return !1;
            for (var o in e)if (o in t == !1 || !arguments.callee(e[o], t[o]))return !1;
            return !0
        }
        return e === t
    }

    {
        var n = jindo.$Jindo;
        n.checkVarType(arguments, {"4obj": ["oData:Hash+"], "4arr": ["oData:Array+"]}, "$Json#compare")
    }
    try {
        return t(jindo.$Json._oldMakeJSON(this._object, "$Json#compare"), e)
    } catch (r) {
        return !1
    }
},jindo.$Json.prototype.$value = jindo.$Json.prototype.toObject,jindo.$Ajax = function (e, t) {
    function n() {
        return new XMLHttpRequest
    }

    var r = arguments.callee;
    if (!(this instanceof r))try {
        return jindo.$Jindo._maxWarn(arguments.length, 2, "$Ajax"), new r(e, t || {})
    } catch (i) {
        if (i instanceof TypeError)return null;
        throw i
    }
    var o = jindo.$Ajax, s = jindo.$Error, a = jindo.$Except, c = g_checkVarType(arguments, {
        "4str": ["sURL:String+"],
        "4obj": ["sURL:String+", "oOption:Hash+"]
    }, "$Ajax");
    c + "" == "for_string" && (c.oOption = {});
    var u = location.toString(), l = "";
    try {
        l = u.match(/^https?:\/\/([a-z0-9_\-\.]+)/i)[1]
    } catch (i) {
    }
    this._status = 0, this._url = c.sURL, this._headers = {}, this._options = {
        type: "xhr",
        method: "post",
        proxy: "",
        timeout: 0,
        onload: function () {
        },
        onerror: null,
        ontimeout: function () {
        },
        jsonp_charset: "utf-8",
        callbackid: "",
        callbackname: "",
        async: !0,
        decode: !0,
        postBody: !1,
        withCredentials: !1,
        data: null
    }, this._options = o._setProperties(c.oOption, this), o._validationOption(this._options, "$Ajax"), o.CONFIG && this.option(o.CONFIG);
    var d = this._options;
    d.type = d.type.toLowerCase(), d.method = d.method.toLowerCase(), void 0 === window["__" + jindo._p_.jindoName + "_callback"] && (window["__" + jindo._p_.jindoName + "_callback"] = [], window["__" + jindo._p_.jindoName + "2_callback"] = []);
    var p = this;
    switch (d.type) {
        case"put":
        case"delete":
        case"get":
        case"post":
            d.method = d.type;
        case"xhr":
            this._request = n();
            break;
        case"jsonp":
            if (!o.JSONPRequest)throw new s(jindo._p_.jindoName + ".$Ajax.JSONPRequest" + a.REQUIRE_AJAX, "$Ajax");
            this._request = new o.JSONPRequest(function () {
                return p.option.apply(p, arguments)
            })
    }
    this._checkCORS(this._url, d.type, "")
},jindo.$Ajax.prototype._checkCORS = function (e, t, n) {
    if (this._bCORS = !1, /^http/.test(e) && !new RegExp("^https?://" + window.location.host, "i").test(e) && "xhr" === t) {
        if (!("withCredentials" in this._request))throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_CORS, "$Ajax" + n);
        this._bCORS = !0
    }
},jindo.$Ajax._setProperties = function (e, t) {
    e = e || {};
    var n;
    return "put" != e.type && "delete" != e.type && "get" != e.type && "post" != e.type || e.method || (e.method = e.type, n = e.type = "xhr"), n = e.type = e.type || "xhr", e.onload = jindo.$Fn(e.onload || function () {
        }, t).bind(), e.ontimeout = jindo.$Fn(e.ontimeout || function () {
        }, t).bind(), e.onerror = jindo.$Fn(e.onerror || function () {
        }, t).bind(), e.method = e.method || "post", "xhr" == n ? (e.async = void 0 === e.async ? !0 : e.async, e.postBody = void 0 === e.postBody ? !1 : e.postBody, e.withCredentials = void 0 === e.withCredentials ? !1 : e.withCredentials) : "jsonp" == n && (e.method = "get", e.jsonp_charset = e.jsonp_charset || "utf-8", e.callbackid = e.callbackid || "", e.callbackname = e.callbackname || ""), e
},jindo.$Ajax._validationOption = function (e, t) {
    var n = (jindo.$Error, jindo.$Except), r = e.type;
    "jsonp" === r ? "get" !== e.method && jindo.$Jindo._warn(n.CANNOT_USE_OPTION + "\n	" + t + "-method=" + e.method) : "flash" === r ? "get" !== e.method && "post" !== e.method && jindo.$Jindo._warn(n.CANNOT_USE_OPTION + "\n	" + t + "-method=" + e.method) : "xhr" === r && e.data && e.data.constructor !== window.FormData && jindo.$Jindo._warn(n.CANNOT_USE_OPTION + "\n	" + t + "-data=" + e.data), e.postBody && ("xhr" !== r || "get" === e.method) && jindo.$Jindo._warn(n.CANNOT_USE_OPTION + "\n	" + e.method + "-postBody=" + e.postBody);
    var i = {
        xhr: "onload|timeout|ontimeout|onerror|async|method|postBody|type|withCredentials|data",
        jsonp: "onload|timeout|ontimeout|onerror|jsonp_charset|callbackid|callbackname|method|type"
    }, o = [], s = 0;
    for (var a in e)o[s++] = a;
    for (var c = i[r] || "", s = 0, u = o.length; u > s; s++)-1 == c.indexOf(o[s]) && jindo.$Jindo._warn(n.CANNOT_USE_OPTION + "\n	" + r + "-" + o[s])
},jindo.$Ajax.prototype._onload = function () {
    var e, t = this._request.status, n = 4 == this._request.readyState && (200 == t || 0 == t);
    if (4 == this._request.readyState)try {
        !n && jindo.$Jindo.isFunction(this._options.onerror) ? this._options.onerror(new jindo.$Ajax.Response(this._request)) : e = this._options.onload(new jindo.$Ajax.Response(this._request))
    } finally {
        this._status--, jindo.$Jindo.isFunction(this._oncompleted) && this._oncompleted(n, e)
    }
},jindo.$Ajax.prototype.request = function (e) {
    var t = jindo.$Jindo, n = t.checkVarType(arguments, {
        "4voi": [],
        "4obj": [t._F("oData:Hash+")],
        "4str": ["sData:String+"]
    }, "$Ajax#request");
    this._status++;
    var r, i = this, o = this._request, s = this._options, a = [], c = "", u = !1, l = null, d = this._url;
    this._is_abort = !1;
    var p = s.type.toUpperCase(), h = s.method.toUpperCase();
    if (s.postBody && "XHR" == p && "GET" != h)c = n + "" == "4str" ? n.sData : n + "" == "4obj" ? jindo.$Json(n.oData).toString() : null; else switch (n + "") {
        case"4voi":
            c = null;
            break;
        case"4obj":
            var e = n.oData;
            for (var m in e)if (e.hasOwnProperty(m))if (r = e[m], t.isFunction(r) && (r = r()), t.isArray(r) || jindo.$A && r instanceof jindo.$A) {
                r instanceof jindo.$A && (r = r._array);
                for (var f = 0; f < r.length; f++)a[a.length] = m + "=" + encodeURIComponent(r[f])
            } else a[a.length] = m + "=" + encodeURIComponent(r);
            c = a.join("&")
    }
    if (c && "XHR" == p && "GET" == h && (d += -1 == d.indexOf("?") ? "?" : "&", d += c, c = null), "XHR" == p ? o.open(h, d, !!s.async) : o.open(h, d), s.withCredentials && (o.withCredentials = !0), "XHR" == p && "POST" == h && (s.data && s.data.constructor === window.FormData && (c = s.data, u = !0), o.setRequestHeader("If-Modified-Since", "Thu, 1 Jan 1970 00:00:00 GMT")), "XHR" == p) {
        this._headers["Content-Type"] || u || o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"), this._bCORS || this._headers["X-Requested-With"] || o.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        for (var _ in this._headers)if (this._headers.hasOwnProperty(_)) {
            if ("function" == typeof this._headers[_])continue;
            o.setRequestHeader(_, String(this._headers[_]))
        }
    }
    return o.addEventListener ? (this._loadFunc && o.removeEventListener("load", this._loadFunc, !1), this._errorFun && o.removeEventListener("error", this._errorFun, !1), this._loadFunc = function () {
        clearTimeout(l), l = void 0, i._onload()
    }, this._errorFun = function () {
        clearTimeout(l), l = void 0, i._options.onerror(new jindo.$Ajax.Response(i._request))
    }, o.addEventListener("load", this._loadFunc, !1), o.addEventListener("error", this._errorFun, !1)) : void 0 !== o.onload ? o.onload = function () {
        4 != o.readyState || i._is_abort || (clearTimeout(l), l = void 0, i._onload())
    } : o.onreadystatechange = function () {
        4 == o.readyState && (clearTimeout(l), l = void 0, i._onload())
    }, s.timeout > 0 && (this._timer && clearTimeout(this._timer), l = setTimeout(function () {
        i._is_abort = !0, i._interval && (clearInterval(i._interval), i._interval = void 0);
        try {
            o.abort()
        } catch (e) {
        }
        s.ontimeout(o), t.isFunction(i._oncompleted) && i._oncompleted(!1)
    }, 1e3 * s.timeout), this._timer = l), this._test_url = d, o.send(c), this
},jindo.$Ajax.prototype.isIdle = function () {
    return 0 == this._status
},jindo.$Ajax.prototype.abort = function () {
    try {
        this._interval && clearInterval(this._interval), this._timer && clearTimeout(this._timer), this._interval = void 0, this._timer = void 0, this._is_abort = !0, this._request.abort()
    } finally {
        this._status--
    }
    return this
},jindo.$Ajax.prototype.url = function () {
    var e = g_checkVarType(arguments, {g: [], s: ["sURL:String+"]}, "$Ajax#url");
    switch (e + "") {
        case"g":
            return this._url;
        case"s":
            return this._checkCORS(e.sURL, this._options.type, "#url"), this._url = e.sURL, this
    }
},jindo.$Ajax.prototype.option = function () {
    var e = g_checkVarType(arguments, {
        s4var: ["sKey:String+", "vValue:Variant"],
        s4obj: ["oOption:Hash+"],
        g: ["sKey:String+"]
    }, "$Ajax#option");
    switch (e + "") {
        case"s4var":
            e.oOption = {}, e.oOption[e.sKey] = e.vValue;
        case"s4obj":
            var t = e.oOption;
            try {
                for (var n in t)t.hasOwnProperty(n) && (this._options[n] = "onload" === n || "ontimeout" === n || "onerror" === n ? jindo.$Fn(t[n], this).bind() : t[n])
            } catch (r) {
            }
            break;
        case"g":
            return this._options[e.sKey]
    }
    return this._checkCORS(this._url, this._options.type, "#option"), jindo.$Ajax._validationOption(this._options, "$Ajax#option"), this
},jindo.$Ajax.prototype.header = function () {
    "jsonp" === this._options.type && jindo.$Jindo._warn(jindo.$Except.CANNOT_USE_HEADER);
    var e = g_checkVarType(arguments, {
        s4str: ["sKey:String+", "sValue:String+"],
        s4obj: ["oOption:Hash+"],
        g: ["sKey:String+"]
    }, "$Ajax#option");
    switch (e + "") {
        case"s4str":
            this._headers[e.sKey] = e.sValue;
            break;
        case"s4obj":
            var t = e.oOption;
            try {
                for (var n in t)t.hasOwnProperty(n) && (this._headers[n] = t[n])
            } catch (r) {
            }
            break;
        case"g":
            return this._headers[e.sKey]
    }
    return this
},jindo.$Ajax.prototype.$value = function () {
    return this._request
},jindo.$Ajax.Response = function (e) {
    this._response = e, this._regSheild = /^for\(;;\);/
},jindo.$Ajax.Response.prototype.xml = function () {
    return this._response.responseXML
},jindo.$Ajax.Response.prototype.text = function () {
    return this._response.responseText.replace(this._regSheild, "")
},jindo.$Ajax.Response.prototype.status = function () {
    var e = this._response.status;
    return 0 == e ? 200 : e
},jindo.$Ajax.Response.prototype.readyState = function () {
    return this._response.readyState
},jindo.$Ajax.Response.prototype.json = function () {
    if (this._response.responseJSON)return this._response.responseJSON;
    if (this._response.responseText)try {
        return eval("(" + this.text() + ")")
    } catch (e) {
        throw new jindo.$Error(jindo.$Except.PARSE_ERROR, "$Ajax#json")
    }
    return {}
},jindo.$Ajax.Response.prototype.header = function (e) {
    var t = g_checkVarType(arguments, {"4str": ["name:String+"], "4voi": []}, "$Ajax.Response#header");
    switch (t + "") {
        case"4str":
            return this._response.getResponseHeader(e);
        case"4voi":
            return this._response.getAllResponseHeaders()
    }
},jindo.$Ajax.Response.prototype.$value = function () {
    return this._response
};
var klass = jindo.$Class;
jindo.$Ajax.RequestBase = klass({
    _respHeaderString: "",
    callbackid: "",
    callbackname: "",
    responseXML: null,
    responseJSON: null,
    responseText: "",
    status: 404,
    readyState: 0,
    $init: function () {
    },
    onload: function () {
    },
    abort: function () {
    },
    open: function () {
    },
    send: function () {
    },
    setRequestHeader: function (e, t) {
        g_checkVarType(arguments, {"4str": ["sName:String+", "sValue:String+"]}, "$Ajax.RequestBase#setRequestHeader"), this._headers[e] = t
    },
    getResponseHeader: function (e) {
        return g_checkVarType(arguments, {"4str": ["sName:String+"]}, "$Ajax.RequestBase#getResponseHeader"), this._respHeaders[e] || ""
    },
    getAllResponseHeaders: function () {
        return this._respHeaderString
    },
    _getCallbackInfo: function () {
        var e = "";
        if (this.option("callbackid") && "" != this.option("callbackid")) {
            var t = 0;
            do e = "_" + this.option("callbackid") + "_" + t, t++; while (window["__" + jindo._p_.jindoName + "_callback"][e])
        } else do e = "_" + Math.floor(1e4 * Math.random()); while (window["__" + jindo._p_.jindoName + "_callback"][e]);
        return "" == this.option("callbackname") && this.option("callbackname", "_callback"), {
            callbackname: this.option("callbackname"),
            id: e,
            name: "window.__" + jindo._p_.jindoName + "_callback." + e
        }
    }
}), jindo.$Ajax.JSONPRequest = klass({
    _headers: {},
    _respHeaders: {},
    _script: null,
    _onerror: null,
    $init: function (e) {
        this.option = e
    },
    _callback: function (e) {
        this._onerror && (clearTimeout(this._onerror), this._onerror = null);
        var t = this;
        this.responseJSON = e, this.onload(this), setTimeout(function () {
            t.abort()
        }, 10)
    },
    abort: function () {
        if (this._script)try {
            this._script.parentNode.removeChild(this._script)
        } catch (e) {
        }
    },
    open: function (e, t) {
        g_checkVarType(arguments, {"4str": ["method:String+", "url:String+"]}, "$Ajax.JSONPRequest#open"), this.responseJSON = null, this._url = t
    },
    send: function (e) {
        var t = g_checkVarType(arguments, {
            "4voi": [],
            "4nul": ["data:Null"],
            "4str": ["data:String+"]
        }, "$Ajax.JSONPRequest#send"), n = this, r = this._getCallbackInfo(), i = document.getElementsByTagName("head")[0];
        this._script = document.createElement("script"), this._script.type = "text/javascript", this._script.charset = this.option("jsonp_charset"), i ? i.appendChild(this._script) : document.body && document.body.appendChild(this._script), window["__" + jindo._p_.jindoName + "_callback"][r.id] = function (e) {
            try {
                n.readyState = 4, n.status = 200, n._callback(e)
            } finally {
                delete window["__" + jindo._p_.jindoName + "_callback"][r.id], delete window["__" + jindo._p_.jindoName + "2_callback"][r.id]
            }
        }, window["__" + jindo._p_.jindoName + "2_callback"][r.id] = function (e) {
            window["__" + jindo._p_.jindoName + "_callback"][r.id](e)
        };
        var o = function () {
            n.responseJSON || (n.readyState = 4, n.status = 500, n._onerror = setTimeout(function () {
                n._callback(null)
            }, 200))
        };
        this._script.onload = this._script.onerror = function () {
            o(), this.onerror = null, this.onload = null
        };
        var s = "&";
        switch (-1 == this._url.indexOf("?") && (s = "?"), t + "") {
            case"4voi":
            case"4nul":
                e = "";
                break;
            case"4str":
                e = "&" + e
        }
        this._test_url = this._script.src = this._url + s + r.callbackname + "=" + r.name + e
    }
}).extend(jindo.$Ajax.RequestBase), jindo.$Ajax.Queue = function (e) {
    var t = arguments.callee;
    if (!(this instanceof t))return new t(e || {});
    var n = g_checkVarType(arguments, {"4voi": [], "4obj": ["option:Hash+"]}, "$Ajax.Queue");
    e = n.option, this._options = {async: !1, useResultAsParam: !1, stopOnFailure: !1}, this.option(e), this._queue = []
}, jindo.$Ajax.Queue.prototype.option = function () {
    var e = g_checkVarType(arguments, {
        s4str: ["sKey:String+", "sValue:Variant"],
        s4obj: ["oOption:Hash+"],
        g: ["sKey:String+"]
    }, "$Ajax.Queue#option");
    switch (e + "") {
        case"s4str":
            this._options[e.sKey] = e.sValue;
            break;
        case"s4obj":
            var t = e.oOption;
            try {
                for (var n in t)t.hasOwnProperty(n) && (this._options[n] = t[n])
            } catch (r) {
            }
            break;
        case"g":
            return this._options[e.sKey]
    }
    return this
}, jindo.$Ajax.Queue.prototype.add = function (e, t) {
    var n = g_checkVarType(arguments, {
        "4obj": ["oAjax:Hash+"],
        "4obj2": ["oAjax:Hash+", "oPram:Hash+"]
    }, "$Ajax.Queue");
    switch (n + "") {
        case"4obj2":
            t = n.oPram
    }
    return this._queue.push({obj: e, param: t}), this
}, jindo.$Ajax.Queue.prototype.request = function () {
    return this._requestAsync.apply(this, this.option("async") ? [] : [0]), this
}, jindo.$Ajax.Queue.prototype._requestSync = function (e, t) {
    var n = this, r = this._queue;
    r.length > e + 1 && (r[e].obj._oncompleted = function (t, r) {
        (!n.option("stopOnFailure") || t) && n._requestSync(e + 1, r)
    });
    var i = r[e].param || {};
    if (this.option("useResultAsParam") && t)try {
        for (var o in t)void 0 === i[o] && t.hasOwnProperty(o) && (i[o] = t[o])
    } catch (s) {
    }
    r[e].obj.request(i)
}, jindo.$Ajax.Queue.prototype._requestAsync = function () {
    for (var e = 0; e < this._queue.length; e++)this._queue[e].obj.request(this._queue[e].param || {})
}, jindo.$Date = function (e) {
    var t = arguments, n = arguments.callee;
    if (e && e instanceof n)return e;
    if (!(this instanceof n)) {
        for (var r = "", i = 0, o = t.length; o > i; i++)r += "a[" + i + "],";
        var s = new Function("cl", "a", "return new cl(" + r.replace(/,$/, "") + ");");
        try {
            return jindo.$Jindo._maxWarn(arguments.length, 7, "$Date"), s(n, t)
        } catch (a) {
            if (a instanceof TypeError)return null;
            throw a
        }
    }
    var c = g_checkVarType(arguments, {
        "4voi": [],
        "4str": ["src:String+"],
        "4num": ["src:Numeric"],
        "4dat": ["src:Date+"],
        "4num2": ["src:Numeric", "src:Numeric"],
        "4num3": ["src:Numeric", "src:Numeric", "src:Numeric"],
        "4num4": ["src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric"],
        "4num5": ["src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric"],
        "4num6": ["src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric"],
        "4num7": ["src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric", "src:Numeric"]
    }, "$Date");
    switch (c + "") {
        case"4voi":
            this._date = new Date;
            break;
        case"4num":
            this._date = new Date(1 * e);
            break;
        case"4str":
            this._date = /(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)))/.test(e) ? jindo.$Date._makeISO(e) : n.parse(e);
            break;
        case"4dat":
            (this._date = new Date).setTime(e.getTime()), this._date.setMilliseconds(e.getMilliseconds());
            break;
        case"4num2":
        case"4num3":
        case"4num4":
        case"4num5":
        case"4num6":
        case"4num7":
            for (var i = 0; 7 > i; i++)jindo.$Jindo.isNumeric(t[i]) || (t[i] = 2 == i ? 1 : 0);
            this._date = new Date(t[0], t[1], t[2], t[3], t[4], t[5], t[6])
    }
    this._names = {};
    for (var i in jindo.$Date.names)jindo.$Date.names.hasOwnProperty(i) && (this._names[i] = jindo.$Date.names[i])
}, jindo.$Date._makeISO = function (e) {
    var t = e.match(/(\d{4})(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/), n = parseInt(t[4] || 0, 10), r = parseInt(t[5] || 0, 10);
    return "Z" == t[8] ? n += jindo.$Date.utc : ("+" == t[9] || "-" == t[9]) && (n += jindo.$Date.utc - parseInt(t[9] + t[10], 10), r += parseInt(t[9] + t[11], 10)), new Date(t[1] || 0, parseInt(t[2] || 0, 10) - 1, t[3] || 0, n, r, t[6] || 0, t[7] || 0)
}, jindo.$Date._paramCheck = function (e, t) {
    return g_checkVarType(e, {s: ["nParm:Numeric"], g: []}, "$Date#" + t)
}, jindo.$Date.names = {
    month: ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "Novermber", "December"],
    s_month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    s_day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ampm: ["AM", "PM"]
}, jindo.$Date.utc = (new Date).getTimezoneOffset() / 60 * -1, jindo.$Date.now = function () {
    return this.now = Date.now ? function () {
        return Date.now()
    } : function () {
        return +new Date
    }, this.now()
}, jindo.$Date.prototype.name = function (e, t) {
    var n = g_checkVarType(arguments, {
        s4str: ["sKey:String+", "aValue:Array+"],
        s4obj: ["oObject:Hash+"],
        g: ["sKey:String+"]
    }, "$Date#name");
    switch (n + "") {
        case"s4str":
            this._names[e] = t;
            break;
        case"s4obj":
            e = n.oObject;
            for (var r in e)e.hasOwnProperty(r) && (this._names[r] = e[r]);
            break;
        case"g":
            return this._names[e]
    }
    return this
}, jindo.$Date.parse = function (e) {
    var t = (g_checkVarType(arguments, {"4str": ["sKey:String+"]}, "$Date#parse"), new Date(Date.parse(e)));
    if (isNaN(t) || "Invalid Date" == t)throw new jindo.$Error(jindo.$Except.INVALID_DATE, "$Date#parse");
    return t
}, jindo.$Date.prototype.$value = function () {
    return this._date
}, jindo.$Date.prototype.format = function (e) {
    var t = g_checkVarType(arguments, {"4str": ["sFormat:String+"]}, "$Date#format");
    e = t.sFormat;
    var n = {}, r = this._date, i = this._names, o = this;
    return (e || "").replace(/[a-z]/gi, function (e) {
        if (void 0 !== n[e])return n[e];
        switch (e) {
            case"d":
            case"j":
                return n.j = r.getDate(), n.d = (n.j > 9 ? "" : "0") + n.j, n[e];
            case"l":
            case"D":
            case"w":
            case"N":
                return n.w = r.getDay(), n.N = n.w ? n.w : 7, n.D = i.s_day[n.w], n.l = i.day[n.w], n[e];
            case"S":
                return (n.S = ["st", "nd", "rd"][r.getDate()]) ? n.S : n.S = "th";
            case"z":
                return n.z = Math.floor((r.getTime() - new Date(r.getFullYear(), 0, 1).getTime()) / 864e5), n.z;
            case"m":
            case"n":
                return n.n = r.getMonth() + 1, n.m = (n.n > 9 ? "" : "0") + n.n, n[e];
            case"F":
            case"M":
                return n[e] = i["F" == e ? "month" : "s_month"][r.getMonth()], n[e];
            case"L":
                return n.L = o.isLeapYear(), n.L;
            case"o":
            case"Y":
            case"y":
                return n.o = n.Y = r.getFullYear(), n.y = (n.o + "").substr(2), n[e];
            case"a":
            case"A":
            case"g":
            case"G":
            case"h":
            case"H":
                return n.G = r.getHours(), n.g = (n.g = n.G % 12) ? n.g : 12, n.A = n.G < 12 ? i.ampm[0] : i.ampm[1], n.a = n.A.toLowerCase(), n.H = (n.G > 9 ? "" : "0") + n.G, n.h = (n.g > 9 ? "" : "0") + n.g, n[e];
            case"i":
                return n.i = ((n.i = r.getMinutes()) > 9 ? "" : "0") + n.i, n.i;
            case"s":
                return n.s = ((n.s = r.getSeconds()) > 9 ? "" : "0") + n.s, n.s;
            case"u":
                return n.u = r.getMilliseconds(), n.u;
            case"U":
                return n.U = o.time(), n.U;
            default:
                return e
        }
    })
}, jindo.$Date.prototype.time = function (e) {
    var t = jindo.$Date._paramCheck(arguments, "time");
    switch (e = t.nParm, t + "") {
        case"s":
            return this._date.setTime(e), this;
        case"g":
            return this._date.getTime()
    }
}, jindo.$Date.prototype.year = function (e) {
    var t = jindo.$Date._paramCheck(arguments, "year");
    switch (e = t.nParm, t + "") {
        case"s":
            return this._date.setFullYear(e), this;
        case"g":
            return this._date.getFullYear()
    }
}, jindo.$Date.prototype.month = function (e) {
    var t = jindo.$Date._paramCheck(arguments, "month");
    switch (e = t.nParm, t + "") {
        case"s":
            return this._date.setMonth(e), this;
        case"g":
            return this._date.getMonth()
    }
}, jindo.$Date.prototype.date = function (e) {
    var t = jindo.$Date._paramCheck(arguments, "date");
    switch (e = t.nParm, t + "") {
        case"s":
            return this._date.setDate(e), this;
        case"g":
            return this._date.getDate()
    }
}, jindo.$Date.prototype.day = function () {
    return this._date.getDay()
}, jindo.$Date.prototype.hours = function (e) {
    var t = jindo.$Date._paramCheck(arguments, "hours");
    switch (e = t.nParm, t + "") {
        case"s":
            return this._date.setHours(e), this;
        case"g":
            return this._date.getHours()
    }
}, jindo.$Date.prototype.minutes = function (e) {
    var t = jindo.$Date._paramCheck(arguments, "minutes");
    switch (e = t.nParm, t + "") {
        case"s":
            return this._date.setMinutes(e), this;
        case"g":
            return this._date.getMinutes()
    }
}, jindo.$Date.prototype.seconds = function (e) {
    var t = jindo.$Date._paramCheck(arguments, "seconds");
    switch (e = t.nParm, t + "") {
        case"s":
            return this._date.setSeconds(e), this;
        case"g":
            return this._date.getSeconds()
    }
}, jindo.$Date.prototype.isLeapYear = function () {
    var e = this._date.getFullYear();
    return !((e % 4 || !(e % 100)) && e % 400)
}, jindo.$Date.prototype.compare = function (e, t) {
    var n = g_checkVarType(arguments, {
        "4dat": ["oDate:Date+"],
        "4str": ["oDate:Date+", "sType:String+"]
    }, "$Date#compare");
    return e = n.oDate, t = n.sType, t ? "s" === t ? Math.floor(e / 1e3) - Math.floor(this._date / 1e3) : "i" === t ? Math.floor(Math.floor(e / 1e3) / 60) - Math.floor(Math.floor(this._date / 1e3) / 60) : "h" === t ? Math.floor(Math.floor(Math.floor(e / 1e3) / 60) / 60) - Math.floor(Math.floor(Math.floor(this._date / 1e3) / 60) / 60) : "d" === t ? Math.floor(Math.floor(Math.floor(Math.floor(e / 1e3) / 60) / 60) / 24) - Math.floor(Math.floor(Math.floor(Math.floor(this._date / 1e3) / 60) / 60) / 24) : "m" === t ? e.getMonth() - this._date.getMonth() : "y" === t ? e.getFullYear() - this._date.getFullYear() : void 0 : e - this._date
}, jindo.$Cookie = function () {
    {
        var e = arguments.callee;
        e._cached
    }
    if (e._cached)return e._cached;
    if (!(this instanceof e))try {
        return jindo.$Jindo._maxWarn(arguments.length, 1, "$Cookie"), arguments.length > 0 ? new e(arguments[0]) : new e
    } catch (t) {
        if (t instanceof TypeError)return null;
        throw t
    }
    if (!(this instanceof e))return new e;
    e._cached = this;
    var n = jindo.$Jindo.checkVarType(arguments, {"4voi": [], "4bln": ["bURIComponent:Boolean"]}, "$Cookie");
    switch (n + "") {
        case"4voi":
            this._bURIComponent = !1;
            break;
        case"4bln":
            this._bURIComponent = n.bURIComponent
    }
}, jindo.$Cookie.prototype.keys = function () {
    for (var e = document.cookie.split(";"), t = /^\s+|\s+$/g, n = new Array, r = 0; r < e.length; r++)n[n.length] = e[r].substr(0, e[r].indexOf("=")).replace(t, "");
    return n
}, jindo.$Cookie.prototype.get = function (e) {
    for (var t, n, r = (jindo.$Jindo.checkVarType(arguments, {"4str": ["sName:String+"]}, "$Cookie#get"), document.cookie.split(/\s*;\s*/)), i = new RegExp("^(\\s*" + e + "\\s*=)"), o = 0; o < r.length; o++)if (i.test(r[o]))return t = r[o].substr(RegExp.$1.length), n = this._bURIComponent && jindo.$Jindo.isNull(t.match(/%u\w{4}/)) ? decodeURIComponent(t) : unescape(t);
    return null
}, jindo.$Cookie.prototype.set = function (e, t, n, r, i) {
    var o, s = jindo.$Jindo, a = s.checkVarType(arguments, {
        "4str": ["sName:String+", "sValue:String+"],
        day_for_string: ["sName:String+", "sValue:String+", "nDays:Numeric"],
        domain_for_string: ["sName:String+", "sValue:String+", "nDays:Numeric", "sDomain:String+"],
        path_for_string: ["sName:String+", "sValue:String+", "nDays:Numeric", "sDomain:String+", "sPath:String+"],
        "4num": ["sName:String+", "sValue:Numeric"],
        day_for_num: ["sName:String+", "sValue:Numeric", "nDays:Numeric"],
        domain_for_num: ["sName:String+", "sValue:Numeric", "nDays:Numeric", "sDomain:String+"],
        path_for_num: ["sName:String+", "sValue:Numeric", "nDays:Numeric", "sDomain:String+", "sPath:String+"]
    }, "$Cookie#set"), c = "";
    return a + "" != "4str" && 0 !== n && (c = ";expires=" + new Date((new Date).getTime() + 1e3 * n * 60 * 60 * 24).toGMTString()), s.isUndefined(r) && (r = ""), s.isUndefined(i) && (i = "/"), o = this._bURIComponent ? encodeURIComponent(t) : escape(t), document.cookie = e + "=" + o + c + "; path=" + i + (r ? "; domain=" + r : ""), this
}, jindo.$Cookie.prototype.remove = function (e) {
    for (var t = jindo.$Jindo, n = (t.checkVarType(arguments, {
        "4str": ["sName:String+"],
        domain_for_string: ["sName:String+", "sDomain:String+"],
        path_for_string: ["sName:String+", "sDomain:String+", "sPath:String+"]
    }, "$Cookie#remove"), jindo._p_._toArray(arguments)), r = [], i = 0, o = n.length; o > i; i++)r.push(n[i]), 0 == i && (r.push(""), r.push(-1));
    return t.isNull(this.get(e)) || this.set.apply(this, r), this
}, jindo.$Template = function (e, t) {
    var n, r = null, i = "", o = arguments.callee;
    if (e instanceof o)return e;
    if (!(this instanceof o))try {
        return jindo.$Jindo._maxWarn(arguments.length, 2, "$Template"), new o(e || "", t || "default")
    } catch (s) {
        if (s instanceof TypeError)return null;
        throw s
    }
    var a = g_checkVarType(arguments, {
        "4str": ["str:String+"],
        "4ele": ["ele:Element+"],
        "4str3": ["str:String+", "sEngineName:String+"],
        "4ele3": ["ele:Element+", "sEngineName:String+"]
    }, "$Template");
    switch ((r = document.getElementById(e) || e) && r.tagName && (i = r.tagName.toUpperCase()) && ("TEXTAREA" == i || "SCRIPT" == i && "text/template" == r.getAttribute("type")) && (e = (r.value || r.innerHTML).replace(/^\s+|\s+$/g, "")), this._str = e + "", n = "default", a + "") {
        case"4str3":
        case"4ele3":
            n = a.sEngineName
    }
    this._compiler = jindo.$Template.getEngine(n)
}, jindo.$Template._aEngines = {}, jindo.$Template._cache = {}, jindo.$Template.splitter = /(?!\\)[\{\}]/g, jindo.$Template.pattern = /^(?:if (.+)|elseif (.+)|for (?:(.+)\:)?(.+) in (.+)|(else)|\/(if|for)|=(.+)|js (.+)|set (.+)|gset (.+))$/, jindo.$Template.addEngine = function () {
    var e = g_checkVarType(arguments, {"4fun": ["sEngineName:String+", "fEngine:Function+"]}, "$Template#addEngine");
    jindo.$Template._aEngines[e.sEngineName] = e.fEngine
}, jindo.$Template.getEngine = function () {
    var e = g_checkVarType(arguments, {"4str": ["sEngineName:String+"]}, "$Template#getEngine");
    return jindo.$Template._aEngines[e.sEngineName]
}, jindo.$Template.prototype.process = function () {
    var e, t = g_checkVarType(arguments, {"4obj": ["data:Hash+"], "4voi": []}, "$Template#process");
    return jindo.$Template._cache && jindo.$Template._cache[this._str] ? (e = jindo.$Template._cache[this._str])(t + "" == "for_void" ? "" : t.data) : (jindo.$Template._cache[this._str] = e = this._compiler(this._str), e(t + "" == "for_void" ? "" : t.data))
}, jindo.$Template.addEngine("default", function (e) {
    function t(e) {
        return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")
    }

    e = e.replace(/\\{/g, "#LEFT_CURLY_BRACKET#").replace(/\\}/g, "#RIGHT_CURLY_BRACKET#");
    var n = [], r = !1;
    n.push("var $RET$ = [];"), n.push('var $SCOPE$ = $ARG$ && typeof $ARG$ === "object" ? $ARG$ : {};'), n.push("with ($SCOPE$) {");
    var i = 0;
    do r = !1, e = e.replace(/^[^{]+/, function (e) {
        return r = n.push('$RET$.push("' + t(e) + '");'), ""
    }), e = e.replace(/^{=([^}]+)}/, function (e, t) {
        return r = n.push("typeof " + t + ' != "undefined" && $RET$.push(' + t + ");"), ""
    }), e = e.replace(/^{js\s+([^}]+)}/, function (e, t) {
        return t = t.replace(/(=(?:[a-zA-Z_][\w\.]*)+)/g, function (e) {
            return e.replace("=", "")
        }), r = n.push("$RET$.push(" + t + ");"), ""
    }), e = e.replace(/^{(g)?set\s+([^=]+)=([^}]+)}/, function (e, t, i, o) {
        return r = n.push((t ? "var " : "$SCOPE$.") + i + "=" + o.replace(/(\s|\(|\[)=/g, "$1") + ";"), ""
    }), e = e.replace(/^{for\s+([^:}]+)(:([^\s]+))?\s+in\s+([^}]+)}/, function (e, t, e, o, s) {
        o || (o = t, t = "$NULL$" + i);
        var a = "$I$" + i, c = "$CB$" + i;
        return i++, n.push("(function(" + c + ") {"), n.push("if (jindo.$Jindo.isArray(" + s + ")) {"), n.push("for (var " + a + " = 0; " + a + " < " + s + ".length; " + a + "++) {"), n.push(c + "(" + a + ", " + s + "[" + a + "]);"), n.push("}"), n.push("} else {"), n.push("for (var " + a + " in " + s + ") if (" + s + ".hasOwnProperty(" + a + ")) { "), n.push(c + "(" + a + ", " + s + "[" + a + "]);"), n.push("}"), n.push("}"), n.push("})(function(" + t + ", " + o + ") {"), r = !0, ""
    }), e = e.replace(/^{\/for}/, function () {
        return r = n.push("});"), ""
    }), e = e.replace(/^{(else)?if\s+([^}]+)}/, function (e, t, i) {
        return r = n.push((t ? "} else " : "") + "if (" + i + ") {"), ""
    }), e = e.replace(/^{else}/, function () {
        return r = n.push("} else {"), ""
    }), e = e.replace(/^{\/if}/, function () {
        return r = n.push("}"), ""
    }); while (r);
    n.push("}"), n.push('return $RET$.join("");');
    var o = new Function("$ARG$", n.join("\n").replace(/\r/g, "").replace(/#LEFT_CURLY_BRACKET#/g, "{").replace(/#RIGHT_CURLY_BRACKET#/g, "}"));
    return o
}), jindo.$Template.addEngine("micro", function (e) {
    return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
}), jindo.$Template.addEngine("handlebars", function (e) {
    if ("undefined" == typeof Handlebars)throw new jindo.$Error(jindo.$Except.NOT_FOUND_HANDLEBARS, "$Template#process");
    return Handlebars.compile(e)
}), jindo.$Template.addEngine("simple", function (e) {
    return function (t) {
        return e.replace(/\{\{([^{}]*)\}\}/g, function (e, n) {
            return "undefined" == typeof t[n] ? "" : t[n]
        })
    }
}), !function () {
    for (var e, t, n = ["$Agent", "$Ajax", "$A", "$Cookie", "$Date", "$Document", "$Element", "$ElementList", "$Event", "$Form", "$Fn", "$H", "$Json", "$S", "$Template"], r = 0, i = n.length; i > r; r++)e = n[r], t = jindo[e], t && (t.addExtension = function (e) {
        return function (t, n) {
            return jindo._p_.addExtension(e, t, n), this
        }
    }(e));
    for (var o = ["$Element", "$Event"], r = 0, i = o.length; i > r; r++) {
        var s = o[r];
        jindo[s] && (jindo[s].hook = function (e) {
            var t = {};
            return function (n, r) {
                var i = jindo.$Jindo.checkVarType(arguments, {
                    g: ["sName:String+"],
                    s4var: ["sName:String+", "vRevisionKey:Variant"],
                    s4obj: ["oObj:Hash+"]
                }, "jindo." + e + ".hook");
                switch (i + "") {
                    case"g":
                        return t[i.sName.toLowerCase()];
                    case"s4var":
                        return null == r ? delete t[i.sName.toLowerCase()] : t[i.sName.toLowerCase()] = r, this;
                    case"s4obj":
                        var o = i.oObj;
                        for (var s in o)t[s.toLowerCase()] = o[s];
                        return this
                }
            }
        }(s))
    }
    jindo.$Jindo.isUndefined(window) || -1 == jindo._p_._j_ag.indexOf("IEMobile") && jindo._p_._j_ag.indexOf("Mobile") > -1 && jindo._p_._JINDO_IS_SP || new jindo.$Element(window).attach("unload", function () {
        jindo.$Element.eventManager.cleanUpAll()
    }), "function" == typeof define && define.amd && define("jindo", [], function () {
        return jindo
    })
}();