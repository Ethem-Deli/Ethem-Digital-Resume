!function () {
    var a, o = window.location, r = window.document, t = r.currentScript, l = t.getAttribute("data-api") || new URL(t.src).origin + "/api/event", s = t.getAttribute("data-domain");
    function c(t, e, n) {
        e && console.warn("Ignoring Event: " + e),
            n && n.callback && n.callback(),
            "pageview" === t && (a = !0)
    }
    var d = o.href
        , u = {}
        , w = -1
        , v = !1
        , p = null
        , h = 0;
    function f() {
        var t = r.body || {}
            , e = r.documentElement || {};
        return Math.max(t.scrollHeight || 0, t.offsetHeight || 0, t.clientHeight || 0, e.scrollHeight || 0, e.offsetHeight || 0, e.clientHeight || 0)
    }
    function g() {
        var t = r.body || {}
            , e = r.documentElement || {}
            , n = window.innerHeight || e.clientHeight || 0
            , e = window.scrollY || e.scrollTop || t.scrollTop || 0;
        return b <= n ? b : e + n
    }
    function e() {
        return p ? h + (Date.now() - p) : h
    }
    var b = f()
        , m = g();
    function y() {
        var t = e();
        !a && (w < m || 3e3 <= t) && (w = m,
            t = {
                n: "engagement",
                sd: Math.round(m / b * 100),
                d: s,
                u: d,
                p: u,
                e: t,
                v: 3
            },
            p = null,
            h = 0,
            E(l, t))
    }
    function S() {
        "visible" === r.visibilityState && r.hasFocus() && null === p ? p = Date.now() : "hidden" !== r.visibilityState && r.hasFocus() || (h = e(),
            p = null,
            y())
    }
    function n(t, e) {
        var n = "pageview" === t;
        if (n && v && (y(),
            b = f(),
            m = g()),
            /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname) || "file:" === o.protocol)
            return c(t, "localhost", e);
        if ((window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) && !window.__plausible)
            return c(t, null, e);
        try {
            if ("true" === window.localStorage.plausible_ignore)
                return c(t, "localStorage flag", e)
        } catch (t) { }
        var i = {};
        i.n = t,
            i.v = 3,
            i.u = o.href,
            i.d = s,
            i.r = r.referrer || null,
            e && e.meta && (i.m = JSON.stringify(e.meta)),
            e && e.props && (i.p = e.props),
            n && (a = !1,
                d = i.u,
                u = i.p,
                w = -1,
                h = 0,
                p = Date.now(),
                v || (r.addEventListener("visibilitychange", S),
                    window.addEventListener("blur", S),
                    window.addEventListener("focus", S),
                    v = !0)),
            E(l, i, e)
    }
    function E(t, e, n) {
        window.fetch && fetch(t, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            keepalive: !0,
            body: JSON.stringify(e)
        }).then(function (t) {
            n && n.callback && n.callback({
                status: t.status
            })
        }).catch(function () { })
    }
    window.addEventListener("load", function () {
        b = f();
        var t = 0
            , e = setInterval(function () {
                b = f(),
                    15 == ++t && clearInterval(e)
            }, 200)
    }),
        r.addEventListener("scroll", function () {
            b = f();
            var t = g();
            m < t && (m = t)
        });
    var i = window.plausible && window.plausible.q || [];
    window.plausible = n;
    for (var L, H = 0; H < i.length; H++)
        n.apply(this, i[H]);
    function _(t) {
        t && L === o.pathname || (L = o.pathname,
            n("pageview"))
    }
    function k() {
        _(!0)
    }
    var T, t = window.history;
    t.pushState && (T = t.pushState,
        t.pushState = function () {
            T.apply(this, arguments),
                k()
        }
        ,
        window.addEventListener("popstate", k)),
        "prerender" === r.visibilityState ? r.addEventListener("visibilitychange", function () {
            L || "visible" !== r.visibilityState || _()
        }) : _(),
        window.addEventListener("pageshow", function (t) {
            t.persisted && _()
        })
}();
