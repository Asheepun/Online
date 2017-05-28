const bullets = new Array();

let inRange = false;

class Bullet{
    constructor(pos, speed, id="id"){
        this.pos = pos;
        this.speed = speed;
        this.id = id;
        bullets.push(this);
    }
    draw(){
        ctx.fillStyle="yellow";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 7, 0, 2*Math.PI);
        ctx.fill();
    }
    update(){
        addVectors(this.pos, this.speed);
        obstacles.forEach(obstacle => {
            if(checkVectorColission(this.pos, obstacle)) bullets.splice(bullets.indexOf(this), 1);
        });
    }
}

function updateShoot(){
    if(pointer.down){
        if(!player.fireing){
            player.fireing = true;
            window.setTimeout(() => {player.fireing = false;}, 200);
            let vector = {x: player.pos.x + player.size.x/2, y: player.pos.y + player.size.y/2};
            let dif = getDifference(vector, pointer.pos);
            let mag = getMagnitude(dif);
            divideVector(dif, mag);
            multiplyVector(dif, 10);
            let olle = new Bullet(vector, {x: -dif.x, y: -dif.y}, player.id);
            let data = {
                bullet: olle,
            }
            socket.emit("bullet", data);
        }
    }
}
