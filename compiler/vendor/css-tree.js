/* esm.sh - esbuild bundle(css-tree@1.0.0-alpha22) esnext production */
var Ql = Object.create,
  vt = Object.defineProperty,
  Xl = Object.getPrototypeOf,
  Zl = Object.prototype.hasOwnProperty,
  $l = Object.getOwnPropertyNames,
  Jl = Object.getOwnPropertyDescriptor;
var eu = (e) => vt(e, "__esModule", { value: !0 });
var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var tu = (e, t, r) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of $l(t))
        !Zl.call(e, n) &&
          n !== "default" &&
          vt(e, n, {
            get: () => t[n],
            enumerable: !(r = Jl(t, n)) || r.enumerable,
          });
    return e;
  },
  Wr = (e) =>
    tu(
      eu(
        vt(
          e != null ? Ql(Xl(e)) : {},
          "default",
          e && e.__esModule && "default" in e
            ? { get: () => e.default, enumerable: !0 }
            : { value: e, enumerable: !0 }
        )
      ),
      e
    );
var S = c((yg, jr) => {
  "use strict";
  function K(e) {
    return { prev: null, next: null, data: e };
  }
  var ne = null,
    k = function () {
      (this.cursor = null), (this.head = null), (this.tail = null);
    };
  k.createItem = K;
  k.prototype.createItem = K;
  k.prototype.getSize = function () {
    for (var e = 0, t = this.head; t; ) e++, (t = t.next);
    return e;
  };
  k.prototype.fromArray = function (e) {
    var t = null;
    this.head = null;
    for (var r = 0; r < e.length; r++) {
      var n = K(e[r]);
      t !== null ? (t.next = n) : (this.head = n), (n.prev = t), (t = n);
    }
    return (this.tail = t), this;
  };
  k.prototype.toArray = function () {
    for (var e = this.head, t = []; e; ) t.push(e.data), (e = e.next);
    return t;
  };
  k.prototype.toJSON = k.prototype.toArray;
  k.prototype.isEmpty = function () {
    return this.head === null;
  };
  k.prototype.first = function () {
    return this.head && this.head.data;
  };
  k.prototype.last = function () {
    return this.tail && this.tail.data;
  };
  function qe(e, t, r) {
    var n;
    return (
      ne !== null
        ? ((n = ne),
          (ne = ne.cursor),
          (n.prev = t),
          (n.next = r),
          (n.cursor = e.cursor))
        : (n = { prev: t, next: r, cursor: e.cursor }),
      (e.cursor = n),
      n
    );
  }
  function ze(e) {
    var t = e.cursor;
    (e.cursor = t.cursor),
      (t.prev = null),
      (t.next = null),
      (t.cursor = ne),
      (ne = t);
  }
  k.prototype.each = function (e, t) {
    var r;
    t === void 0 && (t = this);
    for (var n = qe(this, null, this.head); n.next !== null; )
      (r = n.next), (n.next = r.next), e.call(t, r.data, r, this);
    ze(this);
  };
  k.prototype.eachRight = function (e, t) {
    var r;
    t === void 0 && (t = this);
    for (var n = qe(this, this.tail, null); n.prev !== null; )
      (r = n.prev), (n.prev = r.prev), e.call(t, r.data, r, this);
    ze(this);
  };
  k.prototype.nextUntil = function (e, t, r) {
    if (e !== null) {
      var n;
      r === void 0 && (r = this);
      for (
        var a = qe(this, null, e);
        a.next !== null &&
        ((n = a.next), (a.next = n.next), !t.call(r, n.data, n, this));

      );
      ze(this);
    }
  };
  k.prototype.prevUntil = function (e, t, r) {
    if (e !== null) {
      var n;
      r === void 0 && (r = this);
      for (
        var a = qe(this, e, null);
        a.prev !== null &&
        ((n = a.prev), (a.prev = n.prev), !t.call(r, n.data, n, this));

      );
      ze(this);
    }
  };
  k.prototype.some = function (e, t) {
    var r = this.head;
    for (t === void 0 && (t = this); r !== null; ) {
      if (e.call(t, r.data, r, this)) return !0;
      r = r.next;
    }
    return !1;
  };
  k.prototype.map = function (e, t) {
    var r = [],
      n = this.head;
    for (t === void 0 && (t = this); n !== null; )
      r.push(e.call(t, n.data, n, this)), (n = n.next);
    return r;
  };
  k.prototype.clear = function () {
    (this.head = null), (this.tail = null);
  };
  k.prototype.copy = function () {
    for (var e = new k(), t = this.head; t !== null; )
      e.insert(K(t.data)), (t = t.next);
    return e;
  };
  k.prototype.updateCursors = function (e, t, r, n) {
    for (var a = this.cursor; a !== null; )
      a.prev === e && (a.prev = t),
        a.next === r && (a.next = n),
        (a = a.cursor);
  };
  k.prototype.prepend = function (e) {
    return (
      this.updateCursors(null, e, this.head, e),
      this.head !== null
        ? ((this.head.prev = e), (e.next = this.head))
        : (this.tail = e),
      (this.head = e),
      this
    );
  };
  k.prototype.prependData = function (e) {
    return this.prepend(K(e));
  };
  k.prototype.append = function (e) {
    return (
      this.updateCursors(this.tail, e, null, e),
      this.tail !== null
        ? ((this.tail.next = e), (e.prev = this.tail))
        : (this.head = e),
      (this.tail = e),
      this
    );
  };
  k.prototype.appendData = function (e) {
    return this.append(K(e));
  };
  k.prototype.insert = function (e, t) {
    if (t != null)
      if ((this.updateCursors(t.prev, e, t, e), t.prev === null)) {
        if (this.head !== t) throw new Error("before doesn't belong to list");
        (this.head = e),
          (t.prev = e),
          (e.next = t),
          this.updateCursors(null, e);
      } else (t.prev.next = e), (e.prev = t.prev), (t.prev = e), (e.next = t);
    else this.append(e);
  };
  k.prototype.insertData = function (e, t) {
    this.insert(K(e), t);
  };
  k.prototype.remove = function (e) {
    if ((this.updateCursors(e, e.prev, e, e.next), e.prev !== null))
      e.prev.next = e.next;
    else {
      if (this.head !== e) throw new Error("item doesn't belong to list");
      this.head = e.next;
    }
    if (e.next !== null) e.next.prev = e.prev;
    else {
      if (this.tail !== e) throw new Error("item doesn't belong to list");
      this.tail = e.prev;
    }
    return (e.prev = null), (e.next = null), e;
  };
  k.prototype.appendList = function (e) {
    e.head !== null &&
      (this.updateCursors(this.tail, e.tail, null, e.head),
      this.tail !== null
        ? ((this.tail.next = e.head), (e.head.prev = this.tail))
        : (this.head = e.head),
      (this.tail = e.tail),
      (e.head = null),
      (e.tail = null));
  };
  k.prototype.insertList = function (e, t) {
    if (t != null) {
      if (e.head === null) return;
      this.updateCursors(t.prev, e.tail, t, e.head),
        t.prev !== null
          ? ((t.prev.next = e.head), (e.head.prev = t.prev))
          : (this.head = e.head),
        (t.prev = e.tail),
        (e.tail.next = t),
        (e.head = null),
        (e.tail = null);
    } else this.appendList(e);
  };
  k.prototype.replace = function (e, t) {
    "head" in t ? this.insertList(t, e) : this.insert(t, e), this.remove(e);
  };
  jr.exports = k;
});
var Zr = c((kg, Vr) => {
  "use strict";
  var bt = 100,
    Kr = 60,
    Qr = "    ";
  function Xr(e, t) {
    function r(p, f) {
      return n.slice(p, f).map(function (d, b) {
        for (var m = String(p + b + 1); m.length < s; ) m = " " + m;
        return m + " |" + d;
      }).join(`
`);
    }
    var n = e.source.split(/\n|\r\n?|\f/),
      a = e.line,
      i = e.column,
      o = Math.max(1, a - t) - 1,
      l = Math.min(a + t, n.length + 1),
      s = Math.max(4, String(l).length) + 1,
      u = 0;
    (i +=
      (Qr.length - 1) * (n[a - 1].substr(0, i - 1).match(/\t/g) || []).length),
      i > bt && ((u = i - Kr + 3), (i = Kr - 2));
    for (var h = o; h <= l; h++)
      h >= 0 &&
        h < n.length &&
        ((n[h] = n[h].replace(/\t/g, Qr)),
        (n[h] =
          (u > 0 && n[h].length > u ? "\u2026" : "") +
          n[h].substr(u, bt - 2) +
          (n[h].length > u + bt - 1 ? "\u2026" : "")));
    return [r(o, a), new Array(i + s + 2).join("-") + "^", r(a, l)].join(`
`);
  }
  var ru = function (e, t, r, n, a) {
    var i = Object.create(SyntaxError.prototype);
    return (
      (i.name = "CssSyntaxError"),
      (i.message = e),
      (i.stack = (new Error().stack || "").replace(
        /^.+\n/,
        i.name +
          ": " +
          i.message +
          `
`
      )),
      (i.source = t),
      (i.offset = r),
      (i.line = n),
      (i.column = a),
      (i.sourceFragment = function (o) {
        return Xr(i, isNaN(o) ? 0 : o);
      }),
      Object.defineProperty(i, "formattedMessage", {
        get: function () {
          return (
            "Parse error: " +
            i.message +
            `
` +
            Xr(i, 2)
          );
        },
      }),
      (i.parseError = { offset: r, line: n, column: a }),
      i
    );
  };
  Vr.exports = ru;
});
var Tt = c((Sg, $r) => {
  "use strict";
  var ae = 1,
    Jr = 2,
    en = 3,
    yt = 4,
    nu = 5,
    W = 6,
    au = 7,
    iu = 8,
    ou = 14,
    su = 15,
    lu = 16,
    uu = 17,
    kt = 9,
    St = 10,
    xt = 12,
    wt = 13,
    Et = 32,
    y = {
      WhiteSpace: ae,
      Identifier: Jr,
      Number: en,
      String: yt,
      Comment: nu,
      Punctuator: W,
      CDO: au,
      CDC: iu,
      Atrule: ou,
      Function: su,
      Url: lu,
      Raw: uu,
      ExclamationMark: 33,
      QuotationMark: 34,
      NumberSign: 35,
      DollarSign: 36,
      PercentSign: 37,
      Ampersand: 38,
      Apostrophe: 39,
      LeftParenthesis: 40,
      RightParenthesis: 41,
      Asterisk: 42,
      PlusSign: 43,
      Comma: 44,
      HyphenMinus: 45,
      FullStop: 46,
      Solidus: 47,
      Colon: 58,
      Semicolon: 59,
      LessThanSign: 60,
      EqualsSign: 61,
      GreaterThanSign: 62,
      QuestionMark: 63,
      CommercialAt: 64,
      LeftSquareBracket: 91,
      Backslash: 92,
      RightSquareBracket: 93,
      CircumflexAccent: 94,
      LowLine: 95,
      GraveAccent: 96,
      LeftCurlyBracket: 123,
      VerticalLine: 124,
      RightCurlyBracket: 125,
      Tilde: 126,
    },
    cu = Object.keys(y).reduce(function (e, t) {
      return (e[y[t]] = t), e;
    }, {}),
    Ct = typeof Uint32Array != "undefined" ? Uint32Array : Array,
    _ = new Ct(128),
    j = new Ct(128),
    G = new Ct(128);
  for (var Q = 0; Q < _.length; Q++) _[Q] = Jr;
  [
    y.ExclamationMark,
    y.QuotationMark,
    y.NumberSign,
    y.DollarSign,
    y.PercentSign,
    y.Ampersand,
    y.Apostrophe,
    y.LeftParenthesis,
    y.RightParenthesis,
    y.Asterisk,
    y.PlusSign,
    y.Comma,
    y.HyphenMinus,
    y.FullStop,
    y.Solidus,
    y.Colon,
    y.Semicolon,
    y.LessThanSign,
    y.EqualsSign,
    y.GreaterThanSign,
    y.QuestionMark,
    y.CommercialAt,
    y.LeftSquareBracket,
    y.RightSquareBracket,
    y.CircumflexAccent,
    y.GraveAccent,
    y.LeftCurlyBracket,
    y.VerticalLine,
    y.RightCurlyBracket,
    y.Tilde,
  ].forEach(function (e) {
    (_[Number(e)] = W), (j[Number(e)] = W);
  });
  for (var Q = 48; Q <= 57; Q++) _[Q] = en;
  _[Et] = ae;
  _[kt] = ae;
  _[St] = ae;
  _[wt] = ae;
  _[xt] = ae;
  _[y.Apostrophe] = yt;
  _[y.QuotationMark] = yt;
  G[Et] = 1;
  G[kt] = 1;
  G[St] = 1;
  G[wt] = 1;
  G[xt] = 1;
  G[y.Apostrophe] = 1;
  G[y.QuotationMark] = 1;
  G[y.LeftParenthesis] = 1;
  G[y.RightParenthesis] = 1;
  j[Et] = W;
  j[kt] = W;
  j[St] = W;
  j[wt] = W;
  j[xt] = W;
  j[y.HyphenMinus] = 0;
  $r.exports = {
    TYPE: y,
    NAME: cu,
    SYMBOL_TYPE: _,
    PUNCTUATION: j,
    STOP_URL_RAW: G,
  };
});
var on = c((xg, tn) => {
  "use strict";
  var At = Tt(),
    hu = At.PUNCTUATION,
    pu = At.STOP_URL_RAW,
    Ue = At.TYPE,
    fu = Ue.FullStop,
    du = Ue.PlusSign,
    gu = Ue.HyphenMinus,
    mu = Ue.Punctuator,
    Lt = 9,
    De = 10,
    Rt = 12,
    Fe = 13,
    Pt = 32,
    Nt = 92,
    vu = 101;
  function bu(e) {
    return e.charCodeAt(0) === 65279 || e.charCodeAt(0) === 65534 ? 1 : 0;
  }
  function rn(e) {
    return (
      (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102)
    );
  }
  function _t(e) {
    return e >= 48 && e <= 57;
  }
  function nn(e, t, r) {
    return r === De || r === Rt || r === Fe
      ? r === Fe && t + 1 < e.length && e.charCodeAt(t + 1) === De
        ? 2
        : 1
      : 0;
  }
  function yu(e, t, r) {
    var n = e.charCodeAt(t);
    return n >= 65 && n <= 90 && (n = n | 32), n === r;
  }
  function an(e, t, r, n) {
    if (r - t !== n.length || t < 0 || r > e.length) return !1;
    for (var a = t; a < r; a++) {
      var i = e.charCodeAt(a),
        o = n.charCodeAt(a - t);
      if ((i >= 65 && i <= 90 && (i = i | 32), i !== o)) return !1;
    }
    return !0;
  }
  function ku(e, t) {
    return an(e, e.length - t.length, e.length, t);
  }
  function Su(e) {
    for (var t = e.source.length - 1; t >= 0; t--) {
      var r = e.source.charCodeAt(t);
      if (r !== Pt && r !== Lt && r !== Fe && r !== De && r !== Rt) break;
    }
    return e.getLocation(t + 1);
  }
  function xu(e, t) {
    for (; t < e.length; t++) {
      var r = e.charCodeAt(t);
      if (r !== Pt && r !== Lt && r !== Fe && r !== De && r !== Rt) break;
    }
    return t;
  }
  function wu(e, t) {
    var r = e.indexOf("*/", t);
    return r === -1 ? e.length : r + 2;
  }
  function Eu(e, t, r) {
    for (; t < e.length; t++) {
      var n = e.charCodeAt(t);
      if (n === Nt) t++;
      else if (n === r) {
        t++;
        break;
      }
    }
    return t;
  }
  function Be(e, t) {
    for (; t < e.length; t++) {
      var r = e.charCodeAt(t);
      if (r < 48 || r > 57) break;
    }
    return t;
  }
  function Cu(e, t, r) {
    var n;
    return (
      (t = Be(e, t)),
      r &&
        t + 1 < e.length &&
        e.charCodeAt(t) === fu &&
        ((n = e.charCodeAt(t + 1)), _t(n) && (t = Be(e, t + 1))),
      t + 1 < e.length &&
        (e.charCodeAt(t) | 32) === vu &&
        ((n = e.charCodeAt(t + 1)),
        (n === du || n === gu) && t + 2 < e.length && (n = e.charCodeAt(t + 2)),
        _t(n) && (t = Be(e, t + 2))),
      t
    );
  }
  function It(e, t) {
    for (var r = 0; r < 7 && t + r < e.length; r++) {
      var n = e.charCodeAt(t + r);
      if (!(r !== 6 && rn(n))) {
        r > 0 &&
          ((t += r - 1 + nn(e, t + r, n)), (n === Pt || n === Lt) && t++);
        break;
      }
    }
    return t;
  }
  function Tu(e, t) {
    for (; t < e.length; t++) {
      var r = e.charCodeAt(t);
      if (r === Nt) t = It(e, t + 1);
      else if (r < 128 && hu[r] === mu) break;
    }
    return t;
  }
  function Au(e, t) {
    for (; t < e.length; t++) {
      var r = e.charCodeAt(t);
      if (r === Nt) t = It(e, t + 1);
      else if (r < 128 && pu[r] === 1) break;
    }
    return t;
  }
  tn.exports = {
    firstCharOffset: bu,
    isHex: rn,
    isNumber: _t,
    isNewline: nn,
    cmpChar: yu,
    cmpStr: an,
    endsWith: ku,
    findLastNonSpaceLocation: Su,
    findWhiteSpaceEnd: xu,
    findCommentEnd: wu,
    findStringEnd: Eu,
    findDecimalNumberEnd: Be,
    findNumberEnd: Cu,
    findEscaseEnd: It,
    findIdentifierEnd: Tu,
    findUrlRawEnd: Au,
  };
});
var kn = c((wg, sn) => {
  "use strict";
  var ln = Zr(),
    xe = Tt(),
    x = xe.TYPE,
    un = xe.NAME,
    Lu = xe.SYMBOL_TYPE,
    I = on(),
    cn = I.firstCharOffset,
    Ot = I.cmpStr,
    Ru = I.isNumber,
    Pu = I.findLastNonSpaceLocation,
    hn = I.findWhiteSpaceEnd,
    Nu = I.findCommentEnd,
    _u = I.findStringEnd,
    pn = I.findNumberEnd,
    Iu = I.findIdentifierEnd,
    Ou = I.findUrlRawEnd,
    Mt = 0,
    ie = x.WhiteSpace,
    Ge = x.Identifier,
    fn = x.Number,
    Mu = x.String,
    dn = x.Comment,
    qu = x.Punctuator,
    zu = x.CDO,
    Uu = x.CDC,
    Du = x.Atrule,
    qt = x.Function,
    zt = x.Url,
    Fu = x.Raw,
    gn = 10,
    Bu = 12,
    mn = 13,
    Gu = x.Asterisk,
    Yu = x.Solidus,
    Ut = x.FullStop,
    vn = x.PlusSign,
    X = x.HyphenMinus,
    Hu = x.GreaterThanSign,
    Wu = x.LessThanSign,
    ju = x.ExclamationMark,
    Vu = x.CommercialAt,
    Ku = x.QuotationMark,
    Qu = x.Apostrophe,
    Dt = x.LeftParenthesis,
    bn = x.RightParenthesis,
    Xu = x.LeftCurlyBracket,
    Zu = x.RightCurlyBracket,
    $u = x.LeftSquareBracket,
    Ju = x.RightSquareBracket,
    ec = 16 * 1024,
    U = 16777215,
    T = 24,
    Ye = typeof Uint32Array != "undefined" ? Uint32Array : Array;
  function yn(e, t) {
    var r = t.length,
      n = cn(t),
      a = e.lines,
      i = e.startLine,
      o = e.columns,
      l = e.startColumn;
    (a === null || a.length < r + 1) &&
      ((a = new Ye(Math.max(r + 1024, ec))), (o = new Ye(a.length)));
    for (var s = n; s < r; s++) {
      var u = t.charCodeAt(s);
      (a[s] = i),
        (o[s] = l++),
        (u === gn || u === mn || u === Bu) &&
          (u === mn &&
            s + 1 < r &&
            t.charCodeAt(s + 1) === gn &&
            (s++, (a[s] = i), (o[s] = l)),
          i++,
          (l = 1));
    }
    (a[s] = i),
      (o[s] = l),
      (e.linesAnsColumnsComputed = !0),
      (e.lines = a),
      (e.columns = o);
  }
  function tc(e, t, r) {
    var n = t.length,
      a = e.offsetAndType,
      i = e.balance,
      o = 0,
      l = 0,
      s = r,
      u = 0,
      h = 0,
      p = 0,
      f = 0;
    for (
      (a === null || a.length < n + 1) &&
      ((a = new Ye(n + 1024)), (i = new Ye(n + 1024)));
      s < n;

    ) {
      var d = t.charCodeAt(s),
        b = d < 128 ? Lu[d] : Ge;
      switch (((i[o] = n), b)) {
        case ie:
          s = hn(t, s + 1);
          break;
        case qu:
          switch (d) {
            case h:
              for (
                f = p & U, p = i[f], h = p >> T, i[o] = f, i[f++] = o;
                f < o;
                f++
              )
                i[f] === n && (i[f] = o);
              break;
            case $u:
              (i[o] = p), (h = Ju), (p = (h << T) | o);
              break;
            case Xu:
              (i[o] = p), (h = Zu), (p = (h << T) | o);
              break;
            case Dt:
              (i[o] = p), (h = bn), (p = (h << T) | o);
              break;
          }
          if (d === Gu && l === Yu) {
            (b = dn), (s = Nu(t, s + 1)), o--;
            break;
          }
          if (
            d === Ut &&
            (l === vn || l === X) &&
            s + 1 < n &&
            Ru(t.charCodeAt(s + 1))
          ) {
            (b = fn), (s = pn(t, s + 2, !1)), o--;
            break;
          }
          if (
            d === ju &&
            l === Wu &&
            s + 2 < n &&
            t.charCodeAt(s + 1) === X &&
            t.charCodeAt(s + 2) === X
          ) {
            (b = zu), (s = s + 3), o--;
            break;
          }
          if (d === X && l === X && s + 1 < n && t.charCodeAt(s + 1) === Hu) {
            (b = Uu), (s = s + 2), o--;
            break;
          }
          if (d === Dt && l === Ge) {
            (s = s + 1),
              o--,
              (i[o] = i[o + 1]),
              p--,
              s - u == 4 && Ot(t, u, s, "url(")
                ? ((u = hn(t, s)),
                  (d = t.charCodeAt(u)),
                  d !== Dt && d !== bn && d !== Ku && d !== Qu
                    ? ((a[o++] = (zt << T) | s),
                      (i[o] = n),
                      u !== s && ((a[o++] = (ie << T) | u), (i[o] = n)),
                      (b = Fu),
                      (s = Ou(t, u)))
                    : (b = zt))
                : (b = qt);
            break;
          }
          (b = d), (s = s + 1);
          break;
        case fn:
          (s = pn(t, s + 1, l !== Ut)),
            (l === Ut || l === X || l === vn) && o--;
          break;
        case Mu:
          s = _u(t, s + 1, d);
          break;
        default:
          (u = s),
            (s = Iu(t, s)),
            l === X && (o--, (l = o === 0 ? 0 : a[o - 1] >> T)),
            l === Vu && (o--, (b = Du));
      }
      (a[o++] = (b << T) | s), (l = b);
    }
    for (a[o] = s, i[o] = n; p !== 0; ) (f = p & U), (p = i[f]), (i[f] = n);
    (e.offsetAndType = a), (e.tokenCount = o), (e.balance = i);
  }
  var oe = function (e, t, r, n) {
    (this.offsetAndType = null),
      (this.balance = null),
      (this.lines = null),
      (this.columns = null),
      this.setSource(e, t, r, n);
  };
  oe.prototype = {
    setSource: function (e, t, r, n) {
      var a = String(e || ""),
        i = cn(a);
      (this.source = a),
        (this.firstCharOffset = i),
        (this.startOffset = typeof t == "undefined" ? 0 : t),
        (this.startLine = typeof r == "undefined" ? 1 : r),
        (this.startColumn = typeof n == "undefined" ? 1 : n),
        (this.linesAnsColumnsComputed = !1),
        (this.eof = !1),
        (this.currentToken = -1),
        (this.tokenType = 0),
        (this.tokenStart = i),
        (this.tokenEnd = i),
        tc(this, a, i),
        this.next();
    },
    lookupType: function (e) {
      return (
        (e += this.currentToken),
        e < this.tokenCount ? this.offsetAndType[e] >> T : Mt
      );
    },
    lookupNonWSType: function (e) {
      e += this.currentToken;
      for (var t; e < this.tokenCount; e++)
        if (((t = this.offsetAndType[e] >> T), t !== ie)) return t;
      return Mt;
    },
    lookupValue: function (e, t) {
      return (
        (e += this.currentToken),
        e < this.tokenCount
          ? Ot(
              this.source,
              this.offsetAndType[e - 1] & U,
              this.offsetAndType[e] & U,
              t
            )
          : !1
      );
    },
    getTokenStart: function (e) {
      return e === this.currentToken
        ? this.tokenStart
        : e > 0
        ? e < this.tokenCount
          ? this.offsetAndType[e - 1] & U
          : this.offsetAndType[this.tokenCount] & U
        : this.firstCharOffset;
    },
    getOffsetExcludeWS: function () {
      return this.currentToken > 0 &&
        this.offsetAndType[this.currentToken - 1] >> T === ie
        ? this.currentToken > 1
          ? this.offsetAndType[this.currentToken - 2] & U
          : this.firstCharOffset
        : this.tokenStart;
    },
    getRawLength: function (e, t, r, n) {
      var a = e,
        i;
      e: for (; a < this.tokenCount; a++) {
        if (((i = this.balance[a]), i < e)) break e;
        switch (this.offsetAndType[a] >> T) {
          case t:
            break e;
          case r:
            n && a++;
            break e;
          default:
            this.balance[i] === a && (a = i);
        }
      }
      return a - this.currentToken;
    },
    getTokenValue: function () {
      return this.source.substring(this.tokenStart, this.tokenEnd);
    },
    substrToCursor: function (e) {
      return this.source.substring(e, this.tokenStart);
    },
    skipWS: function () {
      for (
        var e = this.currentToken, t = 0;
        e < this.tokenCount && this.offsetAndType[e] >> T === ie;
        e++, t++
      );
      t > 0 && this.skip(t);
    },
    skipSC: function () {
      for (; this.tokenType === ie || this.tokenType === dn; ) this.next();
    },
    skip: function (e) {
      var t = this.currentToken + e;
      t < this.tokenCount
        ? ((this.currentToken = t),
          (this.tokenStart = this.offsetAndType[t - 1] & U),
          (t = this.offsetAndType[t]),
          (this.tokenType = t >> T),
          (this.tokenEnd = t & U))
        : ((this.currentToken = this.tokenCount), this.next());
    },
    next: function () {
      var e = this.currentToken + 1;
      e < this.tokenCount
        ? ((this.currentToken = e),
          (this.tokenStart = this.tokenEnd),
          (e = this.offsetAndType[e]),
          (this.tokenType = e >> T),
          (this.tokenEnd = e & U))
        : ((this.currentToken = this.tokenCount),
          (this.eof = !0),
          (this.tokenType = Mt),
          (this.tokenStart = this.tokenEnd = this.source.length));
    },
    eat: function (e) {
      if (this.tokenType !== e) {
        var t = this.tokenStart,
          r = un[e] + " is expected";
        e === Ge
          ? (this.tokenType === qt || this.tokenType === zt) &&
            ((t = this.tokenEnd - 1), (r += " but function found"))
          : this.source.charCodeAt(this.tokenStart) === e && (t = t + 1),
          this.error(r, t);
      }
      this.next();
    },
    eatNonWS: function (e) {
      this.skipWS(), this.eat(e);
    },
    consume: function (e) {
      var t = this.getTokenValue();
      return this.eat(e), t;
    },
    consumeFunctionName: function () {
      var e = this.source.substring(this.tokenStart, this.tokenEnd - 1);
      return this.eat(qt), e;
    },
    consumeNonWS: function (e) {
      return this.skipWS(), this.consume(e);
    },
    expectIdentifier: function (e) {
      (this.tokenType !== Ge ||
        Ot(this.source, this.tokenStart, this.tokenEnd, e) === !1) &&
        this.error("Identifier `" + e + "` is expected"),
        this.next();
    },
    getLocation: function (e, t) {
      return (
        this.linesAnsColumnsComputed || yn(this, this.source),
        {
          source: t,
          offset: this.startOffset + e,
          line: this.lines[e],
          column: this.columns[e],
        }
      );
    },
    getLocationRange: function (e, t, r) {
      return (
        this.linesAnsColumnsComputed || yn(this, this.source),
        {
          source: r,
          start: {
            offset: this.startOffset + e,
            line: this.lines[e],
            column: this.columns[e],
          },
          end: {
            offset: this.startOffset + t,
            line: this.lines[t],
            column: this.columns[t],
          },
        }
      );
    },
    error: function (e, t) {
      var r =
        typeof t != "undefined" && t < this.source.length
          ? this.getLocation(t)
          : this.eof
          ? Pu(this)
          : this.getLocation(this.tokenStart);
      throw new ln(
        e || "Unexpected input",
        this.source,
        r.offset,
        r.line,
        r.column
      );
    },
    dump: function () {
      var e = 0;
      return Array.prototype.slice
        .call(this.offsetAndType, 0, this.tokenCount)
        .map(function (t, r) {
          var n = e,
            a = t & U;
          return (
            (e = a),
            {
              idx: r,
              type: un[t >> T],
              chunk: this.source.substring(n, a),
              balance: this.balance[r],
            }
          );
        }, this);
    },
  };
  oe.CssSyntaxError = ln;
  Object.keys(xe).forEach(function (e) {
    oe[e] = xe[e];
  });
  Object.keys(I).forEach(function (e) {
    oe[e] = I[e];
  });
  new oe(`
\r\r
\f<!---->//""''/*\r
\f*/1a;.\\31	+2{url(a);func();+1.2e3 -.4e-5 .6e+7}`).getLocation();
  sn.exports = oe;
});
var v = c((Eg, Sn) => {
  Sn.exports = kn();
});
var He = c((Cg, xn) => {
  "use strict";
  function rc(e, t) {
    return e && e.type === t;
  }
  function nc(e) {
    return e.min === 0 && e.max === 0
      ? "*"
      : e.min === 0 && e.max === 1
      ? "?"
      : e.min === 1 && e.max === 0
      ? e.comma
        ? "#"
        : "+"
      : e.min === 1 && e.max === 1
      ? ""
      : (e.comma ? "#" : "") +
        "{" +
        e.min +
        (e.min !== e.max ? "," + (e.max !== 0 ? e.max : "") : "") +
        "}";
  }
  function wn(e, t, r) {
    var n = "";
    return (
      (e.explicit || t) && (n += "[" + (rc(e.terms[0], "Comma") ? "" : " ")),
      (n += e.terms
        .map(function (a) {
          return Ft(a, t, r);
        })
        .join(e.combinator === " " ? " " : " " + e.combinator + " ")),
      (e.explicit || t) && (n += " ]"),
      n
    );
  }
  function En(e, t, r) {
    return e.terms.length ? "( " + wn(e, t, r) + " )" : "()";
  }
  function Ft(e, t, r) {
    if (Array.isArray(e))
      return e
        .map(function (a) {
          return Ft(a, t, r);
        })
        .join("");
    var n;
    switch (e.type) {
      case "Group":
        n = wn(e, t, r) + (e.disallowEmpty ? "!" : "") + nc(e.multiplier);
        break;
      case "Keyword":
        n = e.name;
        break;
      case "Function":
        n = e.name + En(e.children, t, r);
        break;
      case "Parentheses":
        n = En(e.children, t, r);
        break;
      case "Type":
        n = "<" + e.name + ">";
        break;
      case "Property":
        n = "<'" + e.name + "'>";
        break;
      case "Combinator":
      case "Slash":
      case "Percent":
      case "String":
      case "Comma":
        n = e.value;
        break;
      default:
        throw new Error("Unknown node type: " + e.type);
    }
    return typeof r == "function" && (n = r(n, e)), n;
  }
  xn.exports = Ft;
});
var Bt = c((Tg, Cn) => {
  "use strict";
  var ac = He();
  function Tn(e, t) {
    var r = e && e.loc && e.loc[t];
    return r ? { offset: r.offset, line: r.line, column: r.column } : null;
  }
  var ic = function (e, t) {
      var r = Object.create(SyntaxError.prototype);
      return (
        (r.name = "SyntaxReferenceError"),
        (r.reference = t),
        (r.message = e + " `" + t + "`"),
        (r.stack = (new Error().stack || "").replace(
          /^.+\n/,
          r.name +
            ": " +
            r.message +
            `
`
        )),
        r
      );
    },
    oc = function (e, t, r, n, a) {
      var i = Object.create(SyntaxError.prototype),
        o = -1,
        l = Tn(a, "start"),
        s = Tn(a, "end"),
        u = t.syntax.translateMarkup(n, function (h, p) {
          h === a && (o = p.length);
        });
      return (
        o === -1 && (o = u.length),
        (i.name = "SyntaxMatchError"),
        (i.rawMessage = e),
        (i.stack = (new Error().stack || "").replace(
          /^.+\n/,
          i.name +
            ": " +
            e +
            `
`
        )),
        (i.syntax = r ? ac(r) : "<generic>"),
        (i.css = u),
        (i.mismatchOffset = o),
        (i.loc = {
          source: (a && a.loc && a.loc.source) || "<unknown>",
          start: l,
          end: s,
        }),
        (i.line = l ? l.line : void 0),
        (i.column = l ? l.column : void 0),
        (i.offset = l ? l.offset : void 0),
        (i.message =
          e +
          `
  syntax: ` +
          i.syntax +
          `
   value: ` +
          (i.css || "<empty string>") +
          `
  --------` +
          new Array(i.mismatchOffset + 1).join("-") +
          "^"),
        i
      );
    };
  Cn.exports = { SyntaxReferenceError: ic, MatchError: oc };
});
var we = c((Ag, An) => {
  "use strict";
  var We = Object.prototype.hasOwnProperty,
    se = Object.create(null),
    le = Object.create(null),
    Gt = 45;
  function Ln(e, t) {
    return (
      e.length - t >= 2 && e.charCodeAt(t) === Gt && e.charCodeAt(t + 1) === Gt
    );
  }
  function Rn(e, t) {
    if (e.charCodeAt(t) === Gt) {
      var r = e.indexOf("-", t + 2);
      if (r !== -1) return e.substring(t, r + 1);
    }
    return "";
  }
  function sc(e) {
    if (We.call(se, e)) return se[e];
    var t = e.toLowerCase();
    if (We.call(se, t)) return (se[e] = se[t]);
    var r = Ln(t, 0) ? "" : Rn(t, 0);
    return (se[e] = Object.freeze({
      vendor: r,
      prefix: r,
      name: t.substr(r.length),
    }));
  }
  function lc(e) {
    if (We.call(le, e)) return le[e];
    var t = e,
      r = e[0];
    r === "/" && e[1] === "/"
      ? (r = "//")
      : r !== "_" &&
        r !== "*" &&
        r !== "$" &&
        r !== "#" &&
        r !== "+" &&
        (r = "");
    var n = Ln(t, r.length);
    if (!n && ((t = t.toLowerCase()), We.call(le, t))) return (le[e] = le[t]);
    var a = n ? "" : Rn(t, r.length);
    return (le[e] = Object.freeze({
      hack: r,
      vendor: a,
      prefix: r + a,
      name: t.substr(r.length + a.length),
      custom: n,
    }));
  }
  An.exports = { keyword: sc, property: lc };
});
var _n = c((Lg, Pn) => {
  "use strict";
  var uc = we(),
    cc = {
      px: !0,
      mm: !0,
      cm: !0,
      in: !0,
      pt: !0,
      pc: !0,
      q: !0,
      em: !0,
      ex: !0,
      ch: !0,
      rem: !0,
      vh: !0,
      vw: !0,
      vmin: !0,
      vmax: !0,
      vm: !0,
    },
    hc = { deg: !0, grad: !0, rad: !0, turn: !0 },
    pc = { s: !0, ms: !0 },
    fc = { hz: !0, khz: !0 },
    dc = { dpi: !0, dpcm: !0, dppx: !0, x: !0 },
    gc = { fr: !0 },
    mc = { db: !0 },
    vc = { st: !0 };
  function V(e) {
    if (e.data.type !== "Function") return !1;
    var t = uc.keyword(e.data.name);
    return t.name !== "calc"
      ? !1
      : t.vendor === "" || t.vendor === "-moz-" || t.vendor === "-webkit-";
  }
  function Z(e) {
    return function (t) {
      return t.data.type === e;
    };
  }
  function ue(e) {
    return function (t) {
      return (
        V(t) ||
        (t.data.type === "Dimension" &&
          e.hasOwnProperty(t.data.unit.toLowerCase()))
      );
    };
  }
  function Nn(e) {
    return function (t) {
      return (
        V(t) ||
        (t.data.type === "Dimension" &&
          e.hasOwnProperty(t.data.unit.toLowerCase())) ||
        (t.data.type === "Number" && Number(t.data.value) === 0)
      );
    };
  }
  function bc(e) {
    return e.data.type === "Function" && e.data.name.toLowerCase() === "attr";
  }
  function yc(e) {
    return V(e) || e.data.type === "Number";
  }
  function kc(e) {
    if (V(e) || e.data.type === "Number") {
      var t = Number(e.data.value);
      return t >= 0 && t <= 1;
    }
    return !1;
  }
  function Sc(e) {
    return V(e) || e.data.type === "Number" ? Number(e.data.value) >= 1 : !1;
  }
  function xc(e) {
    return (
      V(e) || (e.data.type === "Number" && e.data.value.indexOf(".") === -1)
    );
  }
  function wc(e) {
    return (
      V(e) ||
      (e.data.type === "Number" &&
        e.data.value.indexOf(".") === -1 &&
        e.data.value.charAt(0) !== "-")
    );
  }
  function Ec(e) {
    return V(e) || e.data.type === "Percentage";
  }
  function Cc(e) {
    if (e.data.type !== "HexColor") return !1;
    var t = e.data.value;
    return (
      /^[0-9a-fA-F]{3,8}$/.test(t) &&
      (t.length === 3 || t.length === 4 || t.length === 6 || t.length === 8)
    );
  }
  function Tc(e) {
    return (
      e.data.type === "Function" && e.data.name.toLowerCase() === "expression"
    );
  }
  function Ac(e) {
    if (e.data.type !== "Identifier") return !1;
    var t = e.data.name.toLowerCase();
    return !(
      t === "unset" ||
      t === "initial" ||
      t === "inherit" ||
      t === "default"
    );
  }
  Pn.exports = {
    angle: Nn(hc),
    "attr()": bc,
    "custom-ident": Ac,
    decibel: ue(mc),
    dimension: Z("Dimension"),
    frequency: ue(fc),
    flex: ue(gc),
    "hex-color": Cc,
    "id-selector": Z("IdSelector"),
    ident: Z("Identifier"),
    integer: xc,
    length: Nn(cc),
    number: yc,
    "number-zero-one": kc,
    "number-one-or-greater": Sc,
    percentage: Ec,
    "positive-integer": wc,
    resolution: ue(dc),
    semitones: ue(vc),
    string: Z("String"),
    time: ue(pc),
    "unicode-range": Z("UnicodeRange"),
    url: Z("Url"),
    progid: Z("Raw"),
    expression: Tc,
  };
});
var Yt = c((Rg, In) => {
  "use strict";
  var Lc = function (e, t, r) {
    var n = Object.create(SyntaxError.prototype);
    return (
      (n.name = "SyntaxParseError"),
      (n.rawMessage = e),
      (n.stack = (new Error().stack || "").replace(
        /^.+\n/,
        n.name +
          ": " +
          e +
          `
`
      )),
      (n.syntax = t),
      (n.offset = r),
      (n.message =
        n.rawMessage +
        `
  ` +
        n.syntax +
        `
--` +
        new Array((n.offset || n.syntax.length) + 1).join("-") +
        "^"),
      n
    );
  };
  In.exports = { SyntaxParseError: Lc };
});
var Qt = c((Pg, On) => {
  "use strict";
  var Rc = Yt().SyntaxParseError,
    Mn = 9,
    qn = 10,
    zn = 12,
    Un = 13,
    Dn = 32,
    Pc = 33,
    Nc = 35,
    _c = 37,
    Fn = 38,
    je = 39,
    Ht = 40,
    Wt = 41,
    Ic = 42,
    Oc = 43,
    Bn = 44,
    Mc = 47,
    jt = 60,
    Gn = 62,
    qc = 63,
    Yn = 91,
    zc = 93,
    Vt = 123,
    Hn = 124,
    Wn = 125,
    jn = { " ": 1, "&&": 2, "||": 3, "|": 4 },
    Ve = { comma: !1, min: 1, max: 1 },
    Uc = { comma: !1, min: 0, max: 0 },
    Dc = { comma: !1, min: 1, max: 0 },
    Fc = { comma: !0, min: 1, max: 0 },
    Bc = { comma: !1, min: 0, max: 1 },
    Vn = (function () {
      for (
        var e =
            typeof Uint32Array == "function"
              ? new Uint32Array(128)
              : new Array(128),
          t = 0;
        t < 128;
        t++
      )
        e[t] = /[a-zA-Z0-9\-]/.test(String.fromCharCode(t)) ? 1 : 0;
      return e;
    })(),
    Kn = function (e) {
      (this.str = e), (this.pos = 0);
    };
  Kn.prototype = {
    charCode: function () {
      return this.pos < this.str.length ? this.str.charCodeAt(this.pos) : 0;
    },
    nextCharCode: function () {
      return this.pos + 1 < this.str.length
        ? this.str.charCodeAt(this.pos + 1)
        : 0;
    },
    substringToPos: function (e) {
      return this.str.substring(this.pos, (this.pos = e));
    },
    eat: function (e) {
      this.charCode() !== e &&
        $(this, this.pos, "Expect `" + String.fromCharCode(e) + "`"),
        this.pos++;
    },
  };
  function Gc(e) {
    for (var t = e.pos + 1; t < e.str.length; t++) {
      var r = e.str.charCodeAt(t);
      if (r !== Un && r !== qn && r !== zn && r !== Dn && r !== Mn) break;
    }
    return e.substringToPos(t);
  }
  function Kt(e) {
    for (var t = e.pos; t < e.str.length; t++) {
      var r = e.str.charCodeAt(t);
      if (r >= 128 || Vn[r] === 0) break;
    }
    return e.pos === t && $(e, e.pos, "Expect a keyword"), e.substringToPos(t);
  }
  function Qn(e) {
    for (var t = e.pos; t < e.str.length; t++) {
      var r = e.str.charCodeAt(t);
      if (r < 48 || r > 57) break;
    }
    return e.pos === t && $(e, e.pos, "Expect a number"), e.substringToPos(t);
  }
  function Yc(e) {
    var t = e.str.indexOf("'", e.pos + 1);
    return (
      t === -1 && $(e, e.str.length, "Expect a quote"), e.substringToPos(t + 1)
    );
  }
  function Xn(e, t) {
    var r = null,
      n = null;
    return (
      e.eat(Vt),
      (r = Qn(e)),
      e.charCode() === Bn
        ? (e.pos++, e.charCode() !== Wn && (n = Qn(e)))
        : (n = r),
      e.eat(Wn),
      { comma: t, min: Number(r), max: n ? Number(n) : 0 }
    );
  }
  function Zn(e) {
    switch (e.charCode()) {
      case Ic:
        return e.pos++, Uc;
      case Oc:
        return e.pos++, Dc;
      case qc:
        return e.pos++, Bc;
      case Nc:
        return e.pos++, e.charCode() !== Vt ? Fc : Xn(e, !0);
      case Vt:
        return Xn(e, !1);
    }
    return Ve;
  }
  function Ke(e, t) {
    var r = Zn(e);
    return r !== Ve
      ? {
          type: "Group",
          terms: [t],
          combinator: "|",
          disallowEmpty: !1,
          multiplier: r,
          explicit: !1,
        }
      : t;
  }
  function Hc(e) {
    var t;
    return (
      e.eat(jt),
      e.eat(je),
      (t = Kt(e)),
      e.eat(je),
      e.eat(Gn),
      Ke(e, { type: "Property", name: t })
    );
  }
  function Wc(e) {
    var t;
    return (
      e.eat(jt),
      (t = Kt(e)),
      e.charCode() === Ht &&
        e.nextCharCode() === Wt &&
        ((e.pos += 2), (t += "()")),
      e.eat(Gn),
      Ke(e, { type: "Type", name: t })
    );
  }
  function jc(e) {
    var t = null,
      r;
    return (
      (r = Kt(e)),
      e.charCode() === Ht
        ? (e.pos++,
          (t = Qe(e)),
          e.eat(Wt),
          Ke(e, { type: "Function", name: r, children: t }))
        : Ke(e, { type: "Keyword", name: r })
    );
  }
  function Vc(e, t) {
    function r(l, s) {
      return {
        type: "Group",
        terms: l,
        combinator: s,
        disallowEmpty: !1,
        multiplier: Ve,
        explicit: !1,
      };
    }
    for (
      t = Object.keys(t).sort(function (l, s) {
        return jn[l] - jn[s];
      });
      t.length > 0;

    ) {
      for (var n = t.shift(), a = 0, i = 0; a < e.length; a++) {
        var o = e[a];
        o.type === "Combinator" &&
          (o.value === n
            ? (i === -1 && (i = a - 1), e.splice(a, 1), a--)
            : (i !== -1 &&
                a - i > 1 &&
                (e.splice(i, a - i, r(e.slice(i, a), n)), (a = i + 1)),
              (i = -1)));
      }
      i !== -1 && t.length && e.splice(i, a - i, r(e.slice(i, a), n));
    }
    return n;
  }
  function Qe(e) {
    for (var t = [], r = {}, n, a = null, i = e.pos; (n = Kc(e)); )
      n.type !== "Spaces" &&
        (n.type === "Combinator"
          ? ((a === null || a.type === "Combinator") &&
              $(e, i, "Unexpected combinator"),
            (r[n.value] = !0))
          : a !== null &&
            a.type !== "Combinator" &&
            ((r[" "] = !0), t.push({ type: "Combinator", value: " " })),
        t.push(n),
        (a = n),
        (i = e.pos));
    return (
      a !== null &&
        a.type === "Combinator" &&
        $(e, e.pos - i, "Unexpected combinator"),
      {
        type: "Group",
        terms: t,
        combinator: Vc(t, r) || " ",
        disallowEmpty: !1,
        multiplier: Ve,
        explicit: !1,
      }
    );
  }
  function Qc(e) {
    var t;
    return (
      e.eat(Yn),
      (t = Qe(e)),
      e.eat(zc),
      (t.explicit = !0),
      (t.multiplier = Zn(e)),
      e.charCode() === Pc && (e.pos++, (t.disallowEmpty = !0)),
      t
    );
  }
  function Kc(e) {
    var t = e.charCode();
    if (t < 128 && Vn[t] === 1) return jc(e);
    switch (t) {
      case Yn:
        return Qc(e);
      case jt:
        return e.nextCharCode() === je ? Hc(e) : Wc(e);
      case Hn:
        return {
          type: "Combinator",
          value: e.substringToPos(
            e.nextCharCode() === Hn ? e.pos + 2 : e.pos + 1
          ),
        };
      case Fn:
        return e.pos++, e.eat(Fn), { type: "Combinator", value: "&&" };
      case Bn:
        return e.pos++, { type: "Comma", value: "," };
      case Mc:
        return e.pos++, { type: "Slash", value: "/" };
      case _c:
        return e.pos++, { type: "Percent", value: "%" };
      case Ht:
        e.pos++;
        var r = Qe(e);
        return e.eat(Wt), { type: "Parentheses", children: r };
      case je:
        return { type: "String", value: Yc(e) };
      case Dn:
      case Mn:
      case qn:
      case Un:
      case zn:
        return { type: "Spaces", value: Gc(e) };
    }
  }
  function $(e, t, r) {
    throw new Rc(r || "Unexpected input", e.str, t);
  }
  function $n(e) {
    var t = new Kn(e),
      r = Qe(t);
    return (
      t.pos !== e.length && $(t, t.pos),
      r.terms.length === 1 && r.terms[0].type === "Group" && (r = r.terms[0]),
      r
    );
  }
  $n("[a&&<b>#|<'c'>*||e(){2,} f{2} /,(% g#{1,2})]!");
  On.exports = $n;
});
var Xt = c((Ng, Jn) => {
  "use strict";
  Jn.exports = function e(t, r, n) {
    switch (t.type) {
      case "Group":
        t.terms.forEach(function (a) {
          e(a, r, n);
        });
        break;
      case "Function":
      case "Parentheses":
        e(t.children, r, n);
        break;
      case "Keyword":
      case "Type":
      case "Property":
      case "Combinator":
      case "Comma":
      case "Slash":
      case "String":
      case "Percent":
        break;
      default:
        throw new Error("Unknown type: " + t.type);
    }
    r.call(n, t);
  };
});
var na = c((_g, ea) => {
  "use strict";
  var ta = we(),
    Xc = { comma: !1, min: 1, max: 1 };
  function Ee(e) {
    for (
      ;
      e !== null && (e.data.type === "WhiteSpace" || e.data.type === "Comment");

    )
      e = e.next;
    return e;
  }
  function ce(e, t) {
    var r = t.type || t.syntax.type;
    r === "Group" ? e.push.apply(e, t.match) : e.push(t);
  }
  function ra() {
    return {
      type: this.syntax.type,
      name: this.syntax.name,
      match: this.match,
      node: this.node,
    };
  }
  function Zt(e, t, r, n) {
    return e
      ? { badNode: e, lastNode: null, next: null, match: null }
      : { badNode: null, lastNode: t, next: r, match: n };
  }
  function Zc(e, t, r) {
    var n = [],
      a,
      i = t.multiplier || Xc,
      o = i.min,
      l = i.max === 0 ? Infinity : i.max,
      s,
      u,
      h = 0,
      p = null,
      f = null;
    e: for (; h < l; ) {
      switch (((r = Ee(r)), (a = []), t.combinator)) {
        case "|":
          for (var d = 0; d < t.terms.length; d++) {
            var b = t.terms[d],
              m = J(e, b, r);
            if (m.match) {
              ce(a, m.match), (r = m.next);
              break;
            } else if (m.badNode) {
              f = m.badNode;
              break e;
            } else m.lastNode && (p = m.lastNode);
          }
          if (a.length === 0) break e;
          break;
        case " ":
          for (
            var L = r, w = null, B = !1, ye = !1, d = 0;
            d < t.terms.length;
            d++
          ) {
            var b = t.terms[d],
              m = J(e, b, r);
            if (m.match) {
              if (b.type === "Comma" && d !== 0 && !B) {
                (p = r && r.data), (r = L);
                break e;
              }
              if (m.next !== r) {
                if (ye) {
                  (p = r && r.data), (r = L);
                  break e;
                }
                (B = b.type !== "Comma"), (w = b);
              }
              ce(a, m.match), (r = Ee(m.next));
            } else if (m.badNode) {
              f = m.badNode;
              break e;
            } else {
              if (
                (m.lastNode && (p = m.lastNode),
                b.type === "Comma" && d !== 0 && d !== t.terms.length - 1)
              ) {
                B && (ye = !0);
                continue;
              }
              (p = m.lastNode || (r && r.data)), (r = L);
              break e;
            }
          }
          if (!w && t.disallowEmpty) {
            (p = r && r.data), (r = L);
            break e;
          }
          if (w && w.type === "Comma" && b.type !== "Comma") {
            (p = r && r.data), (r = L);
            break e;
          }
          break;
        case "&&":
          for (var L = r, w = null, z = t.terms.slice(); z.length; ) {
            for (var ke = !1, Se = 0, d = 0; d < z.length; d++) {
              var b = z[d],
                m = J(e, b, r);
              if (m.match) {
                if (m.next !== r) w = b;
                else {
                  Se++;
                  continue;
                }
                (ke = !0), z.splice(d--, 1), ce(a, m.match), (r = Ee(m.next));
                break;
              } else if (m.badNode) {
                f = m.badNode;
                break e;
              } else m.lastNode && (p = m.lastNode);
            }
            if (!ke) {
              if (Se === z.length) break;
              (p = r && r.data), (r = L);
              break e;
            }
          }
          if (!w && t.disallowEmpty) {
            (p = r && r.data), (r = L);
            break e;
          }
          break;
        case "||":
          for (var L = r, w = null, z = t.terms.slice(); z.length; ) {
            for (var ke = !1, Se = 0, d = 0; d < z.length; d++) {
              var b = z[d],
                m = J(e, b, r);
              if (m.match) {
                if (m.next !== r) w = b;
                else {
                  Se++;
                  continue;
                }
                (ke = !0), z.splice(d--, 1), ce(a, m.match), (r = Ee(m.next));
                break;
              } else if (m.badNode) {
                f = m.badNode;
                break e;
              } else m.lastNode && (p = m.lastNode);
            }
            if (!ke) break;
          }
          if (!w && (Se !== z.length || t.disallowEmpty)) {
            (p = r && r.data), (r = L);
            break e;
          }
          break;
      }
      if ((n.push.apply(n, a), h++, !r)) break;
      if (i.comma) {
        if (u && s === n.length) break e;
        if (
          ((r = Ee(r)),
          r !== null && r.data.type === "Operator" && r.data.value === ",")
        )
          n.push({
            syntax: t,
            match: [{ type: "ASTNode", node: r.data, childrenMatch: null }],
          }),
            (s = n.length),
            (u = r),
            (r = r.next);
        else {
          p = r !== null ? r.data : null;
          break e;
        }
      }
    }
    return (
      u && s === n.length && ((r = u), n.pop()),
      Zt(f, p, r, h < o ? null : { syntax: t, match: n, toJSON: ra })
    );
  }
  function J(e, t, r) {
    var n = null,
      a = null,
      i = null;
    switch (t.type) {
      case "Group":
        return Zc(e, t, r);
      case "Function":
        if (!r || r.data.type !== "Function") break;
        var o = ta.keyword(r.data.name),
          l = t.name.toLowerCase();
        if (l !== o.vendor + o.name) break;
        var s = J(e, t.children, r.data.children.head);
        if (!s.match || s.next) {
          n =
            s.badNode || s.lastNode || (s.next ? s.next.data : null) || r.data;
          break;
        }
        (i = [{ type: "ASTNode", node: r.data, childrenMatch: s.match.match }]),
          (r = r.next);
        break;
      case "Parentheses":
        if (!r || r.data.type !== "Parentheses") break;
        var s = J(e, t.children, r.data.children.head);
        if (!s.match || s.next) {
          n =
            s.badNode || s.lastNode || (s.next ? s.next.data : null) || r.data;
          break;
        }
        (i = [{ type: "ASTNode", node: r.data, childrenMatch: s.match.match }]),
          (r = s.next);
        break;
      case "Type":
        var u = e.getType(t.name);
        if (!u) throw new Error("Unknown syntax type `" + t.name + "`");
        var s = u.match(r);
        if (!s.match) {
          (n = s && s.badNode), (a = (s && s.lastNode) || (r && r.data));
          break;
        }
        (r = s.next), ce((i = []), s.match), i.length === 0 && (i = null);
        break;
      case "Property":
        var h = e.getProperty(t.name);
        if (!h) throw new Error("Unknown property `" + t.name + "`");
        var s = h.match(r);
        if (!s.match) {
          (n = s && s.badNode), (a = (s && s.lastNode) || (r && r.data));
          break;
        }
        (r = s.next), ce((i = []), s.match), i.length === 0 && (i = null);
        break;
      case "Keyword":
        if (!r) break;
        if (r.data.type === "Identifier") {
          var o = ta.keyword(r.data.name),
            p = o.name,
            l = t.name.toLowerCase();
          if (
            (p.indexOf("\\") !== -1 && (p = p.replace(/\\[09].*$/, "")),
            l !== o.vendor + p)
          )
            break;
        } else if (r.data.type !== "Number" || r.data.value !== t.name) break;
        (i = [{ type: "ASTNode", node: r.data, childrenMatch: null }]),
          (r = r.next);
        break;
      case "Slash":
      case "Comma":
        if (!r || r.data.type !== "Operator" || r.data.value !== t.value) break;
        (i = [{ type: "ASTNode", node: r.data, childrenMatch: null }]),
          (r = r.next);
        break;
      case "String":
        if (!r || r.data.type !== "String") break;
        (i = [{ type: "ASTNode", node: r.data, childrenMatch: null }]),
          (r = r.next);
        break;
      case "ASTNode":
        return (
          r &&
            t.match(r) &&
            ((i = { type: "ASTNode", node: r.data, childrenMatch: null }),
            (r = r.next)),
          Zt(n, a, r, i)
        );
      default:
        throw new Error("Not implemented yet node type: " + t.type);
    }
    return Zt(n, a, r, i === null ? null : { syntax: t, match: i, toJSON: ra });
  }
  ea.exports = J;
});
var oa = c((Ig, aa) => {
  function ia(e) {
    function t(n) {
      if (n.type === "ASTNode") {
        if (n.node === e) return (r = []), !0;
        if (n.childrenMatch) {
          for (var a = 0; a < n.childrenMatch.length; a++)
            if (t(n.childrenMatch[a])) return !0;
        }
      } else
        for (var a = 0; a < n.match.length; a++)
          if (t(n.match[a]))
            return (
              (n.syntax.type === "Type" ||
                n.syntax.type === "Property" ||
                n.syntax.type === "Keyword") &&
                r.unshift(n.syntax),
              !0
            );
      return !1;
    }
    var r = null;
    return this.matched !== null && t(this.matched), r;
  }
  function $t(e, t, r) {
    var n = ia.call(e, t);
    return n === null ? !1 : n.some(r);
  }
  function $c(e, t) {
    return $t(this, e, function (r) {
      return r.type === "Type" && r.name === t;
    });
  }
  function Jc(e, t) {
    return $t(this, e, function (r) {
      return r.type === "Property" && r.name === t;
    });
  }
  function eh(e) {
    return $t(this, e, function (t) {
      return t.type === "Keyword";
    });
  }
  aa.exports = { getTrace: ia, isType: $c, isProperty: Jc, isKeyword: eh };
});
var ca = c((Og, sa) => {
  var th = S();
  function la(e) {
    return e.type === "ASTNode"
      ? e.node
      : e.match.length !== 0
      ? la(e.match[0])
      : null;
  }
  function ua(e) {
    return e.type === "ASTNode"
      ? e.node
      : e.match.length !== 0
      ? ua(e.match[e.match.length - 1])
      : null;
  }
  function rh(e, t, r, n, a) {
    function i(l) {
      if (l.type !== "ASTNode") {
        if (l.syntax.type === n && l.syntax.name === a) {
          var s = la(l),
            u = ua(l);
          e.syntax.walk(t, function (h, p, f) {
            if (h === s) {
              var d = new th(),
                b = null;
              do {
                if ((d.appendData(p.data), p.data === u)) break;
                p = p.next;
              } while (p !== null);
              s.loc !== null &&
                u.loc !== null &&
                (b = {
                  source: s.loc.source,
                  start: s.loc.start,
                  end: u.loc.end,
                }),
                o.push({ parent: f, loc: b, nodes: d });
            }
          });
        }
        l.match.forEach(i);
      }
    }
    var o = [];
    return r.matched !== null && i(r.matched), o;
  }
  sa.exports = { matchFragments: rh };
});
var fa = c((Mg, ha) => {
  var nh = S();
  function Jt(e) {
    return typeof e == "number" && isFinite(e) && Math.floor(e) === e && e >= 0;
  }
  function pa(e) {
    return Boolean(e) && Jt(e.offset) && Jt(e.line) && Jt(e.column);
  }
  function ah(e, t) {
    return function (n, a) {
      if (!n || n.constructor !== Object)
        return a("Type of node should be an object");
      for (var i in n)
        if (i === "type")
          n.type !== e &&
            a("Wrong node type `" + n.type + "` but expected `" + e + "`");
        else if (i === "loc") {
          if (n.loc === null) continue;
          if (
            n.loc &&
            n.loc.constructor === Object &&
            typeof n.loc.source == "string" &&
            pa(n.loc.start) &&
            pa(n.loc.end)
          )
            continue;
          a("Wrong value for `" + e + "." + i + "` field");
        } else if (t.hasOwnProperty(i)) {
          for (var o = 0, l = !1; !l && o < t[i].length; o++) {
            var s = t[i][o];
            switch (s) {
              case String:
                l = typeof n[i] == "string";
                break;
              case Boolean:
                l = typeof n[i] == "boolean";
                break;
              case null:
                l = n[i] === null;
                break;
              default:
                typeof s == "string"
                  ? (l = n[i] && n[i].type === s)
                  : Array.isArray(s) && (l = n[i] instanceof nh);
            }
          }
          l || a("Wrong value for `" + e + "." + i + "` field");
        } else a("Unknown field `" + i + "` for " + e);
      for (var i in t)
        hasOwnProperty.call(n, i) === !1 &&
          a("Field `" + e + "." + i + "` is missed");
    };
  }
  function ih(e, t) {
    var r = t.structure,
      n = { type: String, loc: !0 },
      a = { type: '"' + e + '"' };
    for (var i in r) {
      for (
        var o = [],
          l = (n[i] = Array.isArray(r[i]) ? r[i].slice() : [r[i]]),
          s = 0;
        s < l.length;
        s++
      ) {
        var u = l[s];
        if (u === String || u === Boolean) o.push(u.name);
        else if (u === null) o.push("null");
        else if (typeof u == "string") o.push("<" + u + ">");
        else if (Array.isArray(u)) o.push("List");
        else throw new Error("Wrong value in `" + e + "` structure definition");
      }
      a[i] = o.join(" | ");
    }
    return { docs: a, check: ah(e, n) };
  }
  ha.exports = {
    getStructureFromConfig: function (e) {
      var t = {};
      if (e.node)
        for (var r in e.node) {
          var n = e.node[r];
          if (n.structure) t[r] = ih(r, n);
          else
            throw new Error(
              "Missed `structure` field in `" + r + "` node type definition"
            );
        }
      return t;
    },
  };
});
var xa = c((qg, da) => {
  "use strict";
  var ga = Bt().SyntaxReferenceError,
    ma = Bt().MatchError,
    oh = we(),
    er = _n(),
    tr = Qt(),
    sh = He(),
    lh = Xt(),
    rr = na(),
    Xe = oa(),
    va = ca(),
    uh = fa().getStructureFromConfig,
    ch = tr("inherit | initial | unset"),
    hh = tr("inherit | initial | unset | <expression>");
  function ba(e, t) {
    var r = {};
    for (var n in e) e[n].syntax && (r[n] = t ? e[n].syntax : sh(e[n].syntax));
    return r;
  }
  function ya(e) {
    return e && e.data;
  }
  function ph(e) {
    var t = !1;
    return (
      this.syntax.walk(e, function (r) {
        r.type === "Function" && r.name.toLowerCase() === "var" && (t = !0);
      }),
      t
    );
  }
  function fh(e) {
    return e.type === "Identifier" && /^\\[09]/.test(e.name);
  }
  function dh(e) {
    for (; e !== null; ) {
      if (
        e.data.type !== "WhiteSpace" &&
        e.data.type !== "Comment" &&
        !fh(e.data)
      )
        return !1;
      e = e.next;
    }
    return !0;
  }
  function Y(e, t) {
    return {
      matched: e,
      error: t,
      getTrace: Xe.getTrace,
      isType: Xe.isType,
      isProperty: Xe.isProperty,
      isKeyword: Xe.isKeyword,
    };
  }
  function ka(e, t, r) {
    var n;
    return !r || r.type !== "Value"
      ? Y(null, new Error("Not a Value node"))
      : ph.call(e, r)
      ? Y(null, new Error("Matching for a value with var() is not supported"))
      : ((n = rr(e, e.valueCommonSyntax, r.children.head)),
        !n.match && ((n = t.match(r.children.head)), !n.match)
          ? Y(null, new ma("Mismatch", e, t.syntax, r, n.badNode || ya(n.next)))
          : (n.match.type === "ASTNode"
              ? (n.match = {
                  syntax: { type: t.type, name: t.name },
                  match: [n.match],
                })
              : n.match.syntax.type === "Group" &&
                (n.match.syntax = { type: t.type, name: t.name }),
            n.next && !dh(n.next)
              ? Y(
                  null,
                  new ma(
                    "Uncomplete match",
                    e,
                    t.syntax,
                    r,
                    n.badNode || ya(n.next)
                  )
                )
              : Y(n.match, null)));
  }
  var Sa = function (e, t, r) {
    if (
      ((this.valueCommonSyntax = ch),
      (this.syntax = t),
      (this.generic = !1),
      (this.properties = {}),
      (this.types = {}),
      (this.structure = r || uh(e)),
      e)
    ) {
      if (e.generic) {
        this.generic = !0;
        for (var n in er) this.addType_(n, er[n]);
      }
      if (e.types) for (var n in e.types) this.addType_(n, e.types[n]);
      if (e.properties)
        for (var n in e.properties) this.addProperty_(n, e.properties[n]);
    }
  };
  Sa.prototype = {
    structure: {},
    checkStructure: function (e) {
      var t = this.structure,
        r = [];
      return (
        this.syntax.walk(e, function (n) {
          if (t.hasOwnProperty(n.type)) t[n.type].check(n, r.push.bind(r));
          else throw new Error("Unknown node type: " + n.type);
        }),
        r.length ? r : !1
      );
    },
    createDescriptor: function (e, t, r) {
      var n = this,
        a = { type: t, name: r, syntax: null, match: null };
      return (
        typeof e == "function"
          ? ((e = { type: "ASTNode", match: e }),
            (a.match = function (i) {
              return rr(n, e, i);
            }))
          : (typeof e == "string"
              ? Object.defineProperty(a, "syntax", {
                  get: function () {
                    return (
                      Object.defineProperty(a, "syntax", { value: tr(e) }),
                      a.syntax
                    );
                  },
                })
              : (a.syntax = e),
            (a.match = function (i) {
              return rr(n, a.syntax, i);
            })),
        a
      );
    },
    addProperty_: function (e, t) {
      this.properties[e] = this.createDescriptor(t, "Property", e);
    },
    addType_: function (e, t) {
      (this.types[e] = this.createDescriptor(t, "Type", e)),
        t === er.expression && (this.valueCommonSyntax = hh);
    },
    matchDeclaration: function (e) {
      return e.type !== "Declaration"
        ? Y(null, new Error("Not a Declaration node"))
        : this.matchProperty(e.property, e.value);
    },
    matchProperty: function (e, t) {
      var r = oh.property(e);
      if (r.custom)
        return Y(
          null,
          new Error("Lexer matching doesn't applicable for custom properties")
        );
      var n = r.vendor
        ? this.getProperty(r.vendor + r.name) || this.getProperty(r.name)
        : this.getProperty(r.name);
      return n ? ka(this, n, t) : Y(null, new ga("Unknown property", e));
    },
    matchType: function (e, t) {
      var r = this.getType(e);
      return r ? ka(this, r, t) : Y(null, new ga("Unknown type", e));
    },
    findValueFragments: function (e, t, r, n) {
      return va.matchFragments(this, t, this.matchProperty(e, t), r, n);
    },
    findDeclarationValueFragments: function (e, t, r) {
      return va.matchFragments(this, e.value, this.matchDeclaration(e), t, r);
    },
    findAllFragments: function (e, t, r) {
      var n = [];
      return (
        this.syntax.walkDeclarations(
          e,
          function (a) {
            n.push.apply(n, this.findDeclarationValueFragments(a, t, r));
          }.bind(this)
        ),
        n
      );
    },
    getProperty: function (e) {
      return this.properties.hasOwnProperty(e) ? this.properties[e] : null;
    },
    getType: function (e) {
      return this.types.hasOwnProperty(e) ? this.types[e] : null;
    },
    validate: function () {
      function e(a, i, o, l) {
        if (o.hasOwnProperty(i)) return o[i];
        (o[i] = !1),
          l.syntax !== null &&
            lh(
              l.syntax,
              function (s) {
                if (!(s.type !== "Type" && s.type !== "Property")) {
                  var u = s.type === "Type" ? a.types : a.properties,
                    h = s.type === "Type" ? t : r;
                  (!u.hasOwnProperty(s.name) || e(a, s.name, h, u[s.name])) &&
                    (o[i] = !0);
                }
              },
              this
            );
      }
      var t = {},
        r = {};
      for (var n in this.types) e(this, n, t, this.types[n]);
      for (var n in this.properties) e(this, n, r, this.properties[n]);
      return (
        (t = Object.keys(t).filter(function (a) {
          return t[a];
        })),
        (r = Object.keys(r).filter(function (a) {
          return r[a];
        })),
        t.length || r.length ? { types: t, properties: r } : null
      );
    },
    dump: function (e) {
      return {
        generic: this.generic,
        types: ba(this.types, e),
        properties: ba(this.properties, e),
      };
    },
    toString: function () {
      return JSON.stringify(this.dump());
    },
  };
  da.exports = Sa;
});
var Ea = c((zg, wa) => {
  wa.exports = {
    SyntaxParseError: Yt().SyntaxParseError,
    parse: Qt(),
    translate: He(),
    walk: Xt(),
  };
});
var Aa = c((Ug, Ca) => {
  var gh = S(),
    Ta = v().TYPE,
    mh = Ta.WhiteSpace,
    vh = Ta.Comment;
  Ca.exports = function (t) {
    var r = new gh(),
      n = null,
      a = { recognizer: t, space: null, ignoreWS: !1, ignoreWSAfter: !1 };
    for (this.scanner.skipSC(); !this.scanner.eof; ) {
      switch (this.scanner.tokenType) {
        case vh:
          this.scanner.next();
          continue;
        case mh:
          a.ignoreWS ? this.scanner.next() : (a.space = this.WhiteSpace());
          continue;
      }
      if (((n = t.getNode.call(this, a)), n === void 0)) break;
      a.space !== null && (r.appendData(a.space), (a.space = null)),
        r.appendData(n),
        a.ignoreWSAfter
          ? ((a.ignoreWSAfter = !1), (a.ignoreWS = !0))
          : (a.ignoreWS = !1);
    }
    return r;
  };
});
var Pa = c((Dg, La) => {
  "use strict";
  var bh = v(),
    yh = Aa(),
    Ra = function () {};
  function kh(e) {
    return function () {
      return this[e]();
    };
  }
  function Sh(e) {
    var t = { context: {}, scope: {}, atrule: {}, pseudo: {} };
    if (e.parseContext)
      for (var r in e.parseContext)
        switch (typeof e.parseContext[r]) {
          case "function":
            t.context[r] = e.parseContext[r];
            break;
          case "string":
            t.context[r] = kh(e.parseContext[r]);
            break;
        }
    if (e.scope) for (var r in e.scope) t.scope[r] = e.scope[r];
    if (e.atrule)
      for (var r in e.atrule) {
        var n = e.atrule[r];
        n.parse && (t.atrule[r] = n.parse);
      }
    if (e.pseudo)
      for (var r in e.pseudo) {
        var a = e.pseudo[r];
        a.parse && (t.pseudo[r] = a.parse);
      }
    if (e.node) for (var r in e.node) t[r] = e.node[r].parse;
    return t;
  }
  La.exports = function (t) {
    var r = {
      scanner: new bh(),
      filename: "<unknown>",
      needPositions: !1,
      tolerant: !1,
      onParseError: Ra,
      parseAtruleExpression: !0,
      parseSelector: !0,
      parseValue: !0,
      parseCustomProperty: !1,
      readSequence: yh,
      tolerantParse: function (a, i) {
        if (this.tolerant) {
          var o = this.scanner.currentToken;
          try {
            return a.call(this);
          } catch (l) {
            return this.onParseError(l), i.call(this, o);
          }
        } else return a.call(this);
      },
      getLocation: function (a, i) {
        return this.needPositions
          ? this.scanner.getLocationRange(a, i, this.filename)
          : null;
      },
      getLocationFromList: function (a) {
        return this.needPositions
          ? this.scanner.getLocationRange(
              a.head !== null
                ? a.first().loc.start.offset - this.scanner.startOffset
                : this.scanner.tokenStart,
              a.head !== null
                ? a.last().loc.end.offset - this.scanner.startOffset
                : this.scanner.tokenStart,
              this.filename
            )
          : null;
      },
    };
    t = Sh(t || {});
    for (var n in t) r[n] = t[n];
    return function (a, i) {
      i = i || {};
      var o = i.context || "default",
        l;
      if (
        (r.scanner.setSource(a, i.offset, i.line, i.column),
        (r.filename = i.filename || "<unknown>"),
        (r.needPositions = Boolean(i.positions)),
        (r.tolerant = Boolean(i.tolerant)),
        (r.onParseError =
          typeof i.onParseError == "function" ? i.onParseError : Ra),
        (r.parseAtruleExpression =
          "parseAtruleExpression" in i ? Boolean(i.parseAtruleExpression) : !0),
        (r.parseSelector =
          "parseSelector" in i ? Boolean(i.parseSelector) : !0),
        (r.parseValue = "parseValue" in i ? Boolean(i.parseValue) : !0),
        (r.parseCustomProperty =
          "parseCustomProperty" in i ? Boolean(i.parseCustomProperty) : !1),
        !r.context.hasOwnProperty(o))
      )
        throw new Error("Unknown context `" + o + "`");
      return (
        (l = r.context[o].call(r, i)), r.scanner.eof || r.scanner.error(), l
      );
    };
  };
});
var _a = c((nr) => {
  var Na = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
    ""
  );
  nr.encode = function (e) {
    if (0 <= e && e < Na.length) return Na[e];
    throw new TypeError("Must be between 0 and 63: " + e);
  };
  nr.decode = function (e) {
    var t = 65,
      r = 90,
      n = 97,
      a = 122,
      i = 48,
      o = 57,
      l = 43,
      s = 47,
      u = 26,
      h = 52;
    return t <= e && e <= r
      ? e - t
      : n <= e && e <= a
      ? e - n + u
      : i <= e && e <= o
      ? e - i + h
      : e == l
      ? 62
      : e == s
      ? 63
      : -1;
  };
});
var or = c((ar) => {
  var Ia = _a(),
    ir = 5,
    Oa = 1 << ir,
    Ma = Oa - 1,
    qa = Oa;
  function xh(e) {
    return e < 0 ? (-e << 1) + 1 : (e << 1) + 0;
  }
  function wh(e) {
    var t = (e & 1) == 1,
      r = e >> 1;
    return t ? -r : r;
  }
  ar.encode = function (t) {
    var r = "",
      n,
      a = xh(t);
    do (n = a & Ma), (a >>>= ir), a > 0 && (n |= qa), (r += Ia.encode(n));
    while (a > 0);
    return r;
  };
  ar.decode = function (t, r, n) {
    var a = t.length,
      i = 0,
      o = 0,
      l,
      s;
    do {
      if (r >= a) throw new Error("Expected more digits in base 64 VLQ value.");
      if (((s = Ia.decode(t.charCodeAt(r++))), s === -1))
        throw new Error("Invalid base64 digit: " + t.charAt(r - 1));
      (l = !!(s & qa)), (s &= Ma), (i = i + (s << o)), (o += ir);
    } while (l);
    (n.value = wh(i)), (n.rest = r);
  };
});
var he = c((P) => {
  function Eh(e, t, r) {
    if (t in e) return e[t];
    if (arguments.length === 3) return r;
    throw new Error('"' + t + '" is a required argument.');
  }
  P.getArg = Eh;
  var za = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,
    Ch = /^data:.+\,.+$/;
  function Ze(e) {
    var t = e.match(za);
    return t
      ? { scheme: t[1], auth: t[2], host: t[3], port: t[4], path: t[5] }
      : null;
  }
  P.urlParse = Ze;
  function Ce(e) {
    var t = "";
    return (
      e.scheme && (t += e.scheme + ":"),
      (t += "//"),
      e.auth && (t += e.auth + "@"),
      e.host && (t += e.host),
      e.port && (t += ":" + e.port),
      e.path && (t += e.path),
      t
    );
  }
  P.urlGenerate = Ce;
  function Ua(e) {
    var t = e,
      r = Ze(e);
    if (r) {
      if (!r.path) return e;
      t = r.path;
    }
    for (
      var n = P.isAbsolute(t), a = t.split(/\/+/), i, o = 0, l = a.length - 1;
      l >= 0;
      l--
    )
      (i = a[l]),
        i === "."
          ? a.splice(l, 1)
          : i === ".."
          ? o++
          : o > 0 &&
            (i === "" ? (a.splice(l + 1, o), (o = 0)) : (a.splice(l, 2), o--));
    return (
      (t = a.join("/")),
      t === "" && (t = n ? "/" : "."),
      r ? ((r.path = t), Ce(r)) : t
    );
  }
  P.normalize = Ua;
  function Th(e, t) {
    e === "" && (e = "."), t === "" && (t = ".");
    var r = Ze(t),
      n = Ze(e);
    if ((n && (e = n.path || "/"), r && !r.scheme))
      return n && (r.scheme = n.scheme), Ce(r);
    if (r || t.match(Ch)) return t;
    if (n && !n.host && !n.path) return (n.host = t), Ce(n);
    var a = t.charAt(0) === "/" ? t : Ua(e.replace(/\/+$/, "") + "/" + t);
    return n ? ((n.path = a), Ce(n)) : a;
  }
  P.join = Th;
  P.isAbsolute = function (e) {
    return e.charAt(0) === "/" || !!e.match(za);
  };
  function Ah(e, t) {
    e === "" && (e = "."), (e = e.replace(/\/$/, ""));
    for (var r = 0; t.indexOf(e + "/") !== 0; ) {
      var n = e.lastIndexOf("/");
      if (n < 0 || ((e = e.slice(0, n)), e.match(/^([^\/]+:\/)?\/*$/)))
        return t;
      ++r;
    }
    return Array(r + 1).join("../") + t.substr(e.length + 1);
  }
  P.relative = Ah;
  var Da = (function () {
    var e = Object.create(null);
    return !("__proto__" in e);
  })();
  function Fa(e) {
    return e;
  }
  function Lh(e) {
    return Ba(e) ? "$" + e : e;
  }
  P.toSetString = Da ? Fa : Lh;
  function Rh(e) {
    return Ba(e) ? e.slice(1) : e;
  }
  P.fromSetString = Da ? Fa : Rh;
  function Ba(e) {
    if (!e) return !1;
    var t = e.length;
    if (
      t < 9 ||
      e.charCodeAt(t - 1) !== 95 ||
      e.charCodeAt(t - 2) !== 95 ||
      e.charCodeAt(t - 3) !== 111 ||
      e.charCodeAt(t - 4) !== 116 ||
      e.charCodeAt(t - 5) !== 111 ||
      e.charCodeAt(t - 6) !== 114 ||
      e.charCodeAt(t - 7) !== 112 ||
      e.charCodeAt(t - 8) !== 95 ||
      e.charCodeAt(t - 9) !== 95
    )
      return !1;
    for (var r = t - 10; r >= 0; r--) if (e.charCodeAt(r) !== 36) return !1;
    return !0;
  }
  function Ph(e, t, r) {
    var n = e.source - t.source;
    return n !== 0 ||
      ((n = e.originalLine - t.originalLine), n !== 0) ||
      ((n = e.originalColumn - t.originalColumn), n !== 0 || r) ||
      ((n = e.generatedColumn - t.generatedColumn), n !== 0) ||
      ((n = e.generatedLine - t.generatedLine), n !== 0)
      ? n
      : e.name - t.name;
  }
  P.compareByOriginalPositions = Ph;
  function Nh(e, t, r) {
    var n = e.generatedLine - t.generatedLine;
    return n !== 0 ||
      ((n = e.generatedColumn - t.generatedColumn), n !== 0 || r) ||
      ((n = e.source - t.source), n !== 0) ||
      ((n = e.originalLine - t.originalLine), n !== 0) ||
      ((n = e.originalColumn - t.originalColumn), n !== 0)
      ? n
      : e.name - t.name;
  }
  P.compareByGeneratedPositionsDeflated = Nh;
  function Ga(e, t) {
    return e === t ? 0 : e > t ? 1 : -1;
  }
  function _h(e, t) {
    var r = e.generatedLine - t.generatedLine;
    return r !== 0 ||
      ((r = e.generatedColumn - t.generatedColumn), r !== 0) ||
      ((r = Ga(e.source, t.source)), r !== 0) ||
      ((r = e.originalLine - t.originalLine), r !== 0) ||
      ((r = e.originalColumn - t.originalColumn), r !== 0)
      ? r
      : Ga(e.name, t.name);
  }
  P.compareByGeneratedPositionsInflated = _h;
});
var ur = c((Ya) => {
  var sr = he(),
    lr = Object.prototype.hasOwnProperty,
    ee = typeof Map != "undefined";
  function H() {
    (this._array = []), (this._set = ee ? new Map() : Object.create(null));
  }
  H.fromArray = function (t, r) {
    for (var n = new H(), a = 0, i = t.length; a < i; a++) n.add(t[a], r);
    return n;
  };
  H.prototype.size = function () {
    return ee ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  };
  H.prototype.add = function (t, r) {
    var n = ee ? t : sr.toSetString(t),
      a = ee ? this.has(t) : lr.call(this._set, n),
      i = this._array.length;
    (!a || r) && this._array.push(t),
      a || (ee ? this._set.set(t, i) : (this._set[n] = i));
  };
  H.prototype.has = function (t) {
    if (ee) return this._set.has(t);
    var r = sr.toSetString(t);
    return lr.call(this._set, r);
  };
  H.prototype.indexOf = function (t) {
    if (ee) {
      var r = this._set.get(t);
      if (r >= 0) return r;
    } else {
      var n = sr.toSetString(t);
      if (lr.call(this._set, n)) return this._set[n];
    }
    throw new Error('"' + t + '" is not in the set.');
  };
  H.prototype.at = function (t) {
    if (t >= 0 && t < this._array.length) return this._array[t];
    throw new Error("No element indexed by " + t);
  };
  H.prototype.toArray = function () {
    return this._array.slice();
  };
  Ya.ArraySet = H;
});
var ja = c((Ha) => {
  var Wa = he();
  function Ih(e, t) {
    var r = e.generatedLine,
      n = t.generatedLine,
      a = e.generatedColumn,
      i = t.generatedColumn;
    return (
      n > r ||
      (n == r && i >= a) ||
      Wa.compareByGeneratedPositionsInflated(e, t) <= 0
    );
  }
  function $e() {
    (this._array = []),
      (this._sorted = !0),
      (this._last = { generatedLine: -1, generatedColumn: 0 });
  }
  $e.prototype.unsortedForEach = function (t, r) {
    this._array.forEach(t, r);
  };
  $e.prototype.add = function (t) {
    Ih(this._last, t)
      ? ((this._last = t), this._array.push(t))
      : ((this._sorted = !1), this._array.push(t));
  };
  $e.prototype.toArray = function () {
    return (
      this._sorted ||
        (this._array.sort(Wa.compareByGeneratedPositionsInflated),
        (this._sorted = !0)),
      this._array
    );
  };
  Ha.MappingList = $e;
});
var cr = c((Va) => {
  var Te = or(),
    C = he(),
    Je = ur().ArraySet,
    Oh = ja().MappingList;
  function O(e) {
    e || (e = {}),
      (this._file = C.getArg(e, "file", null)),
      (this._sourceRoot = C.getArg(e, "sourceRoot", null)),
      (this._skipValidation = C.getArg(e, "skipValidation", !1)),
      (this._sources = new Je()),
      (this._names = new Je()),
      (this._mappings = new Oh()),
      (this._sourcesContents = null);
  }
  O.prototype._version = 3;
  O.fromSourceMap = function (t) {
    var r = t.sourceRoot,
      n = new O({ file: t.file, sourceRoot: r });
    return (
      t.eachMapping(function (a) {
        var i = {
          generated: { line: a.generatedLine, column: a.generatedColumn },
        };
        a.source != null &&
          ((i.source = a.source),
          r != null && (i.source = C.relative(r, i.source)),
          (i.original = { line: a.originalLine, column: a.originalColumn }),
          a.name != null && (i.name = a.name)),
          n.addMapping(i);
      }),
      t.sources.forEach(function (a) {
        var i = t.sourceContentFor(a);
        i != null && n.setSourceContent(a, i);
      }),
      n
    );
  };
  O.prototype.addMapping = function (t) {
    var r = C.getArg(t, "generated"),
      n = C.getArg(t, "original", null),
      a = C.getArg(t, "source", null),
      i = C.getArg(t, "name", null);
    this._skipValidation || this._validateMapping(r, n, a, i),
      a != null &&
        ((a = String(a)), this._sources.has(a) || this._sources.add(a)),
      i != null && ((i = String(i)), this._names.has(i) || this._names.add(i)),
      this._mappings.add({
        generatedLine: r.line,
        generatedColumn: r.column,
        originalLine: n != null && n.line,
        originalColumn: n != null && n.column,
        source: a,
        name: i,
      });
  };
  O.prototype.setSourceContent = function (t, r) {
    var n = t;
    this._sourceRoot != null && (n = C.relative(this._sourceRoot, n)),
      r != null
        ? (this._sourcesContents ||
            (this._sourcesContents = Object.create(null)),
          (this._sourcesContents[C.toSetString(n)] = r))
        : this._sourcesContents &&
          (delete this._sourcesContents[C.toSetString(n)],
          Object.keys(this._sourcesContents).length === 0 &&
            (this._sourcesContents = null));
  };
  O.prototype.applySourceMap = function (t, r, n) {
    var a = r;
    if (r == null) {
      if (t.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      a = t.file;
    }
    var i = this._sourceRoot;
    i != null && (a = C.relative(i, a));
    var o = new Je(),
      l = new Je();
    this._mappings.unsortedForEach(function (s) {
      if (s.source === a && s.originalLine != null) {
        var u = t.originalPositionFor({
          line: s.originalLine,
          column: s.originalColumn,
        });
        u.source != null &&
          ((s.source = u.source),
          n != null && (s.source = C.join(n, s.source)),
          i != null && (s.source = C.relative(i, s.source)),
          (s.originalLine = u.line),
          (s.originalColumn = u.column),
          u.name != null && (s.name = u.name));
      }
      var h = s.source;
      h != null && !o.has(h) && o.add(h);
      var p = s.name;
      p != null && !l.has(p) && l.add(p);
    }, this),
      (this._sources = o),
      (this._names = l),
      t.sources.forEach(function (s) {
        var u = t.sourceContentFor(s);
        u != null &&
          (n != null && (s = C.join(n, s)),
          i != null && (s = C.relative(i, s)),
          this.setSourceContent(s, u));
      }, this);
  };
  O.prototype._validateMapping = function (t, r, n, a) {
    if (r && typeof r.line != "number" && typeof r.column != "number")
      throw new Error(
        "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
      );
    if (
      !(
        t &&
        "line" in t &&
        "column" in t &&
        t.line > 0 &&
        t.column >= 0 &&
        !r &&
        !n &&
        !a
      )
    ) {
      if (
        t &&
        "line" in t &&
        "column" in t &&
        r &&
        "line" in r &&
        "column" in r &&
        t.line > 0 &&
        t.column >= 0 &&
        r.line > 0 &&
        r.column >= 0 &&
        n
      )
        return;
      throw new Error(
        "Invalid mapping: " +
          JSON.stringify({ generated: t, source: n, original: r, name: a })
      );
    }
  };
  O.prototype._serializeMappings = function () {
    for (
      var t = 0,
        r = 1,
        n = 0,
        a = 0,
        i = 0,
        o = 0,
        l = "",
        s,
        u,
        h,
        p,
        f = this._mappings.toArray(),
        d = 0,
        b = f.length;
      d < b;
      d++
    ) {
      if (((u = f[d]), (s = ""), u.generatedLine !== r))
        for (t = 0; u.generatedLine !== r; ) (s += ";"), r++;
      else if (d > 0) {
        if (!C.compareByGeneratedPositionsInflated(u, f[d - 1])) continue;
        s += ",";
      }
      (s += Te.encode(u.generatedColumn - t)),
        (t = u.generatedColumn),
        u.source != null &&
          ((p = this._sources.indexOf(u.source)),
          (s += Te.encode(p - o)),
          (o = p),
          (s += Te.encode(u.originalLine - 1 - a)),
          (a = u.originalLine - 1),
          (s += Te.encode(u.originalColumn - n)),
          (n = u.originalColumn),
          u.name != null &&
            ((h = this._names.indexOf(u.name)),
            (s += Te.encode(h - i)),
            (i = h))),
        (l += s);
    }
    return l;
  };
  O.prototype._generateSourcesContent = function (t, r) {
    return t.map(function (n) {
      if (!this._sourcesContents) return null;
      r != null && (n = C.relative(r, n));
      var a = C.toSetString(n);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, a)
        ? this._sourcesContents[a]
        : null;
    }, this);
  };
  O.prototype.toJSON = function () {
    var t = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings(),
    };
    return (
      this._file != null && (t.file = this._file),
      this._sourceRoot != null && (t.sourceRoot = this._sourceRoot),
      this._sourcesContents &&
        (t.sourcesContent = this._generateSourcesContent(
          t.sources,
          t.sourceRoot
        )),
      t
    );
  };
  O.prototype.toString = function () {
    return JSON.stringify(this.toJSON());
  };
  Va.SourceMapGenerator = O;
});
var Ka = c((te) => {
  te.GREATEST_LOWER_BOUND = 1;
  te.LEAST_UPPER_BOUND = 2;
  function hr(e, t, r, n, a, i) {
    var o = Math.floor((t - e) / 2) + e,
      l = a(r, n[o], !0);
    return l === 0
      ? o
      : l > 0
      ? t - o > 1
        ? hr(o, t, r, n, a, i)
        : i == te.LEAST_UPPER_BOUND
        ? t < n.length
          ? t
          : -1
        : o
      : o - e > 1
      ? hr(e, o, r, n, a, i)
      : i == te.LEAST_UPPER_BOUND
      ? o
      : e < 0
      ? -1
      : e;
  }
  te.search = function (t, r, n, a) {
    if (r.length === 0) return -1;
    var i = hr(-1, r.length, t, r, n, a || te.GREATEST_LOWER_BOUND);
    if (i < 0) return -1;
    for (; i - 1 >= 0 && n(r[i], r[i - 1], !0) === 0; ) --i;
    return i;
  };
});
var Xa = c((Qa) => {
  function pr(e, t, r) {
    var n = e[t];
    (e[t] = e[r]), (e[r] = n);
  }
  function Mh(e, t) {
    return Math.round(e + Math.random() * (t - e));
  }
  function fr(e, t, r, n) {
    if (r < n) {
      var a = Mh(r, n),
        i = r - 1;
      pr(e, a, n);
      for (var o = e[n], l = r; l < n; l++)
        t(e[l], o) <= 0 && ((i += 1), pr(e, i, l));
      pr(e, i + 1, l);
      var s = i + 1;
      fr(e, t, r, s - 1), fr(e, t, s + 1, n);
    }
  }
  Qa.quickSort = function (e, t) {
    fr(e, t, 0, e.length - 1);
  };
});
var $a = c((et) => {
  var g = he(),
    dr = Ka(),
    pe = ur().ArraySet,
    qh = or(),
    Ae = Xa().quickSort;
  function E(e) {
    var t = e;
    return (
      typeof e == "string" && (t = JSON.parse(e.replace(/^\)\]\}'/, ""))),
      t.sections != null ? new D(t) : new A(t)
    );
  }
  E.fromSourceMap = function (e) {
    return A.fromSourceMap(e);
  };
  E.prototype._version = 3;
  E.prototype.__generatedMappings = null;
  Object.defineProperty(E.prototype, "_generatedMappings", {
    get: function () {
      return (
        this.__generatedMappings ||
          this._parseMappings(this._mappings, this.sourceRoot),
        this.__generatedMappings
      );
    },
  });
  E.prototype.__originalMappings = null;
  Object.defineProperty(E.prototype, "_originalMappings", {
    get: function () {
      return (
        this.__originalMappings ||
          this._parseMappings(this._mappings, this.sourceRoot),
        this.__originalMappings
      );
    },
  });
  E.prototype._charIsMappingSeparator = function (t, r) {
    var n = t.charAt(r);
    return n === ";" || n === ",";
  };
  E.prototype._parseMappings = function (t, r) {
    throw new Error("Subclasses must implement _parseMappings");
  };
  E.GENERATED_ORDER = 1;
  E.ORIGINAL_ORDER = 2;
  E.GREATEST_LOWER_BOUND = 1;
  E.LEAST_UPPER_BOUND = 2;
  E.prototype.eachMapping = function (t, r, n) {
    var a = r || null,
      i = n || E.GENERATED_ORDER,
      o;
    switch (i) {
      case E.GENERATED_ORDER:
        o = this._generatedMappings;
        break;
      case E.ORIGINAL_ORDER:
        o = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var l = this.sourceRoot;
    o.map(function (s) {
      var u = s.source === null ? null : this._sources.at(s.source);
      return (
        u != null && l != null && (u = g.join(l, u)),
        {
          source: u,
          generatedLine: s.generatedLine,
          generatedColumn: s.generatedColumn,
          originalLine: s.originalLine,
          originalColumn: s.originalColumn,
          name: s.name === null ? null : this._names.at(s.name),
        }
      );
    }, this).forEach(t, a);
  };
  E.prototype.allGeneratedPositionsFor = function (t) {
    var r = g.getArg(t, "line"),
      n = {
        source: g.getArg(t, "source"),
        originalLine: r,
        originalColumn: g.getArg(t, "column", 0),
      };
    if (
      (this.sourceRoot != null &&
        (n.source = g.relative(this.sourceRoot, n.source)),
      !this._sources.has(n.source))
    )
      return [];
    n.source = this._sources.indexOf(n.source);
    var a = [],
      i = this._findMapping(
        n,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        g.compareByOriginalPositions,
        dr.LEAST_UPPER_BOUND
      );
    if (i >= 0) {
      var o = this._originalMappings[i];
      if (t.column === void 0)
        for (var l = o.originalLine; o && o.originalLine === l; )
          a.push({
            line: g.getArg(o, "generatedLine", null),
            column: g.getArg(o, "generatedColumn", null),
            lastColumn: g.getArg(o, "lastGeneratedColumn", null),
          }),
            (o = this._originalMappings[++i]);
      else
        for (
          var s = o.originalColumn;
          o && o.originalLine === r && o.originalColumn == s;

        )
          a.push({
            line: g.getArg(o, "generatedLine", null),
            column: g.getArg(o, "generatedColumn", null),
            lastColumn: g.getArg(o, "lastGeneratedColumn", null),
          }),
            (o = this._originalMappings[++i]);
    }
    return a;
  };
  et.SourceMapConsumer = E;
  function A(e) {
    var t = e;
    typeof e == "string" && (t = JSON.parse(e.replace(/^\)\]\}'/, "")));
    var r = g.getArg(t, "version"),
      n = g.getArg(t, "sources"),
      a = g.getArg(t, "names", []),
      i = g.getArg(t, "sourceRoot", null),
      o = g.getArg(t, "sourcesContent", null),
      l = g.getArg(t, "mappings"),
      s = g.getArg(t, "file", null);
    if (r != this._version) throw new Error("Unsupported version: " + r);
    (n = n
      .map(String)
      .map(g.normalize)
      .map(function (u) {
        return i && g.isAbsolute(i) && g.isAbsolute(u) ? g.relative(i, u) : u;
      })),
      (this._names = pe.fromArray(a.map(String), !0)),
      (this._sources = pe.fromArray(n, !0)),
      (this.sourceRoot = i),
      (this.sourcesContent = o),
      (this._mappings = l),
      (this.file = s);
  }
  A.prototype = Object.create(E.prototype);
  A.prototype.consumer = E;
  A.fromSourceMap = function (t) {
    var r = Object.create(A.prototype),
      n = (r._names = pe.fromArray(t._names.toArray(), !0)),
      a = (r._sources = pe.fromArray(t._sources.toArray(), !0));
    (r.sourceRoot = t._sourceRoot),
      (r.sourcesContent = t._generateSourcesContent(
        r._sources.toArray(),
        r.sourceRoot
      )),
      (r.file = t._file);
    for (
      var i = t._mappings.toArray().slice(),
        o = (r.__generatedMappings = []),
        l = (r.__originalMappings = []),
        s = 0,
        u = i.length;
      s < u;
      s++
    ) {
      var h = i[s],
        p = new Za();
      (p.generatedLine = h.generatedLine),
        (p.generatedColumn = h.generatedColumn),
        h.source &&
          ((p.source = a.indexOf(h.source)),
          (p.originalLine = h.originalLine),
          (p.originalColumn = h.originalColumn),
          h.name && (p.name = n.indexOf(h.name)),
          l.push(p)),
        o.push(p);
    }
    return Ae(r.__originalMappings, g.compareByOriginalPositions), r;
  };
  A.prototype._version = 3;
  Object.defineProperty(A.prototype, "sources", {
    get: function () {
      return this._sources.toArray().map(function (e) {
        return this.sourceRoot != null ? g.join(this.sourceRoot, e) : e;
      }, this);
    },
  });
  function Za() {
    (this.generatedLine = 0),
      (this.generatedColumn = 0),
      (this.source = null),
      (this.originalLine = null),
      (this.originalColumn = null),
      (this.name = null);
  }
  A.prototype._parseMappings = function (t, r) {
    for (
      var n = 1,
        a = 0,
        i = 0,
        o = 0,
        l = 0,
        s = 0,
        u = t.length,
        h = 0,
        p = {},
        f = {},
        d = [],
        b = [],
        m,
        L,
        w,
        B,
        ye;
      h < u;

    )
      if (t.charAt(h) === ";") n++, h++, (a = 0);
      else if (t.charAt(h) === ",") h++;
      else {
        for (
          m = new Za(), m.generatedLine = n, B = h;
          B < u && !this._charIsMappingSeparator(t, B);
          B++
        );
        if (((L = t.slice(h, B)), (w = p[L]), w)) h += L.length;
        else {
          for (w = []; h < B; )
            qh.decode(t, h, f), (ye = f.value), (h = f.rest), w.push(ye);
          if (w.length === 2)
            throw new Error("Found a source, but no line and column");
          if (w.length === 3)
            throw new Error("Found a source and line, but no column");
          p[L] = w;
        }
        (m.generatedColumn = a + w[0]),
          (a = m.generatedColumn),
          w.length > 1 &&
            ((m.source = l + w[1]),
            (l += w[1]),
            (m.originalLine = i + w[2]),
            (i = m.originalLine),
            (m.originalLine += 1),
            (m.originalColumn = o + w[3]),
            (o = m.originalColumn),
            w.length > 4 && ((m.name = s + w[4]), (s += w[4]))),
          b.push(m),
          typeof m.originalLine == "number" && d.push(m);
      }
    Ae(b, g.compareByGeneratedPositionsDeflated),
      (this.__generatedMappings = b),
      Ae(d, g.compareByOriginalPositions),
      (this.__originalMappings = d);
  };
  A.prototype._findMapping = function (t, r, n, a, i, o) {
    if (t[n] <= 0)
      throw new TypeError(
        "Line must be greater than or equal to 1, got " + t[n]
      );
    if (t[a] < 0)
      throw new TypeError(
        "Column must be greater than or equal to 0, got " + t[a]
      );
    return dr.search(t, r, i, o);
  };
  A.prototype.computeColumnSpans = function () {
    for (var t = 0; t < this._generatedMappings.length; ++t) {
      var r = this._generatedMappings[t];
      if (t + 1 < this._generatedMappings.length) {
        var n = this._generatedMappings[t + 1];
        if (r.generatedLine === n.generatedLine) {
          r.lastGeneratedColumn = n.generatedColumn - 1;
          continue;
        }
      }
      r.lastGeneratedColumn = Infinity;
    }
  };
  A.prototype.originalPositionFor = function (t) {
    var r = {
        generatedLine: g.getArg(t, "line"),
        generatedColumn: g.getArg(t, "column"),
      },
      n = this._findMapping(
        r,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        g.compareByGeneratedPositionsDeflated,
        g.getArg(t, "bias", E.GREATEST_LOWER_BOUND)
      );
    if (n >= 0) {
      var a = this._generatedMappings[n];
      if (a.generatedLine === r.generatedLine) {
        var i = g.getArg(a, "source", null);
        i !== null &&
          ((i = this._sources.at(i)),
          this.sourceRoot != null && (i = g.join(this.sourceRoot, i)));
        var o = g.getArg(a, "name", null);
        return (
          o !== null && (o = this._names.at(o)),
          {
            source: i,
            line: g.getArg(a, "originalLine", null),
            column: g.getArg(a, "originalColumn", null),
            name: o,
          }
        );
      }
    }
    return { source: null, line: null, column: null, name: null };
  };
  A.prototype.hasContentsOfAllSources = function () {
    return this.sourcesContent
      ? this.sourcesContent.length >= this._sources.size() &&
          !this.sourcesContent.some(function (t) {
            return t == null;
          })
      : !1;
  };
  A.prototype.sourceContentFor = function (t, r) {
    if (!this.sourcesContent) return null;
    if (
      (this.sourceRoot != null && (t = g.relative(this.sourceRoot, t)),
      this._sources.has(t))
    )
      return this.sourcesContent[this._sources.indexOf(t)];
    var n;
    if (this.sourceRoot != null && (n = g.urlParse(this.sourceRoot))) {
      var a = t.replace(/^file:\/\//, "");
      if (n.scheme == "file" && this._sources.has(a))
        return this.sourcesContent[this._sources.indexOf(a)];
      if ((!n.path || n.path == "/") && this._sources.has("/" + t))
        return this.sourcesContent[this._sources.indexOf("/" + t)];
    }
    if (r) return null;
    throw new Error('"' + t + '" is not in the SourceMap.');
  };
  A.prototype.generatedPositionFor = function (t) {
    var r = g.getArg(t, "source");
    if (
      (this.sourceRoot != null && (r = g.relative(this.sourceRoot, r)),
      !this._sources.has(r))
    )
      return { line: null, column: null, lastColumn: null };
    r = this._sources.indexOf(r);
    var n = {
        source: r,
        originalLine: g.getArg(t, "line"),
        originalColumn: g.getArg(t, "column"),
      },
      a = this._findMapping(
        n,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        g.compareByOriginalPositions,
        g.getArg(t, "bias", E.GREATEST_LOWER_BOUND)
      );
    if (a >= 0) {
      var i = this._originalMappings[a];
      if (i.source === n.source)
        return {
          line: g.getArg(i, "generatedLine", null),
          column: g.getArg(i, "generatedColumn", null),
          lastColumn: g.getArg(i, "lastGeneratedColumn", null),
        };
    }
    return { line: null, column: null, lastColumn: null };
  };
  et.BasicSourceMapConsumer = A;
  function D(e) {
    var t = e;
    typeof e == "string" && (t = JSON.parse(e.replace(/^\)\]\}'/, "")));
    var r = g.getArg(t, "version"),
      n = g.getArg(t, "sections");
    if (r != this._version) throw new Error("Unsupported version: " + r);
    (this._sources = new pe()), (this._names = new pe());
    var a = { line: -1, column: 0 };
    this._sections = n.map(function (i) {
      if (i.url)
        throw new Error("Support for url field in sections not implemented.");
      var o = g.getArg(i, "offset"),
        l = g.getArg(o, "line"),
        s = g.getArg(o, "column");
      if (l < a.line || (l === a.line && s < a.column))
        throw new Error("Section offsets must be ordered and non-overlapping.");
      return (
        (a = o),
        {
          generatedOffset: { generatedLine: l + 1, generatedColumn: s + 1 },
          consumer: new E(g.getArg(i, "map")),
        }
      );
    });
  }
  D.prototype = Object.create(E.prototype);
  D.prototype.constructor = E;
  D.prototype._version = 3;
  Object.defineProperty(D.prototype, "sources", {
    get: function () {
      for (var e = [], t = 0; t < this._sections.length; t++)
        for (var r = 0; r < this._sections[t].consumer.sources.length; r++)
          e.push(this._sections[t].consumer.sources[r]);
      return e;
    },
  });
  D.prototype.originalPositionFor = function (t) {
    var r = {
        generatedLine: g.getArg(t, "line"),
        generatedColumn: g.getArg(t, "column"),
      },
      n = dr.search(r, this._sections, function (i, o) {
        var l = i.generatedLine - o.generatedOffset.generatedLine;
        return l || i.generatedColumn - o.generatedOffset.generatedColumn;
      }),
      a = this._sections[n];
    return a
      ? a.consumer.originalPositionFor({
          line: r.generatedLine - (a.generatedOffset.generatedLine - 1),
          column:
            r.generatedColumn -
            (a.generatedOffset.generatedLine === r.generatedLine
              ? a.generatedOffset.generatedColumn - 1
              : 0),
          bias: t.bias,
        })
      : { source: null, line: null, column: null, name: null };
  };
  D.prototype.hasContentsOfAllSources = function () {
    return this._sections.every(function (t) {
      return t.consumer.hasContentsOfAllSources();
    });
  };
  D.prototype.sourceContentFor = function (t, r) {
    for (var n = 0; n < this._sections.length; n++) {
      var a = this._sections[n],
        i = a.consumer.sourceContentFor(t, !0);
      if (i) return i;
    }
    if (r) return null;
    throw new Error('"' + t + '" is not in the SourceMap.');
  };
  D.prototype.generatedPositionFor = function (t) {
    for (var r = 0; r < this._sections.length; r++) {
      var n = this._sections[r];
      if (n.consumer.sources.indexOf(g.getArg(t, "source")) !== -1) {
        var a = n.consumer.generatedPositionFor(t);
        if (a) {
          var i = {
            line: a.line + (n.generatedOffset.generatedLine - 1),
            column:
              a.column +
              (n.generatedOffset.generatedLine === a.line
                ? n.generatedOffset.generatedColumn - 1
                : 0),
          };
          return i;
        }
      }
    }
    return { line: null, column: null };
  };
  D.prototype._parseMappings = function (t, r) {
    (this.__generatedMappings = []), (this.__originalMappings = []);
    for (var n = 0; n < this._sections.length; n++)
      for (
        var a = this._sections[n], i = a.consumer._generatedMappings, o = 0;
        o < i.length;
        o++
      ) {
        var l = i[o],
          s = a.consumer._sources.at(l.source);
        a.consumer.sourceRoot !== null &&
          (s = g.join(a.consumer.sourceRoot, s)),
          this._sources.add(s),
          (s = this._sources.indexOf(s));
        var u = a.consumer._names.at(l.name);
        this._names.add(u), (u = this._names.indexOf(u));
        var h = {
          source: s,
          generatedLine:
            l.generatedLine + (a.generatedOffset.generatedLine - 1),
          generatedColumn:
            l.generatedColumn +
            (a.generatedOffset.generatedLine === l.generatedLine
              ? a.generatedOffset.generatedColumn - 1
              : 0),
          originalLine: l.originalLine,
          originalColumn: l.originalColumn,
          name: u,
        };
        this.__generatedMappings.push(h),
          typeof h.originalLine == "number" && this.__originalMappings.push(h);
      }
    Ae(this.__generatedMappings, g.compareByGeneratedPositionsDeflated),
      Ae(this.__originalMappings, g.compareByOriginalPositions);
  };
  et.IndexedSourceMapConsumer = D;
});
var ei = c((Ja) => {
  var zh = cr().SourceMapGenerator,
    tt = he(),
    Uh = /(\r?\n)/,
    Dh = 10,
    fe = "$$$isSourceNode$$$";
  function N(e, t, r, n, a) {
    (this.children = []),
      (this.sourceContents = {}),
      (this.line = e ?? null),
      (this.column = t ?? null),
      (this.source = r ?? null),
      (this.name = a ?? null),
      (this[fe] = !0),
      n != null && this.add(n);
  }
  N.fromStringWithSourceMap = function (t, r, n) {
    var a = new N(),
      i = t.split(Uh),
      o = 0,
      l = function () {
        var f = b(),
          d = b() || "";
        return f + d;
        function b() {
          return o < i.length ? i[o++] : void 0;
        }
      },
      s = 1,
      u = 0,
      h = null;
    return (
      r.eachMapping(function (f) {
        if (h !== null)
          if (s < f.generatedLine) p(h, l()), s++, (u = 0);
          else {
            var d = i[o],
              b = d.substr(0, f.generatedColumn - u);
            (i[o] = d.substr(f.generatedColumn - u)),
              (u = f.generatedColumn),
              p(h, b),
              (h = f);
            return;
          }
        for (; s < f.generatedLine; ) a.add(l()), s++;
        if (u < f.generatedColumn) {
          var d = i[o];
          a.add(d.substr(0, f.generatedColumn)),
            (i[o] = d.substr(f.generatedColumn)),
            (u = f.generatedColumn);
        }
        h = f;
      }, this),
      o < i.length && (h && p(h, l()), a.add(i.splice(o).join(""))),
      r.sources.forEach(function (f) {
        var d = r.sourceContentFor(f);
        d != null &&
          (n != null && (f = tt.join(n, f)), a.setSourceContent(f, d));
      }),
      a
    );
    function p(f, d) {
      if (f === null || f.source === void 0) a.add(d);
      else {
        var b = n ? tt.join(n, f.source) : f.source;
        a.add(new N(f.originalLine, f.originalColumn, b, d, f.name));
      }
    }
  };
  N.prototype.add = function (t) {
    if (Array.isArray(t))
      t.forEach(function (r) {
        this.add(r);
      }, this);
    else if (t[fe] || typeof t == "string") t && this.children.push(t);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
          t
      );
    return this;
  };
  N.prototype.prepend = function (t) {
    if (Array.isArray(t))
      for (var r = t.length - 1; r >= 0; r--) this.prepend(t[r]);
    else if (t[fe] || typeof t == "string") this.children.unshift(t);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
          t
      );
    return this;
  };
  N.prototype.walk = function (t) {
    for (var r, n = 0, a = this.children.length; n < a; n++)
      (r = this.children[n]),
        r[fe]
          ? r.walk(t)
          : r !== "" &&
            t(r, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name,
            });
  };
  N.prototype.join = function (t) {
    var r,
      n,
      a = this.children.length;
    if (a > 0) {
      for (r = [], n = 0; n < a - 1; n++) r.push(this.children[n]), r.push(t);
      r.push(this.children[n]), (this.children = r);
    }
    return this;
  };
  N.prototype.replaceRight = function (t, r) {
    var n = this.children[this.children.length - 1];
    return (
      n[fe]
        ? n.replaceRight(t, r)
        : typeof n == "string"
        ? (this.children[this.children.length - 1] = n.replace(t, r))
        : this.children.push("".replace(t, r)),
      this
    );
  };
  N.prototype.setSourceContent = function (t, r) {
    this.sourceContents[tt.toSetString(t)] = r;
  };
  N.prototype.walkSourceContents = function (t) {
    for (var r = 0, n = this.children.length; r < n; r++)
      this.children[r][fe] && this.children[r].walkSourceContents(t);
    for (
      var a = Object.keys(this.sourceContents), r = 0, n = a.length;
      r < n;
      r++
    )
      t(tt.fromSetString(a[r]), this.sourceContents[a[r]]);
  };
  N.prototype.toString = function () {
    var t = "";
    return (
      this.walk(function (r) {
        t += r;
      }),
      t
    );
  };
  N.prototype.toStringWithSourceMap = function (t) {
    var r = { code: "", line: 1, column: 0 },
      n = new zh(t),
      a = !1,
      i = null,
      o = null,
      l = null,
      s = null;
    return (
      this.walk(function (u, h) {
        (r.code += u),
          h.source !== null && h.line !== null && h.column !== null
            ? ((i !== h.source ||
                o !== h.line ||
                l !== h.column ||
                s !== h.name) &&
                n.addMapping({
                  source: h.source,
                  original: { line: h.line, column: h.column },
                  generated: { line: r.line, column: r.column },
                  name: h.name,
                }),
              (i = h.source),
              (o = h.line),
              (l = h.column),
              (s = h.name),
              (a = !0))
            : a &&
              (n.addMapping({ generated: { line: r.line, column: r.column } }),
              (i = null),
              (a = !1));
        for (var p = 0, f = u.length; p < f; p++)
          u.charCodeAt(p) === Dh
            ? (r.line++,
              (r.column = 0),
              p + 1 === f
                ? ((i = null), (a = !1))
                : a &&
                  n.addMapping({
                    source: h.source,
                    original: { line: h.line, column: h.column },
                    generated: { line: r.line, column: r.column },
                    name: h.name,
                  }))
            : r.column++;
      }),
      this.walkSourceContents(function (u, h) {
        n.setSourceContent(u, h);
      }),
      { code: r.code, map: n }
    );
  };
  Ja.SourceNode = N;
});
var ti = c((rt) => {
  rt.SourceMapGenerator = cr().SourceMapGenerator;
  rt.SourceMapConsumer = $a().SourceMapConsumer;
  rt.SourceNode = ei().SourceNode;
});
var gr = c((Zg, ri) => {
  "use strict";
  var Fh = ti().SourceMapGenerator,
    ni = { Atrule: !0, Selector: !0, Declaration: !0 };
  ri.exports = function (t, r) {
    function n(f) {
      for (; i < f.length; i++)
        f.charCodeAt(i) === 10 ? (o.line++, (o.column = 0)) : o.column++;
    }
    var a = new Fh(),
      i = 0,
      o = { line: 1, column: 0 },
      l = { line: 0, column: 0 },
      s = !1,
      u = { line: 1, column: 0 },
      h = { generated: u },
      p = t(
        r,
        function (f, d) {
          if (!(!f.loc || !f.loc.start || !ni.hasOwnProperty(f.type))) {
            var b = f.loc.start.line,
              m = f.loc.start.column - 1;
            (l.line !== b || l.column !== m) &&
              ((l.line = b),
              (l.column = m),
              n(d),
              s &&
                ((s = !1),
                (o.line !== u.line || o.column !== u.column) &&
                  a.addMapping(h)),
              (s = !0),
              a.addMapping({
                source: f.loc.source,
                original: l,
                generated: o,
              }));
          }
        },
        function (f, d) {
          s &&
            ni.hasOwnProperty(f.type) &&
            (n(d), (u.line = o.line), (u.column = o.column));
        }
      );
    return s && a.addMapping(h), { css: p, map: a };
  };
});
var ci = c(($g, Le) => {
  "use strict";
  var Bh = gr(),
    ai = Object.prototype.hasOwnProperty,
    ii = function () {};
  function oi(e, t) {
    for (var r = t.children, n = r.head; n !== null; )
      this.generate(e, n.data, n, r), (n = n.next);
  }
  function si(e, t) {
    for (var r = t.children, n = r.head; n !== null; )
      n.prev && e(","), this.generate(e, n.data, n, r), (n = n.next);
  }
  function li(e) {
    var t = {
      generate: function (r, n, a, i) {
        if (ai.call(e, n.type)) e[n.type].call(this, r, n, a, i);
        else throw new Error("Unknown node type: " + n.type);
      },
      each: oi,
      eachComma: si,
    };
    return function (r, n) {
      if (typeof n != "function") {
        var a = [];
        return (
          t.generate(function (i) {
            a.push(i);
          }, r),
          a.join("")
        );
      }
      t.generate(n, r);
    };
  }
  function ui(e) {
    var t = {
      generate: function (r, n, a, i) {
        if (ai.call(e, n.type)) {
          var o = [];
          e[n.type].call(
            this,
            function (l) {
              o.push(l);
            },
            n,
            a,
            i
          ),
            r({ node: n, value: o });
        } else throw new Error("Unknown node type: " + n.type);
      },
      each: oi,
      eachComma: si,
    };
    return function (r, n, a) {
      function i(l, s) {
        var u = l.value;
        if ((n(l.node, s, u), typeof u == "string")) s += u;
        else
          for (var h = 0; h < u.length; h++)
            typeof u[h] == "string" ? (s += u[h]) : (s = i(u[h], s));
        return a(l.node, s, u), s;
      }
      typeof n != "function" && (n = ii), typeof a != "function" && (a = ii);
      var o = [];
      return (
        t.generate(function () {
          o.push.apply(o, arguments);
        }, r),
        i(o[0], "")
      );
    };
  }
  function Gh(e) {
    var t = {};
    if (e.node)
      for (var r in e.node) {
        var n = e.node[r];
        t[r] = n.generate;
      }
    return t;
  }
  Le.exports = function (e) {
    var t = Gh(e),
      r = ui(t);
    return {
      translate: li(t),
      translateWithSourceMap: function (n) {
        return Bh(r, n);
      },
      translateMarkup: r,
    };
  };
  Le.exports.createGenerator = li;
  Le.exports.createMarkupGenerator = ui;
  Le.exports.sourceMap = gr();
});
var pi = c((Jg, hi) => {
  var mr = S();
  hi.exports = function (t) {
    var r = t.all,
      n = t.allUp;
    return {
      fromPlainObject: function (a) {
        return (
          r(a, function (i) {
            i.children &&
              !(i.children instanceof mr) &&
              (i.children = new mr().fromArray(i.children));
          }),
          a
        );
      },
      toPlainObject: function (a) {
        return (
          n(a, function (i) {
            i.children &&
              i.children instanceof mr &&
              (i.children = i.children.toArray());
          }),
          a
        );
      },
    };
  };
});
var di = c((em, fi) => {
  "use strict";
  function Re(e, t, r) {
    switch (e.type) {
      case "StyleSheet":
        var n = this.stylesheet;
        (this.stylesheet = e), e.children.each(Re, this), (this.stylesheet = n);
        break;
      case "Atrule":
        if (e.block !== null) {
          var a = this.atrule;
          (this.atrule = e), Re.call(this, e.block), (this.atrule = a);
        }
        this.fn(e, t, r);
        break;
      case "Rule":
        this.fn(e, t, r);
        var i = this.rule;
        (this.rule = e), Re.call(this, e.block), (this.rule = i);
        break;
      case "Block":
        var o = this.block;
        (this.block = e), e.children.each(Re, this), (this.block = o);
        break;
    }
  }
  function Pe(e, t, r) {
    switch (e.type) {
      case "StyleSheet":
        var n = this.stylesheet;
        (this.stylesheet = e),
          e.children.eachRight(Pe, this),
          (this.stylesheet = n);
        break;
      case "Atrule":
        if (e.block !== null) {
          var a = this.atrule;
          (this.atrule = e), Pe.call(this, e.block), (this.atrule = a);
        }
        this.fn(e, t, r);
        break;
      case "Rule":
        var i = this.rule;
        (this.rule = e),
          Pe.call(this, e.block),
          (this.rule = i),
          this.fn(e, t, r);
        break;
      case "Block":
        var o = this.block;
        (this.block = e), e.children.eachRight(Pe, this), (this.block = o);
        break;
    }
  }
  function Ne(e) {
    switch (e.type) {
      case "StyleSheet":
        var t = this.stylesheet;
        (this.stylesheet = e), e.children.each(Ne, this), (this.stylesheet = t);
        break;
      case "Atrule":
        if (e.block !== null) {
          var r = this.atrule;
          (this.atrule = e), Ne.call(this, e.block), (this.atrule = r);
        }
        break;
      case "Rule":
        var n = this.rule;
        (this.rule = e),
          e.block !== null && Ne.call(this, e.block),
          (this.rule = n);
        break;
      case "Block":
        e.children.each(function (a, i, o) {
          a.type === "Declaration" ? this.fn(a, i, o) : Ne.call(this, a);
        }, this);
        break;
    }
  }
  function Yh(e, t) {
    var r = t.structure,
      n = [];
    for (var a in r) {
      var i = { name: a, type: !1, nullable: !1 },
        o = r[a];
      Array.isArray(r[a]) || (o = [r[a]]);
      for (var l = 0; l < o.length; l++) {
        var s = o[l];
        s === null
          ? (i.nullable = !0)
          : typeof s == "string"
          ? (i.type = "node")
          : Array.isArray(s) && (i.type = "list");
      }
      i.type && n.push(i);
    }
    return n.length ? { context: t.walkContext, fields: n } : null;
  }
  function Hh(e) {
    var t = {};
    if (e.node)
      for (var r in e.node) {
        var n = e.node[r];
        if (n.structure) {
          var a = Yh(r, n);
          a !== null && (t[r] = a);
        } else
          throw new Error(
            "Missed `structure` field in `" + r + "` node type definition"
          );
      }
    return t;
  }
  function _e(e, t) {
    var r = {
      fn: t,
      root: e,
      stylesheet: null,
      atrule: null,
      atruleExpression: null,
      rule: null,
      selector: null,
      block: null,
      declaration: null,
      function: null,
    };
    return r;
  }
  fi.exports = function (t) {
    var r = Hh(t),
      n = {};
    for (var a in r) {
      var t = r[a];
      n[a] = Function(
        "node",
        "context",
        "walk",
        (t.context
          ? "var old = context." +
            t.context +
            `;
context.` +
            t.context +
            ` = node;
`
          : "") +
          t.fields.map(function (o) {
            var l =
              o.type === "list"
                ? "node." + o.name + ".each(walk);"
                : "walk(node." + o.name + ");";
            return (
              o.nullable &&
                (l =
                  "if (node." +
                  o.name +
                  `) {
    ` +
                  l +
                  "}"),
              l
            );
          }).join(`
`) +
          (t.context
            ? `
context.` +
              t.context +
              " = old;"
            : "")
      );
    }
    return {
      all: function (i, o) {
        function l(u, h, p) {
          o.call(s, u, h, p), n.hasOwnProperty(u.type) && n[u.type](u, s, l);
        }
        var s = _e(i, o);
        l(i);
      },
      allUp: function (i, o) {
        function l(u, h, p) {
          n.hasOwnProperty(u.type) && n[u.type](u, s, l), o.call(s, u, h, p);
        }
        var s = _e(i, o);
        l(i);
      },
      rules: function (i, o) {
        Re.call(_e(i, o), i);
      },
      rulesRight: function (i, o) {
        Pe.call(_e(i, o), i);
      },
      declarations: function (i, o) {
        Ne.call(_e(i, o), i);
      },
    };
  };
});
var vi = c((tm, gi) => {
  "use strict";
  var mi = S();
  gi.exports = function e(t) {
    var r = {};
    for (var n in t) {
      var a = t[n];
      a &&
        (Array.isArray(a)
          ? (a = a.slice(0))
          : a instanceof mi
          ? (a = new mi().fromArray(a.map(e)))
          : a.constructor === Object && (a = e(a))),
        (r[n] = a);
    }
    return r;
  };
});
var yi = c((rm, bi) => {
  var Wh = {
    generic: !0,
    types: {},
    properties: {},
    parseContext: {},
    scope: {},
    atrule: ["parse"],
    pseudo: ["parse"],
    node: ["name", "structure", "parse", "generate", "walkContext"],
  };
  function vr(e) {
    return e && e.constructor === Object;
  }
  function br(e) {
    if (vr(e)) {
      var t = {};
      for (var r in e) t[r] = e[r];
      return t;
    } else return e;
  }
  function yr(e, t) {
    for (var r in t) vr(e[r]) ? yr(e[r], br(t[r])) : (e[r] = br(t[r]));
  }
  function kr(e, t, r) {
    for (var n in r)
      if (r[n] === !0) n in t && (e[n] = br(t[n]));
      else if (r[n]) {
        if (vr(r[n])) {
          var a = {};
          yr(a, e[n]), yr(a, t[n]), (e[n] = a);
        } else if (Array.isArray(r[n])) {
          var a = {},
            i = r[n].reduce(function (s, u) {
              return (s[u] = !0), s;
            }, {});
          for (var o in e[n])
            (a[o] = {}), e[n] && e[n][o] && kr(a[o], e[n][o], i);
          for (var o in t[n])
            a[o] || (a[o] = {}), t[n] && t[n][o] && kr(a[o], t[n][o], i);
          e[n] = a;
        }
      }
    return e;
  }
  bi.exports = function (e, t) {
    return kr(e, t, Wh);
  };
});
var xi = c((ki) => {
  var jh = S(),
    Vh = v(),
    Sr = xa(),
    Kh = Ea(),
    Qh = Pa(),
    Xh = ci(),
    Zh = pi(),
    $h = di(),
    Jh = vi(),
    Si = we(),
    nt = yi();
  function ep(e, t) {
    for (var r in t) e[r] = t[r];
    return e;
  }
  function xr(e) {
    var t = Qh(e),
      r = $h(e),
      n = Xh(e),
      a = Zh(r),
      i = {
        List: jh,
        Tokenizer: Vh,
        Lexer: Sr,
        property: Si.property,
        keyword: Si.keyword,
        grammar: Kh,
        lexer: null,
        createLexer: function (o) {
          return new Sr(o, i, i.lexer.structure);
        },
        parse: t,
        walk: r.all,
        walkUp: r.allUp,
        walkRules: r.rules,
        walkRulesRight: r.rulesRight,
        walkDeclarations: r.declarations,
        translate: n.translate,
        translateWithSourceMap: n.translateWithSourceMap,
        translateMarkup: n.translateMarkup,
        clone: Jh,
        fromPlainObject: a.fromPlainObject,
        toPlainObject: a.toPlainObject,
        createSyntax: function (o) {
          return xr(nt({}, o));
        },
        fork: function (o) {
          var l = nt({}, e);
          return xr(typeof o == "function" ? o(l, ep) : nt(l, o));
        },
      };
    return (
      (i.lexer = new Sr(
        { generic: !0, types: e.types, properties: e.properties, node: e.node },
        i
      )),
      i
    );
  }
  ki.create = function (e) {
    return xr(nt({}, e));
  };
});
var Ei = c((am, wi) => {
  wi.exports = {
    generic: !0,
    types: {
      "absolute-size":
        "xx-small | x-small | small | medium | large | x-large | xx-large",
      "alpha-value": "<number> | <percentage>",
      "angle-percentage": "<angle> | <percentage>",
      "animateable-feature": "scroll-position | contents | <custom-ident>",
      attachment: "scroll | fixed | local",
      "auto-repeat":
        "repeat( [ auto-fill | auto-fit ] , [ <line-names>? <fixed-size> ]+ <line-names>? )",
      "auto-track-list":
        "[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>? <auto-repeat> [ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>?",
      "basic-shape": "<inset()> | <circle()> | <ellipse()> | <polygon()>",
      "bg-image": "none | <image>",
      "bg-layer":
        "<bg-image> || <position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box>{1,2}",
      "bg-size": "[ <length-percentage> | auto ]{1,2} | cover | contain",
      "blur()": "blur( <length> )",
      "blend-mode":
        "normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity",
      box: "border-box | padding-box | content-box",
      "br-style":
        "none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset",
      "br-width": "<length> | thin | medium | thick",
      "brightness()": "brightness( <number-percentage> )",
      "calc()": "calc( <calc-sum> )",
      "calc-sum": "<calc-product> [ [ '+' | '-' ] <calc-product> ]*",
      "calc-product": "<calc-value> [ '*' <calc-value> | '/' <number> ]*",
      "calc-value": "<number> | <dimension> | <percentage> | ( <calc-sum> )",
      "cf-final-image": "<image> | <color>",
      "cf-mixing-image": "<percentage>? && <image>",
      "circle()": "circle( [ <shape-radius> ]? [ at <position> ]? )",
      "clip-source": "<url>",
      color:
        "<rgb()> | <rgba()> | <hsl()> | <hsla()> | <hex-color> | <named-color> | currentcolor | <deprecated-system-color>",
      "color-stop": "<color> <length-percentage>?",
      "color-stop-list": "<color-stop>#{2,}",
      "common-lig-values": "[ common-ligatures | no-common-ligatures ]",
      "composite-style":
        "clear | copy | source-over | source-in | source-out | source-atop | destination-over | destination-in | destination-out | destination-atop | xor",
      "compositing-operator": "add | subtract | intersect | exclude",
      "contextual-alt-values": "[ contextual | no-contextual ]",
      "content-list":
        "[ <string> | contents | <url> | <quote> | <attr()> | counter( <ident> , <'list-style-type'>? ) ]+",
      "content-replacement": "<image>",
      "contrast()": "contrast( [ <number-percentage> ] )",
      "counter-style": "<counter-style-name> | symbols()",
      "counter-style-name": "<custom-ident>",
      "cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
      "cubic-bezier-timing-function":
        "ease | ease-in | ease-out | ease-in-out | cubic-bezier( <number> , <number> , <number> , <number> )",
      "deprecated-system-color":
        "ActiveBorder | ActiveCaption | AppWorkspace | Background | ButtonFace | ButtonHighlight | ButtonShadow | ButtonText | CaptionText | GrayText | Highlight | HighlightText | InactiveBorder | InactiveCaption | InactiveCaptionText | InfoBackground | InfoText | Menu | MenuText | Scrollbar | ThreeDDarkShadow | ThreeDFace | ThreeDHighlight | ThreeDLightShadow | ThreeDShadow | Window | WindowFrame | WindowText",
      "discretionary-lig-values":
        "[ discretionary-ligatures | no-discretionary-ligatures ]",
      "display-box": "contents | none",
      "display-inside":
        "flow | flow-root | table | flex | grid | subgrid | ruby",
      "display-internal":
        "table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container",
      "display-legacy":
        "inline-block | inline-list-item | inline-table | inline-flex | inline-grid",
      "display-listitem":
        "list-item && <display-outside>? && [ flow | flow-root ]?",
      "display-outside": "block | inline | run-in",
      "drop-shadow()": "drop-shadow( <length>{2,3} <color>? )",
      "east-asian-variant-values":
        "[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ]",
      "east-asian-width-values": "[ full-width | proportional-width ]",
      "element()": "element( <id-selector> )",
      "ellipse()": "ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )",
      "ending-shape": "circle | ellipse",
      "explicit-track-list": "[ <line-names>? <track-size> ]+ <line-names>?",
      "family-name": "<string> | <custom-ident>+",
      "feature-tag-value": "<string> [ <integer> | on | off ]?",
      "feature-value-name": "<custom-ident>",
      "fill-rule": "nonzero | evenodd",
      "filter-function":
        "<blur()> | <brightness()> | <contrast()> | <drop-shadow()> | <grayscale()> | <hue-rotate()> | <invert()> | <opacity()> | <sepia()> | <saturate()>",
      "filter-function-list": "[ <filter-function> | <url> ]+",
      "final-bg-layer":
        "<bg-image> || <position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box> || <'background-color'>",
      "fit-content()": "fit-content( [ <length> | <percentage> ] )",
      "fixed-breadth": "<length-percentage>",
      "fixed-repeat":
        "repeat( [ <positive-integer> ] , [ <line-names>? <fixed-size> ]+ <line-names>? )",
      "fixed-size":
        "<fixed-breadth> | minmax( <fixed-breadth> , <track-breadth> ) | minmax( <inflexible-breadth> , <fixed-breadth> )",
      "font-variant-css21": "[ normal | small-caps ]",
      "frames-timing-function": "frames( <integer> )",
      "frequency-percentage": "<frequency> | <percentage>",
      "generic-family":
        "serif | sans-serif | cursive | fantasy | monospace | -apple-system",
      "generic-name": "serif | sans-serif | cursive | fantasy | monospace",
      "geometry-box": "<shape-box> | fill-box | stroke-box | view-box",
      gradient:
        "<-legacy-gradient()> | <linear-gradient()> | <repeating-linear-gradient()> | <radial-gradient()> | <repeating-radial-gradient()>",
      "grayscale()": "grayscale( <number-percentage> )",
      "grid-line":
        "auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]",
      "historical-lig-values":
        "[ historical-ligatures | no-historical-ligatures ]",
      "hsl()":
        "hsl( [ <hue> <percentage> <percentage> [ / <alpha-value> ]? ] | [ <hue> , <percentage> , <percentage> , <alpha-value>? ] )",
      "hsla()":
        "hsla( [ <hue> <percentage> <percentage> [ / <alpha-value> ]? ] | [ <hue> , <percentage> , <percentage> , <alpha-value>? ] )",
      hue: "<number> | <angle>",
      "hue-rotate()": "hue-rotate( <angle> )",
      image:
        "<url> | <image()> | <image-set()> | <element()> | <cross-fade()> | <gradient>",
      "image()": "image( [ [ <image> | <string> ]? , <color>? ]! )",
      "image-set()": "image-set( <image-set-option># )",
      "image-set-option": "[ <image> | <string> ] <resolution>",
      "inflexible-breadth":
        "<length> | <percentage> | min-content | max-content | auto",
      "inset()":
        "inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )",
      "invert()": "invert( <number-percentage> )",
      "keyframes-name": "<custom-ident> | <string>",
      "keyframe-selector": "from | to | <percentage>",
      "leader()": "leader( <leader-type> )",
      "leader-type": "dotted | solid | space | <string>",
      "length-percentage": "<length> | <percentage>",
      "line-names": "'[' <custom-ident>* ']'",
      "line-name-list": "[ <line-names> | <name-repeat> ]+",
      "linear-gradient()":
        "linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )",
      "mask-layer":
        "<mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || <geometry-box> || [ <geometry-box> | no-clip ] || <compositing-operator> || <masking-mode>",
      "mask-position":
        "[ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?",
      "mask-reference": "none | <image> | <mask-source>",
      "mask-source": "<url>",
      "masking-mode": "alpha | luminance | match-source",
      "matrix()": "matrix( <number> [, <number> ]{5} )",
      "matrix3d()": "matrix3d( <number> [, <number> ]{15} )",
      "media-type": "<ident>",
      "mf-boolean": "<mf-name>",
      "mf-name": "<ident>",
      "minmax()":
        "minmax( [ <length> | <percentage> | <flex> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )",
      "named-color":
        "transparent | aliceblue | antiquewhite | aqua | aquamarine | azure | beige | bisque | black | blanchedalmond | blue | blueviolet | brown | burlywood | cadetblue | chartreuse | chocolate | coral | cornflowerblue | cornsilk | crimson | cyan | darkblue | darkcyan | darkgoldenrod | darkgray | darkgreen | darkgrey | darkkhaki | darkmagenta | darkolivegreen | darkorange | darkorchid | darkred | darksalmon | darkseagreen | darkslateblue | darkslategray | darkslategrey | darkturquoise | darkviolet | deeppink | deepskyblue | dimgray | dimgrey | dodgerblue | firebrick | floralwhite | forestgreen | fuchsia | gainsboro | ghostwhite | gold | goldenrod | gray | green | greenyellow | grey | honeydew | hotpink | indianred | indigo | ivory | khaki | lavender | lavenderblush | lawngreen | lemonchiffon | lightblue | lightcoral | lightcyan | lightgoldenrodyellow | lightgray | lightgreen | lightgrey | lightpink | lightsalmon | lightseagreen | lightskyblue | lightslategray | lightslategrey | lightsteelblue | lightyellow | lime | limegreen | linen | magenta | maroon | mediumaquamarine | mediumblue | mediumorchid | mediumpurple | mediumseagreen | mediumslateblue | mediumspringgreen | mediumturquoise | mediumvioletred | midnightblue | mintcream | mistyrose | moccasin | navajowhite | navy | oldlace | olive | olivedrab | orange | orangered | orchid | palegoldenrod | palegreen | paleturquoise | palevioletred | papayawhip | peachpuff | peru | pink | plum | powderblue | purple | rebeccapurple | red | rosybrown | royalblue | saddlebrown | salmon | sandybrown | seagreen | seashell | sienna | silver | skyblue | slateblue | slategray | slategrey | snow | springgreen | steelblue | tan | teal | thistle | tomato | turquoise | violet | wheat | white | whitesmoke | yellow | yellowgreen | <-non-standart-color>",
      "namespace-prefix": "<ident>",
      "number-percentage": "<number> | <percentage>",
      "numeric-figure-values": "[ lining-nums | oldstyle-nums ]",
      "numeric-fraction-values": "[ diagonal-fractions | stacked-fractions ]",
      "numeric-spacing-values": "[ proportional-nums | tabular-nums ]",
      "opacity()": "opacity( [ <number-percentage> ] )",
      "perspective()": "perspective( <length> )",
      "polygon()":
        "polygon( <fill-rule>? , [ <length-percentage> <length-percentage> ]# )",
      position:
        "[ center && [ left | right | top | bottom ] <length-percentage>? ] | [ [ left | right ] <length-percentage>? ] && [ [ top | bottom ] <length-percentage>? ] | [ [ left | center | right | <length-percentage> ] || [ top | center | bottom | <length-percentage> ] ]",
      quote: "open-quote | close-quote | no-open-quote | no-close-quote",
      "radial-gradient()":
        "radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )",
      "relative-size": "larger | smaller",
      "repeat-style":
        "repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}",
      "repeating-linear-gradient()":
        "repeating-linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )",
      "repeating-radial-gradient()":
        "repeating-radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )",
      "rgb()":
        "rgb( [ [ <percentage>{3} | <number>{3} ] [ / <alpha-value> ]? ] | [ [ <percentage>#{3} | <number>#{3} ] , <alpha-value>? ] )",
      "rgba()":
        "rgba( [ [ <percentage>{3} | <number>{3} ] [ / <alpha-value> ]? ] | [ [ <percentage>#{3} | <number>#{3} ] , <alpha-value>? ] )",
      "rotate()": "rotate( <angle> )",
      "rotate3d()": "rotate3d( <number> , <number> , <number> , <angle> )",
      "rotateX()": "rotateX( <angle> )",
      "rotateY()": "rotateY( <angle> )",
      "rotateZ()": "rotateZ( <angle> )",
      "saturate()": "saturate( <number-percentage> )",
      "scale()": "scale( <number> [, <number> ]? )",
      "scale3d()": "scale3d( <number> , <number> , <number> )",
      "scaleX()": "scaleX( <number> )",
      "scaleY()": "scaleY( <number> )",
      "scaleZ()": "scaleZ( <number> )",
      "shape-radius": "<length-percentage> | closest-side | farthest-side",
      "skew()": "skew( <angle> [, <angle> ]? )",
      "skewX()": "skewX( <angle> )",
      "skewY()": "skewY( <angle> )",
      "sepia()": "sepia( <number-percentage> )",
      shadow: "inset? && <length>{2,4} && <color>?",
      "shadow-t": "[ <length>{2,3} && <color>? ]",
      shape:
        "rect( [ [ <top> , <right> , <bottom> , <left> ] | [ <top> <right> <bottom> <left> ] ] )",
      "shape-box": "<box> | margin-box",
      "side-or-corner": "[ left | right ] || [ top | bottom ]",
      "single-animation":
        "<time> || <single-timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> || [ none | <keyframes-name> ]",
      "single-animation-direction":
        "normal | reverse | alternate | alternate-reverse",
      "single-animation-fill-mode": "none | forwards | backwards | both",
      "single-animation-iteration-count": "infinite | <number>",
      "single-animation-play-state": "running | paused",
      "single-timing-function":
        "linear | <cubic-bezier-timing-function> | <step-timing-function> | <frames-timing-function>",
      "single-transition":
        "<single-transition-timing-function> || [ none | <single-transition-property> ] || <time> || <time>",
      "single-transition-timing-function": "<single-timing-function>",
      "single-transition-property": "all | <custom-ident>",
      size:
        "closest-side | farthest-side | closest-corner | farthest-corner | <length> | <length-percentage>{2}",
      "step-timing-function":
        "step-start | step-end | steps( <integer> [, [ start | end ] ]? )",
      symbol: "<string> | <image> | <ident>",
      target: "<target-counter()> | <target-counters()> | <target-text()>",
      "target-counter()":
        "target-counter( [ <string> | <url> ] , <custom-ident> , <counter-style>? )",
      "target-counters()":
        "target-counters( [ <string> | <url> ] , <custom-ident> , <string> , <counter-style>? )",
      "target-text()":
        "target-text( [ <string> | <url> ] , [ content | before | after | first-letter ]? )",
      "time-percentage": "<time> | <percentage>",
      "track-breadth":
        "<length-percentage> | <flex> | min-content | max-content | auto",
      "track-list":
        "[ <line-names>? [ <track-size> | <track-repeat> ] ]+ <line-names>?",
      "track-repeat":
        "repeat( [ <positive-integer> ] , [ <line-names>? <track-size> ]+ <line-names>? )",
      "track-size":
        "<track-breadth> | minmax( <inflexible-breadth> , <track-breadth> ) | fit-content( [ <length> | <percentage> ] )",
      "transform-function":
        "[ <matrix()> || <translate()> || <translateX()> || <translateY()> || <scale()> || <scaleX()> || <scaleY()> || <rotate()> || <skew()> || <skewX()> || <skewY()> || <matrix3d()> || <translate3d()> || <translateZ()> || <scale3d()> || <scaleZ()> || <rotate3d()> || <rotateX()> || <rotateY()> || <rotateZ()> || <perspective()> ]+",
      "transform-list": "<transform-function>+",
      "translate()":
        "translate( <length-percentage> [, <length-percentage> ]? )",
      "translate3d()":
        "translate3d( <length-percentage> , <length-percentage> , <length> )",
      "translateX()": "translateX( <length-percentage> )",
      "translateY()": "translateY( <length-percentage> )",
      "translateZ()": "translateZ( <length> )",
      "type-or-unit":
        "string | integer | color | url | integer | number | length | angle | time | frequency | em | ex | px | rem | vw | vh | vmin | vmax | mm | q | cm | in | pt | pc | deg | grad | rad | ms | s | Hz | kHz | %",
      "viewport-length": "auto | <length-percentage>",
      "-legacy-gradient()":
        "<-webkit-gradient()> | <-legacy-linear-gradient()> | <-legacy-repeating-linear-gradient()> | <-legacy-radial-gradient()> | <-legacy-repeating-radial-gradient()>",
      "-legacy-linear-gradient()":
        "-moz-linear-gradient( <-legacy-linear-gradient-arguments> ) | -ms-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-linear-gradient( <-legacy-linear-gradient-arguments> )",
      "-legacy-repeating-linear-gradient()":
        "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -ms-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
      "-legacy-linear-gradient-arguments":
        "[ <angle> | <side-or-corner> ]? , <color-stop-list>",
      "-legacy-radial-gradient()":
        "-moz-radial-gradient( <-legacy-radial-gradient-arguments> ) | -ms-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-radial-gradient( <-legacy-radial-gradient-arguments> )",
      "-legacy-repeating-radial-gradient()":
        "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -ms-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
      "-legacy-radial-gradient-arguments":
        "[ <position> , ]? [ [ [ <-legacy-radial-gradient-shape> || <-legacy-radial-gradient-size> ] | [ <length> | <percentage> ]{2} ] , ]? <color-stop-list>",
      "-legacy-radial-gradient-size":
        "closest-side | closest-corner | farthest-side | farthest-corner | contain | cover",
      "-legacy-radial-gradient-shape": "circle | ellipse",
      "-non-standart-font":
        "-apple-system-body | -apple-system-headline | -apple-system-subheadline | -apple-system-caption1 | -apple-system-caption2 | -apple-system-footnote | -apple-system-short-body | -apple-system-short-headline | -apple-system-short-subheadline | -apple-system-short-caption1 | -apple-system-short-footnote | -apple-system-tall-body",
      "-non-standart-color":
        "-moz-ButtonDefault | -moz-ButtonHoverFace | -moz-ButtonHoverText | -moz-CellHighlight | -moz-CellHighlightText | -moz-Combobox | -moz-ComboboxText | -moz-Dialog | -moz-DialogText | -moz-dragtargetzone | -moz-EvenTreeRow | -moz-Field | -moz-FieldText | -moz-html-CellHighlight | -moz-html-CellHighlightText | -moz-mac-accentdarkestshadow | -moz-mac-accentdarkshadow | -moz-mac-accentface | -moz-mac-accentlightesthighlight | -moz-mac-accentlightshadow | -moz-mac-accentregularhighlight | -moz-mac-accentregularshadow | -moz-mac-chrome-active | -moz-mac-chrome-inactive | -moz-mac-focusring | -moz-mac-menuselect | -moz-mac-menushadow | -moz-mac-menutextselect | -moz-MenuHover | -moz-MenuHoverText | -moz-MenuBarText | -moz-MenuBarHoverText | -moz-nativehyperlinktext | -moz-OddTreeRow | -moz-win-communicationstext | -moz-win-mediatext | -moz-activehyperlinktext | -moz-default-background-color | -moz-default-color | -moz-hyperlinktext | -moz-visitedhyperlinktext | -webkit-activelink | -webkit-focus-ring-color | -webkit-link | -webkit-text",
      "-non-standart-image-rendering":
        "optimize-contrast | -moz-crisp-edges | -o-crisp-edges | -webkit-optimize-contrast",
      "-non-standart-width":
        "min-intrinsic | intrinsic | -moz-min-content | -moz-max-content | -webkit-min-content | -webkit-max-content",
      "-non-standart-word-break": "break-word",
      "-webkit-image-set()": "<image-set()>",
      "-webkit-gradient()":
        "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [ , <-webkit-gradient-point> | , <-webkit-gradient-radius> , <-webkit-gradient-point> ] [, <-webkit-gradient-radius> ]? [, <-webkit-gradient-color-stop()> ]* )",
      "-webkit-gradient-color-stop()":
        "from( <color> ) | color-stop( [ <number-zero-one> | <percentage> ] , <color> ) | to( <color> )",
      "-webkit-gradient-point":
        "[ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]",
      "-webkit-gradient-radius": "<length> | <percentage>",
      "-webkit-gradient-type": "linear | radial",
      "-webkit-mask-box-repeat": "repeat | stretch | round",
      "-webkit-mask-clip-style":
        "border | border-box | padding | padding-box | content | content-box | text",
      "-ms-filter": "[ <progid> | FlipH | FlipV ]+",
      age: "child | young | old",
      "border-radius": "<length-percentage>{1,2}",
      bottom: "<length> | auto",
      "generic-voice": "[ <age>? <gender> <integer>? ]",
      gender: "male | female | neutral",
      left: "<length> | auto",
      "mask-image": "<mask-reference>#",
      "name-repeat":
        "repeat( [ <positive-integer> | auto-fill ] , <line-names>+ )",
      "outline-radius": "<border-radius>",
      paint:
        "none | currentColor | <color> | <url> [ none | currentColor | <color> ]?",
      "path()": "path( <string> )",
      right: "<length> | auto",
      "svg-length": "<percentage> | <length> | <number>",
      "svg-writing-mode": "lr-tb | rl-tb | tb-rl | lr | rl | tb",
      top: "<length> | auto",
      x: "<number>",
      y: "<number>",
    },
    properties: {
      "-ms-overflow-style":
        "auto | none | scrollbar | -ms-autohiding-scrollbar",
      "-moz-appearance":
        "none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized",
      "-moz-binding": "<url> | none",
      "-moz-border-bottom-colors": "[ <color> ]* <color> | none",
      "-moz-border-left-colors": "[ <color> ]* <color> | none",
      "-moz-border-right-colors": "[ <color> ]* <color> | none",
      "-moz-border-top-colors": "[ <color> ]* <color> | none",
      "-moz-context-properties":
        "none | [ fill | fill-opacity | stroke | stroke-opacity ]#",
      "-moz-float-edge": "border-box | content-box | margin-box | padding-box",
      "-moz-force-broken-image-icon": "<integer>",
      "-moz-image-region": "<shape> | auto",
      "-moz-orient": "inline | block | horizontal | vertical",
      "-moz-outline-radius":
        "<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?",
      "-moz-outline-radius-bottomleft": "<outline-radius>",
      "-moz-outline-radius-bottomright": "<outline-radius>",
      "-moz-outline-radius-topleft": "<outline-radius>",
      "-moz-outline-radius-topright": "<outline-radius>",
      "-moz-stack-sizing": "ignore | stretch-to-fit",
      "-moz-text-blink": "none | blink",
      "-moz-user-focus":
        "ignore | normal | select-after | select-before | select-menu | select-same | select-all | none",
      "-moz-user-input": "auto | none | enabled | disabled",
      "-moz-user-modify": "read-only | read-write | write-only",
      "-moz-window-shadow": "default | menu | tooltip | sheet | none",
      "-webkit-border-before":
        "<'border-width'> || <'border-style'> || <'color'>",
      "-webkit-border-before-color": "<'color'>",
      "-webkit-border-before-style": "<'border-style'>",
      "-webkit-border-before-width": "<'border-width'>",
      "-webkit-box-reflect":
        "[ above | below | right | left ]? <length>? <image>?",
      "-webkit-mask":
        "<mask-image> [ <'-webkit-mask-repeat'> || <'-webkit-mask-attachment'> || <'-webkit-mask-position'> || <'-webkit-mask-origin'> || <'-webkit-mask-clip'> ]*",
      "-webkit-mask-attachment": "<attachment> [, <attachment> ]*",
      "-webkit-mask-clip":
        "<-webkit-mask-clip-style> [, <-webkit-mask-clip-style> ]*",
      "-webkit-mask-composite": "<composite-style> [, <composite-style> ]*",
      "-webkit-mask-image": "<mask-image> [, <mask-image> ]*",
      "-webkit-mask-origin":
        "[ padding | border | content ] [, [ border | padding | content ] ]*",
      "-webkit-mask-position": "<mask-position>#",
      "-webkit-mask-position-x":
        "[ <length-percentage> | left | center | right ]#",
      "-webkit-mask-position-y":
        "[ <length-percentage> | top | center | bottom ]#",
      "-webkit-mask-repeat": "<repeat-style> [, <repeat-style> ]*",
      "-webkit-mask-repeat-x": "repeat | no-repeat | space | round",
      "-webkit-mask-repeat-y": "repeat | no-repeat | space | round",
      "-webkit-tap-highlight-color": "<color>",
      "-webkit-text-fill-color": "<color>",
      "-webkit-text-stroke": "<length> || <color>",
      "-webkit-text-stroke-color": "<color>",
      "-webkit-text-stroke-width": "<length>",
      "-webkit-touch-callout": "default | none",
      "align-content":
        "flex-start | flex-end | center | space-between | space-around | space-evenly | stretch",
      "align-items": "flex-start | flex-end | center | baseline | stretch",
      "align-self":
        "auto | flex-start | flex-end | center | baseline | stretch",
      all: "initial | inherit | unset",
      animation: "<single-animation>#",
      "animation-delay": "<time>#",
      "animation-direction": "<single-animation-direction>#",
      "animation-duration": "<time>#",
      "animation-fill-mode": "<single-animation-fill-mode>#",
      "animation-iteration-count": "<single-animation-iteration-count>#",
      "animation-name": "[ none | <keyframes-name> ]#",
      "animation-play-state": "<single-animation-play-state>#",
      "animation-timing-function": "<single-timing-function>#",
      appearance: "auto | none",
      azimuth:
        "<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards",
      "backdrop-filter": "none | <filter-function-list>",
      "backface-visibility": "visible | hidden",
      background: "[ <bg-layer> , ]* <final-bg-layer>",
      "background-attachment": "<attachment>#",
      "background-blend-mode": "<blend-mode>#",
      "background-clip": "<box>#",
      "background-color": "<color>",
      "background-image": "<bg-image>#",
      "background-origin": "<box>#",
      "background-position": "<position>#",
      "background-position-x":
        "[ center | [ left | right | x-start | x-end ]? <length-percentage>? ]#",
      "background-position-y":
        "[ center | [ top | bottom | y-start | y-end ]? <length-percentage>? ]#",
      "background-repeat": "<repeat-style>#",
      "background-size": "<bg-size>#",
      "block-size": "<'width'>",
      border: "<br-width> || <br-style> || <color>",
      "border-block-end": "<'border-width'> || <'border-style'> || <'color'>",
      "border-block-end-color": "<'color'>",
      "border-block-end-style": "<'border-style'>",
      "border-block-end-width": "<'border-width'>",
      "border-block-start": "<'border-width'> || <'border-style'> || <'color'>",
      "border-block-start-color": "<'color'>",
      "border-block-start-style": "<'border-style'>",
      "border-block-start-width": "<'border-width'>",
      "border-bottom": "<br-width> || <br-style> || <color>",
      "border-bottom-color": "<color>",
      "border-bottom-left-radius": "<length-percentage>{1,2}",
      "border-bottom-right-radius": "<length-percentage>{1,2}",
      "border-bottom-style": "<br-style>",
      "border-bottom-width": "<br-width>",
      "border-collapse": "collapse | separate",
      "border-color": "<color>{1,4}",
      "border-image":
        "<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>",
      "border-image-outset": "[ <length> | <number> ]{1,4}",
      "border-image-repeat": "[ stretch | repeat | round | space ]{1,2}",
      "border-image-slice": "<number-percentage>{1,4} && fill?",
      "border-image-source": "none | <image>",
      "border-image-width": "[ <length-percentage> | <number> | auto ]{1,4}",
      "border-inline-end": "<'border-width'> || <'border-style'> || <'color'>",
      "border-inline-end-color": "<'color'>",
      "border-inline-end-style": "<'border-style'>",
      "border-inline-end-width": "<'border-width'>",
      "border-inline-start":
        "<'border-width'> || <'border-style'> || <'color'>",
      "border-inline-start-color": "<'color'>",
      "border-inline-start-style": "<'border-style'>",
      "border-inline-start-width": "<'border-width'>",
      "border-left": "<br-width> || <br-style> || <color>",
      "border-left-color": "<color>",
      "border-left-style": "<br-style>",
      "border-left-width": "<br-width>",
      "border-radius":
        "<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?",
      "border-right": "<br-width> || <br-style> || <color>",
      "border-right-color": "<color>",
      "border-right-style": "<br-style>",
      "border-right-width": "<br-width>",
      "border-spacing": "<length> <length>?",
      "border-style": "<br-style>{1,4}",
      "border-top": "<br-width> || <br-style> || <color>",
      "border-top-color": "<color>",
      "border-top-left-radius": "<length-percentage>{1,2}",
      "border-top-right-radius": "<length-percentage>{1,2}",
      "border-top-style": "<br-style>",
      "border-top-width": "<br-width>",
      "border-width": "<br-width>{1,4}",
      bottom: "<length> | <percentage> | auto",
      "box-align": "start | center | end | baseline | stretch",
      "box-decoration-break": "slice | clone",
      "box-direction": "normal | reverse | inherit",
      "box-flex": "<number>",
      "box-flex-group": "<integer>",
      "box-lines": "single | multiple",
      "box-ordinal-group": "<integer>",
      "box-orient":
        "horizontal | vertical | inline-axis | block-axis | inherit",
      "box-pack": "start | center | end | justify",
      "box-shadow": "none | <shadow>#",
      "box-sizing": "content-box | border-box",
      "break-after":
        "auto | avoid | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region",
      "break-before":
        "auto | avoid | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region",
      "break-inside": "auto | avoid | avoid-page | avoid-column | avoid-region",
      "caption-side":
        "top | bottom | block-start | block-end | inline-start | inline-end",
      "caret-color": "auto | <color>",
      clear: "none | left | right | both | inline-start | inline-end",
      clip: "<shape> | auto",
      "clip-path": "<clip-source> | [ <basic-shape> || <geometry-box> ] | none",
      color: "<color>",
      "column-count": "<number> | auto",
      "column-fill": "auto | balance",
      "column-gap": "<length> | normal",
      "column-rule":
        "<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>",
      "column-rule-color": "<color>",
      "column-rule-style": "<br-style>",
      "column-rule-width": "<br-width>",
      "column-span": "none | all",
      "column-width": "<length> | auto",
      columns: "<'column-width'> || <'column-count'>",
      contain: "none | strict | content | [ size || layout || style || paint ]",
      content:
        "normal | none | [ <content-replacement> | <content-list> ] [ / <string> ]?",
      "counter-increment": "[ <custom-ident> <integer>? ]+ | none",
      "counter-reset": "[ <custom-ident> <integer>? ]+ | none",
      cursor:
        "[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing | hand | -webkit-grab | -webkit-grabbing | -webkit-zoom-in | -webkit-zoom-out | -moz-grab | -moz-grabbing | -moz-zoom-in | -moz-zoom-out ] ]",
      direction: "ltr | rtl",
      display:
        "none | inline | block | list-item | inline-list-item | inline-block | inline-table | table | table-cell | table-column | table-column-group | table-footer-group | table-header-group | table-row | table-row-group | flex | inline-flex | grid | inline-grid | run-in | ruby | ruby-base | ruby-text | ruby-base-container | ruby-text-container | contents | -ms-flexbox | -ms-inline-flexbox | -ms-grid | -ms-inline-grid | -webkit-flex | -webkit-inline-flex | -webkit-box | -webkit-inline-box | -moz-inline-stack | -moz-box | -moz-inline-box",
      "display-inside": "auto | block | table | flex | grid | ruby",
      "display-list": "none | list-item",
      "display-outside":
        "block-level | inline-level | run-in | contents | none | table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container",
      "empty-cells": "show | hide",
      filter: "none | <filter-function-list> | <-ms-filter>",
      flex: "none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]",
      "flex-basis": "content | <'width'>",
      "flex-direction": "row | row-reverse | column | column-reverse",
      "flex-flow": "<'flex-direction'> || <'flex-wrap'>",
      "flex-grow": "<number>",
      "flex-shrink": "<number>",
      "flex-wrap": "nowrap | wrap | wrap-reverse",
      float: "left | right | none | inline-start | inline-end",
      font:
        "[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar | <-non-standart-font>",
      "font-family": "[ <family-name> | <generic-family> ]#",
      "font-feature-settings": "normal | <feature-tag-value>#",
      "font-kerning": "auto | normal | none",
      "font-language-override": "normal | <string>",
      "font-variation-settings": "normal | [ <string> <number> ]#",
      "font-size": "<absolute-size> | <relative-size> | <length-percentage>",
      "font-size-adjust": "none | <number>",
      "font-stretch":
        "normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded",
      "font-style": "normal | italic | oblique",
      "font-synthesis": "none | [ weight || style ]",
      "font-variant":
        "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]",
      "font-variant-alternates":
        "normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]",
      "font-variant-caps":
        "normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps",
      "font-variant-east-asian":
        "normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]",
      "font-variant-ligatures":
        "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]",
      "font-variant-numeric":
        "normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]",
      "font-variant-position": "normal | sub | super",
      "font-weight":
        "normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900",
      grid:
        "<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>",
      "grid-area": "<grid-line> [ / <grid-line> ]{0,3}",
      "grid-auto-columns": "<track-size>+",
      "grid-auto-flow": "[ row | column ] || dense",
      "grid-auto-rows": "<track-size>+",
      "grid-column": "<grid-line> [ / <grid-line> ]?",
      "grid-column-end": "<grid-line>",
      "grid-column-gap": "<length-percentage>",
      "grid-column-start": "<grid-line>",
      "grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
      "grid-row": "<grid-line> [ / <grid-line> ]?",
      "grid-row-end": "<grid-line>",
      "grid-row-gap": "<length-percentage>",
      "grid-row-start": "<grid-line>",
      "grid-template":
        "none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?",
      "grid-template-areas": "none | <string>+",
      "grid-template-columns": "none | <track-list> | <auto-track-list>",
      "grid-template-rows": "none | <track-list> | <auto-track-list>",
      height:
        "[ <length> | <percentage> ] && [ border-box | content-box ]? | available | min-content | max-content | fit-content | auto",
      hyphens: "none | manual | auto",
      "image-orientation": "from-image | <angle> | [ <angle>? flip ]",
      "image-rendering":
        "auto | crisp-edges | pixelated | optimizeSpeed | optimizeQuality | <-non-standart-image-rendering>",
      "image-resolution": "[ from-image || <resolution> ] && snap?",
      "ime-mode": "auto | normal | active | inactive | disabled",
      "initial-letter": "normal | [ <number> <integer>? ]",
      "initial-letter-align": "[ auto | alphabetic | hanging | ideographic ]",
      "inline-size": "<'width'>",
      isolation: "auto | isolate",
      "justify-content":
        "flex-start | flex-end | center | space-between | space-around | space-evenly",
      left: "<length> | <percentage> | auto",
      "letter-spacing": "normal | <length-percentage>",
      "line-break": "auto | loose | normal | strict",
      "line-height": "normal | <number> | <length> | <percentage>",
      "list-style":
        "<'list-style-type'> || <'list-style-position'> || <'list-style-image'>",
      "list-style-image": "<url> | none",
      "list-style-position": "inside | outside",
      "list-style-type": "<counter-style> | <string> | none",
      margin: "[ <length> | <percentage> | auto ]{1,4}",
      "margin-block-end": "<'margin-left'>",
      "margin-block-start": "<'margin-left'>",
      "margin-bottom": "<length> | <percentage> | auto",
      "margin-inline-end": "<'margin-left'>",
      "margin-inline-start": "<'margin-left'>",
      "margin-left": "<length> | <percentage> | auto",
      "margin-right": "<length> | <percentage> | auto",
      "margin-top": "<length> | <percentage> | auto",
      "marker-offset": "<length> | auto",
      mask: "<mask-layer>#",
      "mask-clip": "[ <geometry-box> | no-clip ]#",
      "mask-composite": "<compositing-operator>#",
      "mask-image": "<mask-reference>#",
      "mask-mode": "<masking-mode>#",
      "mask-origin": "<geometry-box>#",
      "mask-position": "<position>#",
      "mask-repeat": "<repeat-style>#",
      "mask-size": "<bg-size>#",
      "mask-type": "luminance | alpha",
      "max-block-size": "<'max-width'>",
      "max-height":
        "<length> | <percentage> | none | max-content | min-content | fit-content | fill-available",
      "max-inline-size": "<'max-width'>",
      "max-width":
        "<length> | <percentage> | none | max-content | min-content | fit-content | fill-available | <-non-standart-width>",
      "min-block-size": "<'min-width'>",
      "min-height":
        "<length> | <percentage> | auto | max-content | min-content | fit-content | fill-available",
      "min-inline-size": "<'min-width'>",
      "min-width":
        "<length> | <percentage> | auto | max-content | min-content | fit-content | fill-available | <-non-standart-width>",
      "mix-blend-mode": "<blend-mode>",
      "object-fit": "fill | contain | cover | none | scale-down",
      "object-position": "<position>",
      offset:
        "[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?",
      "offset-anchor": "auto | <position>",
      "offset-block-end": "<'left'>",
      "offset-block-start": "<'left'>",
      "offset-inline-end": "<'left'>",
      "offset-inline-start": "<'left'>",
      "offset-distance": "<length-percentage>",
      "offset-path":
        "none | ray( [ <angle> && <size>? && contain? ] ) | <path()> | <url> | [ <basic-shape> || <geometry-box> ]",
      "offset-position": "auto | <position>",
      "offset-rotate": "[ auto | reverse ] || <angle>",
      opacity: "<number-zero-one>",
      order: "<integer>",
      orphans: "<integer>",
      outline:
        "[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]",
      "outline-color": "<color> | invert",
      "outline-offset": "<length>",
      "outline-style": "auto | <br-style>",
      "outline-width": "<br-width>",
      overflow: "visible | hidden | scroll | auto",
      "overflow-clip-box": "padding-box | content-box",
      "overflow-wrap": "normal | break-word",
      "overflow-x": "visible | hidden | scroll | auto",
      "overflow-y": "visible | hidden | scroll | auto",
      padding: "[ <length> | <percentage> ]{1,4}",
      "padding-block-end": "<'padding-left'>",
      "padding-block-start": "<'padding-left'>",
      "padding-bottom": "<length> | <percentage>",
      "padding-inline-end": "<'padding-left'>",
      "padding-inline-start": "<'padding-left'>",
      "padding-left": "<length> | <percentage>",
      "padding-right": "<length> | <percentage>",
      "padding-top": "<length> | <percentage>",
      "page-break-after": "auto | always | avoid | left | right",
      "page-break-before": "auto | always | avoid | left | right",
      "page-break-inside": "auto | avoid",
      perspective: "none | <length>",
      "perspective-origin": "<position>",
      "pointer-events":
        "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit",
      position:
        "static | relative | absolute | sticky | fixed | -webkit-sticky",
      quotes: "none | [ <string> <string> ]+",
      resize: "none | both | horizontal | vertical",
      right: "<length> | <percentage> | auto",
      "ruby-align": "start | center | space-between | space-around",
      "ruby-merge": "separate | collapse | auto",
      "ruby-position": "over | under | inter-character",
      "scroll-behavior": "auto | smooth",
      "scroll-snap-coordinate": "none | <position>#",
      "scroll-snap-destination": "<position>",
      "scroll-snap-points-x": "none | repeat( <length-percentage> )",
      "scroll-snap-points-y": "none | repeat( <length-percentage> )",
      "scroll-snap-type": "none | mandatory | proximity",
      "scroll-snap-type-x": "none | mandatory | proximity",
      "scroll-snap-type-y": "none | mandatory | proximity",
      "shape-image-threshold": "<number>",
      "shape-margin": "<length-percentage>",
      "shape-outside": "none | <shape-box> || <basic-shape> | <image>",
      "tab-size": "<integer> | <length>",
      "table-layout": "auto | fixed",
      "text-align":
        "start | end | left | right | center | justify | match-parent",
      "text-align-last": "auto | start | end | left | right | center | justify",
      "text-combine-upright": "none | all | [ digits <integer>? ]",
      "text-decoration":
        "<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'>",
      "text-decoration-color": "<color>",
      "text-decoration-line":
        "none | [ underline || overline || line-through || blink ]",
      "text-decoration-skip":
        "none | [ objects || spaces || ink || edges || box-decoration ]",
      "text-decoration-style": "solid | double | dotted | dashed | wavy",
      "text-emphasis": "<'text-emphasis-style'> || <'text-emphasis-color'>",
      "text-emphasis-color": "<color>",
      "text-emphasis-position": "[ over | under ] && [ right | left ]",
      "text-emphasis-style":
        "none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>",
      "text-indent": "<length-percentage> && hanging? && each-line?",
      "text-justify": "auto | inter-character | inter-word | none",
      "text-orientation": "mixed | upright | sideways",
      "text-overflow": "[ clip | ellipsis | <string> ]{1,2}",
      "text-rendering":
        "auto | optimizeSpeed | optimizeLegibility | geometricPrecision",
      "text-shadow": "none | <shadow-t>#",
      "text-size-adjust": "none | auto | <percentage>",
      "text-transform":
        "none | capitalize | uppercase | lowercase | full-width",
      "text-underline-position": "auto | [ under || [ left | right ] ]",
      top: "<length> | <percentage> | auto",
      "touch-action":
        "auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation",
      transform: "none | <transform-list>",
      "transform-box": "border-box | fill-box | view-box",
      "transform-origin":
        "[ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>? | [ <length-percentage> | left | center | right | top | bottom ]",
      "transform-style": "flat | preserve-3d",
      transition: "<single-transition>#",
      "transition-delay": "<time>#",
      "transition-duration": "<time>#",
      "transition-property": "none | <single-transition-property>#",
      "transition-timing-function": "<single-transition-timing-function>#",
      "unicode-bidi":
        "normal | embed | isolate | bidi-override | isolate-override | plaintext | -moz-isolate | -moz-isolate-override | -moz-plaintext | -webkit-isolate",
      "user-select": "auto | text | none | contain | all",
      "vertical-align":
        "baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>",
      visibility: "visible | hidden | collapse",
      "white-space": "normal | pre | nowrap | pre-wrap | pre-line",
      widows: "<integer>",
      width:
        "[ <length> | <percentage> ] && [ border-box | content-box ]? | available | min-content | max-content | fit-content | auto",
      "will-change": "auto | <animateable-feature>#",
      "word-break":
        "normal | break-all | keep-all | <-non-standart-word-break>",
      "word-spacing": "normal | <length-percentage>",
      "word-wrap": "normal | break-word",
      "writing-mode":
        "horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr | <svg-writing-mode>",
      "z-index": "auto | <integer>",
      "-moz-background-clip": "padding | border",
      "-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
      "-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
      "-moz-border-radius-topleft": "<'border-top-left-radius'>",
      "-moz-border-radius-topright": "<'border-bottom-right-radius'>",
      "-moz-osx-font-smoothing": "auto | unset | grayscale",
      "-moz-user-select": "none | text | all | -moz-none",
      "-ms-filter": "<string>",
      "-ms-flex-align": "start | end | center | baseline | stretch",
      "-ms-flex-item-align": "auto | start | end | center | baseline | stretch",
      "-ms-flex-line-pack":
        "start | end | center | justify | distribute | stretch",
      "-ms-flex-negative": "<'flex-shrink'>",
      "-ms-flex-pack": "start | end | center | justify | distribute",
      "-ms-flex-order": "<integer>",
      "-ms-flex-positive": "<'flex-grow'>",
      "-ms-flex-preferred-size": "<'flex-basis'>",
      "-ms-interpolation-mode": "nearest-neighbor | bicubic",
      "-ms-grid-column-align": "start | end | center | stretch",
      "-ms-grid-row-align": "start | end | center | stretch",
      "-ms-high-contrast-adjust": "auto | none",
      "-ms-user-select": "none | element | text",
      "-webkit-appearance":
        "none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | listbox | listitem | media-fullscreen-button | media-mute-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | push-button | radio | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield",
      "-webkit-background-clip":
        "[ <box> | border | padding | content | text ]#",
      "-webkit-column-break-after": "always | auto | avoid",
      "-webkit-column-break-before": "always | auto | avoid",
      "-webkit-column-break-inside": "always | auto | avoid",
      "-webkit-font-smoothing": "none | antialiased | subpixel-antialiased",
      "-webkit-line-clamp": "<positive-integer>",
      "-webkit-mask-box-image":
        "[ <url> | <gradient> | none ] [ <length-percentage>{4} <-webkit-mask-box-repeat>{2} ]?",
      "-webkit-overflow-scrolling": "auto | touch",
      "-webkit-print-color-adjust": "economy | exact",
      "-webkit-text-security": "none | circle | disc | square",
      "-webkit-user-drag": "none | element | auto",
      "-webkit-user-select": "auto | none | text | all",
      "alignment-baseline":
        "auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical",
      "baseline-shift": "baseline | sub | super | <svg-length>",
      behavior: "<url>+",
      "clip-rule": "nonzero | evenodd",
      cue: "<'cue-before'> <'cue-after'>?",
      "cue-after": "<url> <decibel>? | none",
      "cue-before": "<url> <decibel>? | none",
      "dominant-baseline":
        "auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge",
      fill: "<paint>",
      "fill-opacity": "<number-zero-one>",
      "fill-rule": "nonzero | evenodd",
      "glyph-orientation-horizontal": "<angle>",
      "glyph-orientation-vertical": "<angle>",
      kerning: "auto | <svg-length>",
      marker: "none | <url>",
      "marker-end": "none | <url>",
      "marker-mid": "none | <url>",
      "marker-start": "none | <url>",
      pause: "<'pause-before'> <'pause-after'>?",
      "pause-after":
        "<time> | none | x-weak | weak | medium | strong | x-strong",
      "pause-before":
        "<time> | none | x-weak | weak | medium | strong | x-strong",
      rest: "<'rest-before'> <'rest-after'>?",
      "rest-after":
        "<time> | none | x-weak | weak | medium | strong | x-strong",
      "rest-before":
        "<time> | none | x-weak | weak | medium | strong | x-strong",
      "shape-rendering":
        "auto | optimizeSpeed | crispEdges | geometricPrecision",
      src: "[ <url> format( <string># )? | local( <family-name> ) ]#",
      speak: "auto | none | normal",
      "speak-as":
        "normal | spell-out || digits || [ literal-punctuation | no-punctuation ]",
      stroke: "<paint>",
      "stroke-dasharray": "none | [ <svg-length>+ ]#",
      "stroke-dashoffset": "<svg-length>",
      "stroke-linecap": "butt | round | square",
      "stroke-linejoin": "miter | round | bevel",
      "stroke-miterlimit": "<number-one-or-greater>",
      "stroke-opacity": "<number-zero-one>",
      "stroke-width": "<svg-length>",
      "text-anchor": "start | middle | end",
      "unicode-range": "<unicode-range>#",
      "voice-balance":
        "<number> | left | center | right | leftwards | rightwards",
      "voice-duration": "auto | <time>",
      "voice-family":
        "[ [ <family-name> | <generic-voice> ] , ]* [ <family-name> | <generic-voice> ] | preserve",
      "voice-pitch":
        "<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]",
      "voice-range":
        "<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]",
      "voice-rate":
        "[ normal | x-slow | slow | medium | fast | x-fast ] || <percentage>",
      "voice-stress": "normal | strong | moderate | none | reduced",
      "voice-volume":
        "silent | [ [ x-soft | soft | medium | loud | x-loud ] || <decibel> ]",
      zoom: "normal | reset | <number> | <percentage>",
    },
  };
});
var Li = c((im, Ci) => {
  var Ti = v().cmpChar,
    Ai = v().isNumber,
    at = v().TYPE,
    tp = at.Identifier,
    wr = at.Number,
    it = at.PlusSign,
    Ie = at.HyphenMinus,
    rp = 110,
    np = !0,
    ap = !1;
  function Er(e, t) {
    var r = e.tokenStart;
    for (
      (e.source.charCodeAt(r) === it || e.source.charCodeAt(r) === Ie) &&
      (t && e.error(), r++);
      r < e.tokenEnd;
      r++
    )
      Ai(e.source.charCodeAt(r)) || e.error("Unexpected input", r);
  }
  Ci.exports = {
    name: "AnPlusB",
    structure: { a: [String, null], b: [String, null] },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = e,
        r = "",
        n = null,
        a = null;
      if (
        ((this.scanner.tokenType === wr || this.scanner.tokenType === it) &&
          (Er(this.scanner, ap),
          (r = this.scanner.getTokenValue()),
          this.scanner.next(),
          (t = this.scanner.tokenStart)),
        this.scanner.tokenType === tp)
      ) {
        var i = this.scanner.tokenStart;
        Ti(this.scanner.source, i, Ie) &&
          (r === ""
            ? ((r = "-"), i++)
            : this.scanner.error("Unexpected hyphen minus")),
          Ti(this.scanner.source, i, rp) || this.scanner.error(),
          (n = r === "" ? "1" : r === "+" ? "+1" : r === "-" ? "-1" : r);
        var o = this.scanner.tokenEnd - i;
        o > 1
          ? (this.scanner.source.charCodeAt(i + 1) !== Ie &&
              this.scanner.error("Unexpected input", i + 1),
            o > 2
              ? (this.scanner.tokenStart = i + 2)
              : (this.scanner.next(), this.scanner.skipSC()),
            Er(this.scanner, np),
            (a = "-" + this.scanner.getTokenValue()),
            this.scanner.next(),
            (t = this.scanner.tokenStart))
          : ((r = ""),
            this.scanner.next(),
            (t = this.scanner.tokenStart),
            this.scanner.skipSC(),
            (this.scanner.tokenType === Ie || this.scanner.tokenType === it) &&
              ((r = this.scanner.getTokenValue()),
              this.scanner.next(),
              this.scanner.skipSC()),
            this.scanner.tokenType === wr
              ? (Er(this.scanner, r !== ""),
                Ai(this.scanner.source.charCodeAt(this.scanner.tokenStart)) ||
                  ((r = this.scanner.source.charAt(this.scanner.tokenStart)),
                  this.scanner.tokenStart++),
                r === "" ? this.scanner.error() : r === "+" && (r = ""),
                (a = r + this.scanner.getTokenValue()),
                this.scanner.next(),
                (t = this.scanner.tokenStart))
              : r && this.scanner.eat(wr));
      } else
        (r === "" || r === "+") &&
          this.scanner.error(
            "Number or identifier is expected",
            this.scanner.tokenStart +
              (this.scanner.tokenType === it || this.scanner.tokenType === Ie)
          ),
          (a = r);
      return { type: "AnPlusB", loc: this.getLocation(e, t), a: n, b: a };
    },
    generate: function (e, t) {
      var r = t.a !== null && t.a !== void 0,
        n = t.b !== null && t.b !== void 0;
      r
        ? (e(
            t.a === "+1"
              ? "+n"
              : t.a === "1"
              ? "n"
              : t.a === "-1"
              ? "-n"
              : t.a + "n"
          ),
          n &&
            ((n = String(t.b)),
            n.charAt(0) === "-" || n.charAt(0) === "+"
              ? (e(n.charAt(0)), e(n.substr(1)))
              : (e("+"), e(n))))
        : e(String(t.b));
    },
  };
});
var Ii = c((om, Ri) => {
  var ot = v().TYPE,
    Pi = ot.Atrule,
    Ni = ot.Semicolon,
    Cr = ot.LeftCurlyBracket,
    _i = ot.RightCurlyBracket;
  function ip() {
    for (var e = 1, t; (t = this.scanner.lookupType(e)); e++) {
      if (t === _i) return !0;
      if (t === Cr || t === Pi) return !1;
    }
    this.scanner.skip(e), this.scanner.eat(_i);
  }
  Ri.exports = {
    name: "Atrule",
    structure: {
      name: String,
      expression: ["AtruleExpression", null],
      block: ["Block", null],
    },
    parse: function () {
      var e = this.scanner.tokenStart,
        t,
        r,
        n = null,
        a = null;
      if (
        (this.scanner.eat(Pi),
        (t = this.scanner.substrToCursor(e + 1)),
        (r = t.toLowerCase()),
        this.scanner.skipSC(),
        (n = this.AtruleExpression(t)),
        n.children.head === null && (n = null),
        this.scanner.skipSC(),
        this.atrule.hasOwnProperty(r))
      )
        typeof this.atrule[r].block == "function"
          ? (this.scanner.tokenType !== Cr &&
              this.scanner.error("Curly bracket is expected"),
            (a = this.atrule[r].block.call(this)))
          : (!this.tolerant || !this.scanner.eof) && this.scanner.eat(Ni);
      else
        switch (this.scanner.tokenType) {
          case Ni:
            this.scanner.next();
            break;
          case Cr:
            a = this.Block(ip.call(this) ? this.Declaration : this.Rule);
            break;
          default:
            this.tolerant ||
              this.scanner.error("Semicolon or block is expected");
        }
      return {
        type: "Atrule",
        loc: this.getLocation(e, this.scanner.tokenStart),
        name: t,
        expression: n,
        block: a,
      };
    },
    generate: function (e, t) {
      e("@"),
        e(t.name),
        t.expression !== null && (e(" "), this.generate(e, t.expression)),
        t.block ? this.generate(e, t.block) : e(";");
    },
    walkContext: "atrule",
  };
});
var Di = c((sm, Oi) => {
  var Mi = S(),
    qi = v().TYPE,
    zi = qi.Semicolon,
    Ui = qi.LeftCurlyBracket;
  function st(e) {
    return new Mi().appendData(this.Raw(e, zi, Ui, !1, !0));
  }
  function op() {
    return this.readSequence(this.scope.AtruleExpression);
  }
  Oi.exports = {
    name: "AtruleExpression",
    structure: { children: [[]] },
    parse: function (e) {
      var t = null,
        r = this.scanner.currentToken;
      return (
        e !== null && (e = e.toLowerCase()),
        this.parseAtruleExpression
          ? (this.atrule.hasOwnProperty(e)
              ? typeof this.atrule[e].expression == "function" &&
                (t = this.tolerantParse(this.atrule[e].expression, st))
              : (this.scanner.skipSC(), (t = this.tolerantParse(op, st))),
            this.tolerant &&
              (this.scanner.eof ||
                (this.scanner.tokenType !== zi &&
                  this.scanner.tokenType !== Ui)) &&
              (t = st.call(this, r)))
          : (t = st.call(this, r)),
        t === null && (t = new Mi()),
        {
          type: "AtruleExpression",
          loc: this.getLocationFromList(t),
          children: t,
        }
      );
    },
    generate: function (e, t) {
      this.each(e, t);
    },
    walkContext: "atruleExpression",
  };
});
var Yi = c((lm, Fi) => {
  var F = v().TYPE,
    Oe = F.Identifier,
    sp = F.String,
    lp = F.DollarSign,
    Bi = F.Asterisk,
    up = F.Colon,
    lt = F.EqualsSign,
    cp = F.LeftSquareBracket,
    Gi = F.RightSquareBracket,
    hp = F.CircumflexAccent,
    Tr = F.VerticalLine,
    pp = F.Tilde;
  function fp() {
    this.scanner.eof && this.scanner.error("Unexpected end of input");
    var e = this.scanner.tokenStart,
      t = !1,
      r = !0;
    return (
      this.scanner.tokenType === Bi
        ? ((t = !0), (r = !1), this.scanner.next())
        : this.scanner.tokenType !== Tr && this.scanner.eat(Oe),
      this.scanner.tokenType === Tr
        ? this.scanner.lookupType(1) !== lt
          ? (this.scanner.next(), this.scanner.eat(Oe))
          : t &&
            this.scanner.error("Identifier is expected", this.scanner.tokenEnd)
        : t && this.scanner.error("Vertical line is expected"),
      r &&
        this.scanner.tokenType === up &&
        (this.scanner.next(), this.scanner.eat(Oe)),
      {
        type: "Identifier",
        loc: this.getLocation(e, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(e),
      }
    );
  }
  function dp() {
    var e = this.scanner.tokenStart,
      t = this.scanner.tokenType;
    return (
      t !== lt &&
        t !== pp &&
        t !== hp &&
        t !== lp &&
        t !== Bi &&
        t !== Tr &&
        this.scanner.error(
          "Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"
        ),
      t === lt
        ? this.scanner.next()
        : (this.scanner.next(), this.scanner.eat(lt)),
      this.scanner.substrToCursor(e)
    );
  }
  Fi.exports = {
    name: "AttributeSelector",
    structure: {
      name: "Identifier",
      matcher: [String, null],
      value: ["String", "Identifier", null],
      flags: [String, null],
    },
    parse: function () {
      var e = this.scanner.tokenStart,
        t,
        r = null,
        n = null,
        a = null;
      return (
        this.scanner.eat(cp),
        this.scanner.skipSC(),
        (t = fp.call(this)),
        this.scanner.skipSC(),
        this.scanner.tokenType !== Gi &&
          (this.scanner.tokenType !== Oe &&
            ((r = dp.call(this)),
            this.scanner.skipSC(),
            (n =
              this.scanner.tokenType === sp
                ? this.String()
                : this.Identifier()),
            this.scanner.skipSC()),
          this.scanner.tokenType === Oe &&
            ((a = this.scanner.getTokenValue()),
            this.scanner.next(),
            this.scanner.skipSC())),
        this.scanner.eat(Gi),
        {
          type: "AttributeSelector",
          loc: this.getLocation(e, this.scanner.tokenStart),
          name: t,
          matcher: r,
          value: n,
          flags: a,
        }
      );
    },
    generate: function (e, t) {
      var r = " ";
      e("["),
        this.generate(e, t.name),
        t.matcher !== null &&
          (e(t.matcher),
          t.value !== null &&
            (this.generate(e, t.value), t.value.type === "String" && (r = ""))),
        t.flags !== null && (e(r), e(t.flags)),
        e("]");
    },
  };
});
var Ki = c((um, Hi) => {
  var gp = S(),
    de = v().TYPE,
    mp = de.WhiteSpace,
    vp = de.Comment,
    Wi = de.Semicolon,
    bp = de.Atrule,
    yp = de.LeftCurlyBracket,
    ji = de.RightCurlyBracket;
  function Vi(e) {
    return this.Raw(e, 0, Wi, !0, !0);
  }
  Hi.exports = {
    name: "Block",
    structure: { children: [["Atrule", "Rule", "Declaration"]] },
    parse: function (e) {
      e || (e = this.Declaration);
      var t = this.scanner.tokenStart,
        r = new gp();
      this.scanner.eat(yp);
      e: for (; !this.scanner.eof; )
        switch (this.scanner.tokenType) {
          case ji:
            break e;
          case mp:
          case vp:
          case Wi:
            this.scanner.next();
            break;
          case bp:
            r.appendData(this.tolerantParse(this.Atrule, Vi));
            break;
          default:
            r.appendData(this.tolerantParse(e, Vi));
        }
      return (
        (!this.tolerant || !this.scanner.eof) && this.scanner.eat(ji),
        {
          type: "Block",
          loc: this.getLocation(t, this.scanner.tokenStart),
          children: r,
        }
      );
    },
    generate: function (e, t) {
      e("{"), this.each(e, t), e("}");
    },
    walkContext: "block",
  };
});
var Zi = c((cm, Qi) => {
  var Xi = v().TYPE,
    kp = Xi.LeftSquareBracket,
    Sp = Xi.RightSquareBracket;
  Qi.exports = {
    name: "Brackets",
    structure: { children: [[]] },
    parse: function (e, t) {
      var r = this.scanner.tokenStart,
        n = null;
      return (
        this.scanner.eat(kp),
        (n = e.call(this, t)),
        this.scanner.eat(Sp),
        {
          type: "Brackets",
          loc: this.getLocation(r, this.scanner.tokenStart),
          children: n,
        }
      );
    },
    generate: function (e, t) {
      e("["), this.each(e, t), e("]");
    },
  };
});
var Ji = c((hm, $i) => {
  var xp = v().TYPE.CDC;
  $i.exports = {
    name: "CDC",
    structure: [],
    parse: function () {
      var e = this.scanner.tokenStart;
      return (
        this.scanner.eat(xp),
        { type: "CDC", loc: this.getLocation(e, this.scanner.tokenStart) }
      );
    },
    generate: function (e) {
      e("-->");
    },
  };
});
var to = c((pm, eo) => {
  var wp = v().TYPE.CDO;
  eo.exports = {
    name: "CDO",
    structure: [],
    parse: function () {
      var e = this.scanner.tokenStart;
      return (
        this.scanner.eat(wp),
        { type: "CDO", loc: this.getLocation(e, this.scanner.tokenStart) }
      );
    },
    generate: function (e) {
      e("<!--");
    },
  };
});
var ao = c((fm, ro) => {
  var no = v().TYPE,
    Ep = no.Identifier,
    Cp = no.FullStop;
  ro.exports = {
    name: "ClassSelector",
    structure: { name: String },
    parse: function () {
      return (
        this.scanner.eat(Cp),
        {
          type: "ClassSelector",
          loc: this.getLocation(
            this.scanner.tokenStart - 1,
            this.scanner.tokenEnd
          ),
          name: this.scanner.consume(Ep),
        }
      );
    },
    generate: function (e, t) {
      e("."), e(t.name);
    },
  };
});
var so = c((dm, io) => {
  var ut = v().TYPE,
    Tp = ut.PlusSign,
    oo = ut.Solidus,
    Ap = ut.GreaterThanSign,
    Lp = ut.Tilde;
  io.exports = {
    name: "Combinator",
    structure: { name: String },
    parse: function () {
      var e = this.scanner.tokenStart;
      switch (this.scanner.tokenType) {
        case Ap:
        case Tp:
        case Lp:
          this.scanner.next();
          break;
        case oo:
          this.scanner.next(),
            this.scanner.expectIdentifier("deep"),
            this.scanner.eat(oo);
          break;
        default:
          this.scanner.error("Combinator is expected");
      }
      return {
        type: "Combinator",
        loc: this.getLocation(e, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(e),
      };
    },
    generate: function (e, t) {
      e(t.name);
    },
  };
});
var co = c((gm, lo) => {
  var uo = v().TYPE,
    Rp = uo.Asterisk,
    Pp = uo.Solidus;
  lo.exports = {
    name: "Comment",
    structure: { value: String },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = this.scanner.tokenEnd;
      return (
        t - e + 2 >= 2 &&
          this.scanner.source.charCodeAt(t - 2) === Rp &&
          this.scanner.source.charCodeAt(t - 1) === Pp &&
          (t -= 2),
        this.scanner.next(),
        {
          type: "Comment",
          loc: this.getLocation(e, this.scanner.tokenStart),
          value: this.scanner.source.substring(e + 2, t),
        }
      );
    },
    generate: function (e, t) {
      e("/*"), e(t.value), e("*/");
    },
  };
});
var mo = c((mm, ho) => {
  var M = v().TYPE,
    po = M.Identifier,
    Np = M.Colon,
    Ar = M.ExclamationMark,
    fo = M.Solidus,
    _p = M.Asterisk,
    Ip = M.DollarSign,
    Lr = M.HyphenMinus,
    go = M.Semicolon,
    Op = M.RightCurlyBracket,
    Mp = M.RightParenthesis,
    qp = M.PlusSign,
    zp = M.NumberSign;
  ho.exports = {
    name: "Declaration",
    structure: {
      important: [Boolean, String],
      property: String,
      value: ["Value", "Raw"],
    },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = Dp.call(this),
        r = !1,
        n;
      return (
        this.scanner.skipSC(),
        this.scanner.eat(Np),
        (Up(t) ? this.parseCustomProperty : this.parseValue)
          ? (n = this.Value(t))
          : (n = this.Raw(this.scanner.currentToken, Ar, go, !1, !1)),
        this.scanner.tokenType === Ar &&
          ((r = Fp(this.scanner)), this.scanner.skipSC()),
        !this.scanner.eof &&
          this.scanner.tokenType !== go &&
          this.scanner.tokenType !== Mp &&
          this.scanner.tokenType !== Op &&
          this.scanner.error(),
        {
          type: "Declaration",
          loc: this.getLocation(e, this.scanner.tokenStart),
          important: r,
          property: t,
          value: n,
        }
      );
    },
    generate: function (e, t, r) {
      e(t.property),
        e(":"),
        this.generate(e, t.value),
        t.important && e(t.important === !0 ? "!important" : "!" + t.important),
        r && r.next && e(";");
    },
    walkContext: "declaration",
  };
  function Up(e) {
    return e.length >= 2 && e.charCodeAt(0) === Lr && e.charCodeAt(1) === Lr;
  }
  function Dp() {
    var e = this.scanner.tokenStart,
      t = 0;
    switch (this.scanner.tokenType) {
      case _p:
      case Ip:
      case qp:
      case zp:
        t = 1;
        break;
      case fo:
        t = this.scanner.lookupType(1) === fo ? 2 : 1;
        break;
    }
    return (
      this.scanner.lookupType(t) === Lr && t++,
      t && this.scanner.skip(t),
      this.scanner.eat(po),
      this.scanner.substrToCursor(e)
    );
  }
  function Fp(e) {
    e.eat(Ar), e.skipSC();
    var t = e.consume(po);
    return t === "important" ? !0 : t;
  }
});
var yo = c((vm, vo) => {
  var Bp = S(),
    Rr = v().TYPE,
    Gp = Rr.WhiteSpace,
    Yp = Rr.Comment,
    bo = Rr.Semicolon;
  function Hp(e) {
    return this.Raw(e, 0, bo, !0, !0);
  }
  vo.exports = {
    name: "DeclarationList",
    structure: { children: [["Declaration"]] },
    parse: function () {
      var e = new Bp();
      e: for (; !this.scanner.eof; )
        switch (this.scanner.tokenType) {
          case Gp:
          case Yp:
          case bo:
            this.scanner.next();
            break;
          default:
            e.appendData(this.tolerantParse(this.Declaration, Hp));
        }
      return {
        type: "DeclarationList",
        loc: this.getLocationFromList(e),
        children: e,
      };
    },
    generate: function (e, t) {
      this.each(e, t);
    },
  };
});
var So = c((bm, ko) => {
  var Wp = v().TYPE.Number;
  function jp(e) {
    var t = e.getTokenValue(),
      r = t.indexOf("\\");
    return r > 0 ? ((e.tokenStart += r), t.substring(0, r)) : (e.next(), t);
  }
  ko.exports = {
    name: "Dimension",
    structure: { value: String, unit: String },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = this.scanner.consume(Wp),
        r = jp(this.scanner);
      return {
        type: "Dimension",
        loc: this.getLocation(e, this.scanner.tokenStart),
        value: t,
        unit: r,
      };
    },
    generate: function (e, t) {
      e(t.value), e(t.unit);
    },
  };
});
var wo = c((ym, xo) => {
  var Vp = v().TYPE,
    Kp = Vp.RightParenthesis;
  xo.exports = {
    name: "Function",
    structure: { name: String, children: [[]] },
    parse: function (e, t) {
      var r = this.scanner.tokenStart,
        n = this.scanner.consumeFunctionName(),
        a = n.toLowerCase(),
        i;
      return (
        (i = t.hasOwnProperty(a) ? t[a].call(this, t) : e.call(this, t)),
        this.scanner.eat(Kp),
        {
          type: "Function",
          loc: this.getLocation(r, this.scanner.tokenStart),
          name: n,
          children: i,
        }
      );
    },
    generate: function (e, t) {
      e(t.name), e("("), this.each(e, t), e(")");
    },
    walkContext: "function",
  };
});
var Ao = c((km, Eo) => {
  var Co = v().isHex,
    Pr = v().TYPE,
    To = Pr.Identifier,
    Qp = Pr.Number,
    Xp = Pr.NumberSign;
  function Nr(e, t) {
    if (!Co(e.source.charCodeAt(e.tokenStart)))
      if (t) e.error("Unexpected input", e.tokenStart);
      else return;
    for (var r = e.tokenStart + 1; r < e.tokenEnd; r++) {
      var n = e.source.charCodeAt(r);
      if (!Co(n)) {
        e.tokenStart = r;
        return;
      }
    }
    e.next();
  }
  Eo.exports = {
    name: "HexColor",
    structure: { value: String },
    parse: function () {
      var e = this.scanner.tokenStart;
      this.scanner.eat(Xp);
      e: switch (this.scanner.tokenType) {
        case Qp:
          Nr(this.scanner, !0),
            this.scanner.tokenType === To && Nr(this.scanner, !1);
          break;
        case To:
          Nr(this.scanner, !0);
          break;
        default:
          this.scanner.error("Number or identifier is expected");
      }
      return {
        type: "HexColor",
        loc: this.getLocation(e, this.scanner.tokenStart),
        value: this.scanner.substrToCursor(e + 1),
      };
    },
    generate: function (e, t) {
      e("#"), e(t.value);
    },
  };
});
var Ro = c((Sm, Lo) => {
  var Zp = v().TYPE,
    $p = Zp.Identifier;
  Lo.exports = {
    name: "Identifier",
    structure: { name: String },
    parse: function () {
      return {
        type: "Identifier",
        loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
        name: this.scanner.consume($p),
      };
    },
    generate: function (e, t) {
      e(t.name);
    },
  };
});
var _o = c((xm, Po) => {
  var No = v().TYPE,
    Jp = No.Identifier,
    ef = No.NumberSign;
  Po.exports = {
    name: "IdSelector",
    structure: { name: String },
    parse: function () {
      return (
        this.scanner.eat(ef),
        {
          type: "IdSelector",
          loc: this.getLocation(
            this.scanner.tokenStart - 1,
            this.scanner.tokenEnd
          ),
          name: this.scanner.consume(Jp),
        }
      );
    },
    generate: function (e, t) {
      e("#"), e(t.name);
    },
  };
});
var Mo = c((wm, Io) => {
  var ge = v().TYPE,
    _r = ge.Identifier,
    tf = ge.Number,
    rf = ge.LeftParenthesis,
    Oo = ge.RightParenthesis,
    nf = ge.Colon,
    af = ge.Solidus;
  Io.exports = {
    name: "MediaFeature",
    structure: {
      name: String,
      value: ["Identifier", "Number", "Dimension", "Ratio", null],
    },
    parse: function () {
      var e = this.scanner.tokenStart,
        t,
        r = null;
      if (
        (this.scanner.eat(rf),
        this.scanner.skipSC(),
        (t = this.scanner.consume(_r)),
        this.scanner.skipSC(),
        this.scanner.tokenType !== Oo)
      ) {
        switch (
          (this.scanner.eat(nf), this.scanner.skipSC(), this.scanner.tokenType)
        ) {
          case tf:
            this.scanner.lookupType(1) === _r
              ? (r = this.Dimension())
              : this.scanner.lookupNonWSType(1) === af
              ? (r = this.Ratio())
              : (r = this.Number());
            break;
          case _r:
            r = this.Identifier();
            break;
          default:
            this.scanner.error(
              "Number, dimension, ratio or identifier is expected"
            );
        }
        this.scanner.skipSC();
      }
      return (
        this.scanner.eat(Oo),
        {
          type: "MediaFeature",
          loc: this.getLocation(e, this.scanner.tokenStart),
          name: t,
          value: r,
        }
      );
    },
    generate: function (e, t) {
      e("("),
        e(t.name),
        t.value !== null && (e(":"), this.generate(e, t.value)),
        e(")");
    },
  };
});
var zo = c((Em, qo) => {
  var of = S(),
    ct = v().TYPE,
    sf = ct.WhiteSpace,
    lf = ct.Comment,
    uf = ct.Identifier,
    cf = ct.LeftParenthesis;
  qo.exports = {
    name: "MediaQuery",
    structure: { children: [["Identifier", "MediaFeature", "WhiteSpace"]] },
    parse: function () {
      this.scanner.skipSC();
      var e = new of(),
        t = null,
        r = null;
      e: for (; !this.scanner.eof; ) {
        switch (this.scanner.tokenType) {
          case lf:
            this.scanner.next();
            continue;
          case sf:
            r = this.WhiteSpace();
            continue;
          case uf:
            t = this.Identifier();
            break;
          case cf:
            t = this.MediaFeature();
            break;
          default:
            break e;
        }
        r !== null && (e.appendData(r), (r = null)), e.appendData(t);
      }
      return (
        t === null &&
          this.scanner.error("Identifier or parenthesis is expected"),
        { type: "MediaQuery", loc: this.getLocationFromList(e), children: e }
      );
    },
    generate: function (e, t) {
      this.each(e, t);
    },
  };
});
var Do = c((Cm, Uo) => {
  var hf = S(),
    pf = v().TYPE.Comma;
  Uo.exports = {
    name: "MediaQueryList",
    structure: { children: [["MediaQuery"]] },
    parse: function (e) {
      var t = new hf();
      for (
        this.scanner.skipSC();
        !this.scanner.eof &&
        (t.appendData(this.MediaQuery(e)), this.scanner.tokenType === pf);

      )
        this.scanner.next();
      return {
        type: "MediaQueryList",
        loc: this.getLocationFromList(t),
        children: t,
      };
    },
    generate: function (e, t) {
      this.eachComma(e, t);
    },
  };
});
var Bo = c((Tm, Fo) => {
  Fo.exports = {
    name: "Nth",
    structure: {
      nth: ["AnPlusB", "Identifier"],
      selector: ["SelectorList", null],
    },
    parse: function (e) {
      this.scanner.skipSC();
      var t = this.scanner.tokenStart,
        r = t,
        n = null,
        a;
      return (
        this.scanner.lookupValue(0, "odd") ||
        this.scanner.lookupValue(0, "even")
          ? (a = this.Identifier())
          : (a = this.AnPlusB()),
        this.scanner.skipSC(),
        e && this.scanner.lookupValue(0, "of")
          ? (this.scanner.next(),
            (n = this.SelectorList()),
            this.needPositions && (r = n.children.last().loc.end.offset))
          : this.needPositions && (r = a.loc.end.offset),
        { type: "Nth", loc: this.getLocation(t, r), nth: a, selector: n }
      );
    },
    generate: function (e, t) {
      this.generate(e, t.nth),
        t.selector !== null && (e(" of "), this.generate(e, t.selector));
    },
  };
});
var Yo = c((Am, Go) => {
  var ff = v().TYPE.Number;
  Go.exports = {
    name: "Number",
    structure: { value: String },
    parse: function () {
      return {
        type: "Number",
        loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
        value: this.scanner.consume(ff),
      };
    },
    generate: function (e, t) {
      e(t.value);
    },
  };
});
var Wo = c((Lm, Ho) => {
  Ho.exports = {
    name: "Operator",
    structure: { value: String },
    parse: function () {
      var e = this.scanner.tokenStart;
      return (
        this.scanner.next(),
        {
          type: "Operator",
          loc: this.getLocation(e, this.scanner.tokenStart),
          value: this.scanner.substrToCursor(e),
        }
      );
    },
    generate: function (e, t) {
      e(t.value);
    },
  };
});
var Ko = c((Rm, jo) => {
  var Vo = v().TYPE,
    df = Vo.LeftParenthesis,
    gf = Vo.RightParenthesis;
  jo.exports = {
    name: "Parentheses",
    structure: { children: [[]] },
    parse: function (e, t) {
      var r = this.scanner.tokenStart,
        n = null;
      return (
        this.scanner.eat(df),
        (n = e.call(this, t)),
        this.scanner.eat(gf),
        {
          type: "Parentheses",
          loc: this.getLocation(r, this.scanner.tokenStart),
          children: n,
        }
      );
    },
    generate: function (e, t) {
      e("("), this.each(e, t), e(")");
    },
  };
});
var Zo = c((Pm, Qo) => {
  var Xo = v().TYPE,
    mf = Xo.Number,
    vf = Xo.PercentSign;
  Qo.exports = {
    name: "Percentage",
    structure: { value: String },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = this.scanner.consume(mf);
      return (
        this.scanner.eat(vf),
        {
          type: "Percentage",
          loc: this.getLocation(e, this.scanner.tokenStart),
          value: t,
        }
      );
    },
    generate: function (e, t) {
      e(t.value), e("%");
    },
  };
});
var Jo = c((Nm, $o) => {
  var bf = S(),
    ht = v().TYPE,
    yf = ht.Identifier,
    kf = ht.Function,
    Sf = ht.Colon,
    xf = ht.RightParenthesis;
  $o.exports = {
    name: "PseudoClassSelector",
    structure: { name: String, children: [["Raw"], null] },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = null,
        r,
        n;
      return (
        this.scanner.eat(Sf),
        this.scanner.tokenType === kf
          ? ((r = this.scanner.consumeFunctionName()),
            (n = r.toLowerCase()),
            this.pseudo.hasOwnProperty(n)
              ? (this.scanner.skipSC(),
                (t = this.pseudo[n].call(this)),
                this.scanner.skipSC())
              : (t = new bf().appendData(
                  this.Raw(this.scanner.currentToken, 0, 0, !1, !1)
                )),
            this.scanner.eat(xf))
          : (r = this.scanner.consume(yf)),
        {
          type: "PseudoClassSelector",
          loc: this.getLocation(e, this.scanner.tokenStart),
          name: r,
          children: t,
        }
      );
    },
    generate: function (e, t) {
      e(":"),
        e(t.name),
        t.children !== null && (e("("), this.each(e, t), e(")"));
    },
    walkContext: "function",
  };
});
var rs = c((_m, es) => {
  var wf = S(),
    pt = v().TYPE,
    Ef = pt.Identifier,
    Cf = pt.Function,
    ts = pt.Colon,
    Tf = pt.RightParenthesis;
  es.exports = {
    name: "PseudoElementSelector",
    structure: { name: String, children: [["Raw"], null] },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = null,
        r,
        n;
      return (
        this.scanner.eat(ts),
        this.scanner.eat(ts),
        this.scanner.tokenType === Cf
          ? ((r = this.scanner.consumeFunctionName()),
            (n = r.toLowerCase()),
            this.pseudo.hasOwnProperty(n)
              ? (this.scanner.skipSC(),
                (t = this.pseudo[n].call(this)),
                this.scanner.skipSC())
              : (t = new wf().appendData(
                  this.Raw(this.scanner.currentToken, 0, 0, !1, !1)
                )),
            this.scanner.eat(Tf))
          : (r = this.scanner.consume(Ef)),
        {
          type: "PseudoElementSelector",
          loc: this.getLocation(e, this.scanner.tokenStart),
          name: r,
          children: t,
        }
      );
    },
    generate: function (e, t) {
      e("::"),
        e(t.name),
        t.children !== null && (e("("), this.each(e, t), e(")"));
    },
    walkContext: "function",
  };
});
var is = c((Im, ns) => {
  var Af = v().isNumber,
    Ir = v().TYPE,
    Lf = Ir.Number,
    Rf = Ir.Solidus,
    Pf = Ir.FullStop;
  function as(e) {
    for (var t = e.consumeNonWS(Lf), r = 0; r < t.length; r++) {
      var n = t.charCodeAt(r);
      !Af(n) &&
        n !== Pf &&
        e.error("Unsigned number is expected", e.tokenStart - t.length + r);
    }
    return (
      Number(t) === 0 &&
        e.error("Zero number is not allowed", e.tokenStart - t.length),
      t
    );
  }
  ns.exports = {
    name: "Ratio",
    structure: { left: String, right: String },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = as(this.scanner),
        r;
      return (
        this.scanner.eatNonWS(Rf),
        (r = as(this.scanner)),
        {
          type: "Ratio",
          loc: this.getLocation(e, this.scanner.tokenStart),
          left: t,
          right: r,
        }
      );
    },
    generate: function (e, t) {
      e(t.left), e("/"), e(t.right);
    },
  };
});
var ss = c((Om, os) => {
  os.exports = {
    name: "Raw",
    structure: { value: String },
    parse: function (e, t, r, n, a) {
      var i = this.scanner.getTokenStart(e),
        o;
      return (
        this.scanner.skip(this.scanner.getRawLength(e, t, r, n)),
        a && this.scanner.tokenStart > i
          ? (o = this.scanner.getOffsetExcludeWS())
          : (o = this.scanner.tokenStart),
        {
          type: "Raw",
          loc: this.getLocation(i, o),
          value: this.scanner.source.substring(i, o),
        }
      );
    },
    generate: function (e, t) {
      e(t.value);
    },
  };
});
var cs = c((Mm, ls) => {
  var Nf = v().TYPE,
    _f = Nf.LeftCurlyBracket;
  function us(e) {
    return this.Raw(e, _f, 0, !1, !0);
  }
  ls.exports = {
    name: "Rule",
    structure: { selector: ["SelectorList", "Raw"], block: ["Block"] },
    parse: function () {
      var e = this.scanner.currentToken,
        t = this.scanner.tokenStart,
        r = this.parseSelector
          ? this.tolerantParse(this.SelectorList, us)
          : us.call(this, e),
        n = this.Block(this.Declaration);
      return {
        type: "Rule",
        loc: this.getLocation(t, this.scanner.tokenStart),
        selector: r,
        block: n,
      };
    },
    generate: function (e, t) {
      this.generate(e, t.selector), this.generate(e, t.block);
    },
    walkContext: "rule",
  };
});
var ps = c((qm, hs) => {
  hs.exports = {
    name: "Selector",
    structure: {
      children: [
        [
          "TypeSelector",
          "IdSelector",
          "ClassSelector",
          "AttributeSelector",
          "PseudoClassSelector",
          "PseudoElementSelector",
          "Combinator",
          "WhiteSpace",
        ],
      ],
    },
    parse: function () {
      var e = this.readSequence(this.scope.Selector);
      return (
        e.isEmpty() && this.scanner.error("Selector is expected"),
        { type: "Selector", loc: this.getLocationFromList(e), children: e }
      );
    },
    generate: function (e, t) {
      this.each(e, t);
    },
  };
});
var ms = c((zm, fs) => {
  var If = S(),
    ds = v().TYPE,
    gs = ds.Comma,
    Of = ds.LeftCurlyBracket;
  fs.exports = {
    name: "SelectorList",
    structure: { children: [["Selector", "Raw"]] },
    parse: function () {
      for (var e = new If(); !this.scanner.eof; ) {
        if (
          (e.appendData(
            this.parseSelector
              ? this.Selector()
              : this.Raw(this.scanner.currentToken, gs, Of, !1, !1)
          ),
          this.scanner.tokenType === gs)
        ) {
          this.scanner.next();
          continue;
        }
        break;
      }
      return {
        type: "SelectorList",
        loc: this.getLocationFromList(e),
        children: e,
      };
    },
    generate: function (e, t) {
      this.eachComma(e, t);
    },
    walkContext: "selector",
  };
});
var bs = c((Um, vs) => {
  var Mf = v().TYPE.String;
  vs.exports = {
    name: "String",
    structure: { value: String },
    parse: function () {
      return {
        type: "String",
        loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
        value: this.scanner.consume(Mf),
      };
    },
    generate: function (e, t) {
      e(t.value);
    },
  };
});
var ks = c((Dm, ys) => {
  var qf = S(),
    me = v().TYPE,
    zf = me.WhiteSpace,
    Uf = me.Comment,
    Df = me.ExclamationMark,
    Ff = me.Atrule,
    Bf = me.CDO,
    Gf = me.CDC;
  function Yf(e) {
    return this.Raw(e, 0, 0, !1, !1);
  }
  ys.exports = {
    name: "StyleSheet",
    structure: { children: [["Comment", "Atrule", "Rule", "Raw"]] },
    parse: function () {
      var e = this.scanner.tokenStart,
        t = new qf(),
        r;
      e: for (; !this.scanner.eof; ) {
        switch (this.scanner.tokenType) {
          case zf:
            this.scanner.next();
            continue;
          case Uf:
            if (
              this.scanner.source.charCodeAt(this.scanner.tokenStart + 2) !== Df
            ) {
              this.scanner.next();
              continue;
            }
            r = this.Comment();
            break;
          case Bf:
            r = this.CDO();
            break;
          case Gf:
            r = this.CDC();
            break;
          case Ff:
            r = this.Atrule();
            break;
          default:
            r = this.tolerantParse(this.Rule, Yf);
        }
        t.appendData(r);
      }
      return {
        type: "StyleSheet",
        loc: this.getLocation(e, this.scanner.tokenStart),
        children: t,
      };
    },
    generate: function (e, t) {
      this.each(e, t);
    },
    walkContext: "stylesheet",
  };
});
var ws = c((Fm, Ss) => {
  var Or = v().TYPE,
    Hf = Or.Identifier,
    Wf = Or.Asterisk,
    xs = Or.VerticalLine;
  function Mr() {
    this.scanner.tokenType !== Hf &&
      this.scanner.tokenType !== Wf &&
      this.scanner.error("Identifier or asterisk is expected"),
      this.scanner.next();
  }
  Ss.exports = {
    name: "TypeSelector",
    structure: { name: String },
    parse: function () {
      var e = this.scanner.tokenStart;
      return (
        this.scanner.tokenType === xs
          ? (this.scanner.next(), Mr.call(this))
          : (Mr.call(this),
            this.scanner.tokenType === xs &&
              (this.scanner.next(), Mr.call(this))),
        {
          type: "TypeSelector",
          loc: this.getLocation(e, this.scanner.tokenStart),
          name: this.scanner.substrToCursor(e),
        }
      );
    },
    generate: function (e, t) {
      e(t.name);
    },
  };
});
var As = c((Bm, Es) => {
  var jf = v().isHex,
    ve = v().TYPE,
    Vf = ve.Identifier,
    Cs = ve.Number,
    Kf = ve.PlusSign,
    ft = ve.HyphenMinus,
    Ts = ve.FullStop,
    Qf = ve.QuestionMark;
  function Xf(e) {
    for (var t = e.tokenStart + 1; t < e.tokenEnd; t++) {
      var r = e.source.charCodeAt(t);
      if (r === Ts || r === Kf) return (e.tokenStart = t), !1;
    }
    return !0;
  }
  function Zf(e) {
    var t = e.tokenStart + 1,
      r = 0;
    e: {
      if (e.tokenType === Cs) {
        if (e.source.charCodeAt(e.tokenStart) !== Ts && Xf(e)) e.next();
        else if (e.source.charCodeAt(e.tokenStart) !== ft) break e;
      } else e.next();
      e.tokenType === ft && e.next(),
        e.tokenType === Cs && e.next(),
        e.tokenType === Vf && e.next(),
        e.tokenStart === t && e.error("Unexpected input", t);
    }
    for (var n = t, a = !1; n < e.tokenStart; n++) {
      var i = e.source.charCodeAt(n);
      jf(i) === !1 && (i !== ft || a) && e.error("Unexpected input", n),
        i === ft
          ? (r === 0 && e.error("Unexpected input", n), (a = !0), (r = 0))
          : (r++, r > 6 && e.error("Too long hex sequence", n));
    }
    if ((r === 0 && e.error("Unexpected input", n - 1), !a))
      for (; r < 6 && !e.eof && e.tokenType === Qf; e.next()) r++;
  }
  Es.exports = {
    name: "UnicodeRange",
    structure: { value: String },
    parse: function () {
      var e = this.scanner.tokenStart;
      return (
        this.scanner.next(),
        Zf(this.scanner),
        {
          type: "UnicodeRange",
          loc: this.getLocation(e, this.scanner.tokenStart),
          value: this.scanner.substrToCursor(e),
        }
      );
    },
    generate: function (e, t) {
      e(t.value);
    },
  };
});
var Ps = c((Gm, Ls) => {
  var dt = v().TYPE,
    $f = dt.String,
    Jf = dt.Url,
    Rs = dt.Raw,
    ed = dt.RightParenthesis;
  Ls.exports = {
    name: "Url",
    structure: { value: ["String", "Raw"] },
    parse: function () {
      var e = this.scanner.tokenStart,
        t;
      switch (
        (this.scanner.eat(Jf), this.scanner.skipSC(), this.scanner.tokenType)
      ) {
        case $f:
          t = this.String();
          break;
        case Rs:
          t = this.Raw(this.scanner.currentToken, 0, Rs, !0, !1);
          break;
        default:
          this.scanner.error("String or Raw is expected");
      }
      return (
        this.scanner.skipSC(),
        this.scanner.eat(ed),
        {
          type: "Url",
          loc: this.getLocation(e, this.scanner.tokenStart),
          value: t,
        }
      );
    },
    generate: function (e, t) {
      e("url"), e("("), this.generate(e, t.value), e(")");
    },
  };
});
var _s = c((Ym, Ns) => {
  var td = v().endsWith,
    be = v().TYPE,
    rd = be.WhiteSpace,
    nd = be.Comment,
    ad = be.Function,
    id = be.Colon,
    od = be.Semicolon,
    sd = be.ExclamationMark;
  function ld(e) {
    for (var t = 0, r; (r = e.lookupType(t)) && !(r !== rd && r !== nd); t++);
    if (
      e.lookupValue(t, "alpha(") ||
      e.lookupValue(t, "chroma(") ||
      e.lookupValue(t, "dropshadow(")
    ) {
      if (e.lookupType(t) !== ad) return !1;
    } else if (e.lookupValue(t, "progid") === !1 || e.lookupType(t + 1) !== id)
      return !1;
    return !0;
  }
  Ns.exports = {
    name: "Value",
    structure: { children: [[]] },
    parse: function (e) {
      if (e !== null && td(e, "filter") && ld(this.scanner))
        return (
          this.scanner.skipSC(),
          this.Raw(this.scanner.currentToken, sd, od, !1, !1)
        );
      var t = this.scanner.tokenStart,
        r = this.readSequence(this.scope.Value);
      return {
        type: "Value",
        loc: this.getLocation(t, this.scanner.tokenStart),
        children: r,
      };
    },
    generate: function (e, t) {
      this.each(e, t);
    },
  };
});
var Os = c((Hm, Is) => {
  var ud = v().TYPE.WhiteSpace,
    cd = Object.freeze({ type: "WhiteSpace", loc: null, value: " " });
  Is.exports = {
    name: "WhiteSpace",
    structure: { value: String },
    parse: function () {
      return this.scanner.eat(ud), cd;
    },
    generate: function (e, t) {
      e(t.value);
    },
  };
});
var gt = c((Wm, Ms) => {
  Ms.exports = {
    AnPlusB: Li(),
    Atrule: Ii(),
    AtruleExpression: Di(),
    AttributeSelector: Yi(),
    Block: Ki(),
    Brackets: Zi(),
    CDC: Ji(),
    CDO: to(),
    ClassSelector: ao(),
    Combinator: so(),
    Comment: co(),
    Declaration: mo(),
    DeclarationList: yo(),
    Dimension: So(),
    Function: wo(),
    HexColor: Ao(),
    Identifier: Ro(),
    IdSelector: _o(),
    MediaFeature: Mo(),
    MediaQuery: zo(),
    MediaQueryList: Do(),
    Nth: Bo(),
    Number: Yo(),
    Operator: Wo(),
    Parentheses: Ko(),
    Percentage: Zo(),
    PseudoClassSelector: Jo(),
    PseudoElementSelector: rs(),
    Ratio: is(),
    Raw: ss(),
    Rule: cs(),
    Selector: ps(),
    SelectorList: ms(),
    String: bs(),
    StyleSheet: ks(),
    TypeSelector: ws(),
    UnicodeRange: As(),
    Url: Ps(),
    Value: _s(),
    WhiteSpace: Os(),
  };
});
var Us = c((jm, qs) => {
  var zs = Ei();
  qs.exports = {
    generic: !0,
    types: zs.types,
    properties: zs.properties,
    node: gt(),
  };
});
var zr = c((Vm, Ds) => {
  var qr = v().cmpChar,
    R = v().TYPE,
    Fs = R.Identifier,
    hd = R.String,
    pd = R.Number,
    fd = R.Function,
    dd = R.Url,
    gd = R.NumberSign,
    md = R.LeftParenthesis,
    vd = R.LeftSquareBracket,
    Bs = R.PlusSign,
    bd = R.HyphenMinus,
    yd = R.Comma,
    kd = R.Solidus,
    Sd = R.Asterisk,
    xd = R.PercentSign,
    wd = R.Backslash,
    Ed = 117;
  Ds.exports = function (t) {
    switch (this.scanner.tokenType) {
      case gd:
        return this.HexColor();
      case yd:
        return (t.space = null), (t.ignoreWSAfter = !0), this.Operator();
      case kd:
      case Sd:
      case Bs:
      case bd:
        return this.Operator();
      case md:
        return this.Parentheses(this.readSequence, t.recognizer);
      case vd:
        return this.Brackets(this.readSequence, t.recognizer);
      case hd:
        return this.String();
      case pd:
        switch (this.scanner.lookupType(1)) {
          case xd:
            return this.Percentage();
          case Fs:
            return qr(this.scanner.source, this.scanner.tokenEnd, wd)
              ? this.Number()
              : this.Dimension();
          default:
            return this.Number();
        }
      case fd:
        return this.Function(this.readSequence, t.recognizer);
      case dd:
        return this.Url();
      case Fs:
        return qr(this.scanner.source, this.scanner.tokenStart, Ed) &&
          qr(this.scanner.source, this.scanner.tokenStart + 1, Bs)
          ? this.UnicodeRange()
          : this.Identifier();
    }
  };
});
var Ys = c((Km, Gs) => {
  Gs.exports = { getNode: zr() };
});
var js = c((Qm, Hs) => {
  var q = v().TYPE,
    Cd = q.Identifier,
    Td = q.Number,
    Ad = q.NumberSign,
    Ld = q.LeftSquareBracket,
    Rd = q.PlusSign,
    Pd = q.Solidus,
    Nd = q.Asterisk,
    _d = q.FullStop,
    Ws = q.Colon,
    Id = q.GreaterThanSign,
    Od = q.VerticalLine,
    Md = q.Tilde;
  function qd(e) {
    switch (this.scanner.tokenType) {
      case Rd:
      case Id:
      case Md:
        return (e.space = null), (e.ignoreWSAfter = !0), this.Combinator();
      case Pd:
        return this.Combinator();
      case _d:
        return this.ClassSelector();
      case Ld:
        return this.AttributeSelector();
      case Ad:
        return this.IdSelector();
      case Ws:
        return this.scanner.lookupType(1) === Ws
          ? this.PseudoElementSelector()
          : this.PseudoClassSelector();
      case Cd:
      case Nd:
      case Od:
        return this.TypeSelector();
      case Td:
        return this.Percentage();
    }
  }
  Hs.exports = { getNode: qd };
});
var Ur = c((Xm, Vs) => {
  var zd = S();
  Vs.exports = function () {
    this.scanner.skipSC();
    var e = this.IdSelector();
    return this.scanner.skipSC(), new zd().appendData(e);
  };
});
var Qs = c((Zm, Ks) => {
  var Ud = S();
  Ks.exports = function () {
    return new Ud().appendData(
      this.Raw(this.scanner.currentToken, 0, 0, !1, !1)
    );
  };
});
var $s = c(($m, Xs) => {
  var Dd = S(),
    Me = v().TYPE,
    Fd = Me.Identifier,
    Bd = Me.Comma,
    Gd = Me.Semicolon,
    Zs = Me.HyphenMinus,
    Yd = Me.ExclamationMark;
  Xs.exports = function () {
    var e = new Dd();
    this.scanner.skipSC();
    var t = this.scanner.tokenStart;
    return (
      this.scanner.eat(Zs),
      this.scanner.source.charCodeAt(this.scanner.tokenStart) !== Zs &&
        this.scanner.error("HyphenMinus is expected"),
      this.scanner.eat(Fd),
      e.appendData({
        type: "Identifier",
        loc: this.getLocation(t, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(t),
      }),
      this.scanner.skipSC(),
      this.scanner.tokenType === Bd &&
        (e.appendData(this.Operator()),
        e.appendData(
          this.parseCustomProperty
            ? this.Value(null)
            : this.Raw(this.scanner.currentToken, Yd, Gd, !1, !1)
        )),
      e
    );
  };
});
var el = c((Jm, Js) => {
  Js.exports = {
    getNode: zr(),
    "-moz-element": Ur(),
    element: Ur(),
    expression: Qs(),
    var: $s(),
  };
});
var rl = c((ev, tl) => {
  tl.exports = { AtruleExpression: Ys(), Selector: js(), Value: el() };
});
var al = c((tv, nl) => {
  nl.exports = {
    parse: {
      expression: null,
      block: function () {
        return this.Block(this.Declaration);
      },
    },
  };
});
var ol = c((rv, il) => {
  var Hd = S(),
    mt = v().TYPE,
    Wd = mt.String,
    jd = mt.Identifier,
    Vd = mt.Url,
    Kd = mt.LeftParenthesis;
  il.exports = {
    parse: {
      expression: function () {
        var e = new Hd();
        switch ((this.scanner.skipSC(), this.scanner.tokenType)) {
          case Wd:
            e.appendData(this.String());
            break;
          case Vd:
            e.appendData(this.Url());
            break;
          default:
            this.scanner.error("String or url() is expected");
        }
        return (
          (this.scanner.lookupNonWSType(0) === jd ||
            this.scanner.lookupNonWSType(0) === Kd) &&
            (e.appendData(this.WhiteSpace()),
            e.appendData(this.MediaQueryList())),
          e
        );
      },
      block: null,
    },
  };
});
var ll = c((nv, sl) => {
  var Qd = S();
  sl.exports = {
    parse: {
      expression: function () {
        return new Qd().appendData(this.MediaQueryList());
      },
      block: function () {
        return this.Block(this.Rule);
      },
    },
  };
});
var cl = c((av, ul) => {
  var Xd = S(),
    Zd = v().TYPE,
    $d = Zd.LeftCurlyBracket;
  ul.exports = {
    parse: {
      expression: function () {
        return this.scanner.lookupNonWSType(0) === $d
          ? null
          : new Xd().appendData(this.SelectorList());
      },
      block: function () {
        return this.Block(this.Declaration);
      },
    },
  };
});
var fl = c((iv, hl) => {
  var Dr = S(),
    re = v().TYPE,
    Jd = re.WhiteSpace,
    eg = re.Comment,
    Fr = re.Identifier,
    tg = re.Function,
    rg = re.LeftParenthesis,
    ng = re.HyphenMinus,
    ag = re.Colon;
  function ig() {
    return new Dr().appendData(
      this.Raw(this.scanner.currentToken, 0, 0, !1, !1)
    );
  }
  function og() {
    var e = 0;
    return (
      this.scanner.skipSC(),
      this.scanner.tokenType === Fr
        ? (e = 1)
        : this.scanner.tokenType === ng &&
          this.scanner.lookupType(1) === Fr &&
          (e = 2),
      e !== 0 && this.scanner.lookupNonWSType(e) === ag
        ? new Dr().appendData(this.Declaration())
        : pl.call(this)
    );
  }
  function pl() {
    var e = new Dr(),
      t = null,
      r;
    this.scanner.skipSC();
    e: for (; !this.scanner.eof; ) {
      switch (this.scanner.tokenType) {
        case Jd:
          t = this.WhiteSpace();
          continue;
        case eg:
          this.scanner.next();
          continue;
        case tg:
          r = this.Function(ig, this.scope.AtruleExpression);
          break;
        case Fr:
          r = this.Identifier();
          break;
        case rg:
          r = this.Parentheses(og, this.scope.AtruleExpression);
          break;
        default:
          break e;
      }
      t !== null && (e.appendData(t), (t = null)), e.appendData(r);
    }
    return e;
  }
  hl.exports = {
    parse: {
      expression: function () {
        var e = pl.call(this);
        return e.isEmpty() && this.scanner.error("Condition is expected"), e;
      },
      block: function () {
        return this.Block(this.Rule);
      },
    },
  };
});
var gl = c((ov, dl) => {
  dl.exports = {
    "font-face": al(),
    import: ol(),
    media: ll(),
    page: cl(),
    supports: fl(),
  };
});
var vl = c((sv, ml) => {
  var sg = S();
  ml.exports = {
    parse: function () {
      return new sg().appendData(this.Identifier());
    },
  };
});
var yl = c((lv, bl) => {
  var lg = S();
  bl.exports = {
    parse: function () {
      return new lg().appendData(this.SelectorList());
    },
  };
});
var Sl = c((uv, kl) => {
  var ug = S();
  kl.exports = {
    parse: function () {
      return new ug().appendData(this.Identifier());
    },
  };
});
var Br = c((cv, xl) => {
  var cg = S();
  xl.exports = {
    parse: function () {
      return new cg().appendData(this.SelectorList());
    },
  };
});
var El = c((hv, wl) => {
  wl.exports = Br();
});
var Tl = c((pv, Cl) => {
  Cl.exports = Br();
});
var Gr = c((fv, Al) => {
  var hg = S(),
    pg = !0;
  Al.exports = {
    parse: function () {
      return new hg().appendData(this.Nth(pg));
    },
  };
});
var Rl = c((dv, Ll) => {
  Ll.exports = Gr();
});
var Nl = c((gv, Pl) => {
  Pl.exports = Gr();
});
var Yr = c((mv, _l) => {
  var fg = S(),
    dg = !1;
  _l.exports = {
    parse: function () {
      return new fg().appendData(this.Nth(dg));
    },
  };
});
var Ol = c((vv, Il) => {
  Il.exports = Yr();
});
var ql = c((bv, Ml) => {
  Ml.exports = Yr();
});
var Ul = c((yv, zl) => {
  var gg = S();
  zl.exports = {
    parse: function () {
      return new gg().appendData(this.Selector());
    },
  };
});
var Fl = c((kv, Dl) => {
  Dl.exports = {
    dir: vl(),
    has: yl(),
    lang: Sl(),
    matches: El(),
    not: Tl(),
    "nth-child": Rl(),
    "nth-last-child": Nl(),
    "nth-last-of-type": Ol(),
    "nth-of-type": ql(),
    slotted: Ul(),
  };
});
var Gl = c((Sv, Bl) => {
  Bl.exports = {
    parseContext: {
      default: "StyleSheet",
      stylesheet: "StyleSheet",
      atrule: "Atrule",
      atruleExpression: function (e) {
        return this.AtruleExpression(e.atrule ? String(e.atrule) : null);
      },
      mediaQueryList: "MediaQueryList",
      mediaQuery: "MediaQuery",
      rule: "Rule",
      selectorList: "SelectorList",
      selector: "Selector",
      block: function () {
        return this.Block(this.Declaration);
      },
      declarationList: "DeclarationList",
      declaration: "Declaration",
      value: function (e) {
        return this.Value(e.property ? String(e.property) : null);
      },
    },
    scope: rl(),
    atrule: gl(),
    pseudo: Fl(),
    node: gt(),
  };
});
var Hl = c((xv, Yl) => {
  Yl.exports = { node: gt() };
});
var jl = c((wv, Wl) => {
  function mg() {
    for (var e = {}, t = 0; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) e[n] = r[n];
    }
    return e;
  }
  Wl.exports = xi().create(mg(Us(), Gl(), Hl()));
});
var Hr = c((Ev, Vl) => {
  "use strict";
  Vl.exports = jl();
});
var Kl = Wr(Hr()),
  vg = Wr(Hr()),
  { create: Tv } = vg,
  Av = Kl.default;

export { Tv as create, Av as default };