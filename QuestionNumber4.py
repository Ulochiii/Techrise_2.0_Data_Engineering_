numbers = [1,2,3,4,5,6,7,8,9,10]
lambda x : x % 2 == 0 
even_numbers = list(filter(lambda x:x % 2 == 0, numbers ))
lambda x : x**2
squared_numbers = list(map(lambda x : x**2, numbers))
lambda x : x>50
greater_than_numbers = list(filter(lambda x : x>50, squared_numbers))
print(f"Even_numbers:{even_numbers}")
print(f"Squared:{squared_numbers}")
print(f"Greater than:{greater_than_numbers}")

