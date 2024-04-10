$(function() {
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });



});
//paint or not
let paint = false;

//paint or erase
let paint_erase = "paint";

//get camvas and context
let canvas = document.getElementById("paint");
let ctx = canvas.getContext("2d");

//get container
var container = $("#container");

//mouse pos
let mouse = { x: 0, y: 0 };

//onload saved work
if (localStorage.getItem("imgCanvas") != null) {
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
    img.src = localStorage.getItem("imgCanvas");
};
//set drawing params
ctx.lineWidth = 3;
ctx.lineJoin = "round";
ctx.lineCap = "round";

//onclick container
container.mousedown(function(e) {
    paint = true;
    ctx.beginPath();
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.moveTo(mouse.x, mouse.y);
});

//move mouse while holding mouse key
container.mousemove(function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if (paint == true) {
        if (paint_erase == "paint") {
            //get color input
            ctx.strokeStyle = $("#paintColor").val();
        } else {
            //white color
            ctx.strokeStyle = "white";
        }
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
});
//mouse up->we are not painting erasing anymore
container.mouseup(function() {
    paint = false;
});

//if we leave the container we are not painting erasing anymore
container.mouseleave(function() {
    paint = false;
});
//click on the reset button
$("#reset").click(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paint_erase = "paint";
    $("#erase").removeClass("eraseMode");
});
//click on save button
$("#save").click(function() {
    if (typeof(localStorage) != null) {
        localStorage.setItem("imgCanvas",
            canvas.toDataURL());
    } else {
        window.alert("Your browser does not support local storage!");
    }
});
//click on the erase button
$("#erase").click(function() {
    if (paint_erase == "paint") {
        paint_erase = "erase";
    } else {
        paint_erase = "paint";
    }
    $(this).toggleClass("eraseMode");
});

//change color input
$("#paintColor").change(function() {
    $("#circle").css("background-color",
        $(this).val());
});
//draw a line
// //declare new path
// context.beginPath();

// //def line width
// context.lineWidth = 40;
// //set line color
// context.strokeStyle = '#42e565';
// //def line cap(round,butt,square)
// context.lineCap = "round";
// //set line joint
// context.lineJoin = "round";
// //position context point(start)
// context.moveTo(50, 50);
// //draw a straight line from start to new pos
// context.lineTo(200, 200);
// //draw another line
// context.lineTo(400, 100);
// //visible line
// context.stroke();