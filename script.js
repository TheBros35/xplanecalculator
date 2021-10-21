function setSimRate(simRate){
    sessionStorage.setItem('compression', simRate);
}

function calcRealTime() {
    const hour = Number(document.getElementById('hourInp').value);
    const minutes = Number(document.getElementById('minInp').value);
    //cheesy error handling if user enters wrong number of minutes
    if (minutes >= 60) {
        showMinuteAlert();
        return;
    }
    ;
    const compression = Number(sessionStorage.getItem('compression'));

    //converts hours to minutes, adds them together, then divides that by the compression factor
    const allMinutes = ((hour * 60) + minutes) / compression;
    //pulls the remainder of minutes out of total hours
    const convertedMinutes = Math.ceil(allMinutes % 60);
    //converts the minutes to hours
    const convertedHours = Math.floor(allMinutes / 60);

    //displays the final result on the page
    let hourOrHours = "hours";
    if (convertedHours === 1) {
        hourOrHours = "hour";
    }
    ;
    let minuteOrMinute = "minutes";
    if (convertedMinutes === 1) {
        minuteOrMinute = "minute";
    }
    ;

    const final = `${convertedHours} ${hourOrHours} and ${convertedMinutes} ${minuteOrMinute}`;
    document.getElementById('realTimeResults').innerHTML = final;
}

function showMinuteAlert() {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible show fade" role="alert">More than 60 in minutes field<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    document.getElementById('realTimeResults').append(wrapper);
}
