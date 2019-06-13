'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas (req, res){
    res.status(200).send({
        message: 'Probando una accion del controlador de Usuarios del Api rest con Node y Mongo'
    });
}
function saveUser(req, res){
    var user = new User();

    var params = req.body;

    console.log(params);
    user.empresa = params.empresa;
    user.email = params.email;
    user.password = params.password;

    if(params.password){
     
            if(user.empresa != null  && user.email != null && user.password != null){
                //Guardar datos
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message:'Error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(400).send({message:'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user:userStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message: 'Rellena todos los campos'});
            }
       
    }else{
        res.status(500).send({message: 'Introduce la contraseña'})
    }
}

  
function loginUser(req, res){
    var params = req.body;

    var empresa = params.empresa;
    var email   = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase(), empresa: empresa.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                //Comprobar la contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        return res.status(200).send({token: jwt.createToken(user)});

                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse'});
                    }
                });
            }
        }
    });

}
module.exports = {
    pruebas,
    saveUser,
    loginUser
};