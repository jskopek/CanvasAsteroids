$(function() {
    var x = 200, y = 200, rotation = 0;
    setInterval(function() {
        rotation += 10;
        drawTriangle(x, y, rotation);
    }, 100);
});

function drawTriangle(x, y, rotation) {
    var canvas = document.getElementById('canvas');
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,400,400);

        x = 100; y = 100;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y + 10);
        ctx.lineTo(x, y + 20);
        ctx.fill();
    }
}
