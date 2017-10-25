var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
    createPostArea.style.display = 'block';

    // show the Chrome install banner when the user click on "+" button 
    // only if Chrome already tried to show it (stored in defferedPrompt var in app.js)
    if(defferedPrompt) {
        defferedPrompt.prompt();

        defferedPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome);

            // if user clicked the close button
            if(choiceResult.outcome === 'dismissed') {
                console.log("User cancelled installation");
            } else {
                console.log("User added to home screen");
            }

            // clear defferedPrompt after using it to avoid call on each button click
            defferedPrompt = null;
        });
    }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
