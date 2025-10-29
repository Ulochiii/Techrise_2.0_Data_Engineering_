#RETIREMENT AGE CALCULATOR
# workers_age = input('Enter workers age:').strip()
# if workers_age.isdigit():
#   age = int(workers_age)    
#   retirement_age = age + 35
#   print(retirement_age)
# else:
#   print('please input figure')

  #Catching multiple errors one after the other

# try:
#   value = int(input('Enter a number: '))
#   result = 100 / value
#   print(result)

  # except ValueError:
#      print('You must enter a valid number.')
# except ZeroDivisionError:
#   print('You cannot divide by zero.')
# except ValueError:
#    print('Input a digit')
# finally:
#   print('😒')

'''RAISE METHOD'''
# try:
#     Worker_age = input('Enter worker age: ').strip()
#     if not Worker_age.isdigit():
#         raise ValueError('Enter age in figure')
#     age = int(Worker_age)
#     if not 18 <= age <= 25:
#       raise ValueError("Workers age must be between 18 and 25")
# except ValueError as e:
#    print("Enter correct information: {e}")
# else:
#    retirement_age = age + 35
#    print(f'you will retire at age {retirement_age} years old.')
# finally:
#    print('Huarry')

# WEDNESDAY CLASS 29/10/2025
# Using finally block

# try:
#  user_data = ('data.txt', 'r')
#  content = user_data.read()
# except FileNotFoundError:
#    print('File does not exist.')
# finally:
#    print('File closed')

#This ia an even number collection 
class ZeroError(Exception): 
    '''This is the error raised if the number is Zero'''
    pass
even_numbers = [ ]
while True:
  try:
      input1 = input('Enter a number: ').strip()
      if not input1.isdigit():
           raise ValueError ('Input a digit')
      number = int(input1)
      if number == 0 :
           raise ZeroError ('Enter number greater than 2')
      elif number % 2 !=0:
          raise ValueError('NOT AN EVEN NUMBER')
  except ZeroError as d:
      print(f'Zero Error {d}')
  except ValueError as e:
        print(f"Enter valid information: {e}" )
        break
  else:
    even_numbers.append(number)
    print(f"{even_numbers} EVEN NUMBER")

# finally:
#    print('YEAHHHH')
