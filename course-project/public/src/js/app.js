var defferedPrompt;

// test if the browser can use service workers
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(() => {
        console.log('Service worker registered!');
    });
}

// prevent the default install banner from Chrome
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("beforeinstallprompt fired.");
    event.preventDefault();
    defferedPrompt = event;
    
    // do nothing after this event
    return false;
});