import colors from 'colors';
//La ultima version de esta dependecia requiere el uso de la ultima version de ECMAScript, por eso se necesita usar
//import y export en vez de require y module.export.
import inquirer from 'inquirer';

            
            /**********************************************************************************************/
            /*******************************************PRIMERO********************************************/
            /**********************************************************************************************/
const inquirerMenu = async () => {

    //Crea una varible de tipo array, ya que es lo que necesita inquirer para definir el tipo de menu, nombre, 
    //mensaje a mostrar y lo mas importante las opciones, estas pueden guardarse directamaente en el array o 
    //si se necesita tomar el 'value' de la opcion, en un objeto
    const menuOpts = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Que desea hacer?',
            choices: [
                {
                    value: '1',
                    name: `${'1.'.green} Crear tarea`
                },
                {
                    value: '2',
                    name: `${'2.'.green} Listar tareas`
                },
                {
                    value: '3',
                    name: `${'3.'.green} Listar tareas completadas`
                },
                {
                    value: '4',
                    name: `${'4.'.green} Listar tareas pendientes`
                },
                {
                    value: '5',
                    name: `${'5.'.green} Completar tarea(s)`
                },
                {
                    value: '6',
                    name: `${'6.'.green} Borrar tarea`
                },
                {
                    value: '0',
                    name: `${'0.'.green} Salir`
                }
            ]
        }
    ]
    

    console.clear();
    console.log('====================='.green);
    console.log('Seleccione una opcion');
    console.log('=====================\n'.green);
    //Con el await, espero la respuesta del prompt de inquirer que seria el value que tiene la opcion elegida
    //y la guardo en la vble desestructurada {opcion}
    const {opcion} = await inquirer.prompt(menuOpts);
    return opcion;
    
}
                /**********************************************************************************************/
                /*******************************************TERCERO********************************************/
                /**********************************************************************************************/
const pausa = async () => {
    
    const pausarMenu = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'ENTER'.blue} para continuar`
        }
    ]
    
    console.log('\n');
    await inquirer.prompt(pausarMenu);
}

                /**********************************************************************************************/
                /*******************************************SEGUNDO********************************************/
                /**********************************************************************************************/
const pregunta = async (message) => {

    const descrip = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value < 1) {//Si el usuario no escribe nada no se manda la descripcion
                    return 'Por favor ingrese una tarea';
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(descrip);
    return desc;
}

const listadoBorrar = async(tareas = []) => {
    
    const choices = tareas.map((tareas, i)=>{
        let idx = `${i+1}.`.green
        return {
            value: tareas.id,//Esto es el id que devuelve la func al seleccionar una opcion
            name: `${idx} ${tareas.desc}`//Esta es la tarea a seleccionar.
        }
    })

    const preguntas =  [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar tarea',
            choices
        }
    ]

    choices.unshift({//'unshift' agrega algo al principio de un array
        value: '0',
        name: `${'0'.green}. Cancelar`
    })

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) =>{
    const pregunta = [
        {
            type: 'confirm',//'confirm' devuelve un booleano
            name: 'ok',
            message
            //default: true o false -- se le puede agregar esta propiedad en caso de q sea necesario
        }
    ]
    const {ok} = await inquirer.prompt(pregunta);//Aca guardo la respueste true o false.
    return ok;

}

const completeTask = async(tareas=[]) => {

    const choices = tareas.map((tareas, i)=>{
        let idx = `${i+1}.`.green
        return {
            value: tareas.id,//Esto es el id que devuelve la func al seleccionar una opcion
            name: `${idx} ${tareas.desc}`,//Esta es la tarea a seleccionar.
            checked: (tareas.completadoEn) ? true : false
            //Ternario que se aplica para cada opcion, si 'completadoEn' existe true sino false
        }
    })

    const check =  [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccionar',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(check);
    return ids;

}

export { inquirerMenu, 
        pausa,
        pregunta, 
        listadoBorrar,
        confirmar,
        completeTask};