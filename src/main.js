//window.onload = inicializar;
//prueba@gmail.com 1234567

let fichero;
let storageRef;
let fotoUsuarioRef;

 const inicializar = () => {
 fichero = document.getElementById("fichero");
 fichero.addEventListener("change", subirImagenAFirebase, false);

storageRef = firebase.storage().ref();
fotoUsuarioRef = firebase.database().ref().child("fotousuario");

mostrarImagenDeFirebase();

}

const mostrarImagenDeFirebase = () =>{
    fotoUsuarioRef.on("value", function(snapshot){
        let datos = snapshot.val();
        let result = "";
        for( let key in datos){
            result += '<img src = "' + datos[key].url + '"/>';
        }
        document.getElementById("imagenFirebase").innerHTML = result;
    })
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
    
     let downloadURL = uploadTask.snapshot.downloadURL;
     crearNodoFotoUsuario(imagenAsubir.name,downloadURL);
     //alert("Se subio la imagen con url" + downloadURL);
    
  });
}
 
const crearNodoFotoUsuario  = (nombreImagen, downloadURL) => {
    fotoUsuarioRef.push({ nombre : nombreImagen, url: downloadURL});
}