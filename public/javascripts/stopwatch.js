var time = 0;
var running = 0;
var timmer = '00:00:00';

function startPause(){
    if(running == 0){
        running = 1;
        increment();
        document.getElementById('start').innerHTML = "정지";
        document.getElementById('startPause').style.backgroundColor = "red";
        document.getElementById('startPause').style.border.color = "red";
    }
    else{
        running = 0;
        document.getElementById('start').innerHTML = '계속';
        document.getElementById('startPause').style.backgroundColor = "green";
        document.getElementById('startPause').style.borderColor = "green";
    }
}
function save(){
    if(running == 0 ){
        console.log("TIMMER : "+timmer);
    }
    else{
        console.log("정지를 해야지 저장이 가능합니다.");
    }
}

function reset(){
    running = 0;
    time = 0;
    document.getElementById('start').innerHTML = "시작";
    document.getElementById('time').innerHTML="00:00:00";
    document.getElementById('startPause').style.backgroundColor = "green";
    document.getElementById('startPause').style.borderColor = "green";
}

function increment(){
    if(running == 1){
        setTimeout(function(){
            time++;
            var min = Math.floor(time/10/60);
            var sec = Math.floor(time/10 % 60);
            var hour = Math.floor(time/10/60/60);
            if(min<10){
                min = "0"+min;
            }
            if(sec<10){
                sec = "0"+sec;
            }
            if(hour<10){
                hour = "0"+hour;
            }
            timmer = hour+":"+min+":"+sec;
            document.getElementById("time").innerHTML=hour+":"+min+":"+sec;
            increment();
        },100);
    }
}