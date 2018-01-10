window.___jsl = window.___jsl || {};
(window.___jsl.ci = window.___jsl.ci || []).push({
    opensocial: {
        invalidatePath: "//%host%/portal/rpc", path: "//%host%/portal/rpc", domain: "shindig", supportedFields: {
            person: ["id", {name: ["familyName", "givenName", "unstructured"]}, "thumbnailUrl", "profileUrl"],
            mediaItem: "album_id created description duration file_size id language last_updated location mime_type num_comments num_views num_votes rating start_time tagged_people tags thumbnail_url title type url".split(" "),
            album: "id thumbnailUrl title description location ownerId".split(" "),
            group: ["id",
                "title", "description"],
            activity: "appId body bodyId externalId id mediaItems postedTime priority streamFaviconUrl streamSourceUrl streamTitle streamUrl templateParams title url userId".split(" "),
            activityEntry: "actor content generator icon id object published provider target title updated url verb openSocial extensions".split(" ")
        }, enableCaja: !1
    },
    rpc: {
        commSwf: "/xpc.swf",
        passReferrer: "c2p:query",
        parentRelayUrl: "/container/rpc_relay.html",
        useLegacyProtocol: !1
    },
    "shindig.auth": {authToken: "-1:-1:*:*:*:0:default"},
    container: {
        jsPath: "/portal/gadgets/js",
        relayPath: "/portal/gadgets/files/container/rpc_relay.html",
        enableRpcArbitration: !1
    },
    views: {
        "default": {
            isOnlyVisible: !1,
            urlTemplate: "http://localhost/portal/gadgets/default?{var}",
            aliases: ["home", "profile", "canvas"]
        },
        canvas: {
            isOnlyVisible: !0,
            urlTemplate: "http://localhost/portal/gadgets/canvas?{var}",
            aliases: ["FULL_PAGE"]
        },
        embedded: {
            isOnlyVisible: !1,
            urlTemplate: "http://localhost/portal/gadgets/embedded?{var}",
            aliases: ["embedded"]
        },
        profile: {
            isOnlyVisible: !1, urlTemplate: "http://localhost/portal/gadgets/profile?{var}",
            aliases: ["DASHBOARD", "default"]
        }
    },
    osapi: {endPoints: ["//%host%/portal/rpc"]},
    "osapi.services": {"gadgets.rpc": ["container.listMethods"]},
    "core.io": {
        unparseableCruft: "throw 1; \x3c don't be evil' \x3e",
        jsonProxyUrl: "//%host%/portal/gadgets/makeRequest",
        jsPath: "/portal/gadgets/js",
        proxyUrl: "//%host%/portal/gadgets/proxy%filename%?container\x3d%container%\x26refresh\x3d%refresh%\x26url\x3d%url%%authz%%rewriteMime%",
        xhrPollIntervalMs: 50
    }
});
window.___jsl = window.___jsl || {};
window['___jsl']['f'] = ['auth-refresh', 'container', 'container.site', 'container.site.gadget', 'container.site.url', 'container.util', 'core.config', 'core.config.base', 'core.io', 'core.json', 'core.log', 'core.prefs', 'core.util', 'core.util.base', 'core.util.dom', 'core.util.event', 'core.util.onload', 'core.util.string', 'core.util.urlparams', 'domnode', 'embedded-experiences', 'gadgets.json.ext', 'globals', 'locked-domain', 'open-views', 'open-views.common', 'open-views.ee', 'open-views.gadget', 'open-views.results', 'open-views.url', 'opensocial', 'opensocial-base', 'opensocial-data-context', 'opensocial-jsonrpc', 'opensocial-reference', 'osapi', 'osapi.base', 'portal', 'rpc', 'security-token', 'shindig.auth', 'shindig.uri', 'shindig.uri.ext', 'taming', 'views', 'xmlutil'];
gadgets = window.gadgets || {};
shindig = window.shindig || {};
osapi = window.osapi || {};
var safeJSON = window.safeJSON, tamings___ = window.tamings___ || [], bridge___, caja___ = window.caja___, ___ = window.___;
var DOM_ELEMENT_NODE = 1, DOM_ATTRIBUTE_NODE = 2, DOM_TEXT_NODE = 3, DOM_CDATA_SECTION_NODE = 4, DOM_ENTITY_REFERENCE_NODE = 5, DOM_ENTITY_NODE = 6, DOM_PROCESSING_INSTRUCTION_NODE = 7, DOM_COMMENT_NODE = 8, DOM_DOCUMENT_NODE = 9, DOM_DOCUMENT_TYPE_NODE = 10, DOM_DOCUMENT_FRAGMENT_NODE = 11, DOM_NOTATION_NODE = 12;
gadgets.log = function () {
    function d(a, c) {
        "undefined" === typeof b && (b = window.console ? window.console : window.opera ? window.opera.postError : null);
        a < e || !b || (2 === a && b.warn ? b.warn(c) : 3 === a && b.error ? b.error(c) : b.log && b.log(c))
    }

    var c = function (a) {
        d(1, a)
    };
    gadgets.warn = function (a) {
        d(2, a)
    };
    gadgets.error = function (a) {
        d(3, a)
    };
    gadgets.setLogLevel = function (a) {
        e = a
    };
    c.INFO = 1;
    c.WARNING = 2;
    c.NONE = 4;
    var e = 1, b;
    return c
}();
window.gadgets.config || (gadgets.config = function () {
    function l(a, b) {
        for (var e in b)b.hasOwnProperty(e) && ("object" === typeof a[e] && "object" === typeof b[e] ? l(a[e], b[e]) : a[e] = b[e])
    }

    function q(a) {
        var b = "";
        if (a.nodeType == DOM_TEXT_NODE || a.nodeType == DOM_CDATA_SECTION_NODE)b = a.nodeValue; else if (a.innerText)b = a.innerText; else if (a.innerHTML)b = a.innerHTML; else if (a.firstChild) {
            b = [];
            for (a = a.firstChild; a; a = a.nextSibling)b.push(q(a));
            b = b.join("")
        }
        return b
    }

    function r(a) {
        var b = (f["core.io"] || {}).jsPath || null, e = [], d =
            0, c = document.scripts || document.getElementsByTagName("script");
        if (c && 0 != c.length) {
            for (var h = 0; h < c.length; ++h) {
                var g = c[h].src, k = null != b && g && g.indexOf(b) || -1;
                -1 != k && /.*[.]js.*[?&]c=[01](#|&|$).*/.test(g.substring(k + b.length)) && (e[d++] = c[h])
            }
            e.length || (b = c[c.length - 1], b.src && (e[0] = b))
        }
        if (e.length)for (b = 0; b < e.length; b++) {
            d = q(e[b]);
            c = void 0;
            try {
                c = (new Function("return (" + d + "\n)"))()
            } catch (n) {
            }
            if ("object" === typeof c)d = c; else {
                try {
                    c = (new Function("return ({" + d + "\n})"))()
                } catch (p) {
                }
                d = "object" === typeof c ? c :
                {}
            }
            m.f && 1 == m.f.length && !d[m.f[0]] && (c = {}, c[m.f[0]] = d, d = c);
            l(a, d);
            (d = window.___cfg) && l(a, d)
        }
    }

    function p(a) {
        for (var b in k)if (k.hasOwnProperty(b))for (var e = k[b], d = 0, c = e.length; d < c; ++d)a(b, e[d])
    }

    var m, k = {}, f = {}, n = !1;
    return {
        register: function (a, b, e, d) {
            var c = k[a];
            c || (c = [], k[a] = c);
            c.push({validators: b || {}, callback: e, callOnUpdate: d});
            n && e && e(f)
        }, get: function (a) {
            return a ? f[a] || {} : f
        }, init: function (a, b) {
            m = window.___jsl || {};
            l(f, a);
            r(f);
            l(f, window.___config || {});
            p(function (a, d) {
                var c = f[a];
                if (c && !b) {
                    var h = d.validators,
                        g;
                    for (g in h)if (h.hasOwnProperty(g) && !h[g](c[g]))throw Error('Invalid config value "' + c[g] + '" for parameter "' + g + '" in component "' + a + '"');
                }
                d.callback && d.callback(f)
            });
            n = !0
        }, update: function (a, b) {
            var e = [];
            p(function (c, d) {
                (a.hasOwnProperty(c) || b && f && f[c]) && d.callback && d.callOnUpdate && e.push(d.callback)
            });
            f = b ? {} : f || {};
            l(f, a);
            for (var d = 0, c = e.length; d < c; ++d)e[d](f)
        }, clear: function () {
            gadgets.warn("This method is for testing.");
            m = void 0;
            f = {};
            n = !1
        }
    }
}());
gadgets.util = gadgets.util || {};
(function () {
    var e = null;
    gadgets.util.getUrlParameters = function (a) {
        var g = "undefined" === typeof a;
        if (null !== e && g)return e;
        var f = {};
        a = a || document.location.href;
        var d = a.indexOf("?"), b = a.indexOf("#");
        a = (-1 === b ? a.substr(d + 1) : [a.substr(d + 1, b - d - 1), "\x26", a.substr(b + 1)].join("")).split("\x26");
        for (var d = window.decodeURIComponent ? decodeURIComponent : unescape, b = 0, h = a.length; b < h; ++b) {
            var c = a[b].indexOf("\x3d");
            if (-1 !== c) {
                var k = a[b].substring(0, c), c = a[b].substring(c + 1), c = c.replace(/\+/g, " ");
                try {
                    f[k] = d(c)
                } catch (l) {
                }
            }
        }
        g &&
        (e = f);
        return f
    }
})();
gadgets.util.getUrlParameters();
gadgets.util = gadgets.util || {};
gadgets.util.attachBrowserEvent = function (a, b, c, d) {
    "undefined" != typeof a.addEventListener ? a.addEventListener(b, c, d) : "undefined" != typeof a.attachEvent ? a.attachEvent("on" + b, c) : gadgets.warn("cannot attachBrowserEvent: " + b)
};
gadgets.util.removeBrowserEvent = function (a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent ? a.detachEvent("on" + b, c) : gadgets.warn("cannot removeBrowserEvent: " + b)
};
(function () {
    gadgets.config.EnumValidator = function (a) {
        var c = [];
        if (1 < arguments.length)for (var b = 0, d; d = arguments[b]; ++b)c.push(d); else c = a;
        return function (a) {
            for (var b = 0; c[b]; ++b)if (a === c[b])return !0;
            return !1
        }
    };
    gadgets.config.RegExValidator = function (a) {
        return function (c) {
            return a.test(c)
        }
    };
    gadgets.config.ExistsValidator = function (a) {
        return "undefined" !== typeof a
    };
    gadgets.config.NonEmptyStringValidator = function (a) {
        return "string" === typeof a && 0 < a.length
    };
    gadgets.config.BooleanValidator = function (a) {
        return "boolean" === typeof a
    };
    gadgets.config.LikeValidator = function (a) {
        return function (c) {
            for (var b in a)if (a.hasOwnProperty(b) && !(0, a[b])(c[b]))return !1;
            return !0
        }
    }
})();
gadgets.util = gadgets.util || {};
gadgets.util.makeClosure = function (e, c, a) {
    for (var d = [], b = 2, f = arguments.length; b < f; ++b)d.push(arguments[b]);
    return function () {
        for (var a = d.slice(), b = 0, f = arguments.length; b < f; ++b)a.push(arguments[b]);
        return c.apply(e, a)
    }
};
gadgets.util.makeEnum = function (e) {
    var c, a, d = {};
    for (c = 0; a = e[c]; ++c)d[a] = a;
    return d
};
gadgets.util.shouldPollXhrReadyStateChange = function () {
    return document.all && !document.querySelector ? !0 : !1
};
gadgets.util = gadgets.util || {};
(function () {
    gadgets.util.createElement = function (a) {
        var b;
        if (!document.body || document.body.namespaceURI)try {
            b = document.createElementNS("http://www.w3.org/1999/xhtml", a)
        } catch (d) {
        }
        return b || document.createElement(a)
    };
    gadgets.util.createIframeElement = function (a) {
        var b = gadgets.util.createElement("iframe");
        try {
            var d, c = ["\x3c", "iframe"], g = a || {}, e;
            for (e in g)g.hasOwnProperty(e) && (c.push(" "), c.push(e), c.push('\x3d"'), c.push(gadgets.util.escapeString(g[e])), c.push('"'));
            c.push("\x3e\x3c/");
            c.push("iframe");
            c.push("\x3e");
            d = c.join("");
            var f = gadgets.util.createElement(d);
            f && (!b || f.tagName == b.tagName && f.namespaceURI == b.namespaceURI) && (b = f)
        } catch (k) {
        }
        d = b;
        a = a || {};
        for (var h in a)a.hasOwnProperty(h) && (d[h] = a[h]);
        return b
    };
    gadgets.util.getBodyElement = function () {
        if (document.body)return document.body;
        try {
            var a = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "body");
            if (a && 1 == a.length)return a[0]
        } catch (b) {
        }
        return document.documentElement || document
    }
})();
gadgets.util = gadgets.util || {};
(function () {
    var b = [];
    gadgets.util.registerOnLoadHandler = function (c) {
        b.push(c)
    };
    gadgets.util.runOnLoadHandlers = function () {
        gadgets.util.registerOnLoadHandler = function (a) {
            a()
        };
        if (b) {
            for (var c = 0, a = b.length; c < a; ++c)try {
                b[c]()
            } catch (h) {
                gadgets.warn("Could not fire onloadhandler " + h.message)
            }
            b = void 0
        }
    };
    (function () {
        gadgets.util.attachBrowserEvent(document, "DOMContentLoaded", gadgets.util.runOnLoadHandlers, !1);
        var c = window.onload;
        window.onload = function () {
            c && c();
            gadgets.util.runOnLoadHandlers()
        };
        var a = "";
        window &&
        window.location && window.location.href && (a = gadgets.util.getUrlParameters(window.location.href).libs);
        if (a = /(?:js\/)([^&|\.]+)/g.exec(a))for (var a = decodeURIComponent(a[1]), b = document.getElementsByTagName("script") || [], d = 0; d < b.length; d++) {
            var e = b[d], f = e.src;
            if (f && a && -1 !== f.indexOf(a)) {
                var g = e.onload;
                e.onload = function () {
                    g && g();
                    gadgets.util.runOnLoadHandlers()
                }
            }
        }
    })()
})();
gadgets.util = gadgets.util || {};
(function () {
    function f(a, d) {
        return String.fromCharCode(d)
    }

    var g = {
        0: !1,
        10: !0,
        13: !0,
        34: !0,
        39: !0,
        60: !0,
        62: !0,
        92: !0,
        8232: !0,
        8233: !0,
        65282: !0,
        65287: !0,
        65308: !0,
        65310: !0,
        65340: !0
    };
    gadgets.util.escape = function (a, d) {
        if (a) {
            if ("string" === typeof a)return gadgets.util.escapeString(a);
            if ("array" === typeof a)for (var b = 0, c = a.length; b < c; ++b)a[b] = gadgets.util.escape(a[b]); else if ("object" === typeof a && d) {
                b = {};
                for (c in a)a.hasOwnProperty(c) && (b[gadgets.util.escapeString(c)] = gadgets.util.escape(a[c], !0));
                return b
            }
        }
        return a
    };
    gadgets.util.escapeString = function (a) {
        if (!a)return a;
        for (var d = [], b, c, e = 0, f = a.length; e < f; ++e)b = a.charCodeAt(e), c = g[b], !0 === c ? d.push("\x26#", b, ";") : !1 !== c && d.push(a.charAt(e));
        return d.join("")
    };
    gadgets.util.unescapeString = function (a) {
        return a ? a.replace(/&#([0-9]+);/g, f) : a
    }
})();
gadgets.util = gadgets.util || {};
(function () {
    function f(a) {
        a = (a = a["core.io"]) && a.jsPath;
        for (var b = document.getElementsByTagName("script"), c = 0; a && c < b.length; c++) {
            var d = b[c].src;
            if (d && -1 < d.indexOf(a))return e = "1" == gadgets.util.getUrlParameters(d).debug
        }
        e = !1
    }

    function g(a) {
        b = a["core.util"] || {}
    }

    var b = {}, h = {}, e;
    gadgets.config && (gadgets.config.register("core.util", null, g), gadgets.config.register("core.io", void 0, f, f));
    gadgets.util.getFeatureParameters = function (a) {
        return "undefined" === typeof b[a] ? null : b[a]
    };
    gadgets.util.hasFeature = function (a) {
        return "undefined" !== typeof b[a]
    };
    gadgets.util.getServices = function () {
        return h
    };
    gadgets.util.isDebug = function () {
        return e
    }
})();
window.JSON && window.JSON.parse && window.JSON.stringify && (gadgets.json = function () {
    function d(a, b) {
        return this[a]
    }

    var e = /___$/;
    return {
        parse: function (a) {
            try {
                return window.JSON.parse(a)
            } catch (b) {
                return !1
            }
        }, stringify: function (a) {
            function b(a) {
                return c.call(this, a, d)
            }

            var c = window.JSON.stringify, f = Array.prototype.toJSON && '"[{\\"x\\": 1}]"' === c([{x: 1}]) ? b : c;
            try {
                return f(a, function (a, b) {
                    return e.test(a) ? void 0 : b
                })
            } catch (g) {
                return null
            }
        }
    }
}());
window.JSON && window.JSON.parse && window.JSON.stringify || (gadgets.json = function () {
    function c(a) {
        return 10 > a ? "0" + a : a
    }

    function e(a) {
        var d, b, c;
        d = /[\"\\\x00-\x1f\x7f-\x9f]/g;
        switch (typeof a) {
            case "string":
                return d.test(a) ? '"' + a.replace(d, function (a) {
                    var b = f[a];
                    if (b)return b;
                    b = a.charCodeAt();
                    return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
                }) + '"' : '"' + a + '"';
            case "number":
                return isFinite(a) ? String(a) : "null";
            case "boolean":
            case "null":
                return String(a);
            case "object":
                if (!a)return "null";
                d = [];
                if ("number" === typeof a.length && !a.propertyIsEnumerable("length")) {
                    c = a.length;
                    for (b = 0; b < c; b += 1)d.push(e(a[b]) || "null");
                    return "[" + d.join(",") + "]"
                }
                for (b in a)!/___$/.test(b) && a.hasOwnProperty(b) && "string" === typeof b && (c = e(a[b])) && d.push(e(b) + ":" + c);
                return "{" + d.join(",") + "}"
        }
        return ""
    }

    Date.prototype.toJSON = function () {
        return [this.getUTCFullYear(), "-", c(this.getUTCMonth() + 1), "-", c(this.getUTCDate()), "T", c(this.getUTCHours()), ":", c(this.getUTCMinutes()), ":", c(this.getUTCSeconds()), "Z"].join("")
    };
    var f = {
        "\b": "\\b", "\t": "\\t",
        "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"
    };
    return {
        stringify: e, parse: function (a) {
            return /^[\],:{}\s]*$/.test(a.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ? eval("(" + a + ")") : !1
        }
    }
}());
gadgets.json.flatten = function (a) {
    var c = {};
    if (null === a || "undefined" == typeof a)return c;
    for (var d in a)if (a.hasOwnProperty(d)) {
        var b = a[d];
        null !== b && "undefined" != typeof b && (c[d] = "string" === typeof b ? b : gadgets.json.stringify(b))
    }
    return c
};
shindig.Auth = function () {
    function g(a) {
        for (var b = c.split("\x26"), f = 0; f < b.length; f++) {
            var d = b[f].split("\x3d");
            if (2 === d.length) {
                var e = d[0], d = d[1];
                "$" === d && (d = encodeURIComponent(a[e]), b[f] = e + "\x3d" + d)
            }
        }
        c = b.join("\x26")
    }

    var c = null, e = null;
    gadgets.config.register("shindig.auth", null, function (a) {
        var b = gadgets.util.getUrlParameters();
        a = a["shindig.auth"] || {};
        a.authToken ? c = a.authToken : b.st && (c = b.st);
        null !== c && g(b);
        a.trustedJson && (e = eval("(" + a.trustedJson + ")"))
    });
    return {
        getSecurityToken: function () {
            return c
        },
        updateSecurityToken: function (a) {
            c = a
        }, getTrustedData: function () {
            return e
        }
    }
};
shindig.auth = new shindig.Auth;
gadgets.rpctx = gadgets.rpctx || {};
gadgets.rpctx.wpm || (gadgets.rpctx.wpm = function () {
    function g(a, b, c) {
        "undefined" != typeof window.addEventListener ? window.addEventListener(a, b, c) : "undefined" != typeof window.attachEvent && window.attachEvent("on" + a, b)
    }

    function h(a) {
        var b = gadgets.json.parse(a.data);
        if (b && b.f) {
            var c = gadgets.rpc.getTargetOrigin(b.f);
            e && ("undefined" !== typeof a.origin ? a.origin !== c : a.domain !== /^.+:\/\/([^:]+).*/.exec(c)[1]) || f(b, a.origin)
        }
    }

    var f, d, e = !0;
    return {
        getCode: function () {
            return "wpm"
        }, isParentVerifiable: function () {
            return !0
        }, init: function (a,
                           b) {
            gadgets.config.register("rpc", null, function (a) {
                "true" === String((a ? a.rpc : {}).disableForceSecure) && (e = !1)
            });
            f = a;
            d = b;
            g("message", h, !1);
            d("..", !0);
            return !0
        }, setup: function (a, b) {
            d(a, !0);
            return !0
        }, call: function (a, b, c) {
            var d = gadgets.rpc.getTargetOrigin(a), e = gadgets.rpc._getTargetWin(a);
            d ? window.setTimeout(function () {
                e.postMessage(gadgets.json.stringify(c), d)
            }, 0) : gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message");
            return !0
        }
    }
}());
gadgets.rpctx = gadgets.rpctx || {};
gadgets.rpctx.flash || (gadgets.rpctx.flash = function () {
    function h(a, b) {
        n[b] = n[b] || function () {
                a.apply({}, arguments)
            };
        return p + "." + b
    }

    function q() {
        if (null === c && document.body && k) {
            var a = k + "?cb\x3d" + Math.random() + "\x26origin\x3d" + F + "\x26jsl\x3d1", b = document.createElement("div");
            b.style.height = "1px";
            b.style.width = "1px";
            a = '\x3cobject height\x3d"1" width\x3d"1" id\x3d"' + G + '" type\x3d"application/x-shockwave-flash"\x3e\x3cparam name\x3d"allowScriptAccess" value\x3d"always"\x3e\x3c/param\x3e\x3cparam name\x3d"movie" value\x3d"' + a +
                '"\x3e\x3c/param\x3e\x3cembed type\x3d"application/x-shockwave-flash" allowScriptAccess\x3d"always" src\x3d"' + a + '" height\x3d"1" width\x3d"1"\x3e\x3c/embed\x3e\x3c/object\x3e';
            document.body.appendChild(b);
            b.innerHTML = a;
            c = b.firstChild
        }
        ++r;
        null !== d && (null !== c || r >= H) ? window.clearTimeout(d) : d = window.setTimeout(q, s)
    }

    function t() {
        l[".."] || (u(".."), v++, v >= I && null !== e ? (window.clearTimeout(e), e = null) : e = window.setTimeout(t, w))
    }

    function m() {
        if (null !== c && c.setup) {
            for (; 0 < g.length;) {
                var a = g.shift(), b = a.targetId;
                c.setup(a.token, ".." === b ? gadgets.rpc.RPC_ID : b, ".." === b ? "INNER" : "OUTER")
            }
            null !== f && (window.clearTimeout(f), f = null)
        } else null === f && 0 < g.length && (f = window.setTimeout(m, J))
    }

    function x() {
        m();
        null !== d && window.clearTimeout(d);
        d = null
    }

    function y() {
        l[".."] || null !== e || (e = window.setTimeout(t, w))
    }

    function z(a, b, d) {
        b = gadgets.rpc.getTargetOrigin(a);
        var K = gadgets.rpc.getAuthToken(a);
        c["sendMessage_" + (".." === a ? gadgets.rpc.RPC_ID : a) + "_" + K + "_" + (".." === a ? "INNER" : "OUTER")].call(c, gadgets.json.stringify(d), b);
        return !0
    }

    function A(a, b, d) {
        var c = gadgets.json.parse(a);
        (a = c[B]) ? (C(a, !0), l[a] = !0, ".." !== a && u(a, !0)) : window.setTimeout(function () {
            D(c, b)
        }, 0)
    }

    function u(a, b) {
        var c = gadgets.rpc.RPC_ID, d = {};
        d[B] = b ? ".." : c;
        d[L] = c;
        z(a, c, d)
    }

    var G = "___xpcswf", k = null, E = !1, D = null, C = null, c = null, s = 100, H = 50, g = [], f = null, J = 500, d = null, r = 0, B = "_scr", L = "_pnt", w = 100, I = 50, v = 0, e = null, l = {}, F = window.location.protocol + "//" + window.location.host, p, n = function () {
        window.___jsl = window.___jsl || {};
        var a = window.___jsl._fm = {};
        p = "___jsl._fm";
        return a
    }();
    gadgets.config.register("rpc",
        null, function (a) {
            E && (k = a.rpc.commSwf || "//xpc.googleusercontent.com/gadgets/xpc.swf")
        });
    h(x, "ready");
    h(y, "setupDone");
    h(A, "receiveMessage");
    return {
        getCode: function () {
            return "flash"
        }, isParentVerifiable: function () {
            return !0
        }, init: function (a, b) {
            D = a;
            C = b;
            return E = !0
        }, setup: function (a, b) {
            g.push({token: b, targetId: a});
            null === c && null === d && (d = window.setTimeout(q, s));
            m();
            return !0
        }, call: z, _receiveMessage: A, _ready: x, _setupDone: y
    }
}());
gadgets.rpctx = gadgets.rpctx || {};
gadgets.rpctx.frameElement || (gadgets.rpctx.frameElement = function () {
    function k(a, l, e) {
        try {
            if (".." !== l) {
                var d = window.frameElement;
                if ("function" === typeof d[b])return "function" !== typeof d[b][c] && (d[b][c] = function (a) {
                    f(gadgets.json.parse(a))
                }), d[b](gadgets.json.stringify(e)), !0
            } else {
                var g = document.getElementById(a);
                if ("function" === typeof g[b] && "function" === typeof g[b][c])return g[b][c](gadgets.json.stringify(e)), !0
            }
        } catch (h) {
        }
        return !1
    }

    var b = "__g2c_rpc", c = "__c2g_rpc", f, h;
    return {
        getCode: function () {
            return "fe"
        },
        isParentVerifiable: function () {
            return !1
        }, init: function (a, b) {
            f = a;
            h = b;
            return !0
        }, setup: function (a, c) {
            if (".." !== a)try {
                document.getElementById(a)[b] = function (a) {
                    f(gadgets.json.parse(a))
                }
            } catch (e) {
                return !1
            }
            ".." === a && (h("..", !0), gadgets.util.registerOnLoadHandler(function () {
                window.setTimeout(function () {
                    gadgets.rpc.call(a, gadgets.rpc.ACK)
                }, 500)
            }));
            return !0
        }, call: function (a, b, c) {
            return k(a, b, c)
        }
    }
}());
gadgets.rpctx = gadgets.rpctx || {};
gadgets.rpctx.nix || (gadgets.rpctx.nix = function () {
    function f() {
        var a = d[".."];
        if (!a)if (++g > h)gadgets.warn("Nix transport setup failed, falling back..."), e("..", !1); else {
            if (!a && window.opener && "GetAuthToken"in window.opener && (a = window.opener, a.GetAuthToken() == gadgets.rpc.getAuthToken(".."))) {
                var b = gadgets.rpc.getAuthToken("..");
                a.CreateChannel(window[c]("..", b), b);
                d[".."] = a;
                window.opener = null;
                e("..", !0);
                return
            }
            window.setTimeout(function () {
                f()
            }, k)
        }
    }

    var c = "GRPC____NIXVBS_get_wrapper", h = 10, k = 500, d = {}, e,
        g = 0;
    return {
        getCode: function () {
            return "nix"
        }, isParentVerifiable: function () {
            return !1
        }, init: function (a, b) {
            e = b;
            if ("unknown" !== typeof window[c]) {
                window.GRPC____NIXVBS_handle_message = function (b) {
                    window.setTimeout(function () {
                        a(gadgets.json.parse(b))
                    }, 0)
                };
                window.GRPC____NIXVBS_create_channel = function (a, b, c) {
                    gadgets.rpc.getAuthToken(a) === c && (d[a] = b, e(a, !0))
                };
                var l = "Class GRPC____NIXVBS_wrapper\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended \x3d name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth \x3d auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n GRPC____NIXVBS_handle_message(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken \x3d m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call GRPC____NIXVBS_create_channel(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction " +
                    c + "(name, auth)\nDim wrap\nSet wrap \x3d New GRPC____NIXVBS_wrapper\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet " + c + " \x3d wrap\nEnd Function";
                try {
                    window.execScript(l, "vbscript")
                } catch (m) {
                    return !1
                }
            }
            return !0
        }, setup: function (a, b) {
            if (".." === a)return f(), !0;
            try {
                var d = document.getElementById(a), e = window[c](a, b);
                d.contentWindow.opener = e
            } catch (g) {
                return !1
            }
            return !0
        }, call: function (a, b, c) {
            try {
                d[a] && d[a].SendMessage(gadgets.json.stringify(c))
            } catch (e) {
                return !1
            }
            return !0
        }
    }
}());
gadgets.rpctx = gadgets.rpctx || {};
gadgets.rpctx.rmr || (gadgets.rpctx.rmr = function () {
    function m(a, b, c, e) {
        var d = function () {
            document.body.appendChild(a);
            a.src = "about:blank";
            e && (a.onload = function () {
                f(e)
            });
            a.src = b + "#" + c
        };
        document.body ? d() : gadgets.util.registerOnLoadHandler(function () {
            d()
        })
    }

    function n(a) {
        var b = null;
        g[a].searchCounter++;
        try {
            var c = gadgets.rpc._getTargetWin(a), b = ".." === a ? c.frames["rmrtransport-" + gadgets.rpc.RPC_ID] : c.frames["rmrtransport-.."]
        } catch (e) {
        }
        c = !1;
        b && (c = t(a, b));
        c || g[a].searchCounter > u || window.setTimeout(function () {
                n(a)
            },
            v)
    }

    function p(a, b, c, e) {
        var d = null;
        if (d = ".." !== c ? g[".."] : g[a]) {
            b !== gadgets.rpc.ACK && d.queue.push(e);
            if (d.waiting || 0 === d.queue.length && (b !== gadgets.rpc.ACK || !e || !0 !== e.ackAlone))return !0;
            0 < d.queue.length && (d.waiting = !0);
            a = d.relayUri + "#" + l(a);
            try {
                d.frame.contentWindow.location = a;
                var h = 10 == d.width ? 20 : 10;
                d.frame.style.width = h + "px";
                d.width = h
            } catch (q) {
                return !1
            }
        }
        return !0
    }

    function l(a) {
        a = g[a];
        var b = {id: a.sendId};
        if (a) {
            b.d = Array.prototype.slice.call(a.queue, 0);
            var c = {s: gadgets.rpc.ACK, id: a.recvId};
            a.originVerified ||
            (c.sendToken = a.verifySendToken);
            a.verifyRecvToken && (c.recvToken = a.verifyRecvToken);
            b.d.push(c)
        }
        return gadgets.json.stringify(b)
    }

    function f(a) {
        for (var b = g[a], c = b.receiveWindow.location.hash.substring(1), e = gadgets.json.parse(decodeURIComponent(c)) || {}, c = e.d || [], d = !1, h = !1, q = 0, e = b.recvId - e.id, f = 0; f < c.length; ++f) {
            var k = c[f];
            if (k.s === gadgets.rpc.ACK) {
                r(a, !0);
                b.verifyRecvToken = k.sendToken;
                !b.originVerified && k.recvToken && String(k.recvToken) == String(b.verifySendToken) && (b.originVerified = !0);
                b.waiting && (h = !0);
                b.waiting = !1;
                var l = Math.max(0, k.id - b.sendId);
                b.queue.splice(0, l);
                b.sendId = Math.max(b.sendId, k.id || 0)
            } else d = !0, ++q <= e || (++b.recvId, s(k, b.originVerified ? b.relayOrigin : void 0))
        }
        (d || h && 0 < b.queue.length) && p(a, gadgets.rpc.ACK, ".." === a ? gadgets.rpc.RPC_ID : "..", {ackAlone: d})
    }

    function t(a, b) {
        function c() {
            f(a)
        }

        var e = g[a];
        try {
            var d = !1, d = "document"in b;
            if (!d)return !1;
            d = "object" == typeof b.document;
            if (!d || "about:blank" === b.location.href)return !1
        } catch (h) {
            return !1
        }
        e.receiveWindow = b;
        "undefined" === typeof b.attachEvent ?
            b.onresize = c : b.attachEvent("onresize", c);
        ".." === a ? m(e.frame, e.relayUri, l(a), a) : f(a);
        return !0
    }

    var v = 500, u = 10, g = {}, w = gadgets.util.getUrlParameters().parent, s, r;
    return {
        getCode: function () {
            return "rmr"
        }, isParentVerifiable: function () {
            return !0
        }, init: function (a, b) {
            s = a;
            r = b;
            return !0
        }, setup: function (a, b) {
            try {
                if ("object" !== typeof g[a]) {
                    var c = document.createElement("iframe"), e = c.style;
                    e.position = "absolute";
                    e.top = "0px";
                    e.border = "0";
                    e.opacity = "0";
                    e.width = "10px";
                    e.height = "1px";
                    c.id = "rmrtransport-" + a;
                    c.name = c.id;
                    var d =
                        gadgets.rpc.getRelayUrl(a), h = gadgets.rpc.getOrigin(w);
                    d || (d = h + "/robots.txt");
                    g[a] = {
                        frame: c,
                        receiveWindow: null,
                        relayUri: d,
                        relayOrigin: h,
                        searchCounter: 0,
                        width: 10,
                        waiting: !0,
                        queue: [],
                        sendId: 0,
                        recvId: 0,
                        verifySendToken: String(Math.random()),
                        verifyRecvToken: null,
                        originVerified: !1
                    };
                    ".." !== a && m(c, d, l(a));
                    n(a)
                }
            } catch (f) {
                return gadgets.warn("Caught exception setting up RMR: " + f), !1
            }
            return !0
        }, call: function (a, b, c) {
            return p(a, c.s, b, c)
        }
    }
}());
gadgets.rpctx = gadgets.rpctx || {};
gadgets.rpctx.ifpc || (gadgets.rpctx.ifpc = function () {
    function m(d) {
        for (var a = [], c = 0, b = d.length; c < b; ++c)a.push(encodeURIComponent(gadgets.json.stringify(d[c])));
        return a.join("\x26")
    }

    function n(d) {
        for (var a, c = f.length - 1; 0 <= c; --c) {
            var b = f[c];
            try {
                if (b && (b.recyclable || "complete" === b.readyState))if (b.parentNode.removeChild(b), window.ActiveXObject)f[c] = b = null, f.splice(c, 1); else {
                    b.recyclable = !1;
                    a = b;
                    break
                }
            } catch (g) {
            }
        }
        a || (a = document.createElement("iframe"), a.style.border = a.style.width = a.style.height = "0px", a.style.visibility =
            "hidden", a.style.position = "absolute", a.onload = function () {
            this.recyclable = !0
        }, f.push(a));
        a.src = d;
        window.setTimeout(function () {
            document.body.appendChild(a)
        }, 0)
    }

    var f = [], k = 0, l, e = {};
    return {
        getCode: function () {
            return "ifpc"
        }, isParentVerifiable: function () {
            return !0
        }, init: function (d, a) {
            l = a;
            l("..", !0);
            return !0
        }, setup: function (d, a) {
            l(d, !0);
            return !0
        }, call: function (d, a, c) {
            var b = gadgets.rpc.getRelayUrl(d);
            ++k;
            if (!b)return gadgets.warn("No relay file assigned for IFPC"), !1;
            var g = null, h = [];
            if (c.l)g = [b, "#", m([a, k,
                1, 0, m([a, c.s, "", "", a].concat(c.a))])].join(""), h.push(g); else {
                g = [b, "#", d, "\x26", a, "@", k, "\x26"].join("");
                d = encodeURIComponent(gadgets.json.stringify(c));
                a = 2E3 - g.length;
                c = Math.ceil(d.length / a);
                for (var b = 0, e; 0 < d.length;)e = d.substring(0, a), d = d.substring(a), h.push([g, c, "\x26", b, "\x26", e].join("")), b += 1
            }
            do n(h.shift()); while (0 < h.length);
            return !0
        }, _receiveMessage: function (d, a) {
            var c = d[1], b = parseInt(d[2], 10), g = parseInt(d[3], 10), h = d[d.length - 1], f = 1 === b;
            if (1 < b) {
                e[c] || (e[c] = []);
                e[c][g] = h;
                a:{
                    for (b -= 1; 0 <= b; --b)if ("undefined" === typeof e[c][b]) {
                        b = !1;
                        break a
                    }
                    b = !0
                }
                b && (h = e[c].join(""), delete e[c], f = !0)
            }
            f && a(gadgets.json.parse(decodeURIComponent(h)))
        }
    }
}());
window.gadgets.rpc || (gadgets.rpc = function () {
    function z(a, b) {
        if (!q[a]) {
            var c = k;
            b || (c = t);
            q[a] = c;
            for (var d = r[a] || [], e = 0; e < d.length; ++e) {
                var f = d[e];
                f.t = l[a];
                c.call(a, f.f, f)
            }
            r[a] = []
        }
    }

    function T() {
        function a() {
            L = !0
        }

        M || ("undefined" != typeof window.addEventListener ? window.addEventListener("unload", a, !1) : "undefined" != typeof window.attachEvent && window.attachEvent("onunload", a), M = !0)
    }

    function U(a, b, c, d, e) {
        l[b] && l[b] === c || (gadgets.error("Invalid auth token. " + l[b] + " vs " + c), u(b, A));
        e.onunload = function () {
            g[b] && !L && (u(b, N), gadgets.rpc.removeReceiver(b))
        };
        T();
        d = gadgets.json.parse(decodeURIComponent(d))
    }

    function v(a, b) {
        if (a && "string" === typeof a.s && "string" === typeof a.f && a.a instanceof Array && ("function" !== typeof arbitrate || arbitrate(a.s, a.f)))if (l[a.f] && l[a.f] !== a.t && (gadgets.error("Invalid auth token. " + l[a.f] + " vs " + a.t), u(a.f, A)), "__ack" === a.s)window.setTimeout(function () {
            z(a.f, !0)
        }, 0); else {
            a.c && (a.callback = function (b) {
                gadgets.rpc.call(a.f, "__cb", null, a.c, b)
            });
            if (b) {
                var c = p(b);
                a.origin = b;
                var d = a.r;
                d && p(d) ==
                c || (d = b);
                a[V] = d
            }
            c = (m[a.s] || m[""]).apply(a, a.a);
            a.c && "undefined" !== typeof c && gadgets.rpc.call(a.f, "__cb", null, a.c, c)
        }
    }

    function p(a) {
        if (!a)return "";
        a = a.toLowerCase();
        0 == a.indexOf("//") && (a = window.location.protocol + a);
        -1 == a.indexOf("://") && (a = window.location.protocol + "//" + a);
        var b = a.substring(a.indexOf("://") + 3), c = b.indexOf("/");
        -1 != c && (b = b.substring(0, c));
        a = a.substring(0, a.indexOf("://"));
        var c = "", d = b.indexOf(":");
        if (-1 != d) {
            var e = b.substring(d + 1), b = b.substring(0, d);
            if ("http" === a && "80" !== e || "https" ===
                a && "443" !== e)c = ":" + e
        }
        return a + "://" + b + c
    }

    function s(a) {
        if ("/" == a.charAt(0)) {
            var b = a.indexOf("|"), c = 0 < b ? a.substring(1, b) : a.substring(1);
            a = 0 < b ? a.substring(b + 1) : null;
            return {id: c, origin: a}
        }
        return null
    }

    function B(a) {
        if ("undefined" === typeof a || ".." === a)return window.parent;
        var b = s(a);
        if (b) {
            for (a = window; !a.frames[b.id] && a !== window.top;)a = a.parent;
            return a.frames[b.id]
        }
        a = String(a);
        return (b = document.getElementById(a)) && b.contentWindow ? b.contentWindow : (b = window.frames[a]) && !b.closed ? b : null
    }

    function O(a, b) {
        if (!0 !==
            g[a]) {
            "undefined" === typeof g[a] && (g[a] = 0);
            var c = B(a);
            ".." !== a && null == c || !0 !== k.setup(a, b) ? !0 !== g[a] && 10 > g[a]++ ? window.setTimeout(function () {
                O(a, b)
            }, 500) : (q[a] = t, g[a] = !0) : g[a] = !0
        }
    }

    function W(a, b) {
        var c = B(a);
        if (!f[a] || f[a] !== w && c.Function.prototype !== f[a].constructor.prototype) {
            var d = C(a);
            if (p(d) !== p(window.location.href))return f[a] = w, !1;
            try {
                f[a] = c.gadgets.rpc.receiveSameDomain
            } catch (e) {
                return f[a] = w, !1
            }
        }
        return f[a] && f[a] !== w ? (f[a](b), !0) : !1
    }

    function C(a) {
        (a = D[a]) && "/" === a.substring(0, 1) && (a = "/" ===
        a.substring(1, 2) ? document.location.protocol + a : document.location.protocol + "//" + document.location.host + a);
        return a
    }

    function E(a, b, c) {
        /http(s)?:\/\/.+/.test(b) || (0 == b.indexOf("//") ? b = window.location.protocol + b : "/" == b.charAt(0) ? b = window.location.protocol + "//" + window.location.host + b : -1 == b.indexOf("://") && (b = window.location.protocol + "//" + b));
        D[a] = b;
        "undefined" !== typeof c && (x[a] = !!c)
    }

    function F(a, b) {
        b = b || "";
        l[a] = String(b);
        O(a, b)
    }

    function P(a) {
        a = (a.passReferrer || "").split(":", 2);
        y = a[0] || "none";
        G = a[1] || "origin"
    }

    function Q(a) {
        "true" === String(a.useLegacyProtocol) && (k = gadgets.rpctx.ifpc, k.init(v, z))
    }

    function X(a, b) {
        function c(c) {
            c = c ? c.rpc : {};
            P(c);
            var e = c.parentRelayUrl || "", e = p(n.parent || b) + e;
            E("..", e, "true" === String(c.useLegacyProtocol));
            Q(c);
            F("..", a)
        }

        !n.parent && b ? c({}) : gadgets.config.register("rpc", null, c)
    }

    function R(a, b, c) {
        if (".." === a)X(c || n.rpctoken || n.ifpctok || "", b); else a:{
            var d = null;
            if ("/" != a.charAt(0)) {
                if (!gadgets.util)break a;
                d = document.getElementById(a);
                if (!d)throw Error("Cannot set up gadgets.rpc receiver with ID: " +
                    a + ", element not found.");
            }
            d = d && d.src;
            b = b || gadgets.rpc.getOrigin(d);
            E(a, b);
            b = gadgets.util.getUrlParameters(d);
            F(a, c || b.rpctoken)
        }
    }

    var V = "referer", m = {}, D = {}, x = {}, l = {}, H = 0, I = {}, g = {}, f = {}, n = {}, q = {}, r = {}, y = null, G = null, Y = !!gadgets.util.getUrlParameters().parent && window.top !== window.self, J = window.name, u = function () {
    }, N = 1, A = 2, K = window.console, S = K && K.log ? function (a) {
        K.log(a)
    } : function () {
    }, t = function () {
        function a(a) {
            return function () {
                S(a + ": call ignored")
            }
        }

        return {
            getCode: function () {
                return "noop"
            }, isParentVerifiable: function () {
                return !0
            },
            init: a("init"), setup: a("setup"), call: a("call")
        }
    }();
    gadgets.util && (n = gadgets.util.getUrlParameters());
    var L = !1, M = !1, k = "flash" == n.rpctx ? gadgets.rpctx.flash : "rmr" == n.rpctx ? gadgets.rpctx.rmr : "function" === typeof window.postMessage ? gadgets.rpctx.wpm : "object" === typeof window.postMessage ? gadgets.rpctx.wpm : window.ActiveXObject ? gadgets.rpctx.flash ? gadgets.rpctx.flash : gadgets.rpctx.nix : 0 < navigator.userAgent.indexOf("WebKit") ? gadgets.rpctx.rmr : "Gecko" === navigator.product ? gadgets.rpctx.frameElement : gadgets.rpctx.ifpc;
    m[""] = function () {
        S("Unknown RPC service: " + this.s)
    };
    m.__cb = function (a, b) {
        var c = I[a];
        c && (delete I[a], c.call(this, b))
    };
    var w = {};
    return {
        config: function (a) {
            "function" === typeof a.securityCallback && (u = a.securityCallback);
            "function" === typeof a.arbitrator && (arbitrate = a.arbitrator)
        },
        register: function (a, b) {
            if ("__cb" === a || "__ack" === a)throw Error("Cannot overwrite callback/ack service");
            if ("" === a)throw Error("Cannot overwrite default service: use registerDefault");
            var c = m[a];
            m[a] = b;
            return c
        },
        unregister: function (a) {
            if ("__cb" ===
                a || "__ack" === a)throw Error("Cannot delete callback/ack service");
            if ("" === a)throw Error("Cannot delete default service: use unregisterDefault");
            delete m[a]
        },
        registerDefault: function (a) {
            m[""] = a
        },
        unregisterDefault: function () {
            delete m[""]
        },
        forceParentVerifiable: function () {
            k.isParentVerifiable() || (k = gadgets.rpctx.ifpc)
        },
        call: function (a, b, c, d) {
            a = a || "..";
            var e = "..";
            ".." === a ? e = J : "/" == a.charAt(0) && (e = gadgets.rpc.getOrigin(window.location.href), e = "/" + J + (e ? "|" + e : ""));
            ++H;
            c && (I[H] = c);
            var f = {
                s: b, f: e, c: c ? H : 0, a: Array.prototype.slice.call(arguments,
                    3), t: l[a], l: !!x[a]
            }, h;
            a:if ("bidir" === y || "c2p" === y && ".." === a || "p2c" === y && ".." !== a) {
                h = window.location.href;
                var g = "?";
                if ("query" === G)g = "#"; else if ("hash" === G)break a;
                g = h.lastIndexOf(g);
                g = -1 === g ? h.length : g;
                h = h.substring(0, g)
            } else h = null;
            h && (f.r = h);
            ".." !== a && null == s(a) && !document.getElementById(a) || W(a, f) || ((h = q[a]) || null === s(a) || (h = k), h ? (x[a] && (h = gadgets.rpctx.ifpc), !1 === h.call(a, e, f) && (q[a] = t, k.call(a, e, f))) : r[a] ? r[a].push(f) : r[a] = [f])
        },
        getRelayUrl: C,
        setRelayUrl: E,
        setAuthToken: F,
        setupReceiver: R,
        getAuthToken: function (a) {
            return l[a]
        },
        removeReceiver: function (a) {
            delete D[a];
            delete x[a];
            delete l[a];
            delete g[a];
            delete f[a];
            delete q[a]
        },
        getRelayChannel: function () {
            return k.getCode()
        },
        receive: function (a, b) {
            4 < a.length ? k._receiveMessage(a, v) : U.apply(null, a.concat(b))
        },
        receiveSameDomain: function (a) {
            a.a = Array.prototype.slice.call(a.a);
            window.setTimeout(function () {
                v(a)
            }, 0)
        },
        getOrigin: p,
        getTargetOrigin: function (a) {
            var b = null, b = C(a);
            b || (b = (b = s(a)) ? b.origin : ".." == a ? n.parent : document.getElementById(a).src);
            return p(b)
        },
        init: function () {
            !1 === k.init(v,
                z) && (k = t);
            Y ? R("..") : gadgets.config.register("rpc", null, function (a) {
                a = a.rpc || {};
                P(a);
                Q(a)
            })
        },
        _getTargetWin: B,
        _parseSiblingId: s,
        ACK: "__ack",
        RPC_ID: J || "..",
        SEC_ERROR_LOAD_TIMEOUT: 0,
        SEC_ERROR_FRAME_PHISH: N,
        SEC_ERROR_FORGED_MSG: A
    }
}(), gadgets.rpc.init());
shindig.uri = function () {
    var E = /^(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;
    return function (k) {
        function r(a) {
            if (null === a.match(E))throw"Malformed URL: " + a;
            l = RegExp.$1;
            m = RegExp.$2;
            p = RegExp.$3;
            g = RegExp.$4;
            h = RegExp.$5
        }

        function s(a) {
            for (var b = [], d = 0, F = a.length; d < F; ++d) {
                var n = a[d][0], c = a[d][1];
                "undefined" != typeof c && b.push(t(n) + (null !== c ? "\x3d" + t(c) : ""))
            }
            return b.join("\x26")
        }

        function u() {
            c && (g = s(c), c = null);
            return g
        }

        function v() {
            f && (h = s(f), f = null);
            return h
        }

        function w(a) {
            c = c || q(g);
            return x(c, a)
        }

        function y(a) {
            f = f || q(h);
            return x(f, a)
        }

        function z(a, b) {
            c = A(c || q(g), a, b);
            return e
        }

        function B(a, b) {
            f = A(f || q(h), a, b);
            return e
        }

        function C() {
            return [l, "" !== l ? ":" : "", "" !== m ? "//" : "", m].join("")
        }

        function q(a) {
            var b = [];
            if ("" === a)return b;
            a = a.split("\x26");
            for (var d = 0, c = a.length; d < c; ++d) {
                var n = a[d].split("\x3d"), f = n.shift(), e = null;
                0 < n.length && (e = n.join("").replace(/\+/g, " "));
                b.push([f, null != e ? G(e) : null])
            }
            return b
        }

        function x(a, b) {
            for (var d = 0, c = a.length; d < c; ++d)if (a[d][0] == b)return a[d][1]
        }

        function A(a,
                   b, d) {
            var c = b;
            "string" === typeof b && (c = {}, c[b] = d);
            for (var e in c) {
                b = !1;
                d = 0;
                for (var f = a.length; !b && d < f; ++d)a[d][0] == e && (a[d][1] = c[e], b = !0);
                b || a.push([e, c[e]])
            }
            return a
        }

        function D(a, b) {
            a = a || "";
            a[0] === b && (a = a.substr(b.length));
            return a
        }

        var l = "", m = "", p = "", g = "", c = null, h = "", f = null, G = window.decodeURIComponent ? decodeURIComponent : unescape, t = window.encodeURIComponent ? encodeURIComponent : escape, e = null;
        "object" === typeof k && "function" === typeof k.toString ? r(k.toString()) : k && r(k);
        return e = {
            getSchema: function () {
                return l
            },
            getAuthority: function () {
                return m
            }, getOrigin: C, getPath: function () {
                return p
            }, getQuery: u, getFragment: v, getQP: w, getFP: y, setSchema: function (a) {
                l = a;
                return e
            }, setAuthority: function (a) {
                m = a;
                return e
            }, setPath: function (a) {
                "undefined" !== typeof a && null != a && (p = ("/" === a[0] ? "" : "/") + a);
                return e
            }, setQuery: function (a) {
                c = null;
                g = D(a, "?");
                return e
            }, setFragment: function (a) {
                f = null;
                h = D(a, "#");
                return e
            }, setQP: z, setFP: B, setExistingP: function (a, b) {
                "undefined" != typeof w(a, b) && z(a, b);
                "undefined" != typeof y(a, b) && B(a, b);
                return e
            },
            toString: function () {
                var a = u(), b = v();
                return [C(), p, "" !== a ? "?" : "", a, "" !== b ? "#" : "", b].join("")
            }
        }
    }
}();
gadgets.io = function () {
    function x() {
        var c;
        if ("undefined" != typeof shindig && shindig.xhrwrapper && shindig.xhrwrapper.createXHR)return shindig.xhrwrapper.createXHR();
        if ("undefined" != typeof ActiveXObject)try {
            return (c = new ActiveXObject("Msxml2.XMLHTTP")) || (c = new ActiveXObject("Microsoft.XMLHTTP")), c
        } catch (d) {
        }
        if ("undefined" != typeof XMLHttpRequest || window.XMLHttpRequest)return new window.XMLHttpRequest;
        throw"no xhr available";
    }

    function v(c, d) {
        if (4 !== c.readyState)return !0;
        try {
            if (200 !== c.status) {
                var a = "" + c.status;
                c.responseText && (a = a + " " + c.responseText);
                d({errors: [a], rc: c.status, text: c.responseText});
                return !0
            }
        } catch (b) {
            return d({errors: [b.number + " Error not specified"], rc: b.number, text: b.description}), !0
        }
        return !1
    }

    function y(c, d, a, b) {
        v(b, d) || d(r(a, {body: b.responseText}))
    }

    function s(c, d, a, b) {
        if (!v(b, d)) {
            b = b.responseText;
            var h = p.unparseableCruft, f = b.indexOf(h) + h.length;
            f < h.length || (b = b.substr(f), b = eval("(" + b + ")"), b = b[c], b.oauthState && (q = b.oauthState), b.st && shindig.auth.updateSecurityToken(b.st), d(r(a, b)))
        }
    }

    function r(c,
               d) {
        var a = {
            text: d.body,
            rc: d.rc || 200,
            headers: d.headers,
            oauthApprovalUrl: d.oauthApprovalUrl,
            oauthError: d.oauthError,
            oauthErrorText: d.oauthErrorText,
            oauthErrorTrace: d.oauthErrorTrace,
            oauthErrorUri: d.oauthErrorUri,
            oauthErrorExplanation: d.oauthErrorExplanation,
            errors: []
        };
        if (200 > a.rc || 400 <= a.rc)a.errors = [a.rc + " Error"]; else if (a.text)switch (300 <= a.rc && 400 > a.rc && (c.CONTENT_TYPE = "TEXT"), c.CONTENT_TYPE) {
            case "JSON":
            case "FEED":
                a.data = gadgets.json.parse(a.text);
                a.data || (a.errors.push("500 Failed to parse JSON"),
                    a.rc = 500, a.data = null);
                break;
            case "DOM":
                var b;
                "undefined" != typeof DOMParser ? (b = (new DOMParser).parseFromString(a.text, "text/xml"), "parsererror" === b.documentElement.nodeName ? (a.errors.push("500 Failed to parse XML"), a.rc = 500) : a.data = b) : "undefined" != typeof ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = !1, b.validateOnParse = !1, b.resolveExternals = !1, b.loadXML(a.text) ? a.data = b : (a.errors.push("500 Failed to parse XML"), a.rc = 500)) : (a.errors.push("500 Failed to parse XML because no DOM parser was available"),
                    a.rc = 500);
                break;
            default:
                a.data = a.text
        }
        return a
    }

    function t(c, d, a, b, h, f, k, e) {
        var l = x();
        0 == d.indexOf("//") && (d = document.location.protocol + d);
        l.open(h, d, !0);
        a && (c = gadgets.util.makeClosure(null, k, c, a, f, l), gadgets.util.shouldPollXhrReadyStateChange() ? z(l, c) : l.onreadystatechange = c);
        "string" === typeof e && (e = {});
        e = e || {};
        null !== b && (e["Content-Type"] || (e["Content-Type"] = "application/x-www-form-urlencoded"));
        for (var n in e)l.setRequestHeader(n, e[n]);
        l.send(b)
    }

    function z(c, d) {
        var a = w;
        u[a] = window.setInterval(function () {
            c &&
            4 === c.readyState && (window.clearInterval(u[a]), delete u[a], d && d())
        }, p.xhrPollIntervalMs || 50);
        w++
    }

    var w = 0, u = {}, p = {}, q;
    gadgets.config.register("core.io", null, function (c) {
        p = c["core.io"] || {}
    });
    return {
        makeRequest: function (c, d, a) {
            a = a || {};
            var b = a.METHOD || "GET", h = a.REFRESH_INTERVAL, f, k;
            a.AUTHORIZATION && "NONE" !== a.AUTHORIZATION && (f = a.AUTHORIZATION.toLowerCase(), k = shindig.auth.getSecurityToken());
            var e = !0;
            "undefined" !== typeof a.SIGN_OWNER && (e = a.SIGN_OWNER);
            var l = !0;
            "undefined" !== typeof a.SIGN_VIEWER && (l = a.SIGN_VIEWER);
            var n = a.HEADERS || {};
            "POST" !== b || n["Content-Type"] || (n["Content-Type"] = "application/x-www-form-urlencoded");
            var g = gadgets.util.getUrlParameters(), e = {
                url: c,
                httpMethod: b,
                headers: gadgets.io.encodeValues(n, !1),
                postData: a.POST_DATA || "",
                authz: f || "",
                st: k || "",
                contentType: a.CONTENT_TYPE || "TEXT",
                numEntries: a.NUM_ENTRIES || "3",
                getSummaries: !!a.GET_SUMMARIES,
                signOwner: e,
                signViewer: l,
                gadget: g.url,
                container: g.container || g.synd || "default",
                bypassSpecCache: gadgets.util.getUrlParameters().nocache || "",
                getFullHeaders: !!a.GET_FULL_HEADERS
            };
            a.hasOwnProperty("NO_CACHE") ? e.nocache = a.NO_CACHE : g.hasOwnProperty("nocache") && (e.nocache = g.nocache);
            if ("oauth" === f || "signed" === f || "oauth2" === f) {
                gadgets.io.oauthReceivedCallbackUrl_ && (e.OAUTH_RECEIVED_CALLBACK = gadgets.io.oauthReceivedCallbackUrl_, gadgets.io.oauthReceivedCallbackUrl_ = null);
                e.oauthState = q || "";
                for (var m in a)!a.hasOwnProperty(m) || 0 !== m.indexOf("OAUTH_") && "code" !== m || (e[m] = a[m])
            }
            f = (k = k || shindig.auth.getSecurityToken()) ? {"X-Shindig-ST": k} : {};
            k = p.jsonProxyUrl.replace("%host%", document.location.host);
            a:{
                if (gadgets.io.preloaded_ && "GET" === e.httpMethod)for (m = 0; m < gadgets.io.preloaded_.length; m++)if ((g = gadgets.io.preloaded_[m]) && g.id === e.url) {
                    delete gadgets.io.preloaded_[m];
                    200 !== g.rc ? d({
                        rc: g.rc,
                        errors: [g.rc + " Error"]
                    }) : (g.oauthState && (q = g.oauthState), d(r(a, {
                        body: g.body,
                        rc: g.rc,
                        headers: g.headers,
                        oauthApprovalUrl: g.oauthApprovalUrl,
                        oauthError: g.oauthError,
                        oauthErrorText: g.oauthErrorText,
                        oauthErrorTrace: g.oauthErrorTrace,
                        oauthErrorUri: g.oauthErrorUri,
                        oauthErrorExplanation: g.oauthErrorExplanation,
                        errors: []
                    })));
                    m = !0;
                    break a
                }
                m = !1
            }
            m || ("GET" == b && "undefined" != typeof h && (e.refresh = h), "GET" !== b || e.authz ? (b = gadgets.io.encodeValues(e), t(c, k, d, b, "POST", a, s, f)) : (b = "?" + gadgets.io.encodeValues(e), t(c, k + b, d, null, "GET", a, s, f)))
        }, makeNonProxiedRequest: function (c, d, a, b) {
            a = a || {};
            t(c, c, d, a.POST_DATA, a.METHOD, a, y, b)
        }, clearOAuthState: function () {
            q = void 0
        }, encodeValues: function (c, d) {
            var a = !d, b = [], h = !1, f;
            for (f in c)c.hasOwnProperty(f) && !/___$/.test(f) && (h ? b.push("\x26") : h = !0, b.push(a ? encodeURIComponent(f) : f), b.push("\x3d"), b.push(a ?
                encodeURIComponent(c[f]) : c[f]));
            return b.join("")
        }, getProxyUrl: function (c, d) {
            var a = p.proxyUrl;
            if (!a)return a;
            var b = d || {}, h = b.REFRESH_INTERVAL;
            "undefined" == typeof h && (h = "3600");
            var f = gadgets.util.getUrlParameters(), k = shindig.auth.getSecurityToken(), e = b[gadgets.io.RequestParameters.AUTHORIZATION], l = b[gadgets.io.RequestParameters.OAUTH_SERVICE_NAME], b = b.rewriteMime ? "\x26rewriteMime\x3d" + encodeURIComponent(b.rewriteMime) : "", n = "";
            e && (n = e == gadgets.io.AuthorizationType.OAUTH || e == gadgets.io.AuthorizationType.OAUTH2 ?
            "\x26authz\x3d" + e.toLowerCase() + "\x26st\x3d" + encodeURIComponent(k) + "\x26OAUTH_SERVICE_NAME\x3d" + encodeURIComponent(l) : "\x26authz\x3d" + e.toLowerCase());
            k = shindig.uri(c).getPath();
            e = "";
            l = k.lastIndexOf("/");
            -1 !== l && (e = k.substring(l));
            a = a.replace("%url%", encodeURIComponent(c)).replace("%host%", document.location.host).replace("%rawurl%", c).replace("%filename%", e).replace("%refresh%", encodeURIComponent(h)).replace("%gadget%", encodeURIComponent(f.url)).replace("%container%", encodeURIComponent(f.container ||
                f.synd || "default")).replace("%authz%", n).replace("%rewriteMime%", b);
            0 == a.indexOf("//") && (a = window.location.protocol + a);
            return a
        }, processResponse_: s
    }
}();
gadgets.io.RequestParameters = gadgets.util.makeEnum("ALIAS METHOD CONTENT_TYPE POST_DATA HEADERS AUTHORIZATION NUM_ENTRIES GET_SUMMARIES GET_FULL_HEADERS REFRESH_INTERVAL SIGN_OWNER SIGN_VIEWER OAUTH_SERVICE_NAME OAUTH_USE_TOKEN OAUTH_TOKEN_NAME OAUTH_REQUEST_TOKEN OAUTH_REQUEST_TOKEN_SECRET OAUTH_RECEIVED_CALLBACK NO_CACHE".split(" "));
gadgets.io.MethodType = gadgets.util.makeEnum(["GET", "POST", "PUT", "DELETE", "HEAD"]);
gadgets.io.ContentType = gadgets.util.makeEnum(["TEXT", "DOM", "JSON", "FEED"]);
gadgets.io.AuthorizationType = gadgets.util.makeEnum(["NONE", "SIGNED", "OAUTH", "OAUTH2"]);
(function () {
    osapi.newBatch = function () {
        var e = {}, g = [], l = function (b) {
            var c = {method: b.request.method, id: b.key};
            b.request.rpc && (c.params = b.request.rpc);
            return c
        };
        e.execute = function (b) {
            for (var c = {}, f = {}, e = 0, k = [], d = 0; d < g.length; d++) {
                var a = g[d].request.transport;
                f[a.name] || (k.push(a), e++);
                f[a.name] = f[a.name] || [];
                f[a.name].push(l(g[d]))
            }
            d = function (a) {
                a.error && (c.error = a.error);
                for (var d = 0; d < g.length; d++) {
                    var f = g[d].key, h = a[f];
                    h && (c[f] = h.error ? h : h.data || h.result)
                }
                e--;
                0 === e && b(c)
            };
            for (a = 0; a < k.length; a++)k[a].execute(f[k[a].name],
                d);
            0 == e && window.setTimeout(function () {
                b(c)
            }, 0)
        };
        e.add = function (b, c) {
            c && b && g.push({key: b, request: c});
            return e
        };
        return e
    }
})();
osapi._registerMethod = function (b, d) {
    if ("newBatch" !== b) {
        for (var a = b.split("."), c = osapi, f = 0; f < a.length - 1; f++)c[a[f]] = c[a[f]] || {}, c = c[a[f]];
        var e = a[a.length - 1], g;
        c[e] && (g = c[e]);
        c[e] = function (a) {
            a = a || {};
            a.userId = a.userId || "@viewer";
            a.groupId = a.groupId || "@self";
            return new osapi._BoundCall(b, d, a)
        };
        "undefined" !== typeof tamings___ && (a = function () {
            caja___.markFunction(c[e], b)
        }, g && g.__taming_index ? (c[e].__taming_index = g.__taming_index, tamings___[g.__taming_index] = a) : (c[e].__taming_index = tamings___.length, tamings___.push(a)))
    }
};
osapi._BoundCall = function (b, d, a) {
    this.method = b;
    this.transport = d;
    this.rpc = a
};
osapi._BoundCall.prototype.execute = function (b) {
    var d = "undefined" !== typeof caja___ && caja___.getUseless && caja___.getUseless(), a = d ? caja___.getUseless() : this, c = d ? caja___.untame(b) : b;
    b = osapi.newBatch();
    b.add(this.method, this);
    b.execute(function (b) {
        b.error ? c.call(a, {error: b.error}) : c.call(a, b[a.method])
    })
};
shindig._uri = shindig.uri;
shindig.uri = function () {
    var f = shindig._uri;
    shindig._uri = null;
    return function (g) {
        var a = f(g);
        a.hasSameOrigin = function (b) {
            return a.getOrigin() == b.getOrigin()
        };
        a.resolve = function (b) {
            "" == a.getSchema() && a.setSchema(b.getSchema());
            "" == a.getAuthority() && a.setAuthority(b.getAuthority());
            var c = a.getPath();
            if ("" == c || "/" != c.charAt(0)) {
                var d = b.getPath(), e = d.lastIndexOf("/");
                -1 != e && d.substring(0, e + 1);
                a.setPath(b.getPath() + c)
            }
        };
        return a
    }
}();
(function () {
    function k(e, d) {
        var c = {
            POST_DATA: gadgets.json.stringify(e),
            CONTENT_TYPE: "JSON",
            METHOD: "POST",
            AUTHORIZATION: "SIGNED"
        }, f = {"Content-Type": "application/json"}, a = this.name, g = shindig.auth.getSecurityToken();
        g && (h ? f.Authorization = "OAuth2 " + g : a = a + "?st\x3d" + encodeURIComponent(g));
        gadgets.io.makeNonProxiedRequest(a, function (b) {
            if (b.errors[0])d({
                error: {
                    code: b.rc,
                    message: b.text
                }
            }); else if (b = b.result || b.data, b.error)d(b); else {
                for (var c = {}, a = 0; a < b.length; a++)c[b[a].id] = b[a];
                d(c)
            }
        }, c, f)
    }

    function l(e) {
        var d =
            e["osapi.services"];
        h = e["osapi.useOAuth2"];
        if (d)for (var c in d)if (d.hasOwnProperty(c) && (0 == c.indexOf("http") || 0 == c.indexOf("//"))) {
            e = {name: c.replace("%host%", document.location.host), execute: k};
            for (var f = d[c], a = 0; a < f.length; a++)osapi._registerMethod(f[a], e)
        }
    }

    var h;
    gadgets.config && gadgets.config.register("osapi.services", null, l)
})();
gadgets.util.registerOnLoadHandler(function () {
    osapi && osapi.people && osapi.people.get && (osapi.people.getViewer = function (a) {
        a = a || {};
        a.userId = "@viewer";
        a.groupId = "@self";
        return osapi.people.get(a)
    }, osapi.people.getViewerFriends = function (a) {
        a = a || {};
        a.userId = "@viewer";
        a.groupId = "@friends";
        return osapi.people.get(a)
    }, osapi.people.getOwner = function (a) {
        a = a || {};
        a.userId = "@owner";
        a.groupId = "@self";
        return osapi.people.get(a)
    }, osapi.people.getOwnerFriends = function (a) {
        a = a || {};
        a.userId = "@owner";
        a.groupId = "@friends";
        return osapi.people.get(a)
    })
});
osapi.container = {};
osapi.container.MetadataParam = {LOCAL_EXPIRE_TIME: "localExpireTimeMs", URL: "url"};
osapi.container.MetadataResponse = {
    IFRAME_URLS: "iframeUrls",
    NEEDS_TOKEN_REFRESH: "needsTokenRefresh",
    VIEWS: "views",
    EXPIRE_TIME_MS: "expireTimeMs",
    FEATURES: "features",
    HEIGHT: "height",
    MODULE_PREFS: "modulePrefs",
    PREFERRED_HEIGHT: "preferredHeight",
    PREFERRED_WIDTH: "preferredWidth",
    RESPONSE_TIME_MS: "responseTimeMs",
    WIDTH: "width",
    TOKEN_TTL: "tokenTTL"
};
osapi.container.TokenResponse = {TOKEN: "token", TOKEN_TTL: "tokenTTL", MODULE_ID: "moduleId"};
osapi.container.NavigateTiming = {
    URL: "url",
    ID: "id",
    START: "start",
    XRT: "xrt",
    SRT: "srt",
    DL: "dl",
    OL: "ol",
    PRT: "prt"
};
osapi.container.RenderParam = {
    ALLOW_DEFAULT_VIEW: "allowDefaultView",
    CAJOLE: "cajole",
    CLASS: "class",
    DEBUG: "debug",
    HEIGHT: "height",
    NO_CACHE: "nocache",
    TEST_MODE: "testmode",
    USER_PREFS: "userPrefs",
    VIEW: "view",
    WIDTH: "width",
    MODULE_ID: "moduleid",
    SCROLL: "scroll"
};
osapi.container.ViewParam = {VIEW: "view"};
osapi.container.CallbackType = {
    ON_BEFORE_PRELOAD: "onBeforePreload",
    ON_PRELOADED: "onPreloaded",
    ON_BEFORE_NAVIGATE: "onBeforeNavigate",
    ON_NAVIGATED: "onNavigated",
    ON_BEFORE_CLOSE: "onBeforeClose",
    ON_CLOSED: "onClosed",
    ON_BEFORE_UNLOAD: "onBeforeUnload",
    ON_UNLOADED: "onUnloaded",
    ON_BEFORE_RENDER: "onBeforeRender",
    ON_RENDER: "onRender",
    GADGET_ON_LOAD: "__gadgetOnLoad"
};
osapi.container.ContainerConfig = {
    ALLOW_DEFAULT_VIEW: "allowDefaultView",
    RENDER_CAJOLE: "renderCajole",
    RENDER_DEBUG: "renderDebug",
    RENDER_DEBUG_PARAM: "renderDebugParam",
    RENDER_TEST: "renderTest",
    TOKEN_REFRESH_INTERVAL: "tokenRefreshInterval",
    NAVIGATE_CALLBACK: "navigateCallback",
    PRELOAD_REF_TIME: "preloadRefTime",
    PRELOAD_METADATAS: "preloadMetadatas",
    PRELOAD_TOKENS: "preloadTokens",
    GET_LANGUAGE: "GET_LANGUAGE",
    GET_COUNTRY: "GET_COUNTRY",
    GET_PREFERENCES: "GET_PREFERENCES",
    SET_PREFERENCES: "SET_PREFERENCES",
    RPC_ARBITRATOR: "rpcArbitrator",
    GET_GADGET_TOKEN: "GET_GADGET_TOKEN",
    GET_CONTAINER_TOKEN: "GET_CONTAINER_TOKEN"
};
osapi.container.ServiceConfig = {API_HOST: "apiHost", API_PATH: "apiPath"};
osapi.container.util = {};
osapi.container.util.getSafeJsonValue = function (a, b, c) {
    return "undefined" != typeof a[b] && null != a[b] ? a[b] : c
};
osapi.container.util.mergeJsons = function (a, b) {
    var c = {}, d;
    for (d in a)c[d] = a[d];
    for (d in b)c[d] = b[d];
    return c
};
osapi.container.util.newMetadataRequest = function (a) {
    osapi.container.util.isArray(a) || (a = [a]);
    return {
        container: window.__CONTAINER,
        ids: a,
        fields: "iframeUrls modulePrefs.* needsTokenRefresh userPrefs.* views.preferredHeight views.preferredWidth expireTimeMs responseTimeMs rpcServiceIds tokenTTL".split(" ")
    }
};
osapi.container.util.newTokenRequest = function (a) {
    osapi.container.util.isArray(a) || (a = [a]);
    return {container: window.__CONTAINER, ids: a, fields: ["token", "tokenTTL", "moduleId"]}
};
osapi.container.util.toArrayOfJsonKeys = function (a) {
    var b = [], c;
    for (c in a)b.push(c);
    return b
};
osapi.container.util.isArray = function (a) {
    return "[object Array]" == Object.prototype.toString.call(a)
};
osapi.container.util.isEmptyJson = function (a) {
    for (var b in a)return !1;
    return !0
};
osapi.container.util.getCurrentTimeMs = function () {
    return (new Date).getTime()
};
osapi.container.util.createIframeHtml = function (a) {
    var b = [], c = 0;
    b[c++] = "\x3ciframe ";
    for (var d in a) {
        var e = a[d];
        "undefined" != typeof e && (b[c++] = d, b[c++] = '\x3d"', b[c++] = e, b[c++] = '" ')
    }
    b[c++] = "\x3e\x3c/iframe\x3e";
    return b.join("")
};
osapi.container.util.buildTokenRequestUrl = function (a, b) {
    a = shindig.uri(a);
    b && a.setFP("moduleId", b);
    return a.toString()
};
osapi.container.Site = function (a, b, c, d) {
    this.container_ = a;
    this.service_ = b;
    this.id_ = (this.el_ = c) && this.el_.id ? this.el_.id : osapi.container.Site.prototype.nextUniqueSiteId_++;
    this.title_ = this.ownerId_ = this.parentId_ = void 0
};
osapi.container.Site.DEFAULT_TITLE = "default title";
osapi.container.Site.prototype.nextUniqueSiteId_ = 0;
osapi.container.Site.prototype.onConstructed = function () {
};
osapi.container.Site.prototype.getId = function () {
    return this.id_
};
osapi.container.Site.prototype.setWidth = function (a) {
    var b = this.getActiveSiteHolder();
    b && (b = b.getIframeElement()) && (b.style.width = a + "px");
    return this
};
osapi.container.Site.prototype.setHeight = function (a) {
    var b = this.getActiveSiteHolder();
    b && (b = b.getIframeElement()) && (b.style.height = a + "px");
    return this
};
osapi.container.Site.prototype.setTitle = function (a) {
    this.title_ = a;
    var b = this.getActiveSiteHolder();
    b && b.setTitle(a);
    return this
};
osapi.container.Site.prototype.getTitle = function () {
    if ("undefined" !== typeof this.title_)return this.title_;
    var a = this.getActiveSiteHolder();
    return a && a.gadgetInfo_ && (a = a.gadgetInfo_) && a.modulePrefs && a.modulePrefs.title ? a.modulePrefs.title : osapi.container.Site.DEFAULT_TITLE
};
osapi.container.Site.prototype.close = function () {
    var a = this.getActiveSiteHolder();
    a && a.dispose()
};
osapi.container.Site.prototype.getParentId = function () {
    return this.parentId_
};
osapi.container.Site.prototype.setParentId = function (a) {
    this.parentId_ = a;
    return this
};
osapi.container.Site.prototype.getActiveSiteHolder = function () {
    throw Error("This method must be implemented by a subclass.");
};
osapi.container.Site.prototype.render = function () {
    throw Error("This method must be implemented by a subclass.");
};
osapi.container.SiteHolder = function (c, b, a) {
    this.site_ = c;
    this.el_ = b;
    this.onLoad_ = a;
    this.renderParams_ = this.iframeId_ = void 0;
    this.onConstructed()
};
osapi.container.SiteHolder.prototype.onConstructed = function () {
};
osapi.container.SiteHolder.prototype.getElement = function () {
    return this.el_
};
osapi.container.SiteHolder.prototype.getIframeId = function () {
    return this.iframeId_
};
osapi.container.SiteHolder.prototype.dispose = function () {
    this.el_ && this.el_.firstChild && this.el_.removeChild(this.el_.firstChild)
};
osapi.container.SiteHolder.prototype.createIframeHtml = function (c, b) {
    var a = this.createIframeAttributeMap(c, b);
    a.onload = this.onLoad_ ? "window." + this.onLoad_ + "('" + this.getUrl() + "', '" + this.site_.getId() + "');" : void 0;
    return osapi.container.util.createIframeHtml(a)
};
osapi.container.SiteHolder.prototype.createIframeAttributeMap = function (c, b) {
    var a = this.renderParams_ || {}, a = {
        id: this.iframeId_,
        name: this.iframeId_,
        src: c,
        scrolling: a[osapi.container.RenderParam.SCROLL] ? "yes" : "no",
        marginwidth: 0,
        marginheight: 0,
        frameborder: 0,
        vspace: 0,
        hspace: 0,
        "class": a[osapi.container.RenderParam.CLASS],
        height: a[osapi.container.RenderParam.HEIGHT],
        width: a[osapi.container.RenderParam.WIDTH]
    };
    if (b)for (var d in b)a[d] = b[d];
    return a
};
osapi.container.SiteHolder.prototype.setTitle = function (c) {
    var b = this.getIframeElement();
    b && (b.title = c)
};
osapi.container.SiteHolder.prototype.getIframeElement = function () {
    throw Error("This method must be implemented by a subclass.");
};
osapi.container.SiteHolder.prototype.render = function () {
    throw Error("This method must be implemented by a subclass.");
};
osapi.container.SiteHolder.prototype.getUrl = function () {
    throw Error("This method must be implemented by a subclass.");
};
osapi.container.GadgetHolder = function (a, b, c) {
    osapi.container.SiteHolder.call(this, a, b, c);
    this.securityToken_ = this.viewParams_ = this.gadgetInfo_ = void 0;
    this.isOaaIframe_ = !1;
    this.onConstructed()
};
osapi.container.GadgetHolder.prototype = new osapi.container.SiteHolder;
osapi.container.GadgetHolder.prototype.relayPath_ = null;
osapi.container.GadgetHolder.prototype.getGadgetInfo = function () {
    return this.gadgetInfo_
};
osapi.container.GadgetHolder.prototype.dispose = function () {
    this.isOaaIframe_ && this.removeOaaContainer_(this.iframeId_);
    osapi.container.SiteHolder.prototype.dispose.call(this);
    this.gadgetInfo_ = null
};
osapi.container.GadgetHolder.prototype.getUrl = function () {
    return this.gadgetInfo_ && this.gadgetInfo_.url
};
osapi.container.GadgetHolder.prototype.getView = function () {
    return this.renderParams_[osapi.container.RenderParam.VIEW]
};
osapi.container.GadgetHolder.prototype.getIframeElement = function () {
    return this.el_.getElementsByTagName("iframe")[0]
};
osapi.container.GadgetHolder.prototype.setSecurityToken = function (a) {
    this.securityToken_ = a;
    return this
};
osapi.container.GadgetHolder.prototype.render = function (a, b, c) {
    this.iframeId_ = osapi.container.GadgetHolder.IFRAME_ID_PREFIX_ + this.site_.getId();
    this.gadgetInfo_ = a;
    this.viewParams_ = b;
    this.renderParams_ = c;
    (this.isOaaIframe_ = this.hasFeature_(a, "pubsub-2")) ? this.doOaaIframeHtml_() : this.doNormalIframeHtml_()
};
osapi.container.GadgetHolder.IFRAME_ID_PREFIX_ = "__gadget_";
osapi.container.GadgetHolder.prototype.doNormalIframeHtml_ = function () {
    var a = this.getIframeUrl_();
    this.el_.innerHTML = this.createIframeHtml(a, {title: this.site_.getTitle()});
    var a = shindig.uri(a), b = shindig.uri().setSchema(a.getSchema()).setAuthority(a.getAuthority()).setPath(this.relayPath_);
    gadgets.rpc.setupReceiver(this.iframeId_, b.toString(), a.getFP("rpctoken"))
};
osapi.container.GadgetHolder.prototype.doOaaIframeHtml_ = function () {
    this.removeOaaContainer_(this.iframeId_);
    var a = this;
    new OpenAjax.hub.IframeContainer(gadgets.pubsub2router.hub, this.iframeId_, {
        Container: {
            onSecurityAlert: function (a, c) {
                gadgets.error(["Security error for container ", a.getClientID(), " : ", c].join(""));
                a.getIframe().src = "about:blank"
            }, onConnect: function (a) {
                gadgets.log(["connected: ", a.getClientID()].join(""))
            }
        }, IframeContainer: {
            parent: this.el_,
            uri: this.getIframeUrl_(),
            tunnelURI: shindig.uri(this.relayPath_).resolve(shindig.uri(window.location.href)),
            iframeAttrs: this.createIframeAttributeMap(this.getIframeUrl_(), {title: this.site_.getTitle()}),
            onGadgetLoad: function () {
                if (a.onLoad_)window[a.onLoad_](a.getUrl(), a.site_.getId())
            }
        }
    })
};
osapi.container.GadgetHolder.prototype.removeOaaContainer_ = function (a) {
    (a = gadgets.pubsub2router.hub.getContainer(a)) && gadgets.pubsub2router.hub.removeContainer(a)
};
osapi.container.GadgetHolder.prototype.hasFeature_ = function (a, b) {
    var c = a[osapi.container.MetadataResponse.MODULE_PREFS];
    return c && (c = c[osapi.container.MetadataResponse.FEATURES]) && c[b] ? !0 : !1
};
osapi.container.GadgetHolder.prototype.getIframeUrl_ = function () {
    var a = shindig.uri(this.gadgetInfo_[osapi.container.MetadataResponse.IFRAME_URLS][this.getView()]);
    a.setQP("debug", this.renderParams_[osapi.container.RenderParam.DEBUG] ? "1" : "0");
    a.setQP("nocache", this.renderParams_[osapi.container.RenderParam.NO_CACHE] ? "1" : "0");
    a.setQP("testmode", this.renderParams_[osapi.container.RenderParam.TEST_MODE] ? "1" : "0");
    a.setQP("view", this.getView());
    if (this.renderParams_[osapi.container.RenderParam.CAJOLE]) {
        var b =
            a.getQP("libs");
        null == b || "" == b ? a.setQP("libs", "caja") : a.setQP("libs", [b, ":caja"].join(""));
        a.setQP("caja", "1")
    }
    this.updateUserPrefParams_(a);
    a.setQP("parent", window.__CONTAINER_URI.getOrigin());
    this.securityToken_ && a.setExistingP("st", this.securityToken_);
    a.setQP("mid", String(this.site_.getModuleId()));
    osapi.container.util.isEmptyJson(this.viewParams_) || (b = gadgets.json.stringify(this.viewParams_), a.setFP("view-params", b));
    "undefined" === typeof a.getFP("rpctoken") && (b = 2147483647 * Math.random() | 0, a.setFP("rpctoken",
        b));
    var b = this.site_.service_.getLanguage(), c = this.site_.service_.getCountry(), e = a.getQP("lang"), d = a.getQP("country");
    -1 != e.indexOf("%") && a.setQP("lang", b);
    -1 != d.indexOf("%") && a.setQP("country", c);
    return a.toString()
};
osapi.container.GadgetHolder.prototype.updateUserPrefParams_ = function (a) {
    var b = this.renderParams_[osapi.container.RenderParam.USER_PREFS];
    if (b)for (var c in b) {
        var e = "up_" + c, d = b[c];
        d instanceof Array && (d = d.join("|"));
        a.setExistingP(e, d)
    }
};
gadgets.config && gadgets.config.register("container", null, function (a) {
    a.container && (osapi.container.GadgetHolder.prototype.relayPath_ = a.container.relayPath)
});
osapi.container.GadgetSite = function (b, c, d) {
    osapi.container.Site.call(this, b, c, d.gadgetEl);
    this.navigateCallback_ = d.navigateCallback;
    this.loadingGadgetEl_ = d.bufferEl;
    this.gadgetOnLoad_ = d.gadgetOnLoad;
    this.moduleId_ = 0;
    this.loadingGadgetHolder_ = this.currentGadgetHolder_ = void 0;
    this.onConstructed()
};
osapi.container.GadgetSite.prototype = new osapi.container.Site;
osapi.container.GadgetSite.prototype.getModuleId = function () {
    return this.moduleId_
};
osapi.container.GadgetSite.prototype.setModuleId_ = function (b, c, d) {
    if (c && this.moduleId_ != c) {
        var a = this;
        b = osapi.container.util.buildTokenRequestUrl(b, c);
        if (!a.service_.getCachedGadgetToken(b)) {
            c = osapi.container.util.newTokenRequest([b]);
            a.service_.getGadgetToken(c, function (c) {
                var e;
                c && c[b] && ((e = c[b][osapi.container.TokenResponse.TOKEN_TTL]) && a.container_.scheduleRefreshTokens_(e), (c = c[b][osapi.container.TokenResponse.MODULE_ID]) || 0 == c) && (a.moduleId_ = c);
                d && d()
            });
            return
        }
    }
    d && d()
};
osapi.container.GadgetSite.prototype.getActiveSiteHolder = function () {
    return this.loadingGadgetHolder_ || this.currentGadgetHolder_
};
osapi.container.GadgetSite.prototype.setTitle = function (b) {
    osapi.container.Site.prototype.setTitle.call(this, b);
    this.loadingGadgetHolder_ && this.currentGadgetHolder_ && this.currentGadgetHolder_.setTitle(b);
    return this
};
osapi.container.GadgetSite.prototype.getFeature = function (b, c) {
    var d = c || this.getActiveSiteHolder().getGadgetInfo();
    return d[osapi.container.MetadataResponse.FEATURES] && d[osapi.container.MetadataResponse.FEATURES][b]
};
osapi.container.GadgetSite.prototype.navigateTo = function (b, c, d, a) {
    var f = osapi.container.util.getCurrentTimeMs(), e = this.service_.getCachedGadgetMetadata(b), h = a || function () {
        };
    a = osapi.container.util.newMetadataRequest([b]);
    var g = this;
    this.service_.getGadgetMetadata(a, function (a) {
        var l = e ? 0 : osapi.container.util.getCurrentTimeMs() - f, k = a[b];
        k.error ? (a = ["Failed to navigate for gadget ", b, "."].join(""), gadgets.warn(a), a = ["Detailed error: ", k.error.code || "", " ", k.error.message || ""].join(""), gadgets.log(a)) :
            g.setModuleId_(b, d[osapi.container.RenderParam.MODULE_ID] || 0, function () {
                g.container_.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_BEFORE_RENDER, k);
                g.render(k, c, d)
            });
        a = {};
        a[osapi.container.NavigateTiming.URL] = b;
        a[osapi.container.NavigateTiming.ID] = g.id_;
        a[osapi.container.NavigateTiming.START] = f;
        a[osapi.container.NavigateTiming.XRT] = l;
        g.onNavigateTo(a);
        h(k)
    })
};
osapi.container.GadgetSite.prototype.onNavigateTo = function (b) {
    if (this.navigateCallback_) {
        var c = window[this.navigateCallback_];
        "function" === typeof c && c(b)
    }
};
osapi.container.GadgetSite.prototype.render = function (b, c, d) {
    var a = null;
    (this.currentGadgetHolder_ ? this.currentGadgetHolder_.getUrl() : null) == b.url && (a = this.currentGadgetHolder_.getView());
    var f = function (a) {
        if ("undefined" !== typeof a && null != a) {
            a = a.aliases || [];
            for (var c = 0; c < a.length; c++)if (b[osapi.container.MetadataResponse.VIEWS][a[c]])return {
                view: a[c],
                viewInfo: b[osapi.container.MetadataResponse.VIEWS][a[c]]
            }
        }
        return null
    }, a = d[osapi.container.RenderParam.VIEW] || c[osapi.container.ViewParam.VIEW] || a, e =
        b[osapi.container.MetadataResponse.VIEWS][a];
    if (a && !e) {
        var h = f(gadgets.config.get("views")[a]);
        h && (a = h.view, e = h.viewInfo)
    }
    !e && d[osapi.container.RenderParam.ALLOW_DEFAULT_VIEW] && a != osapi.container.GadgetSite.DEFAULT_VIEW_ && (a = osapi.container.GadgetSite.DEFAULT_VIEW_, e = b[osapi.container.MetadataResponse.VIEWS][a], !e && (h = f(gadgets.config.get("views")[a]))) && (a = h.view, e = h.viewInfo);
    if (e) {
        this.currentGadgetHolder_ && !this.loadingGadgetEl_ ? (this.loadingGadgetHolder_ = this.currentGadgetHolder_, this.currentGadgetHolder_ =
            null) : this.loadingGadgetHolder_ = new osapi.container.GadgetHolder(this, this.loadingGadgetEl_ || this.el_, this.gadgetOnLoad_);
        var f = {}, g;
        for (g in d)f[g] = d[g];
        f[osapi.container.RenderParam.VIEW] = a;
        f[osapi.container.RenderParam.HEIGHT] = d[osapi.container.RenderParam.HEIGHT] || e[osapi.container.MetadataResponse.PREFERRED_HEIGHT] || b[osapi.container.MetadataResponse.MODULE_PREFS][osapi.container.MetadataResponse.HEIGHT] || String(osapi.container.GadgetSite.DEFAULT_HEIGHT_);
        f[osapi.container.RenderParam.WIDTH] =
            d[osapi.container.RenderParam.WIDTH] || e[osapi.container.MetadataResponse.PREFERRED_WIDTH] || b[osapi.container.MetadataResponse.MODULE_PREFS][osapi.container.MetadataResponse.WIDTH] || String(osapi.container.GadgetSite.DEFAULT_WIDTH_);
        this.updateSecurityToken_(b, f);
        this.loadingGadgetHolder_.render(b, c, f)
    } else gadgets.warn(["Unsupported view ", a, " for gadget ", b.url, "."].join(""))
};
osapi.container.GadgetSite.prototype.onRender = function () {
    this.swapBuffers_();
    this.loadingGadgetHolder_ && (this.currentGadgetHolder_ && this.currentGadgetHolder_.dispose(), this.currentGadgetHolder_ = this.loadingGadgetHolder_, this.loadingGadgetHolder_ = null)
};
osapi.container.GadgetSite.prototype.rpcCall = function (b, c, d) {
    this.currentGadgetHolder_ && gadgets.rpc.call(this.currentGadgetHolder_.getIframeId(), b, c, d)
};
osapi.container.GadgetSite.prototype.updateSecurityToken_ = function (b, c) {
    var d = osapi.container.util.buildTokenRequestUrl(b.url, this.moduleId_);
    (d = this.service_.getCachedGadgetToken(d)) && this.loadingGadgetHolder_.setSecurityToken(d[osapi.container.TokenResponse.TOKEN])
};
osapi.container.GadgetSite.prototype.close = function () {
    this.loadingGadgetHolder_ && this.loadingGadgetHolder_.dispose();
    this.currentGadgetHolder_ && this.currentGadgetHolder_.dispose()
};
osapi.container.GadgetSite.prototype.swapBuffers_ = function () {
    if (this.loadingGadgetEl_) {
        this.loadingGadgetEl_.style.left = "";
        this.loadingGadgetEl_.style.position = "";
        this.el_.style.position = "absolute";
        this.el_.style.left = "-2000px";
        var b = this.el_;
        this.el_ = this.loadingGadgetEl_;
        this.loadingGadgetEl_ = b
    }
};
osapi.container.GadgetSite.RPC_ARG_KEY = "gs";
osapi.container.GadgetSite.DEFAULT_HEIGHT_ = 200;
osapi.container.GadgetSite.DEFAULT_WIDTH_ = 320;
osapi.container.GadgetSite.DEFAULT_VIEW_ = "default";
osapi.container.UrlHolder = function (a, b, c) {
    osapi.container.SiteHolder.call(this, a, b, c);
    this.url_ = void 0;
    this.onConstructed()
};
osapi.container.UrlHolder.prototype = new osapi.container.SiteHolder;
osapi.container.UrlHolder.prototype.dispose = function () {
    osapi.container.SiteHolder.prototype.dispose.call(this);
    this.url_ = null
};
osapi.container.UrlHolder.prototype.getIframeElement = function () {
    return this.el_.firstChild
};
osapi.container.UrlHolder.prototype.getUrl = function () {
    return this.url_
};
osapi.container.UrlHolder.prototype.render = function (a, b) {
    this.iframeId_ = osapi.container.UrlHolder.IFRAME_PREFIX_ + this.site_.getId();
    this.renderParams_ = b;
    this.el_.innerHTML = this.createIframeHtml(this.url_ = a, {scrolling: "auto", title: this.site_.getTitle()})
};
osapi.container.UrlHolder.IFRAME_PREFIX_ = "__url_";
osapi.container.UrlSite = function (c, a, b) {
    osapi.container.Site.call(this, c, a, b[osapi.container.UrlSite.URL_ELEMENT]);
    this.url_ = this.holder_ = void 0;
    this.onConstructed()
};
osapi.container.UrlSite.prototype = new osapi.container.Site;
osapi.container.UrlSite.prototype.getActiveSiteHolder = function () {
    return this.holder_
};
osapi.container.UrlSite.prototype.render = function (c, a) {
    this.holder_ = new osapi.container.UrlHolder(this, this.el_);
    var b = {}, d;
    for (d in a)b[d] = a[d];
    this.holder_.render(c, b)
};
osapi.container.UrlSite.URL_ELEMENT = "urlEl";
osapi.container.Service = function (a) {
    this.container_ = a;
    a = this.config_ = a.config_ || {};
    var b = ((gadgets.config.get("osapi") || {}).endPoints || [window.__API_URI.getOrigin() + "/rpc"])[0], b = /^([^\/]*\/\/[^\/]+)(.*)$/.exec(b);
    this.apiHost_ = String(osapi.container.util.getSafeJsonValue(a, osapi.container.ServiceConfig.API_HOST, b[1]));
    this.apiPath_ = String(osapi.container.util.getSafeJsonValue(a, osapi.container.ServiceConfig.API_PATH, b[2]));
    this.cachedMetadatas_ = {};
    this.cachedTokens_ = {};
    a.GET_LANGUAGE && (this.getLanguage =
        a.GET_LANGUAGE);
    a.GET_COUNTRY && (this.getCountry = a.GET_COUNTRY);
    this.registerOsapiServices();
    this.onConstructed(a)
};
osapi.container.Service.prototype.onConstructed = function (a) {
};
osapi.container.Service.prototype.getGadgetMetadata = function (a, b) {
    var f = b || function () {
        }, d = osapi.container.util.toArrayOfJsonKeys(this.getUncachedDataByRequest_(this.cachedMetadatas_, a)), c = this.getCachedDataByRequest_(this.cachedMetadatas_, a);
    if (0 == d.length)f(c); else {
        var g = this;
        a.ids = d;
        a.language = this.getLanguage();
        a.country = this.getCountry();
        this.updateContainerSecurityToken(function (b) {
            if (b) {
                for (var e = 0; e < a.ids.length; e++)c[a.ids[e]] = {error: b};
                f(c)
            } else osapi.gadgets.metadata(a).execute(function (b) {
                if (b.error)for (var e =
                    0; e < a.ids.length; e++) {
                    var d = a.ids[e];
                    c[d] = {error: b.error}
                } else for (d in e = osapi.container.util.getCurrentTimeMs(), b) {
                    var h = b[d];
                    g.updateResponse_(h, d, e);
                    g.cachedMetadatas_[d] = h;
                    c[d] = h
                }
                f(c)
            })
        })
    }
};
osapi.container.Service.prototype.addGadgetMetadatas = function (a, b) {
    this.addToCache_(a, b, this.cachedMetadatas_)
};
osapi.container.Service.prototype.addGadgetTokens = function (a, b) {
    this.addToCache_(a, b, this.cachedTokens_)
};
osapi.container.Service.prototype.addToCache_ = function (a, b, f) {
    var d = osapi.container.util.getCurrentTimeMs(), c;
    for (c in a) {
        var g = a[c];
        this.updateResponse_(g, c, d, b);
        f[c] = g
    }
};
osapi.container.Service.prototype.updateResponse_ = function (a, b, f, d) {
    a[osapi.container.MetadataParam.URL] = b;
    a[osapi.container.MetadataParam.LOCAL_EXPIRE_TIME] = a[osapi.container.MetadataResponse.EXPIRE_TIME_MS] - (null == d ? a[osapi.container.MetadataResponse.RESPONSE_TIME_MS] : d) + f
};
osapi.container.Service.prototype.getGadgetToken = function (a, b) {
    var f = b || function () {
        }, d = this, c = function (b) {
        var c = {};
        if (b.error)for (var e = 0; e < a.ids.length; e++)c[a.ids[e]] = {error: b.error}; else for (e in b) {
            var m = osapi.container.util.buildTokenRequestUrl(e, b[e][osapi.container.TokenResponse.MODULE_ID]);
            d.cachedTokens_[m] = b[e];
            c[e] = b[e]
        }
        f(c)
    };
    d.updateContainerSecurityToken(function (b) {
        if (b)c({error: b}); else if (d.config_[osapi.container.ContainerConfig.GET_GADGET_TOKEN])d.config_[osapi.container.ContainerConfig.GET_GADGET_TOKEN](a,
            c); else osapi.gadgets.token(a).execute(c)
    })
};
osapi.container.Service.prototype.getCachedGadgetMetadata = function (a) {
    return this.cachedMetadatas_[a]
};
osapi.container.Service.prototype.getCachedGadgetToken = function (a) {
    return this.cachedTokens_[a]
};
osapi.container.Service.prototype.uncacheStaleGadgetMetadataExcept = function (a) {
    for (var b in this.cachedMetadatas_)"undefined" === typeof a[b] && this.cachedMetadatas_[b][osapi.container.MetadataParam.LOCAL_EXPIRE_TIME] < osapi.container.util.getCurrentTimeMs() && delete this.cachedMetadatas_[b]
};
osapi.container.Service.prototype.registerOsapiServices = function () {
    var a = this.apiHost_ + this.apiPath_, b = {"gadgets.rpc": ["container.listMethods"]};
    b[a] = ["gadgets.metadata", "gadgets.token"];
    gadgets.config.init({osapi: {endPoints: [a]}, "osapi.services": b})
};
osapi.container.Service.prototype.getCachedDataByRequest_ = function (a, b) {
    return this.filterCachedDataByRequest_(a, b, function (a) {
        return "undefined" !== typeof a
    })
};
osapi.container.Service.prototype.getUncachedDataByRequest_ = function (a, b) {
    return this.filterCachedDataByRequest_(a, b, function (a) {
        return "undefined" === typeof a
    })
};
osapi.container.Service.prototype.filterCachedDataByRequest_ = function (a, b, f) {
    for (var d = {}, c = 0; c < b.ids.length; c++) {
        var g = b.ids[c], h = a[g];
        f(h) && (d[g] = h)
    }
    return d
};
osapi.container.Service.prototype.getLocale_ = function () {
    var a = window.navigator;
    return a.userLanguage || a.systemLanguage || a.language
};
osapi.container.Service.prototype.getLanguage = function () {
    try {
        return this.getLocale_().split("-")[0] || "ALL"
    } catch (a) {
        return "ALL"
    }
};
osapi.container.Service.prototype.getCountry = function () {
    try {
        return this.getLocale_().split("-")[1] || "ALL"
    } catch (a) {
        return "ALL"
    }
};
(function () {
    function a(a, b) {
        for (; a.length;)a.shift().call(null, b)
    }

    function b(e) {
        var m = this;
        f && (clearTimeout(f), f = 0);
        (e = e || this.config_[osapi.container.ContainerConfig.GET_CONTAINER_TOKEN]) ? c || (c = !0, e(function (e, l, k) {
            c = !1;
            (g = "number" == typeof l ? 800 * l : g) && (f = setTimeout(gadgets.util.makeClosure(m, b, null), g));
            e ? (shindig.auth.updateSecurityToken(e), d = osapi.container.util.getCurrentTimeMs(), a(h)) : k && a(h, k)
        })) : (c = !1, a(h))
    }

    var f, d, c, g = 144E4, h = [];
    osapi.container.Service.prototype.updateContainerSecurityToken =
        function (a, f, n) {
            var l = osapi.container.util.getCurrentTimeMs(), k = "boolean" != typeof f && f || void 0;
            f = "boolean" == typeof f && f;
            g && (c || k || !d || l > d + g) ? (!d || l > d + 95 * g / 80 || !a ? a && h.push(a) : a(), k ? b.call(this, function (a) {
                a(k, n)
            }) : c || f || b.call(this)) : a && a()
        }
})();
osapi.container.Container = function (a) {
    a = this.config_ = a || {};
    this.gadgetLifecycleCallbacks_ = {};
    this.preloadedGadgetUrls_ = {};
    this.sites_ = {};
    this.allowDefaultView_ = Boolean(osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.ALLOW_DEFAULT_VIEW, !0));
    this.renderCajole_ = Boolean(osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.RENDER_CAJOLE, !1));
    this.renderDebugParam_ = String(osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.RENDER_DEBUG_PARAM,
        osapi.container.ContainerConfig.RENDER_DEBUG));
    var b = window.__CONTAINER_URI.getQP(this.renderDebugParam_);
    this.renderDebug_ = "undefined" === typeof b ? Boolean(osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.RENDER_DEBUG, !1)) : "1" === b;
    this.renderTest_ = Boolean(osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.RENDER_TEST, !1));
    this.tokenRefreshInterval_ = Number(osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.TOKEN_REFRESH_INTERVAL, 0));
    this.lastRefresh_ =
        0;
    this.navigateCallback_ = String(osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.NAVIGATE_CALLBACK, null));
    this.service_ = new osapi.container.Service(this);
    this.tokenRefreshTimer_ = null;
    var c = this, d = {};
    window[osapi.container.CallbackType.GADGET_ON_LOAD] = function (a, b) {
        d.hasOwnProperty(b) || (c.getSiteById(b).onRender(), c.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_RENDER, a, b), d[b] = !0)
    };
    this.initializeMixins_();
    this.setupRpcArbitrator_(a);
    this.preloadCaches(a);
    this.registerRpcServices_();
    this.onConstructed(a)
};
osapi.container.Container.prototype.newGadgetSite = function (a, b) {
    var c = new osapi.container.GadgetSite(this, this.service_, {
        navigateCallback: this.navigateCallback_,
        gadgetEl: a,
        bufferEl: b || null,
        gadgetOnLoad: osapi.container.CallbackType.GADGET_ON_LOAD
    });
    return this.sites_[c.getId()] = c
};
osapi.container.Container.prototype.navigateGadget = function (a, b, c, d, e) {
    var f = e || function () {
        };
    e = osapi.container.ContainerConfig;
    var g = osapi.container.RenderParam;
    this.allowDefaultView_ && (d[g.ALLOW_DEFAULT_VIEW] = !0);
    this.renderCajole_ && (d[g.CAJOLE] = !0);
    this.renderDebug_ && (d[g.NO_CACHE] = !0, d[g.DEBUG] = !0);
    this.renderTest_ && (d[g.TEST_MODE] = !0);
    this.refreshService_();
    var h = this, k = function (e) {
        d[g.USER_PREFS] = e;
        h.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_BEFORE_NAVIGATE, b, a.getId());
        a.navigateTo(b,
            c, d, function (c) {
                c.error ? gadgets.warn(["Failed to possibly schedule token refresh for gadget ", b, "."].join("")) : c[osapi.container.MetadataResponse.NEEDS_TOKEN_REFRESH] && h.scheduleRefreshTokens_(c[osapi.container.MetadataResponse.TOKEN_TTL]);
                h.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_NAVIGATED, a);
                f(c)
            })
    };
    if (this.config_[e.GET_PREFERENCES] && !d[g.USER_PREFS])this.config_[e.GET_PREFERENCES](a.getId(), b, k); else k(d[g.USER_PREFS])
};
osapi.container.Container.prototype.closeGadget = function (a) {
    var b = a.getId();
    this.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_BEFORE_CLOSE, a);
    a.close();
    this.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_CLOSED, a);
    delete this.sites_[b];
    a instanceof osapi.container.GadgetSite && this.unscheduleRefreshTokens_()
};
osapi.container.Container.prototype.addGadgetLifecycleCallback = function (a, b) {
    return this.gadgetLifecycleCallbacks_[a] ? !1 : (this.gadgetLifecycleCallbacks_[a] = b, !0)
};
osapi.container.Container.prototype.removeGadgetLifecycleCallback = function (a) {
    delete this.gadgetLifecycleCallbacks_[a]
};
osapi.container.Container.prototype.preloadGadget = function (a, b) {
    this.preloadGadgets([a], b)
};
osapi.container.Container.prototype.preloadGadgets = function (a, b) {
    var c = b || function () {
        }, d = osapi.container.util.newMetadataRequest(a), e = this;
    this.refreshService_();
    this.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_BEFORE_PRELOAD, a);
    this.service_.getGadgetMetadata(d, function (a) {
        e.addPreloadGadgets_(a);
        e.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_PRELOADED, a);
        c(a)
    })
};
osapi.container.Container.prototype.unloadGadget = function (a) {
    this.unloadGadgets([a])
};
osapi.container.Container.prototype.unloadGadgets = function (a) {
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        this.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_BEFORE_UNLOAD, c);
        delete this.preloadedGadgetUrls_[c];
        this.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_UNLOADED, c)
    }
};
osapi.container.Container.prototype.getGadgetMetadata = function (a, b) {
    var c = osapi.container.util.newMetadataRequest([a]);
    this.refreshService_();
    this.service_.getGadgetMetadata(c, b)
};
osapi.container.Container.prototype.rpcRegister = function (a, b) {
    var c = this;
    return gadgets.rpc.register(a, function () {
        this[osapi.container.GadgetSite.RPC_ARG_KEY] = c.getGadgetSiteByIframeId_(this.f);
        for (var a = [this], e = 0; e < arguments.length; ++e)a.push(arguments[e]);
        return b.apply(c, a)
    })
};
osapi.container.Container.prototype.onConstructed = function (a) {
};
osapi.container.Container.addMixin = function (a, b) {
    var c = osapi.container.Container.prototype.mixins_;
    if (c[a]) {
        var d = c[a];
        c[a] = function (a) {
            d.call(this, a);
            return b.call(this, a)
        }
    } else osapi.container.Container.prototype.mixinsOrder_.push(a), c[a] = b
};
osapi.container.Container.prototype.mixins_ = {};
osapi.container.Container.prototype.mixinsOrder_ = [];
osapi.container.Container.prototype.initializeMixins_ = function () {
    for (var a = osapi.container.Container.prototype.mixins_, b = osapi.container.Container.prototype.mixinsOrder_, c = 0; c < b.length; c++) {
        var d = b[c];
        this[d] = new a[d](this)
    }
};
osapi.container.Container.prototype.addPreloadGadgets_ = function (a, b) {
    var c = b || {}, d;
    for (d in a)if (a[d].error) {
        var e = ["Failed to preload gadget ", d, "."].join("");
        gadgets.warn(e);
        e = ["Detailed error: ", a[d].error.code || "", " ", a[d].error.message || ""].join("");
        gadgets.log(e)
    } else this.addPreloadedGadgetUrl_(d), a[d][osapi.container.MetadataResponse.NEEDS_TOKEN_REFRESH] && this.scheduleRefreshTokens_(c[d] ? c[d][osapi.container.TokenResponse.TOKEN_TTL] : a[d][osapi.container.MetadataResponse.TOKEN_TTL])
};
osapi.container.Container.prototype.preloadCaches = function (a) {
    var b = osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.PRELOAD_METADATAS, {}), c = osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.PRELOAD_TOKENS, {});
    a = osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.PRELOAD_REF_TIME, null);
    var d = [], e;
    for (e in b)b.hasOwnProperty(e) && d.push(e);
    this.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_BEFORE_PRELOAD, d);
    this.service_.addGadgetMetadatas(b,
        a);
    this.service_.addGadgetTokens(c, a);
    this.addPreloadGadgets_(b, c);
    this.applyLifecycleCallbacks_(osapi.container.CallbackType.ON_PRELOADED, b)
};
osapi.container.Container.prototype.refreshService_ = function () {
    var a = this.getActiveGadgetUrls_();
    this.service_.uncacheStaleGadgetMetadataExcept(a)
};
osapi.container.Container.prototype.getGadgetSiteByIframeId_ = function (a) {
    for (var b in this.sites_) {
        var c = this.sites_[b], d = c.getActiveSiteHolder();
        if (d && d.getIframeId() === a)return c
    }
    return null
};
osapi.container.Container.prototype.getSiteById = function (a) {
    return this.sites_[a]
};
osapi.container.Container.prototype.updateContainerSecurityToken = function (a, b, c) {
    this.service_.updateContainerSecurityToken(a, b, c)
};
osapi.container.Container.prototype.scheduleRefreshTokens_ = function (a) {
    var b = this, c = this.tokenRefreshInterval_, d = a ? this.setRefreshTokenInterval_(1E3 * a) : c, e = function () {
        function a(c) {
            c ? setTimeout(gadgets.util.makeClosure(b, b.updateContainerSecurityToken, a, !0), 1) : (b.lastRefresh_ = osapi.container.util.getCurrentTimeMs(), b.tokenRefreshTimer_ = setTimeout(e, d), b.refreshTokens_())
        }

        b.updateContainerSecurityToken(a)
    };
    !this.isRefreshTokensEnabled_() || this.tokenRefreshTimer_ && d == c || (a = osapi.container.util.getCurrentTimeMs(),
        this.tokenRefreshTimer_ ? (c = (this.lastRefresh_ || 0) + c, c < a && (c = a + d, d = 1), c > a + d && (clearTimeout(this.tokenRefreshTimer_), this.tokenRefreshTimer_ = setTimeout(e, d))) : (this.lastRefresh_ = a, this.tokenRefreshTimer_ = setTimeout(e, d)))
};
osapi.container.Container.prototype.unscheduleRefreshTokens_ = function () {
    this.tokenRefreshTimer_ && 0 >= this.getTokenRefreshableGadgetUrls_().length && (clearTimeout(this.tokenRefreshTimer_), this.tokenRefreshTimer_ = null)
};
osapi.container.Container.prototype.isRefreshTokensEnabled_ = function () {
    return 0 < this.tokenRefreshInterval_
};
osapi.container.Container.prototype.setRefreshTokenInterval_ = function (a) {
    if (a) {
        a *= 0.8;
        var b = this.tokenRefreshInterval_;
        return 0 > b ? b : this.tokenRefreshInterval_ = 0 == b ? a : Math.min(b, a)
    }
};
osapi.container.Container.prototype.registerRpcServices_ = function () {
    var a = this;
    this.rpcRegister("resize_iframe", function (a, c) {
        var d = a[osapi.container.GadgetSite.RPC_ARG_KEY];
        d && d.setHeight(c)
    });
    this.rpcRegister("resize_iframe_width", function (a, c) {
        var d = a[osapi.container.GadgetSite.RPC_ARG_KEY];
        d && d.setWidth(c);
        return !0
    });
    this.rpcRegister("set_pref", function (b, c, d) {
        var e = b[osapi.container.GadgetSite.RPC_ARG_KEY], f = a.config_[osapi.container.ContainerConfig.SET_PREFERENCES];
        if (e && f) {
            for (var g = {}, h = 2,
                     k = arguments.length; h < k; h += 2)g[arguments[h]] = arguments[h + 1];
            f(e.getId(), e.getActiveSiteHolder().getUrl(), g)
        }
    })
};
osapi.container.Container.prototype.setupRpcArbitrator_ = function (a) {
    var b = gadgets.config.get("container");
    if ("undefined" !== typeof b.enableRpcArbitration && b.enableRpcArbitration) {
        a = osapi.container.util.getSafeJsonValue(a, osapi.container.ContainerConfig.RPC_ARBITRATOR, null);
        if (!a) {
            var c = this;
            a = function (a, b) {
                var f = c.getGadgetSiteByIframeId_(b);
                if (f && f.getActiveSiteHolder() && (f = c.service_.getCachedGadgetMetadata(f.getActiveSiteHolder().getUrl()), !f.error && f.rpcServiceIds))for (var g = 0, h; h = f.rpcServiceIds[g]; g++)if (h ==
                    a)return !0;
                gadgets.warn("RPC call to " + a + " was not allowed.");
                return !1
            }
        }
        gadgets.rpc.config({arbitrator: a})
    }
};
osapi.container.Container.prototype.addPreloadedGadgetUrl_ = function (a) {
    this.preloadedGadgetUrls_[a] = null
};
osapi.container.Container.prototype.getTokenRefreshableGadgetUrls_ = function () {
    var a = {}, b;
    for (b in this.getActiveGadgetUrls_())this.service_.getCachedGadgetMetadata(b)[osapi.container.MetadataResponse.NEEDS_TOKEN_REFRESH] && (a[b] = 1);
    for (var c in this.sites_) {
        var d = this.sites_[c];
        d instanceof osapi.container.GadgetSite && (b = d.getActiveSiteHolder()) && (b = b.getUrl(), mid = d.getModuleId(), a[b] && (a[osapi.container.util.buildTokenRequestUrl(b, mid)] = 1))
    }
    return osapi.container.util.toArrayOfJsonKeys(a)
};
osapi.container.Container.prototype.getActiveGadgetUrls_ = function () {
    return osapi.container.util.mergeJsons(this.getNavigatedGadgetUrls_(), this.preloadedGadgetUrls_)
};
osapi.container.Container.prototype.getNavigatedGadgetUrls_ = function () {
    var a = {}, b;
    for (b in this.sites_) {
        var c = this.sites_[b];
        c instanceof osapi.container.GadgetSite && (c = c.getActiveSiteHolder()) && (a[c.getUrl()] = 1)
    }
    return a
};
osapi.container.Container.prototype.refreshTokens_ = function () {
    var a = this.getTokenRefreshableGadgetUrls_(), a = osapi.container.util.newTokenRequest(a), b = this;
    this.service_.getGadgetToken(a, function (a) {
        for (var d in b.sites_) {
            var e = b.sites_[d];
            if (e instanceof osapi.container.GadgetSite) {
                var f = e.getActiveSiteHolder();
                if (f && b.service_.getCachedGadgetMetadata(f.getUrl())[osapi.container.MetadataResponse.NEEDS_TOKEN_REFRESH]) {
                    var e = e.getModuleId(), e = osapi.container.util.buildTokenRequestUrl(f.getUrl(), e),
                        g = a[e];
                    g.error ? gadgets.warn(["Failed to get token for gadget ", e, "."].join("")) : gadgets.rpc.call(f.getIframeId(), "update_security_token", null, g[osapi.container.TokenResponse.TOKEN])
                }
            }
        }
    })
};
osapi.container.Container.prototype.invalidateAllTokens_ = function () {
    for (var a in this.sites_) {
        var b = this.sites_[a];
        b instanceof osapi.container.GadgetSite && (b = b.getActiveSiteHolder(), this.service_.getCachedGadgetMetadata(b.getUrl())[osapi.container.MetadataResponse.NEEDS_TOKEN_REFRESH] = !0)
    }
};
osapi.container.Container.prototype.forceRefreshAllTokens = function () {
    this.invalidateAllTokens_();
    this.refreshTokens_()
};
osapi.container.Container.prototype.applyLifecycleCallbacks_ = function (a) {
    var b = Array.prototype.slice.call(arguments, 1);
    for (name in this.gadgetLifecycleCallbacks_) {
        var c = this.gadgetLifecycleCallbacks_[name][a];
        c && c.apply(null, b)
    }
};
osapi.container.Container.prototype.newUrlSite = function (a) {
    var b = {};
    b[osapi.container.UrlSite.URL_ELEMENT] = a;
    a = new osapi.container.UrlSite(this, this.service_, b);
    return this.sites_[a.getId()] = a
};
osapi.container.Container.prototype.navigateUrl = function (a, b, c) {
    a.render(b, c);
    return a
};
gadgets.config.register("container", null, function (a) {
    a = a.container.jsPath || null;
    window.__CONTAINER_URI = shindig.uri(window.location.href);
    var b = window.__API_URI = null;
    if (window.__CONTAINER_SCRIPT_ID)b = document.getElementById(window.__CONTAINER_SCRIPT_ID); else for (var c = document.getElementsByTagName("script"), d = 0; c && d < c.length; d++) {
        var e = c[d].src, f = null != a && e && e.indexOf(a) || -1;
        if (-1 != f && /.*container.*[.]js.*[?&]c=1(#|&|$).*/.test(e.substring(f + a.length))) {
            b = c[d];
            break
        }
    }
    b && (window.__API_URI = shindig.uri(b.src),
        window.__API_URI.resolve(window.__CONTAINER_URI));
    window.__CONTAINER = window.__API_URI ? window.__API_URI.getQP("container") : "default"
}, !1);
osapi.container.Container.addMixin("views", function (b) {
    var f = this;
    b.rpcRegister("gadgets.views.close", function (a, d) {
        var e = b.getGadgetSiteByIframeId_(a.f), c = "undefined" != typeof d && null != d ? b.getSiteById(d) : e;
        !c || c != e && c.ownerId_ != a.f || f.destroyElement(c)
    });
    b.rpcRegister("gadgets.window.getContainerDimensions", function (a) {
        a = document.documentElement;
        return {width: a ? a.clientWidth : -1, height: a ? a.clientHeight : -1}
    });
    this.destroyElement = function (a) {
        console.log("container needs to define destroyElement function")
    }
});
osapi.container.Container.addMixin("views", function (a) {
    this.resultCallbacks_ = {};
    this.returnValues_ = {};
    var c = this, f = {};
    f[osapi.container.CallbackType.ON_BEFORE_CLOSE] = function (d) {
        var b = d.getId(), e = c.returnValues_[b], a = c.resultCallbacks_[b];
        "undefined" !== typeof a && d.ownerId_ && gadgets.rpc.call(d.ownerId_, "gadgets.views.deliverResult", null, a, e);
        delete c.returnValues_[b];
        delete c.resultCallbacks_[b]
    };
    a.addGadgetLifecycleCallback("open-views", f);
    a.rpcRegister("gadgets.views.setReturnValue", function (d, b) {
        var e =
            a.getGadgetSiteByIframeId_(d.f);
        e && (c.returnValues_[e.getId()] = b)
    })
});
osapi.container.ee = {};
osapi.container.ee.RenderParam = {
    GADGET_RENDER_PARAMS: "gadgetRenderParams",
    GADGET_VIEW_PARAMS: "gadgetViewParams",
    URL_RENDER_PARAMS: "urlRenderParams",
    DATA_MODEL: "eeDataModel",
    EMBEDDED: "embedded"
};
osapi.container.ee.DataModel = {
    CONTEXT: "context",
    GADGET: "gadget",
    URL: "url",
    PREVIEW_IMAGE: "previewImage",
    PREFERRED_EXPERIENCE: "preferredExperience"
};
osapi.container.ee.PreferredExperience = {
    TARGET: "target",
    DISPLAY: "display",
    TYPE: "type",
    VIEW: "view",
    VIEW_TARGET: "viewTarget"
};
osapi.container.ee.Context = {ASSOCIATED_CONTEXT: "associatedContext", OPENSOCIAL: "openSocial"};
osapi.container.ee.AssociatedContext = {ID: "id", TYPE: "type", OBJECT_REFERENCE: "objectReference"};
osapi.container.ee.TargetType = {GADGET: "gadget", URL: "url"};
osapi.container.ee.DisplayType = {IMAGE: "image", TEXT: "text"};
osapi.container.ee.ContainerConfig = {GET_EE_NAVIGATION_TYPE: "GET_EE_NAVIGATION_TYPE"};
(function () {
    osapi.container.Container.addMixin("ee", function (e) {
        function v(b, a, h, f, l, p) {
            var c = h[osapi.container.ee.RenderParam.GADGET_VIEW_PARAMS] || {}, q = h[osapi.container.ee.RenderParam.GADGET_RENDER_PARAMS] || {};
            q[osapi.container.RenderParam.VIEW] = osapi.container.ee.RenderParam.EMBEDDED;
            var d = a[g.PREFERRED_EXPERIENCE];
            d && (d = d[k.TARGET]) && d[k.TYPE] === w.GADGET && d[k.VIEW] && (q[osapi.container.RenderParam.VIEW] = d[k.VIEW]);
            if (l) {
                var d = a[g.CONTEXT], m = !0;
                d ? "object" != typeof d && (m = !1) : d = {};
                if (m) {
                    m = {};
                    m[r.ASSOCIATED_CONTEXT] =
                    {};
                    for (var s in l)l.hasOwnProperty(s) && (m[s] = l[s]);
                    d[r.OPENSOCIAL] = m;
                    a[g.CONTEXT] = d
                }
            }
            q[osapi.container.ee.RenderParam.DATA_MODEL] = a;
            var t = e.newGadgetSite(b, p), n = a[g.GADGET];
            e.preloadGadget(n, function (d) {
                !d[n] || d[n].error ? null != a[g.URL] ? u(b, a, h, f) : null != f && f(t, d[n] || {error: d}) : e.navigateGadget(t, n, c, q, function (a) {
                    null != f && f(t, a)
                })
            })
        }

        function u(b, a, h, f) {
            h = h[osapi.container.ee.RenderParam.URL_RENDER_PARAMS] || {};
            b = e.newUrlSite(b);
            a = e.navigateUrl(b, a[g.URL], h);
            f && f(a, null)
        }

        var g = osapi.container.ee.DataModel,
            k = osapi.container.ee.PreferredExperience, w = osapi.container.ee.TargetType, r = osapi.container.ee.Context, p = osapi.container.ee.ContainerConfig;
        e.rpcRegister("ee_gadget_rendered", function (b) {
            return (b = b.gs.getActiveSiteHolder().renderParams_.eeDataModel) ? b[g.CONTEXT] : null
        });
        return {
            navigate: function (b, a, h, f, l, r) {
                var c = null;
                if (e.config_ && e.config_[p.GET_EE_NAVIGATION_TYPE] && "function" === typeof e.config_[p.GET_EE_NAVIGATION_TYPE])c = e.config_[p.GET_EE_NAVIGATION_TYPE].call(e, a); else a:{
                    if (a[g.PREFERRED_EXPERIENCE] &&
                        (c = a[g.PREFERRED_EXPERIENCE], c[k.TARGET] && (c = c[k.TARGET]) && c[k.TYPE] && (c = c[k.TYPE], osapi.container.ee.TargetType.URL === c && "undefined" !== typeof a.url || osapi.container.ee.TargetType.GADGET === c && "undefined" !== typeof a.gadget)))break a;
                    c = null
                }
                null === c && (a[g.GADGET] ? c = osapi.container.ee.TargetType.GADGET : a[g.URL] && (c = osapi.container.ee.TargetType.URL));
                c === osapi.container.ee.TargetType.GADGET ? v(b, a, h, f, l, r) : c === osapi.container.ee.TargetType.URL && u(b, a, h, f)
            }, close: function (b) {
                b instanceof osapi.container.GadgetSite &&
                e.closeGadget(b);
                b instanceof osapi.container.UrlSite && b.close()
            }
        }
    })
})();
gadgets.json.xml = function () {
    function l(d, c) {
        for (var f = 0; f < d.length; f++) {
            var a = d[f];
            if (a.nodeType == DOM_TEXT_NODE) {
                var b = a.nodeName, e = c[b];
                c[b] = null != e ? h(e, a.nodeValue) : a.nodeValue
            } else if (0 == a.childNodes.length)if (null != a.attributes && 0 != a.attributes.length)if (b = a, a = c, e = a[b.nodeName], null == e)a[b.nodeName] = {}, k(b.attributes, a[b.nodeName]); else {
                var g = {};
                k(b.attributes, g);
                a[b.nodeName] = h(e, g)
            } else c[a.nodeName] = null; else 1 != a.childNodes.length || a.firstChild.nodeType != DOM_TEXT_NODE || null != a.attributes &&
            0 != a.attributes.length ? (b = c, e = b[a.nodeName], null == e ? (b[a.nodeName] = {}, null != a.attributes && 0 != a.attributes.length && k(a.attributes, b[a.nodeName]), l(a.childNodes, b[a.nodeName])) : (g = {}, null != a.attributes && 0 != a.attributes.length && k(a.attributes, g), l(a.childNodes, g), b[a.nodeName] = h(e, g))) : (b = a.nodeName, a = a.firstChild, e = c[b], c[b] = null != e ? h(e, a.nodeValue) : a.nodeValue)
        }
    }

    function h(d, c) {
        return d instanceof Array ? (d[d.length] = c, d) : [d, c]
    }

    function k(d, c) {
        for (var f = null, a = 0; a < d.length; a++)f = d[a], c["@" + f.nodeName] =
            f.nodeValue
    }

    return {
        convertXmlToJson: function (d) {
            var c = {};
            l(d.childNodes, c);
            return c
        }
    }
}();
var opensocial = opensocial || {};
opensocial.xmlutil = opensocial.xmlutil || {};
opensocial.xmlutil.parser_ = null;
opensocial.xmlutil.parseXML = function (b) {
    if ("undefined" != typeof DOMParser) {
        opensocial.xmlutil.parser_ = opensocial.xmlutil.parser_ || new DOMParser;
        var a = opensocial.xmlutil.parser_.parseFromString(b, "text/xml");
        if (a.firstChild && "parsererror" == a.firstChild.tagName)throw Error(a.firstChild.firstChild.nodeValue);
        return a
    }
    if ("undefined" != typeof ActiveXObject) {
        a = new ActiveXObject("MSXML2.DomDocument");
        a.validateOnParse = !1;
        a.loadXML(b);
        if (a.parseError && a.parseError.errorCode)throw Error(a.parseError.reason);
        return a
    }
    throw Error("No XML parser found in this browser.");
};
opensocial.xmlutil.NSMAP = {os: "http://opensocial.org/"};
opensocial.xmlutil.getRequiredNamespaces = function (b, a) {
    var c = a ? opensocial.xmlutil.getNamespaceDeclarations_(a) : {}, d;
    for (d in opensocial.xmlutil.NSMAP)opensocial.xmlutil.NSMAP.hasOwnProperty(d) && !c.hasOwnProperty(d) && 0 <= b.indexOf("\x3c" + d + ":") && 0 > b.indexOf("xmlns:" + d + ":") && (c[d] = opensocial.xmlutil.NSMAP[d]);
    return opensocial.xmlutil.serializeNamespaces_(c)
};
opensocial.xmlutil.serializeNamespaces_ = function (b) {
    var a = [], c;
    for (c in b)b.hasOwnProperty(c) && a.push(" xmlns:", c, '\x3d"', b[c], '"');
    return a.join("")
};
opensocial.xmlutil.getNamespaceDeclarations_ = function (b) {
    for (var a = {}, c = 0; c < b.attributes.length; c++) {
        var d = b.attributes[c].nodeName;
        "xmlns:" == d.substring(0, 6) && (a[d.substring(6, d.length)] = b.getAttribute(d))
    }
    return a
};
opensocial.xmlutil.ENTITIES = '\x3c!ENTITY nbsp "\x26#160;"\x3e';
opensocial.xmlutil.prepareXML = function (b, a) {
    var c = opensocial.xmlutil.getRequiredNamespaces(b, a);
    return "\x3c!DOCTYPE root [" + opensocial.xmlutil.ENTITIES + ']\x3e\x3croot xml:space\x3d"preserve"' + c + "\x3e" + b + "\x3c/root\x3e"
};
osapi.container.Container.addMixin("views", function (f) {
    var l = this;
    f.rpcRegister("gadgets.views.openEmbeddedExperience", function (d, p, c, a) {
        var k = d.callback, m = d.f, b = c.gadget;
        if ("string" == typeof c)if ((d = /^<(embed)>/i.exec(c)) && d[1])try {
            var g = gadgets.json.xml.convertXmlToJson(opensocial.xmlutil.parseXML(c));
            c = g && g[d[1]] || c
        } catch (s) {
        } else try {
            c = (g = gadgets.json.parse(c)) || c
        } catch (t) {
        }
        var e = function (h) {
            function d(h) {
                var b = {};
                b[osapi.container.RenderParam.VIEW] = osapi.container.ee.RenderParam.EMBEDDED;
                b[osapi.container.RenderParam.WIDTH] =
                    "100%";
                b[osapi.container.RenderParam.HEIGHT] = "100%";
                var a = {};
                a[osapi.container.RenderParam.WIDTH] = "100%";
                a[osapi.container.RenderParam.HEIGHT] = "100%";
                var e = {};
                e[osapi.container.ee.RenderParam.GADGET_RENDER_PARAMS] = b;
                e[osapi.container.ee.RenderParam.URL_RENDER_PARAMS] = a;
                e[osapi.container.ee.RenderParam.GADGET_VIEW_PARAMS] = g;
                f.ee.navigate(h, c, e, function (b, c) {
                    b.ownerId_ = m;
                    c && (l.resultCallbacks_[b.getId()] = p);
                    k && k([b.getId(), c])
                }, q)
            }

            var b = "", g = {}, e;
            a && (a.viewTarget && (b = a.viewTarget), a.viewParams && (g =
                a.viewParams), a.coordinates && (e = a.coordinates));
            var n = f.getGadgetSiteByIframeId_(m), r = n.getActiveSiteHolder().getIframeElement(), q = l.getContainerAssociatedContext(c, h);
            (h = l.createElementForEmbeddedExperience(r, h, b, e, n, d)) && d(h)
        };
        b ? f.preloadGadget(b, function (a) {
            a[b] && !a[b].error || c.url ? e(a[b]) : null != k && k([null, a[b] || {error: a}])
        }) : e()
    });
    this.createElementForEmbeddedExperience = function (d, f, c, a, k, l) {
        console.log("container needs to define createElementForEmbeddedExperience function")
    };
    this.getContainerAssociatedContext =
        function (d, f) {
            return null
        }
});
osapi.container.Container.addMixin("views", function (e) {
    var k = this;
    e.rpcRegister("gadgets.views.openGadget", function (d, q, a) {
        var f = d.callback, r = d.f, c = "", b = e.getGadgetSiteByIframeId_(d.f);
        "undefined" != typeof b && "undefined" != typeof b.getActiveSiteHolder() && (c = b.getActiveSiteHolder().getUrl());
        var g = "", l = "", m = {}, n;
        a && (a.view && (g = a.view), a.viewTarget && (l = a.viewTarget), a.viewParams && (m = a.viewParams), a.coordinates && (n = a.coordinates));
        var s = e.getGadgetSiteByIframeId_(d.f).getActiveSiteHolder().getIframeElement();
        e.preloadGadget(c, function (a) {
            function d(a) {
                var b = {}, h = e.newGadgetSite(a);
                h.ownerId_ = r;
                "undefined" != typeof g && "" !== g && (b[osapi.container.RenderParam.VIEW] = g);
                b[osapi.container.RenderParam.WIDTH] = "100%";
                b[osapi.container.RenderParam.HEIGHT] = "100%";
                e.navigateGadget(h, c, m, b, function (a) {
                    a && (k.resultCallbacks_[h.getId()] = q);
                    f && f([h.getId(), a])
                })
            }

            var p = {};
            if ("undefined" != typeof a && "undefined" != typeof a[c]) {
                if (a[c].error) {
                    gadgets.error("Failed to preload gadget : " + c);
                    null != f && f([null, a[c]]);
                    return
                }
                p = a[c]
            }
            (a =
                k.createElementForGadget(p, s, g, l, n, b, d)) && d(a)
        })
    });
    this.createElementForGadget = function (d, e, a, f, k, c, b) {
        console.log("container needs to define createElementForGadget function")
    }
});
osapi.container.Container.addMixin("views", function (b) {
    var k = this;
    b.rpcRegister("gadgets.views.openUrl", function (d, f, a, g) {
        function e(c) {
            c = b.newUrlSite(c);
            var a = {};
            a[osapi.container.RenderParam.WIDTH] = "100%";
            a[osapi.container.RenderParam.HEIGHT] = "100%";
            b.navigateUrl(c, f, a);
            c.ownerId_ = d.f;
            d.callback([c.getId()])
        }

        var h = b.getGadgetSiteByIframeId_(d.f), l = h.getActiveSiteHolder().getIframeElement();
        (a = k.createElementForUrl(l, a, g, h, e)) && e(a)
    });
    this.createElementForUrl = function (b, f, a, g, e) {
        console.log("container needs to define createElementForUrl function")
    }
});
"undefined" != typeof osapi && (osapi.container.UrlSite.prototype.render = function (d, a) {
    this.holder_ = new osapi.container.UrlHolder(this, this.el_, a ? a.onLoad : null);
    var c = {}, b;
    for (b in a)c[b] = a[b];
    this.holder_.render(d, c)
});


gadgets.config.init({
    opensocial: {
        invalidatePath: "//%host%/portal/rpc", path: "//%host%/portal/rpc", domain: "shindig", supportedFields: {
            person: ["id", {name: ["familyName", "givenName", "unstructured"]}, "thumbnailUrl", "profileUrl"],
            mediaItem: "album_id created description duration file_size id language last_updated location mime_type num_comments num_views num_votes rating start_time tagged_people tags thumbnail_url title type url".split(" "),
            album: "id thumbnailUrl title description location ownerId".split(" "),
            group: ["id", "title", "description"],
            activity: "appId body bodyId externalId id mediaItems postedTime priority streamFaviconUrl streamSourceUrl streamTitle streamUrl templateParams title url userId".split(" "),
            activityEntry: "actor content generator icon id object published provider target title updated url verb openSocial extensions".split(" ")
        }, enableCaja: !1
    },
    rpc: {
        commSwf: "/xpc.swf",
        passReferrer: "c2p:query",
        parentRelayUrl: "/container/rpc_relay.html",
        useLegacyProtocol: !1
    },
    "shindig.auth": {authToken: "-1:-1:*:*:*:0:default"},
    container: {
        jsPath: "/portal/gadgets/js",
        relayPath: "/portal/gadgets/files/container/rpc_relay.html",
        enableRpcArbitration: !1
    },
    views: {
        "default": {
            isOnlyVisible: !1,
            urlTemplate: "http://localhost/portal/gadgets/default?{var}",
            aliases: ["home", "profile", "canvas"]
        },
        canvas: {
            isOnlyVisible: !0,
            urlTemplate: "http://localhost/portal/gadgets/canvas?{var}",
            aliases: ["FULL_PAGE"]
        },
        embedded: {
            isOnlyVisible: !1,
            urlTemplate: "http://localhost/portal/gadgets/embedded?{var}",
            aliases: ["embedded"]
        },
        profile: {
            isOnlyVisible: !1, urlTemplate: "http://localhost/portal/gadgets/profile?{var}",
            aliases: ["DASHBOARD", "default"]
        }
    },
    osapi: {endPoints: ["//%host%/portal/rpc"]},
    "osapi.services": {"gadgets.rpc": ["container.listMethods"]},
    "core.io": {
        unparseableCruft: "throw 1; \x3c don't be evil' \x3e",
        jsonProxyUrl: "//%host%/portal/gadgets/makeRequest",
        jsPath: "/portal/gadgets/js",
        proxyUrl: "//%host%/portal/gadgets/proxy%filename%?container\x3d%container%\x26refresh\x3d%refresh%\x26url\x3d%url%%authz%%rewriteMime%",
        xhrPollIntervalMs: 50
    }
});
window['___jsl']['l'] = (window['___jsl']['l'] || []).concat(['container', 'open-views', 'portal']);