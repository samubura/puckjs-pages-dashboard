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
