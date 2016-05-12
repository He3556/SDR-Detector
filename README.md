Installation
============

Ubuntu
------

### Install nodejs and npm

```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs     // Install node + npm
```

You can confirm that installation worked if `npm -v` returns a valid version number. Otherwise, Ubuntu may have tried to install from the wrong source. Open `Software & Updates` from the launcher, click `Other Software`, and unselect any references to `chrislea`/`nodejs`. Then run `sudo apt-get update` and repeat the steps above.

Once you have confirmed nodejs and npm are installed, install Meteor.

```
curl https://install.meteor.com/ | sh
```

Credit: https://www.meteor.com/install



### Install other libraries and tools

Install GR-GSM (for process 2 & 3) 
GR-GSM needs GNURadio > 3.7.3. (for Ubuntu 14.04.03 only 3.7.1. binaries are availible, use pybombs installer or the install script from Marcus Leech)  https://gnuradio.org/redmine/projects/gnuradio/wiki/InstallingGRFromSource
Also install all packets of Osmocom-SDR, rtl-sdr, HackRF 
All details of GR-GSM: https://github.com/ptrkrysik/gr-gsm/wiki/Installation 


Install RTL-SDR-Scanner (for process 1 rtl-sdr)
EarToEarOak/RTLSDR-Scanner
```
 Some Linux Kernels already have a DVB driver.
 Check if driver is loaded already:
$ lsmod DVB*
 if true = we need to delete
$ sudo rmmod dvb_usb_rtl28xxu

 don't load this driver in the future:
$ sudo su
$ echo blacklist dvb_usb_rtl28xxu > /etc/modprobe.d/rtlsdr.conf
$ exit
(or sudo gedit /etc/modprobe.d/blacklist.conf)

 Installation of libraries:
$ sudo apt-get install python python-wxgtk2.8 python-matplotlib python-numpy python-imaging
$ sudo apt-get install python-serial

 compile 2 libraries:
$ sudo apt-get install libusb-1.0.0-dev
$ sudo apt-get install git cmake

 libriray for rtlsdr (compile)
$ mkdir build
$ cd build
$ git clone git://git.osmocom.org/rtl-sdr.git
$ cd rtl-sdr
$ mkdir build
$ cd build
 -D Option, load USB driver when connecting a DVB-T Stick 
$ cmake ../ -DINSTALL_UDEV_RULES=ON
$ make
$ sudo make install
cd ../..

 Install Python pyrtlsdr library:
$ git clone git://github.com/roger-/pyrtlsdr.git
$ cd pyrtlsdr
$ sudo python setup.py install
$ cd ..\..

 Programm RTLSDR-scanner download
$ git clone git://github.com/EarToEarOak/RTLSDR-Scanner.git

 start the programm 
$ cd RTLSDR-Scanner/src
$ ./rtlsdr_scan.py
( GUI Start has to save a RTLSDR-Scanner.desktop - worked without in my case)
Possible error messege: usb_open error -3
Please fix the device permissions, e.g. by installing the udev rules file rtl-sdr.rules
$ lsusb
$ rtl_test -t
$ rtl_test -s 3.2e6
todo:
source ot the rtl-sdr.rules
/usr/local/src/rtl-sdr/rtl-sdr.rules
to 
/etc/udev/rules.d/
howto:
as root (enter in console: sudo su)
cp /usr/local/src/rtl-sdr/rtl-sdr.rules /etc/udev/rules.d/

Add permission of a device that is missing in the rtl-sdr.rules:
sudo gedit /etc/udev/rules.d/rtl-sdr.rules 

# best RTL-SDR RTL2838 vid/pid (NooElec, for example)
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0bda", ATTRS{idProduct}=="2838", MODE:="0666"

```

Install Kalibrate-RTL (for process 1 kal)
https://github.com/steve-m/kalibrate-rtl /
```
$ git clone https://github.com/steve-m/kalibrate-rtl 
$ cd kalibrate-rtl 
$ ./bootstrap && CXXFLAGS='-W -Wall -O3' 
$ ./configure make 
$ sudo make install
```

Install Kalibrate-hackrf (for process 1 kal)
https://z4ziggy.wordpress.com/2015/05/17/sniffing-gsm-traffic-with-hackrf/
```
$ sudo apt-get install hackrf libhackrf-dev libhackrf0

$ git clone https://github.com/scateu/kalibrate-hackrf.git
$ cd kalibrate-hackrf
$ ./bootstrap
$ ./configure
$ make
$ sudo make install
```

### Download source code

```
git clone git@github.com:He3556/desec.git
```

**Unless otherwise noted, all commands should be run from the same directory as this readme, `/desec`.**

### Create airprobe script

Use GNU Radio Companion to generate a airprobe file. This only needs to be done once.

```
gnuradio-companion grcs/airprobe_rtlsdr.grc
```

Modify the blocks so that detection is guaranteed do happen. For example, in the US, modify the parameter box, `fc`, to be 893.8MHz. This is the downlink frequency that picks up valid GSM data.

Then press run. This will generate an airprobe_rtlsdr.py file customized to your machine. This file is currently in `.gitignore` since it is machine specific.

### Settings

```
cd desec
cp example_settings.json settings.json
```

Modify `settings.json` to reflect your actual environment.

   {
  "pythonLocation": "/usr/bin/python2",
  "airprobeLocation": "/home/user/workspace/SDR-Detector/grcs/airprobe_rtlsdr.py",
  "rtlsdrscanLocation": "/home/user/workspace/RTLSDR-Scanner/src/rtlsdr_scan.py",
  "quickScanLogLocation": "/home/user/workspace/quickScan.csv",
  "tSharkLocation": "/usr/local/bin/tshark",
  "kalRTLLocation": "/home/user/workspace/kalibrate-rtl/src/kal",
  "kalHackRFLocation": "/home/user/workspace/kalibrate-hackrf/src/kal",
  "quickScanTolerance": 43,
  "quickScanNumSweeps": 1,
  "quickScanDwell": 0.262,
  "quickScanFFT": 1024,
  "deepScanPeriod": 15,
  "testing": {
    "testRTLSDRScannerCSV": "/home/user/workspace/SDR-Detector/packages/gsm-scanners/scanners/p1-rtlsdr-scanner-tests.csv",
    "testPCAPFile": "/home/user/workspace/SDR-Detector/packages/gsm-scanners/scanners/p2-bts-test-file.pcapng"
  }
}


**Don't use //comments in JSON. THEY ARE NOT VALID!**

### Temporary files
The app currently logs temporary quick scan files to `/../tmp/` (ie, one level up from the root directory). Make sure you create a folder for it there.

Usage
=====
```
// Must run as `root` in order to capture data
sudo meteor --settings settings.json      
```

The terminal will continue to run indefinitely. Use CTRL+C to stop and manually close Airprobe.

### Webapp

By default, Meteor runs the webserver on `http://localhost:3000`

The app currently scans all frequencies in list that are checked. You can add new frequencies but may not remove existing ones.

Troubleshooting
==============
### RTLSDR-Scanner
**Error: No devices found** - If you get this error `ps aux | grep python`. If you see a process with `rtlsdr_scan.py` then `sudo kill -9 PROCESSNUMBER`


Testing
=======
Run from project root
    meteor test-packages


One tip for Wine: If you happen to have a crashed window of a Windows EXE that blocks everything else, run the command "wineserver -k" to kill the Windows emulation process and with it all Windows apps.
# SDR-Detector
