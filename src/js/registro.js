import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Swal from "sweetalert2";

verificarUser();

window.requiereNombre = function (input) {
  if (input.value != "") {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

window.requiereApellido = function (input) {
  if (input.value != "") {
    input.className = " form-control is-valid";
    return true;
  } else {
    input.className = " form-control is-invalid";
    return false;
  }
};

window.requiereMail = function (input) {
  let expresionRegular = /\w+@\w+\.[a-z]/;

  if (input.value != "" && expresionRegular.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

window.requierePass = function (input) {
  if (input.value.length >= 8) {
    input.className = "form-control is-valid";

    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

window.requiereNumero = function (input) {
  if (input.value != "" && !isNaN(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

window.requiereCondiciones = function (input) {
  if (input.checked) {
    input.className = "form-check-input is-valid";
    return true;
  } else {
    input.className = "form-check-input is-invalid";
    return false;
  }
};

window.formularioRegistro = function (e) {
  e.preventDefault();
  if (
    requiereNombre(document.getElementById("nombreRegistro")) &&
    requiereApellido(document.getElementById("apellidoRegistro")) &&
    requiereMail(document.getElementById("mailRegistro")) &&
    requierePass(document.getElementById("passRegistro")) &&
    requiereNumero(document.getElementById("telefonoRegistro")) &&
    requiereCondiciones(document.getElementById("checkboxRegistro"))
  ) {
    console.log("Registro ok.");
    enviarEmail();
  } else {
    requiereNombre(document.getElementById("nombreRegistro"));
    requiereApellido(document.getElementById("apellidoRegistro"));
    requiereMail(document.getElementById("mailRegistro"));
    requierePass(document.getElementById("passRegistro"));
    requiereNumero(document.getElementById("telefonoRegistro"));
    requiereCondiciones(document.getElementById("checkboxRegistro"));
    Swal.fire(
      "¡Datos incompletos!",
      "Debe completar todos los datos para poder continuar.",
      "warning"
    );
  }
};

function enviarEmail() {
  let template_params = {
    to_name: "Administrador",
    from_name: document.getElementById("apellidoRegistro").value,
    message_html: `Datos para registrar:<br>
                    Nombre: ${
                      document.getElementById("nombreRegistro").value
                    } ${document.getElementById("apellidoRegistro").value}<br>
                    Email: ${document.getElementById("mailRegistro").value}<br>
                    Contraseña: ${
                      document.getElementById("passRegistro").value
                    }<br>
                    Telefono: ${
                      document.getElementById("telefonoRegistro").value
                    }`,
  };

  let service_id = "default_service";
  let template_id = "template_vNQrBfhj";
  emailjs.send(service_id, template_id, template_params).then(
    function (response) {
      console.log(response);
      Swal.fire(
        "¡Correcto!",
        "Los datos fueron enviados a un administrador que se pondra en contacto para continuar con el registro.",
        "success"
      ).then(function () {
        location.reload();
      });
    },
    function (error) {
      console.log(error);
      Swal.fire(
        "Ocurrio un error...",
        "Por favor, reintente mas tarde..",
        "error"
      ).then(function () {
        location.reload();
      });
    }
  );
}

/*VERIFICADOR DE USUARIO ADMIN*/
function verificarUser() {
  let userLS = JSON.parse(localStorage.getItem("userKey"));
  if (userLS == "admin") {
    document.getElementById("registroNavbar").className =
      "dropdown-item d-none";
    document.getElementById("loginNavbar").className = "dropdown-item d-none";
    document.getElementById("cerrarsesionNavbar").className = "dropdown-item";
    document.getElementById("adminNavbar").className = "nav-link";
    document.getElementById("dividerNav").className = "dropdown-divider d-none";
  } else {
    document.getElementById("registroNavbar").className =
      "dropdown-item lead-active";
    document.getElementById("loginNavbar").className = "dropdown-item";
    document.getElementById("cerrarsesionNavbar").className =
      "d-none dropdown-item";
    document.getElementById("adminNavbar").className =
      "nav-link lead-active d-none";
    document.getElementById("dividerNav").className = "dropdown-divider";
  }
}

/*BOTON PARA CERRAR SESION*/
window.cerrarSesion = function () {
  let user = "";
  localStorage.setItem("userKey", JSON.stringify(user));
  location.href = "index.html";
};
