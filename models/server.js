const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/confing");
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.paths= {
            auth: '/api/auth',
            categorias:'/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/usuarios',
            uploads:'/api/uploads',
            busqueda:'/api/busqueda'
            
        }

        //Conectar Databbase
        this.conectarDB();

        //Middleware
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del bbody
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));

        //FuleUpload - Cargar archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes(){

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.busqueda, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            
            console.log(`Server corriendo en http://localhost:${this.port}`);
        })
    }
}

module.exports=Server;