set /P commitMessage=Enter Commit Message:
echo %commitMessage%
set /P branchName=Enter Branch Name[option/[main]]:
IF NOT DEFINED branchName SET "branchName=main"
echo %branchName%
set /P pushing=Push?[y/[n]]:

call git add .
call git commit -m %commitMessage%
echo commit finished
IF %pushing%=="y" call git push origin %branchName% call git push lab origin %branchName%