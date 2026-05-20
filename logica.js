/*     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('dark-mode');
            } */

let bg_actual = "bg_1";
let color_actual = "color_2";

function cambia_color(bg, text) {
  document
    .getElementById("input_deseos")
    .classList.remove("bg_0", "bg_1", "bg_2", "bg_3", "bg_4");
  document
    .getElementById("input_deseos")
    .classList.remove("color_0", "color_1", "color_2", "color_3", "color_4");
  document.getElementById("input_deseos").classList.add(bg);
  document.getElementById("input_deseos").classList.add(text);
  bg_actual = bg;
  color_actual = text;
}

function validar_boton_guardar() {
  if (document.getElementById("emisor").value == " ") {
    document.getElementById("emisor").value = "";
  }
  if (document.getElementById("input_deseos").value == " ") {
    document.getElementById("input_deseos").value = "";
  }
  if (document.getElementById("emisor").value.slice(-2) == "  ") {
    document.getElementById("emisor").value = document
      .getElementById("emisor")
      .value.slice(0, -1);
  }
  if (document.getElementById("input_deseos").value.slice(-2) == "  ") {
    document.getElementById("input_deseos").value = document
      .getElementById("input_deseos")
      .value.slice(0, -1);
  }
  if (
    document.getElementById("emisor").value != "" &&
    document.getElementById("input_deseos").value != ""
  ) {
    document
      .getElementById("boton_guardar_deseos")
      .classList.remove("disabled");
  } else {
    document.getElementById("boton_guardar_deseos").classList.add("disabled");
  }
}

const API_URL =
  "https://pocketbase-mc3ojh2li0io984rh3c4dzsa.62.171.144.14.sslip.io/api/collections/deseos/records";

async function obtener_deseos() {
  try {
    const respuesta = await fetch(API_URL + "?sort=-created");
    const datos = await respuesta.json();

    const contenedor = document.getElementById("app_deseos");
    contenedor.innerHTML = ""; // Limpiar antes de cargar

    datos.items.forEach((deseo) => {
      let html = `
                <div class="${deseo.bg} ${deseo.color} px-3 py-2 rounded-2 rotar_random_poco f_gluten shadow-sm" style="min-width: 200px;">
                    <div class="fw-semibold fs-5 el_nombre texto_2_lineas">
                        De: ${deseo.emisor}
                    </div>
                    <div class="fs-6 small texto el_texto">
                        ${deseo.mensaje}
                    </div>
                    <button class="mostrar_mas float-end btn btn-sm bg-light text-dark"
                    onclick='mostrarMas(this,"${deseo.bg}","${deseo.color}")'
                    data-bs-toggle="modal" data-bs-target="#modal_texto">Mostrar más</button>
                </div>
            `;
      contenedor.insertAdjacentHTML("beforeend", html);
    });

    mostrar_boton_ver_mas();
  } catch (error) {
    console.error("Error al obtener los deseos:", error);
  }
}

async function agregar_deseo() {
  let de = document.getElementById("emisor").value;
  let mensaje = document.getElementById("input_deseos").value;

  if (de.trim() === "" || mensaje.trim() === "") {
    alert("Por favor, completa tu nombre y el mensaje.");
    return;
  }

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emisor: de,
        mensaje: mensaje,
        bg: bg_actual,
        color: color_actual,
      }),
    });

    if (!respuesta.ok) throw new Error("No se pudo guardar en PocketBase");

    // Limpiar campos
    document.getElementById("emisor").value = "";
    document.getElementById("input_deseos").value = "";

    // Recargar la lista de deseos
    await obtener_deseos();

    alert("¡Gracias por tus buenos deseos!");
    enfocar_mesaje_nuevo();
  } catch (error) {
    console.log(error);
    alert(
      "Ocurrio un error al enviar el mensaje, por favor vuelve a intentarlo.",
    );
  }
}

document.querySelector(".pantalla").classList.remove("overflow-hidden");
document.querySelector(".pantalla").classList.add("overflow-auto");

setTimeout(() => {
  document.getElementById("dedo_abrir").classList.remove("d-none");
  //document.getElementById('dedo_abrir').classList.add('d-flex');
}, 4000);

