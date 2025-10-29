counter = 0 
def increment_counter():
    global counter
    counter += 1
def get_counter():
    return counter
def reset_counter():
    global counter
    counter = 0

for i in range(5):
    increment_counter()
print(f"counter after 5 increments:", {get_counter()})
reset_counter()
print(f"counter after reset", {get_counter()})
