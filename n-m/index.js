/* -------------------------------------------------------------------------- */
/*                              Elementos de DOM                              */
/* -------------------------------------------------------------------------- */
const text = document.getElementById("text");
const lost_btn = document.getElementById("lost_btn");
const win_btn = document.getElementById("win_btn");
const tiempo = document.querySelector(".tiempo");
const error = document.querySelectorAll(".err");
const container = document.querySelector(".container");
const modal = document.querySelector(".info__modal");
const modalWin = document.querySelector(".info__modalwin");
const time = document.querySelector(".time");
const ppm = document.querySelectorAll(".ppm");
const presicion = document.querySelectorAll(".presicion");

/* -------------------------------------------------------------------------- */
/*                           variables y constantes                           */
/* -------------------------------------------------------------------------- */

//contadorres
let tiempoContador = 60;
let contadorPalabra = 0;
let tiempoCorriendo = 0;
let TimeStoped = false;
let contadorLetra = 0;
let modalActive = 0;
let contadorErr = 0;
let letrasCorrectas = 0;
let contadorPulsaciones = 0;
let contadorFila = 0;
let palabraAnterior = 0;
let y = 53.61;
const textos = [
  "El Titanic fue un famoso transatlantico britanico que se hundio tragicamente en su viaje inaugural en la noche del 14 al 15 de abril de 1912. Construido por la compañia White Star Line en Belfast, Irlanda del Norte, era considerado insubmersible y contaba con lujosas comodidades para mas de 2.200 pasajeros y tripulantes. Sin embargo, cuatro dias despues de partir de Southampton hacia Nueva York, choco contra un iceberg, abriendo agujeros en su casco y llevandolo a un hundimiento gradual en las heladas aguas del Atlantico. La evacuacion fue caotica, y se estima que mas de 1.500 personas perdieron la vida, lo que lo convierte en uno de los mayores desastres maritimos de la historia. La tragedia del Titanic llevo a reformas en la industria naviera y a una investigacion para mejorar la seguridad en los barcos. En 1985, se encontro el pecio a unos 3.800 metros de profundidad en el Atlantico Norte, lo que ha perpetuado su leyenda y su lugar en la historia maritima, recordando la fragilidad humana y la importancia de la seguridad en el transporte maritimo.",

  "La programacion es una disciplina que involucra la creacion de instrucciones y algoritmos para que las computadoras ejecuten tareas especificas. Es un proceso creativo y logico que permite a los desarrolladores diseñar software, aplicaciones y sistemas para resolver problemas y automatizar procesos. A traves de lenguajes de programacion, como Python, Java, C++, JavaScript y muchos otros, los programadores escriben codigo que comunica a las computadoras que acciones realizar. La programacion tiene aplicaciones en una amplia gama de campos, desde el desarrollo de software y aplicaciones moviles hasta la inteligencia artificial, el aprendizaje automatico y la robotica. Los programadores utilizan algoritmos, estructuras de datos y tecnicas de desarrollo para crear soluciones eficientes y escalables. La programacion es una habilidad altamente valorada en el mundo actual, y el campo sigue evolucionando constantemente con nuevas tecnologias y enfoques. A traves de la programacion, se han logrado avances significativos que han transformado la sociedad, impulsando la innovacion y mejorando la vida cotidiana de las personas en todo el mundo.",

  "El tiempo es un concepto fundamental que se refiere a la duracion y secuencia de los eventos en el universo. Es una dimension que fluye de manera constante, y nos permite medir la sucesion de acontecimientos y la duracion entre ellos. En terminos cientificos, el tiempo es una magnitud fisica que se mide en unidades como segundos, minutos, horas, dias, años, etc. Es una parte esencial de nuestra experiencia cotidiana y esta estrechamente vinculado con el movimiento y los ciclos naturales, como el dia y la noche, las estaciones y las fases de la luna.El tiempo tambien es una herramienta crucial para la organizacion y planificacion de nuestras actividades diarias, desde eventos cotidianos hasta proyectos a largo plazo. En la sociedad moderna, hemos desarrollado calendarios y relojes precisos para medir y regular el tiempo, lo que ha permitido sincronizar nuestras actividades a nivel global y facilitar la coordinacion en diferentes partes del mundo.Ademas, en el campo de la meteorologia, el tiempo se refiere a las condiciones atmosfericas en un lugar y momento especifico, como la temperatura, la humedad, la velocidad y direccion del viento, la presion atmosferica, entre otros factores. Comprender y predecir el tiempo es esencial para la agricultura, la aviacion, la navegacion y para tomar decisiones informadas en nuestras vidas diarias.En terminos mas abstractos, el tiempo tambien ha sido objeto de profundos debates filosoficos y cientificos. En la teoria de la relatividad de Einstein, se plantea que el tiempo es relativo y puede variar dependiendo de la velocidad y la gravedad. Esto ha llevado a cuestiones fascinantes sobre la naturaleza misma del tiempo y su relacion con el espacio y la materia.",

  "El parkour es una disciplina fisica y artistica que implica el movimiento fluido y eficiente a traves de diferentes obstaculos y entornos urbanos o naturales. Tambien se le conoce como el arte del desplazamiento. El parkour se centra en desarrollar la capacidad del individuo para superar cualquier tipo de obstaculo utilizando principalmente las habilidades naturales del cuerpo, como correr, saltar, trepar y balancearse.El parkour no solo se trata de realizar acrobacias espectaculares, sino que tambien se enfoca en el desarrollo de habilidades fisicas y mentales. Los practicantes entrenan para mejorar su fuerza, flexibilidad, agilidad, coordinacion y concentracion. A traves del parkour, las personas aprenden a superar el miedo y a confiar en sus capacidades, lo que les brinda una mayor confianza en si mismos y una sensacion de empoderamiento.A pesar de que el parkour puede parecer arriesgado, los practicantes mas experimentados enfatizan la importancia de la seguridad y el respeto por los limites propios y del entorno. Buscan realizar movimientos de manera controlada y calculada, minimizando los riesgos de lesiones.Ademas de ser una actividad fisica, el parkour tambien ha desarrollado una comunidad muy unida de practicantes que comparten su pasion por el movimiento y la superacion personal. Se realizan encuentros y eventos en todo el mundo para que los practicantes se reunan, compartan experiencias y aprendan de otros.",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
];

