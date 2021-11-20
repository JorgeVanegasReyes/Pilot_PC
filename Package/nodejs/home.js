// este archivo (home.js) es la conexion entre el cliente y la base de datos

const express=require('express');  //para importar los paquetes instalados
const mongoose=require('mongoose');
const PersonaSchema=require('./modelos/Persona');  //para importar el archivo que esta en modelos, Persona

const app=express();
const router=express.Router();//va establecer la conexion entre mis clientes y el servidor
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Conexion a base de datos
mongoose.connect("mongodb+srv://JorgeReyes:vanega975@clusterprogweb.um1er.mongodb.net/PilotPC?retryWrites=true&w=majority");
//el nombre de la base de datos es PilotPC

//CRUD 
// accion (get) obtiene datos
router.get('/',(req,res)=>{
    res.send("Iniciando API");
});

// hacer una consulta a la base de datos- buscando dentro de PersonaSchema toda la informacion y se ejecuta el metodo Get desde persona
router.get('/persona',(req,res)=>{
        PersonaSchema.find(function(err,datos){
    if (err){
        console.log("Error en la consulta a la Bd");
    }else{
        res.send(datos);
    }
  })
       
});

// accion (post) que envia informacion a la base de datos
router.post('/persona',(req,res)=>{
    let nuevaPersona=new PersonaSchema({
        idTarea:req.body.id,
        nombresTarea:req.body.nombre,
        apellidosPersona:req.body.apellido,
        direccionPersona:req.body.direccion,
        ciudadPersona:req.body.ciudad,
        movilPersona:req.body.movil,
        emailPersona:req.body.email,
        estadoPersona:req.body.estado,
        rolPersona:req.body.rol
    }); //request and response
    
    //enviando informacion a la base de datos y guardandolos
    nuevaPersona.save(function(err,datos){
        if (err){
            console.log(err);
        }
        res.send("La persona fue guardada exitosamente")
           
    })
}); 

app.use(router);   // se le indica a la aplicacion que ejecute el router
app.listen(3000,()=>{
    console.log("El Servidor esta corriendo");
})

