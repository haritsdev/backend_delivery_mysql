const res = require('express/lib/response');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {

  login(req,res){

      const email = req.body.email;
      const password = req.body.password;

      User.findByEmail(email,async (err, user) => {
        console.log('USER',user);
        console.log('ERROR',err);
        if (err) {
          return res.status(501).json({
            success: false,
            message: 'Error at user registration',
            error: err,
          });
        }

        if(!user){
          return res.status(401).json({
            success: false,
            message: 'Email does not exist',
            error: err,
          });

          }else{
            
          const isPasswordValid = await bcrypt.compare(password,user.password);

          if(isPasswordValid){
            const token = jwt.sign({id:user.id,email:user.email},keys.secretOrKey,{});
  
            const data = {
              id: user.id,
              name: user.name,
              lastname: user.email,
              phone: user.phone,
              image:user.image,
              session_token:`JWT ${token}`
            }
  
            return res.status(201).json({
              success: true,
              message: 'User authenticated',
              data: data, //data from new user
            });
          }else{
            return res.status(401).json({
              success: false,
              message: 'email or password does not exist',
            });
          }
        }
      
      });


  },

  register(req, res) {
    const user = req.body; // get user from body
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error at user registration',
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Register new user success',
        data: data, //data from new user
      });
    });
  },

  async registerWithImage(req, res) {
    const user = JSON.parse(req.body.user); // get user from body

    const files = req.files;

    if(files.length>0){
      const path = `image_${Date.now()}`;
      const url = await storage(files[0],path);

      if(url !=undefined && url !=null){
        user.image= url;
      }
    }    

    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error at user registration',
          error: err,
        });
      }

      user.id=data;
      const token = jwt.sign({id:user.id,email:user.email},keys.secretOrKey,{});
      const session_token = `JWT ${token}`;
  
      return res.status(201).json({
        success: true,
        message: 'Register new user success',
        data: user, //data from new user
      });
    });
  },
};
