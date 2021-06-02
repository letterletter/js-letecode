
enum State {
  STATE_INITIAL=1,  //起始的空格
  STATE_INT_SIGN, //符号位
  STATE_INTEGER,  //整数部分
  STATE_POINT,    //左侧有整数的小数点
  STATE_POINT_WITHOUT_INT,  //左侧无整数的小数点
  STATE_FRACTION,   //小数部分
  STATE_EXP,      //字符Ee
  STATE_EXP_SIGN, //指数部分的符号位
  STATE_EXP_NUMBER, //指数部分的整数部分
  STATE_END,      //末尾的空格
}

enum CHAR_TYPE {
  CHAR_NUMBER=1, //数字0-9
  CHAR_EXP,    //E e
  CHAR_POINT,  // .
  CHAR_SIGN,   //+ -
  CHAR_SPACE,  // ' '
  CHAR_ILLEGAL, //非法字符
}
class AnimationTs {
  state: State;
  strinput: string;
  transfer: object;
  constructor(str:string) {
    this.state = State.STATE_INITIAL;
    this.strinput = str;
    const S = State
    const C = CHAR_TYPE
    this.transfer = {
      [S.STATE_INITIAL]: {
        [C.CHAR_NUMBER]: S.STATE_INTEGER,
        [C.CHAR_POINT]: S.STATE_POINT_WITHOUT_INT,
        [C.CHAR_SPACE]: S.STATE_INITIAL,
        [C.CHAR_SIGN]: S.STATE_INT_SIGN
      },
      [S.STATE_INT_SIGN]: {
        [C.CHAR_NUMBER]: S.STATE_INTEGER,
        [C.CHAR_POINT]: S.STATE_POINT_WITHOUT_INT
      },
      [S.STATE_INTEGER]: {
        [C.CHAR_NUMBER]: S.STATE_INTEGER,
        [C.CHAR_EXP]: S.STATE_EXP,
        [C.CHAR_POINT]: S.STATE_POINT,
        [C.CHAR_SPACE]: S.STATE_END
      },
      [S.STATE_POINT]: {
        [C.CHAR_NUMBER]: S.STATE_FRACTION,
        [C.CHAR_EXP]: S.STATE_EXP,
        [C.CHAR_SPACE]: S.STATE_END
      },
      [S.STATE_POINT_WITHOUT_INT]: {
        [C.CHAR_NUMBER]: S.STATE_FRACTION
      },
      [S.STATE_FRACTION]: {
        [C.CHAR_NUMBER]: S.STATE_FRACTION,
        [C.CHAR_EXP]: S.STATE_EXP,
        [C.CHAR_SPACE]: S.STATE_END
      },
      [S.STATE_EXP]: {
        [C.CHAR_NUMBER]: S.STATE_EXP_NUMBER,
        [C.CHAR_SIGN]: S.STATE_EXP_SIGN
      },
      [S.STATE_EXP_SIGN]: {
        [C.CHAR_NUMBER]: S.STATE_EXP_NUMBER
      },
      [S.STATE_EXP_NUMBER]: {
        [C.CHAR_NUMBER]: S.STATE_EXP_NUMBER,
        [C.CHAR_SPACE]: S.STATE_END,
      },
      [S.STATE_END]: {
        [C.CHAR_SPACE]: S.STATE_END
      }
    }
  }
  toCHarType(ch: string):CHAR_TYPE {
    if(ch >= '0' && ch <= '9') {
      return CHAR_TYPE.CHAR_NUMBER
    }else if(ch === 'e' || ch === 'E') {
      return CHAR_TYPE.CHAR_EXP
    }else if(ch === '.') {
      return CHAR_TYPE.CHAR_POINT
    }else if(ch === ' ') {
      console.log('空格')
      return CHAR_TYPE.CHAR_SPACE
    }else if(ch === '+'||ch === '-') {
      return CHAR_TYPE.CHAR_SIGN
    }
    else {
      return CHAR_TYPE.CHAR_ILLEGAL
    }
  }
  run():boolean {
    let len:number = this.strinput.length
    for(let i=0; i<len; i++) {
      let charType = this.toCHarType(this.strinput[i])
      let nextState = this.transfer[this.state][charType]
      console.log('chartype nextstate', charType, nextState)
      if(nextState) {
        this.state = nextState
      }else{
        return false
      }
    }
    console.log(this.state)
    return [State.STATE_END, State.STATE_INTEGER, State.STATE_POINT, State.STATE_EXP_NUMBER,State.STATE_FRACTION].indexOf(this.state)>-1
  }
}

function test(str: string) {
  let a = new AnimationTs(str)
  let b = a.run()
  console.log('res, ',b)
}
// let arr = ["+100", "5e2", "-123", "3.1416", "-1E-16", "0123", ' 0']
// test()
let arr = [' 0']
arr.forEach(item => test(item))