var sites;

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
  })

  // disable links of aggregated pages
  $.each($('.block_overflow a'), function(item, value) { 
    var $item = $(value); 
    $item.attr('href','#'); 
  });

})