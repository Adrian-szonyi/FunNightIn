$(".readmore-link").click(function (e) {
  // record if our text is expanded
  var isExpanded = $(e.target).hasClass("expand");

  //close all open paragraphs
  $(".readmore.expand").removeClass("expand");
  $(".readmore-link.expand").removeClass("expand");

  // if target wasn't expand, then expand it
  if (!isExpanded) {
    $(e.target).parent(".readmore").addClass("expand");
    $(e.target).addClass("expand");
  }
});
