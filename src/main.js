/*Begining-Delete post function*/
let deleteButtons = document.querySelectorAll(".deleteButton");
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener("click", () => {
    console.log(doc.data().date);
    //Creating and showing delete Modal
    document.getElementById('id01').style.display="block";
    let deleteModal = document.getElementById("w3-form");
    deleteModal.innerHTML = `
    <section class="deleteConfirmationMessage">
    <p>¿Seguro que desea eliminar la publicación?</p>
    <button type="button" id="${ doc.id }accept" class="deleteAcceptButton">Aceptar</button>
    <button type="button" id="${ doc.id }cancel" class="deleteCancelButton">Cancelar</button>
    </section>
    `;
    //Adding functionality to the Accept and Cancel modal buttons
    let deleteAccept = document.getElementById(deleteButton.id + "accept");
    let deleteCancel = document.getElementById(deleteButton.id + "cancel");
    /*deleteAccept.addEventListener("click", () => {
      deletePost();
    });*/
    deleteCancel.addEventListener("click", () => {
      document.getElementById('id01').style.display="none";
    });
  });
});
const deletePost = () => {
  let myDeletedPost = posts.doc(deleteButton.id);
  console.log(myDeletedPost);
  let deletePostInput = document.getElementById(deleteButton.id + "input");
  posts.doc("DC").delete().then(function() {
    console.log("La publicación ");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
};
/*End-Delete post function*/

