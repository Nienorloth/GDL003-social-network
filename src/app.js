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


document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", register);
document.getElementById("registerConfirm").addEventListener("click", registerConfirmed);
