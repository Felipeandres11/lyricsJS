import * as UI from './interfaz.js';
import {API} from './api.js';


UI.formularioBuscar.addEventListener('submit', (e) =>{

    e.preventDefault();

    //OBTENER DATOS DEL FORMULARIO 
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    console.log(artista);
    console.log(cancion);

    if(artista === '' || cancion === ''){
        UI.divMensajes.innerHTML = 'Error, todos los campos son obligatorios';
        UI.divMensajes.classList.add('error');

        setTimeout(()=> {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        },3000)
        
    }else {
        //EL FORMULARIO ESTA COMPLETO, REALIZAR CONSULTA A LA API
        const api = new API(artista, cancion)

        api.consultarAPI()
            .then(data => {
               if(data.respuesta.lyrics){
                   //LA CANCION EXISTE 

                   const letra = data.respuesta.lyrics;

                   UI.divResultado.textContent = letra;
                   
               }else {
                    //LA CANCION NO EXISTER
                    UI.divMensajes.innerHTML = 'La canción no existe, prueba con otra busqueda';
                    UI.divMensajes.classList.add('error');
            
                    setTimeout(()=> {
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        UI.formularioBuscar.reset();
                    },3000)
               }
            })
    }
});