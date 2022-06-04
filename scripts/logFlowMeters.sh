#!/bin/sh

while [ 1 ]
do 
	./readFlow.sh 1
	sleep 0.1
	./readFlow.sh 2
	sleep 0.1
	./readFlow.sh 3
	sleep 0.1
	./readFlow.sh 4
	sleep 0.1
	echo "next cycle"
done
