const {Router} = require('express');
const {userPut, userGet, userPost, userDelete, userPatch} = require("../controllers/user");

const router = Router();

router.get('/', userGet);
router.put('/:id', userPut);
router.post('/', userPost);
router.delete('/', userDelete);
router.delete('/', userPatch);


module.exports = router;
