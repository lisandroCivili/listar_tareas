import { Tarea } from './Tarea.js';
import colors from 'colors';
/**********************************************************************************************/
/*******************************************CUARTO*********************************************/
/**********************************************************************************************/
export class Tareas {//Una clase 'Tareas' la cual contendra todas las 'Tarea', dentro de la instancia _listado.

    /**********************************************************************************************/
    /*******************************************SEPTIEMO*******************************************/
    /**********************************************************************************************/

    //El getter sirve para acceder a las propiedades de los objetos, en este caso vamos a acceder a las propiedas que
    //VA A TENER _listado{}
    get listadoArr() {

        const listado = [];//Creo un array en el cual vamos a guardar las tareas

        //Objecy.keys ↓↓↓ lo q hace es acceder a las llaves de los objetos y devuelve un array con las mismas, por eso
        //con forEach le decimos que en la vble "tarea" vaya guardando los objetos "Tarea", referenciandolos por la llave
        //que en este caso el objeto _listado tiene la siguiente forma una vez llenado con tareas:
        /* _listado {
            ****'6fb1ffa2-84a4-4605-a495-4025659c555a' {
                id: '6fb1ffa2-84a4-4605-a495-4025659c555a',
                desc:  blablablablba,
                completadoEn: null
            }
        } */
        Object.keys(this._listado).forEach(key => {

            const tarea = this._listado[key];
            /* Entonces aqui hacemos referencia a **** para acceder, y nos devuelve lo que tiene **** dentro, que seria
            la tarea en si. */
            listado.push(tarea);
            //↑↑↑ Aqui guardamos la vble obtenida anteriormente en el array creado
        })

        return listado
    }

    constructor() {

        this._listado = {};//Este objeto contrenda cada Tarea dentro de suyo, con el id de las mismas como identificador
        //de cada uno

    }

    //Lo q hacemos aca es recibir el array que larga la funcion que comprueba si existe (leerData()) y a las tareas
    //reguardarlas en el objeto _listado, para luego pasar el mismo a listadoArr[]
    loadFromArray ( tareas = []){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
        
    }

    


    /**********************************************************************************************/
    /*******************************************SEXTO*********************************************/
    /**********************************************************************************************/
    crearTarea(desc = '') {//Este es el modulo por el cual recibimos la tarea y la guardamos en _listado, tiene como
        //unico parametro la descripcion de la tarea

        const tarea = new Tarea(desc);//En esta vble guardamos todo el objeto de la tarea q salió de la clase Tarea.
        //Por eso mismo podemos acceder a las propiedas del objeto haciendo tarea.id o tarea.desc y asi.

        this._listado[tarea.id] = tarea;//Esto NO ES UN ARREGLO, se lo escribe como tal pq es una de las formas de hacer
        //referencia a las propiedas de un objeto (en este caso _listado), si al hacer referencia a una propiedad esta no
        //existe, se crea automaticamente, q es lo pasa en este caso, y ademas se le asigna el objeto tarea, esto sirve
        //para que el uuid sirva como identificador de cada tarea, quedaria algo asi:

        /* _listado = {
                    uuid de tarea 1: 
                        Tarea {
                            id
                            desc
                            completadoEn
                        }
                    uuid de tarea 2:
                        Tarea {
                            id
                            desc
                            completadoEn
                        }
                    uuid de tarea 3: 
                        Tarea {
                            id
                            desc
                            completadoEn
                        }
        } */

    }


    listarTareas (){

        this.listadoArr.forEach((tareas, id) => {
            
            const idx = `${id + 1}.`.green;
            const {desc, completadoEn} = tareas;//desestructuracion, la vbles quedan con el nombre q esta entre {}.
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red//operador ternario
            //if completadoEn es verdadero {imprimir eso} else {imprimir esto}. Asi funciona.

            console.log(`${idx} ${desc} :: ${estado}`);

        });
        
    }
    
    listarFiltradas (complete = true){

        let contador = 0;
        this.listadoArr.forEach((tareas, id) =>{
            const {desc, completadoEn} = tareas;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red

            if (complete && completadoEn) {
                contador+=1;
                console.log(`${(contador + '.').green} ${desc} :: ${estado} ${completadoEn}`);
                //La func ".green" va seguida de un string, en este caso como sumamos un entero con un string = string.
            }else if (complete === false && !completadoEn) {
                contador+=1;
                console.log(`${(contador + '.').red} ${desc} :: ${estado}`);
            }
        });
    };

    borrarTareas(id = '') {

        if (this._listado[id]) {
            delete this._listado[id];
        }

    }

    toggleComplete(ids = []) {//Recibo un arreglo con ids seleccionados que me da el inquirer
        
        ids.forEach( id =>{
            
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {//Le pregunto si 'completadoEn' no existe, es decir si es != null, haga los sig ↓
                
                tarea.completadoEn = new Date().toISOString();//Lo rellena con la fecha en que se completa

            }
            
        })
        
        //Aca le pregunto que si el id no esta en el array 'ids' (con la func 'includes()'), entonces lo devuelva a null
        //para asi cuando desmarcamos una tarea esta pase a esta pendiente otra vez.
        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }






}   
