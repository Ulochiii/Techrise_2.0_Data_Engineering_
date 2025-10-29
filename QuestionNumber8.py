def print_right_triangle(rows):
    for i in range(1, rows + 1):
        print("*" * i)
print_right_triangle(4)

def print_pyramid(rows):
    for i in range(1, rows + 1):
        spaces = " " * (rows - i)
        stars = "*" * (2 * i - 1)
        print(spaces + stars)
print_pyramid(3)


def print_number_pyramid(rows):
    for i in range(1, rows + 1):
        for j in range(1, i + 1):
            print(j, end="")
        print()  # move to next line
print_number_pyramid(3)

