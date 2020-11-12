import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import $ from "jquery";
import Swal from "sweetalert2";
import "../css/style.css";

//Importo la clase desde el archivo juegos.js
import Producto from "./productos.js";

let listaProductos = [];
let productoExistente = false;
verificarUser();
leerDatos();

//LECTOR DE DATOS DE LS
function leerDatos() {
  if (localStorage.length > 0) {
    let productosLS = JSON.parse(localStorage.getItem("productoKey"));
    if (listaProductos.length == 0 && productosLS != null) {
      listaProductos = productosLS;
    }
    //Borramos las filas de la tabla
    borrarFilas();
    //Dibujamos nuevamente las filas de la tabla
    dibujarFilas(productosLS);
  }
}

//FUNCIONALIDAD BOTON PUBLICADO
window.publicador = function (id) {
  let checker = document.getElementById(`${id}`);
  if (checker.checked) {
    //Encontramos el producto en el arreglo de LS y modificamos el valor
    for (let i in listaProductos) {
      if (listaProductos[i].codigo == id) {
        listaProductos[i].publicado = true;
      }
    }
    //Actualizamos el arreglo de LS
    localStorage.setItem("productoKey", JSON.stringify(listaProductos));
  } else {
    //Encontramos el producto en el arreglo de LS y modificamos el valor
    for (let i in listaProductos) {
      if (listaProductos[i].codigo == id) {
        listaProductos[i].publicado = false;
      }
    }
    //Actualizamos el arreglo de LS
    localStorage.setItem("productoKey", JSON.stringify(listaProductos));
  }
};

//FUNCIONALIDAD BOTON DESTACADO
window.destacador = function (codigo) {
  //Encontramos el producto en el arreglo de LS y cambiamos el valor
  for (let i in listaProductos) {
    if (listaProductos[i].codigo == codigo) {
      if (listaProductos[i].destacado == false) {
        listaProductos[i].destacado = true;
        for (let i in listaProductos) {
          if (listaProductos[i].codigo != codigo) {
            listaProductos[i].destacado = false;
          }
        }
        localStorage.setItem("productoKey", JSON.stringify(listaProductos));
      } else {
        listaProductos[i].destacado = false;
        localStorage.setItem("productoKey", JSON.stringify(listaProductos));
      }
    }
  }
  leerDatos();
};

//FUNCIONALIDAD PARA DIBUJAR FILAS
function dibujarFilas(productosLS) {
  let tablaprod = document.getElementById("tablaProductos");
  let codigoHTML = "";
  for (let i in productosLS) {
    if (
      productosLS[i].publicado == false &&
      productosLS[i].destacado == false
    ) {
      codigoHTML = `<tr>
        <td class="tablaCodigo" scope="row">${productosLS[i].codigo}</th>
        <td class="tablaNombre">${productosLS[i].nombre}</td>
        <td class="tablaCategoria">${productosLS[i].categoria}</td>
        <td class="tablaDescripcion">${productosLS[i].descripcion}</td>
        <td>
            <label class="checkContainer">
                <input id="${productosLS[i].codigo}" onchange="publicador(this.id)" type="checkbox">
                <span class="checkmark"></span>
            </label>
        </td>
        <td class="opciones">
            <button onclick="eliminarProducto(${productosLS[i].codigo})" class="btnSizeCustom"><i class="far fa-trash-alt fa-1x"></i></button>
            <button onclick="abrirModificarProducto(${productosLS[i].codigo})"><i class="far fa-edit fa-1x"></i></button>
            <button onclick="destacador(${productosLS[i].codigo})"><i class="far fa-star fa-1x"></i></button>
        </td>
    </tr>`;
      tablaprod.innerHTML += codigoHTML;
    } else if (
      productosLS[i].publicado == true &&
      productosLS[i].destacado == false
    ) {
      codigoHTML = `<tr>
        <td class="tablaCodigo" scope="row">${productosLS[i].codigo}</th>
        <td class="tablaNombre">${productosLS[i].nombre}</td>
        <td class="tablaCategoria">${productosLS[i].categoria}</td>
        <td class="tablaDescripcion">${productosLS[i].descripcion}</td>
        <td>
            <label class="checkContainer">
                <input id="${productosLS[i].codigo}" onchange="publicador(this.id)" type="checkbox" checked>
                <span class="checkmark"></span>
            </label>
        </td>
        <td class="opciones">
            <button onclick="eliminarProducto(${productosLS[i].codigo})" class="btnSizeCustom"><i class="far fa-trash-alt fa-1x"></i></button>
            <button onclick="abrirModificarProducto(${productosLS[i].codigo})"><i class="far fa-edit fa-1x"></i></button>
            <button onclick="destacador(${productosLS[i].codigo})"><i class="far fa-star fa-1x"></i></button>
        </td>
    </tr>`;
      tablaprod.innerHTML += codigoHTML;
    } else if (
      productosLS[i].publicado == false &&
      productosLS[i].destacado == true
    ) {
      codigoHTML = `<tr>
        <td class="tablaCodigo" scope="row">${productosLS[i].codigo}</th>
        <td class="tablaNombre">${productosLS[i].nombre}</td>
        <td class="tablaCategoria">${productosLS[i].categoria}</td>
        <td class="tablaDescripcion">${productosLS[i].descripcion}</td>
        <td>
            <label class="checkContainer">
                <input id="${productosLS[i].codigo}" onchange="publicador(this.id)" type="checkbox">
                <span class="checkmark"></span>
            </label>
        </td>
        <td class="opciones">
            <button onclick="eliminarProducto(${productosLS[i].codigo})" class="btnSizeCustom"><i class="far fa-trash-alt fa-1x"></i></button>
            <button onclick="abrirModificarProducto(${productosLS[i].codigo})"><i class="far fa-edit fa-1x"></i></button>
            <button onclick="destacador(${productosLS[i].codigo})"><i class="fas fa-star fa-1x"></i></button>
        </td>
    </tr>`;
      tablaprod.innerHTML += codigoHTML;
    } else if (
      productosLS[i].publicado == true &&
      productosLS[i].destacado == true
    ) {
      codigoHTML = `<tr>
        <td class="tablaCodigo" scope="row">${productosLS[i].codigo}</th>
        <td class="tablaNombre">${productosLS[i].nombre}</td>
        <td class="tablaCategoria">${productosLS[i].categoria}</td>
        <td class="tablaDescripcion">${productosLS[i].descripcion}</td>
        <td>
            <label class="checkContainer">
                <input id="${productosLS[i].codigo}" onchange="publicador(this.id)" type="checkbox" checked>
                <span class="checkmark"></span>
            </label>
        </td>
        <td class="opciones">
            <button onclick="eliminarProducto(${productosLS[i].codigo})" class="btnSizeCustom"><i class="far fa-trash-alt fa-1x"></i></button>
            <button onclick="abrirModificarProducto(${productosLS[i].codigo})"><i class="far fa-edit fa-1x"></i></button>
            <button onclick="destacador(${productosLS[i].codigo})"><i class="fas fa-star fa-1x"></i></button>
        </td>
    </tr>`;
      tablaprod.innerHTML += codigoHTML;
    }
  }
}

