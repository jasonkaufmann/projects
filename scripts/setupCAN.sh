#!/bin/sh
sudo ip link set can0 type can bitrate 500000
sleep 0.1
sudo ip link set up can0

