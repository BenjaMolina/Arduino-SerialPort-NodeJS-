
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const servidor = http.createServer(app); //creamos el servidor

const socket = socketIo.listen(servidor);


const puertoSerial = require("serialport");
const Readline = puertoSerial.parsers.Readline; //Leer lineas del puerto serial
const parse = new Readline();

const puertoArduino = '/dev/cu.usbmodem1411'; //Puerto donde esta conectado el arduino

const serialArduino = new puertoSerial(puertoArduino,{ //Configuracion de los baudios como en el IDE de arduino
    baudRate:9600
});

serialArduino.on('open',function () { //cuando la conexion sea abiera
   console.log("Puerto abierto, escuchando"); 
});

serialArduino.on('data',function (data) { //Cuando recibe datos
    console.log(data.toString()); //convertimos a String los datos
});

serialArduino.on('err',function (error) { //Si llega a suceder algun error
    console.log(error.message);
});

servidor.listen(3000,function () { //Lanzamos el servidor en el puerto 3000
    console.log("Servidor en puerto 3000");
});