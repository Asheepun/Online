const players = new Array();

class Player{
    constructor(pos = {x: c.width/2-scl/2, y: c.width/2-scl/2}, id="id"){
        this.pos = pos;
        this.size = {x: scl, y: scl,};
        this.speed = {up: 0, down: 0, left: 0, right: 0,};
        this.fireing = false;
        this.id = id;
        players.push(this);
    }
    draw(){
        ctx.fillStyle="white";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(){
        if(this.id === Id){
            this.pos.x += this.speed.right;
            this.pos.x -= this.speed.left;
            this.pos.y += this.speed.down;
            this.pos.y -= this.speed.up;

            if(keys.s.down) this.speed.down = 5;
                else this.speed.down = 0;
            if(keys.w.down) this.speed.up = 5;
                else this.speed.up = 0;
            if(keys.a.down) this.speed.left = 5;
                else this.speed.left = 0;
            if(keys.d.down) this.speed.right = 5;
                else this.speed.right = 0;

            let colission = checkColission(this, obstacles);
            if(colission.up) this.pos.y += 5;
            if(colission.down) this.pos.y -= 5;
            if(colission.left) this.pos.x += 5;
            if(colission.right) this.pos.x -= 5;

            offSet = {x: -this.pos.x+c.width/2-scl/2, y: -this.pos.y+c.height/2-scl/2};
        }
        bullets.forEach(bullet => {
            if(checkVectorColission(bullet.pos, this)){
                if(bullet.id != this.id)
                    this.pos = {x: c.width/2-scl/2, y: c.width/2-scl/2};
            }
        });
    }
}
