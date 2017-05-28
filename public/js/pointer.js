const pointer = {
    pos: {x: 0, y: 0},
    down: false,
    click: false,
    canvas: undefined,
}

function handlePointerDown(e){
    pointer.down = true;
}

function handlePointerUp(e){
    pointer.down = false;
}

function handlePointerMove(e){
    if(pointer.canvas === undefined){
        pointer.pos.x = e.pageX;
        pointer.pos.y = e.pageY;
    }else{
        pointer.pos = getPointerCanvasPos(pointer.canvas, e);
    }
}

function getPointerCanvasPos(canvas, e){
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.pageX - rect.left - offSet.x,
        y: e.pageY - rect.top - offSet.y,
    }
}
