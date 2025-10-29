def is_prime(number):
    if number < 2:
        return False
    i = 2
    while i < number:
        if number % i == 0:
            return False
        i += 1
        return True
    
def find_prime(start,end):
    primes = []
    for number in range(start, end +1):
        if is_prime(number):
            primes.append(number)
    return primes

print(find_prime(1,20))