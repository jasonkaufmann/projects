%ENGR 105 Final Project

%Initialize Network Paramaters (two hidden layers were chosen arbirarily
%as it seemed that complexity would be sufficient for this application)
input_layer_size=2500; %Since the input images are 50x50, the input layer
%has to be 2,500 in length as each row od pixels is unrolled into it
hidden_layer1_size=100;
hidden_layer2_size=100;
output_layer_size=10; %Since there are 10 digits (0,1,2,3,4,5,6,7,8,9), 
%there needs to be 10 neurons in the output layer as the activations of
%each will determine which number the network chooses.
%Initialize Images
handwritten_numbers=load('store.mat'); %load the training data from the .mat file
numbers=handwritten_numbers.store; %extract it as it is stored in a cell
%Randomize Weights and Biases and Changes
rng('shuffle') %sees current time to make sure random number generation is random as possible.
%Make a random distriubtion of numbers with the correct length. The number
%of weights is calculated by multiplying the first layer by the second
%layer and added that to the multiplciation of the second layer and the
%third layer and so on.
weights=0.5*randn(input_layer_size*hidden_layer1_size+hidden_layer1_size*hidden_layer2_size...
    +hidden_layer2_size*output_layer_size,1);
%the bumber of biases is solely the number of neurons not including the
%input layer
biases=0.5*randn(hidden_layer1_size+hidden_layer2_size+output_layer_size,1);
%load the values that hold the actual values for the training data
values=load('label_store.mat');
labels=values.label_store;
%change all the values that are 0 to 10, which allows for indexing
%(matrices cannot be indexed at 0 in Matlab)
for i=1:length(labels)
    if labels(i)==0
        labels(i)=10;
    else
    end
end

%set the max number of iterations to 50 for the multivariable function
%minimizer
options = optimset('MaxIter',50);
%make the costfunction_backpropagation function into a single input
%function at just the position of nn, instead of having every single
%variable need as an input.
cFunction = @(nn) costfunction_backpropagation(nn, input_layer_size, hidden_layer1_size,hidden_layer2_size,output_layer_size,...
    numbers, labels);
                    
%given the weights and biases and the  gradients of the cost function,
%'fmincg' (not created by me, it was a built in function to matlab in the
%past, but was deleted. I tried to use fminunc, which performs the same
%functionality and is a built in function, but the input data is too large
%for that function to work (caused an error when I tried)

[nn_w_b,cost] = fmincg(cFunction, [weights; biases],options);

%reshape the output of nn_w_b into the appropriate sizes for further
%processing in WritingScreen.m. These weights and biases are the ones that
%minimized the cost function and should work to correctly identify the
%handwritten digits given by the training data that I created.
w_b1 = reshape(nn_w_b(1:hidden_layer1_size * (input_layer_size + 1)), ...
    hidden_layer1_size, (input_layer_size + 1));

w_b2 = reshape(nn_w_b((1 + (hidden_layer1_size * (input_layer_size + 1))):((hidden_layer1_size * (input_layer_size + 1)))+(hidden_layer1_size+1)*(hidden_layer2_size)), ...
    hidden_layer2_size, (hidden_layer1_size + 1));

w_b3 = reshape(nn_w_b((((hidden_layer1_size * (input_layer_size + 1)))+(hidden_layer1_size+1)*(hidden_layer2_size)+1:end)), ...
    output_layer_size, (hidden_layer2_size + 1));