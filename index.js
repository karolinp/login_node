'use strict'

var moongose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

moongose.connect('mongodb://localhost:27017/medoo_db',  {useNewUrlParser: true} , (err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("La conexión a la base de datos esta funcionando correctamente...");

        app.listen(port, function(){
            console.log("Servidor del api rest de medoo en http://localhost:"+port);
        });
    }
});