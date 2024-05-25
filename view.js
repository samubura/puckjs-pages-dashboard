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

function test(){
    console.log("Test!");
}