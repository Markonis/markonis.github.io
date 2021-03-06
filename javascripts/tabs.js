$(function () {
  function selectTab(tab) {
    $('[data-tab="' + tab + '"]')
      .addClass('active')
      .siblings().removeClass('active');
  }

  $('.tabs').each(function () {
    var $parent = $(this);
    var firstTab = $parent.find('[data-tab]')
      .first().attr('data-tab');

    selectTab(firstTab);
    $parent.find('ul > li').click(function () {
      var $tabHeader = $(this);
      var tab = $tabHeader.attr('data-tab');
      selectTab(tab);
    });
  });
});
