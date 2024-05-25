let intervalTime = 1000; //frequency of data update
let intervalId;

//defines which sensors to read
let sensors = {
  mag: true,
  accel: true,
  temp: true,
  light: true
};

//setup the sensors
function setup(s) {
  sensors = s;
  if(sensors.mag){
    Puck.magOn();
  }
  if(sensors.acc){
    Puck.accelOn();
  }
}

//change the update frequency, if reading is on updates accordingly
function changeIntervalTime(t){
  intervalTime = t;
  if(intervalId){
    changeInterval(intervalId, intervalTime);
  }
}

//reads data from the selected sensors
function readData(){
  let time = getTime();
  let mag, accel, temp, light;
  if(sensors.mag){
    mag = Puck.mag();
  }
  if(sensors.accel){
    accel = Puck.accel();
  }
  if(sensors.temp){
    temp = E.getTemperature();
  }
  if(sensors.light){
    light = Puck.light();
  }
  return {time, mag, accel, temp, light};
}

//return data through bluetooth
function sendData() {
  let data = readData();
  Bluetooth.println(JSON.stringify(data, null, 2));
}

//start reading and sending
function startSending() {
  intervalId = setInterval(() => sendData(), intervalTime);
}

//stops reading and sending
function stopSending() {
  Puck.magOff();
  Puck.accelOff();
  if(intervalId){
    clearInterval(intervalId);
    intervalId = undefined;
  }
}

