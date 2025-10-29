import calendar


def print_month_calendar():

    # 1. Create a simple mapping for month names to numbers
    # We only include the full lowercase names to keep it simple
    month_map = {
        "january": 1, "february": 2, "march": 3, "april": 4,
        "may": 5, "june": 6, "july": 7, "august": 8,
        "september": 9, "october": 10, "november": 11, "december": 12
    }

    # 2. Prompt for year
    year_str = input("Enter the year (e.g., 2024): ")

    # 3. Prompt for month
    month_input = input("Enter the month (e.g., 'July' or '7'): ")


    # First, clean up the user's input
    cleaned_input = month_input.strip().lower()

    month_num = 0  # Initialize to 0 (an invalid month)

    # Check if the cleaned input is a digit (like "7")
    if cleaned_input.isdigit():
        month_num = int(cleaned_input)

    # Otherwise, check if it's in our map (like "july")
    elif cleaned_input in month_map:
        month_num = month_map[cleaned_input]


    # 4. Validate the result and print
    # We check if the number is between 1 and 12
    if 1 <= month_num <= 12:
        # month >= 1 or month <= 12
        # If the month is valid, convert the year to a number
        # Note: This line will crash if the user typed "abc" for the year
        year = int(year_str)

        # Print the calendar
        print("\nHere is the calendar:")
        print(calendar.month(year, month_num))
    else:
        # If month_num is still 0 or an invalid number (like "13")
        print(f"Error: '{month_input}' is not a valid month.")

# print_month_calendar_basic()


#Assignment 2: Print Range of Months

def print_month_range():

    month_map = {
        "january": 1, "february": 2, "march": 3, "april": 4,
        "may": 5, "june": 6, "july": 7, "august": 8,
        "september": 9, "october": 10, "november": 11, "december": 12
    }

    # 2. Get all inputs
    year_str = input("Enter the year (e.g., 2024): ")
    start_month_input = input("Enter the START month (e.g., 'March' or '3'): ")
    end_month_input = input("Enter the END month (e.g., 'August' or '8'): ")

    # 3. Convert start month
    start_month_cleaned = start_month_input.strip().lower()
    start_month_num = 0
    if start_month_cleaned.isdigit():
        start_month_num = int(start_month_cleaned)
    elif start_month_cleaned in month_map:
        start_month_num = month_map[start_month_cleaned]

    # 4. Convert end month
    end_month_cleaned = end_month_input.strip().lower()
    end_month_num = 0
    if end_month_cleaned.isdigit():
        end_month_num = int(end_month_cleaned)
    elif end_month_cleaned in month_map:
        end_month_num = month_map[end_month_cleaned]

    # 5. Validate and print
    if (1 <= start_month_num <= 12) and (1 <= end_month_num <= 12):
        if start_month_num > end_month_num:
            print("Error: The start month must come before the end month.")
        else:
            year = int(year_str)
            print(f"\nPrinting calendars for {year} from {start_month_input} to {end_month_input}:\n")

            # Loop from the start number to the end number
            for month_num in range(start_month_num, end_month_num + 1):
                print(calendar.month(year, month_num))
    else:
        print("Error: One or both of the months entered were invalid.")
    print("\n" + "=" * 30 + "\n")

print_month_range()

#Assignment 3: Lottery Deduplication

def unique_lottery_entries():

    # 1. Sample data
    all_tickets_nins = [
        "123456789", "987654321", "111111111", "123456789",
        "222222222", "987654321", "333333333"
    ]
    print(f"Original list of tickets: {all_tickets_nins}")

    # 2. The core logic: convert list to a set to remove duplicates
    unique_nins_set = set(all_tickets_nins)

    # 3. Convert back to a list (optional)
    valid_lottery_entries = list(unique_nins_set)

    print(f"Valid (unique) entries: {valid_lottery_entries}")
    print("\n" + "=" * 30 + "\n")


#Assignment 4a: First N Fibonacci Numbers

def demo_fibonacci_sequence():

    n_str = input("Enter the number 'n' of Fibonacci numbers to generate: ")
    n = int(n_str)  # Will crash if input is not a number

    if n <= 0:
        sequence = []
    elif n == 1:
        sequence = [0]
    else:
        sequence = [0, 1]  # Start the sequence
        # Loop until the list has n items
        while len(sequence) < n:
            next_number = sequence[-1] + sequence[-2]
            sequence.append(next_number)

    print(f"The first {n} Fibonacci numbers are:")
    print(sequence)
    print("\n" + "=" * 30 + "\n")


#Assignment 4b: Fibonacci Number Before 100 Mark
def fibonacci_before_mark():

    mark = 100
    a, b = 0, 1  # 'a' is the number before 'b'

    # Loop forever until we find the number
    while True:
        next_num = a + b

        # Check if the *next* number crosses the mark
        if next_num >= mark:
            # If it does, 'b' is the number we want
            print(f"The sequence is: ..., {a}, {b}, {next_num}, ...")
            print(f"The number before the {mark} mark is: {b}")
            break  # Exit the loop

        # If not, advance the sequence
        a, b = b, next_num

    print("\n" + "=" * 30 + "\n")


#Assignment 5: Factorial

def demo_factorial():

    n_str = input("Enter a non-negative number 'n' to find its factorial: ")
    n = int(n_str)  # Will crash if input is not a number

    if n < 0:
        print("Factorial is not defined for negative numbers.")
    elif n == 0:
        print("The factorial of 0 is: 1")
    else:
        result = 1
        # Loop from 1 up to (and including) n
        for i in range(1, n + 1):
            result = result * i

        print(f"The factorial of {n} is: {result}")

    print("\n" + "=" * 30 + "\n")