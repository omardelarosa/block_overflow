var sites;

function hide_empty_posts(){
  _.each( $('.feed_item'), function(item){  
    var $item = $(item);
    if ( !$item.hasClass('block_overflow') ) {
      $item.hide();
    } 
  });
}

function show_empty_posts(){
  _.each( $('.feed_item'), function(item){  
    var $item = $(item);
    if ( !$item.hasClass('block_overflow') ) {
      $item.show(500);
    } 
  });
}

function date_sort(){
  $('.block_overflow').sort(function(a,b){
    var date_a = Date.parse($(a).data("updated"));
    var date_b = Date.parse($(b).data("updated"));
    return date_a < date_b;
  }).appendTo('#feed')
}

function name_sort(){
  $('.block_overflow').sort(function(a,b){
    var name_a = $(a).data("student");
    var name_b = $(b).data("student");
    return name_a > name_b;
  }).appendTo('#feed')
}

function append_posts(){
  var $feed = $('#feed');
  _.each(sites, function(site){
    var $post = $(site.latest_post);
    $post.data("student", site.student_name);
    $post.data("updated", site.updated_at);
    $post.addClass("feed_item");
    if (site.latest_post == "<p>No block_overflow posts found.</p>") {
      $post.data("empty", 1);
    } else {
      $post.data("empty", true);
    }

    var credit_source = $('#post-credit-template').html();
    var credit_template = Handlebars.compile(credit_source);
    var $credit = credit_template({
        url: site.url, 
        student_name: site.student_name
      });
    $post.append($credit)
    $feed.append($post);
  });
}

$(function(){

  $.getJSON('/sites/json', function(data){
    // fetch sites json
    sites = data;

    //append posts
    append_posts();

    //sort by latest;
    date_sort();

    //hide any empty posts from the feed
    hide_empty_posts();
  })

  // disable links of aggregated pages
  $.each($('.block_overflow a'), function(item, value) { 
    var $item = $(value); 
    $item.attr('href','#'); 
  });

})