//FUNCIONALIDAD PARA BORRAR FILAS
function borrarFilas() {
  let tablaprod = document.getElementById("tablaProductos");
  if (tablaprod.children.length > 0) {
    while (tablaprod.firstChild) {
      tablaprod.removeChild(tablaprod.firstChild);
    }
  }
}

//FUNCIONALIDAD PARA LIMPIAR FORMULARIO
window.limpiarForm = function () {
  let codigo = document.getElementById("codigo");
  let nombre = document.getElementById("nombre");
  let categoria = document.getElementById("categoriaForm");
  let descripcion = document.getElementById("descripcion");
  let descripcionLarga = document.getElementById("descripcionLarga");
  let imagen1 = document.getElementById("imagen1");
  let imagen2 = document.getElementById("imagen2");
  let imagen3 = document.getElementById("imagen3");
  let iframeurl = document.getElementById("iframeurl");
  let formProducto = document.getElementById("formProducto");
  document.getElementById("codigo").removeAttribute("disabled");
  formProducto.reset();
  codigo.className = "form-control";
  nombre.className = "form-control";
  categoria.className = "form-control";
  descripcion.className = "form-control";
  descripcionLarga.className = "form-control";
  imagen1.className = "form-control";
  imagen2.className = "form-control";
  imagen3.className = "form-control";
  iframeurl.className = "form-control";
  productoExistente = false;
};

//FUNCIONALIDAD BOTON ENVIAR -CHOOSER
window.agregarModificar = function (event) {
  event.preventDefault();
  if (productoExistente == false) {
    agregarProducto();
  } else {
    guardarProductoModificado();
  }
};

