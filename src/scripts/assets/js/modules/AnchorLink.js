export default class AnchorLink {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.eventBind();
  }
  eventBind() {
    $(document).ready(function () {
      $("html").on("click", 'a[href^="#"]', function () {
        var href = $(this).attr("href");
        if (href !== "#" && href !== "") {
          var target = $(href == "#" || href == "" ? "html" : href);
          var position = target.offset().top;
          $("html, body").animate({ scrollTop: position }, 300, "swing");
          return false;
        }
      });
    });
  }
}
