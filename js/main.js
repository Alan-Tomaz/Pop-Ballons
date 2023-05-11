let timerId = null; // variable that store the timeout call

function startGame() {
    var url = window.location.search;

    let gameLevel = url.replace("?", "");

    let timeSec = 0;

    if (gameLevel == 1) { // easy mode
        timeSec = 120;
    }
    if (gameLevel == 2) { // normal mode
        timeSec = 60;
    }
    if (gameLevel == 3) { // hard mode
        timeSec = 30;
    }

    //insert seconds into the span
    document.getElementById("stopwatch").innerHTML = timeSec;

    // Ballons quantities
    let ballonsQuantity = 60;

    createBallons(ballonsQuantity);

    // show whole ballons

    document.getElementById("whole-ballons").innerHTML = ballonsQuantity;
    document.getElementById("popped-ballons").innerHTML = 0;

    timeCount(timeSec + 1);
}

function timeCount(sec) {
    sec -= 1;

    if (sec == -1) {
        clearTimeout(timerId);
        gameOver();
        return false;
    }

    document.getElementById("stopwatch").innerHTML = sec;
    timerId = setTimeout(`timeCount(${sec})`, 1000)



}

function createBallons(ballons) {
    for (let i = 0; i < ballons; i++) {
        var ballon = document.createElement("img");
        ballon.src = "../img/balao_azul_pequeno.png"
        ballon.style.margin = "10px"
        ballon.onclick = function () {
            pop(this);
        }
        ballon.id = `b${i}`;

        document.getElementById("scene").appendChild(ballon);
    }
}

function pop(ballon) {
    let ballonId = ballon.id;
    document.getElementById(ballonId).src = "../img/balao_azul_pequeno_estourado.png"
    score(-1);
    ballon.onclick = "";
}

function score(action) {
    let wholeBallons = document.getElementById("whole-ballons");
    let poppedBallons = document.getElementById("popped-ballons");

    poppedBallons.innerHTML = parseInt(poppedBallons.innerHTML) - action;
    wholeBallons.innerHTML = parseInt(wholeBallons.innerHTML) + action;

    gameSituation(wholeBallons.innerHTML);
}

function gameSituation(whole) {
    if (whole == 0) {
        alert("Congratulations, you popped all the balloons in time.");
        stopGame();
    }
}

function removeBallonsEvent() {
    var i = 1;


    while (document.getElementById('b' + i)) {

        document.getElementById('b' + i).onclick = '';
        i++;
    }
}

function stopGame() {
    clearInterval(timerId);
}

function gameOver() {
    alert("Game over! you didn't pop all the balloons in time");
    removeBallonsEvent();
}