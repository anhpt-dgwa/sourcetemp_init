export default class RandomBackgroundKv {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.eventBind();
  }
  eventBind() {
    $(document).ready(function () {
      const bgItems = $(".p-smilestory-kv__item-bg");

      if (bgItems.length) {
        if (bgItems.length > 1) {
          bgItems.removeClass("is-visible");
          const randomIndex = Math.floor(Math.random() * bgItems.length);
          // console.log("randomIndex:", randomIndex);
          const selectedBgItem = bgItems.eq(randomIndex);
          selectedBgItem.addClass("is-visible");
        } else {
          bgItems.eq(0).addClass("is-visible");
        }
      }
    });
  }
}
