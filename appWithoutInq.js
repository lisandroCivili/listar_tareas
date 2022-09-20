require('colors');
const {mostrarMenu, pausa} = require('./helpers/mensajes');

console.clear();


const main = async()=>{//func async pq espera la respuesta en este caso de 'mostrarMenu()'.

    let opt = '';//Inicializo la op en blanco cada vez q empieza la func
    do {
        opt = await mostrarMenu();//aca toma el valor que mandamos desde mostrarMenu

        await pausa();//Pausa para confirmar

    } while (opt !== '0');
    
}

main();