let imagen = document.getElementById("sobre_derecha");
window.addEventListener("load", function () {
  obtener_deseos(); // Fetch initial messages from PocketBase
  document.getElementById("carga").classList.add("fade-out");
  setTimeout(() => {
    document.getElementById("carga").classList.remove("d-flex");
    document.getElementById("carga").classList.add("d-none");
  }, 1400);
  /* }, 0); */
});

if (
  document.querySelector(".logo_paloma") &&
  document.querySelector(".padre")
) {
  document.querySelector(".logo_paloma").style.height =
    document.querySelector(".padre").clientHeight * 0.8 + "px";
}

let ceremonia_religiosa = [];
let programa_fiesta = [];

/* 
                 - 7 pm —> Recepción
         - 8 pm —> Ceremonia Civil
         - 9 pm —> Fotos
         - 9:30 pm —> Cena
         - 11 pm —> Torta
         - 11:30 pm —> Fin del Evento
                */
ceremonia_religiosa.push([
  "Recepción",
  "7:00 pm",
  "https://minio-wcggss4ggw4kgog0oswgsk84.62.171.144.14.sslip.io/boda/imagenes/img_160_20250504162422.png",
]);
ceremonia_religiosa.push([
  "Ceremonia civil ",
  "8:00 pm",
  "https://minio-wcggss4ggw4kgog0oswgsk84.62.171.144.14.sslip.io/boda/imagenes/img_110_20250418012101.png",
]);
ceremonia_religiosa.push([
  "Fotos",
  "9:00 pm",
  "https://minio-wcggss4ggw4kgog0oswgsk84.62.171.144.14.sslip.io/boda/imagenes/img_154_20250504162422.png",
]);
ceremonia_religiosa.push([
  "Cena",
  "9:30 pm",
  "https://minio-wcggss4ggw4kgog0oswgsk84.62.171.144.14.sslip.io/boda/imagenes/img_151_20250504162422.png",
]);
ceremonia_religiosa.push([
  "Torta",
  "11:00 pm",
  "https://minio-wcggss4ggw4kgog0oswgsk84.62.171.144.14.sslip.io/boda/imagenes/img_112_20250418012101.png",
]);
ceremonia_religiosa.push([
  "Fin del Evento",
  "11:30",
  "https://minio-wcggss4ggw4kgog0oswgsk84.62.171.144.14.sslip.io/boda/imagenes/img_155_20250504162422.png",
]);
/*  
                ceremonia_religiosa.push(['Recepción social', '19:00', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']);
                ceremonia_religiosa.push(['Fin del evento', '02:00', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']);
                ceremonia_religiosa.push(['Acto principal', '16:30', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']);
                 ceremonia_religiosa.push(['Brindis', '17:00', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']);
                 ceremonia_religiosa.push(['Comienza la fiesta', '17:30', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']);
                 ceremonia_religiosa.push(['Cena', '19:00', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']);
                 ceremonia_religiosa.push(['Continua la fiesta', '20:00', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']);
                 ceremonia_religiosa.push(['Despedida', '00:00', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=']); */

ceremonia_religiosa.forEach((e) => {
  document.getElementById("app_ceremonia_religiosa").innerHTML += `
                   
                     <div class=" d-flex justify-content-center row align-items-center g-0 gap-0 w-100 h-100">
                                
                        <div class="col-4 d-flex justify-content-end">
                            <div style="width: 55%;" class="elemento">
                                <div class="ratio ratio-1x1" style="width: 100%; background: url(${e[2]}); background-size: contain; background-position: center center; background-repeat: no-repeat;">

                                </div>
                            </div>
                            <!--<img src="${e[2]}" alt="" style="width: 50%;" class="elemento">-->
                            <div style="width: 20%;"></div>
                        </div>

                        <div class="col-1 position-relative  bg-info" style="height:100%">
                            <div class="position-absolute bg_3 start-0 top-50 translate-middle-y" style="height: 0px; width: 100%;"></div>
                          
                            <i class="bi bi-circle-fill position-absolute start-100 top-50 translate-middle fs_2_ color_0" style="font-size:1.0vh"></i>
                        </div>

                        <div class="col-1 position-relative">
                            <div class="position-absolute bg_4 start-0 top-50 translate-middle-y" style="height: 0px; width: 100%;"></div>
                        </div>

                        <div class="col-4 d-flex">
                            <div style="width: 0%;"></div>
                            <div class="elemento" style="width:100%">
                                <div class="f_beiruti fw-semibold color_0 fs_2_5 lh-sm">${e[1]}</div>
                                <div class="f_cormorant fw-semibold_ color_4 text-nowrap_ text-uppercase_ fs_2 lh-1">${e[0]}</div>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div style="padding:4%;"></div>
                    `;
});

