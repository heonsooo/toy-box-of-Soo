// 타입 알리아스 -> 인터페이스
// type Store = {
//   currentPage: number;
//   feeds: NewsFeed[]; // NewsFeed 유형의 배열
// };
interface Store {
  feeds: NewsFeed[]; // NewsFeed 유형의 배열
  currentPage: number;
}

// 타입 알리아스로 아래  NewsFeed, NewsDetail, NewsComment의 공통 요소(중복 된 값) 합치기
interface News {
  readonly id: string;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}

// 공통요소를 위로 빼고 News &을 붙여서 News 객체도 붙임
interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  read?: boolean; // option
}

interface NewsDetail extends News {
  readonly comments: NewsComment[];
}

interface NewsComment extends News {
  readonly level: number;
  readonly comments: NewsComment[];
}

interface RouteInfo {
  path: string;
  page: View;
}

// const container: HTMLElement | null = document.getElementById("root");
// const ajax: XMLHttpRequest = new XMLHttpRequest();
// const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store: Store = {
  currentPage: 1,
  feeds: [],
};

// 상속 : NEWS와 같은 공통요소는 하나로 빼고, 공통요소를 확장해서 개별 요소(NewsFeed,NewsDetail,NewsComment)를 생성.
// 상속을 다루는 메커니즘은 크게 2가지 -> 클래스, 믹스인 사용

// 다양한 함수의 역할 중 공통으로 뺄 수 있는 부분을 상속으로 개발하는 메커니즘 실습

// getData함수 : 네트워크를 통해서 API 호출
// makeFeeds, updateview 함수 : view와 관련 된 업데이트를 처리하는 코드.
// NewsFeed, NewsDetail 함수 : 페이지, 메인 뷰를 처리하는 로직.
// makeComment 함수 : 내용 뷰 에서 코멘트를 처리하는 로직
// router 함수 : 라우터 처리 함수

// 그 중 클래스 사용한 상속

// getData 함수를 공통 요소로 클래스(이름 : API)로 생성
// 클래스는 최초의 초기화 되는 과정이 필요하며, 생성자 함수 constructor()를 사용하여 초기화한다.
// 클래스에서 필요한 요소들 생성자에 정의
// class Api {
//   url: string;
//   ajax: XMLHttpRequest;

//   constructor(url: string) {
//     this.url = url;
//     this.ajax = new XMLHttpRequest();
//   }

//   // protected 지시어를 사용해서 외부에서 해당 함수 사용하지 못하도록 방어
//   protected getRequest<AjaxResponse>(): AjaxResponse {
//     this.ajax.open("GET", this.url, false);
//     this.ajax.send();
//     return JSON.parse(this.ajax.response);
//   }
// }

// Api 클래스를 확장하는 NewsFeedApi 클래스 : Api가 가지고 있는 속성, 특성 모두 가짐.
// class NewsFeedApi extends Api {
//   getData(): NewsFeed[] {
//     return this.getRequest<NewsFeed[]>();
//   }
// }

// class NewsDetailApi extends Api {
//   getData(): NewsDetail {
//     return this.getRequest<NewsDetail>();
//   }
// }

// function getData<AjaxResponse>(url: string): AjaxResponse {
//   ajax.open("GET", url, false);
//   ajax.send();

//   // 여러 타입의(종류, 여기서는 두 가지 : NewsFeed[] | NewsDetail) return 값을 가진 경우 제네릭으로 처리

//   return JSON.parse(ajax.response);
// }

// ============================ 믹스인
// targetClass로 제공된 클래스에 baseClasses라는 n개의 클래스 기능들을 합성(다중 상속)시킨다.
// function applyApiMixins(targetClass: any, baseClasses: any[]): void {
//   baseClasses.forEach((baseCalss) => {
//     Object.getOwnPropertyNames(baseCalss.prototype).forEach((name) => {
//       const descriptor = Object.getOwnPropertyDescriptor(
//         baseCalss.prototype,
//         name
//       );
//       if (descriptor) {
//         Object.defineProperty(targetClass.prototype, name, descriptor);
//       }
//     });
//   });
// }

class Api {
  ajax: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.ajax = new XMLHttpRequest();
    this.url = url;
  }
  // protected 지시어를 사용해서 외부에서 해당 함수 사용하지 못하도록 방어
  getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open("GET", this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response);
  }
}
// interface NewsFeedApi extends Api {}
// interface NewsDetailApi extends Api {}