//FUNCIONALIDAD BOTON ENVIAR - NUEVO PRODUCTO
function agregarProducto() {
  //Traigo los valores del formulario y los defino como variables
  let codigo = document.getElementById("codigo");
  let nombre = document.getElementById("nombre");
  let categoria = document.getElementById("categoriaForm");
  let descripcion = document.getElementById("descripcion");
  let descripcionLarga = document.getElementById("descripcionLarga");
  let imagen1 = document.getElementById("imagen1");
  let imagen2 = document.getElementById("imagen2");
  let imagen3 = document.getElementById("imagen3");
  let iframeurl = document.getElementById("iframeurl");

  //Valido el formulario de manera general
  if (
    validarCodigo(codigo) &&
    campoRequerido(nombre) &&
    campoRequerido(categoria) &&
    descripcionBreve(descripcion) &&
    campoRequerido(descripcionLarga) &&
    campoRequerido(imagen1) &&
    campoRequerido(imagen2) &&
    campoRequerido(imagen3) &&
    validarUrl(iframeurl)
  ) {
    //Creamos un objeto nuevo con los valores que trajimos de los inputs del formulario
    let producto = new Producto(
      codigo.value,
      nombre.value,
      categoria.value,
      descripcion.value,
      descripcionLarga.value,
      imagen1.value,
      imagen2.value,
      imagen3.value,
      iframeurl.value
    );
    listaProductos.push(producto);
    localStorage.setItem("productoKey", JSON.stringify(listaProductos));
    leerDatos();
    limpiarForm();
    let ventanaModal = document.getElementById("modalProducto");
    $(ventanaModal).modal("hide");
  } else {
    validarCodigo(codigo);
    campoRequerido(nombre);
    campoRequerido(categoria);
    descripcionBreve(descripcion);
    campoRequerido(descripcionLarga);
    campoRequerido(imagen1);
    campoRequerido(imagen2);
    campoRequerido(imagen3);
    validarUrl(iframeurl);
    document.getElementById("validacionGeneral").className = "is-invalid";
  }
}

//FUNCIONALIDAD PARA ABRIR EL MODAL CON LOS DATOS CARGADOS
window.abrirModificarProducto = function (codigo) {
  //Buscar en el arreglo el objeto que tiene el codigo recibido por parametro
  let objetoEncontrado = listaProductos.find(function (producto) {
    return producto.codigo == codigo;
  });
  //Asignar al modal formulario los valores del objeto encontrado
  document.getElementById("codigo").value = objetoEncontrado.codigo;
  document.getElementById("codigo").setAttribute("disabled", "");
  document.getElementById("nombre").value = objetoEncontrado.nombre;
  document.getElementById("categoriaForm").value = objetoEncontrado.categoria;
  document.getElementById("descripcion").value = objetoEncontrado.descripcion;
  document.getElementById("descripcionLarga").value =
    objetoEncontrado.descripcionLarga;
  document.getElementById("imagen1").value = objetoEncontrado.imagen1;
  document.getElementById("imagen2").value = objetoEncontrado.imagen2;
  document.getElementById("imagen3").value = objetoEncontrado.imagen3;
  document.getElementById("iframeurl").value = objetoEncontrado.iframeurl;
  //Mostrar la ventana modal
  let ventanaModal = document.getElementById("modalProducto");
  $(ventanaModal).modal("show");
  productoExistente = true;
};

//FUNCIONALIDAD BOTON ENVIAR - PRODUCTO MODIFICADO
window.guardarProductoModificado = function () {
  //Traigo los valores del formulario y los defino como variables
  let codigo = document.getElementById("codigo");
  let nombre = document.getElementById("nombre");
  let categoria = document.getElementById("categoriaForm");
  let descripcion = document.getElementById("descripcion");
  let descripcionLarga = document.getElementById("descripcionLarga");
  let imagen1 = document.getElementById("imagen1");
  let imagen2 = document.getElementById("imagen2");
  let imagen3 = document.getElementById("imagen3");
  let iframeurl = document.getElementById("iframeurl");
  //Valido el formulario de manera general
  if (
    campoRequerido(nombre) &&
    campoRequerido(categoria) &&
    descripcionBreve(descripcion) &&
    campoRequerido(descripcionLarga) &&
    campoRequerido(imagen1) &&
    campoRequerido(imagen2) &&
    campoRequerido(imagen3) &&
    validarUrl(iframeurl)
  ) {
    //Buscar el producto que estaba modificando en el arreglo y actualizar los valores
    for (let i in listaProductos) {
      if (listaProductos[i].codigo == codigo.value) {
        listaProductos[i].nombre = nombre.value;
        listaProductos[i].categoria = categoria.value;
        listaProductos[i].descripcion = descripcion.value;
        listaProductos[i].descripcionLarga = descripcionLarga.value;
        listaProductos[i].imagen1 = imagen1.value;
        listaProductos[i].imagen2 = imagen2.value;
        listaProductos[i].imagen3 = imagen3.value;
        listaProductos[i].iframeurl = iframeurl.value;
      }
    }
    //Actualizar local Storage y dibujamos la tabla
    localStorage.setItem("productoKey", JSON.stringify(listaProductos));
    leerDatos();
    limpiarForm();
    let ventanaModal = document.getElementById("modalProducto");
    $(ventanaModal).modal("hide");
  } else {
    campoRequerido(nombre);
    campoRequerido(categoria);
    descripcionBreve(descripcion);
    campoRequerido(descripcionLarga);
    campoRequerido(imagen1);
    campoRequerido(imagen2);
    campoRequerido(imagen3);
    validarUrl(iframeurl);
    document.getElementById("validacionGeneral").className = "is-invalid";
  }
};

