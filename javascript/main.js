//break and session modifiers
const clock = document.getElementById("clock");
const sound = document.getElementById("sound");
const session = document.getElementById("session");
const breakTime = document.getElementById("break");
const indicator = document.getElementById("session_banner");

let countdown;
let secondsLeft;
let isBreak = "";

function formatSelection(selection){
    if (selection.innerHTML < 10) selection.innerHTML = "0" + selection.innerHTML;
}

function update_choices() { 
    const increaseSession = document.getElementById("session_incr");
    const decreaseSession = document.getElementById("session_dcr");
    const increaseBreak = document.getElementById("break_incr");
    const decreaseBreak = document.getElementById("break_dcr");

    increaseSession.addEventListener("click", ()=>{
        session.innerHTML = parseInt(session.innerHTML) + 1;
        formatSelection(session);
        displayTimeLeft(session.innerHTML *60);
    })

    decreaseSession.addEventListener("click", ()=>{
        if (session.innerHTML != 1){
            session.innerHTML = parseInt(session.innerHTML) - 1;
            formatSelection(session);
            displayTimeLeft(session.innerHTML *60);
        }
    })

    increaseBreak.addEventListener("click", ()=>{
        breakTime.innerHTML = parseInt(breakTime.innerHTML) + 1;
        formatSelection(breakTime);
    })

    decreaseBreak.addEventListener("click", ()=>{
        if(breakTime.innerHTML != 1){
            breakTime.innerHTML = parseInt(breakTime.innerHTML) - 1;
            formatSelection(breakTime); 
        }
    })
}


//timer experiment

function breakCount(){
    indicator.innerHTML = "Break";
    timer(breakTime.innerHTML*60-1);
}

function checkBreak (){
    if (isBreak == true){
        setTimeout(breakCount, 1000);
    } else {
        start.click();
    }
}

function timer(seconds){
    const now = Date.now();
    const startTime = now + (seconds * 1000);
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
       secondsLeft = Math.round((startTime - Date.now())/ 1000);
        
        if (secondsLeft <= 0) {
            secondsLeft = 0;
            sound.play();
            displayTimeLeft(secondsLeft);
            clearInterval(countdown);
            (isBreak == false || isBreak == "") ? isBreak = true : isBreak = false;
            checkBreak();
        } else{
            displayTimeLeft(secondsLeft);
        }
    }, 1000);
}

//display time left
function displayTimeLeft(seconds){
    let minute = parseInt(seconds/60);
    let remainderSeconds = seconds % 60;
    let display = `${minute >= 10 ? minute: '0'+ minute}:${remainderSeconds >= 10 ? remainderSeconds : '0' + remainderSeconds}`;
    clock.innerHTML = display;
}

//game time modifiers

function modifyTimer() {
    const start = document.getElementById("start");
    const pause = document.getElementById("pause");
    const reset = document.getElementById("reset");
    const stop = document.getElementById("stop");
    let pausePoint;
    let isPaused = false;

    start.addEventListener("click", ()=>{
        indicator.innerHTML = "Session";
        clearInterval(countdown);
        pause.innerHTML = "PAUSE";
        timer(session.innerHTML*60);
    });

    
    pause.addEventListener("click", ()=>{
        if (pause.innerHTML == "PAUSE"){
            isPaused = true;
            pausePoint = secondsLeft;
            clearInterval(countdown);
            pause.innerHTML = "PLAY";
        } else{
            isPaused = false;
            pause.innerHTML = "PAUSE";
            timer(pausePoint);
        }
    });

    stop.addEventListener("click", ()=>{
        clearInterval(countdown);
        pause.innerHTML = "PAUSE";
        displayTimeLeft(session.innerHTML*60);
    });

    reset.addEventListener("click", ()=>{
        clearInterval(countdown);
        pause.innerHTML = "PAUSE";
        session.innerHTML = "25";
        breakTime.innerHTML = "05";
        clock.innerHTML = "25:00";
        isBreak = "";
    });
}

update_choices();
modifyTimer();
