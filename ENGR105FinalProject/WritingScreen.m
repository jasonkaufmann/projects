% Writing on Screen and Number Recognition
global f
f=figure;
global a0 %call in the variable that stored the number of digits chosen in 
%main screen
u='-';
u(1:a0)='-'; %initalize u as the length of the number of digits the user chose

%go through different conditions to add the commas to the correct place in
%the number depending on if 1,2, or 3 commas is needed
if a0==10
    c=u(2:end);
    u(3:11)=c;
    u(2)=',';
    c=u(6:end);
    u(7:12)=c;
    u(6)=',';
    c=u(10:end);
    u(11:13)=c;
    u(10)=',';
elseif a0>=7
    c=u(a0-5:end);
    u(a0-4:a0+1)=c;
    u(a0-5)=',';
    c=u(a0-1:end);
    u(a0:a0+2)=c;
    u(a0-1)=',';
elseif a0>=4
    c=u(a0-2:end);
    u(a0-1:a0+1)=c;
    u(a0-2)=',';
end
fr=0; %initialize variable for number of redos
g=0; %initialize a stepping variable for each iteration
a=length(u); %take the initial length of the number added to the number of commas
while a>=1
    a=a+fr; %add the number of redos to the length to keep the loop going until 
    %the last number is reached
    g=g+1; %increment the number of iterations of the loop
    
    %load correct weights and biases
    mat1=load('w_b1.mat');
    w_b1=mat1.w_b1;
    mat2=load('w_b2.mat');
    w_b2=mat2.w_b2;
    mat3=load('w_b3.mat');
    w_b3=mat3.w_b3;
    set(gcf,'Visible','off','Color','k')
    %created a 400x400 black image
    black=zeros(400,400);
    %show the white outline
    white=padarray(black,[5 5],1);
    imshow(white)
    set(gcf,'Units','normalized', 'Position', [0.35, 0.4,0.3,0.45])
    pause(.05)
    set(gcf,'Visible','on');
    xlabel(u,'FontSize',40,'Color',[0 0.95 0])
    %display the number being written
    num={'First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth','Ninth','Tenth'};
    uicontrol('Style','text','Units','normalized','Position',[0.025,0.91,0.95,0.08],...
        'String',['Draw ' char(num{g-fr}) ' Number (Click and Drag)'],'FontSize',15,...
        'FontName','TimesNewRoman','BackgroundColor','black','ForegroundColor',[0 0.95 0]);
    %call the imfreehand function to allow the user to draw an image and
    %set the value of closed to false so it doesn't complete a full loop
    h=imfreehand('Closed',false);
    %get the posisiton of the digit drawn on the axes
    pos=getPosition(h);
    %round it for easier indexing and processing
    pos=round(pos);
    %extract the x and y coordinates
    x=pos(:,1);
    y=pos(:,2);
    %find the difference between the max and min y values
    t=max(y)-min(y);
    %find the difference between the max and min x values
    s=max(x)-min(x);
    %since some ones are very skinny, if the x value is very small, make it
    %larger so when processing is continued the output image is correct
    if s<25
        s=100;
    end
    %find the number of x digits (same as y)
    len = length(x);
    %define a rate so that interpolation can occur
    rate = 100;
    %make a specified(length of x times the rate) points between 1 and the
    %length of x)
    newpoints = linspace(1, len, len * rate);
    yy = [0, x', 0; 1, y', 1];
    %use spline to interpolate data because imfreehand sometimes looses
    %data because it works when the cursor is moved and the faster the
    %cursor movement the lower the number of points that it gets for the
    %postion, which would cause the output to have skips and jagged lines
    q = spline(1:len, yy);
    %evaluate the polynimial at the specified points
    Y = ppval(q, newpoints);
    %extract to get the new values with the holes filled due to
    %interpolation, making the overall image much more representative of
    %the line drawn
    x_new = round(Y(1, :));
    y_new = round(Y(2, :));
    
    %conditions if the user draws outside of the box. Essentially, just
    %closes and then reopens the writing screen
    if find(x_new<0)
        xlabel('Stay In Boundaries!','FontSize',20);
        pause(1)
        g=g-1;
        clf
        continue
    elseif find(x_new>400)
        xlabel('Stay In Boundaries!','FontSize',20);
        pause(1)
        clf
        g=g-1;
        continue
    elseif find(y_new<0)
        xlabel('Stay In Boundaries!','FontSize',20);
        pause(1)
        clf
        g=g-1;
        continue
    elseif find(y_new>400)
        xlabel('Stay In Boundaries!','FontSize',20);
        pause(1)
        clf
        g=g-1;
        continue
    end
    
    %add points around the x and y values to give the number length and
    %width
    for i=1:length(x_new)
        for j=0:round(t/25) %made proportional to the height and width of image drawn
            %to produce a consisten image no matter the size on the screen
            for k=0:round(s/5)
                black(y_new(i)+j,x_new(i)+k)=1; %equalling 1 makes it white
            end
        end
    end
    [r,c]=find(black);
    %crop the image in to where there are white pixels
    black_int=black(min(r):max(r),min(c):max(c));
    [a,b]=size(black_int);
    %pad the array to put some black aroud the digit 
    black_int=padarray(black_int,[0 round(a/2)]);
    %resize it for consistency with the neural network parameters 
    black2=imresize(black_int, [46 46]);
    black3=padarray(black2,[2 2]);
    %the image is now 50x50, and can go into the network
    
    %forwardpropagate the network to get the guess for the digit drawn
    a1=[1 black3(:)'];
    z2=a1*w_b1';
    a2=sigmoid(z2);
    a2=[1 a2];
    z3=a2*w_b2';
    a3=sigmoid(z3);
    a3=[1 a3];
    z4=a3*w_b3';
    output=sigmoid(z4);
    [drake1, drake2]=max(output); %find the max of the output to get the guess 
    %for the number
    if drake2==10 %change the tens back to zeros
        drake2=0;
    else
    end
    drake1=round(drake1,2);
    drake1=drake1*100; %obtain the actiavtion percent certainty (not really a certainty
    %of the network, but it is a good approxiamtion for how confident the
    %network is that the number guessed is correct)
    fprintf('Guess: %d \nCertainty: %d%% \n',drake2,drake1); 
    disp('If Correct, click Correct or Press Enter.');
    %convert the number to a string
    a=num2str(drake2);
    
    %go through multiple scenarios to add the number to the correct place
    %in the string taking into account the commas and redos
    if a0==10
        if a0-g+fr<=2
            u(g+3-fr)=a;
        elseif a0-g+fr<=5
            u(g+2-fr)=a;
        elseif a0-g+fr<=8
            u(g+1-fr)=a;
        else
            u(g-fr)=a;
        end
    elseif a0>=7
        if a0-g+fr<=2
            u(g+2-fr)=a;
        elseif a0-g+fr<=5
            u(g+1-fr)=a;
        else
            u(g-fr)=a;
        end
    elseif a0>=4
        if a0-g+fr<=2
            u(g+1-fr)=a;
        else
            u(g-fr)=a;
        end
    else
        u(g-fr)=a;
    end
    xlabel(u,'FontSize',40,'Color',[0 0.95 0])
    %display a question dialogue to ask if the number displayed is correct
    %or incorrect
    choice = questdlg('Is the Number Displayed...?','Handwritten Digit Recognition', ...
        'Incorrect','Correct','Correct'); %create a question dialogue pop-up menu
    %to choose from the options created below
    switch choice
        case 'Incorrect' %if incorrect get rid of the number in the position 
            %and add back the dash using the same exact ideas as adding the number
            %above
            clf
            if a0==10
                if a0-g+fr<=2
                    u(g+3-fr)='-';
                elseif a0-g+fr<=5
                    u(g+2-fr)='-';
                elseif a0-g+fr<=8
                    u(g+1-fr)='-';
                else
                    u(g-fr)='-';
                end
            elseif a0>=7
                if a0-g+fr<=2
                    u(g+2-fr)='-';
                elseif a0-g+fr<=5
                    u(g+1-fr)='-';
                else
                    u(g-fr)='-';
                end
            elseif a0>=4
                if a0-g+fr<=2
                    u(g+1-fr)='-';
                else
                    u(g-fr)='-';
                end
            else
                u(g-fr)='-';
            end
            fr=fr+1; %add 1 to the redo tracking variable meaning that the redo
            %was performed again
        case 'Correct'
            if a0==g-fr %if the length of the number is reached break out of the
                %loop
                clf
                break
            else
                clf %otherwise just clear the screen and continue with the loop
            end
    end
end
global mate
mate=str2double(u); %save the number to a variable for posible storing
run('End.m'); %run the end script (see End.m for more information)