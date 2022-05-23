const { response } = require("express");
const Usuario=require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verifity");


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

const googleSignIn= async(req, res=response) => {

    const {id_token} = req.body;
    try{

        const {correo, nombre, img}= await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const salt = bcryptjs.genSaltSync();
            const password = bcryptjs.hashSync('123456', salt);
            const data= {
                nombre,
                correo,
                password,
                img,
                google:true
            };
            
            usuario = new Usuario(data);
            await usuario.save();
        };

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Hable con ela dministrados, Usuario bloqueado'
            })
        }

         //generar JWT
         const token = await generarJWT(usuario.id);


        res.json({
            msg:'todo Bien',
            usuario,
            token
        })
    }catch(err){
        res.status(400).json({
            msg:'Token de Google no es valido',
            
        })
    }
    

}

module.exports={
    login,
    googleSignIn
}