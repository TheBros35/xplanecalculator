$(document).ready(function(){
    $("#dropdown2x").click(function(){
        sessionStorage.setItem("compression","2");
    });
    $("#dropdown4x").click(function(){
        sessionStorage.setItem("compression","4");
    });
    $("#dropdown8x").click(function(){
        sessionStorage.setItem("compression","8");
    });
    $("#dropdown16x").click(function(){
        sessionStorage.setItem("compression","16");
    });
    $("#realTimeBtn").click(function(){
        let hour = $("#hourInp").val();
        hour = Number(hour);
        let minutes = $("#minInp").val();
        minutes = Number(minutes);
        let compression = sessionStorage.getItem("compression");
        compression = Number(compression);
        console.log(hour + "" + minutes + "" + "" + compression);

        //converts hours to minutes, adds them together
        let allMinutes = (hour * 60) + minutes;
        //converts allminutes to compressed time
        allMinutes /= compression;

        //pulls the remainder of minutes out of total hours
        let convertedMinutes = allMinutes % 60;
        //converts the minutes to hours
        const convertedHours = Math.floor(allMinutes / 60);
        
        //displays the final result on the page
        convertedMinutes = Math.ceil(convertedMinutes);
        let final = convertedHours + " hours " + convertedMinutes + " minutes";
        $("#realTimeH2").html(final);
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
        let x = document.html("timerStopAudio");
        x.play();
    });
}