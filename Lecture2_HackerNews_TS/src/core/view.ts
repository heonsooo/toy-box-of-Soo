export default abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const conatinerElement: HTMLElement | null =
      document.getElementById(containerId);

    if (!conatinerElement) {
      throw "최상위 컨테이너가 없어 UI를 진행하지 못합니다.";
    }
    this.container = conatinerElement;
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

  abstract render(...params: string[]): void; // 추상 메소드 : 자식들에게 꼭 구현하라고 마킹해놓은 것
}
