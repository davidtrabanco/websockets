import {controller} from "../controller/main.js";

export const initWebSocket = (io) =>{

    let chatBuffer = [];

    io.on('connection', socket =>{
        
        //cargo el historial del chat desde archivo:
        controller.loadChat()
        .then( chatHistoric =>{ 
            chatBuffer = chatHistoric 
            //NUEVA CONEXION:
            socket.emit('chatHistoric', chatBuffer) //Envío historial de chat
        })

        //NUEVA CONEXION
        socket.emit('products', controller.getAllProducts()) //Envío Productos
        
        //PRODUCTOS------------------------------------------------
        socket.on('newProduct', product=>{
            controller.addProduct(product);//guardo el producto
            io.sockets.emit('products', controller.getAllProducts()) //Envío la lista actualizada a todas las conexiones
        })

        //CHAT-------------------------------------------
        //llega nuevo mensaje
        socket.on('newMessage', obMessage=>{
            //Agrego fecha y hora:
            obMessage.date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    
            //Guardo en memoria:
            chatBuffer.push(obMessage);
            controller.saveChat(chatBuffer);
    
            //Envío a todas las conexiones:
            io.sockets.emit('newMessage', [obMessage])
        })
    });
}