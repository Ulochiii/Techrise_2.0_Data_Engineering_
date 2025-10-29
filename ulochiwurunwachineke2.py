import time

# Initialize empty lists
list1 = ['3','4','93','493']
list2 = ['76','93','923','121']

# Function to populate a list
def populate_list(list_name):
    while True:
        item = input(f"Enter an item for {list_name}: ")
        list_name.append(item)
        done = input("Are you through? (yes/no): ").lower()
        if done == 'yes':
            break

# Populate list1
print("Populate the first list:")
populate_list(list1)

# Populate list2
print("\nPopulate the second list:")
populate_list(list2)

# Check if the lengths match
if len(list1) != len(list2):
    print("\nLength of lists don't match. Program terminated.")
else:
    print("\nLengths match. Proceeding", end="")
    for _ in range(3):
        print(".", end="", flush=True)
        time.sleep(1)

    # Create a dictionary
    result_dict = dict(zip(list1, list2))

    print("\n\nThe resulting dictionary is:")
    print(result_dict)
