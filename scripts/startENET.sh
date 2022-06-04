#!/bin/sh
sudo ethtool -s eth1 speed 100 duplex full autoneg off
sleep 0.1
sudo ip link set down eth1
sleep 0.1
sudo ip link set up eth1
sleep 0.1
ifconfig eth1 192.168.90.30/24
