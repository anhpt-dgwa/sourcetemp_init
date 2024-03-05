export default class Demo {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.eventBind();
  }
  eventBind() {
    const _self = this;
    $(document).ready(function () {
      console.log(123);
      $(_self.el).click(function (e) {
        console.log("clicked");
        console.log(e.target);
      });
    });
  }
}