programa_fiesta.forEach((e) => {
  document.getElementById("app_fiesta").innerHTML += `
                    <div class="elemento d-flex justify-content-start align-items-center w-100">
                        <div class="border-bottom border-1 bc_4" style="width: 30%;"></div>
                        <div class="border-bottom_ border-3 bc_0" style="width: 5%;"></div>
                        <img src="${e[2]}" alt="" style="width: 22%;">
                        <div class="w-100 bg-light bg-opacity-10 d-flex flex-column justify-content-start align-items-start rounded-3"
                            style=" padding: 2% 5% 2% 5%;">
                            <div class="f_beiruti lh-1 fs_2_5  color_4 text-nowrap fw-bold" style=" padding: 0% 3% 0% 3%;">${e[1]}</div>
                             <div style="padding:2%;"></div>
                            <div class="f_cormorant lh-1 fs_3 color_0 fw-bold_" style=" padding: 0% 3% 0% 3%;">
                            ${e[0]}</div>
                        </div>
                    </div>
                    <div style="padding:4%;"></div>
                    
                    `;
});

function enviar_confirmacion(elem) {
  if (document.querySelector('input[name="input_confirmacion"]:checked')) {
    let seleccionado = document.querySelector(
      'input[name="input_confirmacion"]:checked',
    ).value;

    // MOCK LOCAL
    new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 500))
      .then((response) => {
        if (response.ok) {
          console.log("Datos simulados enviados correctamente (Local)");
        } else {
          console.error("Error al enviar los datos");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud Fetch:", error);
      });

    //modal_informe
    document.getElementById("modal_informe").classList.remove("d-none");
    document.getElementById("modal_informe").classList.add("d-flex");

    setTimeout(() => {
      document.getElementById("modal_informe").classList.remove("d-flex");
      document.getElementById("modal_informe").classList.add("d-none");
    }, 3000);
  } else {
    console.log("debes seleccionar alguna opcion");
  }
}

window.onload = function () {
  mostrar_boton_ver_mas();
};

window.addEventListener("resize", () => {
  mostrar_boton_ver_mas();
});

function mostrar_boton_ver_mas() {
  var texto = document.querySelectorAll(".texto");
  var mostrar_mas = document.querySelectorAll(".mostrar_mas");
  texto.forEach((e, i) => {
    // Verificar si el contenido excede las tres líneas
    if (e.offsetHeight < e.scrollHeight) {
      e.style.textOverflow = "clip"; // Mostrar puntos suspensivos solo si excede las tres líneas
      mostrar_mas[i].style.display = "block";
    }
  });
}

function mostrarMas(elem, bg, color) {
  document.getElementById("modal_textoLabel").innerHTML =
    elem.parentNode.querySelector(".el_nombre").innerHTML;
  document.getElementById("modal_texto_aqui").innerHTML =
    elem.parentNode.querySelector(".el_texto").innerHTML;

  document.getElementById("cambia_estilos").classList.remove("bg_0");
  document.getElementById("cambia_estilos").classList.remove("bg_1");
  document.getElementById("cambia_estilos").classList.remove("bg_2");
  document.getElementById("cambia_estilos").classList.remove("bg_3");
  document.getElementById("cambia_estilos").classList.remove("bg_4");
  document.getElementById("cambia_estilos").classList.remove("color_0");
  document.getElementById("cambia_estilos").classList.remove("color_1");
  document.getElementById("cambia_estilos").classList.remove("color_2");
  document.getElementById("cambia_estilos").classList.remove("color_3");
  document.getElementById("cambia_estilos").classList.remove("color_4");
  document.getElementById("cambia_estilos").classList.add(bg);
  document.getElementById("cambia_estilos").classList.add(color);
}

