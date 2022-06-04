#!/bin/sh

if [ $1 == 1 ]
then
    cansend can0 200#0322E01E00000000
elif [ $1 == 2 ]
then 
    cansend can0 200#0322E01F00000000
elif [ $1 == 3 ]
then
    cansend can0 200#0322E02000000000
elif [ $1 == 4 ]
then
    cansend can0 200#0322E02100000000
else
    echo "invalid Flow meter"
fi

sleep 0.5

#cut -c 34-36 <<< $(tail -1 /tmp/chinmay/CANlog.txt) 



OUTPUT=$(cut -c 34-36 <<< $(tail -1 /tmp/chinmay/CANlog.txt))
#echo $OUTPUT

#echo "obase=10; ibase=16; $OUTPUT" | bc

DECOUT=$(echo "obase=10; ibase=16; $OUTPUT" | bc)
#echo $DECOUT
#echo "scale=3; ($DECOUT/1024)*5" | bc
VOLT=$(echo "scale=3; ($DECOUT/1024)*5" | bc)
#echo $VOLT
FLOW=$(echo "scale=4; ((($VOLT-0.8)/3.2)*300)" | bc)

echo $FLOW
