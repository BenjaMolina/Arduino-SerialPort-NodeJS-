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