import statistics
numbers = [10, 20 ,30, 40, 50]
def mean(numbers):
    return(10+20+30+40+50) /5
print(mean(numbers))

def median(numbers):
     return statistics.median(numbers)
print(median(numbers))

x = max(numbers)
y = min(numbers)
z = (x - y)
def range(numbers):
     return z
print(range(numbers))

def calculate_sum(numbers):
    return sum(numbers)
print(calculate_sum(numbers))