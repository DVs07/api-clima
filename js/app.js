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
}

function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    // console.log(mensaje);
    
    
    if(!alerta){
        // Creo el contenedor de la alerta a mostrar
        const alerta = document.createElement('DIV');

        alerta.classList.add('bg-red-100','border-red-400','text-red-700', 'px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center','border');

        alerta.innerHTML = `
        <strong class="font-bold flex inline align-center justify-center">ERROR<svg class="w-6 h-6 dark:text-white mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
        </svg></strong>
        <span class="block">${mensaje}</span>
        `
        // Agrego el alerta al DOM
        container.appendChild(alerta);


        // Elimino la alerta despues de 3 segundos
        setTimeout(() => {
            alerta.remove();
        },3000);
    }
    
}