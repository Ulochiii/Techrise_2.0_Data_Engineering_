def validate_password(password):

    if len(password) < 8:
        return False
    if not any (char.isupper() for char in password):
        return False
    if not any (char.islower() for char in password):
        return False
    if not any (char.isdigit() for char in password):
        return False
    return True
    
print(validate_password('Hello123'))  #Expected: True
print(validate_password('hello'))     #Expected: False