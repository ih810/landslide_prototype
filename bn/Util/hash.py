import hashlib

def hash_password(password):
    encoded_password = password.encode('utf-8')
    hashed_password = hashlib.sha256(encoded_password).hexdigest()
    print(hashed_password)
    return hashed_password

hash_password('test')