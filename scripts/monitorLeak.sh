#!/bin/sh

#source /tmp/chinmay/readLeak.sh

#this script will first average the leak sensor readings for 15sec at 1hz and save this value as the NO LEAK reading 
#then it will run every 3 seconds and if a leak is detected 
x=0;

echo "collecting samples to measure a NOLEAK threshold"
for i in {1..5}
do 
    y=$(sh /tmp/chinmay/readLeak.sh)
    #echo $y
    sleep 1
    x=$(echo "scale=3; $x + $y" | bc )
    #echo $x
#echo "scale=3; $x+$y" | bc
done

NOLEAK=$(echo "scale=3; $x/5" | bc )

echo $NOLEAK

echo "NO LEAK Voltage is $NOLEAK"

echo "Leak monitoring Enabled.."


echo $NOLEAK

while [ 1 ]
do 
#removing decimal point
LEAKVALUE=$(sh /tmp/chinmay/readLeak.sh)
LEAKVALUE_BUF=$(echo "scale=3; $LEAKVALUE+0.3" | bc )

#echo $LEAKVALUE
#echo $LEAKVALUE_BUF

sleep 2
if [ 1 -eq "$(echo "${NOLEAK} > ${LEAKVALUE_BUF}" | bc)" ]
then 
	echo "LEAK DETECTED!! POWER DOWN"
	break
else 
	echo "LOOKING GOOD"
fi

done