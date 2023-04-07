import { BleManager } from 'react-native-ble-plx'

const BLEManager = new BleManager();


const subscription = BLEManager.onStateChange((state) => {
  if (state === 'PoweredOn') {
    scanAndConnect();
    subscription.remove();
  }
}, true);


function connectToDevice(device) {
  BLEManager.connect(device.id).then(() => {
    console.log('Connected to device: ' + device.id);
    readcharacteristic(device.id);
  }
  ).catch((error) => {
    console.log('Connection failed: ' + error);
  }
  );
}

function scanAndConnect() {
  BLEManager.startDeviceScan(null, {
    allowDuplicates: false,
  }, (error, device) => {
    if (error) {
      console.log({ error })
      return
    }

    if (device.name === 'ECG') {
      connectToDevice(device);
      BLEManager.stopDeviceScan();
    }

  });
}