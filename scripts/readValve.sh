#!/bin/sh

if [ $1 == 1 ]
then
    cansend can0 200#0322E01700000000
elif [ $1 == 2 ]
then 
    cansend can0 200#0322E01800000000
elif [ $1 == 3 ]
then
    cansend can0 200#0322E01900000000
elif [ $1 == 4 ]
then
    cansend can0 200#0322E01A00000000
elif [ $1 == 5 ]
then 
    cansend can0 200#0322E01B00000000
elif [ $1 == 6 ]
then 
    cansend can0 200#0322E01C00000000
else
    echo "invalid valve number"
fi

sleep 0.5

#cut -c 34-36 <<< $(tail -1 CANlog.txt) 



OUTPUT=$(cut -c 32-36 <<< $(tail -1 CANlog.txt))
echo $OUTPUT

#echo "obase=10; ibase=16; $OUTPUT" | bc
HIBYTE=$(echo $OUTPUT | cut -c1-2)
LOWBYTE=$(echo $OUTPUT | cut -c4-5)
VALUE=$(echo "$HIBYTE$LOWBYTE")
DECOUT=$(echo "obase=10; ibase=16; $VALUE" | bc)



#DECOUT=$(echo "obase=10; ibase=16; $OUTPUT" | bc)
#echo $DECOUT
#echo "scale=3; ($DECOUT/1024)*5" | bc
VOLT=$(echo "scale=3; ($DECOUT/1024)*5" | bc)
#echo $VOLT
VALVEPOS=$(echo "scale=4; ((($VOLT*2.5)-2)*11.25)" | bc)

echo $VALVEPOS

