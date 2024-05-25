let connection = undefined;

// Called when we get a line of data 
function onLine(line) {
    let data = undefined;
    try {
        data = JSON.parse(line);
        console.log("Received JSON: ",data);
    } catch(e) {
        console.warn("Unable to parse: ",line);
    }
    if(data) {
        //update view, defined in another file
        updateView(data);
    }
}


//creates the connection and register the handler for received data
function connectDevice() {
    UART.connect(function(c) {
        if (!c) {
            onError("Error when connecting! Try again");
            return;
        }
        connection = c;
        let buf = "";
        onConnected();

        connection.on("data", function(d) {
            //handle one "line" of data at a time
            buf += d;
            let i = buf.indexOf("\n");
            while (i>=0) {
                onLine(buf.substring(0,i));
                buf = buf.substring(i+1);
                i = buf.indexOf("\n");
            }
        });

        getSensors();

        connection.on("close", function() {
            onDisconnected();
        });
    });
}

function start(){
    if(connection){
        connection.write("startSending()\n");
    } else {
        onError("Not connected.")
    }
}

function stop(){
    if(connection){
        connection.write("stopSending()\n");
    } else {
        onError("Not connected.")
    }
}

function sendSensors(sensors){
    if(connection){
        connection.write("setup('"+JSON.stringify(sensors)+"')'\n");
    } else {
        onError("Not connected.")
    }
}

function sendIntervalValue(t){
    if(connection){
        connection.write("changeIntervalTime("+t+")\n");
    } else {
        onError("Not connected.")
    }
}

function getSensors(){
    if(connection){
        connection.write("getSensors()\n");
    } else {
        onError("Not connected.")
    }
}