/* -------------------------------------------------------------------------- */
/*                                  funciones                                 */
/* -------------------------------------------------------------------------- */
function ocultarModal() {
  changeTxt();
  document.addEventListener("keyup", main);
  modal.classList.remove("active");
  modalWin.classList.remove("active");
  tiempoContador = 60;
  contadorErr = 0;
  TimeStoped = false;
  contadorFila = 0;
  palabraAnterior = 0;
  y = 53.61;
  text.style.transform = "translateY(0px)";
  elementosPorFila = contarElementosPorFila(text);
}
/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */
function contarElementosPorFila(elemento) {
  const elementosFlex = elemento.children;

  let elementosPorFila = [];
  let elementosEnFilaActual = 0;

  for (let i = 0; i < elementosFlex.length; i++) {
    elementosEnFilaActual++;
    const filaActual = elementosFlex[i].getBoundingClientRect().top;

    // Verificar si el siguiente elemento pasa a la siguiente fila
    if (i + 1 < elementosFlex.length) {
      const siguienteFila = elementosFlex[i + 1].getBoundingClientRect().top;
      if (siguienteFila > filaActual) {
        elementosPorFila.push(elementosEnFilaActual);
        elementosEnFilaActual = 0;
      }
    }
  }

  // Agregar el ultimo numero de elementos en la ultima fila
  elementosPorFila.push(elementosEnFilaActual);

  return elementosPorFila;
}

/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */
function random() {
  // console.log(Math.floor(Math.random() * textos.length));
  return Math.floor(Math.random() * textos.length);
}
// cambiar a un nuevo texto ramdom
function changeTxt() {
  text.innerHTML = "";
  contadorLetra = 0;
  contadorPalabra = 0;
  letrasCorrectas = 0;
  textos[random()].split(" ").forEach((palabra) => {
    palabra += " ";
    const PALABRA = document.createElement("div");
    PALABRA.className = "palabra";
    for (let i = 0; i < palabra.length; i++) {
      const letra = document.createElement("div");
      letra.className = "letra";
      letra.innerHTML = palabra[i];
      letra.id = palabra.indexOf(palabra[i]);
      PALABRA.appendChild(letra);
    }
    text.appendChild(PALABRA);
  });
}

