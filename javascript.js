var title = $('.input-title');
var body = $('.input-body');
var search = $('.input-search');
var saveButton = $('.save-button');

saveButton.on('click', function() {
  createCards();
});

function createCards() {
  $('.bottom-section').append(
    `<li class='card'>
    <h2 class='card-title'>${title.val()}</h2>
    <p class='card-body'>${body.val()}</p>
    <p class='quality'></p>
    <button class='upvote card-buttons'></button>
    <button class='downvote card-buttons'></button>
    <button class='delete card-buttons'></button>
    </li>`
  )
};

$('.bottom-section').on('click', '.delete', function() {
  $(this).closest('li').remove();
})