class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}

// applyApiMixins(NewsFeedApi, [Api]);
// applyApiMixins(NewsDetailApi, [Api]);

abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);
    if (!containerElement) {
      throw "최상위 컨테이너가 없어 UI를 진행하지 못합니다.";
    }
    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected updateview(): void {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  }
  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapShot = this.htmlList.join("");
    this.clearHtmlList();
    return snapShot;
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  abstract render(): void; // 추상 메소드 : 자식들에게 꼭 구현하라고 마킹해놓은 것
}

class Router {
  routeTable: RouteInfo[];
  defaultRoute: RouteInfo | null;

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
  }
  addRoutePath(path: string, page: View): void {
    this.routeTable.push({ path, page });
  }
  setDefaultPage(page: View): void {
    this.defaultRoute = { path: "", page };
  }
  route() {
    const routePath = location.hash;

    if (routePath === "" && this.defaultRoute) {
      this.defaultRoute.page.render();
    }

    for (const routeInfo of this.routeTable) {
      if (routePath.indexOf(routeInfo.path) >= 0) {
        routeInfo.page.render();
        break;
      }
    }
  }
}

class NewsFeedView extends View {
  private api: NewsFeedApi;
  private feeds: NewsFeed[];

  constructor(containerId: string) {
    let template: string = `
  <div class="bg-gray-600 min-h-screen" style="width:600px; margin:auto;">
    <div class="bg-white text-xl">
      <div class="mx-auto px-4">
        <div class="flex justify-between items-center py-6">
          <div class="flex justify-start">
            <h1 class="font-extrabold">Hacker News</h1>
          </div>
          <div class="items-center jusify-end">
            <a href="#/page/{{__prev_page__}}" class="text-gray-500">
              Previous
            </a>
            <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 text-2xl text-gray-700" >{{__news_feed__}}</div>
  </div>;
  `;

    super(containerId, template);

    this.api = new NewsFeedApi(NEWS_URL);
    this.feeds = store.feeds;

    if (this.feeds.length === 0) {
      // 클래스 인스턴스를 사용할 때 깔끔한 코드로 변환
      this.feeds = store.feeds = this.api.getData();
      this.makeFeeds();
    }
  }
  render(): void {
    store.currentPage = Number(location.hash.slice(7, 8) || 1);

    for (
      let i = (store.currentPage - 1) * 10;
      i < store.currentPage * 10;
      i++
    ) {
      const { id, title, comments_count, user, points, time_ago, read } =
        this.feeds[i];
      this.addHtml(`
  <div class="p-6 ${
    read ? "bg-red-500" : "bg-white"
  } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100" >
    <div class="flex">
      <div class="flex-auto">
        <a href="#/show/${id}">${title}</a>
      </div>
      <div class="text-center text-sm">
        <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
      </div>
    </div>
    <div class="flex mt-3">
      <div class="grid grid-cols-3 text-sm text-gray-500">
        <div><i class="fas fa-user mr-1"></i>${user}</div>
        <div><i class="fas fa-heart mr-1"></i>${points}</div>
        <div><i class="fas fa-clock mr-1"></i>${time_ago}</div>
      </div>
    </div>
  </div>
    `);
    }

    // template = template.replace("{{__news_feed__}}", this.getHtml ());
    this.setTemplateData("news_feed", this.getHtml());
    // template = template.replace(
    //   "{{__prev_page__}}",
    //   String(store.currentPage > 1 ? store.currentPage - 1 : 1)
    // );
    this.setTemplateData(
      "prev_page",
      String(store.currentPage > 1 ? store.currentPage - 1 : 1)
    );
    // template = template.replace(
    //   "{{__next_page__}}",
    //   String(store.currentPage + 1)
    // );
    this.setTemplateData("next_page", String(store.currentPage + 1));
    this.updateview();
  }

  private makeFeeds(): void {
    for (let i = 0; i < this.feeds.length; i++) {
      this.feeds[i].read = false;
    }
  }
}

