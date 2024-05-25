let connection = undefined;

// Called when we get a line of data 
function onLine(line) {
    try {
        let data = JSON.parse(line);
        console.log("Received JSON: ",data);
        //update view
        updateView(data);
    } catch(e) {
        console.log("Received: ",line);
    }
}


//creates the connection and register the handler for received data
function connectDevice() {
    UART.connect(function(c) {
        if (!c) {
            alert("Couldn't connect!");
            return;
        }
        connection = c;
        let buf = "";
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
    });
}

function start(){
    if(connection){
        UART.write("startSending()");
    }
}

function updateView(data){
    document.getElementById("data").innerHTML = JSON.stringify(data);
}