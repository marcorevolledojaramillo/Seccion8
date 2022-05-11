const { response } = require("express");
const usuario = require("../models/usuario");
const Usuario=require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-JWT");


const login= async(req, res=response)=>{
    const {correo, password}= req.body;
    try{
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / password son incorrectos - correo'
            });
        };

        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / password son incorrectos - estado:false'
            });
        }

        //verigicar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / password son incorrectos - contraseña'
            });
        }
        //generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        })
    }catch(error){
        console.log(error);
       res.status(500).json({
        msg:'Hable con el administrador'
    });
    }
    
}

module.exports={
    login
}