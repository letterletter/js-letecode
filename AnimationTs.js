var State;
(function (State) {
    State[State["STATE_INITIAL"] = 0] = "STATE_INITIAL";
    State[State["STATE_INT_SIGN"] = 1] = "STATE_INT_SIGN";
    State[State["STATE_INTEGER"] = 2] = "STATE_INTEGER";
    State[State["STATE_POINT"] = 3] = "STATE_POINT";
    State[State["STATE_POINT_WITHOUT_INT"] = 4] = "STATE_POINT_WITHOUT_INT";
    State[State["STATE_FRACTION"] = 5] = "STATE_FRACTION";
    State[State["STATE_EXP"] = 6] = "STATE_EXP";
    State[State["STATE_EXP_SIGN"] = 7] = "STATE_EXP_SIGN";
    State[State["STATE_EXP_NUMBER"] = 8] = "STATE_EXP_NUMBER";
    State[State["STATE_END"] = 9] = "STATE_END";
})(State || (State = {}));
var CHAR_TYPE;
(function (CHAR_TYPE) {
    CHAR_TYPE[CHAR_TYPE["CHAR_NUMBER"] = 0] = "CHAR_NUMBER";
    CHAR_TYPE[CHAR_TYPE["CHAR_EXP"] = 1] = "CHAR_EXP";
    CHAR_TYPE[CHAR_TYPE["CHAR_POINT"] = 2] = "CHAR_POINT";
    CHAR_TYPE[CHAR_TYPE["CHAR_SIGN"] = 3] = "CHAR_SIGN";
    CHAR_TYPE[CHAR_TYPE["CHAR_SPACE"] = 4] = "CHAR_SPACE";
    CHAR_TYPE[CHAR_TYPE["CHAR_ILLEGAL"] = 5] = "CHAR_ILLEGAL";
})(CHAR_TYPE || (CHAR_TYPE = {}));
var AnimationTs = /** @class */ (function () {
    function AnimationTs(str) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.state = State.STATE_INITIAL;
        this.strinput = str;
        var S = State;
        var C = CHAR_TYPE;
        this.transfer = (_a = {},
            _a[S.STATE_INITIAL] = (_b = {},
                _b[C.CHAR_NUMBER] = S.STATE_INTEGER,
                _b[C.CHAR_POINT] = S.STATE_POINT_WITHOUT_INT,
                _b[C.CHAR_SPACE] = S.STATE_INITIAL,
                _b[C.CHAR_SIGN] = S.STATE_INT_SIGN,
                _b),
            _a[S.STATE_INT_SIGN] = (_c = {},
                _c[C.CHAR_NUMBER] = S.STATE_INTEGER,
                _c[C.CHAR_POINT] = S.STATE_POINT_WITHOUT_INT,
                _c),
            _a[S.STATE_INTEGER] = (_d = {},
                _d[C.CHAR_NUMBER] = S.STATE_INTEGER,
                _d[C.CHAR_EXP] = S.STATE_EXP,
                _d[C.CHAR_POINT] = S.STATE_POINT,
                _d[C.CHAR_SPACE] = S.STATE_END,
                _d),
            _a[S.STATE_POINT] = (_e = {},
                _e[C.CHAR_NUMBER] = S.STATE_FRACTION,
                _e[C.CHAR_EXP] = S.STATE_EXP,
                _e[C.CHAR_SPACE] = S.STATE_END,
                _e),
            _a[S.STATE_POINT_WITHOUT_INT] = (_f = {},
                _f[C.CHAR_NUMBER] = S.STATE_FRACTION,
                _f),
            _a[S.STATE_FRACTION] = (_g = {},
                _g[C.CHAR_NUMBER] = S.STATE_FRACTION,
                _g[C.CHAR_EXP] = S.STATE_EXP,
                _g[C.CHAR_SPACE] = S.STATE_END,
                _g),
            _a[S.STATE_EXP] = (_h = {},
                _h[C.CHAR_NUMBER] = S.STATE_EXP_NUMBER,
                _h[C.CHAR_SIGN] = S.STATE_EXP_SIGN,
                _h),
            _a[S.STATE_EXP_SIGN] = (_j = {},
                _j[C.CHAR_NUMBER] = S.STATE_EXP_NUMBER,
                _j),
            _a[S.STATE_EXP_NUMBER] = (_k = {},
                _k[C.CHAR_NUMBER] = S.STATE_EXP_NUMBER,
                _k[C.CHAR_SPACE] = S.STATE_END,
                _k),
            _a[S.STATE_END] = (_l = {},
                _l[C.CHAR_SPACE] = S.STATE_END,
                _l),
            _a);
    }
    AnimationTs.prototype.toCHarType = function (ch) {
        if (ch >= '0' && ch <= '9') {
            return CHAR_TYPE.CHAR_NUMBER;
        }
        else if (ch === 'e' || ch === 'E') {
            return CHAR_TYPE.CHAR_EXP;
        }
        else if (ch === '.') {
            return CHAR_TYPE.CHAR_POINT;
        }
        else if (ch === ' ') {
            console.log('空格');
            return CHAR_TYPE.CHAR_SPACE;
        }
        else if (ch === '+' || ch === '-') {
            return CHAR_TYPE.CHAR_SIGN;
        }
        else {
            return CHAR_TYPE.CHAR_ILLEGAL;
        }
    };
    AnimationTs.prototype.run = function () {
        var len = this.strinput.length;
        for (var i = 0; i < len; i++) {
            var charType = this.toCHarType(this.strinput[i]);
            var nextState = this.transfer[this.state][charType];
            console.log('chartype nextstate', charType, nextState);
            if (nextState) {
                this.state = nextState;
            }
            else {
                return false;
            }
        }
        console.log(this.state);
        return [State.STATE_END, State.STATE_INTEGER, State.STATE_POINT, State.STATE_EXP_NUMBER, State.STATE_FRACTION].indexOf(this.state) > -1;
    };
    return AnimationTs;
}());
function test(str) {
    var a = new AnimationTs(str);
    var b = a.run();
    console.log('res, ', b);
}
// let arr = ["+100", "5e2", "-123", "3.1416", "-1E-16", "0123", ' 0']
// test()
var arr = [' 0'];
arr.forEach(function (item) { return test(item); });
