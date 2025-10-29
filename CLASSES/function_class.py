def greet(name):
    return 'Good morning ' + name


def get_age(Name):
    '''This function gets your age'''
    user_age = input('How old are you: ') #gets user_age
    return f'{Name}, you are {user_age} years old'


print(get_age(' Ulochi'))