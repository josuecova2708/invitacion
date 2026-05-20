function temporizador(fecha) {
  var timer = setInterval(function () {
    countdown(new Date(fecha));
  }, 1000);
  timer;
}

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

function countdown(date) {
  var now = new Date().getTime();
  var distance = date.getTime() - now;
  // var months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.42));
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    clearInterval(timer);
  } else {
    //return {days, hours, minutes, seconds}
    renderizar_temporizador(days, hours, minutes, seconds);
  }
}

function renderizar_temporizador(di, ho, mi, se) {
  // meses.textContent = me
  dias.textContent = di;
  horas.textContent = ho;
  minutos.textContent = mi;
  segundos.textContent = se;
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
