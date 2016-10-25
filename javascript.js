
var $title = $('.input-title');
var $body = $('.input-body');
var $search = $('.input-search');
var $saveButton = $('.save-button');

function Idea(title, body) {
  this.title= title;
  this.body = body;
  this.id = Date.now();
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

$saveButton.on('click', function() {
  var title = $title.val();
  var body = $body.val();
  var newIdea = new Idea(title, body);
  localStorage.setItem(title, body);
  storeIdea(newIdea);


  getIdeasAndDisplay();
  $title.val('');
  $body.val('');
});

checkIdeas();

function storeIdea(newIdea) {
  var allIdeas = getIdeasFromLocalStorage();
  allIdeas.push(newIdea);
  localStorage.setItem("ideas", JSON.stringify(allIdeas))
};

function getIdeasFromLocalStorage() {
  return JSON.parse(localStorage.getItem("ideas"))
};

function getIdeasAndDisplay() {
  var ideas = JSON.parse(localStorage.getItem("ideas"));
  for (var i = 0; ideas.length>i; i++) {

  createCard(ideas[i]);
}
    // getIdeasAndDisplay(); grab from localStorage, iterate through ideas, for each idea call on createCard();

};

function checkIdeas() {
  var currentIdeas = localStorage.getItem("ideas");
  if (!currentIdeas) {
    localStorage.setItem("ideas", JSON.stringify([]))
  }
}


$('.bottom-section').on('click', '.delete', function() {
  $(this).closest('li').remove();
});


$('.bottom-section').on('click', '.upvote', function() {
   var quality = $(this).siblings('.quality');
   var selector = $(quality).val('');
   $(quality).text('quality: swill');
});