class NewsDetailView extends View {
  constructor(containerId: string) {
    let template = `
<div class="bg-gray-600 min-h-screen pb-8" style="width:600px; margin:auto;">
  <div class="bg-white text-xl">
    <div class="mx-auto px-4">
      <div class="flex justify-between items-center py-6">
        <div class="flex justify-start">
          <h1 class="font-extrabold">Hacker News</h1>
        </div>
        <div class="items-center jusify-end">
          <a href="#/page/{{__currentPage__}}" class="text-gray-500">
            <i class="fa fa-times"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="h-full border rounded-xl bg-white m-6 p-4">
    <h2>{{__title__}}</h2>
    <div class="text-gray-400 h-20">{{__content__}}</div>
    {{__comments__}}
  </div>
</div>;`;

    super(containerId, template);
  }
  render() {
    const id = location.hash.substr(7);
    const api = new NewsDetailApi(CONTENT_URL.replace("@id", id));
    const newsDetail: NewsDetail = api.getData();

    for (let i = 0; i < store.feeds.length; i++) {
      if (store.feeds[i].id === id) {
        store.feeds[i].read = true;
        break;
      }
    }
    this.setTemplateData("comments", this.makeComment(newsDetail.comments));
    this.setTemplateData("currentPage", String(store.currentPage));
    this.setTemplateData("title", newsDetail.title);
    this.setTemplateData("content", newsDetail.content);

    this.updateview();

    // template.replace(
    //   "{{__comments__}}",
    //   this.makeComment(newsDetail.comments)
    // )
  }

  makeComment(comments: NewsComment[]): string {
    for (let i = 0; i < comments.length; i++) {
      const comment: NewsComment = comments[i];

      this.addHtml(`<div style="padding-left : ${
        comment.level * 40
      }px" class="mt-4">
  <div class="text-gray-400" style="width:600px;>
    <i class="fa fa-sort-up mr-2"></i>
    <strong>${comment.user}</strong>${comment.time_ago}
  </div>
  <p class="text-gray-700">${comment.content}</p>
</div>`);

      if (comment.comments.length > 0) {
        this.addHtml(this.makeComment(comment.comments));
      }
    }
    return this.getHtml();
  }
}

// router();

// function newsFeed(): void {
//   let api = new NewsFeedApi();
//   let newsFeed: NewsFeed[] = store.feeds;
//   const newsList: string[] = [];
//   let template: string = `
//   <div class="bg-gray-600 min-h-screen" style="width:600px; margin:auto;">
//     <div class="bg-white text-xl">
//       <div class="mx-auto px-4">
//         <div class="flex justify-between items-center py-6">
//           <div class="flex justify-start">
//             <h1 class="font-extrabold">Hacker News</h1>
//           </div>
//           <div class="items-center jusify-end">
//             <a href="#/page/{{__prev_page__}}" class="text-gray-500">
//               Previous
//             </a>
//             <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
//               Next
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div class="p-4 text-2xl text-gray-700" >{{__news_feed__}}</div>
//   </div>;
//   `;

//   if (newsFeed.length === 0) {
//     // newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL)); // 대입문 연속해서 사용 가능
//     newsFeed = store.feeds = makeFeeds(api.getData()); // 클래스 인스턴스를 사용할 때 깔끔한 코드로 변환
//   }

//   for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
//     newsList.push(`
//   <div class="p-6 ${
//     newsFeed[i].read ? "bg-blue-300" : "bg-white"
//   } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100" >
//     <div class="flex">
//       <div class="flex-auto">
//         <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>
//       </div>
//       <div class="text-center text-sm">
//         <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${
//           newsFeed[i].comments_count
//         }</div>
//       </div>
//     </div>
//     <div class="flex mt-3">
//       <div class="grid grid-cols-3 text-sm text-gray-500">
//         <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
//         <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
//         <div><i class="fas fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
//       </div>
//     </div>
//   </div>
//     `);
//   }

//   template = template.replace("{{__news_feed__}}", newsList.join(""));
//   template = template.replace(
//     "{{__prev_page__}}",
//     String(store.currentPage > 1 ? store.currentPage - 1 : 1)
//   );
//   template = template.replace(
//     "{{__next_page__}}",
//     String(store.currentPage + 1)
//   );
//   updateview(template);
// }

const router: Router = new Router();
const newsFeedView = new NewsFeedView("root");
const newsDetailView = new NewsDetailView("root");

router.setDefaultPage(newsFeedView);
router.addRoutePath("/page/", newsFeedView);
router.addRoutePath("/show/", newsDetailView);

router.route();
