/* Beginning-login function to access to the timeline section */
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
/* End-login function to access to the timeline section */

/* Beginning-Register function to open register modal */
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
/* End-Register function to open register modal */

/* Beginning-Register function to create new user account */
const registerConfirmed = () => {
  let registeredEmail = document.getElementById("registerEmail").value;
  let registeredPassword = document.getElementById("registerPassword").value;
  let confirmedPassword = document.getElementById("registerConfirmPassword").value;
  let verificationCode = document.getElementById("registerVerificationCode").value;
  let registerError = document.getElementById("registerError");
  let registerModal = document.getElementById("w3-form");
  if (registeredEmail.length === 0 || registeredPassword.length === 0 || confirmedPassword.length === 0 || verificationCode.length === 0) {
    registerError.innerHTML = "⚠️ Debe llenar todos los campos";
  } else if (registeredPassword != confirmedPassword) {
    registerError.innerHTML = "⚠️ La contraseña no coincide";
  } else {
    registerError.innerHTML = "";
    firebase.auth().createUserWithEmailAndPassword(registeredEmail, confirmedPassword)
    .then(function(correct) {
      registerModal.innerHTML = "";
      registerModal.innerHTML = "<section class='registerCorrectMessage'><p>Su cuenta se ha registrado correctamente, por favor inicie sesión.</p><img src='Images/greenCheck.png' alt='Creación de usuario correcta' class='correctRegisterImage'/></section>";
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(error);
      if (errorCode === "auth/email-already-in-use") {
        registerError.innerHTML = "⚠️ Ya existe una cuenta con ese correo electrónico";
      } else if (errorCode === "auth/invalid-email") {
        registerError.innerHTML = "⚠️ Formato inválido. Verifica tu correo electrónico";
      } else if (errorCode === "auth/weak-password") {
        registerError.innerHTML = "⚠️ Tu contraseña debe contener al menos 6 caracteres";
      }
    });
  }
};
/* End-Register function to create new user account */

/* Beginning-Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
  const mobileMenu =  () => {
    const icons = document.getElementById("myLinks");
    const topNav = document.querySelector(".topnav");
    const barsBack = document.querySelector(".icon");
    const profile = document.getElementById("port");
    const logo = document.getElementById("timelineLogo");

    if (icons.style.display === "block") {
      icons.style.display = "none";
      topNav.style.height = "12vh";
      barsBack.style.backgroundColor="#5BD9CC";
      profile.style.display = "inline";
      logo.style.display = "inline";

    } else {
      icons.style.display = "block";
      topNav.style.height = "28vh";
      barsBack.style.backgroundColor="#DDD";
      profile.style.display = "none";
      logo.style.display = "none";
      icons.style.height= "28vh";
    }
  };
/* End-Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */

 document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();
    const myPost = db.collection("posts").doc("firstpost");

    myPost.get()
      .then(doc => {
          const data = doc.data();
         
      })

 });

const profileUser =  () => {
  document.getElementById('id01').style.display="block";
  let  profileModal= document.getElementById("w3-form");
  profileModal.innerHTML = "<section class='registerCorrectMessage'><p>Seleccione foto de usuario.</p><img src='Images/photo.png'/></section>";
  /*<input type='file' name= 'fichero' values = '' id='fichero' class='hidden'<img src='Images/photo.png'/> */
};


document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", register);
document.getElementById("registerConfirm").addEventListener("click", registerConfirmed);
document.querySelector(".icon").addEventListener("click", mobileMenu);
document.getElementById("profileButton").addEventListener("click", profileUser);
//document.getElementById("port").addEventListener("click", );
