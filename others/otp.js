var uiConfig = {
    'callbacks': {
        'signInSuccess': function(currentUser, credential, redirectUrl) {
            console.log(currentUser.email, currentUser, credential);
            localStorage.setItem('UserName',currentUser);
             location.href = "http://localhost:5500/"
            // Do something.
            // when signed In compare my resultes with backend about number of coins he has

            // Return type determines whether we continue the redirect automatically or whether we leave that to developer to handle.
             return false;
        }
        },
        'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.

        ],
        // Terms of service url.
        'tosUrl': 'http://localhost:5500/others/otp.html'
    };
    
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);



    document.querySelectorAll('.ns-match-link')[26]

// var json = {}
// for(var i of document.querySelectorAll('.stats_table tr a')){
//     var teamName = i.innerText ;
//     var id = i.href.split('/')[5] ;
//     json[teamName] = id
// }
