/*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });*/

  const register = () => {
      let email = document.getElementById("email-input").value;
      let password = document.getElementById("password-input").value;

      console.log(email);
      console.log(password);
      
  }
  document.getElementById("registerButton").addEventListener("click", register);