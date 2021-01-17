$(document).ready(function(){
    $('#dropdown2x').click(function(){
        sessionStorage.setItem('compression','2');
    });
    $('#dropdown4x').click(function(){
        sessionStorage.setItem('compression','4');
    });
    $('#dropdown8x').click(function(){
        sessionStorage.setItem('compression','8');
    });
    $('#dropdown16x').click(function(){
        sessionStorage.setItem('compression','16');
    });
    $('#realTimeBtn').click(function(){
        const hour = Number($('#hourInp').val());
        const minutes = Number($('#minInp').val());
        const compression = Number(sessionStorage.getItem('compression'));

        //converts hours to minutes, adds them together, then divides that by the compression factor
        const allMinutes = ((hour * 60) + minutes) / compression;
        //pulls the remainder of minutes out of total hours
        const convertedMinutes = Math.ceil(allMinutes % 60);
        //converts the minutes to hours
        const convertedHours = Math.floor(allMinutes / 60);
        
        //displays the final result on the page
        const final = convertedHours + ' hours ' + convertedMinutes + ' minutes';
        $('#realTimeH2').html(final);
    });
});


function RealTimer(hours,minutes){
    //converts the inputs to seconds
    hours = hours * 60 * 60;
    minutes = minutes * 60;
    totalSeconds = hours + minutes;

    let timer = new Timer();
    timer.start({countdown: true, startValues: {seconds: totalSeconds}});
    $('#realTimeH2').html(timer.getTimeValues().toString());
    timer.addEventListener('secondsUpdated', function (e) {
        $('#realTimeH2').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('targetAchieved', function (e) {
        $('#realTimeH2').html('KABOOM!!');
        let x = document.html('timerStopAudio');
        x.play();
    });
}