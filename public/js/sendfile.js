$(function(){

  $('.download-document').click(function(){
    event.preventDefault();
    require_email($(this).data("document"), $(this).data("name"));
  });

});

function require_email(doc, name){
  swal(
    {
      type: "input",
      title: name,
      text: 'Ingresa tu e-mail para mantenerte al tanto de nuestras publicaciones!',
      inputPlaceholder: "e-mail (opcional)",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: "Descargar",
      cancelButtonText: "Cancelar"
    },
    function(inputvalue) {
      if (inputvalue === false) return false;
      sendEmail(inputvalue, doc);
    }
  );
}

function sendEmail(email, doc){

  $.post( "/send_document", {email: email, document: doc})
    .done( function(data) {
        d = JSON.parse(data)
        window.location.href = d.file
      }
    )
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
