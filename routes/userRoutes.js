// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/usersController');

// router.post('/create', userController.register);
// router.post('/registerWithImage', userController.register);
// router.post('/login',userController.login);

// module.exports = router;

const userController = require('../controllers/usersController');

module.exports = (app,upload)=>{
    app.post('/api/users/create',userController.register);
    app.post('/api/users/registerWithImage',upload.array('image',1),userController.registerWithImage);
    app.post('/api/users/login',userController.login);
}