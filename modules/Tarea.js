import { v4 as uuidv4 } from 'uuid';//Es una dependencia que crea identificadores de numeros y letras unicos.

                /**********************************************************************************************/
                /*******************************************QUINTO*********************************************/
                /**********************************************************************************************/

export class Tarea {//Creo un modelo o "clase" que tendran todas las tareas

    constructor( desc ){

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;

    }

}
