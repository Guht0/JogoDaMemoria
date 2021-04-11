/* Variables *************************************/

var gamePattern = [];

var userClickedPattern =[];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false

/* JQuerys *************************************/

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

/* teste de funcionalidade dos arrays **********/

    var arryUser = userClickedPattern;
    var userP = userClickedPattern.length;
    console.log(userP);
    console.log(arryUser);


});

$(document).click(function() {
    if(!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

/* functions *************************************/

function nextSequence() {

    setTimeout(function(){
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
    
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
    
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
        playSound(randomChosenColor);
    } ,1000);

    

/* teste de funcionalidade dos arrays **********/    
    var arryGame = gamePattern;
    var gameP = gamePattern.length;
    console.log(gameP);
    console.log(arryGame);


}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {

    /* selecionando o ID correspondente ao parametro passado ('currentColor' que pode ser qq cor passada) e adicionar a classe 'pressed' */
    $("#" + currentColor).addClass("pressed");
    /* Temporizador para que o efeito do 'pressed' volte ao normal ou seja, após 100 ms, a classe, é removida do ID com a cor correspondente */
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function startOver(){

    level = 0;    
    gamePattern = [];
    started = false;

}
