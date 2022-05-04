const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido =async (rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
         throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
     if(existeEmail){
         throw new Error(`el correo ${correo} ya esta registrado en la BD`);
     }
}

const idExiste = async(id='')=>{
    const existeID= await Usuario.findById(id)
    if(!existeID){
         throw new Error(`El id no se encuentra en la base de datos`)
    }
}
module.exports={
    esRoleValido,
    emailExiste,
    idExiste
}