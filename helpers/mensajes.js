require('colors');

const mostrarMenu = ()=>{
    
    return new Promise ( resolve => {//Se hace de toda la func una Promise ya que en el archivo ppal se espera el resultado

        console.clear();
        console.log('====================='.green);
        console.log('Seleccione una opcion'.green);
        console.log('=====================\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);

        const readline = require('readline').createInterface({//El modulo 'readline' que viene ya por defecto en node,
        //lo que hace es crear una interfaz q lee una linea de entrada q viene de la consola, el cual se puede usar para
        //preguntar algo al usuario y devolver una respuesta o solo mostrar la eleccion
            
            input: process.stdin,//Esto le dice a node que tenemos q pausar la ejecucion, esperar alguna respuesta y
            //q el usuario presione ENTER.
            output: process.stdout//Y este sirve para mostrar una pregunta o pedirle al usuario que ingrese algo.

        });
        //Aqui hacemos uso de la interfaz, con '.question' y tambien del proceso de output, la misma tiene un callback
        //que recibe la respuesta y cierra la funcion con 'readline.close' ya q si no se hace, quedaria esperando una
        //respuesta infinitamente.
        readline.question('Seleccione una opción: ', (opt)=>{
            readline.close();
            resolve(opt);
        });

    })
    
}

//Esta func hace lo q dice su nombre, dar una pausa y darle la opcion al usuario de confirmar la eleccion, para asi luego
//dde recibir el ENTER continuar con el proceso.
const pausa = ()=> { 

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
        
            input: process.stdin,
            output: process.stdout
    
        });
    
        readline.question(`\nPresione ${'ENTER'.blue} para continuar`, (opt)=>{
            readline.close();//En este caso no nos importa la opcion elegida, solamente q el usuario presiono o no ENTER 
            resolve();
        })

    })


}

module.exports={
    mostrarMenu,
    pausa
}