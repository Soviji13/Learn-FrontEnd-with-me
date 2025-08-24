// Variables

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

            // Creamos un nuevo div dentro del botón para añadirle decoración
            let decoBoton = document.createElement("div");
            decoBoton.className = "terminada-done";
            event.target.appendChild(decoBoton);
        }
        // Volvemos la tarea a su estado normal si clickamos y estaba terminada
        else
        {
            task.style.textDecoration = "none";
            task.style.opacity = 1;
            task.setAttribute("haTerminado", "false");

            // Eliminamos el div quitándole la decoración
            let decoBoton = event.target.querySelector(".terminada-done");
            if (decoBoton) 
            {
                event.target.removeChild(decoBoton);
            }
        }
    }

    // Si se clickó, vemos si el evento que ha ocurrido es que hemos pulsado el botón con la clase .terminada-done
    if (event.target.classList.contains("terminada-done")) 
    {
        // Obtenemos la tarea correspondiente
        const casillaAsociada = event.target.parentElement;
        const contenedorAsociado = casillaAsociada.parentElement;
        const task = contenedorAsociado.querySelector("li");

        // Le ponemos de nuevo que no ha terminado
        task.style.textDecoration = "none";
        task.style.opacity = 1;
        task.setAttribute("haTerminado", "false");

        // Eliminamos el botón de casilla asociada
        let decoBoton = event.target;
        casillaAsociada.removeChild(decoBoton);
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
    }
});