function mover_izquierda() {
  document.getElementById("app_deseos").scrollLeft -= 200;
}

function mover_derecha() {
  document.getElementById("app_deseos").scrollLeft += 200;
}

function enfocar_mesaje_nuevo() {
  document.getElementById("app_deseos").scrollTo(0, 0);
}

function mover_scroll_x(px, id) {
  var element = document.getElementById(id); // Obtén el elemento por ID
  if (element) {
    element.scrollBy({
      top: 0,
      left: px,
      behavior: "smooth", // Añade el desplazamiento suave
    });
  }
}

function mostrar_foto(elem) {
  document.getElementById("canvas_fotos").classList.add("show");
  document.getElementById("fondo_galeria").style.backgroundImage =
    `url(${elem})`;
  document.getElementById("fondo_galeria").style.backgroundSize = "cover";
  document.getElementById("fondo_galeria").style.backgroundPosition = "center";
  document.getElementById("fondo_galeria").style.backgroundRepeat = "no-repeat";
  document.getElementById("fondo_galeria").style.filter = "blur(9px)";
  document.getElementById("fondo_galeria").style.transform = "scale(1.3)";
  document.getElementById("foto_entera").src = elem;
}

let array_fotos_galeria = [];
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);
// array_fotos_galeria.push(['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80', 'center']);
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);
//  array_fotos_galeria.push(['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80', 'center']);
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);
// array_fotos_galeria.push(['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80', 'center']);
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);
array_fotos_galeria.push([
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "center",
]);

array_fotos_galeria.forEach((e) => {
  document.getElementById("app_galeria").innerHTML += `
           <div class="elemento_ col-9 col-md-9 col-xl-3">
                <div class=" p-1_ pt-2 px-2 pb-4 bg-white_ bg_2 rotar_random____ rounded-0 overflow-hidden shadow-sm border_"
                 data-bs-toggle="offcanvas" data-bs-target="#canvas_fotos"
                     aria-controls="canvas_fotos" onclick="mostrar_foto('${e[0]}')">
                    <div class="ratio rounded-0 overflow-hidden shadow_ border_ border-2_ border-white_  position-relative"
                        style="--bs-aspect-ratio: 100%; background:url(${e[0]});background-position:${e[1]};background-size:cover;">
                       
                        <div class="position-absolute h-100 w-100 bg-warning_ bg-opacity-10" style="background:#C2C2C245;"></div>
                    </div>
                </div>
            </div>
            `;
});

rotar_aleatoriamente();

function rotar_aleatoriamente() {
  document.querySelectorAll(".rotar_random").forEach((e) => {
    e.style.transform = `rotate(${Math.floor(Math.random() * 31) - 15}deg)`;
  });
}

//window.localStorage.clear();
// window.location.href = "#aqui"

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

function countdown(date) {
  var now = new Date().getTime();
  var distance = date.getTime() - now;
  /*  var months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.42)); */
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    clearInterval(timer);
    console.log("¡Ha llegado el momento!");
    document.querySelector(".cuenta_regresiva").classList.add("d-none");
    document.querySelector(".evento_iniciado").classList.remove("d-none");
  } else {
    document.querySelector(".cuenta_regresiva").classList.remove("d-none");
    document.querySelector(".evento_iniciado").classList.add("d-none");

    renderizar_temporizador(days, hours, minutes, seconds);
  }
}
// Ejemplo de uso:
// var countDownDate = new Date("2025-02-21T16:00:00").getTime();
// var timer = setInterval(function () {
//   countdown(new Date(countDownDate));
// }, 1000);

function renderizar_temporizador(di, ho, mi, se) {
  dias.textContent = di;
  horas.textContent = ho;
  minutos.textContent = mi;
  segundos.textContent = se;
}

var audioPlayer = document.getElementById("audioPlayer");
if (audioPlayer) audioPlayer.currentTime = 2;

