# Assignment Nmber 1
# Palindrome using slicing method
# Sample List
def check_palindromes(word_list):
    for item in word_list:
        text = str(item)  
        # convert to string
        if text == text[::-1]:  
            # slicing to reverse
            print(f"{text} is Palindrome")
        else:
            print(f"{text} is not a palindrome")
words = ["cabbage", "mirror", "civic", "school", "congo", "python"]
check_palindromes(words)
# Assignment Number 2
# List of words
My_list = ['mummy', 'hannah', 'murder for a jar of red rum', 'mom', 'seagull', 'tomato', 'no lemon, no melon', 'some men interpret nine memos', 'madam']
for word in My_list:
    if word == word[::-1]:
        print(f"{word} is palindrome")
    else:
        print(f"{word} is not a palindrome")

    import time  # for delays between dots

# Initialize empty lists
list1 = []
list2 = []

# --- Collect inputs for first list ---
print("Enter items for the FIRST list.")
while True:
    item = input("Enter an item for list1: ")
    list1.append(item)
    done = input("Are you through? (yes/no): ").strip().lower()
    if done == 'yes':
        break

# --- Collect inputs for second list ---
print("\nEnter items for the SECOND list.")
while True:
    item = input("Enter an item for list2: ")
    list2.append(item)
    done = input("Are you through? (yes/no): ").strip().lower()
    if done == 'yes':
        break

# --- Check if both lists have the same length ---
if len(list1) != len(list2):
    print("\nLength of lists don't match. Program terminating.")
else:
    print("\nLengths match. Proceeding", end="")
    for _ in range(3):        # show three dots, one per second
        time.sleep(1)
        print(".", end="", flush=True)

    # --- Create dictionary ---
    my_dict = dict(zip(list1, list2))

    print("\n\nDictionary created successfully!")
    print(my_dict)
