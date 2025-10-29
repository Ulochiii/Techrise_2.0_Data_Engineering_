# y = 10
# x = 5
# z = y+x
# print(z)
# x = 15
# y = 3
# if y <= 2 :
#     print(x+y)
# else:
#     print(x*y)
# int1 = int(input('Please enter a number:15 '))
# if 20>= int1>=10 :
#     print('you have won a car')
# else:
#     print('try again')
# int1=int(input("Please Enter Number: "))
# if  20>=int1>=10:
#     print("You have won a car!")
# else:
#     print("try again!")
# do not run the code, just input the number in the in the terminal and hit the enter button
# int1=int(input("Please Enter Number: "))
# if  20>=int1>=10:
#     print("You have won a car")
# elif 40>=int1<=50:
#     print("you have won a van")
# else:
#     print("try again")
# x = range(5)
# for n in x:
#     print(n)
# list1 = ['banana', 'guava', 'grape', 'mango', 'berry']
# for fruits in list1:
#     # f formatting and /n for the next number
    # print(f'i like {fruits}\n')

# x = 5728725
# for item in x:
#     print(f'{item}\n')
# dict1 = {'name': 'chima', 'class': 'junior', 'scores':[60, 78, 90, 100]}
# for n in dict1.values():
#     print('values')

#     for key in dict1:
#         print(key)

#     for item in dict1.items():
#         print(item)


# for i in range(1, 14):
#     for j in range(1, 14):
#         print(i * j, end='\t')
#     print()
# row = 5
# for i in range(row):
#     for j in range(i):
#         print('*', end ='')
#     print()
# for i in range(5):
#     print(i)
# for i in range(5):
#     print('*', end= '')
# print()
# count = 0
# # while count <=5:
# #     print('God is good')
# #     count +=1
# # print()
# while count <=5:
#     print('God is good')
# print()

#THURSDAY CLASS
# list1 = ['Obi', 'Uche', 'Emeka']
# for my_item in list1:
#     print(my_item)
# fruits = ["apple", "banana", "cherry"]
# print("banana" in fruits)
# fruits = ["apple", "banana", "cherry"]
# print("pineapple" not in fruits)

# str1 = ('obi is a boy')
# print(str1[0])

# fruits = ['apple', 'banana', 'cherry']
# for x in fruits:
#     print(x)
#     if x == 'banana':
#         break

# fruits =['apple', 'banana', 'cherry']
# for x in fruits:
#     print(x)
#     if x == 'banana':
#         break 
# print(x)

# fruits = ['apple', 'banana', 'cherry']
# for x in fruits:
#     print(x)
#     if x == 'banana':
#         continue
#         print(x)

# FRIDAY CLASS
# ITERATIONS
#Break
#Continue

# list1 = [3, 9, 7, -8, -10, 45, 0, -4]
# for x in list1:
#  if x > 0:
#      print(x)
#  elif x == 0 :
#        print('E no dey for here')
#        continue
#  elif x < 0 :
#        print('We don jam bad error')
#        break
#  elif x < 0 :
#        print('We don jam bad error')
#        continue

# list1 = [3, 9, 7, -8, -10, 45, 0, -4, 75]
# list2 = []
# for x in list1:
#  if x > 0:
#      list2.append(x)
#  elif x == 0 :
#     #    print('E no dey for here')
#        continue
#  elif x < 0 :
#     #    print('We don jam bad error')
#        continue
# print(list2)

# def greet():
#     print('Hello')
# greet()

# a = 15
# b = 29
# def multi(n,m = 6): #This is fuction takes two numbers n and m
#     '''This is for multiplication'''
#     print(n*m)

# multi(5)

# name = 'Mike'
# print(name)
# def people_names(name):
#     print(f'This is a guys name:{name}')   
# people_names('Uche')        
# print(people_names)

# def fruits(fruit1, fruit2):
#  return(f'I like {fruit1}.But I love {fruit2}')

# fruits('Banana', 'Udara')
# x = fruits('Banana', 'Udara')
# print(f'The fruitI love is in {x}')

# def add(n,m):
#     return n + m

# y = add(6,2)
# print(y)

def discount(price, percentage):
    d = price * (percentage/100)
    selling_price = price - d
    return selling_price

print(discount(2000,47))

# def add(* numbers):
#     total = sum (numbers)
#     return total
# y = add(10, 20, 30)
# print(y)

# def user_profile(**details):
#     profile = {}
#     for key, value in details.items():
#         profile[key] = value
#     return profile
# user = user_profile(name = 'Obinna', age ='25', gender = 'male')
# print(user)