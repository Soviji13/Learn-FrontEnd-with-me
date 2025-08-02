// Tengamos en cuenta de que tenemos el rango de 0 a 360 grados para cada aguja
// Habrán 60 posibles minutos y segundos -> 360/60 = 6 grados de inclinación por cada uno
// Habrán 12 principales horas -> 360/12 = 30 grados de inclinación por cada hora

const deg = 6;                                      // Grados por cada vez que rota

// Obtenemos los objetos a los que le aplicaremos movimiento
const hr = document.getElementById('hr');           
const min = document.getElementById('min');
const sec = document.getElementById('sec');


setInterval(() =>
{
    let day = new Date();                   // Obtenemos la fecha actual 

    // hh, mm y ss serán los grados que debe girar el contenedor según la hora
    let hh = day.getHours() * 30;           
    let mm = day.getMinutes() * deg;        
    let ss = day.getSeconds() * deg;

    /* 
        El translate (para centrar las agujas perfectamente) debemos ponerlo aquí, porque si lo ponemos en css,
        al aplicar JS, se sobreescribe lo del JS.

        rotateZ -> rota el elemento sobre sí mismo
    */

    /*
        La aguja de la hora rota hh grados + un desplazamiento para que se ajuste dentro del intervalo entre
        hora y hora, que depende del minuto en el que estamos

        Explicación del desplazamiento: Sabemos que por cada 60 minutos (= 360 grados), la aguja de la hora aumenta 30 grados.
        Entonces, por cada grado en los minutos, la aguja de la hora aumenta: grados del minuto/12 grados

    */
    hr.style.transform = `translate(-50%, -50%) rotateZ(${(hh) + (mm/12)}deg)`;
    // La aguja del minuto rota mm grados
    min.style.transform = `translate(-50%, -50%) rotateZ(${mm}deg)`;
    // La aguja del segundo rota ss grados
    sec.style.transform = `translate(-50%, -50%) rotateZ(${ss}deg)`;
});

