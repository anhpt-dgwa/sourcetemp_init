export default class PageTop {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.eventBind();
  }
  eventBind() {
    $(this.el).click(function () {
      $("html, body").animate({ scrollTop: 0 }, 200);
    });
  }
}
