export default class FilterCard {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.eventBind();
  }
  eventBind() {
    this.accordionFn();
    this.setFillHeight();

    $(document).ready(function () {
      const $filterFixedBtn = $("#btn-filter-fixed");
      const $filterModal = $(".filter-wrapper");
      const $filterCloseBtn = $(".filter-close");
      const $filterBtn = $(".filter-btn");
      const filterArea = ".filter-area__list";
      const $ulAfterFilter1 = $("#p-article-after-filter01 ul");
      const $ulAfterFilter2 = $("#p-article-after-filter02 ul");
      let selectedRadioValue = "";
      let clickedTagText = "すべての記事";
      const speed = 100;

      if (getURLParameter("data-area") !== "") {
        setFilterAreaFromURL();
      } else if (getURLParameter("data-tag") !== "") {
        setFilterTagFromURL();
      } else {
        firstShowCardItem();
      }

      $filterFixedBtn.click(function () {
        $("body").addClass("is-disable-scroll");
        $filterModal.addClass("is-active");
      });

      function closeFilterModal() {
        $filterModal.removeClass("is-active");
        $("body").removeClass("is-disable-scroll");
      }

      $filterCloseBtn.click(function () {
        closeFilterModal();
      });

      $filterBtn.click(function () {
        closeFilterModal();
      });

      $(document).keydown(function (e) {
        if (e.keyCode === 27) {
          closeFilterModal();
        }
      });

      function searchFilterFn(radioValue, liTagText) {
        firstCloneCardItem();
        const itemsToShow = [];
        // console.log("searchFilterFn running");
        // console.log("searchFilterFn ~ radioValue:", radioValue);
        // console.log("searchFilterFn ~ liTagText:", liTagText);

        $(".p-cards-item").each(function () {
          const $cardItem = $(this);
          const $tags = $cardItem.find(".p-cards-item__tag-item");
          const $divisions = $cardItem.data("division");
          // console.log("tags:", $tags);

          // console.log("radioValue:", radioValue);
          // console.log("liTagText:", liTagText);
          // console.log("----------------------------");
          // console.log("divisions:", $divisions);

          let checkArea = $divisions.includes(radioValue);
          const shouldShow =
            ($tags.is(`:contains('${liTagText}')`) ||
              liTagText === "すべての記事") &&
            (checkArea || radioValue === "");

          if (shouldShow) {
            // console.log("1");
            itemsToShow.push($cardItem);
          }
        });

        showItems(itemsToShow);
        resultShow();
      }

      function handleFilterClickFn(clickedTagText) {
        firstCloneCardItem();
        const itemsToShow = [];
        const $ulListCard = $(".p-cards-wrap");
        // console.log(
        //   "handleFilterClickFn ~ selectedRadioValue:",
        //   selectedRadioValue
        // );
        // console.log("handleFilterClickFn ~ clickedTagText:", clickedTagText);

        $ulListCard.find(".p-cards-item").each(function () {
          const $cardItem = $(this);
          const $tags = $cardItem.find(".p-cards-item__tag-item");
          const shouldShow =
            $tags.is(`:contains('${clickedTagText}')`) ||
            clickedTagText === "すべての記事";

          if (shouldShow) {
            itemsToShow.push($cardItem);
          }
        });

        showItems(itemsToShow);
        resultShow();
      }

      function clearAllItems() {
        $ulAfterFilter1.find(".p-cards-item").removeClass("is-show").hide();
        $ulAfterFilter2.find(".p-cards-item").removeClass("is-show").hide();
      }

      function firstCloneCardItem() {
        const $ulAfterFilter1Items = $ulAfterFilter1
          .find(".p-cards-item")
          .clone();
        $ulAfterFilter2.empty().append($ulAfterFilter1Items);
      }

      function showItems(itemsToShow) {
        clearAllItems();

        const itemsToShowIn1 = itemsToShow.filter(function (item) {
          return $ulAfterFilter1.has(item).length > 0;
        });
        // console.log("itemsToShowIn1 ~ itemsToShowIn1:", itemsToShowIn1.length);

        const itemsToShowIn2 = itemsToShow.filter(function (item) {
          return $ulAfterFilter2.has(item).length > 0;
        });
        // console.log("itemsToShowIn2 ~ itemsToShowIn2:", itemsToShowIn2.length);

        if (itemsToShowIn1.length <= 10) {
          itemsToShowIn1.forEach(function (item) {
            item.addClass("is-show").fadeIn(speed);
          });
          // console.log("ulAfterFilter1:", itemsToShowIn1.length);
          // console.log("ulAfterFilter2: 0");
        } else {
          itemsToShowIn1.slice(0, 10).forEach(function (item) {
            item.addClass("is-show").fadeIn(speed);
          });
          itemsToShowIn2.forEach(function (item) {
            $ulAfterFilter2.find(item).removeClass("is-show");
          });
          itemsToShowIn2.slice(10).forEach(function (item) {
            $ulAfterFilter2.find(item).addClass("is-show").fadeIn(speed);
          });
          // console.log("ulAfterFilter1: 10");
          // console.log("ulAfterFilter2:", itemsToShowIn2.length - 10);
        }
      }

      function resultShow() {
        const $articleNew = $("#p-featured-articles-new");
        $("html, body").animate(
          {
            scrollTop: $articleNew.offset().top + 1,
          },
          300
        );
        const $pNoResult = $("#p-article-after-filter01 p.no-result");

        if ($("#p-article-after-filter01 ul li.is-show").length === 0) {
          if ($pNoResult.length === 0) {
            $("#p-article-after-filter01").append(
              "<p class='no-result'>結果はありません。</p>"
            );
          }
        } else {
          $pNoResult.remove();
        }

        if ($("#p-article-after-filter02 ul li.is-show").length === 0) {
          $("#p-article-after-filter02").addClass("is-no-result");
        } else {
          $("#p-article-after-filter02").removeClass("is-no-result");
        }
      }

      $("#js-all-area span").click(function (e) {
        if ($(this).parent().hasClass("js-all-select")) {
          $(this).parent().removeClass("js-all-select");
          $(this)
            .closest(".filter-block")
            .find(".filter-area__list li")
            .removeClass("is-active");
          $(this)
            .closest(".filter-block")
            .find(".filter-area__list li input")
            .prop("checked", false);
          selectedRadioValue = "";
          // console.log("area: selectedRadioValue:", selectedRadioValue);
          // console.log("area: clickedTagText:", clickedTagText);
          handleFilterClickFn(clickedTagText);
        }
      });

      $("#js-all-tags span").click(function (e) {
        if ($(this).parent().hasClass("js-all-select")) {
          $(this).parent().removeClass("js-all-select");
          $(this)
            .closest(".filter-block")
            .find(".p-filter-article li a")
            .removeClass("is-active");
          $(this)
            .closest(".filter-block")
            .find(".p-filter-article li:nth-child(1) a")
            .addClass("is-active");
          $("#p-filter-article-outside-modal li a").removeClass("is-active");
          $("#p-filter-article-outside-modal li:nth-child(1) a").addClass(
            "is-active"
          );
          clickedTagText = "すべての記事";
          // console.log("tag: selectedRadioValue:", selectedRadioValue);
          // console.log("tag: clickedTagText:", clickedTagText);
          if (selectedRadioValue) {
            searchFilterFn(selectedRadioValue, clickedTagText);
          } else {
            handleFilterClickFn(clickedTagText);
          }
        }
      });

      $(".p-filter-article a").click(function (e) {
        e.preventDefault();
        const $this = $(this);
        const $ulList = $(".p-filter-article");

        if (!$this.hasClass("is-active")) {
          clickedTagText = $this.text();
          // console.log("clickedTagText:", clickedTagText);
          // console.log(typeof clickedTagText);

          $ulList.find("a").removeClass("is-active");
          $this.addClass("is-active");
          $("#filter-block-tag")
            .find(".filter-label__inner")
            .addClass("js-all-select");

          $ulList.not($this.closest("ul")).each(function () {
            const index = $this.parent().index();
            const $aInOtherList = $(this).find("li").eq(index).find("a");
            if ($this.hasClass("is-active")) {
              $aInOtherList.addClass("is-active");
            } else {
              $aInOtherList.removeClass("is-active");
            }
          });

          if (selectedRadioValue) {
            searchFilterFn(selectedRadioValue, clickedTagText);
          } else {
            handleFilterClickFn(clickedTagText);
          }

          if ($this.parent().hasClass("is-all-tag")) {
            $("#js-all-tags").removeClass("js-all-select");
          }
        }
      });

      $(filterArea + " input").click(function (e) {
        if ($(this).val() == selectedRadioValue) {
          $(this).prop("checked", false);
          selectedRadioValue = "";
          // console.log(e.target);
          // console.log("filterArea change ~ clickedTagText:", clickedTagText);
          handleFilterClickFn(clickedTagText);
        }

        $(filterArea + " li").removeClass("is-active");
        if ($(this).prop("checked")) {
          $(this)
            .parent()
            .find("img")
            .each(function () {
              $(this).parent().parent().parent().addClass("is-active");
              $(this)
                .closest(".filter-block")
                .find(".filter-label__inner")
                .addClass("js-all-select");
            });
        } else {
          $(this)
            .closest(".filter-block")
            .find(".filter-label__inner")
            .removeClass("js-all-select");
        }
      });

      $(filterArea + " input").change(function () {
        selectedRadioValue = $(this).val();
        // console.log("selectedRadioValue:", selectedRadioValue);
        // console.log(typeof selectedRadioValue);
        searchFilterFn(selectedRadioValue, clickedTagText);
      });

      function firstShowCardItem() {
        clearAllItems();
        firstCloneCardItem();

        $(".p-filter-article li a").removeClass("is-active");
        $(`.p-filter-article li a:contains('すべての記事')`).addClass(
          "is-active"
        );

        $(".p-cards-item").each(function (i, cardItem) {
          if (i < 10) {
            $ulAfterFilter1
              .find(".p-cards-item")
              .eq(i)
              .addClass("is-show")
              .fadeIn(speed);
          } else {
            $ulAfterFilter2
              .find(".p-cards-item")
              .eq(i)
              .addClass("is-show")
              .fadeIn(speed);
          }
        });
      }

      function setFilterTagFromURL() {
        clickedTagText = `# ${getURLParameter("data-tag")}`;

        handleFilterClickFn(clickedTagText);

        $(".p-filter-article li a").removeClass("is-active");
        $(`.p-filter-article li a:contains('${clickedTagText}')`).addClass(
          "is-active"
        );
        $("#filter-block-tag")
          .find(".filter-label__inner")
          .addClass("js-all-select");
        console.log(
          "setFilterTagFromURL ~ selectedRadioValue:",
          selectedRadioValue
        );
        console.log("setFilterTagFromURL ~ clickedTagText:", clickedTagText);
      }

      function setFilterAreaFromURL() {
        const areaValue = getURLParameter("data-area");

        if (areaValue) {
          $(`${filterArea} input[value="${areaValue}"]`).prop("checked", true);
          $(`${filterArea} input[value="${areaValue}"]`)
            .parent()
            .parent()
            .addClass("is-active")
            .closest(".filter-block")
            .find(".filter-label__inner")
            .addClass("js-all-select");
          selectedRadioValue = areaValue;
        }

        searchFilterFn(selectedRadioValue, clickedTagText);

        $(".p-filter-article li a").removeClass("is-active");
        $(`.p-filter-article li a:contains('すべての記事')`).addClass(
          "is-active"
        );

        // console.log(
        //   "setFilterAreaFromURL ~ selectedRadioValue:",
        //   selectedRadioValue
        // );
        // console.log("setFilterAreaFromURL ~ clickedTagText:", clickedTagText);
      }

      function getURLParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null
          ? ""
          : decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    });
  }

  accordionFn() {
    $(document).ready(function () {
      $(".js-accordion-btn").click(function () {
        $(this).toggleClass("is-active");
        $(this).next().slideToggle("fast");
      });
    });
  }

  setFillHeight() {
    $(window).on("load resize", function () {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
}
