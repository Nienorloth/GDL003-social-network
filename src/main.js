//window.onload = inicializar;
//prueba@gmail.com 1234567

let fichero;
let storageRef;

 const inicializar = () => {
 fichero = document.getElementById("fichero");
 fichero.addEventListener("change", subirImagenAFirebase, false);

storageRef = firebase.storage().ref();
}

const subirImagenAFirebase = () => {
 let imagenASubir = fichero.files[0];
 let uploadTask = storageRef.child('fotoperfil/' + imagenASubir.name).put(imagenASubir);


uploadTask.on('state_changed', 
    function(snapshot){
    
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    
    alert("Hubo un error.")
  }, function() {
    
     var downloadURL = uploadTask.snapshot.downloadURL;
      alert("Se subio la imagen con url" + downloadURL);
    
  });
}
 