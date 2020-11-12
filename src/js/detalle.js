import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
verificarUser();
dibujarDetalles();

function dibujarDetalles() {
  let codigoJuego = JSON.parse(localStorage.getItem("codigoKey"));
  console.log(codigoJuego);
  detallesJuego(codigoJuego);
}

function detallesJuego(codigo) {
  let productosLS = JSON.parse(localStorage.getItem("productoKey"));
  let sliderDetalles = document.getElementById("sliderDetalles");
  let sectionDetalles = document.getElementById("sectionDetalles");
  let juegoFiltrado = productosLS.filter(function (producto) {
    return producto.codigo == codigo;
  });
  //Cambiamos el title
  document.title = juegoFiltrado[0].nombre;
  //Dibujamos el slider
  let sliderHTML = `
    <div class="carousel-item active sliderImg">
        <img src="img/${juegoFiltrado[0].imagen2}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item sliderImg">
        <img src="img/${juegoFiltrado[0].imagen3}" class="d-block w-100" alt="...">
    </div>`;
  sliderDetalles.innerHTML += sliderHTML;

  //Preguntamos si el campo iframeurl esta vacio o no
  if (juegoFiltrado[0].iframeurl != "") {
    //Si el campo no esta vacio, dibujamos la seccion con el iframe
    let detallesHTML = `<div class="row">
        <!--iframe-Juego Detalles-->
        <div class="col-12 mt-4 p-2 text-center iframeDisplay">
            <iframe class="" width="100%" height="" src="${juegoFiltrado[0].iframeurl}"
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>
        <div class="col-12 p-1 mt-1">
            <!--Detalles-->
            <h1 class="text-light">${juegoFiltrado[0].nombre}</h1>
            <h3 class="text-light">${juegoFiltrado[0].categoria}</h3>
            <p class="descripcionDetalles">${juegoFiltrado[0].descripcionLarga}</p>
        </div>
    </div>`;
    sectionDetalles.innerHTML += detallesHTML;
  } else {
    //Si el campo esta vacio, dibujamos la seccion sin el iframe
    let detallesHTML = ` <div class="my-4">
        <h1 class="text-light">${juegoFiltrado[0].nombre}</h1>
        <h3 class="text-light">${juegoFiltrado[0].categoria}</h3>
        <p>${juegoFiltrado[0].descripcionLarga}</p>
    </div>`;
    sectionDetalles.innerHTML += detallesHTML;
  }
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
