#ASSIGNMENT NUMBER 1
# write a code that will print out all the days of a particular month. The system should be able to 
# prompt you for the year and month. 
# The value of the month should either be a number or the month name

# import calendar
# months = ["January", "Febuary", "March","April", "May","June", "July", 
#                 "August", "September", "October", "November", "December"]
# year = int(input("Enter year: "))
# month_input = input("Enter month (number or name): ").strip().capitalize()

# # convert month name to number if needed

# if month_input.isdigit():
#     month = int(month_input)
# else:
#     month = months.index(month_input) + 1

# #print all days of the month
# print(calendar.month(year,month))


# ASSIGNMENT NUMBER 2
# write a code to prin out a range of months in a year. The system should be able to prompt you 
# for a particular year, start month and end month, after which it will print out the range of 
# calendar for the period specified. 
# Both the start month and end month should be able to takein either the number of the month name

# start_month = input("Enter the start month:").strip().capitalize()
# end_month = input("Enter the end month: ").strip().capitalize()
# months = ["January", "Febuary", "March","April", "May","June", "July", 
#                 "August", "September", "October", "November", "December"]    

# # Convert month name to number if needed
# if start_month.isdigit():
#     month1 = int(start_month)
# else:
#     month1 = months.index(start_month) + 1

# if end_month.isdigit():
#     month2 = int(end_month)
# else:
#     month2 = months.index(end_month)+1

# for i in range(month1,month2+1):
#     print (calendar.month(year,i))

#ASSIGNMENT NUMBER 3
# okoro and sons company is organizing a lottery for the general public, each person is required to
#  buy a ticket and fill in his or her NIN. The later found out that so many people bought and 
# filled more thanone ticket. This is because they found out that there where many NINs of 
# the same value and this is against the companies policy: Write a code which ensures
#  that nobody wins this lottery more than ones.
# nin_set = ['24636', '08830', '32432', '35533', '23443', '24636']
# special_nin = []

# for item in nin_set:
#     if item not in special_nin:
#           special_nin.append(item)
# else:
#     print(f"{item} is duplicated")
# print(f"lottery participant NINs: {nin_set}")

#ASSIGNMENT NUMBER 4A



# ASSIGNMENT NUMBER 5
#  write a code that will give the factorial of the number n
# import math
# def fact1(n):
#     return (math.factorial(n))
# number = 5
# print(fact1(number))