changeTxt();
let elementosPorFila = contarElementosPorFila(text);
// console.log("Cantidad de elementos en cada fila:", elementosPorFila);
/* -------------------------------------------------------------------------- */
/*                             funcionn principal                             */
/* -------------------------------------------------------------------------- */

const main = (e) => {
  contadorPulsaciones++;
  console.log("palabras: " + contadorPalabra);
  console.log("elementosPorFila: " + elementosPorFila);
  if (elementosPorFila[contadorFila] === contadorPalabra - palabraAnterior) {
    text.style.transform = `translateY(${-y}px)`;
    contadorFila++;
    palabraAnterior = contadorPalabra;
    y += 53.61;
  }
  console.log(palabraAnterior);
  console.log("y: " + y);

  if (e.code === "Space") {
    e.preventDefault();
  }
  const palabraLength = text.children[contadorPalabra].children.length - 1;
  const p = text.children[contadorPalabra].children;
  const ultimaLetra =
    contadorPalabra + 1 == text.children.length &&
    contadorLetra == p.length - 2;

  if (ultimaLetra && tiempoContador > 0) {
    error[1].textContent = `${contadorErr}`;
    document.removeEventListener("keyup", main);
    modalWin.classList.add("active");
    time.textContent = 60 - tiempoContador + " seg";
    ppm[1].textContent = Math.floor(
      contadorPalabra / ((60 - tiempoContador) / 60)
    );
    presicion[1].textContent =
      Math.floor(((letrasCorrectas - contadorErr) / letrasCorrectas) * 100) +
      "%";
    TimeStoped = true;
  }

  tiempoCorriendo++; // aumentar
  if (tiempoCorriendo == 1) {
    setInterval(() => {
      tiempo.innerHTML = `${tiempoContador}  seg`;
      if (tiempoContador > 0) {
        if (TimeStoped == false) {
          tiempoContador--;
        }
      } else {
        document.removeEventListener("keyup", main);
        modal.classList.add("active");
        error[0].textContent = `${contadorErr}`;
        ppm[0].textContent = Math.floor(contadorPalabra);
        presicion[0].textContent = letrasCorrectas >= contadorErr  ? Math.floor(
          ((letrasCorrectas - contadorErr) / letrasCorrectas) * 100
        ) + "%": 0 + "%"
          
      }
    }, 1000);
  }

  const audio = document.createElement("audio");
  const letra = e.key;
  const word = text.children[contadorPalabra].children;
  if (letra !== "Shift" && letra != "Alt") {
    if (letra != word[contadorLetra].innerHTML) {
      audio.src = "./assets/error.mp3";
      audio.play();
      word[contadorLetra].style.animation = "parpadeo .3s linear alternate infinite, sacudir .1s linear alternate";
      contadorErr++;
      const letraPulsada = document.createElement("div");
      letraPulsada.className = "letra__pulsada";
      letraPulsada.innerHTML = e.code == "Space" ? `${e.code}` : `${e.key}`;
      text.parentNode.appendChild(letraPulsada);
      setTimeout(() => {
        letraPulsada.remove();
      }, 1500);
    } else {
      audio.src = "./assets/keySound.mp3";
      audio.play();
      word[contadorLetra].style.animation = "none";
      word[contadorLetra].style.color = "#08c1ff";
      word[contadorLetra].style.backgroundColor = "rgba(0, 0, 255, .1)";
      word[contadorLetra].style.textDecoration = "underline";
      letrasCorrectas++;
      if (contadorLetra + 1 < word.length) {
        contadorLetra++;
      } else {
        contadorPalabra++;
        contadorLetra = 0;
      }
    }
  }
};
/* -------------------------------------------------------------------------- */
/*                                   eventos                                  */
/* -------------------------------------------------------------------------- */
lost_btn.addEventListener("click", ocultarModal);
win_btn.addEventListener("click", ocultarModal);
document.addEventListener("keyup", main);

window.addEventListener("resize", () => {
  elementosPorFila = contarElementosPorFila(text);
  console.log(elementosPorFila);
});
