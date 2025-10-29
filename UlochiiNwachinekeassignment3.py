#Assignment Number 1
#Multiplication table using the for loop
for a in range(1, 13):
    for b in range(1, 13):
        print(a * b, end='\t')
    print()

#Assignment Number 2
# Coding for password checker
password = 'TechRise'               #intitalizing user's password
max_attempts = 3                    #user's maximum number of trials
attempt = 0
while attempt < max_attempts: 
    input_password = input('Input your password here: ')   #input function for user's password input
    attempt += 1                                  #num of attempts increase by 1 after each attempt
    remaining_attempts = max_attempts - attempt
    if input_password == password:
        print('login successful')     #statement after a coorect password input
    
    elif remaining_attempts == 0:
        print('Try again later')
        break

    if attempt == max_attempts:
     print("Too many failed attempts. Try again later.")