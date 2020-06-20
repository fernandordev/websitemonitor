//Config firebase
const config = {
    apiKey: "AIzaSyAPHPawp-rH7O9zolT4MQa6V1OxoucibUQ",
    authDomain: "webmoonitor.firebaseapp.com",
    databaseURL: "https://webmoonitor.firebaseio.com",
    projectId: "webmoonitor",
    storageBucket: "webmoonitor.appspot.com",
    messagingSenderId: "812088992257",
    appId: "1:812088992257:web:b7bbe5b3ecc23f07211600",
    measurementId: "G-M97ZY1J6XJ"
};

//Firebase init
firebase.initializeApp(config);

// Auth var
const auth = firebase.auth();

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const getRegister = document.getElementById("register");
const getLogin = document.getElementById("login");

btnUser = document.getElementById("btn-user")

//Logout
function logout() {
    auth.signOut();
}

//Listing change of user
auth.onAuthStateChanged(function (user){
    btnUser.textContent = user.email
});

//Login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginPass = getInputVal("login-password");
    const loginEmail = getInputVal("login-email");
  
    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPass).then((cred) => {
        loginForm.reset();
        getLogin.style.display = "none";
      })
      .catch((err) => {
        //TODO: feedback login errado kek
      });
  });

//Registro
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const registerPass = getInputVal("register-password");
    const repeatPass = getInputVal("repeat-password");
    const registerEmail = getInputVal("register-email");
  
    if(registerPass != repeatPass){
        return alert("errou brother");
    }

    firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPass).then((cred) => {
        loginForm.reset();
        getRegister.style.display = "none";
      })
      .catch((err) => {
        //TODO: feedback login errado kek
      });
  });

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Modal login
function login() {
    if (getLogin.style.display === "block") {
        getLogin.style.display = "none";
    } else {
        if (getRegister.style.display === "block") {
            getRegister.style.display = "none";
        }else{
            getLogin.style.display = "block";
            getRegister.style.display = "none";            
        }
    }
}

// Modal register
function register() {
    if (getRegister.style.display === "block") {
        getRegister.style.display = "none";
    } else {
        getRegister.style.display = "block";
        getLogin.style.display = "none";
    }
}