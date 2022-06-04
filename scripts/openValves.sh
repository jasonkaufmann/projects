#!/bin/sh

#this script will open all 6 valves to 100%
#open valve 1: 
cansend can0 200#0210030000000000
sleep 0.5
cansend can0 200#062FD003030F6400
sleep 1
cansend can0 200#0210030000000000
sleep 0.5 
cansend can0 200#062FD00303106400
sleep 1
cansend can0 200#0210030000000000
sleep 0.5
cansend can0 200#062FD00303116400
sleep 1
cansend can0 200#0210030000000000
sleep 0.5
cansend can0 200#062FD00303126400
sleep 1
cansend can0 200#0210030000000000
sleep 0.5
cansend can0 200#062FD00303136400
sleep 1
cansend can0 200#0210030000000000
sleep 0.5
cansend can0 200#062FD00303146400

