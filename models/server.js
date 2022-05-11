const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/confing");


class Server{

    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.userPath='/api/usuarios';
        this.authPath = '/api/auth'

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
        this.app.use(express.static('public'))
    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server corriendo en el puero',this.port);
        })
    }
}

module.exports=Server;