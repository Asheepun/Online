const express = require("express");
const app = express();

const port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip =  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

const server = app.listen(port, ip, () => {console.log("listening on " + ip + " on port " + port);});

app.use(express.static("public"));

const socket = require("socket.io");
const io = socket(server);

const users = new Array();

io.on("connection", socket => {
    console.log(socket.id + " has connected!");

    let data = {
        id: socket.id,
        users: users,
    }
    socket.emit("initialize", data);

    socket.on("initialized", data => {
        let olle = new User(socket.id, data.player);
        socket.broadcast.emit("newConnection", data);
    });
    socket.on("update", data => {
        socket.broadcast.emit("update", data);
    });
    socket.on("bullet", data => {
        socket.broadcast.emit("bullet", data);
    });
    socket.on("disconnect", socket => {
        console.log(socket);
        users.forEach(user => {
            if(user.id === socket.id){
                console.log(user);
                users.splice(users.indexOf(user), 1);
                let data = {
                    user: user,
                }
                io.sockets.emit("disconnection", data);
            }
        });
    });
});

class User{
    constructor(id, character){
        this.id = id;
        this.character = character;
        users.push(this);
    }
}
