const express = require('express');
const authentication = require('../Controller/authentication');
const {EcommerceController, upload} = require('../Controller/EcommerceController');
const router = express.Router();

router.post('/signup', authentication.signup );
router.post('/signin', authentication.login);
router.get('/token', authentication.protected, authentication.login);

router.post('/api',upload.single('tmp'), EcommerceController.addData)
router.get('/api', EcommerceController.getData)
router.get('/api/:id',  EcommerceController.getDataById)    // by id
router.put('/api/:id', upload.single('tmp'), EcommerceController.putData)
router.delete('/api/:id',  EcommerceController.deleteData)


module.exports = router;