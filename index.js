const tituloTarea = document.querySelector('.titulo-tarea');
const descripcionTarea = document.querySelector(".descripcion-tarea");
const addBtn = document.querySelector(".btn-add");
const select = document.querySelector('select');
const checkbox = document.getElementById('marcado');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const titleText = tituloTarea.value;
    const text = descripcionTarea.value;
    const prioridad = select.value;
    const prioridadTarea = prioridad.split(' ')[0];
    const colorLi = prioridad.split(' ')[1];

    if(titleText != "" && text != ""){
        const li = document.createElement("li");
        const h = document.createElement('h4');
        const p = document.createElement("p");
        const div = document.createElement('div');

        li.style.backgroundColor = colorLi;
        h.textContent = titleText;
        p.textContent = text;
        div.classList.add('contenedor-li');
        div.appendChild(h);
        div.appendChild(p);

        li.appendChild(div);
        const $padre = document.querySelector(`.p-${prioridadTarea}`);
        $padre.appendChild(li);
        const empty = document.querySelector(`.empty-${prioridadTarea}`);
        li.appendChild(addDeleteBtn($padre,li,empty,prioridadTarea));

        let checked = checkbox.checked;

        if(checked){
            p.classList.toggle('marcado');
            checkbox.checked = false;
        };

        li.addEventListener('click', () => {
            p.classList.toggle('marcado');
        }) ;

        tituloTarea.value = "";
        descripcionTarea.value = "";
        empty.style.display = "none";
    }
})

function addDeleteBtn(padre,hijo,empty,prioridadTarea) {
    const button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('btn-delete');

    button.addEventListener('click', (e) => {
        padre.removeChild(hijo);
        const eliminada = document.querySelector('.eliminada');
        const cantNodos = document.querySelectorAll(`.p-${prioridadTarea} li`)

        if (cantNodos.length === 0) {
            empty.style.display = "block"
        }
    })

    return button;
}
