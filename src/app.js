/* Your web app's Firebase configuration */
let firebaseConfig = {
  apiKey: "AIzaSyCG8x2oftKT02S9pAZ0kKprJgQbzulwTmI",
  authDomain: "comunidadescolar.firebaseapp.com",
  databaseURL: "https://comunidadescolar.firebaseio.com",
  projectId: "comunidadescolar",
  storageBucket: "",
  messagingSenderId: "363861063385",
  appId: "1:363861063385:web:6b38d8496fe78f6a"
};
/* Initialize Firebase */
firebase.initializeApp(firebaseConfig);

/* */
const login = () => {
let email = document.getElementById("email-input").value;
let password = document.getElementById("password-input").value;
let loginError = document.getElementById("loginError");
if (email.length === 0 || password.length === 0) {
  loginError.innerHTML = "⚠️ Debe completar todos los campos";
} else {
  loginError.innerHTML = "";
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(correct) {
    document.getElementById("timeLine").style.display="block";
    document.getElementById("loginPage").style.display="none";
  })
  .catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(error);
    if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
      loginError.innerHTML = "⚠️ Usuario no existe. Favor de verificar sus datos";
    }
  });
}
};

const register = () => {
loginError.innerHTML = "";
registerError.innerHTML = "";
document.getElementById('id01').style.display="block";
let email = document.getElementById("email-input").value="";
let password = document.getElementById("password-input").value="";
let registeredEmail = document.getElementById("registerEmail").value="";
let registeredPassword = document.getElementById("registerPassword").value="";
let confirmedPassword = document.getElementById("registerConfirmPassword").value="";
let verificationCode = document.getElementById("registerVerificationCode").value="";
};

const registerConfirmed = () => {
let registeredEmail = document.getElementById("registerEmail").value;
let registeredPassword = document.getElementById("registerPassword").value;
let confirmedPassword = document.getElementById("registerConfirmPassword").value;
let verificationCode = document.getElementById("registerVerificationCode").value;
let registerError = document.getElementById("registerError");
if (registeredEmail.length === 0 || registeredPassword.length === 0 || confirmedPassword.length === 0 || verificationCode.length === 0) {
  registerError.innerHTML = "⚠️ Debe llenar todos los campos";
} else if (registeredPassword != confirmedPassword) {
  registerError.innerHTML = "⚠️ La contraseña no coincide";
} else {
  registerError.innerHTML = "";
  firebase.auth().createUserWithEmailAndPassword(registeredEmail, confirmedPassword)
  .then(function(correct) {
    alert("Se ha registrado correctamente, por favor inicie sesión");
    document.getElementById('id01').style.display="none";
  })
  .catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(error);
    if (errorCode === "auth/email-already-in-use") {
      registerError.innerHTML = "⚠️ Ya existe una cuenta con ese correo electrónico";
    } else if (errorCode === "auth/invalid-email") {
      registerError.innerHTML = "⚠️ Formato inválido. Verifica tu correo electrónico";
    }
  });
}
};

  /* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
  const mobileMenu =  () => {
    const icons = document.getElementById("myLinks");
    const topNav = document.querySelector(".topnav");
    const barsBack = document.querySelector(".icon");
    const profile = document.getElementById("profileIcon");
    const logo = document.getElementById("timelineLogo");

    if (icons.style.display === "block") {
      icons.style.display = "none";
      topNav.style.height = "12vh";
      barsBack.style.backgroundColor="#5BD9CC";
      profile.style.display = "block";
      logo.style.display = "block";
    } else {
      icons.style.display = "block";
      topNav.style.height = "28vh";
      barsBack.style.backgroundColor="#DDD";
      profile.style.display = "none"
      logo.style.display = "none";
    }
  }

/*Inicio-Función para guardar los datos del usuario*/
function guardarDatos(user){
  let users = {
    uid:user.uid,
    name:user.displayName,
    email:user.email,
    photo: user.photoURL
  }
  firebase.database().ref("prueba/" + user.uid)
  .set(users)
}
 /*Fin-Función para guardar los datos del usuario*/

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", register);
document.getElementById("registerConfirm").addEventListener("click", registerConfirmed);
document.querySelector(".icon").addEventListener("click", mobileMenu);
