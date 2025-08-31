// Obtenemos el input, la lista de tareas y el botón
const input = document.getElementById("input-tarea");
const contenedorTareas = document.getElementById("tasks-container");
const add = document.getElementById("buttonAdd");

// Función para añadir tarea
function addTask() {
    if(input.value !== '') {
        // Creamos los elementos dentro de task-container
        let li = document.createElement("li");                  // Texto
        li.setAttribute("haTerminado", "false");

        let finish = document.createElement("div");             // Círculo de completado
        finish.className = "terminada"; 
        // PARA ACCESIBILIDAD
        finish.setAttribute("role", "button");
        finish.setAttribute("tabindex", "0");
        finish.setAttribute("aria-label", "Mark as finished");

        // Añadimos ya el interior del círculo completado
        const decoBoton = document.createElement("div");
        decoBoton.className = "terminada-done";
        finish.appendChild(decoBoton);

        let moreOptions = document.createElement("div");        // Más opciones (auqnue quizá solo lo dejo en editar)
        moreOptions.className = "more-options";
        let remove = document.createElement("div");
        remove.className = "remove-task";                       // Eliminar tarea

        // Dentro de remove voy a añadir su decoración
        const tapa = document.createElement("div");
        tapa.className = "tapadera";
        remove.appendChild(tapa);

        // Le añadimos su valor a cada uno
        li.innerHTML = input.value;
        moreOptions.innerHTML = "...";

        // Creamos el contenedor de todo esto y le añadimos los elementos en el orden adecuado
        let taskContainer = document.createElement("div");
        taskContainer.className = "task-container";
        taskContainer.appendChild(finish);
        taskContainer.appendChild(li);
        taskContainer.appendChild(remove);
        taskContainer.appendChild(moreOptions);

        contenedorTareas.appendChild(taskContainer);           
        input.value = '';      
        
        // Guardamos en la memoria
        saveData();
    }
}

// Añadir tarea pulsando botón
add.addEventListener("click", addTask);

// Añadir tarea pulsando Enter en el input
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Las tareas se guardarán en la memoria del navegador para que permanezcan siempre
function saveData()
{
    localStorage.setItem("tasksData", contenedorTareas.innerHTML);
}

// Mostrará las tareas que habían guardadas
function showTask()
{
    contenedorTareas.innerHTML = localStorage.getItem("tasksData");

    // Accesibilidad: añadir event listener a cada botón terminado
    const finishButtons = contenedorTareas.querySelectorAll(".terminada");
    finishButtons.forEach(finish => {
        finish.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                finish.click(); // Simula el click en el botón de terminado
            }
        });
    });
}

// Al recargar, se verán las tareas
document.addEventListener("DOMContentLoaded", showTask);
