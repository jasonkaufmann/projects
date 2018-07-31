function sgmd = sigmoid(z)
%find the value of the input variable when plugged into the sigmoid
%function, which essentially takes the number line and squishes it between
%0 and 1.
sgmd = 1 ./ (1 + exp(-z));
end
