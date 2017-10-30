var defferedPrompt;

// if the browser can't use Promise (too old), set it with the alternative Promise from promise.js
if(!window.Promise) {
    window.Promise = Promise;
}

// test if the browser can use service workers
if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
        console.log('Service worker registered!');
    })
    .catch(err => {
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





// EXAMPLES
// // GET data
// fetch('http://httpbin.org/ip')
// .then(response => {
//     console.log("Fetch response: ", response);
//     return response.json();
// })
// .then(data => {
//     console.log("Parsed data: ", data);
// })
// .catch(error => {
//     console.log("Fetch error: ", error);
// });

// // POST data
// fetch('http://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     mode: 'cors', // can set "no-cors"
//     body: JSON.stringify({message: "Does this work?"})
// })
// .then(response => {
//     console.log("Fetch response: ", response);
//     return response.json();
// })
// .then(data => {
//     console.log("Parsed data: ", data);
// })
// .catch(error => {
//     console.log("Fetch error: ", error);
// });

// var promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve("This is executed once the timer is done!");
//         reject({code: 500, message: "An error occured"});
//     }, 3000);
// });

// promise
// .then(result => {
//     return result;
// })
// // we can chain then()
// .then(newResult => {
//     console.log(newResult)
// })
// // catch any errors occured in any steos before this
// .catch(err => {
//     console.log(err.code, err.message);    
// });

// console.log("This is executed right after setTimeout");

// AJAX request (not working with Service Workers)
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://httpbin.org/ip');
// xhr.responseType = 'json';

// xhr.onload = function() {
//     console.log(xhr.response);
// };

// xhr.onerror = function() {
//     console.log('Error!');
// }

// xhr.send();