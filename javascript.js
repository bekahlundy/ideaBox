

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
  localStorage.setItem(key, JSON.stringify(ideaBox))
  createCard(title, body, ideaBox.id, ideaBox.quality);
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

function emptyInputs() {
  $('.input-title').val('');
  $('.input-body').val('');
}
