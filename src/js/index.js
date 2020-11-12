import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";

verificarUser();

// DESTACADO
destacar();
function destacar() {
  let productoLS = JSON.parse(localStorage.getItem("productoKey"));
  for (let i in productoLS) {
    if (productoLS[i].publicado == true && productoLS[i].destacado == true) {
      document.getElementById("destacado").innerHTML = `<div class="row">
    <div class="col-lg-8 p-0">
        <section class="carrusel h-100">
            <div id="carouselExampleIndicators" class="carousel slide h-100" data-ride="carousel">
                <div class="carousel-inner h-100">
                    <div class="carousel-item active h-100">
                        <img src="img/${productoLS[i].imagen2}" class="d-block h-100 w-100" alt="${productoLS[i].nombre}">
                    </div>
                    <div class="carousel-item h-100">
                        <img src="img/${productoLS[i].imagen3}" class="d-block h-100 w-100" alt="${productoLS[i].nombre}">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                    data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button"
                    data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </section>
    </div>
    <div class="col-lg-4 my-auto">
        <a role="button" onclick="abrirDetalles(this.id)" id="${productoLS[i].codigo}"><h1 class="display-5 text-light mt-2 w-100">${productoLS[i].nombre}</h1></a>
        <p class="lead mb-1 w-100 descripcionIndex">${productoLS[i].descripcion}</p>
        <p>Categoria: ${productoLS[i].categoria}</p>
    </div>
</div>`;
    }
  }
}

// CATEGORIA
categArcade();
function categArcade() {
  let productoLS = JSON.parse(localStorage.getItem("productoKey"));
  let arcadeJS = document.getElementById("ARCADE");
  for (let i in productoLS) {
    if (
      productoLS[i].publicado == true &&
      productoLS[i].categoria == "Arcade, supervivencia y aventuras"
    ) {
      let htmlCateg = `<div class="col-6 col-md-2">
            <div class="card" style="width:100%">
                <img src="img/${productoLS[i].imagen1}" class="card-img-top" alt="${productoLS[i].nombre}" style="width:100%">
                <div class="card-body">
                    <a class="text-light" href="#" onclick="abrirDetalles(this.id)" id="${productoLS[i].codigo}">
                        <h5 class="card-title nombreIndex">${productoLS[i].nombre}</h5>
                    </a>
                </div>
            </div>
        </div> `;
      arcadeJS.innerHTML += htmlCateg;
    }
  }
}

categAccion();
function categAccion() {
  let productoLS = JSON.parse(localStorage.getItem("productoKey"));
  let accionJS = document.getElementById("ACCION");
  for (let i in productoLS) {
    if (
      productoLS[i].publicado == true &&
      productoLS[i].categoria == "Acción, supervivencia y guerra"
    ) {
      let htmlCateg = `<div class="col-6 col-md-2">
            <div class="card" style="width:100%">
                <img src="img/${productoLS[i].imagen1}" class="card-img-top" alt="${productoLS[i].nombre}" style="width:100%">
                <div class="card-body">
                    <a class="text-light" href="#" onclick="abrirDetalles(this.id)" id="${productoLS[i].codigo}">
                        <h5 class="card-title nombreIndex">${productoLS[i].nombre}</h5>
                    </a>
                </div>
            </div>
        </div> `;
      accionJS.innerHTML += htmlCateg;
    }
  }
}

categSimulacion();
function categSimulacion() {
  let productoLS = JSON.parse(localStorage.getItem("productoKey"));
  let simulacionJS = document.getElementById("SIMULACION");
  for (let i in productoLS) {
    if (
      productoLS[i].publicado == true &&
      productoLS[i].categoria == "Simulación"
    ) {
      let htmlCateg = `<div class="col-6 col-md-2">
            <div class="card" style="width:100%">
                <img src="img/${productoLS[i].imagen1}" class="card-img-top" alt="${productoLS[i].nombre}" style="width:100%">
                <div class="card-body">
                    <a class="text-light" href="#" onclick="abrirDetalles(this.id)" id="${productoLS[i].codigo}">
                        <h5 class="card-title nombreIndex">${productoLS[i].nombre}</h5>
                    </a>
                </div>
            </div>
        </div> `;
      simulacionJS.innerHTML += htmlCateg;
    }
  }
}
// PROXIMAMENTE
categProximamente();
function categProximamente() {
  let productoLS = JSON.parse(localStorage.getItem("productoKey"));
  let proximamenteJS = document.getElementById("categoriaProximamente");
  for (let i in productoLS) {
    if (
      productoLS[i].publicado == true &&
      productoLS[i].categoria == "Proximamente"
    ) {
      let htmlCateg = `   <div class="col-md-6">
            <img src="img/${productoLS[i].imagen2}" class="img-fluid d-block w-100 mt-3" alt="${productoLS[i].nombre}">
            <a class="text-light" href="#" onclick="abrirDetalles(this.id)" id="${productoLS[i].codigo}">
                <h5 class="card-title nombreIndex mt-2">${productoLS[i].nombre}</h5>
            </a>
        </div>`;
      proximamenteJS.innerHTML += htmlCateg;
    }
  }
}

//FUNCION PARA ABRIR PANTALLA DE DETALLES DE JUEGOS
window.abrirDetalles = function (codigo) {
  let codigoDetalle = codigo;
  localStorage.setItem("codigoKey", JSON.stringify(codigoDetalle));
  location.href = "detalle.html";
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
