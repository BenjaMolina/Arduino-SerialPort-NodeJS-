
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const servidor = http.createServer(app); //creamos el servidor

const socket = socketIo.listen(servidor);

socket.on('connection',function (socket) {
    console.log("Nueva conexion a Socket");
});

//Cuando entre a la ruta inicial de la aplicacion
app.get('/',function (req,res,next) {
    res.sendFile(__dirname + '/index.html'); //Mostramos el archivo index.html
});

const puertoSerial = require("serialport");
const Readline = puertoSerial.parsers.Readline; //Leer lineas del puerto serial


const puertoArduino = '/dev/cu.usbmodem1411'; //Puerto donde esta conectado el arduino

//Configuracion de los baudios como en el IDE de arduino
const serialArduino = new puertoSerial(puertoArduino,{ 
    baudRate:9600
});

//Leemos los datos limpiandolos de cualquier salto de linea
const parse = serialArduino.pipe( new Readline({delimiter:'\r\n'}));

//cuando la conexion sea abierta en el puerto serial
parse.on('open',function () { 
   console.log("Puerto abierto, escuchando"); 
});

//Cuando recibe datos por el serial
parse.on('data',function (data) { 
    //console.log(typeof data); //muestra el tipo de dato
    console.log(parseInt(data,10)); //convertimos a numero base 10

    //Mandamos a todos los clientes por socket los datos de arduino
    socket.emit('arduino',{
        valor: data.toString()
    });
});

//Si llega a suceder algun erro
parse.on('err',function (error) { 
    console.log(error.message);
});




//Lanzamos el servidor en el puerto 3000
servidor.listen(3000,function () { 
    console.log("Servidor en puerto 3000");
});