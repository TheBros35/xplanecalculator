/*
function RealTimeETA(){
    //take input from time fields, change to number type
    var hour = document.getElementById("hourInp").value;
    hour = Number(hour);
    var minutes = document.getElementById("minInp").value;
    minutes = Number(minutes);
    var compression = document.getElementsByName('compressionRadio').value;
    //compression = Number(compression);

    //converts hours to minutes, adds them together
    var allMinutes = (hour * 60) + minutes;
    //converts allminutes to compressed time
    allMinutes /= compression;

    //pulls the remainder of minutes out of total hours
    var convertedMinutes = allMinutes % 60;
    //converts the minutes to hours
    var convertedHours = Math.floor(allMinutes / 60);

    RealTimer(convertedHours,convertedMinutes);

    var final = convertedHours + " hours " + convertedMinutes + " minutes";
    document.getElementById("realTimeH2").innerHTML = final;
}
*/

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
        var hour = $("#hourInp").val();
        hour = Number(hour);
        var minutes = $("#minInp").val();
        minutes = Number(minutes);
        var compression = sessionStorage.getItem("compression");
        compression = Number(compression);
        console.log(hour + "" + minutes + "" + "" + compression);

        //converts hours to minutes, adds them together
        var allMinutes = (hour * 60) + minutes;
        //converts allminutes to compressed time
        allMinutes /= compression;

        //pulls the remainder of minutes out of total hours
        var convertedMinutes = allMinutes % 60;
        //converts the minutes to hours
        var convertedHours = Math.floor(allMinutes / 60);
        
        /* 
        //reloads the page if checkbox is changed due to shit timer code
        $('#wantTimerId2').on('change', function() {
            location.reload();
        });
        //runs the timer only if the checkbox is checked
        if (document.getElementById("wantTimerId2").checked){
            RealTimer(convertedHours,convertedMinutes);
        }
         */
        
        //displays the final result on the page
        convertedMinutes = Math.ceil(convertedMinutes);
        var final = convertedHours + " hours " + convertedMinutes + " minutes";
        $("#realTimeH2").html(final);
    });
});


function RealTimer(hours,minutes){
    //converts the inputs to seconds
    hours = hours * 60 * 60;
    minutes = minutes * 60;
    totalSeconds = hours + minutes;

    var timer = new Timer();
    timer.start({countdown: true, startValues: {seconds: totalSeconds}});
    $('#realTimeH2').html(timer.getTimeValues().toString());
    timer.addEventListener('secondsUpdated', function (e) {
        $('#realTimeH2').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('targetAchieved', function (e) {
        $('#realTimeH2').html('KABOOM!!');
        var x = document.getElementById("timerStopAudio");
        x.play();
    });
}