let audioIniciado = false;

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    // El navegador estÃ¡ en segundo plano
    console.log("El navegador estÃ¡ en segundo plano");
    if (audioPlayer && audioPlayer.play) {
      audioPlayer?.pause();
      audioPlayer?.pause();
      audioPlayer?.pause();
    }
  } else {
    // El navegador estÃ¡ en primer plano
    console.log("El navegador estÃ¡ en primer plano");
    if (audioIniciado) {
      audioPlayer?.play();
    }
    //window.location.href = 'https://www.sanvalentindigital.com/muestra_2/cumple.html'
    //window.location.href = 'cumple.html'
  }
});

function play_pause(elem) {
  if (audioPlayer && audioPlayer.paused) {
    audioPlayer?.play();
    elem.querySelector("i").classList.remove("bi-volume-mute-fill");
    elem.querySelector("i").classList.add("bi-volume-up-fill");
  } else {
    audioPlayer?.pause();
    elem.querySelector("i").classList.remove("bi-volume-up-fill");
    elem.querySelector("i").classList.add("bi-volume-mute-fill");
  }
}

function ver_invitacion() {
  var doc = document.documentElement;
  if (document.fullscreenElement) {
    // Si ya está en pantalla completa, salir de ella
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    // Si no está en pantalla completa, entrar en ella
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) {
      doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      doc.msRequestFullscreen();
    }
  }

  //window.location.href = '#seccion_1'
  setTimeout(() => {
    //window.location.href = '#seccion_1'
    //if(audioPlayer) audioPlayer.currentTime = 40.3;
    audioPlayer?.play();

    //document.getElementById('seccion_0').classList.add('d-none')
    //document.getElementById('seccion_0').classList.add('cerrar')
    document.getElementById("sobre_base").classList.add("opaco");
    //document.getElementById('sobre_base').classList.add('mover_arriba')
    document.getElementById("boton_iniciar").classList.add("opaco");
    document.getElementById("sobre_derecha").classList.add("mover_derecha");
    document.getElementById("para").classList.add("opaco");
    document.getElementById("para").classList.add("mover_izquierda");
    document.getElementById("sobre_izquierda").classList.add("mover_izquierda");
    /*             window.location.href = "#aqui"
            window.location.href = "#aqui"
            window.location.href = "#aqui" */
  }, 1000);

  setTimeout(() => {
    document.getElementById("seccion_0").classList.add("d-none");
    //mi_video.play();
    let finger = document.getElementById("finger");
    let timeout;
    // Mostrar el dedo después de 4 segundos si no se ha desplazado
    timeout = setTimeout(() => {
      finger.classList.remove("d-none");
      finger.classList.add("d-flex");
    }, 4000);
    // Detectar el deslizamiento hacia abajo
    document.querySelector(".pantalla").addEventListener("scroll", () => {
      /* if (document.querySelector('.contenedor_padre').scrollY > 0) {*/
      finger.classList.remove("d-flex"); // Ocultar el dedo
      finger.classList.add("d-none"); // Ocultar el dedo
      clearTimeout(timeout); // Limpiar el timeout
      /*  } */
    });
  }, 3000);

  setTimeout(() => {
    audioIniciado = true;
    audioPlayer?.play();
  }, 1000);

  document.querySelector(".pantalla").classList.remove("overflow-hidden");
  document.querySelector(".pantalla").classList.add("overflow-x-hidden");
  document.querySelector(".pantalla").classList.add("overflow-x-hidden");
}

const elemento = document.querySelectorAll(".elemento");
const elemento_2 = document.querySelectorAll(".elemento_2");
const elemento_derecha = document.querySelectorAll(".elemento_derecha");
// const elemento_flecha = document.querySelectorAll('.elemento_flecha');

