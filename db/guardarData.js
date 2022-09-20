import fs from 'fs';

//La vble ↓↓↓↓ archivo contiene el path del archivo en si
const archivo = './db/data.json';
//Esta funcion recibe el array de tareas
export const guardarData = (data) => {

    //Aqui guardamos el archivo en tipo string
    fs.writeFileSync(archivo, JSON.stringify(data));
}

//Esta func sirve para leer al archivo anteoriormente creado y guardado
export const leerData = () => {
    //'fs.esistsSybnc' se fija si el archivo existe y devuelve booleano
    if (!fs.existsSync(archivo)) {
        console.log("no hay nada")
        return null;//Si no existe termina la func y larga un null
    }
    //Si existe lo guardo en un archivo 
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});//'fs.readFileSync' recibe como 1er parametro el path del archivo 
    //a leer y 2do la codificacion del idioma, devuelve el archivo en string o un buffer, pero en este caso un string
    const infoArray = JSON.parse(info);//Aca lo convertimos de string a objeto
    
    return infoArray
}
