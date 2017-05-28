let c, ctx, cols, rows, player, socket, Id;

let offSet = {x: 0, y: 0};

function start(){
    socket = io();
    socket.on("initialize", data => {
        Id = data.id;
        data.users.forEach(user => {
            let olle = new Player(user.character.pos, user.id);
        });
        initialize();
    });
    socket.on("newConnection", data => {
        let olle = new Player(data.player.pos, data.player.id);
    });
    socket.on("disconnection", data => {
        players.forEach(player => {
            if(player.id === data.user.id)
                players.splice(players.indexOf(player));
        });
    });
    socket.on("update", data => {
        players.forEach(player => {
            if(player.id === data.player.id)
                player.pos = data.player.pos;
        });
    });
    socket.on("bullet", data => {
        let olle = new Bullet(data.bullet.pos, data.bullet.speed, data.bullet.id);
    });
}

window.onload = start();

function initialize(){
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    pointer.canvas = c;
    c.width="400";
    c.height="400";
    offSet = {x: 0, y: 0};
    let olle = new Player({x: c.width/2, y: c.width/2}, Id);
    players.forEach(pla => {
        if(pla.id === Id) player = pla;
    });
    buildWorld();
    cols = world.length;
    rows = world[0].length;
    let data = {
        player: player,
    }
    socket.emit("initialized", data);
    mainLoop();
    c.addEventListener("mousedown", handlePointerDown);
    c.addEventListener("mouseup", handlePointerUp);
    c.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
}

function draw(){
    ctx.save();
    ctx.translate(offSet.x, offSet.y);
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, rows*scl, cols*scl);
    drawArray(obstacles);
    drawArray(bullets);
    drawArray(players);
    drawArray(bushes);
    ctx.restore();
}

function update(){
    updateShoot();
    updateArray(bullets);
    updateArray(players);
    updateOffSet();
    emitUpdate();
}

function emitUpdate(){
    let data = {
        player: player,
    }
    socket.emit("update", data);
}

function mainLoop(){
    update();
    draw();
    window.setTimeout(mainLoop, 1000/30);
}

function drawArray(array){
    array.forEach(object => {object.draw();});
}

function updateArray(array){
    array.forEach(object => {object.update();});
}

function updateOffSet(){
    if(offSet.x > 0 )
        offSet.x = 0;
    else if(offSet.x < -world[0].length*scl + c.width)
        offSet.x = -world[0].length*scl + c.width;
    if(offSet.y > 0)
        offSet.y = 0;
    else if(offSet.y < -world.length*scl + c.height)
        offSet.y = -world.length*scl + c.height;
}
