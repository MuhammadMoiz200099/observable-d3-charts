// @observablehq/runtime v4.18.5 Copyright 2022 Observable, Inc.
function e(e, t, n) {
    n = n || {};
    var r = e.ownerDocument,
      o = r.defaultView.CustomEvent;
    "function" == typeof o
      ? (o = new o(t, { detail: n }))
      : ((o = r.createEvent("Event")).initEvent(t, !1, !1), (o.detail = n)),
      e.dispatchEvent(o);
  }
  function t(e) {
    return (
      Array.isArray(e) ||
      e instanceof Int8Array ||
      e instanceof Int16Array ||
      e instanceof Int32Array ||
      e instanceof Uint8Array ||
      e instanceof Uint8ClampedArray ||
      e instanceof Uint16Array ||
      e instanceof Uint32Array ||
      e instanceof Float32Array ||
      e instanceof Float64Array
    );
  }
  function n(e) {
    return e === (0 | e) + "";
  }
  function r(e) {
    const t = document.createElement("span");
    return (
      (t.className = "observablehq--cellname"), (t.textContent = `${e} = `), t
    );
  }
  const o = Symbol.prototype.toString;
  function i(e) {
    return o.call(e);
  }
  const {
      getOwnPropertySymbols: a,
      prototype: { hasOwnProperty: s },
    } = Object,
    { toStringTag: l } = Symbol,
    u = {},
    c = a;
  function d(e, t) {
    return s.call(e, t);
  }
  function f(e) {
    return e[l] || (e.constructor && e.constructor.name) || "Object";
  }
  function h(e, t) {
    try {
      const n = e[t];
      return n && n.constructor, n;
    } catch (e) {
      return u;
    }
  }
  const p = [
    { symbol: "@@__IMMUTABLE_INDEXED__@@", name: "Indexed", modifier: !0 },
    { symbol: "@@__IMMUTABLE_KEYED__@@", name: "Keyed", modifier: !0 },
    { symbol: "@@__IMMUTABLE_LIST__@@", name: "List", arrayish: !0 },
    { symbol: "@@__IMMUTABLE_MAP__@@", name: "Map" },
    {
      symbol: "@@__IMMUTABLE_ORDERED__@@",
      name: "Ordered",
      modifier: !0,
      prefix: !0,
    },
    { symbol: "@@__IMMUTABLE_RECORD__@@", name: "Record" },
    { symbol: "@@__IMMUTABLE_SET__@@", name: "Set", arrayish: !0, setish: !0 },
    { symbol: "@@__IMMUTABLE_STACK__@@", name: "Stack", arrayish: !0 },
  ];
  function m(e) {
    try {
      let t = p.filter(({ symbol: t }) => !0 === e[t]);
      if (!t.length) return;
      const n = t.find((e) => !e.modifier),
        r = "Map" === n.name && t.find((e) => e.modifier && e.prefix),
        o = t.some((e) => e.arrayish),
        i = t.some((e) => e.setish);
      return {
        name: `${r ? r.name : ""}${n.name}`,
        symbols: t,
        arrayish: o && !i,
        setish: i,
      };
    } catch (e) {
      return null;
    }
  }
  const { getPrototypeOf: v, getOwnPropertyDescriptors: b } = Object,
    _ = v({});
  function w(n, o, i, a) {
    let s,
      l,
      u,
      c,
      d = t(n);
    n instanceof Map
      ? n instanceof n.constructor
        ? ((s = `Map(${n.size})`), (l = y))
        : ((s = "Map()"), (l = N))
      : n instanceof Set
      ? n instanceof n.constructor
        ? ((s = `Set(${n.size})`), (l = g))
        : ((s = "Set()"), (l = N))
      : d
      ? ((s = `${n.constructor.name}(${n.length})`), (l = E))
      : (c = m(n))
      ? ((s = `Immutable.${c.name}${"Record" === c.name ? "" : `(${n.size})`}`),
        (d = c.arrayish),
        (l = c.arrayish ? C : c.setish ? x : $))
      : a
      ? ((s = f(n)), (l = j))
      : ((s = f(n)), (l = N));
    const h = document.createElement("span");
    (h.className = "observablehq--expanded"), i && h.appendChild(r(i));
    const p = h.appendChild(document.createElement("a"));
    (p.innerHTML =
      "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M4 7L0 1h8z' fill='currentColor' />\n  </svg>"),
      p.appendChild(document.createTextNode(`${s}${d ? " [" : " {"}`)),
      p.addEventListener("mouseup", function (e) {
        e.stopPropagation(), ae(h, T(n, null, i, a));
      }),
      (l = l(n));
    for (let e = 0; !(u = l.next()).done && e < 20; ++e) h.appendChild(u.value);
    if (!u.done) {
      const t = h.appendChild(document.createElement("a"));
      (t.className = "observablehq--field"),
        (t.style.display = "block"),
        t.appendChild(document.createTextNode("  … more")),
        t.addEventListener("mouseup", function (t) {
          t.stopPropagation(),
            h.insertBefore(u.value, h.lastChild.previousSibling);
          for (let e = 0; !(u = l.next()).done && e < 19; ++e)
            h.insertBefore(u.value, h.lastChild.previousSibling);
          u.done && h.removeChild(h.lastChild.previousSibling), e(h, "load");
        });
    }
    return h.appendChild(document.createTextNode(d ? "]" : "}")), h;
  }
  function* y(e) {
    for (const [t, n] of e) yield S(t, n);
    yield* N(e);
  }
  function* g(e) {
    for (const t of e) yield A(t);
    yield* N(e);
  }
  function* x(e) {
    for (const t of e) yield A(t);
  }
  function* E(e) {
    for (let t = 0, n = e.length; t < n; ++t)
      t in e && (yield q(t, h(e, t), "observablehq--index"));
    for (const t in e)
      !n(t) && d(e, t) && (yield q(t, h(e, t), "observablehq--key"));
    for (const t of c(e)) yield q(i(t), h(e, t), "observablehq--symbol");
  }
  function* C(e) {
    let t = 0;
    for (const n = e.size; t < n; ++t) yield q(t, e.get(t), !0);
  }
  function* j(e) {
    for (const t in b(e)) yield q(t, h(e, t), "observablehq--key");
    for (const t of c(e)) yield q(i(t), h(e, t), "observablehq--symbol");
    const t = v(e);
    t && t !== _ && (yield P(t));
  }
  function* N(e) {
    for (const t in e) d(e, t) && (yield q(t, h(e, t), "observablehq--key"));
    for (const t of c(e)) yield q(i(t), h(e, t), "observablehq--symbol");
    const t = v(e);
    t && t !== _ && (yield P(t));
  }
  function* $(e) {
    for (const [t, n] of e) yield q(t, n, "observablehq--key");
  }
  function P(e) {
    const t = document.createElement("div"),
      n = t.appendChild(document.createElement("span"));
    return (
      (t.className = "observablehq--field"),
      (n.className = "observablehq--prototype-key"),
      (n.textContent = "  <prototype>"),
      t.appendChild(document.createTextNode(": ")),
      t.appendChild(ie(e, void 0, void 0, void 0, !0)),
      t
    );
  }
  function q(e, t, n) {
    const r = document.createElement("div"),
      o = r.appendChild(document.createElement("span"));
    return (
      (r.className = "observablehq--field"),
      (o.className = n),
      (o.textContent = `  ${e}`),
      r.appendChild(document.createTextNode(": ")),
      r.appendChild(ie(t)),
      r
    );
  }
  function S(e, t) {
    const n = document.createElement("div");
    return (
      (n.className = "observablehq--field"),
      n.appendChild(document.createTextNode("  ")),
      n.appendChild(ie(e)),
      n.appendChild(document.createTextNode(" => ")),
      n.appendChild(ie(t)),
      n
    );
  }
  function A(e) {
    const t = document.createElement("div");
    return (
      (t.className = "observablehq--field"),
      t.appendChild(document.createTextNode("  ")),
      t.appendChild(ie(e)),
      t
    );
  }
  function O(e) {
    const t = window.getSelection();
    return (
      "Range" === t.type &&
      (t.containsNode(e, !0) ||
        t.anchorNode.isSelfOrDescendant(e) ||
        t.focusNode.isSelfOrDescendant(e))
    );
  }
  function T(e, n, o, i) {
    let a,
      s,
      l,
      u,
      c = t(e);
    if (
      (e instanceof Map
        ? e instanceof e.constructor
          ? ((a = `Map(${e.size})`), (s = M))
          : ((a = "Map()"), (s = D))
        : e instanceof Set
        ? e instanceof e.constructor
          ? ((a = `Set(${e.size})`), (s = L))
          : ((a = "Set()"), (s = D))
        : c
        ? ((a = `${e.constructor.name}(${e.length})`), (s = R))
        : (u = m(e))
        ? ((a = `Immutable.${u.name}${"Record" === u.name ? "" : `(${e.size})`}`),
          (c = u.arrayish),
          (s = u.arrayish ? U : u.setish ? k : F))
        : ((a = f(e)), (s = D)),
      n)
    ) {
      const t = document.createElement("span");
      return (
        (t.className = "observablehq--shallow"),
        o && t.appendChild(r(o)),
        t.appendChild(document.createTextNode(a)),
        t.addEventListener("mouseup", function (n) {
          O(t) || (n.stopPropagation(), ae(t, T(e)));
        }),
        t
      );
    }
    const d = document.createElement("span");
    (d.className = "observablehq--collapsed"), o && d.appendChild(r(o));
    const h = d.appendChild(document.createElement("a"));
    (h.innerHTML =
      "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M7 4L1 8V0z' fill='currentColor' />\n  </svg>"),
      h.appendChild(document.createTextNode(`${a}${c ? " [" : " {"}`)),
      d.addEventListener(
        "mouseup",
        function (t) {
          O(d) || (t.stopPropagation(), ae(d, w(e, 0, o, i)));
        },
        !0
      ),
      (s = s(e));
    for (let e = 0; !(l = s.next()).done && e < 20; ++e)
      e > 0 && d.appendChild(document.createTextNode(", ")),
        d.appendChild(l.value);
    return (
      l.done || d.appendChild(document.createTextNode(", …")),
      d.appendChild(document.createTextNode(c ? "]" : "}")),
      d
    );
  }
  function* M(e) {
    for (const [t, n] of e) yield B(t, n);
    yield* D(e);
  }
  function* L(e) {
    for (const t of e) yield ie(t, !0);
    yield* D(e);
  }
  function* k(e) {
    for (const t of e) yield ie(t, !0);
  }
  function* U(e) {
    let t = -1,
      n = 0;
    for (const r = e.size; n < r; ++n)
      n > t + 1 && (yield I(n - t - 1)), yield ie(e.get(n), !0), (t = n);
    n > t + 1 && (yield I(n - t - 1));
  }
  function* R(e) {
    let t = -1,
      r = 0;
    for (const n = e.length; r < n; ++r)
      r in e &&
        (r > t + 1 && (yield I(r - t - 1)), yield ie(h(e, r), !0), (t = r));
    r > t + 1 && (yield I(r - t - 1));
    for (const t in e)
      !n(t) && d(e, t) && (yield z(t, h(e, t), "observablehq--key"));
    for (const t of c(e)) yield z(i(t), h(e, t), "observablehq--symbol");
  }
  function* D(e) {
    for (const t in e) d(e, t) && (yield z(t, h(e, t), "observablehq--key"));
    for (const t of c(e)) yield z(i(t), h(e, t), "observablehq--symbol");
  }
  function* F(e) {
    for (const [t, n] of e) yield z(t, n, "observablehq--key");
  }
  function I(e) {
    const t = document.createElement("span");
    return (
      (t.className = "observablehq--empty"),
      (t.textContent = 1 === e ? "empty" : `empty × ${e}`),
      t
    );
  }
  function z(e, t, n) {
    const r = document.createDocumentFragment(),
      o = r.appendChild(document.createElement("span"));
    return (
      (o.className = n),
      (o.textContent = e),
      r.appendChild(document.createTextNode(": ")),
      r.appendChild(ie(t, !0)),
      r
    );
  }
  function B(e, t) {
    const n = document.createDocumentFragment();
    return (
      n.appendChild(ie(e, !0)),
      n.appendChild(document.createTextNode(" => ")),
      n.appendChild(ie(t, !0)),
      n
    );
  }
  function H(e, t) {
    if ((e instanceof Date || (e = new Date(+e)), isNaN(e)))
      return "function" == typeof t ? t(e) : t;
    const n = e.getUTCHours(),
      r = e.getUTCMinutes(),
      o = e.getUTCSeconds(),
      i = e.getUTCMilliseconds();
    return `${
      ((a = e.getUTCFullYear()),
      a < 0 ? `-${W(-a, 6)}` : a > 9999 ? `+${W(a, 6)}` : W(a, 4))
    }-${W(e.getUTCMonth() + 1, 2)}-${W(e.getUTCDate(), 2)}${
      n || r || o || i
        ? `T${W(n, 2)}:${W(r, 2)}${
            o || i ? `:${W(o, 2)}${i ? `.${W(i, 3)}` : ""}` : ""
          }Z`
        : ""
    }`;
    var a;
  }
  function W(e, t) {
    return `${e}`.padStart(t, "0");
  }
  var Z = Error.prototype.toString;
  var V = RegExp.prototype.toString;
  function J(e) {
    return e.replace(/[\\`\x00-\x09\x0b-\x19]|\${/g, Y);
  }
  function Y(e) {
    var t = e.charCodeAt(0);
    switch (t) {
      case 8:
        return "\\b";
      case 9:
        return "\\t";
      case 11:
        return "\\v";
      case 12:
        return "\\f";
      case 13:
        return "\\r";
    }
    return t < 16
      ? "\\x0" + t.toString(16)
      : t < 32
      ? "\\x" + t.toString(16)
      : "\\" + e;
  }
  function G(e, t) {
    for (var n = 0; t.exec(e); ) ++n;
    return n;
  }
  var K = Function.prototype.toString,
    Q = { prefix: "async ƒ" },
    X = { prefix: "async ƒ*" },
    ee = { prefix: "class" },
    te = { prefix: "ƒ" },
    ne = { prefix: "ƒ*" };
  function re(e, t, n) {
    var o = document.createElement("span");
    (o.className = "observablehq--function"), n && o.appendChild(r(n));
    var i = o.appendChild(document.createElement("span"));
    return (
      (i.className = "observablehq--keyword"),
      (i.textContent = e.prefix),
      o.appendChild(document.createTextNode(t)),
      o
    );
  }
  const {
    prototype: { toString: oe },
  } = Object;
  function ie(e, t, n, o, a) {
    let s = typeof e;
    switch (s) {
      case "boolean":
      case "undefined":
        e += "";
        break;
      case "number":
        e = 0 === e && 1 / e < 0 ? "-0" : e + "";
        break;
      case "bigint":
        e += "n";
        break;
      case "symbol":
        e = i(e);
        break;
      case "function":
        return (function (e, t) {
          var n,
            r,
            o = K.call(e);
          switch (e.constructor && e.constructor.name) {
            case "AsyncFunction":
              n = Q;
              break;
            case "AsyncGeneratorFunction":
              n = X;
              break;
            case "GeneratorFunction":
              n = ne;
              break;
            default:
              n = /^class\b/.test(o) ? ee : te;
          }
          return n === ee
            ? re(n, "", t)
            : (r = /^(?:async\s*)?(\w+)\s*=>/.exec(o))
            ? re(n, "(" + r[1] + ")", t)
            : (r = /^(?:async\s*)?\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(o)) ||
              (r =
                /^(?:async\s*)?function(?:\s*\*)?(?:\s*\w+)?\s*\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(
                  o
                ))
            ? re(n, r[1] ? "(" + r[1].replace(/\s*,\s*/g, ", ") + ")" : "()", t)
            : re(n, "(…)", t);
        })(e, o);
      case "string":
        return (function (e, t, n, o) {
          if (!1 === t) {
            if (G(e, /["\n]/g) <= G(e, /`|\${/g)) {
              const t = document.createElement("span");
              o && t.appendChild(r(o));
              const n = t.appendChild(document.createElement("span"));
              return (
                (n.className = "observablehq--string"),
                (n.textContent = JSON.stringify(e)),
                t
              );
            }
            const i = e.split("\n");
            if (i.length > 20 && !n) {
              const n = document.createElement("div");
              o && n.appendChild(r(o));
              const a = n.appendChild(document.createElement("span"));
              (a.className = "observablehq--string"),
                (a.textContent = "`" + J(i.slice(0, 20).join("\n")));
              const s = n.appendChild(document.createElement("span")),
                l = i.length - 20;
              return (
                (s.textContent = `Show ${l} truncated line${l > 1 ? "s" : ""}`),
                (s.className = "observablehq--string-expand"),
                s.addEventListener("mouseup", function (r) {
                  r.stopPropagation(), ae(n, ie(e, t, !0, o));
                }),
                n
              );
            }
            const a = document.createElement("span");
            o && a.appendChild(r(o));
            const s = a.appendChild(document.createElement("span"));
            return (
              (s.className =
                "observablehq--string" + (n ? " observablehq--expanded" : "")),
              (s.textContent = "`" + J(e) + "`"),
              a
            );
          }
          const i = document.createElement("span");
          o && i.appendChild(r(o));
          const a = i.appendChild(document.createElement("span"));
          return (
            (a.className = "observablehq--string"),
            (a.textContent = JSON.stringify(
              e.length > 100 ? `${e.slice(0, 50)}…${e.slice(-49)}` : e
            )),
            i
          );
        })(e, t, n, o);
      default:
        if (null === e) {
          (s = null), (e = "null");
          break;
        }
        if (e instanceof Date) {
          (s = "date"), (e = H(e, "Invalid Date"));
          break;
        }
        if (e === u) {
          (s = "forbidden"), (e = "[forbidden]");
          break;
        }
        switch (oe.call(e)) {
          case "[object RegExp]":
            (s = "regexp"),
              (e = (function (e) {
                return V.call(e);
              })(e));
            break;
          case "[object Error]":
          case "[object DOMException]":
            (s = "error"),
              (e = (function (e) {
                return e.stack || Z.call(e);
              })(e));
            break;
          default:
            return (n ? w : T)(e, t, o, a);
        }
    }
    const l = document.createElement("span");
    o && l.appendChild(r(o));
    const c = l.appendChild(document.createElement("span"));
    return (c.className = `observablehq--${s}`), (c.textContent = e), l;
  }
  function ae(t, n) {
    t.classList.contains("observablehq--inspect") &&
      n.classList.add("observablehq--inspect"),
      t.parentNode.replaceChild(n, t),
      e(n, "load");
  }
  const se = /\s+\(\d+:\d+\)$/m;
  class le {
    constructor(e) {
      if (!e) throw new Error("invalid node");
      (this._node = e), e.classList.add("observablehq");
    }
    pending() {
      const { _node: e } = this;
      e.classList.remove("observablehq--error"),
        e.classList.add("observablehq--running");
    }
    fulfilled(t, n) {
      const { _node: r } = this;
      if (
        ((!(function (e) {
          return (
            (e instanceof Element || e instanceof Text) &&
            e instanceof e.constructor
          );
        })(t) ||
          (t.parentNode && t.parentNode !== r)) &&
          (t = ie(
            t,
            !1,
            r.firstChild &&
              r.firstChild.classList &&
              r.firstChild.classList.contains("observablehq--expanded"),
            n
          )).classList.add("observablehq--inspect"),
        r.classList.remove("observablehq--running", "observablehq--error"),
        r.firstChild !== t)
      )
        if (r.firstChild) {
          for (; r.lastChild !== r.firstChild; ) r.removeChild(r.lastChild);
          r.replaceChild(t, r.firstChild);
        } else r.appendChild(t);
      e(r, "update");
    }
    rejected(t, n) {
      const { _node: o } = this;
      for (
        o.classList.remove("observablehq--running"),
          o.classList.add("observablehq--error");
        o.lastChild;
  
      )
        o.removeChild(o.lastChild);
      var i = document.createElement("div");
      (i.className = "observablehq--inspect"),
        n && i.appendChild(r(n)),
        i.appendChild(document.createTextNode((t + "").replace(se, ""))),
        o.appendChild(i),
        e(o, "error", { error: t });
    }
  }
  le.into = function (e) {
    if ("string" == typeof e && null == (e = document.querySelector(e)))
      throw new Error("container not found");
    return function () {
      return new le(e.appendChild(document.createElement("div")));
    };
  };
  var ue = {},
    ce = {};
  function de(e) {
    return new Function(
      "d",
      "return {" +
        e
          .map(function (e, t) {
            return JSON.stringify(e) + ": d[" + t + '] || ""';
          })
          .join(",") +
        "}"
    );
  }
  function fe(e) {
    var t = Object.create(null),
      n = [];
    return (
      e.forEach(function (e) {
        for (var r in e) r in t || n.push((t[r] = r));
      }),
      n
    );
  }
  function he(e, t) {
    var n = e + "",
      r = n.length;
    return r < t ? new Array(t - r + 1).join(0) + n : n;
  }
  function pe(e) {
    var t,
      n = e.getUTCHours(),
      r = e.getUTCMinutes(),
      o = e.getUTCSeconds(),
      i = e.getUTCMilliseconds();
    return isNaN(e)
      ? "Invalid Date"
      : ((t = e.getUTCFullYear()) < 0
          ? "-" + he(-t, 6)
          : t > 9999
          ? "+" + he(t, 6)
          : he(t, 4)) +
          "-" +
          he(e.getUTCMonth() + 1, 2) +
          "-" +
          he(e.getUTCDate(), 2) +
          (i
            ? "T" +
              he(n, 2) +
              ":" +
              he(r, 2) +
              ":" +
              he(o, 2) +
              "." +
              he(i, 3) +
              "Z"
            : o
            ? "T" + he(n, 2) + ":" + he(r, 2) + ":" + he(o, 2) + "Z"
            : r || n
            ? "T" + he(n, 2) + ":" + he(r, 2) + "Z"
            : "");
  }
  function me(e) {
    var t = new RegExp('["' + e + "\n\r]"),
      n = e.charCodeAt(0);
    function r(e, t) {
      var r,
        o = [],
        i = e.length,
        a = 0,
        s = 0,
        l = i <= 0,
        u = !1;
      function c() {
        if (l) return ce;
        if (u) return (u = !1), ue;
        var t,
          r,
          o = a;
        if (34 === e.charCodeAt(o)) {
          for (
            ;
            (a++ < i && 34 !== e.charCodeAt(a)) || 34 === e.charCodeAt(++a);
  
          );
          return (
            (t = a) >= i
              ? (l = !0)
              : 10 === (r = e.charCodeAt(a++))
              ? (u = !0)
              : 13 === r && ((u = !0), 10 === e.charCodeAt(a) && ++a),
            e.slice(o + 1, t - 1).replace(/""/g, '"')
          );
        }
        for (; a < i; ) {
          if (10 === (r = e.charCodeAt((t = a++)))) u = !0;
          else if (13 === r) (u = !0), 10 === e.charCodeAt(a) && ++a;
          else if (r !== n) continue;
          return e.slice(o, t);
        }
        return (l = !0), e.slice(o, i);
      }
      for (
        10 === e.charCodeAt(i - 1) && --i, 13 === e.charCodeAt(i - 1) && --i;
        (r = c()) !== ce;
  
      ) {
        for (var d = []; r !== ue && r !== ce; ) d.push(r), (r = c());
        (t && null == (d = t(d, s++))) || o.push(d);
      }
      return o;
    }
    function o(t, n) {
      return t.map(function (t) {
        return n
          .map(function (e) {
            return a(t[e]);
          })
          .join(e);
      });
    }
    function i(t) {
      return t.map(a).join(e);
    }
    function a(e) {
      return null == e
        ? ""
        : e instanceof Date
        ? pe(e)
        : t.test((e += ""))
        ? '"' + e.replace(/"/g, '""') + '"'
        : e;
    }
    return {
      parse: function (e, t) {
        var n,
          o,
          i = r(e, function (e, r) {
            if (n) return n(e, r - 1);
            (o = e),
              (n = t
                ? (function (e, t) {
                    var n = de(e);
                    return function (r, o) {
                      return t(n(r), o, e);
                    };
                  })(e, t)
                : de(e));
          });
        return (i.columns = o || []), i;
      },
      parseRows: r,
      format: function (t, n) {
        return (
          null == n && (n = fe(t)), [n.map(a).join(e)].concat(o(t, n)).join("\n")
        );
      },
      formatBody: function (e, t) {
        return null == t && (t = fe(e)), o(e, t).join("\n");
      },
      formatRows: function (e) {
        return e.map(i).join("\n");
      },
      formatRow: i,
      formatValue: a,
    };
  }
  var ve = me(","),
    be = ve.parse,
    _e = ve.parseRows,
    we = me("\t"),
    ye = we.parse,
    ge = we.parseRows;
  function xe(e) {
    for (var t in e) {
      var n,
        r,
        o = e[t].trim();
      if (o)
        if ("true" === o) o = !0;
        else if ("false" === o) o = !1;
        else if ("NaN" === o) o = NaN;
        else if (isNaN((n = +o))) {
          if (
            !(r = o.match(
              /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/
            ))
          )
            continue;
          Ee && r[4] && !r[7] && (o = o.replace(/-/g, "/").replace(/T/, " ")),
            (o = new Date(o));
        } else o = n;
      else o = null;
      e[t] = o;
    }
    return e;
  }
  const Ee =
      new Date("2019-01-01T00:00").getHours() ||
      new Date("2019-07-01T00:00").getHours(),
    Ce = new Map(),
    je = [],
    Ne = je.map,
    $e = je.some,
    Pe = je.hasOwnProperty,
    qe = "https://cdn.jsdelivr.net/npm/",
    Se = /^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?(?:\/(.*))?$/,
    Ae = /^\d+\.\d+\.\d+(-[\w-.+]+)?$/,
    Oe = /\.[^/]*$/,
    Te = ["unpkg", "jsdelivr", "browser", "main"];
  class RequireError extends Error {
    constructor(e) {
      super(e);
    }
  }
  function Me(e) {
    const t = Se.exec(e);
    return t && { name: t[1], version: t[2], path: t[3] };
  }
  function Le(e) {
    const t = `${qe}${e.name}${e.version ? `@${e.version}` : ""}/package.json`;
    let n = Ce.get(t);
    return (
      n ||
        Ce.set(
          t,
          (n = fetch(t).then((e) => {
            if (!e.ok) throw new RequireError("unable to load package.json");
            return e.redirected && !Ce.has(e.url) && Ce.set(e.url, n), e.json();
          }))
        ),
      n
    );
  }
  RequireError.prototype.name = RequireError.name;
  var ke = Ue(async function (e, t) {
    if (
      (e.startsWith(qe) && (e = e.substring(qe.length)), /^(\w+:)|\/\//i.test(e))
    )
      return e;
    if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href;
    if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e))
      throw new RequireError("illegal name");
    const n = Me(e);
    if (!n) return `${qe}${e}`;
    if (!n.version && null != t && t.startsWith(qe)) {
      const e = await Le(Me(t.substring(qe.length)));
      n.version =
        (e.dependencies && e.dependencies[n.name]) ||
        (e.peerDependencies && e.peerDependencies[n.name]);
    }
    if (
      (n.path && !Oe.test(n.path) && (n.path += ".js"),
      n.path && n.version && Ae.test(n.version))
    )
      return `${qe}${n.name}@${n.version}/${n.path}`;
    const r = await Le(n);
    return `${qe}${r.name}@${r.version}/${
      n.path ||
      (function (e) {
        for (const t of Te) {
          const n = e[t];
          if ("string" == typeof n) return Oe.test(n) ? n : `${n}.js`;
        }
      })(r) ||
      "index.js"
    }`;
  });
  function Ue(e) {
    const t = new Map(),
      n = o(null);
    function r(e) {
      if ("string" != typeof e) return e;
      let n = t.get(e);
      return (
        n ||
          t.set(
            e,
            (n = new Promise((t, n) => {
              const r = document.createElement("script");
              (r.onload = () => {
                try {
                  t(je.pop()(o(e)));
                } catch (e) {
                  n(new RequireError("invalid module"));
                }
                r.remove();
              }),
                (r.onerror = () => {
                  n(new RequireError("unable to load module")), r.remove();
                }),
                (r.async = !0),
                (r.src = e),
                (window.define = Ie),
                document.head.appendChild(r);
            }))
          ),
        n
      );
    }
    function o(t) {
      return (n) => Promise.resolve(e(n, t)).then(r);
    }
    function i(e) {
      return arguments.length > 1
        ? Promise.all(Ne.call(arguments, n)).then(Re)
        : n(e);
    }
    return (
      (i.alias = function (t) {
        return Ue((n, r) =>
          n in t && ((r = null), "string" != typeof (n = t[n])) ? n : e(n, r)
        );
      }),
      (i.resolve = e),
      i
    );
  }
  function Re(e) {
    const t = {};
    for (const n of e)
      for (const e in n)
        Pe.call(n, e) &&
          (null == n[e]
            ? Object.defineProperty(t, e, { get: De(n, e) })
            : (t[e] = n[e]));
    return t;
  }
  function De(e, t) {
    return () => e[t];
  }
  function Fe(e) {
    return "exports" === (e += "") || "module" === e;
  }
  function Ie(e, t, n) {
    const r = arguments.length;
    r < 2
      ? ((n = e), (t = []))
      : r < 3 && ((n = t), (t = "string" == typeof e ? [] : e)),
      je.push(
        $e.call(t, Fe)
          ? (e) => {
              const r = {},
                o = { exports: r };
              return Promise.all(
                Ne.call(t, (t) =>
                  "exports" === (t += "") ? r : "module" === t ? o : e(t)
                )
              ).then((e) => (n.apply(null, e), o.exports));
            }
          : (e) =>
              Promise.all(Ne.call(t, e)).then((e) =>
                "function" == typeof n ? n.apply(null, e) : n
              )
      );
  }
  function ze(e, t, n) {
    return { resolve: (r = n) => `https://cdn.jsdelivr.net/npm/${e}@${t}/${r}` };
  }
  Ie.amd = {};
  const Be = ze("d3", "7.3.0", "dist/d3.min.js"),
    He = ze("@observablehq/inputs", "0.10.4", "dist/inputs.min.js"),
    We = ze("@observablehq/plot", "0.4.1", "dist/plot.umd.min.js"),
    Ze = ze("@observablehq/graphviz", "0.2.1", "dist/graphviz.min.js"),
    Ve = ze("@observablehq/highlight.js", "2.0.0", "highlight.min.js"),
    Je = ze("@observablehq/katex", "0.11.1", "dist/katex.min.js"),
    Ye = ze("lodash", "4.17.21", "lodash.min.js"),
    Ge = ze("htl", "0.3.1", "dist/htl.min.js"),
    Ke = ze("jszip", "3.7.1", "dist/jszip.min.js"),
    Qe = ze("marked", "0.3.12", "marked.min.js"),
    Xe = ze("sql.js", "1.6.2", "dist/sql-wasm.js"),
    et = ze("vega", "5.21.0", "build/vega.min.js"),
    tt = ze("vega-lite", "5.2.0", "build/vega-lite.min.js"),
    nt = ze("vega-lite-api", "5.0.0", "build/vega-lite-api.min.js"),
    rt = ze("apache-arrow", "4.0.1", "Arrow.es2015.min.js"),
    ot = ze("arquero", "4.8.8", "dist/arquero.min.js"),
    it = ze("topojson-client", "3.1.0", "dist/topojson-client.min.js"),
    at = ze("exceljs", "4.3.0", "dist/exceljs.min.js");
  async function st(e) {
    return (await e(Xe.resolve()))({
      locateFile: (e) => Xe.resolve(`dist/${e}`),
    });
  }
  class SQLiteDatabaseClient {
    constructor(e) {
      Object.defineProperties(this, { _db: { value: e } });
    }
    static async open(e) {
      const [t, n] = await Promise.all([st(ke), Promise.resolve(e).then(lt)]);
      return new SQLiteDatabaseClient(new t.Database(n));
    }
    async query(e, t) {
      return await (async function (e, t, n) {
        const [r] = await e.exec(t, n);
        if (!r) return [];
        const { columns: o, values: i } = r,
          a = i.map((e) => Object.fromEntries(e.map((e, t) => [o[t], e])));
        return (a.columns = o), a;
      })(this._db, e, t);
    }
    async queryRow(e, t) {
      return (await this.query(e, t))[0] || null;
    }
    async explain(e, t) {
      return ut("pre", { className: "observablehq--inspect" }, [
        ct(
          (await this.query(`EXPLAIN QUERY PLAN ${e}`, t))
            .map((e) => e.detail)
            .join("\n")
        ),
      ]);
    }
    async describe(e) {
      const t = await (void 0 === e
        ? this.query("SELECT name FROM sqlite_master WHERE type = 'table'")
        : this.query("SELECT * FROM pragma_table_info(?)", [e]));
      if (!t.length) throw new Error("Not found");
      const { columns: n } = t;
      return ut("table", { value: t }, [
        ut("thead", [
          ut(
            "tr",
            n.map((e) => ut("th", [ct(e)]))
          ),
        ]),
        ut(
          "tbody",
          t.map((e) =>
            ut(
              "tr",
              n.map((t) => ut("td", [ct(e[t])]))
            )
          )
        ),
      ]);
    }
    async sql(e, ...t) {
      return this.query(e.join("?"), t);
    }
  }
  function lt(e) {
    return "string" == typeof e
      ? fetch(e).then(lt)
      : e instanceof Response || e instanceof Blob
      ? e.arrayBuffer().then(lt)
      : e instanceof ArrayBuffer
      ? new Uint8Array(e)
      : e;
  }
  function ut(e, t, n) {
    2 === arguments.length && ((n = t), (t = void 0));
    const r = document.createElement(e);
    if (void 0 !== t) for (const e in t) r[e] = t[e];
    if (void 0 !== n) for (const e of n) r.appendChild(e);
    return r;
  }
  function ct(e) {
    return document.createTextNode(e);
  }
  Object.defineProperty(SQLiteDatabaseClient.prototype, "dialect", {
    value: "sqlite",
  });
  class Workbook {
    constructor(e) {
      Object.defineProperties(this, {
        _: { value: e },
        sheetNames: { value: e.worksheets.map((e) => e.name), enumerable: !0 },
      });
    }
    sheet(e, t) {
      const n =
        "number" == typeof e
          ? this.sheetNames[e]
          : this.sheetNames.includes((e += ""))
          ? e
          : null;
      if (null == n) throw new Error(`Sheet not found: ${e}`);
      return (function (e, { range: t, headers: n } = {}) {
        let [[r, o], [i, a]] = (function (
          e = ":",
          { columnCount: t, rowCount: n }
        ) {
          if (!(e += "").match(/^[A-Z]*\d*:[A-Z]*\d*$/))
            throw new Error("Malformed range specifier");
          const [[r = 0, o = 0], [i = t - 1, a = n - 1]] = e.split(":").map(pt);
          return [
            [r, o],
            [i, a],
          ];
        })(t, e);
        const s = n ? e._rows[o++] : null;
        let l = new Set(["#"]);
        for (let e = r; e <= i; e++) {
          const t = s ? dt(s.findCell(e + 1)) : null;
          let n = (t && t + "") || ht(e);
          for (; l.has(n); ) n += "_";
          l.add(n);
        }
        l = new Array(r).concat(Array.from(l));
        const u = new Array(a - o + 1);
        for (let t = o; t <= a; t++) {
          const n = (u[t - o] = Object.create(null, { "#": { value: t + 1 } })),
            a = e.getRow(t + 1);
          if (a.hasValues)
            for (let e = r; e <= i; e++) {
              const t = dt(a.findCell(e + 1));
              null != t && (n[l[e + 1]] = t);
            }
        }
        return (u.columns = l.filter(() => !0)), u;
      })(this._.getWorksheet(n), t);
    }
  }
  function dt(e) {
    if (!e) return;
    const { value: t } = e;
    if (t && "object" == typeof t && !(t instanceof Date)) {
      if (t.formula || t.sharedFormula)
        return t.result && t.result.error ? NaN : t.result;
      if (t.richText) return ft(t);
      if (t.text) {
        let { text: e } = t;
        return (
          e.richText && (e = ft(e)),
          t.hyperlink && t.hyperlink !== e ? `${t.hyperlink} ${e}` : e
        );
      }
      return t;
    }
    return t;
  }
  function ft(e) {
    return e.richText.map((e) => e.text).join("");
  }
  function ht(e) {
    let t = "";
    e++;
    do {
      t = String.fromCharCode(64 + (e % 26 || 26)) + t;
    } while ((e = Math.floor((e - 1) / 26)));
    return t;
  }
  function pt(e) {
    const [, t, n] = e.match(/^([A-Z]*)(\d*)$/);
    let r = 0;
    if (t)
      for (let e = 0; e < t.length; e++)
        r += Math.pow(26, t.length - e - 1) * (t.charCodeAt(e) - 64);
    return [r ? r - 1 : void 0, n ? +n - 1 : void 0];
  }
  async function mt(e) {
    const t = await fetch(await e.url());
    if (!t.ok) throw new Error(`Unable to load file: ${e.name}`);
    return t;
  }
  async function vt(e, t, { array: n = !1, typed: r = !1 } = {}) {
    const o = await e.text();
    return ("\t" === t ? (n ? ge : ye) : n ? _e : be)(o, r && xe);
  }
  class bt {
    constructor(e) {
      Object.defineProperty(this, "name", { value: e, enumerable: !0 });
    }
    async blob() {
      return (await mt(this)).blob();
    }
    async arrayBuffer() {
      return (await mt(this)).arrayBuffer();
    }
    async text() {
      return (await mt(this)).text();
    }
    async json() {
      return (await mt(this)).json();
    }
    async stream() {
      return (await mt(this)).body;
    }
    async csv(e) {
      return vt(this, ",", e);
    }
    async tsv(e) {
      return vt(this, "\t", e);
    }
    async image(e) {
      const t = await this.url();
      return new Promise((n, r) => {
        const o = new Image();
        new URL(t, document.baseURI).origin !== new URL(location).origin &&
          (o.crossOrigin = "anonymous"),
          Object.assign(o, e),
          (o.onload = () => n(o)),
          (o.onerror = () => r(new Error(`Unable to load file: ${this.name}`))),
          (o.src = t);
      });
    }
    async arrow() {
      const [e, t] = await Promise.all([ke(rt.resolve()), mt(this)]);
      return e.Table.from(t);
    }
    async sqlite() {
      return SQLiteDatabaseClient.open(mt(this));
    }
    async zip() {
      const [e, t] = await Promise.all([ke(Ke.resolve()), this.arrayBuffer()]);
      return new ZipArchive(await e.loadAsync(t));
    }
    async xml(e = "application/xml") {
      return new DOMParser().parseFromString(await this.text(), e);
    }
    async html() {
      return this.xml("text/html");
    }
    async xlsx() {
      const [e, t] = await Promise.all([ke(at.resolve()), this.arrayBuffer()]);
      return new Workbook(await new e.Workbook().xlsx.load(t));
    }
  }
  class FileAttachment extends bt {
    constructor(e, t) {
      super(t), Object.defineProperty(this, "_url", { value: e });
    }
    async url() {
      return (await this._url) + "";
    }
  }
  function _t(e) {
    throw new Error(`File not found: ${e}`);
  }
  class ZipArchive {
    constructor(e) {
      Object.defineProperty(this, "_", { value: e }),
        (this.filenames = Object.keys(e.files).filter((t) => !e.files[t].dir));
    }
    file(e) {
      const t = this._.file((e += ""));
      if (!t || t.dir) throw new Error(`file not found: ${e}`);
      return new ZipArchiveEntry(t);
    }
  }
  class ZipArchiveEntry extends bt {
    constructor(e) {
      super(e.name),
        Object.defineProperty(this, "_", { value: e }),
        Object.defineProperty(this, "_url", { writable: !0 });
    }
    async url() {
      return this._url || (this._url = this.blob().then(URL.createObjectURL));
    }
    async blob() {
      return this._.async("blob");
    }
    async arrayBuffer() {
      return this._.async("arraybuffer");
    }
    async text() {
      return this._.async("text");
    }
    async json() {
      return JSON.parse(await this.text());
    }
  }
  var wt = {
    math: "http://www.w3.org/1998/Math/MathML",
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
  };
  var yt = 0;
  function gt(e) {
    (this.id = e), (this.href = new URL(`#${e}`, location) + "");
  }
  gt.prototype.toString = function () {
    return "url(" + this.href + ")";
  };
  var xt = {
    canvas: function (e, t) {
      var n = document.createElement("canvas");
      return (n.width = e), (n.height = t), n;
    },
    context2d: function (e, t, n) {
      null == n && (n = devicePixelRatio);
      var r = document.createElement("canvas");
      (r.width = e * n), (r.height = t * n), (r.style.width = e + "px");
      var o = r.getContext("2d");
      return o.scale(n, n), o;
    },
    download: function (e, t = "untitled", n = "Save") {
      const r = document.createElement("a"),
        o = r.appendChild(document.createElement("button"));
      async function i() {
        await new Promise(requestAnimationFrame),
          URL.revokeObjectURL(r.href),
          r.removeAttribute("href"),
          (o.textContent = n),
          (o.disabled = !1);
      }
      return (
        (o.textContent = n),
        (r.download = t),
        (r.onclick = async (t) => {
          if (((o.disabled = !0), r.href)) return i();
          o.textContent = "Saving…";
          try {
            const t = await ("function" == typeof e ? e() : e);
            (o.textContent = "Download"), (r.href = URL.createObjectURL(t));
          } catch (e) {
            o.textContent = n;
          }
          if (t.eventPhase) return i();
          o.disabled = !1;
        }),
        r
      );
    },
    element: function (e, t) {
      var n,
        r = (e += ""),
        o = r.indexOf(":");
      o >= 0 && "xmlns" !== (r = e.slice(0, o)) && (e = e.slice(o + 1));
      var i = wt.hasOwnProperty(r)
        ? document.createElementNS(wt[r], e)
        : document.createElement(e);
      if (t)
        for (var a in t)
          (o = (r = a).indexOf(":")),
            (n = t[a]),
            o >= 0 && "xmlns" !== (r = a.slice(0, o)) && (a = a.slice(o + 1)),
            wt.hasOwnProperty(r)
              ? i.setAttributeNS(wt[r], a, n)
              : i.setAttribute(a, n);
      return i;
    },
    input: function (e) {
      var t = document.createElement("input");
      return null != e && (t.type = e), t;
    },
    range: function (e, t, n) {
      1 === arguments.length && ((t = e), (e = null));
      var r = document.createElement("input");
      return (
        (r.min = e = null == e ? 0 : +e),
        (r.max = t = null == t ? 1 : +t),
        (r.step = null == n ? "any" : (n = +n)),
        (r.type = "range"),
        r
      );
    },
    select: function (e) {
      var t = document.createElement("select");
      return (
        Array.prototype.forEach.call(e, function (e) {
          var n = document.createElement("option");
          (n.value = n.textContent = e), t.appendChild(n);
        }),
        t
      );
    },
    svg: function (e, t) {
      var n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      return (
        n.setAttribute("viewBox", [0, 0, e, t]),
        n.setAttribute("width", e),
        n.setAttribute("height", t),
        n
      );
    },
    text: function (e) {
      return document.createTextNode(e);
    },
    uid: function (e) {
      return new gt("O-" + (null == e ? "" : e + "-") + ++yt);
    },
  };
  var Et = {
    buffer: function (e) {
      return new Promise(function (t, n) {
        var r = new FileReader();
        (r.onload = function () {
          t(r.result);
        }),
          (r.onerror = n),
          r.readAsArrayBuffer(e);
      });
    },
    text: function (e) {
      return new Promise(function (t, n) {
        var r = new FileReader();
        (r.onload = function () {
          t(r.result);
        }),
          (r.onerror = n),
          r.readAsText(e);
      });
    },
    url: function (e) {
      return new Promise(function (t, n) {
        var r = new FileReader();
        (r.onload = function () {
          t(r.result);
        }),
          (r.onerror = n),
          r.readAsDataURL(e);
      });
    },
  };
  function Ct() {
    return this;
  }
  function jt(e, t) {
    let n = !1;
    if ("function" != typeof t) throw new Error("dispose is not a function");
    return {
      [Symbol.iterator]: Ct,
      next: () => (n ? { done: !0 } : ((n = !0), { done: !1, value: e })),
      return: () => ((n = !0), t(e), { done: !0 }),
      throw: () => ({ done: (n = !0) }),
    };
  }
  function Nt(e) {
    let t,
      n,
      r = !1;
    const o = e(function (e) {
      n ? (n(e), (n = null)) : (r = !0);
      return (t = e);
    });
    if (null != o && "function" != typeof o)
      throw new Error(
        "function" == typeof o.then
          ? "async initializers are not supported"
          : "initializer returned something, but not a dispose function"
      );
    return {
      [Symbol.iterator]: Ct,
      throw: () => ({ done: !0 }),
      return: () => (null != o && o(), { done: !0 }),
      next: function () {
        return {
          done: !1,
          value: r ? ((r = !1), Promise.resolve(t)) : new Promise((e) => (n = e)),
        };
      },
    };
  }
  function $t(e) {
    switch (e.type) {
      case "range":
      case "number":
        return e.valueAsNumber;
      case "date":
        return e.valueAsDate;
      case "checkbox":
        return e.checked;
      case "file":
        return e.multiple ? e.files : e.files[0];
      case "select-multiple":
        return Array.from(e.selectedOptions, (e) => e.value);
      default:
        return e.value;
    }
  }
  var Pt = {
    disposable: jt,
    filter: function* (e, t) {
      for (var n, r = -1; !(n = e.next()).done; )
        t(n.value, ++r) && (yield n.value);
    },
    input: function (e) {
      return Nt(function (t) {
        var n = (function (e) {
            switch (e.type) {
              case "button":
              case "submit":
              case "checkbox":
                return "click";
              case "file":
                return "change";
              default:
                return "input";
            }
          })(e),
          r = $t(e);
        function o() {
          t($t(e));
        }
        return (
          e.addEventListener(n, o),
          void 0 !== r && t(r),
          function () {
            e.removeEventListener(n, o);
          }
        );
      });
    },
    map: function* (e, t) {
      for (var n, r = -1; !(n = e.next()).done; ) yield t(n.value, ++r);
    },
    observe: Nt,
    queue: function (e) {
      let t;
      const n = [],
        r = e(function (e) {
          n.push(e), t && (t(n.shift()), (t = null));
          return e;
        });
      if (null != r && "function" != typeof r)
        throw new Error(
          "function" == typeof r.then
            ? "async initializers are not supported"
            : "initializer returned something, but not a dispose function"
        );
      return {
        [Symbol.iterator]: Ct,
        throw: () => ({ done: !0 }),
        return: () => (null != r && r(), { done: !0 }),
        next: function () {
          return {
            done: !1,
            value: n.length
              ? Promise.resolve(n.shift())
              : new Promise((e) => (t = e)),
          };
        },
      };
    },
    range: function* (e, t, n) {
      (e = +e),
        (t = +t),
        (n = (o = arguments.length) < 2 ? ((t = e), (e = 0), 1) : o < 3 ? 1 : +n);
      for (var r = -1, o = 0 | Math.max(0, Math.ceil((t - e) / n)); ++r < o; )
        yield e + r * n;
    },
    valueAt: function (e, t) {
      if (!(!isFinite((t = +t)) || t < 0 || (t != t) | 0))
        for (var n, r = -1; !(n = e.next()).done; ) if (++r === t) return n.value;
    },
    worker: function (e) {
      const t = URL.createObjectURL(new Blob([e], { type: "text/javascript" })),
        n = new Worker(t);
      return jt(n, () => {
        n.terminate(), URL.revokeObjectURL(t);
      });
    },
  };
  function qt(e, t) {
    return function (n) {
      var r,
        o,
        i,
        a,
        s,
        l,
        u,
        c,
        d = n[0],
        f = [],
        h = null,
        p = -1;
      for (s = 1, l = arguments.length; s < l; ++s) {
        if ((r = arguments[s]) instanceof Node)
          (f[++p] = r), (d += "\x3c!--o:" + p + "--\x3e");
        else if (Array.isArray(r)) {
          for (u = 0, c = r.length; u < c; ++u)
            (o = r[u]) instanceof Node
              ? (null === h &&
                  ((f[++p] = h = document.createDocumentFragment()),
                  (d += "\x3c!--o:" + p + "--\x3e")),
                h.appendChild(o))
              : ((h = null), (d += o));
          h = null;
        } else d += r;
        d += n[s];
      }
      if (((h = e(d)), ++p > 0)) {
        for (
          i = new Array(p),
            a = document.createTreeWalker(h, NodeFilter.SHOW_COMMENT, null, !1);
          a.nextNode();
  
        )
          (o = a.currentNode),
            /^o:/.test(o.nodeValue) && (i[+o.nodeValue.slice(2)] = o);
        for (s = 0; s < p; ++s) (o = i[s]) && o.parentNode.replaceChild(f[s], o);
      }
      return 1 === h.childNodes.length
        ? h.removeChild(h.firstChild)
        : 11 === h.nodeType
        ? ((o = t()).appendChild(h), o)
        : h;
    };
  }
  var St = qt(
    function (e) {
      var t = document.createElement("template");
      return (t.innerHTML = e.trim()), document.importNode(t.content, !0);
    },
    function () {
      return document.createElement("span");
    }
  );
  function At(e) {
    let t;
    Object.defineProperties(this, {
      generator: {
        value: Nt((e) => {
          t = e;
        }),
      },
      value: { get: () => e, set: (n) => t((e = n)) },
    }),
      void 0 !== e && t(e);
  }
  function* Ot() {
    for (;;) yield Date.now();
  }
  var Tt = new Map();
  function Mt(e, t) {
    var n;
    return (n = Tt.get((e = +e)))
      ? n.then(() => t)
      : (n = Date.now()) >= e
      ? Promise.resolve(t)
      : (function (e, t) {
          var n = new Promise(function (n) {
            Tt.delete(t);
            var r = t - e;
            if (!(r > 0)) throw new Error("invalid time");
            if (r > 2147483647) throw new Error("too long to wait");
            setTimeout(n, r);
          });
          return Tt.set(t, n), n;
        })(n, e).then(() => t);
  }
  var Lt = {
    delay: function (e, t) {
      return new Promise(function (n) {
        setTimeout(function () {
          n(t);
        }, e);
      });
    },
    tick: function (e, t) {
      return Mt(Math.ceil((Date.now() + 1) / e) * e, t);
    },
    when: Mt,
  };
  function kt(e, t) {
    if (/^(\w+:)|\/\//i.test(e)) return e;
    if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href;
    if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e))
      throw new Error("illegal name");
    return "https://unpkg.com/" + e;
  }
  function Ut(e) {
    return null == e ? ke : Ue(e);
  }
  var Rt = qt(
      function (e) {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "g");
        return (t.innerHTML = e.trim()), t;
      },
      function () {
        return document.createElementNS("http://www.w3.org/2000/svg", "g");
      }
    ),
    Dt = String.raw;
  function Ft() {
    return Nt(function (e) {
      var t = e(document.body.clientWidth);
      function n() {
        var n = document.body.clientWidth;
        n !== t && e((t = n));
      }
      return (
        window.addEventListener("resize", n),
        function () {
          window.removeEventListener("resize", n);
        }
      );
    });
  }
  var It = Object.assign(
    function (e) {
      const t = Ut(e);
      var n;
      Object.defineProperties(
        this,
        ((n = {
          FileAttachment: () => _t,
          Arrow: () => t(rt.resolve()),
          Inputs: () =>
            t(He.resolve()).then((e) => ({ ...e, file: e.fileOf(bt) })),
          Mutable: () => At,
          Plot: () => t(We.resolve()),
          SQLite: () => st(t),
          SQLiteDatabaseClient: () => SQLiteDatabaseClient,
          _: () => t(Ye.resolve()),
          aq: () => t.alias({ "apache-arrow": rt.resolve() })(ot.resolve()),
          d3: () => t(Be.resolve()),
          dot: () => t(Ze.resolve()),
          htl: () => t(Ge.resolve()),
          html: () => St,
          md: () =>
            (function (e) {
              return e(Qe.resolve()).then(function (t) {
                return qt(
                  function (n) {
                    var r = document.createElement("div");
                    r.innerHTML = t(n, { langPrefix: "" }).trim();
                    var o = r.querySelectorAll("pre code[class]");
                    return (
                      o.length > 0 &&
                        e(Ve.resolve()).then(function (t) {
                          o.forEach(function (n) {
                            function r() {
                              t.highlightBlock(n),
                                n.parentNode.classList.add(
                                  "observablehq--md-pre"
                                );
                            }
                            t.getLanguage(n.className)
                              ? r()
                              : e(Ve.resolve("async-languages/index.js"))
                                  .then((r) => {
                                    if (r.has(n.className))
                                      return e(
                                        Ve.resolve(
                                          "async-languages/" + r.get(n.className)
                                        )
                                      ).then((e) => {
                                        t.registerLanguage(n.className, e);
                                      });
                                  })
                                  .then(r, r);
                          });
                        }),
                      r
                    );
                  },
                  function () {
                    return document.createElement("div");
                  }
                );
              });
            })(t),
          now: Ot,
          require: () => t,
          resolve: () => kt,
          svg: () => Rt,
          tex: () =>
            (function (e) {
              return Promise.all([
                e(Je.resolve()),
                ((t = Je.resolve("dist/katex.min.css")),
                new Promise(function (e, n) {
                  var r = document.createElement("link");
                  (r.rel = "stylesheet"),
                    (r.href = t),
                    (r.onerror = n),
                    (r.onload = e),
                    document.head.appendChild(r);
                })),
              ]).then(function (e) {
                var t = e[0],
                  n = r();
                function r(e) {
                  return function () {
                    var n = document.createElement("div");
                    return (
                      t.render(Dt.apply(String, arguments), n, e),
                      n.removeChild(n.firstChild)
                    );
                  };
                }
                return (n.options = r), (n.block = r({ displayMode: !0 })), n;
              });
              var t;
            })(t),
          topojson: () => t(it.resolve()),
          vl: () =>
            (async function (e) {
              const [t, n, r] = await Promise.all(
                [et, tt, nt].map((t) => e(t.resolve()))
              );
              return r.register(t, n);
            })(t),
          width: Ft,
          DOM: xt,
          Files: Et,
          Generators: Pt,
          Promises: Lt,
        }),
        Object.fromEntries(Object.entries(n).map(zt)))
      );
    },
    { resolve: ke.resolve }
  );
  function zt([e, t]) {
    return [e, { value: t, writable: !0, enumerable: !0 }];
  }
  function Bt(e, t) {
    (this.message = e + ""), (this.input = t);
  }
  (Bt.prototype = Object.create(Error.prototype)),
    (Bt.prototype.name = "RuntimeError"),
    (Bt.prototype.constructor = Bt);
  var Ht = Array.prototype,
    Wt = Ht.map,
    Zt = Ht.forEach;
  function Vt(e) {
    return function () {
      return e;
    };
  }
  function Jt(e) {
    return e;
  }
  function Yt() {}
  var Gt = {};
  function Kt(e, t, n) {
    var r;
    n || (n = Gt),
      Object.defineProperties(this, {
        _observer: { value: n, writable: !0 },
        _definition: { value: en, writable: !0 },
        _duplicate: { value: void 0, writable: !0 },
        _duplicates: { value: void 0, writable: !0 },
        _indegree: { value: NaN, writable: !0 },
        _inputs: { value: [], writable: !0 },
        _invalidate: { value: Yt, writable: !0 },
        _module: { value: t },
        _name: { value: null, writable: !0 },
        _outputs: { value: new Set(), writable: !0 },
        _promise: { value: Promise.resolve(void 0), writable: !0 },
        _reachable: { value: n !== Gt, writable: !0 },
        _rejector: {
          value:
            ((r = this),
            function (e) {
              if (e === en) throw new Bt(r._name + " is not defined", r._name);
              if (e instanceof Error && e.message)
                throw new Bt(e.message, r._name);
              throw new Bt(r._name + " could not be resolved", r._name);
            }),
        },
        _type: { value: e },
        _value: { value: void 0, writable: !0 },
        _version: { value: 0, writable: !0 },
      });
  }
  function Qt(e) {
    e._module._runtime._dirty.add(e), e._outputs.add(this);
  }
  function Xt(e) {
    e._module._runtime._dirty.add(e), e._outputs.delete(this);
  }
  function en() {
    throw en;
  }
  function tn(e) {
    return function () {
      throw new Bt(e + " is defined more than once");
    };
  }
  function nn(e, t, n) {
    var r = this._module._scope,
      o = this._module._runtime;
    if (
      (this._inputs.forEach(Xt, this),
      t.forEach(Qt, this),
      (this._inputs = t),
      (this._definition = n),
      (this._value = void 0),
      n === Yt ? o._variables.delete(this) : o._variables.add(this),
      e !== this._name || r.get(e) !== this)
    ) {
      var i, a;
      if (this._name)
        if (this._outputs.size)
          r.delete(this._name),
            ((a = this._module._resolve(this._name))._outputs = this._outputs),
            (this._outputs = new Set()),
            a._outputs.forEach(function (e) {
              e._inputs[e._inputs.indexOf(this)] = a;
            }, this),
            a._outputs.forEach(o._updates.add, o._updates),
            o._dirty.add(a).add(this),
            r.set(this._name, a);
        else if ((a = r.get(this._name)) === this) r.delete(this._name);
        else {
          if (3 !== a._type) throw new Error();
          a._duplicates.delete(this),
            (this._duplicate = void 0),
            1 === a._duplicates.size &&
              ((a = a._duplicates.keys().next().value),
              (i = r.get(this._name)),
              (a._outputs = i._outputs),
              (i._outputs = new Set()),
              a._outputs.forEach(function (e) {
                e._inputs[e._inputs.indexOf(i)] = a;
              }),
              (a._definition = a._duplicate),
              (a._duplicate = void 0),
              o._dirty.add(i).add(a),
              o._updates.add(a),
              r.set(this._name, a));
        }
      if (this._outputs.size) throw new Error();
      e &&
        ((a = r.get(e))
          ? 3 === a._type
            ? ((this._definition = tn(e)),
              (this._duplicate = n),
              a._duplicates.add(this))
            : 2 === a._type
            ? ((this._outputs = a._outputs),
              (a._outputs = new Set()),
              this._outputs.forEach(function (e) {
                e._inputs[e._inputs.indexOf(a)] = this;
              }, this),
              o._dirty.add(a).add(this),
              r.set(e, this))
            : ((a._duplicate = a._definition),
              (this._duplicate = n),
              ((i = new Kt(3, this._module))._name = e),
              (i._definition = this._definition = a._definition = tn(e)),
              (i._outputs = a._outputs),
              (a._outputs = new Set()),
              i._outputs.forEach(function (e) {
                e._inputs[e._inputs.indexOf(a)] = i;
              }),
              (i._duplicates = new Set([this, a])),
              o._dirty.add(a).add(i),
              o._updates.add(a).add(i),
              r.set(e, i))
          : r.set(e, this)),
        (this._name = e);
    }
    return o._updates.add(this), o._compute(), this;
  }
  function rn(e, t = []) {
    Object.defineProperties(this, {
      _runtime: { value: e },
      _scope: { value: new Map() },
      _builtins: {
        value: new Map([["invalidation", sn], ["visibility", ln], ...t]),
      },
      _source: { value: null, writable: !0 },
    });
  }
  function on(e) {
    return e._name;
  }
  Object.defineProperties(Kt.prototype, {
    _pending: {
      value: function () {
        this._observer.pending && this._observer.pending();
      },
      writable: !0,
      configurable: !0,
    },
    _fulfilled: {
      value: function (e) {
        this._observer.fulfilled && this._observer.fulfilled(e, this._name);
      },
      writable: !0,
      configurable: !0,
    },
    _rejected: {
      value: function (e) {
        this._observer.rejected && this._observer.rejected(e, this._name);
      },
      writable: !0,
      configurable: !0,
    },
    define: {
      value: function (e, t, n) {
        switch (arguments.length) {
          case 1:
            (n = e), (e = t = null);
            break;
          case 2:
            (n = t), "string" == typeof e ? (t = null) : ((t = e), (e = null));
        }
        return nn.call(
          this,
          null == e ? null : e + "",
          null == t ? [] : Wt.call(t, this._module._resolve, this._module),
          "function" == typeof n ? n : Vt(n)
        );
      },
      writable: !0,
      configurable: !0,
    },
    delete: {
      value: function () {
        return nn.call(this, null, [], Yt);
      },
      writable: !0,
      configurable: !0,
    },
    import: {
      value: function (e, t, n) {
        arguments.length < 3 && ((n = t), (t = e));
        return nn.call(this, t + "", [n._resolve(e + "")], Jt);
      },
      writable: !0,
      configurable: !0,
    },
  }),
    Object.defineProperties(rn.prototype, {
      _copy: {
        value: function (e, t) {
          (e._source = this), t.set(this, e);
          for (const [i, a] of this._scope) {
            var n = e._scope.get(i);
            if (!n || 1 !== n._type)
              if (a._definition === Jt) {
                var r = a._inputs[0],
                  o = r._module;
                e.import(
                  r._name,
                  i,
                  t.get(o) ||
                    (o._source ? o._copy(new rn(e._runtime, e._builtins), t) : o)
                );
              } else e.define(i, a._inputs.map(on), a._definition);
          }
          return e;
        },
        writable: !0,
        configurable: !0,
      },
      _resolve: {
        value: function (e) {
          var t,
            n = this._scope.get(e);
          if (!n)
            if (((n = new Kt(2, this)), this._builtins.has(e)))
              n.define(e, Vt(this._builtins.get(e)));
            else if (this._runtime._builtin._scope.has(e))
              n.import(e, this._runtime._builtin);
            else {
              try {
                t = this._runtime._global(e);
              } catch (t) {
                return n.define(
                  e,
                  ((r = t),
                  function () {
                    throw r;
                  })
                );
              }
              void 0 === t
                ? this._scope.set((n._name = e), n)
                : n.define(e, Vt(t));
            }
          var r;
          return n;
        },
        writable: !0,
        configurable: !0,
      },
      redefine: {
        value: function (e) {
          var t = this._scope.get(e);
          if (!t) throw new Bt(e + " is not defined");
          if (3 === t._type) throw new Bt(e + " is defined more than once");
          return t.define.apply(t, arguments);
        },
        writable: !0,
        configurable: !0,
      },
      define: {
        value: function () {
          var e = new Kt(1, this);
          return e.define.apply(e, arguments);
        },
        writable: !0,
        configurable: !0,
      },
      derive: {
        value: function (e, t) {
          var n = new rn(this._runtime, this._builtins);
          return (
            (n._source = this),
            Zt.call(e, function (e) {
              "object" != typeof e && (e = { name: e + "" }),
                null == e.alias && (e.alias = e.name),
                n.import(e.name, e.alias, t);
            }),
            Promise.resolve().then(() => {
              const e = new Set([this]);
              for (const t of e)
                for (const n of t._scope.values())
                  if (n._definition === Jt) {
                    const t = n._inputs[0]._module,
                      r = t._source || t;
                    if (r === this)
                      return void console.warn(
                        "circular module definition; ignoring"
                      );
                    e.add(r);
                  }
              this._copy(n, new Map());
            }),
            n
          );
        },
        writable: !0,
        configurable: !0,
      },
      import: {
        value: function () {
          var e = new Kt(1, this);
          return e.import.apply(e, arguments);
        },
        writable: !0,
        configurable: !0,
      },
      value: {
        value: async function (e) {
          var t = this._scope.get(e);
          if (!t) throw new Bt(e + " is not defined");
          t._observer === Gt && ((t._observer = !0), this._runtime._dirty.add(t));
          return await this._runtime._compute(), t._promise;
        },
        writable: !0,
        configurable: !0,
      },
      variable: {
        value: function (e) {
          return new Kt(1, this, e);
        },
        writable: !0,
        configurable: !0,
      },
      builtin: {
        value: function (e, t) {
          this._builtins.set(e, t);
        },
        writable: !0,
        configurable: !0,
      },
    });
  const an =
    "function" == typeof requestAnimationFrame
      ? requestAnimationFrame
      : setImmediate;
  var sn = {},
    ln = {};
  function un(e = new It(), t = _n) {
    var n = this.module();
    if (
      (Object.defineProperties(this, {
        _dirty: { value: new Set() },
        _updates: { value: new Set() },
        _precomputes: { value: [], writable: !0 },
        _computing: { value: null, writable: !0 },
        _init: { value: null, writable: !0 },
        _modules: { value: new Map() },
        _variables: { value: new Set() },
        _disposed: { value: !1, writable: !0 },
        _builtin: { value: n },
        _global: { value: t },
      }),
      e)
    )
      for (var r in e) new Kt(2, n).define(r, [], e[r]);
  }
  function cn(e) {
    const t = new Set(e._inputs);
    for (const n of t) {
      if (n === e) return !0;
      n._inputs.forEach(t.add, t);
    }
    return !1;
  }
  function dn(e) {
    ++e._indegree;
  }
  function fn(e) {
    --e._indegree;
  }
  function hn(e) {
    return e._promise.catch(e._rejector);
  }
  function pn(e) {
    return new Promise(function (t) {
      e._invalidate = t;
    });
  }
  function mn(e, t) {
    let n,
      r,
      o =
        "function" == typeof IntersectionObserver &&
        t._observer &&
        t._observer._node,
      i = !o,
      a = Yt,
      s = Yt;
    return (
      o &&
        ((r = new IntersectionObserver(
          ([e]) => (i = e.isIntersecting) && ((n = null), a())
        )),
        r.observe(o),
        e.then(() => (r.disconnect(), (r = null), s()))),
      function (e) {
        return i
          ? Promise.resolve(e)
          : r
          ? (n || (n = new Promise((e, t) => ((a = e), (s = t)))),
            n.then(() => e))
          : Promise.reject();
      }
    );
  }
  function vn(e) {
    e._invalidate(), (e._invalidate = Yt), e._pending();
    const t = e._value,
      n = ++e._version;
    let r = null;
    const o = (e._promise = (
      e._inputs.length
        ? Promise.all(e._inputs.map(hn)).then(function (o) {
            if (e._version !== n) return;
            for (var i = 0, a = o.length; i < a; ++i)
              switch (o[i]) {
                case sn:
                  o[i] = r = pn(e);
                  break;
                case ln:
                  r || (r = pn(e)), (o[i] = mn(r, e));
              }
            return e._definition.apply(t, o);
          })
        : new Promise((n) => n(e._definition.call(t)))
    ).then(function (t) {
      if (
        (function (e) {
          return (
            e && "function" == typeof e.next && "function" == typeof e.return
          );
        })(t)
      )
        return e._version !== n
          ? void t.return()
          : ((r || pn(e)).then(
              ((o = t),
              function () {
                o.return();
              })
            ),
            (function (e, t, n) {
              const r = e._module._runtime;
              function o(e) {
                return new Promise((e) => e(n.next())).then(
                  ({ done: t, value: n }) =>
                    t ? void 0 : Promise.resolve(n).then(e)
                );
              }
              function i() {
                const n = o((o) => {
                  if (e._version === t)
                    return (
                      a(o, n).then(() => r._precompute(i)), e._fulfilled(o), o
                    );
                });
                n.catch((r) => {
                  e._version === t && (a(void 0, n), e._rejected(r));
                });
              }
              function a(t, n) {
                return (
                  (e._value = t),
                  (e._promise = n),
                  e._outputs.forEach(r._updates.add, r._updates),
                  r._compute()
                );
              }
              return o((n) => {
                if (e._version === t) return r._precompute(i), n;
              });
            })(e, n, t));
      var o;
      return t;
    }));
    o.then(
      (t) => {
        e._version === n && ((e._value = t), e._fulfilled(t));
      },
      (t) => {
        e._version === n && ((e._value = void 0), e._rejected(t));
      }
    );
  }
  function bn(e, t) {
    e._invalidate(),
      (e._invalidate = Yt),
      e._pending(),
      ++e._version,
      (e._indegree = NaN),
      (e._promise = Promise.reject(t)).catch(Yt),
      (e._value = void 0),
      e._rejected(t);
  }
  function _n(e) {
    return window[e];
  }
  Object.defineProperties(un, {
    load: {
      value: function (e, t, n) {
        if (
          ("function" == typeof t && ((n = t), (t = null)),
          "function" != typeof n)
        )
          throw new Error("invalid observer");
        null == t && (t = new It());
        const { modules: r, id: o } = e,
          i = new Map(),
          a = new un(t),
          s = l(o);
        function l(e) {
          let t = i.get(e);
          return t || i.set(e, (t = a.module())), t;
        }
        for (const e of r) {
          const t = l(e.id);
          let r = 0;
          for (const o of e.variables)
            o.from
              ? t.import(o.remote, o.name, l(o.from))
              : t === s
              ? t.variable(n(o, r, e.variables)).define(o.name, o.inputs, o.value)
              : t.define(o.name, o.inputs, o.value),
              ++r;
        }
        return a;
      },
      writable: !0,
      configurable: !0,
    },
  }),
    Object.defineProperties(un.prototype, {
      _precompute: {
        value: function (e) {
          this._precomputes.push(e), this._compute();
        },
        writable: !0,
        configurable: !0,
      },
      _compute: {
        value: function () {
          return this._computing || (this._computing = this._computeSoon());
        },
        writable: !0,
        configurable: !0,
      },
      _computeSoon: {
        value: function () {
          return new Promise(an).then(() =>
            this._disposed ? void 0 : this._computeNow()
          );
        },
        writable: !0,
        configurable: !0,
      },
      _computeNow: {
        value: async function () {
          var e,
            t,
            n = [],
            r = this._precomputes;
          if (r.length) {
            this._precomputes = [];
            for (const e of r) e();
            await (function (e = 0) {
              let t = Promise.resolve();
              for (let n = 0; n < e; ++n) t = t.then(() => {});
              return t;
            })(3);
          }
          (e = new Set(this._dirty)).forEach(function (t) {
            t._inputs.forEach(e.add, e);
            const n = (function (e) {
              if (e._observer !== Gt) return !0;
              var t = new Set(e._outputs);
              for (const e of t) {
                if (e._observer !== Gt) return !0;
                e._outputs.forEach(t.add, t);
              }
              return !1;
            })(t);
            n > t._reachable
              ? this._updates.add(t)
              : n < t._reachable && t._invalidate(),
              (t._reachable = n);
          }, this),
            (e = new Set(this._updates)).forEach(function (t) {
              t._reachable
                ? ((t._indegree = 0), t._outputs.forEach(e.add, e))
                : ((t._indegree = NaN), e.delete(t));
            }),
            (this._computing = null),
            this._updates.clear(),
            this._dirty.clear(),
            e.forEach(function (e) {
              e._outputs.forEach(dn);
            });
          do {
            for (
              e.forEach(function (e) {
                0 === e._indegree && n.push(e);
              });
              (t = n.pop());
  
            )
              vn(t), t._outputs.forEach(o), e.delete(t);
            e.forEach(function (t) {
              cn(t) &&
                (bn(t, new Bt("circular definition")),
                t._outputs.forEach(fn),
                e.delete(t));
            });
          } while (e.size);
          function o(e) {
            0 == --e._indegree && n.push(e);
          }
        },
        writable: !0,
        configurable: !0,
      },
      dispose: {
        value: function () {
          (this._computing = Promise.resolve()),
            (this._disposed = !0),
            this._variables.forEach((e) => {
              e._invalidate(), (e._version = NaN);
            });
        },
        writable: !0,
        configurable: !0,
      },
      module: {
        value: function (e, t = Yt) {
          let n;
          if (void 0 === e)
            return (n = this._init) ? ((this._init = null), n) : new rn(this);
          if (((n = this._modules.get(e)), n)) return n;
          (this._init = n = new rn(this)), this._modules.set(e, n);
          try {
            e(this, t);
          } finally {
            this._init = null;
          }
          return n;
        },
        writable: !0,
        configurable: !0,
      },
      fileAttachments: {
        value: function (e) {
          return Object.assign(
            (t) => {
              const n = e((t += ""));
              if (null == n) throw new Error(`File not found: ${t}`);
              return new FileAttachment(n, t);
            },
            { prototype: FileAttachment.prototype }
          );
        },
        writable: !0,
        configurable: !0,
      },
    });
  export { le as Inspector, It as Library, un as Runtime, Bt as RuntimeError };
  