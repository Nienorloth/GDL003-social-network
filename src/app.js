
/* Make a variable with each of the Firebase tools and universal variables */
const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();
let usersColl = db.collection("users");
let posts = db.collection("posts");
const toPost = document.getElementById("toPost");
let logedUser = "";
let postUser = "";

/* Listen when user auth status changes */
auth.onAuthStateChanged(user => {
  if (user) {
    logedUser = user;
    console.log("Usuario inició sesión", user);
    document.getElementById("timeLine").style.display="block";
    document.getElementById("loginPage").style.display="none";
    toPost.value= "";
  } else {
    logedUser= "Visitante";
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
      return db.collection("users").doc(correct.user.uid).set({
        name: registeredName,
        email: registeredEmail,
        uid: correct.user.uid
      }).then(() => {
      registerModal.innerHTML = `
      <section class="registerCorrectMessage">
      <p>Su cuenta se ha registrado correctamente, por favor inicie sesión.</p>
      <img src="Images/greenCheck.png" alt="Creación de usuario correcta" class="correctRegisterImage"/>
      </section>
      `
      });
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

/* Beginning-Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
const icons = document.getElementById("myLinks");
const topNav = document.querySelector(".topnav");
const barsBack = document.querySelector(".icon");
const profile = document.getElementById("port");
const logo = document.getElementById("timelineLogo");

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

//Beggining-Function to save post on db
const toLike = document.getElementById("toLike");

const createPost = () => {
  let postModal = document.getElementById("w3-form");

  if (toPost.value.length === 0) {
  document.getElementById("id01").style.display="block";
  postModal.innerHTML =
  `<section class="enterContent">
      <p>⚠️ Agrega contenido para publicar</p>
      </section>
      `
  } else {
    let postName = localStorage.getItem("postName");
  posts.add({
       name: postName,
       text: toPost.value,
       date: new Date(),
       likes: totalLikes,
       day: new Date().toLocaleDateString(),
       hour: new Date().toLocaleTimeString()

})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

toPost.value="";
}
};
//End-Function to save post on db

let userName = "";
let array = "";

posts.orderBy("date", "desc").onSnapshot(function(doc){
  document.getElementById("timelinePosted").innerHTML = "";
  array = doc.docs;
  usersColl.doc(logedUser.uid).get().then(doc => {
    publishPost();
  });
  })

//Beggining-Function to show posts
  const publishPost = () => {
   array.forEach(doc => {
    document.getElementById("timelinePosted").innerHTML+=
     `<section id="${ doc.id }post" class="publishedPosts">
        <p id="name" class="pubPost">${ doc.data().name }  dice:</p>
        <p  class="pubPost">${ doc.data().text }</p>
        <footer>
          <p class="date">Publicado el ${ doc.data().day } ${ doc.data().hour }</p>
        </footer>
      </section>
      <section>
        <input id="${ doc.id }input" type="text" value="${ doc.data().text }" class="edit" size="32" style="display:none"></input>
        <input id="${ doc.id }submit" class="submit" style="display:none" type="submit" value="Guardar cambios">
        <button id="${ doc.id }cancel" class="cancel" style="display:none">Cancelar</button>
      </section>
      <section id="${doc.id}icons" class="postIcons">
        <img id="${ doc.id }" class="likeButton"  src="Images/like.png" alt="like" width="20">
        <span class = "likesCounter"><a id="likesCounter">0</a></span>
        <img id="${ doc.id }"class="editButton" src="Images/icon-edit.png" alt="editar" width="20"/>
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
        let cancelButton = document.getElementById(editButton.id + "cancel");

        cancelButton.style.display="inline";
        editInput.style.display="block";
        inputSub.style.display="inline";
        postToEdit.style.display="none";
        iconsSect.style.display="none";
        inputSub.addEventListener("click", () => {
          editInput.style.display="none";
          inputSub.style.display="none";
          cancelButton.style.display="none";
          postToEdit.style.display="block";
          iconsSect.style.display="block";
          updatePost();
          });
        cancelButton.addEventListener("click", () => {
          editInput.style.display="none";
          inputSub.style.display="none";
          cancelButton.style.display="none";
          postToEdit.style.display="block";
          iconsSect.style.display="block";
        })
      });
    });

const updatePost = () => {

  let myPost = posts.doc(editButton.id);
  console.log(myPost);
  let editPostInput = document.getElementById(editButton.id + "input");
  myPost.set({
    text: editPostInput.value,
    date: new Date(),
    day: new Date().toLocaleDateString(),
    hour: new Date().toLocaleTimeString()
  });
}

});
};

 //End-Function to show published posts

/*Beggining- Function to count I like*/

let likesButtons = document.querySelectorAll(".likeButton");
likesButtons.forEach(likeButton => {
  likeButton.addEventListener("click", () => {
    let totalLike = document.getElementById(likeButton.id + "like");


  function countLike(ref) {
    let myLike = posts.doc(likeButton.id);
  console.log(myLike);
    return ref.collection('post').get().then(snapshot => {
        let totalLikes = 0;
        snapshot.forEach(doc => {
          totalLikes += doc.data().likes;
        });

        return totalLikes;
    });
}
  
  });
});

/*Beggining- Function to count I like*/

/*End- Function to count I like*/

/* Beginning-Edit profile user function*/
const profileUser =  () => {

  document.getElementById('id01').style.display="block";
  let  profileModal= document.getElementById("w3-form");
  profileModal.innerHTML = `
  <section class='profileUser'>
  <h4>Editar perfil de usuario.</h4>
  <div class ="profileUserImage">
  <label class='btn btn-file'>
  <input type = 'file' name= 'fichero' values = '' id = 'fichero' class = 'hidden'>
  <img  class = 'imageUser' id='imageUser' src='Images/user.png' style= 'text-align:center'>
  </label>
  </div>
  <label for="registerNamel">Nombre:</label>
  <input type="text" id="registerName" class="registerName" name="registerName" placeholder="Ingrese Nombre de usuario...">
  <button type="button" id="acceptButton" class="acceptButton">Aceptar</button>
  </section>`


  document.getElementById("acceptButton").addEventListener("click", () => {
    let userName = document.getElementById("registerName").value;
   localStorage.setItem("postName", userName);
    let postName = localStorage.getItem("postName");
    db.collection("users").doc(logedUser.uid).set({
      name: postName,
      email: logedUser.email,
      uid: logedUser.uid
    }).then(() => {
      profileModal.innerHTML = `
      <section class='profileUser'>
      <h4>Editar perfil de usuario.</h4>
      <div class ="profileUserImage">
      <label class='btn btn-file'>
      <img  class = 'imageUser' id='imageUser' src='Images/user.png' style= 'text-align:center'>
      <span>${logedUser.name}</span>
      </label>
      </div>
      <label for="registerNamel">Nombre:</label>
      <input type="text" id="registerName" class="registerName" name="registerName" placeholder="Ingrese Nombre de usuario...">
      <button type="button" id="acceptButton" class="acceptButton">Aceptar</button>
      </section>`
      postUser = logedUser.name;
    });

  });


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

/*Beginning - Function add contacts */
const addContacts =  () =>{
  document.getElementById('id01').style.display="block";
  let  contactsModal= document.getElementById("w3-form");
  contactsModal.innerHTML = `
  <section class='profileUser'>
  <h4>Agregar nuevos contactos.</h4>
  </section>`

};
/*End-Function add contacts */

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
document.getElementById("postButton").addEventListener("click", createPost);
document.getElementById("profileButton").addEventListener("click", profileUser);
document.getElementById("contactsButton").addEventListener("click",addContacts);
document.getElementById("settingsButton").addEventListener("click", logOut);
