export default class AnchorLinkHash {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.eventBind();
  }
  eventBind() {
    $(window).on("load", function () {
      var hash = window.location.hash;

      var anchorTarget = $(hash);
      if (anchorTarget.length) {
        setTimeout(function () {
          var position = anchorTarget.offset().top;
          $("html, body").animate(
            {
              scrollTop: position,
            },
            300,
            "swing"
          );
          history.pushState(null, null, hash);
        }, 200);
      }
    });
  }
}
