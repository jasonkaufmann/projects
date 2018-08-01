%Tic-Tac-Toe
%Jason Kaufmann
%ENGR 105
%Midterm Project
c=1; %set variable 'c' that will loop the entire game if desired to play again.
while c==1
    choice = questdlg('Choose a Game Mode', ...
        'Jason''s Tic-Tac-Toe Game', ...
        'Player v Player','Player v Computer','Close',''); %create a question dialogue pop-up menu
    %to choose from the options created below
    switch choice
        case 'Player v Player'
            clear
            c=1;
        case 'Player v Computer'
            computer=1;
        case 'Close'
            close all
            break
    end
    i=1; %set loop variable for X's
    j=1; %set loop variable for O's
    figure('position',[500 500 600 600]); %set the size and position on screen
    %of the figure
    xlim([0 60]); %set the x value limits
    ylim([0 60]); % set the y value limits
    line([20 20],[0 60],'Color','black','LineWidth',3); %make game board with lines
    line([40 40],[0 60],'Color','black','LineWidth',3);
    line([0 60],[20 20],'Color','black','LineWidth',3);
    line([0 60],[40 40],'Color','black','LineWidth',3);
    line([0 60],[60 60],'Color','black','LineWidth',3);
    line([60 60],[0 60],'Color','black','LineWidth',3);
    line([0 60],[0 0],'Color','black','LineWidth',3);
    line([0 0],[0 60],'Color','black','LineWidth',3);
    title('Tic-Tac-Toe','FontSize',50); %title the game
    set(gca,'YTick',[]); %get rid of y axis tick marks and numbers
    set(gca,'XTick',[]); %get rid of x axis tick marks and numbers
    track=zeros(3,3); %initialize a 3-by-3 matrix to determine who wins or if there is a tie.
    while j==1 %create a while loop for the X's and O's so they swicth back and forth to make turns.
        xlabel('X''s turn','FontSize',50); %make label at bottom to show when it is X's turn to go.
        while i==1 %create while loop for X's turn
            [x,y]=ginput(1); %allows the user to choose a location on the now invisible axes
            if x<=20 && x>=0 && y<=20 && y>=0 %conditions to check where the user clicks
                if track(3,1)==0 %checks whether there is already an X there and if so, you can not go there
                    line([2 18],[2 18],'Color','red','LineWidth',3); %makes X
                    line([18 2],[2 18],'Color','red','LineWidth',3);
                    track(3,1)=1; %set the value in the corresponding matrix equal to 1
                    i=2;%set 'i' equal to 2 and that allows for the O's loop below to start
                else
                end
            elseif x<=20 && x>=0 && y<=40 && y>=20
                if track(2,1)==0
                    line([2 18],[22 38],'Color','red','LineWidth',3);
                    line([18 2],[22 38],'Color','red','LineWidth',3);
                    track(2,1)=1;
                    i=2;
                else
                end
            elseif x<=20 && x>=0 && y<=60 && y>=40
                if track(1,1)==0
                    line([2 18],[42 58],'Color','red','LineWidth',3);
                    line([18 2],[42 58],'Color','red','LineWidth',3);
                    track(1,1)=1;
                    i=2;
                else
                end
            elseif x<=40 && x>=20 && y<=20 && y>=0
                if track(3,2)==0
                    line([22 38],[2 18],'Color','red','LineWidth',3);
                    line([38 22],[2 18],'Color','red','LineWidth',3);
                    track(3,2)=1;
                    i=2;
                else
                end
            elseif x<=40 && x>=20 && y<=40 && y>=20
                if track(2,2)==0
                    line([22 38],[22 38],'Color','red','LineWidth',3);
                    line([38 22],[22 38],'Color','red','LineWidth',3);
                    track(2,2)=1;
                    i=2;
                else
                end
            elseif x<=40 && x>=20 && y<=60 && y>=40
                if track(1,2)==0
                    line([22 38],[42 58],'Color','red','LineWidth',3);
                    line([38 22],[42 58],'Color','red','LineWidth',3);
                    track(1,2)=1;
                    i=2;
                else
                end
            elseif x<=60 && x>=40 && y<=20 && y>=0
                if track(3,3)==0
                    line([42 58],[2 18],'Color','red','LineWidth',3);
                    line([58 42],[2 18],'Color','red','LineWidth',3);
                    track(3,3)=1;
                    i=2;
                else
                end
            elseif x<=60 && x>=40 && y<=40 && y>=20
                if track(2,3)==0
                    line([42 58],[22 38],'Color','red','LineWidth',3);
                    line([58 42],[22 38],'Color','red','LineWidth',3);
                    track(2,3)=1;
                    i=2;
                else
                end
            elseif x<=60 && x>=40 && y<=60 && y>=40
                if track(1,3)==0
                    line([42 58],[42 58],'Color','red','LineWidth',3);
                    line([58 42],[42 58],'Color','red','LineWidth',3);
                    track(1,3)=1;
                    i=2;
                else
                end
            end
        end
        xlabel('O''s turn','FontSize',50); %display that it is O's turn to go.
        if sum(track(1,:))==3 %check to see if anyone has one by adding values in the track matrix
            %and seeing if they are equal to 3, meaning there are 3 X's in
            %a row, column, or diagonal.
            j=3; %allows for if statements at bottom to say that X has won
            xlabel(''); %get rid of the x label saying who's turn it is
            x = linspace(5,55,100); %make an animated line through the X's where the winning moves are.
            y= linspace(50,50,100);
            h = animatedline('LineWidth',10, 'Color', 'red');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(2,:))==3
            j=3;
            xlabel('');
            x = linspace(5,55,100);
            y= linspace(30,30,100);
            h = animatedline('LineWidth',10, 'Color', 'red');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(3,:))==3
            j=3;
            xlabel('');
            x = linspace(5,55,100);
            y= linspace(10,10,100);
            h = animatedline('LineWidth',10, 'Color', 'red');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(:,1))==3
            j=3;
            xlabel('');
            x = linspace(10,10,100);
            y= linspace(5,55,100);
            h = animatedline('LineWidth',10, 'Color', 'red');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(:,2))==3
            j=3;
            xlabel('');
            x = linspace(30,30,100);
            y= linspace(5,55,100);
            h = animatedline('LineWidth',10, 'Color', 'red');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(:,3))==3
            j=3;
            xlabel('');
            x = linspace(50,50,100);
            y= linspace(5,55,100);
            h = animatedline('LineWidth',10, 'Color', 'red');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(1,1)+track(2,2)+track(3,3))==3
            j=3;
            xlabel('');
            x = linspace(5,55,100);
            y= linspace(55,5,100);
            h = animatedline('LineWidth',10, 'Color', 'red');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(3,1)+track(2,2)+track(1,3))==3
            j=3;
            xlabel('');
            x = linspace(5,55,100);
            y= linspace(5,55,100);
            h = animatedline('LineWidth',10, 'Color', 'red');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(sum(track))==21
            xlabel(''); %the max sum of all elements in the track matrix is 21
            %because there will always be 5 X's (5*1) and 4 O's (4*4) if there
            %is a tie because the matrix will be full (5+16=21).
            j=5; %allows for if statements at bottom to say that there is a tie
            break
        end
        
        while i==2 %create while loop for O's turn
            if computer==1 %check if they want to play the computer
                a=60.*rand(1,2); %create two random values between 0 and 60
                x=a(1,1); %get an x variable
                y=a(1,2); %get a y variable
                pause(0.5); %pause for half a second to make it look like the computer is thinking.
                if x<=20 && x>=0 && y<=20 && y>=0
                    if track(3,1)==0
                        viscircles([10 10],8,'Color','blue','LineWidth',3) %makes O
                        track(3,1)=4; %set the value in the corresponding matrix equal to 4
                        i=1; %set 'i' equal to 1 and that allows for the X's loop above to start again after the loop finishes
                    else
                    end
                elseif x<=20 && x>=0 && y<=40 && y>=20
                    if track(2,1)==0
                        viscircles([10 30],8,'Color','blue','LineWidth',3)
                        track(2,1)=4;
                        i=1;
                    else
                    end
                elseif x<=20 && x>=0 && y<=60 && y>=40
                    if track(1,1)==0
                        viscircles([10 50],8,'Color','blue','LineWidth',3)
                        track(1,1)=4;
                        i=1;
                    else
                    end
                elseif x<=40 && x>=20 && y<=20 && y>=0
                    if track(3,2)==0
                        viscircles([30 10],8,'Color','blue','LineWidth',3)
                        track(3,2)=4;
                        i=1;
                    else
                    end
                elseif x<=40 && x>=20 && y<=40 && y>=20
                    if track(2,2)==0
                        viscircles([30 30],8,'Color','blue','LineWidth',3)
                        track(2,2)=4;
                        i=1;
                    else
                    end
                elseif x<=40 && x>=20 && y<=60 && y>=40
                    if track(1,2)==0
                        viscircles([30 50],8,'Color','blue','LineWidth',3)
                        track(1,2)=4;
                        i=1;
                    else
                    end
                elseif x<=60 && x>=40 && y<=20 && y>=0
                    if track(3,3)==0
                        viscircles([50 10],8,'Color','blue','LineWidth',3)
                        track(3,3)=4;
                        i=1;
                    else
                    end
                elseif x<=60 && x>=40 && y<=40 && y>=20
                    if track(2,3)==0
                        viscircles([50 30],8,'Color','blue','LineWidth',3)
                        track(2,3)=4;
                        i=1;
                    else
                    end
                elseif x<=60 && x>=40 && y<=60 && y>=40
                    if track(1,3)==0
                        viscircles([50 50],8,'Color','blue','LineWidth',3)
                        track(1,3)=4;
                        i=1;
                    else
                    end
                end
            else
                [x,y]=ginput(1);
                if x<=20 && x>=0 && y<=20 && y>=0
                    if track(3,1)==0
                        viscircles([10 10],8,'Color','blue','LineWidth',3) %makes O
                        track(3,1)=4; %set the value in the corresponding matrix equal to 4
                        i=1;% set 'i' equal to 1 and that allows for the X's loop above to start again after the loop finishes
                    else
                    end
                elseif x<=20 && x>=0 && y<=40 && y>=20
                    if track(2,1)==0
                        viscircles([10 30],8,'Color','blue','LineWidth',3)
                        track(2,1)=4;
                        i=1;
                    else
                    end
                elseif x<=20 && x>=0 && y<=60 && y>=40
                    if track(1,1)==0
                        viscircles([10 50],8,'Color','blue','LineWidth',3)
                        track(1,1)=4;
                        i=1;
                    else
                    end
                elseif x<=40 && x>=20 && y<=20 && y>=0
                    if track(3,2)==0
                        viscircles([30 10],8,'Color','blue','LineWidth',3)
                        track(3,2)=4;
                        i=1;
                    else
                    end
                elseif x<=40 && x>=20 && y<=40 && y>=20
                    if track(2,2)==0
                        viscircles([30 30],8,'Color','blue','LineWidth',3)
                        track(2,2)=4;
                        i=1;
                    else
                    end
                elseif x<=40 && x>=20 && y<=60 && y>=40
                    if track(1,2)==0
                        viscircles([30 50],8,'Color','blue','LineWidth',3)
                        track(1,2)=4;
                        i=1;
                    else
                    end
                elseif x<=60 && x>=40 && y<=20 && y>=0
                    if track(3,3)==0
                        viscircles([50 10],8,'Color','blue','LineWidth',3)
                        track(3,3)=4;
                        i=1;
                    else
                    end
                elseif x<=60 && x>=40 && y<=40 && y>=20
                    if track(2,3)==0
                        viscircles([50 30],8,'Color','blue','LineWidth',3)
                        track(2,3)=4;
                        i=1;
                    else
                    end
                elseif x<=60 && x>=40 && y<=60 && y>=40
                    if track(1,3)==0
                        viscircles([50 50],8,'Color','blue','LineWidth',3)
                        track(1,3)=4;
                        i=1;
                    else
                    end
                end
            end
        end
        if sum(track(1,:))==12 %check to see if anyone has one by adding values in the track matrix
            %and seeing if they are equal to 12, meaning there are 3 O's in
            %a row, column, or diagonal.
            j=4;
            xlabel(''); %allows for if statements at bottom to say that O has won
            x = linspace(5,55,100);
            y= linspace(50,50,100);
            h = animatedline('LineWidth',10, 'Color', 'blue');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(2,:))==12
            j=4;
            xlabel('');
            x = linspace(5,55,100);
            y= linspace(30,30,100);
            h = animatedline('LineWidth',10, 'Color', 'blue');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(3,:))==12
            j=4;
            xlabel('');
            x = linspace(5,55,100);
            y= linspace(10,10,100);
            h = animatedline('LineWidth',10, 'Color', 'blue');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(:,1))==12
            j=4;
            xlabel('');
            x = linspace(10,10,100);
            y= linspace(5,55,100);
            h = animatedline('LineWidth',10, 'Color', 'blue');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(:,2))==12
            j=4;
            xlabel('');
            x = linspace(30,30,100);
            y= linspace(5,55,100);
            h = animatedline('LineWidth',10, 'Color', 'blue');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(:,3))==12
            j=4;
            xlabel('');
            x = linspace(50,50,100);
            y= linspace(5,55,100);
            h = animatedline('LineWidth',10, 'Color', 'blue');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(1,1)+track(2,2)+track(3,3))==12
            j=4;
            x = linspace(5,55,100);
            y= linspace(55,5,100);
            h = animatedline('LineWidth',10, 'Color', 'blue');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(track(3,1)+track(2,2)+track(1,3))==12
            j=4;
            xlabel('');
            x = linspace(5,55,100);
            y= linspace(5,55,100);
            h = animatedline('LineWidth',10, 'Color', 'blue');
            for k = 1:length(x)
                addpoints(h,x(k),y(k));
                drawnow
            end
            break
        elseif sum(sum(track))==21
            j=5;
            xlabel('');
            break
        end
    end
    
    
    if j==3 %essentially saying, "if X has won" because we defined j equal to 3 if X has won.
        choice = questdlg('X wins!', ...
            'Jason''s Tic-Tac-Toe Game', ...
            'Play Again','Close',''); %create a question dialogue pop-up menu
        %to choose from the options created below
        switch choice
            case 'Play Again' %if they click "Play Again" the figure is closed
                %and the 'c' loop is looped agian, essentially creating a
                %brand new game.
                close all
            case 'Close' %if they click "close" the figure is closed and the
                %c loop is broken so the script ends.
                close all
                clc %clear command window
                clear %clear workspace
                break
        end
    elseif j==4 %essentially saying, "if O has won" because we defined j equal to 4 if O has won.
        choice = questdlg('O wins!', ...
            'Jason''s Tic-Tac-Toe Game', ...
            'Play Again','Close','');
        switch choice
            case 'Play Again'
                close all
            case 'Close'
                close all
                clc
                clear
                break
        end
    elseif j==5 %essentially saying, "if there is a tie has won" because we defined j equal to 5 if there is a tie.
        choice = questdlg('It''s a Tie!', ...
            'Jason''s Tic-Tac-Toe Game', ...
            'Play Again','Close','');
        switch choice
            case 'Play Again'
                close all
            case 'Close'
                close all
                clc
                clear
                break
        end
    end
end