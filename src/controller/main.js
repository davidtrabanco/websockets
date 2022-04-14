import {products} from "./productsClass.js";
import FileManager from "./fileManager.js";

export const controller = {};

//PRODUCTOS----------------------------------------------------------
controller.getAllProducts = ()=>{
    const productExist = products.products.length > 0 ? true : false;
    return {
        productsList: products.getAllProducts(),
        listExists: productExist,
        };
}

controller.addProduct = (product)=>{
    return products.addProduct(product);
}

//CHAT----------------------------------------------------
const chatFile = new FileManager('../db/chatHistoric.txt')

controller.saveChat = async (chat) =>{
    //guardo el chat completo
    chatFile.save(chat);
}

controller.loadChat = () => {
    return chatFile.readFile();
}
