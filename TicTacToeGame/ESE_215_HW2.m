syms Vs R1 R2 R3 R4
A = [1/R1+1/R2, -1/R1, -1/R2;
    -1/R1-1/R2, 1/R1+1/R3, 1/R2+1/R4;
    0 -1 1];
b = [0;0;Vs];

x = inv(A)*b
simplify(x(1,1))

%Rs=10;
%Ri=10*10^6;
%Rf=1*10^3;
%Ro=50;
%RL=1*10^3;
%A=10^6;

%G =(RL*Ri*(Ro - A*Rf))/(RL*Rf*Ri + RL*Ri*Ro + RL*Rf*Rs + RL*Ri*Rs + RL*Ro*Rs + Rf*Ri*Ro + Rf*Ro*Rs + Ri*Ro*Rs + A*RL*Ri*Rs)









