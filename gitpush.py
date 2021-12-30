import subprocess

def run(*args):

    return subprocess.check_call(['git'] + list(args))

def main():
    commit_message = input('Commit message: ')
    commit_branch = input('Branch: [main]/option') 
    push = input('Push?: y/[n]')

    run('add', '.')
    if commit_message == "":
        run('commit', '-m', 'main')
    else:
        run('commit', '-m', commit_message)
    if push == 'y':
        run('push', 'origin', commit_branch)
    else:
        return

main()