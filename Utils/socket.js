// const productModel = new (require('../models/product'))();
// const io = require("socket.io-client");
// const API_URL =  "http://localhost:5000/";

// let client  = io(API_URL);
// let myData = "hello";
module.exports = (socket) => {

    // socket.on('send_email', async (data) => {
    //     console.log('server send data to client :-', data);
    //     let ProductData = await productModel.getAllProducts()
    //     socket.emit('receive_email', ProductData)
    // })

    // socket.on("join_room", (data) => {
    //     socket.join(data);
    //     console.log(`User with ID: ${socket.id} joined room: ${data}`);
    // });
    
    // socket.on("send_message", (data) => {
    //     socket.to(data.room).emit("receive_message", data);
    // });
    
    // socket.on("disconnect", () => {
    //     console.log("User Disconnected", socket.id);
    // });
}