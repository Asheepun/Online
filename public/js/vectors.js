function addVectors(vector1, vector2){
    vector1.x += vector2.x;
    vector1.y += vector2.y;
}

function subVectors(vector1, vector2){
    vector1.x += vector2.x;
    vector1.y += vector2.y;
}

function multiplyVector(vector, mult){
    vector.x = vector.x*mult;
    vector.y = vector.y*mult;
}

function divideVector(vector, div){
    vector.x = vector.x/div;
    vector.y = vector.y/div;
}

function getDifference(vector1, vector2){
    let dif = {x: vector1.x - vector2.x, y: vector1.y - vector2.y};
    return dif;
}

function getMagnitude(vector){
    let mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return mag;
}

function fillRectVector(pos, size){
    ctx.fillRect(pos.x, pos.y, size.x, size.y);
}
