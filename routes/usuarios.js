
const {Router} = require('express');
const { check } = require('express-validator');
const { getUsuarios,
     putUsuarios,
     postUsuarios,
     deleteUsuarios,
     patchUsuarios } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, idExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.get('/', getUsuarios);

router.put('/:id',[
     check('id', 'No es unID valido').isMongoId(),
     check('id').custom(idExiste),
     check('rol').custom(esRoleValido),
     validarCampos
],
putUsuarios)

router.post('/',[
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('password','El password debe contener mas de 6 caracteres').isLength({min:6}),
     check('password','El password es obligatorio').not().isEmpty(),
     check('correo','El correo no es valido').isEmail(),
     check('correo').custom(emailExiste),
     // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
     check('rol').custom(esRoleValido),
     validarCampos
],postUsuarios)

router.delete('/:id',[
     check('id','No es un id Valido').isMongoId(),
     check('id').custom(idExiste),
     validarCampos
],deleteUsuarios)

router.patch('/',patchUsuarios)

module.exports= router;