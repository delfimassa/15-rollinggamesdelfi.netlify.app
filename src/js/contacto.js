import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";

verificarUser();

window.requerido = function (input) {
  if (input.value != "") {
    //   el input tiene texto
    input.className = "form-control is-valid";
    return true;
  } else {
    // el input este vacio
    input.className = "form-control is-invalid";
    return false;
  }
};

// // validar email

window.revisarEmail = function (input) {
  let expresion = /\w+@\w+\.[a-z]/;

  if (input.value != "" && expresion.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

window.revisarConsulta = function (consulta) {
  if (consulta.value.length >= 10) {
    consulta.className = "form-control is-valid";
    return true;
  } else {
    consulta.className = "form-control is-invalid";
    return false;
  }
};

// boton enviar

window.validarGeneral = function (event) {
  event.preventDefault();
  console.log("Desde la funcion validar general");
  if (
    requerido(document.getElementById("nombre")) &&
    revisarEmail(document.getElementById("email")) &&
    revisarConsulta(document.getElementById("consulta"))
  ) {
    enviarEmail();
  } else {
    requerido(document.getElementById("nombre"));
    revisarEmail(document.getElementById("email"));
    revisarConsulta(document.getElementById("consulta"));
    document.getElementById("msjEnvio").className = "alert alert-danger my-3";
    document.getElementById("msjEnvio").innerText =
      "Debe completar todos los campos";
  }
};

window.enviarEmail = function () {
  let template_params = {
    from_name: document.getElementById("nombre").value,
    to_name: "Juan Damichici",
    message_html: `email: ${document.getElementById("email").value} - ${
      document.getElementById("consulta").value
    }`,
  };
  let service_id = "default_service";
  let template_id = "template_iT1uMq0N";
  emailjs.send(service_id, template_id, template_params).then(
    function (response) {
      console.log(response);
      document.getElementById("msjEnvio").className =
        "alert alert-primary my-3";
      document.getElementById("msjEnvio").innerText =
        "Su consulta fue enviada.";
    },
    function (error) {
      console.log("error", error);
      document.getElementById("msjEnvio").className = "alert alert-danger my-3";
      document.getElementById("msjEnvio").innerText =
        "A ocurrido un error en el envio.";
    }
  );
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
