$(function() {
    var values = {
        x: 200,
        y: 200,
        rotation: 0,
        canvasWidth: 400,
        canvasHeight: 400
    };

    var sprites = {
        ship: new Image()
    }
    sprites.ship.src = 'spaceship.png';


    setInterval(function() {
        updateValues(values);
        drawSpaceship(values, sprites);
    }, 1000 / 60);
});

function updateValues(values) {
    values.x += 5;

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
