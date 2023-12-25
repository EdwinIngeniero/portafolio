// Permite ocultar o mostrar el menu cuando la pantalla cambia de tamaño
let menuVisible = false;

function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList = "";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}

// Seleccion utilizada en el evento click de la navegacion
function seleccionar(){
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// Creamos el efecto de porcentaje de barras para las habilidades
function efectoHabilidades(){
    var habilidades = document.getElementById("habilidades");
    var distancia_habilidades = window.innerHeight - habilidades.getBoundingClientRect().top;
    if(distancia_habilidades >= 300){
        let habi = document.getElementsByClassName("progreso");
        habi[0].classList.add("javascriptVue");
        habi[1].classList.add("htmlCss");
        habi[2].classList.add("csharpNet");
        habi[3].classList.add("sqlServer");
        habi[4].classList.add("ofimatica");
        habi[5].classList.add("comunicacion");
        habi[6].classList.add("trabajo");
        habi[7].classList.add("creatividad");
        habi[8].classList.add("dedicacion");
        habi[9].classList.add("proyecto");
    }
}

// Seleccion aplicada a la seccion activa
function actualizarSeccionActiva() {
    let secciones = document.querySelectorAll('section[id]');

    for (let i = 0; i < secciones.length; i++) {
        let section = secciones[i];
        let bounding = section.getBoundingClientRect();

        if (bounding.top <= 150 && bounding.bottom >= 150) {
            let sectionId = section.getAttribute('id');
            document.querySelectorAll("#nav ul li a").forEach(function (enlace) {
                enlace.classList.remove("seleccionado");
            });
            document.querySelector(`a[href="#${sectionId}"]`).classList.add('seleccionado');
        }
    }
}

document.querySelectorAll("#nav ul li a").forEach(function (enlace) {
    enlace.addEventListener("click", function (event) {
        seleccionar(event);
        actualizarSeccionActiva();
    });
});

// LLamamos a los eventos de efecto de habilidades y seleccion de seccion activa
window.addEventListener("scroll", function () {
    efectoHabilidades();
    actualizarSeccionActiva();
});

// Seccion para expandir la imagen de los proyectos realizados
let lightboxVisible = false;

function abrirLightbox(imagenSrc, titulo, descripcion) {
    document.getElementById("imagen-lightbox").src = imagenSrc;
    document.getElementById("titulo-lightbox").textContent = titulo;
    document.getElementById("descripcion-lightbox").textContent = descripcion;

    document.getElementById("lightbox").style.display = "flex";
    lightboxVisible = true;
}

function cerrarLightbox() {
    document.getElementById("lightbox").style.display = "none";
    lightboxVisible = false;
}

document.querySelectorAll(".proyecto").forEach(function (proyecto) {
    proyecto.addEventListener("click", function () {
        if (!lightboxVisible) {
            let imagenSrc = proyecto.querySelector("img").src;
            let titulo = proyecto.querySelector(".overlay h3").textContent;
            let descripcion = proyecto.querySelector(".overlay p").textContent;
            abrirLightbox(imagenSrc, titulo, descripcion);
        }
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightboxVisible) {
        cerrarLightbox();
    }
});

document.getElementById("lightbox").addEventListener("click", function (event) {
    if (event.target.id === "lightbox" && lightboxVisible) {
        cerrarLightbox();
    }
});

document.getElementById("lightbox").addEventListener("wheel", function () {
    cerrarLightbox();
});

window.addEventListener("scroll", function () {
    cerrarLightbox();
});

// Validaciones finales del proyecto
document.getElementById('miFormulario').addEventListener('submit', function(event){
    event.preventDefault();

    if(!camposValidos()){
        alert('Por favor, completa todos los campos antes de enviar el mensaje.');
        return;
    }

    fetch(this.action, {
        method: this.method,
        body: new FormData(this),
    })

    .then(response =>{
        if(!response.ok){
            throw new Error('Error en la solicitud de red');
        }
        return response.text();
    })

    .then(data => {
        alert('Mensaje enviado correctamente.');
        document.getElementById('miFormulario').reset();
    })

    .catch(error =>{
        alert('Error al enviar el mensaje. Inténtalo de nuevo.');
    });
});

function camposValidos(){
    var form = document.getElementById('miFormulario');
    var inputs = form.querySelectorAll('input, textarea');

    for(var i=0; i < inputs.length; i++){
        if(!inputs[i].value.trim()){
            return false;
        }
    }
    return true;
}








