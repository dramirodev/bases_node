const {Router} = require('express');
const {userPut, userGet, userPost, userDelete, userPatch} = require("../controllers/user");
const {check} = require("express-validator");
const {validateAttributes, isAdmin, validateJwt} = require("../middlewares");
const {validateRole, emailExists, userExists} = require("../helpers/database-validators");

const router = Router();

router.get('/', userGet);
router.put('/:id', [
  check('id', 'Id is not valid').isMongoId(),
  check('id').custom(userExists),
  check('role').custom(validateRole),
  validateAttributes
], userPut);
router.post('/', [
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(emailExists),
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({min: 6}),
  check('role').custom(validateRole),
  validateAttributes
], userPost);

router.delete('/:id', [
  validateJwt,
  isAdmin,
  check('id', 'Id is not valid').isMongoId(),
  check('id').custom(userExists),
  validateAttributes
], userDelete);
router.patch('/', userPatch);


module.exports = router;
