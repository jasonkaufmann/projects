function mat(h,event)
%call the mate variable from WritingScreen.m
global mate
%change the number back to a string, match with the decimals using regexp,
%then convert back to a number to potentially store.
number=str2double(regexp(num2str(mate),'\d','match'));
%save to .mat file
save('Number.mat','number')
%display that it was saved
disp('Saved to Number.mat');
%clear the screen
clf
global f
%exit pushbutton
d1 = uicontrol('Parent',f,'Style','pushbutton','FontSize',30,'Units','normalized',...
    'Position',[0.3,0.75,0.4,0.2],'String','Exit','BackgroundColor','black',...
    'ForegroundColor',[0 0.95 0],'Callback','close all');
%repeat the whole program
e1 = uicontrol('Parent',f,'Style','pushbutton','FontSize',25,'Units','normalized',...
    'Position',[0.05,0.425,0.9,0.25],'String','Enter Another Number','BackgroundColor',...
    'black','ForegroundColor',[0 0.95 0],'Callback',@repeat);
%unsave the .mat file
f1 = uicontrol('Parent',f,'Style','pushbutton','FontSize',25,'Units','normalized',...
    'Position',[0.05,0.1,0.9,0.25],'String','Delete Mat File','BackgroundColor',...
    'black','ForegroundColor',[0 0.95 0],'Callback',@unsave);
end