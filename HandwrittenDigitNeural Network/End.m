function End(h,event)
%call in the figure global variable
global f
%if "exit" is pressed close all and do nothing else
d1 = uicontrol('Parent',f,'Style','pushbutton','FontSize',30,'Units','normalized','Position',[0.3,0.75,0.4,0.2],...
    'String','Exit','BackgroundColor','black','ForegroundColor',[0 0.95 0],'Callback','close all');
%if "enter another number is pressed" it calls the repeat function (see
%repeat for more info)
e1 = uicontrol('Parent',f,'Style','pushbutton','FontSize',25,'Units','normalized','Position',[0.05,0.425,0.9,0.25],...
    'String','Enter Another Number','BackgroundColor','black','ForegroundColor',[0 0.95 0],'Callback',@repeat);
%if "Store Value Into Mat File" it calls the mat function (see
%repeat for more info)
f1 = uicontrol('Parent',f,'Style','pushbutton','FontSize',25,'Units','normalized','Position',[0.05,0.1,0.9,0.25],...
    'String','Store Value Into Mat File','BackgroundColor','black','ForegroundColor',[0 0.95 0],'Callback',@mat);
axis off
end