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
    if(data.sensors){
        updateSensors(data.sensors)
    } else {
        updateGraphs(data)
    }
}

function updateSensors(sensors){
    for(i in sensors){
        document.querySelector("input[name='"+i+"']").checked = sensors[i];
    }
}

function updateGraphs(data){
    document.getElementById("data").innerHTML = JSON.stringify(data);
    let date = new Date(Math.floor(data.time))
    let time = date.toTimeString().split(' ')[0] + ":" + date.getMilliseconds()
    if(data.light){
        if(!lightGraph){
            createLightGraph();
        }
        let light = data.light*100;
        Plotly.extendTraces('lightPlot', {y: [[light]], x: [[time]]}, [0])
    }
    if(data.mag){
        if(!magGraph){
            createMagGraph();
        }
        let mag = data.mag
        Plotly.extendTraces('magPlot', {y: [[mag.x],[mag.y],[mag.z]], x:[[time],[time],[time]]}, [0,1,2])
    }
    if(data.temp){
        if(!tempGraph){
            createTempGraph();
        }
        let temp = data.temp;
        Plotly.extendTraces('tempPlot', {y: [[temp]], x: [[time]]}, [0])
    }
    if(data.accel){
        if(!accelGraph){
            createAccelGraph();
        }
        let accel = data.accel.acc;
        Plotly.extendTraces('accelPlot', {y: [[accel.x],[accel.y],[accel.z]], x:[[time],[time],[time]]}, [0,1,2])
    }
}

function createLightGraph(){
    lightGraph = document.createElement('div');
    lightGraph.setAttribute("id", "lightPlot");
    document.getElementById("data-container").append(lightGraph);

    Plotly.newPlot('lightPlot', [{
        x: [],
        y: [],
        mode: 'lines+markers', 
        marker: {color: 'yellow', size: 8},
        line: {width: 4}
    }]);
}

function createAccelGraph(){
    accelGraph = document.createElement('div');
    accelGraph.setAttribute("id", "accelPlot");
    document.getElementById("data-container").append(accelGraph);
    Plotly.newPlot('accelPlot', [{
        x: [],
        y: [],
        mode: 'lines+markers', 
        marker: {color: 'red', size: 8},
        line: {width: 4},
        name: "x"
    },
    {
        x: [],
        y: [],
        mode: 'lines+markers', 
        marker: {color: 'blue', size: 8},
        line: {width: 4},
        name: "y"
    },
    {
        x: [],
        y: [],
        mode: 'lines+markers', 
        marker: {color: 'green', size: 8},
        line: {width: 4},
        name: "z"
    }]);
}

function createMagGraph(){
    magGraph = document.createElement('div');
    magGraph.setAttribute("id", "magPlot");
    document.getElementById("data-container").append(magGraph);

    Plotly.newPlot('magPlot', [{
        x: [],
        y: [],
        mode: 'lines+markers', 
        marker: {color: 'red', size: 8},
        line: {width: 4},
        name: "x"
    },
    {
        x: [],
        y: [],
        mode: 'lines+markers', 
        marker: {color: 'blue', size: 8},
        line: {width: 4},
        name: "y"
    },
    {
        x: [],
        y: [],
        mode: 'lines+markers', 
        marker: {color: 'green', size: 8},
        line: {width: 4},
        name: "z"
    }]);
}

function createTempGraph(){
    tempGraph = document.createElement('div');
    tempGraph.setAttribute("id", "tempPlot");
    document.getElementById("data-container").append(tempGraph);
    
    Plotly.newPlot('tempPlot', [{
        x: [],
        y: [],
        mode: 'lines+markers', 
        marker: {color: 'orange', size: 8},
        line: {width: 4}
    }]);
}


let lightGraph, tempGraph, accelGraph, magGraph = undefined;

let form = document.getElementById("settingsform");
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


  