function sliderCallback(h,event)
newval = h.Value; %get value from the slider
global a0
a0 = round(newval); %round off this value 
set(h, 'Value', a0);  %set slider position to rounded off value (allows for 
%only discrete values to be chosen)
%update the text on the main screen
a = uicontrol('Style','text','Units','normalized','Position',[.475,0.05,.1,.075],...
            'String',a0,'FontSize',25,'ForegroundColor','green','BackgroundColor','black');