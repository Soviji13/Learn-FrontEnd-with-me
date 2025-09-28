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

// Variable global para recargar la página para que no pete (intentaré mejorarlo)
let nCambios = 0;

// Siempre que abramos la 
document.addEventListener('DOMContentLoaded', function() {
    // Limpiar cualquier tarea que quedó buggeada
    const tareasBuggeadas = document.querySelectorAll('li[contenteditable="true"]');
    tareasBuggeadas.forEach(tarea => {
        tarea.contentEditable = false;
    });

    document.getElementById("tasks-container").addEventListener("click", editarTarea);
});

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
        //event.target.focus();

        /* Haremos dos listeners, uno por si clickamos fuera del contenedor y otro por si le damos a enter */
        event.target.addEventListener("keydown", manejarTeclas);
        event.target.addEventListener("blur", finalizarEdicion);

        /* Función para finalizar la edición */
        function finalizarEdicion()
        {
            // Si lo dejamos vacío
            if(event.target.textContent.trim() === "")
            {
                event.target.textContent = textoOriginal;
            }

            // Descartamos la edición
            event.target.contentEditable = false;
            
            // Guardamos los datos
            saveData();

            // Quitamos los listener
            document.getElementById("tasks-container").removeEventListener("click", editarTarea);
            document.getElementById("tasks-container").addEventListener("click", editarTarea);
        }

        /* Función para manejar las teclas */
        function manejarTeclas (e)
        {
            if(e.key === "Enter")
            {
                e.preventDefault(); // Evitamos saltos de línea
                finalizarEdicion();

            if(nCambios >= 1000)
            {
                nCambios = 0;          
                location.reload();
            }
            }
            else if(e.key === "Escape")
            {
                event.target.textContent = textoOriginal;
                finalizarEdicion();
            }
            else if(e.key === "ArrowDown")  // Pasamos a la siguiente tarea 
            {
                nCambios++;

                // Evitamos comportamiento por defecto
                e.preventDefault();
                // Terminamos de editar la actual
                finalizarEdicion();

                // Buscamos la siguiente tarea
                const contenedorActual = event.target.parentElement;
                //alert("Contenedor actual: " + contenedorActual.className);
                const siguienteContenedor = contenedorActual.nextElementSibling;

                // Si hay una siguiente
                if(siguienteContenedor)
                {
                    //alert("✅ Hay siguiente contenedor");
                    // Accedemos a su campo de texto
                    const siguienteTarea = siguienteContenedor.querySelector("li");
                    
                    // Si hay siguiente tarea, simulamos doble click
                    if(siguienteTarea)
                    {
                        /*siguienteTarea.contentEditable = true;
                        siguienteTarea.focus();*/
                        editarTareaSig(siguienteTarea);
                        // Hacemos los mismos manejadores fuera de
                    }
                }
                // Si no hay una siguiente
                else
                {
                    event.target.focus;
                    editarTareaSig(event.target);
                }
            }
            else if(e.key === "ArrowUp")  // Pasamos a la anterior tarea 
            {
                nCambios++;

                // Evitamos comportamiento por defecto
                e.preventDefault();
                // Terminamos de editar la actual
                finalizarEdicion();

                // Buscamos la anterior tarea
                const contenedorActual = event.target.parentElement;
                const siguienteContenedor = contenedorActual.previousElementSibling;

                // Si hay una siguiente
                if(siguienteContenedor)
                {
                    // Accedemos a su campo de texto
                    const siguienteTarea = siguienteContenedor.querySelector("li");
                    
                    // Si hay siguiente tarea, simulamos doble click
                    if(siguienteTarea)
                    {
                        editarTareaSig(siguienteTarea);
                        // Hacemos los mismos manejadores fuera de
                    }
                }
                // Si no hay una siguiente
                else
                {
                    event.target.focus;
                    editarTareaSig(event.target);
                }
            }
        } 
    }
}

// Creamos una función una vez estamos en el modo editarTarea para editar las demás
// Esta función será recursiva siempre que se pulse la tecla para la siguiente tarea
function editarTareaSig (tarea)
{
    // Para forzar reload si el usuario lleva muchos nCambios aunque no le de enter
    // 1000 equivale a 20 cambios (se aumentan de forma recursiva)
    if(nCambios >= 1500)
    {
        // Descartamos la edición para que no se buguee
        tarea.contentEditable = false;
        saveData();
        nCambios = 0;
        location.reload();
    }

    tarea.contentEditable = true;
    tarea.focus();

    // Ponemos el cursor al final
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        let range = document.createRange();
        range.selectNodeContents(tarea);
        range.collapse(false); // Colapsa al final del rango
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    tarea.removeEventListener("keydown", manejarTeclas);
    tarea.removeEventListener("blur", finalizarEdicion);

    /* Haremos dos listeners, uno por si clickamos fuera del contenedor y otro por si le damos a enter */
    tarea.addEventListener("keydown", manejarTeclas);
    tarea.addEventListener("blur", finalizarEdicion);

    /* Función para finalizar la edición */
    function finalizarEdicion()
    {
        // Si lo dejamos vacío
        if(tarea.textContent.trim() === "")
        {
            tarea.textContent = textoOriginal;
        }

        // Descartamos la edición
        tarea.contentEditable = false;
            
        // Guardamos los datos
        saveData();
    }

    /* Función para manejar las teclas */
    function manejarTeclas (e)
    {
        if(e.key === "Enter")
        {
            e.preventDefault(); // Evitamos saltos de línea
            finalizarEdicion();
            if(nCambios >= 1000)
            {
                nCambios = 0;
                location.reload();
            }
        }
        else if(e.key === "Escape")
        {
            tarea.textContent = textoOriginal;
            finalizarEdicion();
        }
        else if(e.key === "ArrowDown")  // Pasamos a la siguiente tarea (ctrl+Enter)
        {
            nCambios++;

            // Evitamos comportamiento por defecto
            e.preventDefault();
            // Terminamos de editar la actual
            finalizarEdicion();

            // Buscamos la siguiente tarea
            const contenedorActual = tarea.parentElement;
            const siguienteContenedor = contenedorActual.nextElementSibling;

            // Si hay una siguiente
            if(siguienteContenedor)
            {
                // Accedemos a su campo de texto
                const siguienteTarea = siguienteContenedor.querySelector("li");
                    
                // Si hay siguiente tarea, simulamos doble click
                if(siguienteTarea)
                {
                    editarTareaSig(siguienteTarea);
                    // Hacemos los mismos manejadores fuera de
                }
            }
            // Si no hay una siguiente
            else
            {
                tarea.focus;
                editarTareaSig(tarea);
            }
        }
        else if(e.key === "ArrowUp")  // Pasamos a la anterior tarea 
        {
            nCambios++;

             // Evitamos comportamiento por defecto
            e.preventDefault();
            // Terminamos de editar la actual
            finalizarEdicion();

            // Buscamos la anterior tarea
            const contenedorActual = tarea.parentElement;
            const siguienteContenedor = contenedorActual.previousElementSibling;

            // Si hay una siguiente
            if(siguienteContenedor)
            {
                // Accedemos a su campo de texto
                const siguienteTarea = siguienteContenedor.querySelector("li");
                    
                // Si hay siguiente tarea, simulamos doble click
                if(siguienteTarea)
                {
                    editarTareaSig(siguienteTarea);
                    // Hacemos los mismos manejadores fuera de
                }
            }
            // Si no hay una siguiente
            else
            {
                tarea.focus;
                editarTareaSig(tarea);
            }
        }
    } 
}