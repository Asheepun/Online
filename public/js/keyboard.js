const keys = {
    w: {down: false},
    a: {down: false},
    s: {down: false},
    d: {down: false},
}

function keyDownHandler(e){
    switch(e.keyCode){
        case 87:
            keys.w.down = true;
            break;
        case 83:
            keys.s.down = true;
            break;
        case 65:
            keys.a.down = true;
            break;
        case 68:
            keys.d.down = true;
            break;
    }
}

function keyUpHandler(e){
    switch(e.keyCode){
        case 87:
            keys.w.down = false;
            break;
        case 83:
            keys.s.down = false;
            break;
        case 65:
            keys.a.down = false;
            break;
        case 68:
            keys.d.down = false;
            break;
    }
}
