$(function() {
  for (i=0; localStorage.length>i; i++) {
    var ideabox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createCard(ideabox);
  }
});

function Idea(title, body, id) {
  this.title= title;
  this.body = body;
  this.id = id;
  this.quality = 'swill';
};

function createCard(idea) {
  $('.bottom-section').prepend(
    `<li class='card' id='${idea.id}'>
    <button class='delete card-buttons'></button>
    <h2 class='card-title' contenteditable>${idea.title}</h2>
    <p class='card-body' contenteditable>${idea.body}</p>
    <button class='upvote card-buttons'></button>
    <button class='downvote card-buttons'></button>
    <p class='thewordquality'> quality: </p>
    <p class='quality'>${idea.quality}</p>
    </li>`
  )
}

$('.bottom-section').on('focus', '.card-body, .card-title', function() {
  var selector = $(this).closest('.card');
  var key = selector.attr('id');
  var ideabox = JSON.parse(localStorage.getItem(key));
  $(this).on('keydown', function(event) {
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })

  $(this).on('blur', function() {
    ideabox.title = selector.find('.card-title').text();
    ideabox.body = selector.find('.card-body').text();
    localStorage.setItem(key, JSON.stringify(ideabox));
  })
})

$('.save-button').on('click', function() {
  var title = $('.input-title').val();
  var body = $('.input-body').val();
  var ideaBox = new Idea(title, body, Date.now());
  var key = ideaBox.id;
  localStorage.setItem(key, JSON.stringify(ideaBox));
  createCard(ideaBox);
  emptyInputs();
})


$('.bottom-section').on('click', '.upvote, .downvote', function() {
  var ideaCard = $(this).closest('.card');
  var selector = $(this).attr('class');
  var quality = ideaCard.find('.quality');
  var newQuality = getNewQuality(selector, quality.text());
  var key = ideaCard.attr('id');
  var ideaBox = JSON.parse(localStorage.getItem(key));
  ideaBox.quality = newQuality;
  localStorage.setItem(key, JSON.stringify(ideaBox));
  quality.text(newQuality);
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

$('.bottom-section').on('click', '.delete', function() {
  var selector = $(this).closest('.card');
  localStorage.removeItem(selector.attr('id'));
  selector.remove();
})

$('.input-search').on('keyup', function() {
  var searchValue = $(this).val().toLowerCase();
  $('.card').each(function() {
    var titleText = $(this).find('.card-title').text().toLowerCase();
    var bodyText = $(this).find('.card-body').text().toLowerCase();
    titleText.indexOf(searchValue) !== -1 || bodyText.indexOf(searchValue) !== -1 ? $(this).show() : $(this).hide();
  });
})

$('.input-title, .input-body').on('keydown', function(event) {
  if (event.keyCode === 13)
  $('.save-button').click();
})

function emptyInputs() {
  $('.input-title').val('');
  $('.input-body').val('');
}
