var defferedPrompt;

// test if the browser can use service workers
if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
        console.log('Service worker registered!');
    })
    .catch((err) => {
        console.log(err);
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

var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("This is executed once the timer is done!");
        reject({code: 500, message: "An error occured"});
    }, 3000);
});

promise
.then((result) => {
    return result;
})
// we can chain then()
.then((newResult) => {
    console.log(newResult)
})
// catch any errors occured in any steos before this
.catch((err) => {
    console.log(err.code, err.message);    
});

console.log("This is executed right after setTimeout");