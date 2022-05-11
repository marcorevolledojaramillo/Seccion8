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
        console.log(1)
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / password son incorrectos - correo'
            });
        };
        console.log(2)

        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / password son incorrectos - estado:false'
            });
        }
        console.log(3)

        //verigicar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        console.log(4)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / password son incorrectos - contraseña'
            });
        }
        console.log(5)
        //generar JWT
        const token = await generarJWT(usuario.id);
        console.log(6)
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