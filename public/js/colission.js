function checkColission(character, objects){
    let result = {
        up: false,
        down: false,
        right: false,
        left: false,
        center: false,
        object: {
            up: false,
            down: false,
            left: false,
            right: false,
            center: false,
        },
        outOfBounds: {
            right: false,
            left: false,
            up: false,
            down: false,
            top: false,
        },
    }
    //down
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if((character.pos.y + character.size.y >= object.pos.y
        && character.pos.y + character.size.y <= object.pos.y + object.size.y/2)
        && ((character.pos.x+1 >= object.pos.x
        && character.pos.x+1 <= object.pos.x + object.size.x)
        || (character.pos.x + character.size.x-1 >= object.pos.x
        && character.pos.x + character.size.x-1 <= object.pos.x + object.size.x))){
            result.down = true;
            result.object.down = object;
            break;
        }
    }
    //up
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if((character.pos.y >= object.pos.y + object.size.y/2
        && character.pos.y <= object.pos.y + object.size.y)
        && ((character.pos.x+1 >= object.pos.x
        && character.pos.x+1 <= object.pos.x + object.size.x)
        || (character.pos.x + character.size.x-1 >= object.pos.x
        && character.pos.x + character.size.x-1 <= object.pos.x + object.size.x))){
            result.up = true;
            result.object.up = object;
            break;
        }
    }
    //right
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if((character.pos.x + character.size.x >= object.pos.x
        && character.pos.x + character.size.x <= object.pos.x + object.size.x/2)
        &&((character.pos.y+1 >= object.pos.y
        && character.pos.y+1 <= object.pos.y + object.size.y)
        ||(character.pos.y + character.size.y-1 >= object.pos.y
        && character.pos.y + character.size.y-1 <= object.pos.y + object.size.y))){
            result.right = true;
            result.object.right = object;
            break;
        }
    }
    //left
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if((character.pos.x >= object.pos.x + object.size.x/2
        && character.pos.x <= object.pos.x + object.size.x)
        &&((character.pos.y+1 >= object.pos.y
        && character.pos.y+1 <= object.pos.y + object.size.y)
        ||(character.pos.y + character.size.y-1 >= object.pos.y
        && character.pos.y + character.size.y-1 <= object.pos.y + object.size.y))){
            result.left = true;
            result.object.left = object;
            break;
        }
    }
    //center
    objects.forEach(object => {
        let POSX = character.pos.x + character.size.x/2;
        let POSY = character.pos.y + character.size.y/2;
        if(POSX >= object.pos.x
        && POSX <= object.pos.x + object.size.x
        && POSY >= object.pos.y
        && POSY <= object.pos.y + object.size.y){
            result.center = true;
            result.object.center = object;
            return;
        }
    });
    //outOfBounds
    objects.forEach(() => {
        if(character.pos.x <= 0){
            result.outOfBounds.left = true;
        }
        if(character.pos.x + character.size.x >= rows*scl){
            result.outOfBounds.right = true;
        }
        if(character.pos.y + character.size.y/2 <= 0){
            result.outOfBounds.top = true;
        }
        if(character.pos.y <= 0){
            result.outOfBounds.up = true;
        }
        if(character.pos.y + character.size.y >= cols*scl){
            result.outOfBounds.down = true;
        }
    });
    return result;
}

function checkVectorColission(vector, object){
    let result = false

    if(vector.x >= object.pos.x && vector.x <= object.pos.x + object.size.x
    && vector.y >= object.pos.y && vector.y <= object.pos.y + object.size.y){
        result = true;
    }
    return result;
}
