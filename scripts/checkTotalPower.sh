#!/bin/sh

#this script will print out the total power running on the system  

#get a capture of the sensor data
rm telnet.log #remove old log file
{ echo "gauges";sleep 1; } | telnet localhost 8126 > telnet.log

x24=$(cat telnet.log |grep -o -P '(?<=24v0:).*(?=,)')
x5=$(cat telnet.log |grep -o -P '(?<=5v0:).*(?=,)')
x33=$(cat telnet.log |grep -o -P '(?<=3v3:).*(?=,)')
x12=$(cat telnet.log |grep -o -P '(?<=12v:).*(?=,)')
x52=$(cat telnet.log |grep -o -P '(?<=52v:).*(?=,)')

xflow1=$(cat telnet.log |grep -o -P '(?<=flow1_meter:).*(?=,)')
xflow2=$(cat telnet.log |grep -o -P '(?<=flow2_meter:).*(?=,)')
xflow3=$(cat telnet.log |grep -o -P '(?<=flow3_meter:).*(?=,)')
xflow4=$(cat telnet.log |grep -o -P '(?<=flow4_meter:).*(?=,)')

xleak=$(cat telnet.log |grep -o -P '(?<=leak_sensor:).*(?=,)')

xibatt20=$(cat telnet.log |grep -o -P '(?<=ibatt20:).*(?=,)')
xibatt21=$(cat telnet.log |grep -o -P '(?<=ibatt21:).*(?=,)')
xibatt24=$(cat telnet.log |grep -o -P '(?<=ibatt24:).*(?=,)')
xibatt25=$(cat telnet.log |grep -o -P '(?<=ibatt25:).*(?=,)')
xibatt28=$(cat telnet.log |grep -o -P '(?<=ibatt28:).*(?=,)')
xibatt29=$(cat telnet.log |grep -o -P '(?<=ibatt29:).*(?=,)')

echo $xibatt20
echo $xibatt21
echo $xibatt24


xvbatt20=$(cat telnet.log |grep -o -P '(?<=vbatt20:).*(?=,)')
xvbatt21=$(cat telnet.log |grep -o -P '(?<=vbatt21:).*(?=,)')
xvbatt24=$(cat telnet.log |grep -o -P '(?<=vbatt24:).*(?=,)')
xvbatt25=$(cat telnet.log |grep -o -P '(?<=vbatt25:).*(?=,)')
xvbatt28=$(cat telnet.log |grep -o -P '(?<=vbatt28:).*(?=,)')
xvbatt29=$(cat telnet.log |grep -o -P '(?<=vbatt29:).*(?=,)')

echo $xvbatt20
echo $xvbatt21

xPwr20=$(echo "scale=3; ((($xibatt20*$xvbatt20)))" | bc)
echo $xPwr20
