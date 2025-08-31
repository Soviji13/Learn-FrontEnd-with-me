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
            task.style.textDecoration = "none";
            task.style.opacity = 1;
            task.setAttribute("haTerminado", "false");

            // Añadimos animaxción de salida a deco-botón
            let decoBoton = event.target.querySelector(".terminada-done"); //Accedemos a él
            decoBoton.style.transform = `rotateZ(-360deg)`;
            decoBoton.style.scale = "0";
            decoBoton.style.opacity = "0";
        }

        // Guardamos estado en la memoria
        saveData();
    }

    // Si se clickó, vemos si el evento que ha ocurrido es que hemos pulsado el texto de la tarea
    if (event.target.tagName === "LI") 
    {
        // Obtenemos el contenedor asociado a esa casilla de terminada para acceder a su contenido (tarea)
        const contenedorAsociado = event.target.parentElement;
        const task = contenedorAsociado.querySelector("li");
        let boton = contenedorAsociado.querySelector(".terminada")

        // Tachamos la tarea si terminó - Además añadimos estilo visual al botón
        if(task.getAttribute("haTerminado") === "false")
        {
            // Estilo del texto de tarea
            task.style.textDecoration = "line-through";
            task.style.opacity = 0.25;
            task.setAttribute("haTerminado", "true");

            // Creamos un nuevo div dentro del botón para añadirle decoración
            let decoBoton = document.createElement("div");
            decoBoton.className = "terminada-done";
            boton.appendChild(decoBoton);
        }
        // Volvemos la tarea a su estado normal si clickamos y estaba terminada
        else
        {
            task.style.textDecoration = "none";
            task.style.opacity = 1;
            task.setAttribute("haTerminado", "false");

            // Eliminamos el div quitándole la decoración
            let decoBoton = boton.querySelector(".terminada-done");
            if (decoBoton) 
            {
                boton.removeChild(decoBoton);
            }
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