//FUNCIONALIDAD BOTON ELIMINAR
window.eliminarProducto = function (codigo) {
  Swal.fire({
    title: "Estas seguro?",
    text: "No podras revertir este cambio.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.value) {
      Swal.fire("Listo!", "El producto ha sido eliminado.", "success");
      let productosFiltrados = listaProductos.filter(function (producto) {
        return producto.codigo != codigo;
      });
      localStorage.setItem("productoKey", JSON.stringify(productosFiltrados));
      listaProductos = productosFiltrados;
      leerDatos();
    }
  });
};

//FUNCIONALIDAD PARA SORTEAR LA TABLA
window.sortTable = function (n) {
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("tablaProdAll");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
    no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
        first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
            one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
};

//VALIDACION DE FORMULARIO
window.validarCodigo = function (codigo) {
  let productosLS = JSON.parse(localStorage.getItem("productoKey"));
  if (codigo.value != "" && !isNaN(codigo.value)) {
    if (localStorage.lenght == 0 || productosLS == null) {
      codigo.className = "form-control is-valid";
      return true;
    } else {
      for (let i in productosLS) {
        if (productosLS[i].codigo == codigo.value) {
          alert(
            "No pueden existir codigos duplicados. Escriba un codigo unico."
          );
          codigo.className = "form-control is-invalid";
          return false;
        }
      }
      codigo.className = "form-control is-valid";
      return true;
    }
  } else {
    codigo.className = "form-control is-invalid";
    return false;
  }
};

