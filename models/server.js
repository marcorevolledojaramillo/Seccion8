const express = require("express");
const cors = require('cors');


class Server{

    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.userPATH='/api/usuarios';

        //Middleware
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
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

        this.app.use(this.userPATH, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server corriendo en el puero',this.port);
        })
    }
}

module.exports=Server;