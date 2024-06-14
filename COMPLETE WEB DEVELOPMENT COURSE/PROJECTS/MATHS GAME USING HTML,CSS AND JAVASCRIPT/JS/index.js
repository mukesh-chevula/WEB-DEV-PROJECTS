var playing = false;
var score;
var action;
var timeremaining = 60.00;

document.getElementById('startReset').onclick = function () {
    if (playing == true) {
        location.reload();
    } else {
        hide("gameOver")
        playing = true;
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
        show("countdown");
        document.getElementById("startReset").innerHTML = "Reset Game";
        startCountdown();
        show("score")
        generateQuestion();
    }
};

function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 0.01;
        document.getElementById("time").innerHTML = timeremaining.toFixed(2);

        if (timeremaining <= 0) {
            clearInterval(action);
            document.getElementById("countdown").innerHTML = "Game Over";
            playing = false;
            show("gameOver");
            
            document.getElementById("startReset").innerHTML="Start Game";
            document.getElementById("gameOver").innerHTML="<p>GAME OVER  your score is "+ score +"</p>";
            hide("time"); 
        }
    }, 10); // Update interval to 10 milliseconds
}
function hide(Id){
    document.getElementById(Id).style.display="none";
}
function show(Id){
    document.getElementById(Id).style.display="block";
}
function generateQuestion(){
    var x = 1 + Math.round(20*Math.random());
    var y = 1 + Math.round(20*Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y ;
    correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    for (var i=1;i<=5;i++){
        if (i != correctPosition) {
            do{
                var wrongAnswer = (1+Math.floor(20*Math.random()))*(1+Math.floor(20*Math.random()));}while(wrongAnswer == correctAnswer);
            document.getElementById("box"+i).innerHTML = wrongAnswer;

    }
}
}

for(i=1; i<5 ;i++){
    document.getElementById("box"+i).onclick = function(){
        if( playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scoreValue").innerHTML=score;
                hide("wrong");
                show("correct");
                setTimeout(function() {hide("correct")}, 1000);
                generateQuestion();
            }
            else{
                hide("correct");
                show("wrong");
                setTimeout(function() {hide("wrong")}, 1000);
            }
        }
    }
}