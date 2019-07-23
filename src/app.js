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
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(correct) {
      alert("Está registrado, puede ingresar");
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert("Usuario no existe, favor de registrarse");
    });
    document.getElementById("loginPage").style.display="none";
    document.getElementById("timeLine").style.display="block";
  };

  const register = () => {
    document.getElementById('id01').style.display="block";
    let email = document.getElementById("registerEmail").value="";
    let password = document.getElementById("registerPassword").value="";
    let passwordConfirmed = document.getElementById("registerConfirmPassword").value="";
    let verificationCode = document.getElementById("registerVerificationCode").value="";
  };

  const registerConfirmed = () => {
    document.getElementById('id01').style.display="none";
    let email = document.getElementById("registerEmail").value;
    let passwordConfirmed = document.getElementById("registerConfirmPassword").value;
    let verificationCode = document.getElementById("registerVerificationCode").value;
    firebase.auth().createUserWithEmailAndPassword(email, passwordConfirmed)
    .then(function(correct) {
      alert("Se ha registrado correctamente");
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert("Error, tu contraseña debe ser de mínimo 6 caracteres");
    });
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
      topNav.style.height = "29vh";
      barsBack.style.backgroundColor="#DDD";
      profile.style.display = "none"
      logo.style.display = "none";
    }
  }


document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", register);
document.getElementById("registerConfirm").addEventListener("click", registerConfirmed);
document.querySelector(".icon").addEventListener("click", mobileMenu);
