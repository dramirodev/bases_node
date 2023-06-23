const {Router} = require('express');
const {check} = require('express-validator');
const {login} = require("../controllers/auth");
const {validateAttributes} = require("../middlewares/validate-attributes");

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateAttributes
] ,login);



module.exports = router;
