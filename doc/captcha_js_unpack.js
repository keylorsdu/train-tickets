/*!
 * captcha Javascript Library
 * v2.1.2(2015-01-14 18:12)
 */
(function() {
    function x(b, c, d) {
        if (c.getElementsByClassName) return c.getElementsByClassName(b);
        for (var c = c || document,
        d = d || "*",
        l = [], c = "*" === d && c.all ? c.all: c.getElementsByTagName(d), d = c.length, b = b.replace(/\-/g, "\\-"), b = RegExp("(^|\\s)" + b + "(\\s|$)"); 0 <= --d;) b.test(c[d].className) && l.push(c[d]);
        return l
    }
    function z(b) {
        window.console && window.console.log(b)
    }
    function A(b) {
        b && b.stopPropagation ? b.stopPropagation() : window.event && event.cancelBubble && (window.event.cancelBubble = !0)
    }
    function r(b, c, d) {
        b.addEventListener ? b.addEventListener(c, d, !1) : b.attachEvent("on" + c, d)
    }
    function B(b, c, d) {
        b.removeEventListener ? b.removeEventListener(c, d, !1) : b.detachEvent ? b.detachEvent("on" + c, d) : b["on" + c] = null
    }
    var l = function() {};
    l.prototype = {
        touclick: null,
        isie6: !1,
        imageparent: null,
        image: null,
        wait: null,
        reload: null,
        arrow: null,
        clickResult: {},
        clicknum: 0,
        clicknum2: 0,
        gp_url: "",
        statu: !0,
        hoverimg: null,
        reloadevent: null,
        bgclassname: "touclick-bgimg",
        isinit: !1,
        onClick: null,
        onReloading: null,
        onReload: null,
        onFail: null,
        offset: {
            x: 0,
            y: 30
        },
        lastResultObj: {
            time: 0
        },
        sptime: 250,
        isstart: !1,
        state: 0
    };
    var i = function(b, c) {
        function d(b) {
            A(b);
            var g = {};
            if (b.offsetX && b.offsetY) g.X = b.offsetX,
            g.Y = b.offsetY;
            else if (b.layerX && b.layerY) g.X = b.layerX,
            g.Y = b.layerY;
            else return;
            if (! (20 < a.clicknum2) && (g.X -= a.offset.x, g.Y -= a.offset.y, !(0 >= g.X || 0 >= g.Y))) if (!Date || !(Date.now && Date.now() - a.lastResultObj.time < a.sptime)) {
                a.clicknum2++;
                var c = g.X,
                d = g.Y,
                e = a.clicknum,
                c = c - 3 + a.offset.x,
                d = d - 14 + a.offset.y,
                f = a.hoverimg.cloneNode(!0);
                r(f, "click", q);
                f.setAttribute("index", e);
                f.style.left = c + "px";
                f.style.top = d + "px";
                a.imageparent.appendChild(f);
                g.dom = f;
                a.clickResult[a.clicknum++] = g;
                a.onClick(n.getResult());
                b && b.preventDefault ? b.preventDefault() : window.event.returnValue = !1;
                return ! 1
            }
        }
        function i(b) {
            if ("down" === b) return function() {
                a.reload.className = a.bgclassname + " touclick-reload touclick-reload-click"
            };
            if ("up" === b) return function() {
                a.reload.className = a.bgclassname + " touclick-reload touclick-reload-normal"
            };
            if ("click" === b) return function(b) {
                u.toLoading(); ! 1 !== a.onReloading() && (a.image.src = a.gp_url + "&" + Math.random(), a.state = "requesting");
                A(b)
            };
            i("click")()
        }
        function k() {
            for (var b in a.clickResult) a.imageparent.removeChild(a.clickResult[b].dom),
            delete a.clickResult[b]
        }
        function q(b) {
            A(b);
            var c, h;
            try {
                c = this,
                h = c.getAttribute("index")
            } catch(d) {
                c = window.event.srcElement,
                h = c.getAttribute("index")
            }
            Date && Date.now && (a.lastResultObj.time = Date.now());
            a.imageparent.removeChild(c);
            delete a.clickResult[h];
            a.clicknum2--;
            a.onClick(n.getResult())
        }
        var n = this,
        c = c ? c: "default";
        if ("object" !== typeof b) throw "Error : the first param is not an object";
        if (!s[c]) {
            s[c] = this;
            var a = new l,
            v = {
                attachEvent: function() {
                    a.statu && (r(a.image, "click", d), r(a.reload, "click", a.reloadevent), a.statu = !1)
                },
                detachEvent: function() {
                    a.statu || (B(a.image, "click", d), B(a.reload, "click", a.reloadevent), a.statu = !0)
                }
            },
            u = {
                toLoading: function() {
                    a.state = "loading";
                    a.waiting();
                    a.image.style.display = "none";
                    a.imageparent.style.backgroundPosition = "0 -583px";
                    v.detachEvent();
                    k();
                    setTimeout(v.attachEvent, 1E3)
                },
                toImage: function() {
                    a.state = "image";
                    a.waitingstop();
                    a.image.style.display = "block";
                    a.clickResult = {};
                    a.image.style.visibility = "visible";
                    a.clicknum2 = 0;
                    v.attachEvent();
                    a.isImgLoad = !0;
                    a.onReload()
                },
                toFail: function() {
                    a.state = "fail";
                    a.waitingstop();
                    a.image.style.display = "none";
                    a.imageparent.style.backgroundPosition = "0 -203px";
                    k();
                    v.detachEvent()
                },
                toSuccess: function() {
                    a.state = "success";
                    a.imageparent.style.backgroundPosition = "0 -393px";
                    a.image.style.display = "none";
                    a.waitingstop();
                    v.detachEvent();
                    k()
                }
            };
            a.touclick = b;
            a.image = x("touclick-image", b, "img")[0];
            a.imageparent = a.image.parentElement;
            if (a.isie6) {
                a.bgclassname = " touclick-ie6-bgimg ";
                for (var t = b.all ? b.all: b.getElementsByTagName("*"), j = t.length; 0 <= --j;) - 1 < t[j].className.indexOf("touclick-bgimg") && (t[j].className += a.bgclassname)
            }
            a.hoverimg = document.createElement("div");
            a.hoverimg.className = "touclick-hov " + a.bgclassname;
            var t = a,
            e = a.imageparent,
            j = document.createElement("div");
            j.style.left = (parseInt(e.style.width) - 50) / 2 + "px";
            j.style.top = (parseInt(e.style.height) - 50 + 28) / 2 + "px";
            j.className = "touclick-wait";
            e.appendChild(j);
            var f = [],
            e = 20 * 0.707;
            f.push([25, 5]);
            f.push([25 + e, 25 - e]);
            f.push([45, 25]);
            f.push([25 + e, 25 + e]);
            f.push([25, 45]);
            f.push([25 - e, 25 + e]);
            f.push([5, 25]);
            f.push([25 - e, 25 - e]);
            for (var p = [], e = 0; 8 > e; e++) {
                var m = document.createElement("div");
                m.style.width = "10px";
                m.style.height = "10px";
                m.className = a.bgclassname;
                m.style.backgroundPosition = "0px " + ( - 123 - 10 * e) + "px";
                m.style.position = "absolute";
                var w = [f[e][0] - 5, f[e][1] - 5];
                m.style.left = w[0] + "px";
                m.style.top = w[1] + "px";
                m.style.fontSize = "0";
                p.push(m);
                j.appendChild(m)
            }
            var y = 0,
            C = function() {
                y %= 8;
                for (var a = 0; 8 > a; a++) {
                    var b = (a + y) % 8,
                    b = [f[b][0] - 5, f[b][1] - 5];
                    p[a].style.left = b[0] + "px";
                    p[a].style.top = b[1] + "px"
                }
                y++
            };
            a.waiting = function() {
                clearInterval(a.waiting_interval);
                a.waiting_interval = setInterval(C, 100);
                a.wait.style.display = "block"
            };
            a.waitingstop = function() {
                clearInterval(a.waiting_interval);
                a.wait.style.display = "none"
            };
            t.wait = j;
            a.reload = x("touclick-reload", b, "div")[0];
            a.arrow = x("touclick-arrow", b, "div")[0];
            r(a.reload, "mousedown", i("down"));
            r(document, "mouseup", i("up"));
            r(a.image, "load", u.toImage);
            this.start = function(b) {
                if ("object" !== typeof b) return z("touclick.st_params is not object"),
                this;
                "string" === typeof b.gp_url ? a.gp_url = b.gp_url: (a.gp_url = "", z("touclick.st_params.gp_url is not string"));
                a.onClick = "function" === typeof b.onClick ? b.onClick: function() {};
                a.onReload = "function" === typeof b.onReload ? b.onReload: function() {};
                a.onReloading = "function" === typeof b.onReloading ? b.onReloading: function() {};
                if (a.isstart) return z("this touclick '" + this.getName() + "' has start"),
                this;
                a.isstart = !0;
                u.toLoading();
                a.reloadevent = i("click");
                return this
            };
            n.getName = function() {
                return c
            };
            this.getState = function() {
                return a.state
            };
            this.getDom = function() {
                return b
            };
            this.setCss = function(a) {
                var a = "object" === typeof a ? a: {},
                c = b.style,
                h;
                for (h in a) {
                    var d = h.indexOf("-"),
                    e; - 1 < d ? (e = h.substring(0, d) + h.charAt(d + 1).toUpperCase(), h.length > d + 1 && (e += h.substring(d + 2, h.length))) : e = h;
                    c[e] = a[h]
                }
                return this
            };
            this.setArrow = function(b, c) {
                var d = a.arrow.style,
                c = c ? c: 10;
                d.top = d.bottom = d.left = d.right = "auto";
                if ("left" == b || "right" == b) 0 < c ? d.top = c + "px": d.bottom = Math.abs(c) + "px";
                else if ("top" == b || "bottom" == b) 0 < c ? d.left = c + "px": d.right = Math.abs(c) + "px";
                else throw "direction error";
                d[b] = "-9px";
                d.display = "block";
                a.arrow.className = a.bgclassname + " touclick-arrow touclick-a" + b;
                return this
            };
            this.hidden = function() {
                b.style.display = "none";
                return this
            };
            this.show = function() {
                "loading" === a.state && a.reloadevent();
                b.style.display = "block";
                return this
            };
            this.success = function() {
                u.toSuccess();
                return this
            };
            this.fail = function() {
                u.toFail();
                setTimeout(a.reloadevent, 1E3);
                return this
            };
            this.reload = function() {
                a.reloadevent();
                return this
            };
            this.getResult = function() {
                var b = "";
                for (res in a.clickResult) {
                    "" !== b && (b += ",");
                    var c = a.clickResult[res],
                    b = b + (c.X + "," + c.Y)
                }
                return b
            }
        }
    },
    s = {},
    q = [],
    w;
    i.get = function(b) {
        var b = b ? b: "default",
        c = s[b];
        if ("undefined" == typeof c) throw 'Error :"' + b + '" with out any instantiate object';
        return c
    };
    i.getAllTouclickObject = function() {
        return s
    };
    i.isExist = function(b) {
        return "undefined" == typeof s[b ? b: "default"] ? !1 : !0
    };
    i.getCount = function() {
        var b = 0,
        c;
        for (c in s) b++;
        return b
    };
    i.ready = function(b) {
        if (l.prototype.isinit) {
            for (; 0 < q.length;) q.shift()();
            setTimeout(b, 1)
        } else q.push(b)
    };
    var k = function() {
        if (!l.prototype.isinit) {
            l.prototype.isinit = !0;
            clearInterval(w);
            var b = navigator.userAgent.toLocaleLowerCase();
            window.ActiveXObject && "6.0" == b.match(/msie ([\d.]+)/)[1] && (l.prototype.isie6 = !0);
            for (var b = document.getElementsByTagName("body")[0], b = x("touclick", b, "div"), c = 0; c < b.length; c++) new i(b[c], b[c].getAttribute("name"));
            for (; 0 < q.length;) q.shift()()
        }
    },
    n = function() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", n, !1), k()) : "complete" === document.readyState && (document.detachEvent("onreadystatechange", n), k())
    };
    if ("complete" === document.readyState) setTimeout(k, 1);
    else if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1),
    window.addEventListener("load", k, !1),
    /WebKit/i.test(navigator.userAgent) && (w = setInterval(function() { / loaded | complete / .test(document.readyState) && k()
    },
    10));
    else {
        document.attachEvent("onreadystatechange", n);
        window.attachEvent("onload", k);
        var p = !1;
        try {
            p = null == window.frameElement && document.documentElement
        } catch(D) {}
        p && p.doScroll &&
        function c() {
            if (!l.prototype.isinit) {
                try {
                    p.doScroll("left")
                } catch(d) {
                    return setTimeout(c, 50)
                }
                k()
            }
        } ()
    }
    window.TouClick = i
})();