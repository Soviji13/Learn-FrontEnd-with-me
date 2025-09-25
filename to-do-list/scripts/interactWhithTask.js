/* PARA TACHAR TAREAS */

// Cuando se pulse el botón de finish, la tarea se tachará y se pondrá más transparente (si la tarea no está terminada),
// o volverá a como estaba (si la tarea está terminada)

// Obtenemos el contenedor de tareas y observamos si se ha clickado - Si no hay aún ninguna tickada
document.getElementById("tasks-container").addEventListener("click", function(event) 
{
    // Si se clickó, vemos si el evento que ha ocurrido es que hemos pulsado el botón con la clase .terminada
    if (event.target.classList.contains("terminada")) 
    {
        // Obtenemos el contenedor asociado a esa casilla de terminada para acceder a su contenido (tarea)
        const contenedorAsociado = event.target.parentElement;
        const task = contenedorAsociado.querySelector("li");

        // Tachamos la tarea si terminó - Además añadimos estilo visual al botón
        if(task.getAttribute("haTerminado") === "false")
        {
            // Estilo del texto de tarea
            task.style.textDecoration = "line-through";
            task.style.opacity = 0.25;
            task.setAttribute("haTerminado", "true");

            // Añadimos animación de entrada a deco-botón
            let decoBoton = event.target.querySelector(".terminada-done"); //Accedemos a él
            decoBoton.style.transform = `rotateZ(0deg)`;
            decoBoton.style.scale = "1";
            decoBoton.style.opacity = "1";
        }
        // Volvemos la tarea a su estado normal si clickamos y estaba terminada
        else
        {
            // Estilo del texto de tarea
            task.style.textDecoration = "none";
            task.style.opacity = 1;
            task.setAttribute("haTerminado", "false");

            // Añadimos animación de salida a deco-botón
            let decoBoton = event.target.querySelector(".terminada-done"); //Accedemos a él
            decoBoton.style.transform = `rotateZ(-360deg)`;
            decoBoton.style.scale = "0";
            decoBoton.style.opacity = "0";
        }

        // Guardamos estado en la memoria
        saveData();
    }
});

/* PARA BORRAR TAREAS */ 
document.getElementById("tasks-container").addEventListener("click", function(event)
{
    // Vemos qué casilla de borrar se ha pulsado en concreto
    if (event.target.classList.contains("remove-task"))
    {
        // Accedemos a su padre - Contenedor
        const contenedorAsociado = event.target.parentElement;
        // Accedemos al padre del contenedor - Contenedor de todas las tareas
        const contenedortotal = contenedorAsociado.parentElement;
        // Eliminamos eel contendor de la tarea específico del contenedor total
        contenedortotal.removeChild(contenedorAsociado);
        
        // Guardamos los cambos
        saveData();
    }
});


/* PARA EDITAR TAREAS */

// Primero necesito obtener el taskcontainer para por temas de accesibilidad,
// no haga falta darle exactamente al elemento

// Creo la función editar tarea
function editarTarea(event)
{
    // Si se clickó, vemos si lo que se ha clickado es un li y no es editable (para que no se quede)
    if(event.target.tagName === "LI" && !event.target.isContentEditable)
    {
        // Guardo el contenido pasado (para si pulso enter vacío, no se quede así)
        textoOriginal = event.target.textContent;

        // Hacemos que se pueda editar
        event.target.contentEditable = true;

        // Focus, hacemos que el elemento se active
        event.target.focus();
    }
}

// Se pasa el argumento directamente
document.getElementById("tasks-container").addEventListener("click", editarTarea);
