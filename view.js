function onConnected(){
    alert("Connected!");
}

function onDisconnected(){
    alert("Disconnected!");
}

function onError(msg){
    alert(msg);
}

function updateView(data){
    document.getElementById("data").innerHTML = JSON.stringify(data);
    let time = new Date(Math.floor(data.time)).toTimeString().split(' ')[0] + ":" + x.getMilliseconds()
    let light = data.light*100;
    Plotly.extendTraces('lightPlot', {y: [[light]], x: [[time]]}, [0])
    let mag = data.mag
    Plotly.extendTraces('magPlot', {y: [[mag.x],[mag.y],[mag.z]], x:[[time],[time],[time]]}, [0,1,2])
}

let form = document.getElementById("settings");
let timeButton = document.getElementById("timeBtn");
let timeValue = document.getElementById("time");

form.addEventListener('submit', (e) =>
{
    e.preventDefault()
    let formData = new FormData(form);
    sendSensors(Object.fromEntries(formData));
});

timeButton.addEventListener('click', () =>{
    sendIntervalValue(parseInt(timeValue.value));
});

Plotly.plot('lightPlot', [{
    x: [],
    y: [],
    mode: 'lines+markers', 
    marker: {color: 'yellow', size: 8},
    line: {width: 4}
}]);

Plotly.plot('magPlot', [{
    x: [],
    y: [],
    mode: 'lines+markers', 
    marker: {color: 'red', size: 8},
    line: {width: 4}
},
{
    x: [],
    y: [],
    mode: 'lines+markers', 
    marker: {color: 'blue', size: 8},
    line: {width: 4}
},
{
    x: [],
    y: [],
    mode: 'lines+markers', 
    marker: {color: 'green', size: 8},
    line: {width: 4}
}]);
  