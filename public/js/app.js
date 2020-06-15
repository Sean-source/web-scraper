
/*$(document).on("click", ".btn-primary", function () {

  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/api/post" + thisId,
    data: {
      headline: $('.card-title').val(),
      summary: $('.card-text').val()
    }
  })
    .then(function (data) {

      console.log(data);

    })
})*/

$('.saveArticle').each(function (index, ele,) {
  $(ele).on('click', function () {
    $.ajax({
      url: `/api/posts/${ele.dataset.id}`,
      type: 'PUT'
    })
  })
})


$('.deleteArticle').each(function (index, ele,) {
  $(ele).on('click', function () {
    $.ajax({
      url: `/api/posts/${ele.dataset.id}`,
      type: 'DELETE',
      success: () => {
        window.location.reload(); //reloads the page
      }
    })
  })
})
//

/*).each(function (button) {
  console.log('save button clicked', this)
})*/