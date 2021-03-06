var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#shared-moments');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// allows to save assets in cache on demands
// disabled
function onSaveButtonClicked(event) {
    console.log("Clicked");
    // prevent errors if browser can't use cache
    if('caches' in window) {
        caches.open('user-requested')
        .then(cache => {
            cache.add('https://httpbin.org/get');
            cache.add('/src/images/sf-boat.jpg');
        });
    }
}

function clearCards() {
    while(sharedMomentsArea.hasChildNodes()) {
        sharedMomentsArea.removeChild(sharedMomentsArea.lastChild)
    }
}

// create html element with dummmy data
function createCard() {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';

  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);

  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.style.color = 'white';
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = 'San Francisco Trip';
  cardTitle.appendChild(cardTitleTextElement);

  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = 'In San Francisco';
  cardSupportingText.style.textAlign = 'center';

//   var cardSaveButton = document.createElement('button');
//   cardSaveButton.textContent = "Save";
//   cardSaveButton.addEventListener('click', onSaveButtonClicked);
//   cardSupportingText.appendChild(cardSaveButton);

  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

// create a card with dummy data for each http response (to have server connection)

var url = 'https://httpbin.org/get';
var isFromNetwork = false;

// fetch(url)
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        message: 'A message'
    })
})
.then(function(res) {
    return res.json();
})
.then(function(data) {
    isFromNetwork = true;
    console.log("Data from web: ", data);
    clearCards();
    createCard();
});

if('caches' in window) {
    // try to find the request in cache first
    caches.match(url)
    .then(response => {
        // if found, return it
        if(response) {
            return response.json();
        }
    })
    .then(data => {
        console.log("Data from cache: ", data);    
        if(!isFromNetwork) {
            clearCards();    
            createCard();
        }
    })
}
