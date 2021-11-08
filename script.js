const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function () {
   checkForNumbers();
});

function setSimRate(simRate){
    sessionStorage.setItem('compression', simRate);
}

function showCustomSimRate(){
    const customSimRateLabel = `<label for="customSimRateInp" class="col-form-label">Sim Rate:</label>`;
    const customSimRateInput = `<input id="customSimRateInp" type="number" step="0.01" style="text-align: center" class="form-control"/>`;
    document.getElementById('customSimRateLabelDiv').innerHTML = customSimRateLabel;
    document.getElementById('customSimRateInpDiv').innerHTML = customSimRateInput;

    document.getElementById('customSimRateInp').addEventListener('input', () => {
        let simRate = document.getElementById('customSimRateInp').value;
        sessionStorage.setItem('compression', simRate);
    });
}

function checkForNumbers(){
    const hour = Number(document.getElementById('hourInp').value);
    const minutes = Number(document.getElementById('minInp').value);
    if (Number.isInteger(hour) && Number.isInteger(minutes)) calcRealTime(hour, minutes);

    else alert("Enter in only whole numbers please.");

}

function calcRealTime(hour, minutes) {
    //cheesy error handling if user enters wrong number of minutes
    if (minutes >= 60) {
        showMinuteAlert();
        return;
    }

    const compression = parseFloat(sessionStorage.getItem('compression'));

    //converts hours to minutes, adds them together, then divides that by the compression factor
    const allMinutes = ((hour * 60) + minutes) / compression;
    //pulls the remainder of minutes out of total hours
    const convertedMinutes = Math.ceil(allMinutes % 60);
    //converts the minutes to hours
    const convertedHours = Math.floor(allMinutes / 60);

    //displays the final result on the page
    let hourOrHours = "hours";
    if (convertedHours === 1) hourOrHours = "hour";

    let minuteOrMinute = "minutes";
    if (convertedMinutes === 1) minuteOrMinute = "minute";


    if (convertedHours === 0){
        const final = `${convertedMinutes} ${minuteOrMinute}`;
        document.getElementById('realTimeResults').innerHTML = final;
    }
    else {
        const final = `${convertedHours} ${hourOrHours} and ${convertedMinutes} ${minuteOrMinute}`;
        document.getElementById('realTimeResults').innerHTML = final;
    }

}

function showMinuteAlert() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible show fade" role="alert">More than 60 in minutes field<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    document.getElementById('realTimeResults').append(wrapper);
}