window.descripcionBreve = function (input) {
  console.log(input.value.length);
  if (input.value != "" && input.value.length <= 230) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

window.countChars = function (obj) {
  if (obj.value.length == 0) {
    document.getElementById("charNum").className = "d-none";
  } else {
    document.getElementById("charNum").innerHTML =
      obj.value.length + " caracteres";
    document.getElementById("charNum").className = "text-info mb-0";
    document.getElementById("labelDescripcion").className = "mb-0";
  }
};

window.campoRequerido = function (input) {
  if (input.value != "") {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

window.validarUrl = function (urlIntroducida) {
  let expresion = /[(http(s)?:\/\/)]{7,8}[:\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (urlIntroducida.value != "") {
    if (expresion.test(urlIntroducida.value)) {
      urlIntroducida.className = "form-control is-valid";
      return true;
    } else {
      urlIntroducida.className = "form-control is-invalid";
      return false;
    }
  } else {
    urlIntroducida.className = "form-control";
    return true;
  }
};

/*LOADER OCULTO*/

window.cargarDatos = function () {
  let preLoad = [];
  let producto1 = new Producto(
    "01",
    "Windbound",
    "Arcade, supervivencia y aventuras",
    `Las Islas Prohibidas te llaman; descubre sus secretos Naufragaste, estás en una isla 
    y debes descubrir, adaptarte y explorar para sobrevivir.`,
    `Tras naufragar en una isla, explora, adáptate y recorre la tierra y los mares para sobrevivir.
    Como Kara, eres una guerrera a la que una feroz tormenta en el mar separó de su tribu. Tras caer a las turbulentas aguas, te ves arrojada a las costas de las Islas Prohibidas, un paraíso misterioso.
    Sin bote, ni comida ni herramientas, solo con tu voluntad y habilidad de supervivencia, descubre los abundantes recursos de esta hermosa isla. Fabrica utensilios y armas para cazar y defenderte de la naturaleza con su salvaje y fantástica fauna.
    Al explorar otras islas y las ruinas dispersas por la tierra, descubrirás secretos del pasado y atisbos del futuro. Desvela el misterio tras todas ellas y quizá encuentres algo más que el modo de volver a casa.`,
    "windbound-sm.png",
    "windbound-1.jpg",
    "windbound-2.jpg",
    "https://www.youtube.com/embed/Gfcxpb5kTR8"
  );
  preLoad.push(producto1);
  let producto2 = new Producto(
    "02",
    "Ark: survival evolved",
    "Arcade, supervivencia y aventuras",
    ` Varado a orillas de una isla misteriosa, debes aprender a sobrevivir. 
    Usa tu astucia para matar o domar a las criaturas primitivas que deambulan por el territorio, 
    ¡y encuentra a otros jugadores para sobrevivir, dominar y escapar!`,
    ` Varado a orillas de una isla misteriosa, debes aprender a sobrevivir. 
    Usa tu astucia para matar o domar a las criaturas primitivas que deambulan por el territorio, 
    ¡y encuentra a otros jugadores para sobrevivir, dominar y escapar!`,
    "ark-sm.png",
    "ark-1.jpg",
    "ark-2,jpg",
    "https://www.youtube.com/embed/5fIAPcVdZO8"
  );
  preLoad.push(producto2);
  let producto3 = new Producto(
    "03",
    "SpongeBob: Battle for Bikini Bottom",
    "Arcade, supervivencia y aventuras",
    ` ¿Están listos, chicos? El clásico de culto ha vuelto en su nueva versión.
    Juega como Bob Esponja, Patricio y Arenita para demostrarle 
    al malvado Plankton que ser un criminal es peor que trabajar para Don Cangrejo.`,
    `¿Estáis listos, chicos? ¡Vuelve un clásico de culto recreado con todo el esponjoso esplendor del original! Juega como Bob Esponja, Patricio y Arenita y demuéstrale a Plankton que el crimen paga aún menos que el Sr. Cangrejo. ¿Quieres salvar Fondo de Bikini de un montón de robots descontrolados con el poder de tus burbujas? ¡Claro que sí! ¿Quieres hacer puenting en ropa anterior? ¡¿Y quién no?! ¿Quieres unir fuerzas en un modo multijugador completamente nuevo? ¡Que comience la batalla!`,
    "bob-sm.png",
    "bob-1.png",
    "bob-2.jpg",
    "https://www.youtube.com/embed/q3sX703lW_w"
  );
  preLoad.push(producto3);
  let producto4 = new Producto(
    "04",
    "Kena: Bridge of Spirits",
    "Arcade, supervivencia y aventuras",
    ` Una aventura narrativa y de acción que combina exploración con ágiles combates. 
    Los jugadores se ponen en la piel de Kena para encontrar encantadores compañeros espirituales llamados Rot, 
    sumarlos al equipo, mejorar sus habilidades y crear nuevas formas de manipular el entorno.`,
    `La historia
    Kena, una joven guía espiritual, viaja a un pueblo abandonado en busca del templo de la montaña sagrada.  Allí lucha por desvelar los secretos de esta comunidad olvidada y oculta en un bosque donde vagan espíritus cautivos.
    Encuentra a los Rot
    Los tímidos e ilusorios espíritus se dispersaron por todo el bosque. Mantienen el equilibrio descomponiendo elementos muertos y putrefactos.
    Características principales
    Crea tu equipo: encuentra y reúne a Rot para obtener poderosas habilidades, realizar descubrimientos y transformar el entorno.
    Explora: un pueblo olvidado y una extraña maldición. Utiliza el poder del reino de los espíritus para restablecer su antigua majestuosidad.
    Combates frenéticos: los espíritus se han corrompido y, atrapados e incapaces de trascender, desafían a Kena a cada paso que da.
    `,
    "kena-sm.png",
    "kena-1.jpg",
    "kena-2.jpg",
    "https://www.youtube.com/embed/1aI_9mY7RgE"
  );
  preLoad.push(producto4);
  let producto5 = new Producto(
    "05",
    "Fortnite",
    "Arcade, supervivencia y aventuras",
    ` ¡Date un chapuzón de aventuras en la temporada 3 del capítulo 2! 
    Sobrevive a más que la tormenta en las secuelas de su venganza. 
    A medida que la isla se adapta a su inundada forma de vida, mantente a flote y enfréntate a enemigos y desafíos nuevos.`,
    `Capítulo 2 de Fortnite Luchad. Construid. Cread.
    Fortnite es el juego multijugador gratuito y en constante evolución en el que vosotros junto a vuestros amigos lucharéis para ser los últimos en pie o colaboraréis para crear un mundo de ensueño. Jugad a Battle Royale y al modo Creativo GRATIS. Descargadlo ya y lanzaos a la acción. La descarga también ofrece la opción de comprar la campaña JcE Salvar el mundo.`,
    "fortnite-sm.png",
    "fortnite-1.jpg",
    "fortnite-2.jpg",
    "https://www.youtube.com/embed/8A2W-mK6k-g"
  );
  preLoad.push(producto5);
  let producto6 = new Producto(
    "06",
    "The Last Campfire",
    "Arcade, supervivencia y aventuras",
    ` The Last Campfire es un juego de aventuras obra de Hello Games (No Man's Sky) y cuenta la historia de Ember que,
    atrapado en un lugar extraño, busca una motivación y una forma de volver a casa.`,
    `The Last Campfire es un juego de aventuras obra de Hello Games (No Man's Sky) y cuenta la historia de Ember que, atrapado en un lugar extraño, busca una motivación y una forma de volver a casa.`,
    "camp-sm.png",
    "camp-1.jpg",
    "camp-2.jpg",
    "https://www.youtube.com/embed/tBY6XUf3rxs"
  );
  preLoad.push(producto6);
  let producto7 = new Producto(
    "07",
    "SUPERHOT: Mind Control Delete",
    "Acción, supervivencia y guerra",
    `MIND CONTROL DELETE, creado sobre los cimientos de SUPERHOT y SUPERHOT VR,
    promete darte más de la emblemática fantasía de poder de SUPERHOT.`,
    `La avaricia no te hará libre. Pero aquí sigues. Quieres más. Muy bien. Sírvete. Sabes que esto no va a acabar bien. <br>
    Estás en medio de un tiroteo. Una lluvia de balas se acerca lentamente a tu cara. Ves a los enemigos de color rojo brillante congelados mientras corren hacia ti. Armas en mano, pisan los restos destrozados de aquellos a los que acabas de machacar.
    Todo es afilado. Reinan el silencio y la quietud. La luz parpadea a través de los fragmentos de cristal rojo que cubren el frío suelo de hormigón. Una pistola gira lentamente mientras vuela por el aire. Un enemigo la ha dejado caer cuando su cuerpo moribundo ha estallado en una lluvia de metralla roja brillante. Te quedas pensando unos segundos. Ya has estado aquí. Muchas veces. Quizá esta vez sí que signifique algo.
    Inspiras. Das un paso hacia un lado y esquivas. Alcanzas la pistola con la mano tal y como has hecho miles de veces antes. Empieza la acción. Esperas que esta vez sea diferente. <br>
    Desarrollado sobre los cimientos de SUPERHOT y SUPERHOT VR, MIND CONTROL DELETE te ofrece más de la fantasía de poder característica de SUPERHOT.
    El tiempo corre solo cuando te mueves. Los enemigos llegan de todas las direcciones. Tienes el control total mientras disparas, cortas y haces explotar a tus enemigos en multitud de combates cada vez más desafiantes. Cuanto más te acercas al núcleo, más fuerte te vuelves. Acumulas un arsenal de habilidades y armas. Descubres fragmentos de valioso conocimiento: ese significado que tanto ansías.
    Disparas y cortas. Avanzas. Y otra vez. Y otra vez. Y otra vez. Se vuelve un ritual. Empieza a cobrar significado de nuevo. El tercer juego de la franquicia SUPERHOT, MIND CONTROL DELETE, ofrece más información sobre el mundo de SUPERHOT, más historia y más jugabilidad. Sigue bailando el ballet de la destrucción a cámara lenta durante mucho más tiempo que nunca. <br>`,
    "mindcontrol-sm.png",
    "mindcontrol-1.jpg",
    "mindcontrol-2.jpg",
    "https://www.youtube.com/embed/rFAqvOASQrs"
  );
  preLoad.push(producto7);
  let producto8 = new Producto(
    "08",
    "Zombie Army 4: Dead War",
    "Acción, supervivencia y guerra",
    `¡Las hordas de Hitler regresan a por más en este aterrador juego de disparos de los creadores de Sniper 
    Elite 4! Abominables enemigos sobrenaturales, armas épicas y una horripilante nueva campaña de 1 a 4 
    jugadores te esperan en la Europa de los años 40. ¡Salva a la humanidad del apocalipsis zombi!`,
    `¡Las hordas de Hitler regresan a por más en este aterrador juego de disparos de los creadores de Sniper Elite 4! Abominables enemigos sobrenaturales, armas épicas y una horripilante nueva campaña de 1 a 4 jugadores te esperan en la Europa de los años 40. ¡Salva a la humanidad del apocalipsis zombi! <br>
    Una asombrosa campaña nueva
    La resistencia ha derrotado a la versión zombi de Hitler y lo ha mandado al infierno. ¡Pero los muertos han vuelto a alzarse y tienen más hambre que nunca! <br>
    ¡Continúa la versión alternativa de la historia iniciada con Zombie Army Trilogy en enormes nuevos niveles! ¡Destapa un siniestro plan que llevará a la brigada de supervivientes a través de Italia y más allá! <br>
    ¡Enfréntate a las fuerzas de la oscuridad en canales repletos de cadáveres, sobrevive al zoo de los zombis y aventúrate en la oscuridad hasta lugares inexplicables en los que nunca ha estado nadie antes... ¡y ha sobrevivido para contarlo! <br>
    Galardonado sistema de combate con armas
    Disfruta de un sistema de balística que revolucionó el género y por el que se hizo famosa la franquicia Sniper Elite de Rebellion. ¡Dale un buen uso acabando con las hordas de condenados! <br>`,
    "zombie-sm.png",
    "zombie-1.jpg",
    "zombie-2.jpg",
    "https://www.youtube.com/embed/w5TbuuHdNzc"
  );
  preLoad.push(producto8);
  let producto9 = new Producto(
    "09",
    "Chorus",
    "Acción, supervivencia y guerra",
    `Ponte en la piel de Nara, quien alguna vez fue la guerrera más letal del Círculo, pero ahora es la fugitiva más 
    buscada por ellos, y acompáñala en su misión para destruir el culto oscuro que la creó.`,
    `Ponte en la piel de Nara, una de las guerreras más mortíferas del Círculo y su fugitiva más buscada, en una misión para destruir la secta tenebrosa que la creó.`,
    "chorus-sm.png",
    "chorus-1.jpg",
    "chorus-2.jpg",
    "https://www.youtube.com/embed/2ItKZESXDLg"
  );
  preLoad.push(producto9);
  let producto10 = new Producto(
    "10",
    "Total War Saga: TROY",
    "Acción, supervivencia y guerra",
    ` En esta era legendaria, los héroes caminan por la tierra. En un acto que conmociona al mundo, el audaz Paris, 
    príncipe de Troya, huye con la bella reina de Esparta.
    Mientras zarpan, el rey Menelao la maldice. Jura recuperar a su esposa, ¡cueste lo que cueste!`,
    `Llega Total War Saga: TROY, un juego inspirado en la Ilíada, el extraordinario relato de amor y sangre de Homero. Esta entrega se centra en el punto álgido de la guerra de Troya y consigue revivir aquel conflicto histórico como nunca antes.`,
    "troy-sm.png",
    "troy-1.jpeg",
    "troy-2.jpg",
    "https://www.youtube.com/embed/4ZR3DGFwehw"
  );
  preLoad.push(producto10);
  let producto11 = new Producto(
    "11",
    "Death Stranding",
    "Acción, supervivencia y guerra",
    `Del legendario diseñador de videojuegos Hideo Kojima llega una experiencia completamente nueva que desafía los géneros.
    Sam Bridges debe enfrentarse a un mundo completamente transformado por la muerte en DEATH STRANDING. 
    Con los restos aislados de nuestro futuro en sus manos, se embarca en un viaje para volver a unir el fragmentado 
    mundo paso a paso.`,
    `Del legendario diseñador de videojuegos Hideo Kojima llega una experiencia completamente nueva que desafía los géneros.
    Sam Bridges debe enfrentarse a un mundo completamente transformado por la muerte en DEATH STRANDING. 
    Con los restos aislados de nuestro futuro en sus manos, se embarca en un viaje para volver a unir el fragmentado 
    mundo paso a paso.`,
    "death-sm.png",
    "death-1.jpg",
    "death-2.jpg",
    "https://www.youtube.com/embed/Gu8X7vM3Avw"
  );
  preLoad.push(producto11);
  let producto12 = new Producto(
    "12",
    "Rogue Company",
    "Acción, supervivencia y guerra",
    `El paquete de fundador estándar de Rogue Company da acceso anticipado al juego y todo lo que necesitas para luchar. 
    Consigue acceso a 8 mercenarios jugables extra, ¡además de 4 objetos estéticos para que hagas todas las 
    misiones con mucho estilo!`,
    `El paquete de fundador estándar de Rogue Company da acceso anticipado al juego y todo lo que necesitas para luchar. 
    Consigue acceso a 8 mercenarios jugables extra, ¡además de 4 objetos estéticos para que hagas todas las 
    misiones con mucho estilo!`,
    "rogue-sm.png",
    "rogue-1.jpg",
    "rogue-2.jpg",
    "https://www.youtube.com/embed/9THEZleh5x0"
  );
  preLoad.push(producto12);
  let producto13 = new Producto(
    "13",
    "Trackmania",
    "Simulación",
    `Trackmania, la franquicia de carreras de Ubisoft Nadeo, regresa con el remake más emocionante de Trackmania Nations.`,
    `Trackmania, la franquicia de carreras de Ubisoft Nadeo, regresa con el remake más emocionante de Trackmania Nations.`,
    "trackmania-sm.png",
    "trackmania-1.png",
    "trackmania-2.png",
    "https://www.youtube.com/embed/TQQOwnbuvsc"
  );
  preLoad.push(producto13);
  let producto14 = new Producto(
    "14",
    "Beyond Blue",
    "Simulación",
    `Beyond Blue es una aventura narrativa para un jugador que te lleva a las profundidades del corazón 
    azul que late en nuestro planeta.`,
    `Beyond Blue es una aventura narrativa para un jugador que te lleva a las profundidades del corazón 
    azul que late en nuestro planeta.`,
    "blue-sm.png",
    "blue-1.jpg",
    "blue-2.jpg",
    "https://www.youtube.com/embed/pOAWBCXpo6k"
  );
  preLoad.push(producto14);
  let producto15 = new Producto(
    "15",
    "SnowRunner",
    "Simulación",
    ` ¡Prepárate para la experiencia todoterreno de próxima generación! Conduce potentes vehículos y sobreponte a 
    entornos abiertos extremos para completar decenas de misiones desafiantes en solitario o con hasta 3 amigos.`,
    ` ¡Prepárate para la experiencia todoterreno de próxima generación! Conduce potentes vehículos y sobreponte a 
    entornos abiertos extremos para completar decenas de misiones desafiantes en solitario o con hasta 3 amigos.`,
    "snow-sm.png",
    "snow-1.jpg",
    "snow-2.jpg",
    "https://www.youtube.com/embed/hcFSFjJ2b6o"
  );
  preLoad.push(producto15);
  let producto16 = new Producto(
    "16",
    "Surgeon Simulator 2",
    "Simulación",
    ` El caos de la física vuelve con Surgeon Simulator 2, la delirante secuela del simulador de
    operaciones original. ¡Del modo Cooperativo de 4 jugadores al nuevo modo Creación de Bossa Labs, 
    explora una instalación médica increíble en esta secuela más sustanciosa! `,
    ` El caos de la física vuelve con Surgeon Simulator 2, la delirante secuela del simulador de
    operaciones original. ¡Del modo Cooperativo de 4 jugadores al nuevo modo Creación de Bossa Labs, 
    explora una instalación médica increíble en esta secuela más sustanciosa! `,
    "surgeon-sm.png",
    "surgeon-1.png",
    "surgeon-2.png",
    "https://www.youtube.com/embed/VFUwc-Pd5C4"
  );
  preLoad.push(producto16);
  let producto17 = new Producto(
    "17",
    "Ooblets",
    "Simulación",
    ` Ooblets es un juego de agricultura, recopilación de criaturas y vida rural en el que podrás 
    diseñar tu granja, entablar amistad con los aldeanos, cultivar ooblets y participar en competiciones de baile.`,
    ` Ooblets es un juego de agricultura, recopilación de criaturas y vida rural en el que podrás 
    diseñar tu granja, entablar amistad con los aldeanos, cultivar ooblets y participar en competiciones de baile.`,
    "ooblets-sm.png",
    "ooblets-1.jpg",
    "ooblets-2.jpg",
    "https://www.youtube.com/embed/OB6qo8wls0k"
  );
  preLoad.push(producto17);
  let producto18 = new Producto(
    "18",
    "Farming Simulator 19",
    "Simulación",
    `¡La simulación agrícola definitiva vuelve con una completa revisión gráfica y la experiencia agrícola
    más completa de la historia! Conviértete en un moderno agricultor y desarrolla una granja en tres 
    enormes entornos de América y Europa repletos de emocionantes actividades agrícolas nuevas, cultivos que cosechar 
    y animales que cuidar.`,
    `¡La simulación agrícola definitiva vuelve con una completa revisión gráfica y la experiencia agrícola
    más completa de la historia! Conviértete en un moderno agricultor y desarrolla una granja en tres 
    enormes entornos de América y Europa repletos de emocionantes actividades agrícolas nuevas, cultivos que cosechar 
    y animales que cuidar.`,
    "farm-sm.png",
    "farm-1.jpg",
    "farm-2.jpg",
    "https://www.youtube.com/embed/3zJfrU5Njpc"
  );
  preLoad.push(producto18);
  let producto19 = new Producto(
    "19",
    "Chorus",
    "Proximamente",
    `Ponte en la piel de Nara, quien alguna vez fue la guerrera más letal del Círculo, pero ahora es la fugitiva más 
  buscada por ellos, y acompáñala en su misión para destruir el culto oscuro que la creó.`,
    `Ponte en la piel de Nara, una de las guerreras más mortíferas del Círculo y su fugitiva más buscada, en una misión para destruir la secta tenebrosa que la creó.`,
    "chorus-sm.png",
    "chorus-1.jpg",
    "chorus-2.jpg",
    "https://www.youtube.com/embed/2ItKZESXDLg"
  );
  preLoad.push(producto19);
  let producto20 = new Producto(
    "20",
    "The Last Campfire",
    "Proximamente",
    ` The Last Campfire es un juego de aventuras obra de Hello Games (No Man's Sky) y cuenta la historia de Ember que,
  atrapado en un lugar extraño, busca una motivación y una forma de volver a casa.`,
    `The Last Campfire es un juego de aventuras obra de Hello Games (No Man's Sky) y cuenta la historia de Ember que, atrapado en un lugar extraño, busca una motivación y una forma de volver a casa.`,
    "camp-sm.png",
    "camp-1.jpg",
    "camp-2.jpg",
    "https://www.youtube.com/embed/tBY6XUf3rxs"
  );
  preLoad.push(producto20);
  localStorage.setItem("productoKey", JSON.stringify(preLoad));
  leerDatos();
};

/*VERIFICADOR DE USUARIO ADMIN*/
function verificarUser() {
  let userLS = JSON.parse(localStorage.getItem("userKey"));
  if (userLS == "admin") {
    document.getElementById("registroNavbar").className =
      "dropdown-item d-none";
    document.getElementById("loginNavbar").className = "dropdown-item d-none";
    document.getElementById("cerrarsesionNavbar").className = "dropdown-item";
    document.getElementById("adminNavbar").className = "nav-link lead-active";
    document.getElementById("dividerNav").className = "dropdown-divider d-none";
  } else {
    document.getElementById("registroNavbar").className = "dropdown-item";
    document.getElementById("loginNavbar").className = "dropdown-item";
    document.getElementById("cerrarsesionNavbar").className =
      "d-none dropdown-item";
    document.getElementById("adminNavbar").className =
      "nav-link lead-active d-none";
    document.getElementById("dividerNav").className = "dropdown-divider";
    location.href = "error404.html";
  }
}

/*BOTON PARA CERRAR SESION*/
window.cerrarSesion = function () {
  let user = "";
  localStorage.setItem("userKey", JSON.stringify(user));
  location.href = "index.html";
};
