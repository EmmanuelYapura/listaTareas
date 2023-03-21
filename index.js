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
        li.style.backgroundColor = colorLi;

        const h = document.createElement('h4');
        h.textContent = titleText;

        const p = document.createElement("p");
        p.textContent = text;

        const div = document.createElement('div');
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
        });

        tituloTarea.value = "";
        descripcionTarea.value = "";
        empty.style.display = "none";
    }
})

function addDeleteBtn(padre,hijo,empty,prioridadTarea) {
    const button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('btn-delete');

    button.addEventListener('click', () => {
        padre.removeChild(hijo);
        const cantNodos = document.querySelectorAll(`.p-${prioridadTarea} li`);

        if (cantNodos.length === 0) {
            empty.style.display = "block";
        }
    })

    return button;
}
