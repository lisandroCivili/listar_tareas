import colors from 'colors';
import { guardarData, leerData } from './db/guardarData.js';
import {
    inquirerMenu,
    pausa,
    pregunta, 
    listadoBorrar,
    confirmar,
    completeTask
} from './helpers/inquirer.js';
import { Tareas } from './modules/Tareas.js';

console.clear();


const main = async () => {

    let opt = '';//Inicializo la opcion en string vacío.
    const tareas = new Tareas();//Creo la variable q contiene la clase tareas, al cual le pasaremos la Tarea, para q la
    //guarde en _listado.

    const lectorTarea = leerData();
    if (lectorTarea) {//Si existe se hace uso de la funcion ↓↓↓
        tareas.loadFromArray(lectorTarea);
    }

    do {
        opt = await inquirerMenu();//Espero q el usuario elija una opcion y la guardo en la vble 'opt' anteriormente
        //inicializada


        switch (opt) {//Con un switch le decimos q hacer segun la opcion elegida

            case '1':
                //Aca recibimos del prompt 'pregunta' inicializado en inquire.js, la descirpcion de la tarea y la 
                //guardamos en la vble descripcion.
                const descripcion = await pregunta('Describa la tarea:');
                tareas.crearTarea(descripcion);//Luego en la clase Tareas se encuentra el modulo crearTarea(desc), el 
                //cual estamos llamando en este caso para pasarle la descripcion de la misma y asi guardarla en el objeto
                //_listado = {}.
                break;
            case '2':
                tareas.listarTareas();
                break;
            case '3':
                tareas.listarFiltradas(true);
                break;
            case '4':
                tareas.listarFiltradas(false);
                break;
            case '5':
                const chekear = await completeTask(tareas.listadoArr);
                tareas.toggleComplete(chekear);
                break;
            case '6':
                //Aca listo las tareas disponibles para borrar y devuelvo el id de la tarea seleccionada
                const listaBorrar = await listadoBorrar(tareas.listadoArr);
                //Esta func devuelve un booleano
                const yesONo = await confirmar('¿Estas seguro bro?');
                //↓↓↓ Esto sirve para que haya una opcion de cancelar en caso de q no se quiera borrar nada
                if (listaBorrar !== 0) {
                    if (yesONo) {
                        //Se borra la misma con el metodo 'borrarTareas', que recibe el id q devuelve 'listaBorrar'
                        tareas.borrarTareas(listaBorrar)
                    }
                }
                //Si la func confirmar devulve true ↓↓↓

                /* Aca estamos borrando directamente del objeto" _listado", es decir que una vez q borramos una tarea,
                se vuelve a hacer el proceso de guardado en "listadoArr()" pero ya sin la tarea borrada, entonces cuando
                "guardarData()" recibe "listadoArr()" reemplaza el "data.json" sin la tarea borrada, 
                y asi sucesivamente con cualquier cambio que se vaya a hacer */
                break;
        }

        guardarData(tareas.listadoArr);

        await pausa();//Pausa para que el usuario confirme su eleccion

    } while (opt !== '0');

}

main();


