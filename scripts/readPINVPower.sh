#!/bin/sh

PTindex=$1 

#first send the diagnostic command 
cansend can0 200#0210030000000000


case $PTindex in
	"20") echo "you picked PT 0";cansend can0 200#062FD01303140000 ;;
	"21") echo "you picked PT 1";cansend can0 200#062FD01303150000;;
	*) echo "you picked something else";;
esac


sleep 0.2

ISPINVPWR=$(cut -c 20-33 <<< $(tail -1 CANlog.txt))
echo $ISPINVPWR
OUTPUT=$(cut -c 32-42 <<< $(tail -1 CANlog.txt))

if [ "$ISPINVPWR" = "06 6F D0 13 03" ]
then
   UPHIBYTE=$(echo $OUTPUT | cut -c1-2)
   UPLOWBYTE=$(echo $OUTPUT | cut -c4-5)
   UPVALUE=$(echo "$UPHIBYTE$UPLOWBYTE")
#   LEAKDEC=$(echo "obase=10; ibase=16; $VALUE" | bc)
   LOWHIBYTE=$(echo $OUTPUT | cut -c7-8)
   LOWLOWBYTE=$(echo $OUTPUT | cut -c10-11)
   LOWVALUE=$(echo "$LOWHIBYTE$LOWLOWBYTE")

   REALVALUE=$(echo "$UPLOWBYTE$LOWHIBYTE")

   echo $REALVALUE
   
   python floatify1.py "$UPVALUE" "$LOWVALUE"	
	
   #echo $OUTPUT
else
   echo "DATA is not from a leak sensor"
fi

