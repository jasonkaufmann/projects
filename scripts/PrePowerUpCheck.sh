#!/bin/sh

#this script should be run right after turning on 480V. Its purpose is to check the following: 
#Chassis controller Voltages are good 
#Valves are open and flow meters are reading non-zero flows > 5 lpm 
#leak sensor is reading ok
#temperatures are reasonable 
#Input power on the power trays looks good (Vrms ~ 277VAC)

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

#check CC voltages first

if [ 1 -eq "$(echo "$x24 > 22.8" | bc)" ];then echo "24V rail is good";else echo "24V rail is below lower limit";break;fi
if [ 1 -eq "$(echo "$x24 < 25.2" | bc)" ];then echo "24V rail is good";else echo "24V rail is above upper limit";break;fi
echo $x24
if [ 1 -eq "$(echo "$x12 > 11.4" | bc)" ];then echo "12V rail is good";else echo "12V rail is below lower limit";break;fi
if [ 1 -eq "$(echo "$x12 < 12.6" | bc)" ];then echo "12V rail is good";else echo "12V rail is above the upper limiit";break;fi
echo $x12
if [ 1 -eq "$(echo "$x5 > 4.75" | bc)" ];then echo "5V rail is good";else echo "5V rail is below lower limit";break;fi
if [ 1 -eq "$(echo "$x5 < 5.25" | bc)" ];then echo "5V rail is good";else echo "5V rail is above the upper limit";fi
echo $x5
if [ 1 -eq "$(echo "$x33 > 3.135" | bc)" ];then echo "3v3 rail is good";else echo "3v3 rail is below lower limit";break;fi
if [ 1 -eq "$(echo "$x33 < 3.465" | bc)" ];then echo "3v3 rail is good";else echo "3v3 rail is above the upper limit";break;fi
echo $x33
if [ 1 -eq "$(echo "$x52 > 40" | bc)" ];then echo "Precharge Rail is good";else echo "Precharge fail";break;fi
echo $x52

echo "CC Voltages look good.. Checking Flow meters next"

if [ 1 -eq "$(echo "$xflow1 > 5" | bc)" ];then echo "Flow meter 1 looks good";else echo "Flow Meter 1 reporting low value";break;fi
echo $xflow1
if [ 1 -eq "$(echo "$xflow2 > 5" | bc)" ];then echo "Flow meter 2 looks good";else echo "Flow Meter 2 reporting low value";break;fi
echo $xflow2
if [ 1 -eq "$(echo "$xflow3 > 5" | bc)" ];then echo "Flow meter 3 looks good";else echo "Flow Meter 3 reporting low value";break;fi
echo $xflow3
if [ 1 -eq "$(echo "$xflow4 > 5" | bc)" ];then echo "Flow meter 4 looks good";else echo "Flow Meter 4 reporting low value";break;fi
echo $xflow4

echo "Flow meter data looks good, checking Leak sensor"

if [ 1 -eq "$(echo "$xleak > 2.2" | bc)" ] && [ 1 -eq "$(echo "$xleak < 2.8" | bc)" ];then echo "leak sensor looks good";else echo "ALERT !! Leak detected";break;fi
echo $xleak

echo "Checking Power tray next" 
echo "1.Power tray input voltages"

