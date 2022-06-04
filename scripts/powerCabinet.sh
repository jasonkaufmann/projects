#!/bin/sh


if [ $1 == 1 ]
then
	echo "Powering up"
	cansend can0 200#043101C001000000
elif [ $1 == 0 ]
then
	echo "Powering down"
	cansend can0 200#043102C001000000
else
	echo "invalid option, must be a 0 or 1"
fi
