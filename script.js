//runs the checkforNumbers function when submit button is clicked
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
   checkForNumbers();
});


//adds a click event on each hardcoded dropdown to set sim rate in session storage
const compressionRateList = document.querySelectorAll('.compRate');
compressionRateList.forEach(element => {
    element.addEventListener('click', () => {
        if (document.getElementById('customSimRateInp')){
            document.getElementById('customSimRateLabelDiv').remove();
            document.getElementById('customSimRateInpDiv').remove();
        }
        sessionStorage.setItem('compression', element.dataset.rate);
    })
});

//displays the sim rate div if custom option is clicked
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

//checks to see if valid numbers are in the input boxes
function checkForNumbers(){
    const hour = Number(document.getElementById('hourInp').value);
    const minutes = Number(document.getElementById('minInp').value);
    const compression = Number(sessionStorage.getItem('compression'));

    //display a particular error if minutes is more than 60
    if (minutes >= 60) {
        showMinuteAlert()
        return;
    };

    //run the function if both inputs are integers
    if (Number.isInteger(hour) && Number.isInteger(minutes) && !Number.isNaN(compression)) {
        calcRealTime(hour, minutes, compression);
    } else {
        alert("Error: Numbers in input fields are not integers");
        return;
    }
}

//shows alert on page specifually for too many minutes in input field
function showMinuteAlert() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible show fade" role="alert">More than 60 in ' +
        'minutes field<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    document.getElementById('realTimeResults').append(wrapper);
}

//actually calculates the amount of hours and seconds needed
function calcRealTime(hour, minutes, compression) {
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
