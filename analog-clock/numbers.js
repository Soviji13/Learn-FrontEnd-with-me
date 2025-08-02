/*  MANEJO DE RESIZE DE VENTANA */
function posicionarNumeros()
{
    const clock = document.getElementById('clock');

    // Limpiamos los números que ya existían
    const existingNumbers = document.querySelectorAll('.number');
    existingNumbers.forEach(num => num.remove());


    // Recalculamos todo
    const radius = clock.clientWidth/2;    // Radio del reloj

    // Centro del reloj
    const centerX = radius;                
    const centerY = radius;

    // Creación de los 12 números
    for(let i = 1; i <= 12; i++)
    {
        // Cálculo del ángulo que se debería formar entre el número y el origen
        const angle = (i-3) * (Math.PI * 2) / 12;

        // número -> centro del reloj + radio - 30px (para darle margen) * posición matemáticamente de donde debería estar
        const x = centerX + (radius * 0.85) * Math.cos(angle);   
        const y = centerY + (radius * 0.85) * Math.sin(angle);

        // Creación visual del número
        const number = document.createElement('div');       // Creamos un div
        number.classList.add('number');                     // Le ponemos la clase number al div (podremos modificarlo así en css)
        number.textContent = i;                             // Contenido del div es i

        // Posicionamiento del número 
        number.style.position = 'absolute';
        number.style.left = `${x}px`;
        number.style.top = `${y}px`;
        number.style.transform = 'translate(-50%, -50%)';

        clock.appendChild(number);
    }
}

posicionarNumeros();

// Llamar cada vez que cambie el tamaño
window.addEventListener('resize', posicionarNumeros);