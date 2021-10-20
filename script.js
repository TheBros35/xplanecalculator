function dropdown2x() {sessionStorage.setItem('compression','2');}

function dropdown4x() {sessionStorage.setItem('compression','4');}

function dropdown8x() {sessionStorage.setItem('compression','8');}

function dropdown16x() {sessionStorage.setItem('compression','16');}

function calcRealTime(){
    const hour = Number(document.getElementById('hourInp').value);
    const minutes = Number(document.getElementById('minInp').value);
    const compression = Number(sessionStorage.getItem('compression'));

    //converts hours to minutes, adds them together, then divides that by the compression factor
    const allMinutes = ((hour * 60) + minutes) / compression;
    //pulls the remainder of minutes out of total hours
    const convertedMinutes = Math.ceil(allMinutes % 60);
    //converts the minutes to hours
    const convertedHours = Math.floor(allMinutes / 60);

    //displays the final result on the page
    const final = convertedHours + ' hours ' + convertedMinutes + ' minutes';
    document.getElementById('realTimeH2').innerHTML = final;
}