// Obtenemos el input, la lista de tareas y el botón
const input = document.getElementById("input-tarea");
const contenedorTareas = document.getElementById("tasks-container");
const add = document.getElementById("buttonAdd");

// Función para añadir tarea pulsando botón
add.addEventListener("click", function()
{
    if(input.value !== '')
    {
        // Creamos los elementos dentro de task-container
        let li = document.createElement("li"); 
        li.setAttribute("haTerminado", "false");
        let finish = document.createElement("div");
        finish.className = "terminada"; 
        let moreOptions = document.createElement("div");
        moreOptions.className = "more-options";

        // Le añadimos su valor a cada uno
        li.innerHTML = input.value;
        moreOptions.innerHTML = "..."

        // Creamos el contenedor de todo esto y le añadimos los elementos
        let taskContainer = document.createElement("div");
        taskContainer.className = "task-container";
        taskContainer.appendChild(finish);
        taskContainer.appendChild(li);
        taskContainer.appendChild(moreOptions);

        contenedorTareas.appendChild(taskContainer);           
        input.value = '';          
    }
}
);

// Función para añadir tarea pulsando enter mientras escribo en el input
input.addEventListener("keydown", function(event)   // Al pulsar una tecla, se realiza la función cuyo parámetro es la tecla pulsada siempre que esté en input
{
    if (event.key === "Enter" && input.value !== '')
    {
        // Creamos los elementos dentro de task-container
        let li = document.createElement("li");
        li.setAttribute("haTerminado", "false");    
        let finish = document.createElement("div");
        finish.className = "terminada"; 
        let moreOptions = document.createElement("div");
        moreOptions.className = "more-options";

        // Le añadimos su valor a cada uno
        li.innerHTML = input.value;
        moreOptions.innerHTML = "...";

        // Creamos el contenedor de todo esto y le añadimos los elementos
        let taskContainer = document.createElement("div");
        taskContainer.className = "task-container";
        taskContainer.appendChild(finish);
        taskContainer.appendChild(li);
        taskContainer.appendChild(moreOptions);

        contenedorTareas.appendChild(taskContainer);           
        input.value = '';   
    }
}
);