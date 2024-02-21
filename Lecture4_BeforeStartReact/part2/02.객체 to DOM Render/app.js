// vdom 객체 생성 : html 태그를 객체로 변환
const vdom = {
  tag: "p",
  props: {},
  children: [
    { tag: "h1", props: {}, children: ["React만들기"] },
    {
      tag: "h2",
      props: {},
      children: [
        {
          tag: "a",
          props: { href: "https://www.naver.com" },
          children: ["네이버로 이동하기"],
        },
      ],
    },
    {
      tag: "ul",
      props: {},
      children: [
        {
          tag: "li",
          props: {},
          children: ["첫 번째"],
        },
        {
          tag: "li",
          props: {},
          children: ["두 번째"],
        },
        {
          tag: "li",
          props: {},
          children: ["세 번째"],
        },
      ],
    },
  ],
};

// vdom 객체를 받아서 실제 DOM으로 변환하는 함수
function createDom(node) {
  // 실제 tag를 생성하고 생성한 tag를 반환
  const element = document.createElement(node.tag);

  // node의 children이 문자열이면 textNode로 생성, 종료
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  // node의 children이 배열이면 재귀적으로 createDom을 호출하여 자식 노드를 생성
  node.children.map(createDom).forEach(element.appendChild.bind(element));
  return element;
}

// 실제 DOM으로 생성
document.querySelector("#root").appendChild(createDom(vdom));
