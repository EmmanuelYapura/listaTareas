//Referencias de inputs
const tituloTarea = document.querySelector(".titulo-tarea");
const descripcionTarea = document.querySelector(".descripcion-tarea");
const select = document.querySelector("select");
const checkbox = document.getElementById("marcado");

//Contenedor de tareas pendientes y eliminadas
const containerTareas = document.querySelector(".container-tareas");
const containerEliminadas = document.querySelector(".container-eliminadas");
const emptyEliminadas = document.querySelector(".empty");

//Referencia y evento agregar para tareas pendientes
const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const titleText = tituloTarea.value;
    const text = descripcionTarea.value;
    const prioridad = select.value;
    const prioridadTarea = prioridad.split(' ')[0];
    const colorLi = prioridad.split(' ')[1];

    if (titleText != "" && text != "") {
        if (btnTareasEliminadas.disabled) {
            intercambiarDisplay();
            btnTareasEliminadas.disabled = false;
        }

        let li = crearLi(colorLi, titleText, text);
        const $padre = document.querySelector(`.p-${prioridadTarea}`);
        $padre.appendChild(li);

        const empty = document.querySelector(`.empty-${prioridadTarea}`);
        li.appendChild(addDeleteBtn($padre, li, empty, prioridadTarea));

        let checked = checkbox.checked;

        if (checked) {
            
            li.querySelector("p").classList.toggle("marcado");
            checkbox.checked = false;
        };

        li.addEventListener("click", () => {
            li.querySelector("p").classList.toggle("marcado");
        });

        tituloTarea.value = "";
        descripcionTarea.value = "";
        empty.style.display = "none";
    }
})

//Array de tareas eliminadas y boton para eliminar 
const tareasEliminadas = [];
function addDeleteBtn(padre, hijo, empty, prioridadTarea) {
    const button = document.createElement("button");
    button.textContent = "x";
    button.classList.add("btn-delete");

    button.addEventListener("click", () => {
        emptyEliminadas.style.display = "none";

        let titulo = hijo.querySelector("h4").textContent;
        let descripcion = hijo.querySelector("p").textContent;

        let tareaEliminada = {
            nombre: titulo,
            informacion: descripcion
        };
        tareasEliminadas.push(tareaEliminada);

        padre.removeChild(hijo);

        const cantNodos = document.querySelectorAll(`.p-${prioridadTarea} li`);
        if (cantNodos.length === 0) {
            empty.style.display = "block";
        }
    })
    return button;
}

//Referencia y evento para ver tareas eliminadas
const btnTareasEliminadas = document.querySelector("#delete");
btnTareasEliminadas.addEventListener("click", (e) => {
    e.preventDefault();
    intercambiarDisplay();

    if (tareasEliminadas != 0) {
        limpiarContainer();
    }

    const listaContainer = document.querySelector(".tareasEliminadas");
    tareasEliminadas.forEach(tarea => {
        let li = crearLi("burlywood", tarea.nombre, tarea.informacion);
        li.classList.add("li-eliminadas");

        listaContainer.appendChild(li);
    })
    btnTareasEliminadas.disabled = true;
})

//Funcion para crear elemento li
function crearLi(bgcColor, titulo, descripcion) {
    const li = document.createElement("li");
    li.style.backgroundColor = bgcColor;

    const h = document.createElement("h4");
    h.textContent = titulo;

    const p = document.createElement("p");
    p.textContent = descripcion;

    const div = document.createElement("div");
    div.classList.add("contenedor-li");

    div.appendChild(h);
    div.appendChild(p);

    li.appendChild(div);
    return li;
}

//Funcion para limpiar contenedor de tareas eliminadas
function limpiarContainer() {
    const container = document.querySelector('.tareasEliminadas');
    const tareasEliminadas = document.querySelectorAll('.li-eliminadas');

    tareasEliminadas.forEach(nodo => {
        container.removeChild(nodo);
    })
}

//Referencia y evento para volver a las tareas pendientes
const btnBack = document.querySelector(".back");
btnBack.addEventListener("click", (e) => {
    e.preventDefault();
    intercambiarDisplay();
    btnTareasEliminadas.disabled = false;
})

function intercambiarDisplay() {
    containerEliminadas.classList.toggle("ocultar");
    containerTareas.classList.toggle("ocultar");
} 