const options = {
  root: null, // Utiliza el viewport como área de observación
  threshold: 0.5, // Define el porcentaje de visibilidad requerido para disparar la animación
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1; // Muestra el elemento cuando es visible en la pantalla

      entry.target.style.transform = "scale(1)"; // Muestra el elemento cuando es visible en la pantalla

      //  observer.unobserve(entry.target); // Deja de observar el elemento una vez que se ha mostrado
    } else {
      entry.target.style.opacity = 0; // Muestra el elemento cuando es visible en la pantalla
      entry.target.style.transform = "scale(.5)"; // Muestra el elemento cuando es visible en la pantalla
      //observer.unobserve(entry.target); // Deja de observar el elemento una vez que se ha mostrado
    }
  });
}, options);

elemento.forEach((e) => {
  observer.observe(e);
});

const options_2 = {
  root: null, // Utiliza el viewport como área de observación
  threshold: 0.2, // Define el porcentaje de visibilidad requerido para disparar la animación
};
const observer_2 = new IntersectionObserver((entries, observer_2) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // entry.target.style.opacity = 1; // Muestra el elemento cuando es visible en la pantalla
      entry.target.classList.remove("bg_4"); // Muestra el elemento cuando es visible en la pantalla
      entry.target.classList.add("bg_2"); // Muestra el elemento cuando es visible en la pantalla
      //observer_2.unobserve(entry.target); // Deja de observar el elemento una vez que se ha mostrado // habilitar esta linea para que la animacion ocurra solo una vez
    } else {
      //   entry.target.style.opacity = 0; // Muestra el elemento cuando es visible en la pantalla
      entry.target.classList.add("bg_4"); // Muestra el elemento cuando es visible en la pantalla
      entry.target.classList.remove("bg_2"); // Muestra el elemento cuando es visible en la pantalla
      //observer_2.unobserve(entry.target); // Deja de observar el elemento una vez que se ha mostrado
    }
  });
}, options_2);

elemento_2.forEach((e) => {
  observer_2.observe(e);
});

const options_3 = {
  root: null, // Utiliza el viewport como área de observación
  threshold: 0.0, // Define el porcentaje de visibilidad requerido para disparar la animación
};
const observer_3 = new IntersectionObserver((entries, observer_3) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // entry.target.style.opacity = 1; // Muestra el elemento cuando es visible en la pantalla
      //entry.target.style.transform = 'translateX(-10%)'
      entry.target.style.right = "-5%";
      //observer_3.unobserve(entry.target); // Deja de observar el elemento una vez que se ha mostrado // habilitar esta linea para que la animacion ocurra solo una vez
    } else {
      //   entry.target.style.opacity = 0; // Muestra el elemento cuando es visible en la pantalla
      //entry.target.style.transform = 'translateX(200%)'
      entry.target.style.right = "-20%";

      //observer_3.unobserve(entry.target); // Deja de observar el elemento una vez que se ha mostrado
    }
  });
}, options_3);

elemento_derecha.forEach((e) => {
  observer_3.observe(e);
});

/*const observer_flecha = new IntersectionObserver((entries, observer_flecha) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1; // Muestra el elemento cuando es visible en la pantalla
                observer_flecha.unobserve(entry.target); // Deja de observar el elemento una vez que se ha mostrado
            } else {
                entry.target.style.opacity = 0; // Muestra el elemento cuando es visible en la pantalla
                //observer_flecha.unobserve(entry.target); // Deja de observar el elemento una vez que se ha mostrado
            }
        });
    }, options);
 
 
    elemento_flecha.forEach(e => {
        observer_flecha.observe(e);
    }); */

function abrirWhatsApp(numero) {
  /* var mensajeCodificado = encodeURIComponent("Si asistire!!");
        var tituloCodificado = encodeURIComponent("Confirmación de asistensia");
        var numeroCodificado = encodeURIComponent("591"+numero);
        var asunto = encodeURIComponent("Boda Armando y Adela");
        var imagen = encodeURIComponent("");
        var params = [
            "text=" + mensajeCodificado,
            "title=" + tituloCodificado,
            "image=" + imagen,
            "phone=" + numeroCodificado,
            "subject=" + asunto,
        ];
        var urlWhatsApp = "https://wa.me/?" + params.join("&"); */
  //return urlWhatsApp;
  let texto = "Me complace confirmar mi asistencia!";
  window.open(
    "https://api.whatsapp.com/send/?phone=" +
      numero +
      "&text=" +
      texto +
      "&title=Boda+Rebeca+y+Josue&type=phone_number&app_absent=0",
    "_blank",
  );
}
function abrirWhatsApp_mesa_regalos(numero) {
  let texto = "";

  let textoCodificado = encodeURIComponent(texto); // Codificamos el texto
  window.open(
    "https://api.whatsapp.com/send/?phone=591" +
      numero +
      "&text=" +
      textoCodificado +
      "&title=_&type=phone_number&app_absent=0",
    "_blank",
  );
}

