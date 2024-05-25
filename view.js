function onConnected(){
    alert("Connected!");
}

function onDisconnected(){
    alert("Disconnected!");
}

function onError(){
    alert("Error when connecting, try again!");
}

function updateView(data){
    document.getElementById("data").innerHTML = JSON.stringify(data);
}