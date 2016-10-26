function Idea(title, body, id) {
  this.title= title;
  this.body = body;
  this.id = id;
  this.quality = 'swill';
}

$('.save-button').on('click', function() {
  var title = $('.input-title').val();
  var body = $('.input-body').val();
  var ideaBox = new Idea(title, body, Date.now());
  var key = ideaBox.id;
  localStorage.setItem(key, JSON.stringify(ideaBox));
  createCard(ideaBox);
  emptyInputs();
})

function createCard(idea) {
  $('.bottom-section').prepend(
    `<li class='card' id='${idea.id}'>
    <h2 class='card-title'>${idea.title}</h2>
    <p class='card-body'>${idea.body}</p>
    <p>quality: </p>
    <p class='quality'>${idea.quality}</p>
    <button class='upvote card-buttons'></button>
    <button class='downvote card-buttons'></button>
    <button class='delete card-buttons'></button>
    </li>`
  )
};

$('.bottom-section').on('click', '.upvote, .downvote', function() {
  var selector = $(this).attr('class');
  var quality = $(this).closest('.card').find('.quality');
  var newQuality = getNewQuality(selector, quality.text());
  var key = $(this).closest('.card').attr('id');
  var ideaBox = JSON.parse(localStorage.getItem(key));
  ideaBox.quality = newQuality;
  localStorage.setItem(key, JSON.stringify(ideaBox));
  quality.text(newQuality);
})

$('.bottom-section').on('click', '.delete', function() {
  $(this).parent('li').remove();

})

$('.input-title, .input-body').on('keydown', function(event) {
  if (event.keyCode === 13)
      $('.save-button').click();
})

$('.input-search').on('keyup', function() {
  var searchValue = $(this).val().toLowerCase();
  $('.card').each(function() {
    var titleText = $(this).find('.card-title').text().toLowerCase();
    var bodyText = $(this).find('.card-body').text().toLowerCase();
    titleText.indexOf(searchValue) !== -1 ||
    bodyText.indexOf(searchValue) !== -1
      ? $(this).show() : $(this).hide();
    });
})

function getNewQuality(selector, quality) {
  if(selector === 'upvote card-buttons') {
    return upVote(quality);
  } else {
    return downVote(quality);
  }
}

function upVote(quality) {
  switch (quality) {
    case 'swill':
      return 'plausible';
    case 'plausible':
      return 'genius';
    default:
      return "genius";
  }
}

function downVote(quality) {
  switch (quality) {
    case 'genius':
      return 'plausible';
    case 'plausible':
      return 'swill';
    default:
      return "swill";
  }
}

function emptyInputs() {
  $('.input-title').val('');
  $('.input-body').val('');
}
