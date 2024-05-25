let connection = undefined;

// Called when we get a line of data 
function onLine(line) {
    try {
        let data = JSON.parse(line);
        console.log("Received JSON: ",data);
        //update view, defined in another file
        updateView(data);
    } catch(e) {
        console.warn("Unable to parse: ",line);
    }
}


//creates the connection and register the handler for received data
function connectDevice() {
    UART.connect(function(c) {
        if (!c) {
            onError();
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

        connection.on("close", function() {
            onDisconnected();
        });
    });
}

function start(){
    if(connection){
        connection.write("startSending()\n");
    }
}

function stop(){
    if(connection){
        connection.write("stopSending()\n");
    }
}

function selectSensors(sensors){
    if(connection){
        connection.write("setup("+JSON.stringify(sensors)+")\n");
    }
}

function selectIntervalTime(t){
    if(connection){
        connection.write("stopSending("+t+")\n");
    }
}
