type Store = {
  currentPage: number;
  feeds: NewsFeed[]; // NewsFeed 유형의 배열
};

// 타입 알리아스로 아래  NewsFeed, NewsDetail, NewsComment의 공통 요소(중복 된 값) 합치기
type News = {
  id: string;
  time_ago: string;
  title: string;
  url: string;
  user: string;
  content: string;
};

// 공통요소를 위로 빼고 News &을 붙여서 News 객체도 붙임
type NewsFeed = News & {
  comments_count: number;
  points: number;
  read?: boolean; // option
};

type NewsDetail = News & {
  comments: NewsComment[];
};

type NewsComment = News & {
  comments: NewsComment[];
  level: number;
};

const container: HTMLElement | null = document.getElementById("root");
const ajax: XMLHttpRequest = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store: Store = {
  currentPage: 1,
  feeds: [],
};

function getData<AjaxResponse>(url: string): AjaxResponse {
  ajax.open("GET", url, false);
  ajax.send();

  // 여러 타입의(종류, 여기서는 두 가지 : NewsFeed[] | NewsDetail) return 값을 가진 경우 제네릭으로 처리

  return JSON.parse(ajax.response);
}

function makeFeeds(feeds: NewsFeed[]): NewsFeed[] {
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }

  return feeds;
}

function updateview(html: string): void {
  container
    ? (container.innerHTML = html)
    : console.error("최상위 컨테이너가 없어  UI를 진행하지 못합니다.");
}

function newsFeed(): void {
  let newsFeed: NewsFeed[] = store.feeds;
  const newsList = [];
  let template = `
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

  if (newsFeed.length === 0) {
    newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL)); // 대입문 연속해서 사용 가능
  }

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
  <div class="p-6 ${
    newsFeed[i].read ? "bg-blue-300" : "bg-white"
  } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100" >
    <div class="flex">
      <div class="flex-auto">
        <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>
      </div>
      <div class="text-center text-sm">
        <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${
          newsFeed[i].comments_count
        }</div>
      </div>
    </div>
    <div class="flex mt-3">
      <div class="grid grid-cols-3 text-sm text-gray-500">
        <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
        <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
        <div><i class="fas fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
      </div>
    </div>
  </div>
    `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    String(store.currentPage > 1 ? store.currentPage - 1 : 1)
  );
  template = template.replace(
    "{{__next_page__}}",
    String(store.currentPage + 1)
  );
  updateview(template);
}

function newsDetail() {
  const id = location.hash.substring(7);
  const newsContent = getData<NewsDetail>(CONTENT_URL.replace("@id", id));
  let template = `
<div class="bg-gray-600 min-h-screen pb-8" style="width:600px; margin:auto;">
  <div class="bg-white text-xl">
    <div class="mx-auto px-4">
      <div class="flex justify-between items-center py-6">
        <div class="flex justify-start">
          <h1 class="font-extrabold">Hacker News</h1>
        </div>
        <div class="items-center jusify-end">
          <a href="#/page/${store.currentPage}" class="text-gray-500">
            <i class="fa fa-times"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="h-full border rounded-xl bg-white m-6 p-4">
    <h2>${newsContent.title}</h2>
    <div class="text-gray-400 h-20">${newsContent.content}</div>
    {{__comments__}}
  </div>
</div>;`;

  for (let i = 0; i < store.feeds.length; i++) {
    if (Number(store.feeds[i].id) === Number(id)) {
      store.feeds[i].read = true;
      break;
    }
  }

  updateview(
    template.replace("{{__comments__}}", makeComment(newsContent.comments))
  );
  // if (container) {
  //   container.innerHTML = template.replace(
  //     "{{__comments__}}",
  //     makeComment(newsContent.comments)
  //   );
  // } else {
  //   console.error("최상위 컨테이너가 없어 UI를 진행하지 못합니다.");
  // }
}

function makeComment(comments: NewsComment[]): string {
  let commentString = [];

  for (let i = 0; i < comments.length; i++) {
    const comment: NewsComment = comments[i];

    commentString.push(`<div style="padding-left : ${
      40 * comment.level
    }px" class="mt-4">
  <div class="text-gray-400" style="width:600px;>
    <i class="fa fa-sort-up mr-2"></i>
    <strong>${comment.user}</strong>${comment.time_ago}
  </div>
  <p class="text-gray-700">${comment.content}</p>
</div>`);
    if (comment.comments.length > 0) {
      commentString.push(makeComment(comment.comments));
    }
  }
  return commentString.join("");
}
function router(): void {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);
router();
