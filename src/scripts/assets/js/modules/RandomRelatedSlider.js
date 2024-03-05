export default class RandomRelatedSlider {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.eventBind();
  }
  eventBind() {
    var $parentElement = $(".p-story-slider__slick");
    var $childElements = $parentElement.children();

    var childArray = $childElements.toArray();
    shuffleArray(childArray);
    $parentElement.empty();
    $parentElement.append(childArray);

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
}
