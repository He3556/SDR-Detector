
This project is based on: Nodejs, npm and the Meteor platform. https://www.meteor.com/
Other components (like GNU Radio, Wireshark and GR-GSM) have to be installed in order to use SDR-Detector. It's also possible to expand the system with detectors for **WiFi, Bluetooth, UMTS and LTE frequency bands**. (using existing open source projects)

**The software (stand alone detector) will be compatible to:**
[Stingwatch](https://github.com/marvinmarnold/stingwatch) (Cordova based Stingray (IMSI-Catcher) detection) 
[Meteor ICC](https://github.com/marvinmarnold/meteor-imsi-catcher-catcher) Meteor-imsi-catcher-catcher (Meteor package for client + server side IMSI-catcher detection.) 
[API Client](https://github.com/marvinmarnold/StingrayAPIClient) (more details soon)

***

![Image of SDR-Detector]
(http://smartphone-attack-vector.de/wp-content/uploads/2016/05/SDR-Detector_GSM-Scanner.jpg)

###[Usage](https://github.com/He3556/SDR-Detector/wiki/Directions-For-Use)

###[Detections](https://github.com/He3556/SDR-Detector/wiki/Thread-level-and-score-calculation)

###[WiKi](https://github.com/He3556/SDR-Detector/wiki)


```
//When all software tools and libraries are installed - 
download (or clone) the project to your harddisk 
and edit the settingsfile to your needs. 
Than generate a python script with: 
gnuradio-companion grcs/airprobe_rtlsdr.grc

// Now you can run the detector as `root` in order to capture data
sudo meteor --settings settings.json      
By default, Meteor runs the webserver on `http://localhost:3000`
```



