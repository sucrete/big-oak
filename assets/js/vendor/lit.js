/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window,
  i =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  s = Symbol(),
  e = new WeakMap();
class o {
  constructor(t, i, e) {
    if (((this._$cssResult$ = !0), e !== s))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    (this.cssText = t), (this.t = i);
  }
  get styleSheet() {
    let t = this.i;
    const s = this.t;
    if (i && void 0 === t) {
      const i = void 0 !== s && 1 === s.length;
      i && (t = e.get(s)),
        void 0 === t &&
          ((this.i = t = new CSSStyleSheet()).replaceSync(this.cssText),
          i && e.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const n = (t) => new o("string" == typeof t ? t : t + "", void 0, s),
  r = (t, ...i) => {
    const e =
      1 === t.length
        ? t[0]
        : i.reduce(
            (i, s, e) =>
              i +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ("number" == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(s) +
              t[e + 1],
            t[0]
          );
    return new o(e, t, s);
  },
  h = (s, e) => {
    i
      ? (s.adoptedStyleSheets = e.map((t) =>
          t instanceof CSSStyleSheet ? t : t.styleSheet
        ))
      : e.forEach((i) => {
          const e = document.createElement("style"),
            o = t.litNonce;
          void 0 !== o && e.setAttribute("nonce", o),
            (e.textContent = i.cssText),
            s.appendChild(e);
        });
  },
  l = i
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let i = "";
              for (const s of t.cssRules) i += s.cssText;
              return n(i);
            })(t)
          : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var a;
const u = window,
  c = u.trustedTypes,
  d = c ? c.emptyScript : "",
  v = u.reactiveElementPolyfillSupport,
  p = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? d : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  f = (t, i) => i !== t && (i == i || t == t),
  m = { attribute: !0, type: String, converter: p, reflect: !1, hasChanged: f },
  _ = "finalized";
class y extends HTMLElement {
  constructor() {
    super(),
      (this.o = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this.l = null),
      this.u();
  }
  static addInitializer(t) {
    var i;
    this.finalize(),
      (null !== (i = this.v) && void 0 !== i ? i : (this.v = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((i, s) => {
        const e = this.p(s, i);
        void 0 !== e && (this.m.set(e, s), t.push(e));
      }),
      t
    );
  }
  static createProperty(t, i = m) {
    if (
      (i.state && (i.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, i),
      !i.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const o = this[t];
        (this[i] = e), this.requestUpdate(t, o, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || m;
  }
  static finalize() {
    if (this.hasOwnProperty(_)) return !1;
    this[_] = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      void 0 !== t.v && (this.v = [...t.v]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this.m = new Map()),
      this.hasOwnProperty("properties"))
    ) {
      const t = this.properties,
        i = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) i.unshift(l(t));
    } else void 0 !== t && i.push(l(t));
    return i;
  }
  static p(t, i) {
    const s = i.attribute;
    return !1 === s
      ? void 0
      : "string" == typeof s
      ? s
      : "string" == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  u() {
    var t;
    (this._ = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this.g(),
      this.requestUpdate(),
      null === (t = this.constructor.v) ||
        void 0 === t ||
        t.forEach((t) => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this.S) && void 0 !== i ? i : (this.S = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this.S) ||
      void 0 === i ||
      i.splice(this.S.indexOf(t) >>> 0, 1);
  }
  g() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this.o.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const i =
      null !== (t = this.shadowRoot) && void 0 !== t
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return h(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this.S) ||
        void 0 === t ||
        t.forEach((t) => {
          var i;
          return null === (i = t.hostConnected) || void 0 === i
            ? void 0
            : i.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this.S) ||
      void 0 === t ||
      t.forEach((t) => {
        var i;
        return null === (i = t.hostDisconnected) || void 0 === i
          ? void 0
          : i.call(t);
      });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  $(t, i, s = m) {
    var e;
    const o = this.constructor.p(t, s);
    if (void 0 !== o && !0 === s.reflect) {
      const n = (
        void 0 !==
        (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute)
          ? s.converter
          : p
      ).toAttribute(i, s.type);
      (this.l = t),
        null == n ? this.removeAttribute(o) : this.setAttribute(o, n),
        (this.l = null);
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      o = e.m.get(t);
    if (void 0 !== o && this.l !== o) {
      const t = e.getPropertyOptions(o),
        n =
          "function" == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !==
              (null === (s = t.converter) || void 0 === s
                ? void 0
                : s.fromAttribute)
            ? t.converter
            : p;
      (this.l = o), (this[o] = n.fromAttribute(i, t.type)), (this.l = null);
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || f)(
        this[t],
        i
      )
        ? (this._$AL.has(t) || this._$AL.set(t, i),
          !0 === s.reflect &&
            this.l !== t &&
            (void 0 === this.C && (this.C = new Map()), this.C.set(t, s)))
        : (e = !1)),
      !this.isUpdatePending && e && (this._ = this.T());
  }
  async T() {
    this.isUpdatePending = !0;
    try {
      await this._;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this.o && (this.o.forEach((t, i) => (this[i] = t)), (this.o = void 0));
    let i = !1;
    const s = this._$AL;
    try {
      (i = this.shouldUpdate(s)),
        i
          ? (this.willUpdate(s),
            null === (t = this.S) ||
              void 0 === t ||
              t.forEach((t) => {
                var i;
                return null === (i = t.hostUpdate) || void 0 === i
                  ? void 0
                  : i.call(t);
              }),
            this.update(s))
          : this.P();
    } catch (t) {
      throw ((i = !1), this.P(), t);
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this.S) ||
      void 0 === i ||
      i.forEach((t) => {
        var i;
        return null === (i = t.hostUpdated) || void 0 === i
          ? void 0
          : i.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  P() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this.C &&
      (this.C.forEach((t, i) => this.$(i, this[i], t)), (this.C = void 0)),
      this.P();
  }
  updated(t) {}
  firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var b;
(y[_] = !0),
  (y.elementProperties = new Map()),
  (y.elementStyles = []),
  (y.shadowRootOptions = { mode: "open" }),
  null == v || v({ ReactiveElement: y }),
  (null !== (a = u.reactiveElementVersions) && void 0 !== a
    ? a
    : (u.reactiveElementVersions = [])
  ).push("1.6.3");
const g = window,
  w = g.trustedTypes,
  S = w ? w.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
  $ = "$lit$",
  C = `lit$${(Math.random() + "").slice(9)}$`,
  T = "?" + C,
  P = `<${T}>`,
  x = document,
  A = () => x.createComment(""),
  k = (t) => null === t || ("object" != typeof t && "function" != typeof t),
  E = Array.isArray,
  M = (t) =>
    E(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
  U = "[ \t\n\f\r]",
  N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  R = /-->/g,
  O = />/g,
  V = RegExp(
    `>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    "g"
  ),
  j = /'/g,
  z = /"/g,
  L = /^(?:script|style|textarea|title)$/i,
  I =
    (t) =>
    (i, ...s) => ({ _$litType$: t, strings: i, values: s }),
  H = I(1),
  B = I(2),
  D = Symbol.for("lit-noChange"),
  q = Symbol.for("lit-nothing"),
  J = new WeakMap(),
  W = x.createTreeWalker(x, 129, null, !1);
function Z(t, i) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== S ? S.createHTML(i) : i;
}
const F = (t, i) => {
  const s = t.length - 1,
    e = [];
  let o,
    n = 2 === i ? "<svg>" : "",
    r = N;
  for (let i = 0; i < s; i++) {
    const s = t[i];
    let h,
      l,
      a = -1,
      u = 0;
    for (; u < s.length && ((r.lastIndex = u), (l = r.exec(s)), null !== l); )
      (u = r.lastIndex),
        r === N
          ? "!--" === l[1]
            ? (r = R)
            : void 0 !== l[1]
            ? (r = O)
            : void 0 !== l[2]
            ? (L.test(l[2]) && (o = RegExp("</" + l[2], "g")), (r = V))
            : void 0 !== l[3] && (r = V)
          : r === V
          ? ">" === l[0]
            ? ((r = null != o ? o : N), (a = -1))
            : void 0 === l[1]
            ? (a = -2)
            : ((a = r.lastIndex - l[2].length),
              (h = l[1]),
              (r = void 0 === l[3] ? V : '"' === l[3] ? z : j))
          : r === z || r === j
          ? (r = V)
          : r === R || r === O
          ? (r = N)
          : ((r = V), (o = void 0));
    const c = r === V && t[i + 1].startsWith("/>") ? " " : "";
    n +=
      r === N
        ? s + P
        : a >= 0
        ? (e.push(h), s.slice(0, a) + $ + s.slice(a) + C + c)
        : s + C + (-2 === a ? (e.push(void 0), i) : c);
  }
  return [Z(t, n + (t[s] || "<?>") + (2 === i ? "</svg>" : "")), e];
};
class G {
  constructor({ strings: t, _$litType$: i }, s) {
    let e;
    this.parts = [];
    let o = 0,
      n = 0;
    const r = t.length - 1,
      h = this.parts,
      [l, a] = F(t, i);
    if (
      ((this.el = G.createElement(l, s)),
      (W.currentNode = this.el.content),
      2 === i)
    ) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (e = W.nextNode()) && h.length < r; ) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) {
          const t = [];
          for (const i of e.getAttributeNames())
            if (i.endsWith($) || i.startsWith(C)) {
              const s = a[n++];
              if ((t.push(i), void 0 !== s)) {
                const t = e.getAttribute(s.toLowerCase() + $).split(C),
                  i = /([.?@])?(.*)/.exec(s);
                h.push({
                  type: 1,
                  index: o,
                  name: i[2],
                  strings: t,
                  ctor:
                    "." === i[1]
                      ? tt
                      : "?" === i[1]
                      ? st
                      : "@" === i[1]
                      ? et
                      : Y,
                });
              } else h.push({ type: 6, index: o });
            }
          for (const i of t) e.removeAttribute(i);
        }
        if (L.test(e.tagName)) {
          const t = e.textContent.split(C),
            i = t.length - 1;
          if (i > 0) {
            e.textContent = w ? w.emptyScript : "";
            for (let s = 0; s < i; s++)
              e.append(t[s], A()),
                W.nextNode(),
                h.push({ type: 2, index: ++o });
            e.append(t[i], A());
          }
        }
      } else if (8 === e.nodeType)
        if (e.data === T) h.push({ type: 2, index: o });
        else {
          let t = -1;
          for (; -1 !== (t = e.data.indexOf(C, t + 1)); )
            h.push({ type: 7, index: o }), (t += C.length - 1);
        }
      o++;
    }
  }
  static createElement(t, i) {
    const s = x.createElement("template");
    return (s.innerHTML = t), s;
  }
}
function K(t, i, s = t, e) {
  var o, n, r, h;
  if (i === D) return i;
  let l =
    void 0 !== e ? (null === (o = s.A) || void 0 === o ? void 0 : o[e]) : s.k;
  const a = k(i) ? void 0 : i._$litDirective$;
  return (
    (null == l ? void 0 : l.constructor) !== a &&
      (null === (n = null == l ? void 0 : l._$AO) ||
        void 0 === n ||
        n.call(l, !1),
      void 0 === a ? (l = void 0) : ((l = new a(t)), l._$AT(t, s, e)),
      void 0 !== e
        ? ((null !== (r = (h = s).A) && void 0 !== r ? r : (h.A = []))[e] = l)
        : (s.k = l)),
    void 0 !== l && (i = K(t, l._$AS(t, i.values), l, e)),
    i
  );
}
class Q {
  constructor(t, i) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  M(t) {
    var i;
    const {
        el: { content: s },
        parts: e,
      } = this._$AD,
      o = (
        null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i
          ? i
          : x
      ).importNode(s, !0);
    W.currentNode = o;
    let n = W.nextNode(),
      r = 0,
      h = 0,
      l = e[0];
    for (; void 0 !== l; ) {
      if (r === l.index) {
        let i;
        2 === l.type
          ? (i = new X(n, n.nextSibling, this, t))
          : 1 === l.type
          ? (i = new l.ctor(n, l.name, l.strings, this, t))
          : 6 === l.type && (i = new ot(n, this, t)),
          this._$AV.push(i),
          (l = e[++h]);
      }
      r !== (null == l ? void 0 : l.index) && ((n = W.nextNode()), r++);
    }
    return (W.currentNode = x), o;
  }
  U(t) {
    let i = 0;
    for (const s of this._$AV)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, i), (i += s.strings.length - 2))
          : s._$AI(t[i])),
        i++;
  }
}
class X {
  constructor(t, i, s, e) {
    var o;
    (this.type = 2),
      (this._$AH = q),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this.N =
        null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o);
  }
  get _$AU() {
    var t, i;
    return null !==
      (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== i
      ? i
      : this.N;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return (
      void 0 !== i &&
        11 === (null == t ? void 0 : t.nodeType) &&
        (t = i.parentNode),
      t
    );
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    (t = K(this, t, i)),
      k(t)
        ? t === q || null == t || "" === t
          ? (this._$AH !== q && this._$AR(), (this._$AH = q))
          : t !== this._$AH && t !== D && this.R(t)
        : void 0 !== t._$litType$
        ? this.O(t)
        : void 0 !== t.nodeType
        ? this.V(t)
        : M(t)
        ? this.j(t)
        : this.R(t);
  }
  L(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  V(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.L(t)));
  }
  R(t) {
    this._$AH !== q && k(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.V(x.createTextNode(t)),
      (this._$AH = t);
  }
  O(t) {
    var i;
    const { values: s, _$litType$: e } = t,
      o =
        "number" == typeof e
          ? this._$AC(t)
          : (void 0 === e.el &&
              (e.el = G.createElement(Z(e.h, e.h[0]), this.options)),
            e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o)
      this._$AH.U(s);
    else {
      const t = new Q(o, this),
        i = t.M(this.options);
      t.U(s), this.V(i), (this._$AH = t);
    }
  }
  _$AC(t) {
    let i = J.get(t.strings);
    return void 0 === i && J.set(t.strings, (i = new G(t))), i;
  }
  j(t) {
    E(this._$AH) || ((this._$AH = []), this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const o of t)
      e === i.length
        ? i.push((s = new X(this.L(A()), this.L(A()), this, this.options)))
        : (s = i[e]),
        s._$AI(o),
        e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (
      null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i);
      t && t !== this._$AB;

    ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM &&
      ((this.N = t),
      null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class Y {
  constructor(t, i, s, e, o) {
    (this.type = 1),
      (this._$AH = q),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = o),
      s.length > 2 || "" !== s[0] || "" !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = q);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o)
      (t = K(this, t, i, 0)),
        (n = !k(t) || (t !== this._$AH && t !== D)),
        n && (this._$AH = t);
    else {
      const e = t;
      let r, h;
      for (t = o[0], r = 0; r < o.length - 1; r++)
        (h = K(this, e[s + r], i, r)),
          h === D && (h = this._$AH[r]),
          n || (n = !k(h) || h !== this._$AH[r]),
          h === q ? (t = q) : t !== q && (t += (null != h ? h : "") + o[r + 1]),
          (this._$AH[r] = h);
    }
    n && !e && this.I(t);
  }
  I(t) {
    t === q
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : "");
  }
}
class tt extends Y {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  I(t) {
    this.element[this.name] = t === q ? void 0 : t;
  }
}
const it = w ? w.emptyScript : "";
class st extends Y {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  I(t) {
    t && t !== q
      ? this.element.setAttribute(this.name, it)
      : this.element.removeAttribute(this.name);
  }
}
class et extends Y {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), (this.type = 5);
  }
  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = K(this, t, i, 0)) && void 0 !== s ? s : q) === D)
      return;
    const e = this._$AH,
      o =
        (t === q && e !== q) ||
        t.capture !== e.capture ||
        t.once !== e.once ||
        t.passive !== e.passive,
      n = t !== q && (e === q || o);
    o && this.element.removeEventListener(this.name, this, e),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH
      ? this._$AH.call(
          null !==
            (s =
              null === (i = this.options) || void 0 === i ? void 0 : i.host) &&
            void 0 !== s
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class ot {
  constructor(t, i, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    K(this, t);
  }
}
const nt = {
    H: $,
    B: C,
    D: T,
    q: 1,
    J: F,
    W: Q,
    Z: M,
    F: K,
    G: X,
    K: Y,
    X: st,
    Y: et,
    tt,
    it: ot,
  },
  rt = g.litHtmlPolyfillSupport;
null == rt || rt(G, X),
  (null !== (b = g.litHtmlVersions) && void 0 !== b
    ? b
    : (g.litHtmlVersions = [])
  ).push("2.8.0");
const ht = (t, i, s) => {
  var e, o;
  const n =
    null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let r = n._$litPart$;
  if (void 0 === r) {
    const t =
      null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o
        ? o
        : null;
    n._$litPart$ = r = new X(
      i.insertBefore(A(), t),
      t,
      void 0,
      null != s ? s : {}
    );
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var lt, at;
const ut = y;
class ct extends y {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this.st = void 0);
  }
  createRenderRoot() {
    var t, i;
    const s = super.createRenderRoot();
    return (
      (null !== (t = (i = this.renderOptions).renderBefore) && void 0 !== t) ||
        (i.renderBefore = s.firstChild),
      s
    );
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this.st = ht(i, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this.st) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this.st) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return D;
  }
}
(ct.finalized = !0),
  (ct._$litElement$ = !0),
  null === (lt = globalThis.litElementHydrateSupport) ||
    void 0 === lt ||
    lt.call(globalThis, { LitElement: ct });
const dt = globalThis.litElementPolyfillSupport;
null == dt || dt({ LitElement: ct });
const vt = {
  _$AK: (t, i, s) => {
    t._$AK(i, s);
  },
  _$AL: (t) => t._$AL,
};
(null !== (at = globalThis.litElementVersions) && void 0 !== at
  ? at
  : (globalThis.litElementVersions = [])
).push("3.3.3");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = !1;
export {
  o as CSSResult,
  ct as LitElement,
  y as ReactiveElement,
  ut as UpdatingElement,
  vt as _$LE,
  nt as _$LH,
  h as adoptStyles,
  r as css,
  p as defaultConverter,
  l as getCompatibleStyle,
  H as html,
  pt as isServer,
  D as noChange,
  f as notEqual,
  q as nothing,
  ht as render,
  i as supportsAdoptingStyleSheets,
  B as svg,
  n as unsafeCSS,
};
//# sourceMappingURL=lit-core.min.js.map'
