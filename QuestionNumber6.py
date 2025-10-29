def print_multiplication_table(number, upto=10):
    for i in range(1, upto + 1):
        print(f"{number} × {i} = {number * i}")

print("Multiplication Table of 7:")
print_multiplication_table(7)

# Testing the function
print("\nMultiplication Table of 3 (up to 5):")
print_multiplication_table(3, 5)

