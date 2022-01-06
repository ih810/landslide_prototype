echo Commit Message
read commitMessage
echo Branch [option/[main]]
read ${branchName-'main'}
echo Push? y/[n]
read pushing

git add .
git commit -m $commitMessage
if [[ -z ${pushing} ]]
then
    echo 'commited'
else
    git push origin ${branchName-'main'}
    git push lab ${branchName-'main'}
fi
