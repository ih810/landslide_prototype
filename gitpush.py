import subprocess

def run(*args):

    return subprocess.check_call(['git'] + list(args))

def main():
    commit_message = input('Commit message: ')
    commit_branch = str(input('Branch: [main]/option ') or "main")
    push = input('Push?: y/[n] ')

    run('add', '.')
    run('commit', '-m', commit_message)
    if push == 'y':
        run('push', 'origin', commit_branch)
    else:
        return

main()