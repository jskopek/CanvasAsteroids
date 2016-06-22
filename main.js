$(function() {
    var values = {
        x: 200,
        y: 200,
        rotation: 0, // store as degrees
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
    // update acceleartion
    if(input.forward) {
        if(values.acceleration < 0.2) { values.acceleration = 0.2; } // min value
        values.acceleration *= 1.4; // increase acceleartion on boost
        if(values.acceleration > 1) { values.acceleration = 1; } // set upper limit of acceleartion
    }

    // acceleartion decays
    values.acceleration *= 0.95;

    // update rotation
    if(input.rotate != 0) {
        values.rotation += input.rotate;

        // rotation constraints
        if(values.rotation > 360) { values.rotation = 0; }
        if(values.rotation < 0) { values.rotation = 360; }
    }

    // update ship x/y position
    var maxX = 0;
    var maxY = values.maxSpeed;

    values.x -= values.acceleration * maxX;
    values.y -= values.acceleration * maxY;

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
        ctx.save();
        
        // transform coordinates
        ctx.translate(values.x, values.y);
        ctx.translate(32, 32);

        var rotationRadians = values.rotation * Math.PI / 180;
        ctx.rotate(rotationRadians);

        // draw image
        ctx.drawImage(sprites.ship, -32, -32);

        // retore coordinate system
        ctx.restore();
    }
}
