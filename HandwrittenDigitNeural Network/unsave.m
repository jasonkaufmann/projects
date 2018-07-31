function unsave(h,event)
delete Number.mat
%display the file has been deleted
disp('Number.mat Deleted');
clf
%run the end script which allows for cycling back between save and unsave
run('End.m')
end