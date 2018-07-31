function [J, changes] = costfunction_backpropagation(nn_params,input_layer_size,hidden_layer1_size,hidden_layer2_size,output_layer_size, ...
    numbers, labels)

%Since the weights and biases are stored into initial nnparams (in the
%neural_netowork file, they need to be reshaped into their correct sizes by
%indexing into nn_params.

%index to create 100x2501 matrix for all the weights and biases
%corresponding to the first hidden layer
w_b1 = reshape(nn_params(1:hidden_layer1_size * (input_layer_size + 1)), ...
    hidden_layer1_size, (input_layer_size + 1));

%index to create 100x101 matrix for all the weights and biases
%corresponding to the second hidden layer
w_b2 = reshape(nn_params((1 + (hidden_layer1_size * (input_layer_size + 1))):((hidden_layer1_size * (input_layer_size + 1)))+(hidden_layer1_size+1)*(hidden_layer2_size)), ...
    hidden_layer2_size, (hidden_layer1_size+1));

%index to create 10x101 matrix for all the weights and biases
%corresponding to the output layer
w_b3 = reshape(nn_params((((hidden_layer1_size * (input_layer_size + 1)))+(hidden_layer1_size+1)*(hidden_layer2_size)+1:end)), ...
    output_layer_size, hidden_layer2_size+1);

%find the number of training data samples
j=length(labels);

%initialize the cost function
J=0;
%initialize the gradients/derivatives associated with the weights and
%biases of each layer (not including the input layer because that is
%predefined)
w_b_delta1 = zeros(size(w_b1));
w_b_delta2 = zeros(size(w_b2));
w_b_delta3 = zeros(size(w_b3));

%find the acivation of the first layer (essentially just the pixel values in the 
%training data) by adding a column of ones to allow for correct
%multiplication with all the weights and the added bias column.
a1=[ones(j,1) numbers];
%multiply a1 by the weights and biases to get the raw activations of the
%second layer
z2=a1*w_b1';
%employ the sigmoid function, which squishes the entire number line between
%0 and 1, to stay consistent with the double pixel values in the training
%data. See the sigmoid function for the actual function.
a2=sigmoid(z2);
%again, add a column of ones to the activations of the second layer to
%account for the bias column in w_b2
a2=[ones(size(a2,1), 1) a2];
%multiply a2 by the weights and biases to get the raw activations of the
%third layer
z3=a2*w_b2';
%again, employ the squisification function to get all values between 0 and
%1
a3=sigmoid(z3);
%again, add a column of ones
a3=[ones(size(a3,1), 1) a3];
%find raw activations of output layer
z4=a3*w_b3';
%find final output activations by squishing the values between 0 and 1.
output=sigmoid(z4);

%create an array with ones in the position where the value of the 
for i = 1:j
    label_array(i,labels(i)) = 1;
end

%employ the quadratic cost function to find the difference between the
%random output and the value that the training sample should have
J = 1/j * sum(sum((output-label_array).^2));

%Backpropagation technique for each piece of training data
for i=1:j
    %employ the same procedure as above to forward propagate the network
    a1=[1; numbers(i,:)'];
    z2=w_b1*a1;
    a2=[1; sigmoid(z2)];
    z3=w_b2*a2;
    a3=[1;sigmoid(z3)];
    z4=w_b3*a3;
    output=sigmoid(z4);
   
    %create a 1 by ten array with a 1 in the postion where the number from 1
    %to 10 is equal to the label index.Essentially, if the first label is
    %3, there will only be a one in the third position of the ten digit
    %array with the rest zero because it is performing a logic statement
    label_array = ([1:output_layer_size]==labels(i))';
    %calculate the error by subtracting the random value by the value it
    %should have.
    error_L4= output-label_array;
    %backpropagate the error to the third layer (essentially a partial
    %derivative is taken of the change in the cost function with respect to
    %the weights and biases and that is achieved by taking the actual
    %derivatives of a string of intermediate variables. There is more
    %explanation in the write-up.
    error_L3=(w_b3'*error_L4).*[1;sigmoidGradient(z3)];
    %extract solely the weights
    error_L3= error_L3(2:end);
    %backpropagate to the second layer
    error_L2=(w_b2'*error_L3).*[1;sigmoidGradient(z2)];
    %extract solely the weights
    error_L2= error_L2(2:end);
    
    %continually update the gradients each iteration by adding the previous
    %gradient to the new one. The error is multiplied by the corresponding
    %activation in the layer behind it to achieve the change in the weights
    %and biases that connect the first and second layer. (biases are
    %technically inherent to the neuron and not the connection between
    %them)
    w_b_delta1=w_b_delta1+error_L2*a1';
    w_b_delta2=w_b_delta2+error_L3*a2';
    w_b_delta3=w_b_delta3+error_L4*a3';
end
%divide the gradients by the number of iterations to find the average
%gradient
w_b_delta1= w_b_delta1/j;
w_b_delta2= w_b_delta2/j;
w_b_delta3= w_b_delta3/j;

%put all the changes into single columned vector that the multivariable
%function minimizer can process
changes = [w_b_delta1(:) ; w_b_delta2(:); w_b_delta3(:)];
end