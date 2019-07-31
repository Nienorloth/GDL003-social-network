
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
    document.getElementById("timeLine").style.display="block";
    document.getElementById("loginPage").style.display="none";
    toPost.value= "";
  } else {
    console.log("Usuario cerró sesión");
    document.getElementById("timeLine").style.display="none";
    document.getElementById("loginPage").style.display="block";
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
    })
    .catch(error => {
      let errorCode = error.code;
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
  let registeredName = document.getElementById("registerName").value;
  let registeredPassword = document.getElementById("registerPassword").value;
  let confirmedPassword = document.getElementById("registerConfirmPassword").value;
  let verificationCode = document.getElementById("registerVerificationCode").value;
  let registerError = document.getElementById("registerError");
  let registerModal = document.getElementById("w3-form");
  if (registeredEmail.length === 0 || registeredName.length === 0 || registeredPassword.length === 0 || confirmedPassword.length === 0 || verificationCode.length === 0) {
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
      if (errorCode === "auth/email-already-in-use") {
        registerError.innerHTML = "⚠️ Ya existe una cuenta con ese correo electrónico";
      } else if (errorCode === "auth/invalid-email") {
        registerError.innerHTML = "⚠️ Formato inválido. Verifique su correo electrónico";
      } else if (errorCode === "auth/weak-password") {
        registerError.innerHTML = "⚠️ Su contraseña debe contener al menos 6 caracteres";
      }
    });
  }
};
/* End-Sign up function to create new user account */

const icons = document.getElementById("myLinks");
const topNav = document.querySelector(".topnav");
const barsBack = document.querySelector(".icon");
const profile = document.getElementById("port");
const logo = document.getElementById("timelineLogo");

/* Beginning-Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
  const mobileMenu =  () => {

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

/* Beginning-Function to save the user data */
function guardarDatos(user){
  let users = {
    uid:user.uid,
    name:user.displayName,
    email:user.email,
    photo: user.photoURL
  }
  firebase.database().ref("prueba/" + user.uid)
  .set(users)
};
 /* End-Function to save the user data */

//Beggining-Function to save post on db

let posts = db.collection("posts");
const toPost = document.getElementById("toPost");

const createPost = () => {
  let registerModal = document.getElementById("w3-form");
  if (toPost.value.length === 0) {
  registerModal.innerHTML =
  `<section class="registerCorrectMessage">
      <p>Su cuenta se ha registrado correctamente, por favor inicie sesión.</p>
      <img src="Images/greenCheck.png" alt="Creación de usuario correcta" class="correctRegisterImage"/>
      </section>
      `;
  } else {

  posts.add({
       text: toPost.value,
       date: new Date()
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

toPost.value="";
}
}
//End-Function to save post on db

//Beggining-Function to show posts
  const publishPost = (doc) => {
    document.getElementById("timelinePosted").innerHTML+=
    `<section class="publishedPosts">
    <p id="${ doc.id }post" class="pubPost">${ doc.data().text }</p>
      <input id="${ doc.id }input" value="${ doc.data().text }" class="edit" size="500" style="display:none"></input>
      <input id="${ doc.id }submit" style="display:none" type="submit" value="Guardar cambios">
    </section>
    <section class="postIcons">
    <img id="like" src="Images/like.png" alt="editar" width="20">
    <img id=${ doc.id } class="editButton" src="Images/icon-edit.png" alt="editar" width="20"/>
    <img id="${ doc.id }" class="deleteButton" src="Images/icon-garbage.png"alt="eliminar" width="20">
    </section>`

    //Edit buttons functionality

    let editButtons = document.querySelectorAll(".editButton");
    editButtons.forEach(editButton => {
      editButton.addEventListener("click", () => {
        console.log(doc.data().date);

        //show edit input and submit button
        let editInput = document.getElementById(editButton.id + "input");
        let inputSub = document.getElementById(editButton.id + "submit");
        let postToEdit = document.getElementById(editButton.id + "post");
        let iconsSect = document.getElementById(editButton.id + "icons");

        editInput.style.display="block";
        inputSub.style.display="block";
        postToEdit.style.display="none";
        iconsSect.style.display="none";
        inputSub.addEventListener("click", () => {
          editInput.style.display="none";
          inputSub.style.display="none";
          postToEdit.style.display="block";
          iconsSect.style.display="block";
          updatePost();
          });
      });

   // Beginning-Function to edit/update real-time

//   document.addEventListener("DOMContentLoaded", event => {
//     let myPost = db.collection("posts").doc(editButton.id);

//   myPost.onSnapshot(doc => {
//         const data = doc.data();
//        document.querySelector(".pubPost").innerHTML = data.text;
//     })
// });
const updatePost = () => {

  let myPost = posts.doc(editButton.id);
  console.log(myPost);
  let editPostInput = document.getElementById(editButton.id + "input");
  myPost.set({
    text: editPostInput.value,
    date: new Date()
  });
}

});
}
//End-Function to edit/update real-time

  // posts.orderBy("date","desc").get().then((snapshot) => {
    //   snapshot.docs.forEach(doc => {
      //       console.log(doc.data());
      //       publishPost(doc);
      //   })
      // });
      posts.orderBy("date", "desc").onSnapshot(function(doc){
        document.getElementById("timelinePosted").innerHTML = "";
        const array = doc.docs;
        array.forEach(element => {
          publishPost(element)
        });
      })


  //End-Function to show published posts

/* Beginning-Edit profile user function*/
const profileUser =  () => {
  document.getElementById('id01').style.display="block";
  let  profileModal= document.getElementById("w3-form");
  profileModal.innerHTML = "<section class='profileUser'><p>Seleccione foto de usuario.</p><label class='btn btn-file'><input type = 'file' name= 'fichero' values = '' id = 'fichero' class = 'hidden'></label></section>";

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
    loginError.innerHTML = `
    <span style='color:#5BD9CC';>&#10004; Ha cerrado sesión correctamente</span>`;
      icons.style.display === "block"
      icons.style.display = "none";
      topNav.style.height = "12vh";
      barsBack.style.backgroundColor="#5BD9CC";
      profile.style.display = "inline";
      logo.style.display = "inline";

  });
};
/* End-Log out function to close user session */

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", signUp);
document.getElementById("registerConfirm").addEventListener("click", confirmedSignUp);
document.querySelector(".icon").addEventListener("click", mobileMenu);
document.getElementById("profileButton").addEventListener("click", profileUser);
document.getElementById("postButton").addEventListener("click", createPost);
document.getElementById("settingsButton").addEventListener("click", logOut);
