const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = new Router();

router.post('/login',[
    check('correo', 'Correo invalido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password','La contraseña debe contener mas de 6 caracteres').isLength(6),
    validarCampos
],login);


module.exports= router;