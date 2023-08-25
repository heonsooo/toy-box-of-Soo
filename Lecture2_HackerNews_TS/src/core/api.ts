import { NewsFeed, NewsDetail } from "../types";

export class Api {
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

export class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}
