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
      text: 'Ingresa tu e-mail para enviarte el documento al correo',
      inputPlaceholder: "e-mail",
      showCancelButton: false,
      closeOnConfirm: false
    }, function(inputvalue) {
      if (validateEmail(inputvalue)){
        sendEmail(inputvalue, doc);
      }else{
         swal.showInputError("¡Debes ingresar tu correo!");
         return false
      }
    }
  );
}

function sendEmail(email, doc){

  $.post( "/send_document", {email: email, document: doc})
    .fail(function() {
      swal({
        title: ":-(",
        type: "error",
        html: true,
        text: 'Tenemos un problema! Envíanos un correo a ' +
          '<a href="mailto:piachangl@gmail.com">piachangl@gmail.com</a> para solucionarlo!'
      });
    });

  swal({
    title: ":-)",
    type: "success",
    html: true,
    text: 'Hemos enviado el documento a tu correo: <strong>' +
    email + '</strong>'
  });
    //

  // agradecer y decir que pronto le llegará

}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
