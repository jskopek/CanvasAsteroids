$(function() {
    var values = {
        x: 200,
        y: 200,
        rotation: 0,
        acceleration: 1,
        maxSpeed: 5,
        canvasWidth: 400,
        canvasHeight: 400
    };

    // initialize sprites
    var sprites = {
        ship: new Image()
    }
    sprites.ship.src = 'spaceship.png';
    // end sprites initialize

    // track input
    var input = {
        forward: false,
        rotate: 0 // -1, 0, 1
    };
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if(evt.keyCode == 38) { input.forward = true; }
        if(evt.keyCode == 37 || evt.keyCode == 39) { input.rotate = (evt.keyCode == 37) ? -1 : 1; }
    }
    document.onkeyup = function(evt) {
        evt = evt || window.event;
        if(evt.keyCode == 38) { input.forward = false; }
        if(evt.keyCode == 37 || evt.keyCode == 39) { input.rotate = 0; }
    }
    // end input track

    setInterval(function() {
        updateValues(values, input);
        drawSpaceship(values, sprites);
    }, 1000 / 60);
});

function updateValues(values, input) {
    values.y -= values.acceleration * values.maxSpeed;
    if(input.forward) {
        if(values.acceleration >= 0.2 && values.acceleration < 1) {
            values.acceleration *= 1.4;
        } else if(values.acceleration < 0.2) {
            values.acceleration = 0.2;
        }
    } else {
        values.acceleration *= 0.95;
    }

    if(input.rotate != 0) {
        values.rotation += input.rotate * 0.03;
    }

    // set constraints
    if (values.x > values.canvasWidth) { values.x = 0; }
    if (values.x < 0) { values.x = values.canvasHeight; }
    if (values.y > values.canvasWidth) { values.y = 0; }
    if (values.y < 0) { values.y = values.canvasHeight; }
}

var lastX = 0; var lastY = 0;
function drawSpaceship(values, sprites) {
    var canvas = document.getElementById('canvas');

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0,0,values.canvasWidth,values.canvasWidth);
        
        // reverse
        ctx.translate(values.x, values.y);
        ctx.translate(32, 32);
        ctx.rotate(values.rotation);

        ctx.drawImage(sprites.ship, -32, -32);

        // reverse
        ctx.rotate(-values.rotation);
        ctx.translate(-32, -32);
        ctx.translate(-values.x, -values.y);
    }
}
