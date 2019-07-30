
/* Make a variable with each of the Firebase tools */
const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();

/* Listen when auth status changes */
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Usuario inició sesión", user);
  } else {
    console.log("Usuario cerró sesión");
  }
});

/* Beginning-login function to access to the timeline section */
const login = () => {
  let email = document.getElementById("email-input").value;
  let password = document.getElementById("password-input").value;
  let loginError = document.getElementById("loginError");
  if (email.length === 0 || password.length === 0) {
    loginError.innerHTML = "⚠️ Debe completar todos los campos";
  } else {
    loginError.innerHTML = "";
    auth.signInWithEmailAndPassword(email, password)
    .then(correct => {
      loginForm.reset();
      document.getElementById("timeLine").style.display="block";
      document.getElementById("loginPage").style.display="none";
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/user-not-found") {
        loginError.innerHTML = "⚠️ Usuario no existe. Favor de verificar sus datos";
      } else if (errorCode === "auth/invalid-email") {
        loginError.innerHTML = "⚠️ Formato inválido. Verifique su correo electrónico";
      } else if (errorCode === "auth/wrong-password") {
        loginError.innerHTML = "⚠️ Contraseña incorrecta. Favor de verificar sus datos";
      }
    });
  }
};
/* End-login function to access to the timeline section */

/* Beginning-Sign up function to open sign up modal and reset input values */
const signUp = () => {
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signupForm");
  loginForm.reset();
  signUpForm.reset();
  loginError.innerHTML = "";
  registerError.innerHTML = "";
  document.getElementById('id01').style.display="block";
};
/* End-Sign up function to open sign up modal and reset input values */

/* Beginning-Sign up function to create new user account */
const confirmedSignUp = () => {
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
    auth.createUserWithEmailAndPassword(registeredEmail, confirmedPassword)
    .then(correct => {
      registerModal.innerHTML = `
      <section class="registerCorrectMessage">
      <p>Su cuenta se ha registrado correctamente, por favor inicie sesión.</p>
      <img src="Images/greenCheck.png" alt="Creación de usuario correcta" class="correctRegisterImage"/>
      </section>
      `;
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
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
/* End-Sign up function to create new user account */

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

 // Beginning-Function to edit/update real-time 
 document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    const db = firebase.firestore();
    const myPost = db.collection("posts").doc("firstpost");

    myPost.onSnapshot(doc => {
          const data = doc.data();
         document.getElementById("pubPosts").innerHTML = data.title + `<br>`;
      })
 });
 
 const updatePost = (e) => {
  const db = firebase.firestore();
  const myPost = db.collection("posts").doc("firstpost");
  myPost.update({title: e.target.value})
 }
//End-Function to edit/update real-time 

//Beggining-Function to save post on db
const createPost = () => {
  const db = firebase.firestore();
  const toPost = document.getElementById("toPost");

  db.collection("posts").add({
       text: toPost.value,
       date: new Date()
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}
//End-Function to save post on db


/*Beginning-Function to show publised posts
document.getElementById("timelinePosted").innerHTML += 
`<section class="publishedPosts">
    <p>${}</p>
  </section> 
  <section class="postIcons">
  <img id="like" src="Images/like.png" alt="editar" width="20">
  <img id="edit" src="Images/icon-edit.png" alt="editar" width="20">
  <img id="delete" src="Images/icon-garbage.png"alt="eliminar" width="20">
</section>
`
*/

/* Beginning-Edit profile user function*/
const profileUser =  () => {
  document.getElementById('id01').style.display="block";
  let  profileModal= document.getElementById("w3-form");
  profileModal.innerHTML = `
  <section class='profileUser'>
  <h4>Seleccione foto de usuario.</h4>
  <div class ="profileUserImage">
  <img  class = 'imageUser' id='imageUser' src='Images/user.png'>
  </div>
  <div class= profileUserName>
  <label class='btn btn-file'>
  <input type = 'file' name= 'fichero' values = '' id = 'fichero' class = 'hidden'>
  </label>
  <label for="registerNamel">Nombre:</label>
  <input type="name" id="registerName" class="registerName" name="registerName" placeholder="Ingrese su nombre ..."  required>
  <label for="registerEmail">Correo electrónico:</label>
  <input type="email" id="registerEmail" class="registerEmail" name="registerEmail" placeholder="Ingrese correo electrónico...">
  </div>                          
</section>`
  
  fichero.addEventListener('change', function(e){
    for (let i = 0; i < e.target.files.length; i++){
      let imageFile = e.target.files[i];
      let storageRef = firebase.storage().ref("fotoperfil/" + imageFile.name);
      let uploadTask = storageRef.put(imageFile);

      uploadTask.on('state_changed', 
      
      function progress(snapshot){

         let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;    
        
         console.log('Upload is ' + progress + '% done');

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: 
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: 
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          
        }, function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
          });
        });
    }
 });



};
 
 
/*End-Edit profile user function */


/* Beginning-Log out function to close user session */
const logOut = () => {
  auth.signOut().then(() => {
    document.getElementById("timeLine").style.display="none";
    document.getElementById("loginPage").style.display="block";
    loginError.innerHTML = `
    <span style='color:#5BD9CC';>&#10004; Ha cerrado sesión correctamente</span>`;
  });
};
/* End-Log out function to close user session */

/* */

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", signUp);
document.getElementById("registerConfirm").addEventListener("click", confirmedSignUp);
document.querySelector(".icon").addEventListener("click", mobileMenu);
document.getElementById("profileButton").addEventListener("click", profileUser);
document.getElementById("postButton").addEventListener("click", createPost);
document.getElementById("settingsButton").addEventListener("click", logOut);
//document.getElementById("port").addEventListener("click", );
