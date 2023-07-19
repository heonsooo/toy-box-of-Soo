# TS

JS 기반 해커뉴스 프로젝트를 TS로 포팅하는 프로젝트.
- JS와 TS의 차이점과 코드 상에서 유용한 기능을 얻을 수 있을지. 
- TS로는 조금의 설정, 셋업이 필요하다. 각각의 설정들에 대해서 이 설정들이 무엇인지 살펴보기
- TS로 프로젝트를 진행하기 위해서는 tsconfig.json 파일 설정 필요 (여기서는 가장 기본적인 옵션만 설정)
- TS의 가장 핵심정인 기능은 JS의 타입 확장 구문을 제공하는 것.

``` json
{
  "compilerOptions": {
    "strict": true,    // 타입스크립트의 기능을 얼마나 엄격하게 적용해서 변환할 것인지 (false이면 js파일 그대로도 사용이 가능하다. = 소프트랜딩할 수 있게 도와줌)
    "target": "ES5",    // 타입스크립트를 컴파일하면 JS파일이 나오는데 해당 JS파일에 사용 될 문법 체계를 지정 
    "module": "CommonJS",
    "alwaysStrict": true,
    "noImplicitAny": true,   // strict 모드의 하위 옵션으로 모든 타입(Any)이 가능 한지(JS의 느슨한 타입을 받아들이기 위해)설정하는 옵션 -> Any 타입 허락안해서 모든 타입 명시해야함.
    "noImplicitThis": true,  // 
    "sourceMap": true,       // 개발환경과 실해환경을 일치시킬 수 있는 설정 
    "downlevelIteration": true
  }
}
```
- html파일 1개와 순수 js파일 1개로 해커뉴스 웹을 만들었는데, 이는 parcel.js라는 번들러가 다른 환경설정 없이 모던 웹 개발이 가능하도록 만들어주는 기능으로 가능했다.
- 커멘드창에 parcel index.html 를 입력해서 타입스크립트 컴파일
- parcel이 type script를 불러서 컴파일한다.


## 변수에 대한 타입지정
- 자바스크립트의 암묵적인 타입 지정 -> 타입스크립트의 명시적인 타입 지원 기능을 통한 타입 지정
- 할당된 변수 오른쪽에 마우스를 올리면 타입을 보여준다. 
- 변수 : 타입 = 할당 식 으로 작성.
- 타입 알리아스 ( type 알리아스명(일반적으로 파스칼표기법 사용))


# 타입스크립트의 타입 지정하는 두 가지 방법
1. 타입 알리아스
2. 인터페이스 
두 가지 방법은 문법적으로 아주 조금 차이가 있다.
제공 되는 기능은 거의 유사하며, 작은 몇 가지 차이가 있다.

-> 선언부 지정
-> 타입 결합/조합 방법

## 타입 알리아스를 사용한 타입 지정
1. type 변수명 = { ... } 으로 지정
```typescript
type milk = {
  a : number
}
```

2. 타입 결합/조합 방법 : & 사용
```typescript
type milk = {
  a : number
}
type coffee =  milk & {
  // milk를 확장해서 새로운 타입 
  b : number
}
```

## 인터페이스를 사용한 타입 지정
- 수학 연산보다는, 글로써 표현하는 듯한 기법으로 인해, 확장되는 형식의 타입들은 인터페이스를 선호한다.
1. interface 변수명 {} 으로 지정
```typescript
interface milk {
  a : number
}
```
2. 타입 결합/조합 방법 : extends 사용
```typescript
interface milk {
  a : number
}
interface coffee extends milk {
  // milk를 확장해서 새로운 타입 
  b : number
}
```

3. 지시어를 통해 타입에 대한 설명을 덧붙일 수 있다.
- 단단하고 안전한 코드 작성 가능해짐.
```typescript
interface student {
  readonly id : string
}
// student 객체의 id는 readonly 지시어를 통해 수정 불가능하도록 지정 가능.
```

## [TS특징]
- 타입스크립트는 트랜스 파일러이기 때문에 브라우저에서 실행시키기 위해서는 자바스크립트로 변환 시켜야 한다. 
- 자바스크립트로 변환하는 과정에서 여러 옵션을 설정할 수 있다.
- 타입스크립트에서 자바스크립트로 변환하는 과정은 컴파일이라고 부르고 tsconfig.json파일에서 설정하여 사용한다.
- tsconfig.json은 옵션이 굉장히 많다.
  - 참고 : https://www.typescriptlang.org/ko/docs/handbook/tsconfig-json.html 
- 타입에 대한 설명을 풍성하게 많이 해 놓을 수록 코딩을 하며 실수할 수 있는 부분을 미연에 방지하여 단단하고 안전한 코드를 작성할 수 있다.
- 처음 타입을 작성할 때 많은 시간을 투자하면, 이후 실제 코드 작성에 있어서는 고민을 줄여 시간을 단축시킬 수 있다.
  -> 수정해도 되는지/안되는지 고민하는 시간을 절약할 수 있기 때문에!


[Memo]
- 개발에 있어 코드를 읽기 쉽게 작성하기 위해서 **일관성**을 유지하는 것이 중요한 가치 중 하나이다.
- 


[Do]
- parcel.js 란 ?