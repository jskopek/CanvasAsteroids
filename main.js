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
        forward: false
    };
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if(evt.keyCode == 38) { input.forward = true; }
    }
    document.onkeyup = function(evt) {
        evt = evt || window.event;
        if(evt.keyCode == 38) { input.forward = false; }
    }
    // end input track

    setInterval(function() {
        updateValues(values, input);
        drawSpaceship(values, sprites);
    }, 1000 / 60);
});

function updateValues(values, input) {
    values.y -= values.acceleration * values.maxSpeed;
    values.acceleration *= (input.forward && values.acceleration < 1) ? 1.2 : 0.95;

    // set constraints
    if (values.x > values.canvasWidth) { values.x = 0; }
    if (values.x < 0) { values.x = values.canvasHeight; }
    if (values.y > values.canvasWidth) { values.y = 0; }
    if (values.y < 0) { values.y = values.canvasHeight; }
}

function drawSpaceship(values, sprites) {
    var canvas = document.getElementById('canvas');

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,values.canvasWidth,values.canvasWidth);
        ctx.drawImage(sprites.ship, values.x, values.y);
    }
}
