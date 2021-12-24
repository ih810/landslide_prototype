import subprocess

def run(*args):

    return subprocess.check_call(['git'] + list(args))

def main():
    commit_message = input('Commit message: ')
    commit_branch = input('Branch: ') 

    run('add', '.')
    run('commit', '-m', commit_message)
    run('push', 'origin', commit_branch)

main()