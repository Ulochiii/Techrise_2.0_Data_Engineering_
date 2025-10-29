'''2. write a code to print out a range of months in a year. The system should be able to prompt you for a 
particular year, start month and end month, after which it will print out the range of calendar for the 
period specified. Both the start month and end month should be able to takein either the number of the month name
'''

import calendar 

year = int(input("Enter the year:"))
start_month = input("Enter the month:")
end_month = input("Enter end month:")

# Convert month name to number if needed
months = ["january", "february", "march", "april", "may", "june",
          "july", "august", "september", "october", "november", "december"]

if start_month.isdigit():
    month1 = int(start_month)
else:
    month1 = months.index(start_month) + 1

if end_month.isdigit():
    month2 = int(end_month)
else:
    month2 = months.index(end_month)+1

for i in range(month1,month2+1):
    print (calendar.month(year,i))