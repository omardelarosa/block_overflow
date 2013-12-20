$(function(){

  // disable links of aggregated pages
  $.each($('.block_overflow a'), function(item, value) { 
    var $item = $(value); 
    $item.attr('href','#'); 
  });

})