function MainScreen()
%This is the .m file that should be run from the beginning. Everything else
%if called from this file or the subsidary ones that it calls.!!!This is the
%only one that needs to ever be run!!!
f = figure; 
%make the background black
set(gcf,'Color','k')
set(gcf,'Visible','off','Units','normalized', 'Position', [0.25, 0.15, 0.45, 0.75])
%create 12 circles
for i=1:12
rectangle('Position',[0 i*.008+.07 0.005 0.005],'Curvature',[1 1],'FaceColor',...
    [0 0.5*rand(1)+0.25 0])
end
%create 6 circles
for i=1:6
rectangle('Position',[0.033 i*.008+.093 0.005 0.005],'Curvature',[1 1],'FaceColor',...
    [0 0.5*rand(1)+0.5 0])
end
%create 6 circles
for i=1:6
rectangle('Position',[0.066 i*.008+.093 0.005 0.005],'Curvature',[1 1],'FaceColor',...
    [0 0.5*rand(1)+0.5 0])
end
%create 3 circles
for i=1:3
rectangle('Position',[0.1 i*.008+.104 0.005 0.005],'Curvature',[1 1],'FaceColor',...
    [0 0.5*rand(1)+0.5 0])
end
%create a slider
b = uicontrol('Style','slider','Units','normalized','Position',[.15,.13,.7,.05],...
              'Value',1, 'min',1, 'max',10,'BackgroundColor',[0 0.75 0] ,'Callback',...
              @sliderCallback);
global a0
a0=1;
%create initial text that updates through the sliderCallback function
a = uicontrol('Style','text','Units','normalized','Position',[.475,0.05,.1,.075],...
                'String','1','FontSize',25,'ForegroundColor','green','BackgroundColor',...
                'black');
%the 1 to the left on the screen
b = uicontrol('Style','text','Units','normalized','Position',[.08,.135,.05,.05],...
                'String','1','FontSize',20,'ForegroundColor','white','BackgroundColor',...
                'black');
%the 10 to the left on the screen
c = uicontrol('Style','text','Units','normalized','Position',[.85,.135,.1,.05],...
                'String','10','Units','normalized','FontSize',20,'ForegroundColor',...
                'white','BackgroundColor','black');
%the "pick # of digits" text
d = uicontrol('Style','text','Units','normalized','Position',[.25,.2,.5,.04],...
                'String','Pick # of Digits in Number','FontName','TimesNewRoman',...
                'FontSize',15,'ForegroundColor','white','BackgroundColor','black');
%title text
e = uicontrol('Style','text','Units','normalized','Position',[.15,.87,.7,.10],...
                'String','Handwritten Digit Recognition Neural Network','FontName',...
                'TimesNewRoman','FontSize',20,'ForegroundColor',[0 0.87 0],...
                'BackgroundColor','black');
%name text
f = uicontrol('Style','text','Units','normalized','Position',[.3,.75,.4,.1],...
                'String','by Jason Kaufmann','FontName','TimesNewRoman','FontSize',15,...
                'ForegroundColor','white','BackgroundColor','black');
%checbox to confirm choice (see checkboxCallback.m for what the checkbox
%does)
g = uicontrol('Style','checkbox','Units','normalized','Position',[.45,.0625,.05,.05],...
    'Callback',@checkboxCallback,'ForegroundColor','white','BackgroundColor','black');
%text that tells user to click checkbox to confirm number of digits
h = uicontrol('Style','text','Units','normalized','Position',[.25,0.015,.5,.04],...
                'String','Click Checkbox to Confirm','FontName','TimesNewRoman',...
                'FontSize',15,'ForegroundColor','white','BackgroundColor','black');
set(gcf,'Visible','on');
%create a lot of animated lines connecting all the circles to mimic the
%functioning of a neural network
for j=1:12
for i=1:6
xlim([0 0.11]);
x=linspace(0.0052,.0328,500);
y=linspace(.008*j+.072,.008*i+.0953,500);
hold on
h=plot(x,y,'ow', 'LineWidth',1,'MarkerSize',.02);
axis off  
%plot x and y data starting at the initial circle and ending at the final
%one
for k = 1:length(x)
    h.XData=x(1:k); h.YData=y(1:k);
 pause(.00001);
end
end
end
%same for the lines between the second and third layer
for j=1:6
for i=1:6
xlim([0 0.11]);
x=linspace(0.0382,0.0661,500);
y=linspace(j*.008+.095,.008*i+.0953,500);
hold on
h=plot(x,y,'ow', 'LineWidth',1,'MarkerSize',.02);
axis off  
for k = 1:length(x)
    h.XData=x(1:k); h.YData=y(1:k);
 pause(.00001);
end
end
end
%same for the lines between the third and fourth layer
for j=1:6
for i=1:3
xlim([0 0.11]);
x=linspace(0.071,0.1,500);
y=linspace(j*.008+.095,i*.008+.106,500);
hold on
h=plot(x,y,'ow', 'LineWidth',1,'MarkerSize',.02);
axis off  
for k = 1:length(x)
    h.XData=x(1:k); h.YData=y(1:k);
 pause(.00001);
end
end
end
end