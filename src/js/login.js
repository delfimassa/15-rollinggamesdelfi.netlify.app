import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Swal from "sweetalert2";

let invalidUser = document.getElementById("user");
let invalidPassword = document.getElementById("password");
let invalidImagen1 = document.getElementById("imgLogin1");
let invalidImagen2 = document.getElementById("imgLogin2");
verificarUser();

window.validarUser = function () {
  let user = document.getElementById("user").value.toUpperCase();
  if (user == "") {
    invalidUser.className = "form-control is-invalid";
    invalidImagen1.className = "fondoLogin1-invalid";
    invalidImagen2.className = "fondoLogin2-invalid";
    document.getElementById("feedbackUser").innerText =
      "Debe ingresar un usuario.";
    return false;
  } else {
    invalidUser.className = "form-control";
    invalidImagen1.className = "fondoLogin1";
    invalidImagen2.className = "fondoLogin2";
    return true;
  }
};

window.validarPassword = function () {
  let password = document.getElementById("password").value.toUpperCase();
  if (password == "") {
    invalidPassword.className = "form-control is-invalid";
    invalidImagen1.className = "fondoLogin1-invalid";
    invalidImagen2.className = "fondoLogin2-invalid";
    document.getElementById("feedbackPassword").innerText =
      "Debe ingresar una contraseña.";
    return false;
  } else if (password.length < 8) {
    invalidPassword.className = "form-control is-invalid";
    invalidImagen1.className = "fondoLogin1-invalid";
    invalidImagen2.className = "fondoLogin2-invalid";
    document.getElementById("feedbackPassword").innerText =
      "La contraseña debe tener mas de 8 caracteres.";
    return false;
  } else {
    invalidPassword.className = "form-control";
    invalidImagen1.className = "fondoLogin1";
    invalidImagen2.className = "fondoLogin2";
    return true;
  }
};

window.login = function (event) {
  event.preventDefault();
  let user = document.getElementById("user").value.toUpperCase();
  let password = document.getElementById("password").value.toUpperCase();
  validarPassword();
  validarUser();
  // Usuarios: (Para agregar uno nuevo se puede agregar un nuevo "else if" manteniendo el contenido del centro.)
  if (user == "ADMIN" && password == "ADMINISTRADOR") {
    console.log("Login Correcto.");
    location.href = "admin.html";
    localStorage.setItem("userKey", JSON.stringify("admin"));
  } else if (user == "OTROUSUARIO" && password == "12345678") {
    console.log("Login Correcto.");
    location.href = "admin.html";
    localStorage.setItem("userKey", JSON.stringify("admin"));
  }
  //Modifica pagina en caso de usuario incorrecto:
  else {
    if (validarPassword() == true && validarUser() == true) {
      // Alert
      Swal.fire(
        "¡Inicio de Sesion Incorrecto!",
        "El usuario ingresado o la contraseña son incorrectos.",
        "warning"
      );
      invalidImagen1.className = "fondoLogin1-invalid";
      invalidImagen2.className = "fondoLogin2-invalid";
      document.getElementById("feedbackPassword").innerText =
        "Verificar contraseña.";
      invalidPassword.className = "form-control is-invalid";
      document.getElementById("feedbackUser").innerText = "Verificar usuario.";
      invalidUser.className = "form-control is-invalid";
    }
  }
};

window.recuperarContraseña = function (event) {
  event.preventDefault();
  let input = document.getElementById("recuperar");
  let expresion = /\w+@+\w+\.[a-z]/;
  if (input.value != "" && expresion.test(input.value)) {
    let template_params = {
      to_name: "Administrador",
      from_name: document.getElementById("recuperar").value,
    };

    let service_id = "default_service";
    let template_id = "recupero";
    emailjs.send(service_id, template_id, template_params).then(
      function (response) {
        console.log(response);
        Swal.fire(
          "¡Correcto!",
          "Un administrador se comunicara por medio del mail informado para ayudar a recuperar tu contraseña.",
          "info"
        ).then(function () {
          location.reload();
        });
      },
      function (error) {
        input.className = "form-control w-100 is-invalid";
        document.getElementById("feedback").innerText =
          "Ocurrio un error intente mas tarde.";
      }
    );
  } else {
    input.className = "form-control w-100 is-invalid";
    document.getElementById("feedback").innerText =
      "Debe ingresar un email valido.";
  }
};

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
    document.getElementById("registroNavbar").className = "dropdown-item";
    document.getElementById("loginNavbar").className =
      "dropdown-item lead-active";
    document.getElementById("cerrarsesionNavbar").className =
      "d-none dropdown-item";
    document.getElementById("adminNavbar").className = "nav-link  d-none";
    document.getElementById("dividerNav").className = "dropdown-divider";
  }
}

/*BOTON PARA CERRAR SESION*/
window.cerrarSesion = function () {
  let user = "";
  localStorage.setItem("userKey", JSON.stringify(user));
  location.href = "index.html";
};
