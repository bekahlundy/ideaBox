<<<<<<< HEAD
function Idea(title, body, id) {
  this.title= title;
=======
var $title = $('.input-title');
var $body = $('.input-body');
var $search = $('.input-search');
var $saveButton = $('.save-button');

checkIdeas();

function Idea(title, body) {
  this.title = title;
>>>>>>> master
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
    <p class='quality'>quality: ${idea.quality}</p>
    <button class='upvote card-buttons'></button>
    <button class='downvote card-buttons'></button>
    <button class='delete card-buttons'></button>
    </li>`
  )
};


$('.bottom-section').on('click', '.upvote', '.downvote', function() {
  var selector = $(this).attr('class');
  var quality = $(this).closest('.card').find('quality')
  var newQuality = getNewQuality(selector, quality.text());
  var key = $(this).closest('.card').attr('id');
  var ideaBox = JSON.parse(localstorage.getItem(key));
  ideaBox.quality = newQuality;
  localStorage.setItem(key, JSON.stringify(ideaBox));
  quality.text(newQuality);
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

$saveButton.on('click', function() {
  var title = $title.val();
  var body = $body.val();
  var newIdea = new Idea(title, body); //new instance of Idea
  storeIdea(newIdea);
  createCard(newIdea);
  $title.val('');
  $body.val('');
});

function storeIdea(newIdea) {
  var allIdeas = getIdeasFromLocalStorage();
  allIdeas.push(newIdea);
  localStorage.setItem("ideas", JSON.stringify(allIdeas))
};

function getIdeasFromLocalStorage() {
  return JSON.parse(localStorage.getItem("ideas"))
};

function getAllIdeasAndDisplay() {
  // grab from localStorage, iterate through ideas, for each idea call on createCard();
  var ideas = JSON.parse(localStorage.getItem("ideas"));
  for (var i = 0; ideas.length>i; i++) {
    createCard(ideas[i]);
  }
};
>>>>>>> master

function upVote(quality) {
  switch (quality) {
    case 'swill':
      return 'plausible';
    case 'plausible':
      return 'genius';
  }
}

<<<<<<< HEAD
function downVote(quality) {
  switch (quality) {
    case 'genius':
      return 'plausible';
    case 'plausible':
      return 'swill'
  }
}

function emptyInputs() {
  $('.input-title').val('');
  $('.input-body').val('');
}
=======
$('.bottom-section').on('click', '.delete', function() {
  $(this).closest('li').remove();
});

$('.bottom-section').on('click', '.upvote', function() {
  var quality = $(this).siblings('.quality');
  var selector = $(quality).val('');
  $(quality).text('quality: swill');
});
>>>>>>> master
