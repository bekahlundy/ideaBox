var title = $('.input-title');
var body = $('.input-body');
var search = $('.input-search');
var saveButton = $('.save-button');
var defaultQuality = 'swill'

saveButton.on('click', function() {
  createCards();
  title.val('');
  body.val('');
});

function createCards() {
  $('.bottom-section').prepend(
    `<li class='card'>
    <h2 class='card-title'>${title.val()}</h2>
    <p class='card-body'>${body.val()}</p>
    <p class='quality'>quality: swill</p>
    <button class='upvote card-buttons'></button>
    <button class='downvote card-buttons'></button>
    <button class='delete card-buttons'></button>
    </li>`
  )
};

$('.bottom-section').on('click', '.delete', function() {
  $(this).closest('li').remove();
});


$('.bottom-section').on('click', '.upvote', function() {
   var quality = $(this).siblings('.quality');
   var selector = $(quality).val('');
   $(quality).text('quality: swill');
});


// function upVote() {
// switch (selector) {
//   case 'quality: plausible'
//   }
// }
