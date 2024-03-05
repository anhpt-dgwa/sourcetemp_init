export default class HeaderScrollFixed {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.eventBind();
  }
  eventBind() {
    $(window).on("load resize", function () {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var headerHeight = $("#mcd-global-header").height();
        var headerSmileStory = $(".p-smilestory-header");

        if (scroll > headerHeight) {
          headerSmileStory.addClass("is-fixed");
        } else {
          headerSmileStory.removeClass("is-fixed");
        }
      });
    });
  }
}
