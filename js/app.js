const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(event){
    event.preventDefault();

    // Validar el formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    // console.log(ciudad);
    // console.log(pais);
    
    if(ciudad === '' || pais === ''){
        // Muestro un mensaje de error
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    // console.log(mensaje);
    
    
    if(!alerta){
        // Creo el contenedor de la alerta a mostrar
        const alerta = document.createElement('DIV');

        alerta.classList.add('bg-red-100','border-red-400','text-red-700', 'px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center','border');

        alerta.innerHTML = `
        <span class="flex inline align-center justify-center">
        <strong class="font-bold flex inline "><svg class="w-6 h-6 dark:text-white mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
        </svg>ERROR:</strong><span class="ml-2">${mensaje}</span></span>
        `
        // Agrego el alerta al DOM
        container.appendChild(alerta);


        // Elimino la alerta despues de 3 segundos
        setTimeout(() => {
            alerta.remove();
        },3000);
    }
    
}

function consultarAPI(ciudad, pais) {
    const appId = '9bdccbd5be1451751afe9d7a28c3d86c';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // console.log(url);
    // Mostrar spinner de carga
    mostrarSpinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();

            if(datos.cod === '404'){
                mostrarAlerta('Ciudad no encontrada');
                return;
            }

            // Mostrar el resultado
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    const {name, main:{temp, temp_max, temp_min}} = datos;

    actual = convertirGrados(temp);
    max = convertirGrados(temp_max);
    min = convertirGrados(temp_min);


    // Temperatura Actual y noimbre de la ciudad
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `${name}`;
    nombreCiudad.classList.add( 'text-2xl');

    const tempActual = document.createElement('p');
    tempActual.innerHTML = `${actual} &#8451`;
    tempActual.classList.add('font-bold', 'text-6xl');

    // Temperatura Maxima
    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451`;
    tempMax.classList.add('text-lg');

    // Temperatura Minima
    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451`;
    tempMin.classList.add('text-lg');
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white', 'contenido');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);

    resultado.appendChild(resultadoDiv);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
}

const convertirGrados = grados => parseInt(grados - 275.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner(){
    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('sk-cube-grid');

    spinner.innerHTML = `
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    `;

    resultado.appendChild(spinner);
}