function iterar_dias(id, posicion, dias, dia_evento, clases) {
  posicion = posicion - 1;
  let num_semana = 0;
  let posicion_aux = posicion;
  let iterar = validarYConvertir(dias + posicion);

  for (let index = 0; index < iterar; index++) {
    if (index == 0 || index % 7 === 0) {
      num_semana++;

      let semana = render_semanas(num_semana);
      document.getElementById(id).insertAdjacentElement("beforeend", semana);
    } else {
    }

    if (posicion_aux != 0) {
      posicion_aux = posicion_aux - 1;
      let div = render_dias("");
      document
        .getElementById("semana_" + num_semana)
        .insertAdjacentElement("beforeend", div);
    } else {
      if (index < dias + posicion) {
        let div = render_dias(
          index + (1 - posicion),
          dia_evento == index + (1 - posicion) ? true : false,
          clases,
        );
        document
          .getElementById("semana_" + num_semana)
          .insertAdjacentElement("beforeend", div);
      } else {
        let div = render_dias("");
        document
          .getElementById("semana_" + num_semana)
          .insertAdjacentElement("beforeend", div);
      }
    }
  }
}
function render_semanas(num_semana) {
  let div = document.createElement("div");
  div.id = "semana_" + num_semana;
  div.classList.add(
    "semana",
    "row",
    "d-flex",
    "gap-2",
    "justify-content-center",
    "m-0",
    "p-0",
    "g-0",
  );
  return div;
}

function validarYConvertir(num) {
  if (num % 7 === 0) {
    return num; // Es mÃºltiplo de 7, retornamos el mismo nÃºmero
  } else {
    // Calculamos el siguiente mÃºltiplo de 7
    return Math.ceil(num / 7) * 7;
  }
}

function iterar_meses(meses) {
  for (let index = 0; index < meses; index++) {
    const element = array[index];
    render_dias();
  }
}

function render_dias(elem, dia_evento, clases = []) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(elem));
  div.classList.add("col-1");
  dia_evento ? div.classList.add("fw-semibold", "rounded-pill") : null;
  if (dia_evento) {
    clases.forEach((e) => {
      div.classList.add(e);
    });
  }
  return div;
}
function temporizador(fecha) {
  var timer = setInterval(function () {
    countdown(new Date(fecha));
  }, 1000);
  timer;
}

iterar_dias("app_calendario", 3, 30, 10, [
  "bg_2",
  "color_0",
  "zoom",
  "ts_none",
  "fw-bold",
]);
// 10 de septiembre de 2026
temporizador("2026-09-10T19:00:00");

// === LAZY LOADING PARA BACKGROUNDS ===
document.addEventListener("DOMContentLoaded", function () {
  const lazyBackgrounds = [].slice.call(document.querySelectorAll("[data-bg]"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            let lazyBackground = entry.target;
            lazyBackground.style.backgroundImage =
              "url('" + lazyBackground.getAttribute("data-bg") + "')";
            // Ya no necesitamos remover clase, simplemente dejamos de observarlo
            lazyBackground.removeAttribute("data-bg");
            lazyBackgroundObserver.unobserve(lazyBackground);
          }
        });
      },
      {
        root: document.querySelector(".pantalla"),
        rootMargin: "0px 0px 500px 0px",
      },
    ); // Carga 500px antes de que entre a la pantalla

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  } else {
    // Fallback para navegadores hiper antiguos
    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackground.style.backgroundImage =
        "url('" + lazyBackground.getAttribute("data-bg") + "')";
      lazyBackground.removeAttribute("data-bg");
    });
  }
});
