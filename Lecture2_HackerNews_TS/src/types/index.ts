import View from "../core/view";
// 타입 알리아스 -> 인터페이스
// type Store = {
//   currentPage: number;
//   feeds: NewsFeed[]; // NewsFeed 유형의 배열
// };
export interface NewsStore {
  getAllFeeds: () => NewsFeed[];
  getFeed: (position: number) => NewsFeed;
  setFeeds: (feeds: NewsFeed[]) => void;
  makeRead: (id: number) => void;
  hasFeeds: boolean;
  currentPage: number;
  numberOfFeed: number;
  nextPage: number;
  prevPage: number;
}

// 타입 알리아스로 아래  NewsFeed, NewsDetail, NewsComment의 공통 요소(중복 된 값) 합치기
export interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}

// 공통요소를 위로 빼고 News &을 붙여서 News 객체도 붙임
export interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  read?: boolean; // option
}

export interface NewsDetail extends News {
  readonly comments: NewsComment[];
}

export interface NewsComment extends News {
  readonly level: number;
  readonly comments: NewsComment[];
}

export interface RouteInfo {
  path: string;
  page: View;
  params: RegExp | null;
}
