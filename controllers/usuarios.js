const {response} = require('express')

const getUsuarios = (req,res = response)=>{

    const {q,nombre,lang,apikey}= req.query;
    res.json({
        msg:'Get API-Controller',
        q,
        nombre,
        apikey,
        lang
    })
}

const putUsuarios = (req,res=response)=>{
    const {id} = req.params;

    res.json({
        msg:'Put API-Controller',
        id
    });
}

const postUsuarios = (req,res)=>{
    const body = req.body;

    res.status(201).json({
        msg:'Post API-Controller',
        body
    });
}

const deleteUsuarios = (req,res)=>{
    res.json({
        msg:'Delete API-Controller'
    });
}

const patchUsuarios = (req,res)=>{
    res.json({
        msg:'Patch API-Controller'
    });
}
module.exports={
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    patchUsuarios
}