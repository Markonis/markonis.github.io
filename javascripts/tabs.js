$(function () {
  function selectTab(tabElement) {
    tabElement.show().siblings('.tab').hide();
  }

  $('.tabs').each(function () {
    var $parent = $(this);
    selectTab($parent.find('.tab').first());
    $parent.find('ul > li').click(function () {
      var $tabHeader = $(this);
      var tab = $tabHeader.attr('data-tab');
      var tabElement = $parent.find('.tab[data-tab="' + tab + '"]');
      selectTab(tabElement);
    });
  });
});
