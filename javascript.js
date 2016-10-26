

function Idea(title, body, id) {
  this.title= title;
  this.body = body;
  this.id = id;
  this.quality = 'swill';
}




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

$('.save-button').on('click', function() {
  var title = $('.input-title').val();
  var body = $('.input-body').val();
  var ideaBox = new Idea(title, body, Date.now());
  var key = ideaBox.id;
  localStorage.setItem(key, JSON.stringify(ideaBox));
  createCard(ideaBox);
  emptyInputs();
});

$('.bottom-section').on('click', '.upvote, .downvote', function() {
  var selector = $(this).attr('class');
  var quality = $(this).closest('.card').find('.quality');
  var newQuality = getNewQuality(selector, quality.text())
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
    case 'swill';
    return 'plausible';
    case 'plausible';
    return 'genius';
  }
}

function emptyInputs() {
  $('.input-title').val('');
  $('.input-body').val('');
}
