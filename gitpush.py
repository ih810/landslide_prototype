import subprocess

def run(*args):

    return subprocess.check_call(['git'] + list(args))

def main():
    commit_message = input('Commit message: ')
    commit_branch = input('Branch: ') 
    push = input('Push?: ')

    run('add', '.')
    run('commit', '-m', commit_message)
    if push:
        run('push', 'origin', commit_branch)

main()