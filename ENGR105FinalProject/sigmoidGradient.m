function sgmdgrad = sigmoidGradient(z)
%takes an input number (could be a vector) and outputs the deriative of the
%sigmoid function at the input.

%initializes the length of the input 
sgmdgrad = zeros(size(z));
%calls the sigmoid function and it can easily be shown that the derivative
%of the sigmoid fucntion is as follows
sgmdgrad = sigmoid(z) .* (1 - sigmoid(z));
end
