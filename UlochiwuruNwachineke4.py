# #ASSIGNMENT NUMBER 1
# Write a code to do the following: the code takes in two numbers A and B. 
# It then subtracts B from A if A is greater than B with the message"A-B='A-B' " where 'A-B' is 
# the difference of A and B. If B is greater than A., 
# it then subtracts A from B and gives the message"B-A='B-A'" 
# where 'B-A' the the difference between B and A. 
# When both conditions are  negative, the program should give the corresponding message.

a = int(input("Enter the first number (A): "))
b = int(input("Enter the second number (B): "))

# if a > b:
#      a - b
#      print(f"A - B = {a-b}")
# elif b > a:
#      b - a
#      print(f"B - A = {b-a}")
# else:
print("A & B are equal")

#ASSIGNMENT NUMBER 2
# Write a code to take in a string of any lenght.
# if there are spaces between words, they are removed.
# non alphabetical characters are also removed.
# if the index of a particular alphabet is even, the program converts
# it to a capital letter and if the index number is odd, it is
# converted to a small letter. the resulting string is then printed
# out. Note: Do not use any list when writing the code

# sentence = input('What things are you grateful for today')
# end_sentence = ""
# sentence_index = 0
# for ch in sentence:
#      if ch in sentence:
#           if ch.isalpha():
#                if sentence_index % 2 == 0 :
#                     end_sentence += ch.upper()
#           else:
#                end_sentence += ch.lower()
#           sentence_index += 1
# print(end_sentence)

     
#ASSIGNMENT NUMBER 3
# Okoro and sons company recently advertised vacancies.
# The number of applicants are much and have to be pruned
# down while the successfull applicants are to be fixed in
# the following departments: Engineering, Admin, Customer
# Care and Security based on certain criteria. The company has 
# a policy of not employing people that are not up to 18 years. 
# Any man not up to 25 years old is placed in 
# Customer care department. Any woman below 31 years is also
# placed in the Customer care department. Any man below
# 45 years old is posted to the Engineering department.
# The rest of the women are posted to the Admin department.
# The rest of the men are recruited as security men. 
# All successful applicants should not exceed 50 years of age. 
# write a code to place all the personnel in their various
# departments accordingly immediately they make their 
# application(if they are eligible)
    
# name = input("Enter applicant's name: ")
# gender = input("Enter applicant's gender (Male/Female): ").lower()
# age = int(input("Enter applicant's age: "))
# department = ['Customer Care', 'Engineering','Security', 'Adim']

# if age < 18:
#         print(f"Sorry {name}, you are not eligible (under 18).")
# elif age > 50:
#         print(f"Sorry {name}, you are above the eligible age (over 50).")
# else:
#         if gender == 'male':
#             if age < 25:
#                 department = "Customer Care"
#             elif age < 45:
#                 department = "Engineering"
#             else:
#                 department = "Security"
#         elif gender == 'female':
#             if age < 31:
#                 department = "Customer Care"
#             else:
#                 department = "Admin"
#         else:
#             print("Invalid gender entered. Please use male or female.")
        
#         print(f"Congratulations {name}! You have been posted to the {department} Department.")
    
  
