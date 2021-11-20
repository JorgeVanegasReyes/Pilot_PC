//codificacion de los archivos que va a la base de datos
//Schema es la comunicacion entre el servidor (home.js) y la base de datos, son una especie de clase que se le dan atributos

// en cada archivo toca importar los paquetes necesarios

const mongoose=require('mongoose');

// esto es lo que se genera en la base de datos, se coloca (let) para definir la variable
let PersonaSchema=new mongoose.Schema ({
    idPersona:String,
    nombresPersona:String,
    apellidosPersona:String,
    direccionPersona:String,
    ciudadPersona:String,
    movilPersona:String,
    emailPersona:String,
    estadoPersona:String,
    rolPersona:String
});

module.exports=mongoose.model('persona', PersonaSchema, 'Persona'); //tres atributos --1datos que se obtienen de una pagina llamada persona datos de un formulario, 2PersonaSchema nombre del schema ,3Persona es el nombre que se le da a la coleccion