@echo off
set /P commitMessage=Enter Commit Message:
set /P branchName=Enter Branch Name[option/[main]]:
IF NOT DEFINED branchName SET "branchName=main"
set /P pushing=Push?[y/[n]]:

call git add .
call git commit -m '%commitMessage%'
IF %pushing%==y (echo 'push') ELSE :end
call git push origin %branchName% 
call git push lab %branchName%
SET commitMessage=''
SET branchName=''
SET pushing=''