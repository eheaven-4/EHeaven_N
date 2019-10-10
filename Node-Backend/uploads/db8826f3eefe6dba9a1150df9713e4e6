# Cumulative Variables
course_cnt = 0
credit_cnt = 0
score_total = 0
GPA = 0.0

def calculate(grade):
    if(grade=='A'):
        return 4
    
    elif(grade=='B'):
        return 3

    elif(grade=='C'):
        return 2

    elif(grade=='D'):
        return 1

    elif(grade=='F'):
        return 0
    else:
        return 5


# Number of courses to record
course_cnt = int(input("Enter number of courses: "))
# Start with course 1 of course_cnt
current_course = 1



# Loop for each course
while current_course <= course_cnt:
    # Course points from letter grade
    course_gp = 0
    # Course points adjusted for credits
    course_gp_weighted = 0

    # Get the current course's credit count and letter grade
    print("Course " + str(current_course))
    course_credits = int(input("Enter number of credits: "))
    #checking input value is valide or not
    if(course_credits<1):
        print("Invalide credit value")
        continue
    #checking input value is valide or not
    if(course_credits>3):
        print("Invalide credit value")
        continue
    letter_grade = input("Enter letter grade: ")
    #checking input value is valide or not
    if(calculate(letter_grade)==5):
        print("Invalide grade please enter valide one")
        continue
    
    # Add the credits to the total
    credit_cnt+=course_credits
    

    # Calculate the letter grade score 

    course_gp=calculate(letter_grade)

    # Course Grade Points = Credits * Letter Grade
    course_gp_weighted=course_credits*course_gp
    # Add this to the total score
    score_total+=course_gp_weighted
    # Increment the counter
    current_course+=1

# GPA = SUM(Grade Points) / SUM(Credits)
GPA=(score_total)/(credit_cnt)
print("Your GPA is ", GPA)
