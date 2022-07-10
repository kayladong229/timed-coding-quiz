//Starting variables
var introEl = document.getElementById('intro');
var startBtn = document.querySelector(".start-button");
var timerEl = document.getElementById("timer");
var quizEl = document.getElementById('quiz');
var questionEl = document.querySelector(".question");
var answerOne = document.querySelector(".answer-1");
var answerTwo = document.querySelector(".answer-2");
var answerThree = document.querySelector(".answer-3");
var answerFour = document.querySelector(".answer-4");
var resultsEl = document.getElementById("results");
var finalScoreEl = document.getElementById("finalscore");
var initials = document.getElementById("initials");
var submitBtn = document.getElementById("submit-button");
var restartBtn = document.getElementById("restart-button");
var clearBtn = document.getElementById("clear-button");
//Quiz is 30 seconds long
var timeLeft = 30;
//Array that stores coding questions
var questions = [
    {question: 'Which of the following is NOT an example of a primitive?',
    answerOne: 'a. Booleans',
    answerTwo: "b. Numbers",
    answerThree: "c. Objects",
    answerFour: "d. Undefined",
    correct: "c"
    },
    {question: 'Select the most appropriate comparison operator to make the following statement true: 5 ___ "5".',
    answerOne: "a. ===",
    answerTwo: "b. >=",
    answerThree: "c. <=",
    answerFour: "d. ==",
    correct: "a"
    },
    {question: 'Given the array foods = ["sushi", "ramen", "curry rice"], which item in this array does foods[1] correspond to?',
    answerOne: "a. sushi",
    answerTwo: "b. ramen",
    answerThree: "c. curry rice",
    answerFour: "d. none of the above",
    correct: "b"
    },
    {question: 'What is the method that is used to add an item to the end of an array?',
    answerOne: "a. .unshift()",
    answerTwo: "b. .push()",
    answerThree: "c. .pop()",
    answerFour: "d. .sort()",
    correct: "b"
    },
    {question: 'What is the proper notation used to extract the assigned value of a property in an object?',
    answerOne: 'a. object[.property]',
    answerTwo: 'b. object["property"]',
    answerThree: 'c. object.property',
    answerFour: "d. b & c",
    correct: "d"
    },
    // Duplicated previous question to end quiz
    {question: 'What is the proper notation used to extract the assigned value of a property in an object?',
    answerOne: 'a. object[.property]',
    answerTwo: 'b. object["property"]',
    answerThree: 'c. object.property',
    answerFour: "d. b & c",
    correct: "d"
    }
]
//Declare index number of first question and initial number of right answers
var questionNumber = 0;
var correctAnswers = 0;

// Hide final score form and quiz when page initially loads
function init() {
    introEl.style.display = "block";
    quizEl.style.display = "none";
    resultsEl.style.display = "none";
    timerEl.textContent = ""
}

init();

//Timer function
function countdown() {
    timerEl.textContent = "30 seconds left";
    var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
        timerEl.textContent = timeLeft + " seconds left";
        timeLeft--;
    } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + " second left";
        timeLeft--;
    }
    
    if (timeLeft === 0 || questions.length === questionNumber + 1) {
        showResults();
        clearInterval(timeInterval);
        timerEl.textContent = "Time is up! The quiz is over."
    }
  }, 1000);
}

function beginQuiz() {
    countdown();
    //Remove intro blurb and start button once start button is clicked
    introEl.style.display = "none";
    //Display quiz content
    quizEl.style.display = "block";
    displayQuestion();
}

startBtn.addEventListener("click", beginQuiz)

//Render content to webpage according to question index number
function displayQuestion() {
    var currentQuestion = questions[questionNumber];
    questionEl.innerHTML = currentQuestion.question;
    answerOne.innerHTML = currentQuestion.answerOne;
    answerTwo.innerHTML = currentQuestion.answerTwo;
    answerThree.innerHTML = currentQuestion.answerThree;
    answerFour.innerHTML = currentQuestion.answerFour;
};

//Check answers
function checkAnswer(answer) {
    if(questions[questionNumber].correct === answer) {
        answerOutput.textContent = "Correct!";
        correctAnswers++;
    } else {
        answerOutput.textContent = "Incorrect.";
        timeLeft -= 5;
    }
    //Displays results once final question is answered regardless of how much time there is left in the quiz
    if (questions.length === questionNumber + 1) {
        showResults();
        return;
    }
     //Move on to next question regardless of whether answer is right or wrong
    questionNumber++;
    displayQuestion();
}

function showResults () {
    //Removes quiz content
    quizEl.style.display = "none";
    //Displays final results below
    resultsEl.style.display = "block";

    if (timeLeft === 0 || questions.length - 1) {
    finalScoreEl.textContent = "Your final score is " + correctAnswers + " out of 5.";
    }
};

function saveLastScore() {
    //Creates object with properties of user initials and score
    var userScore = {
        initials: initials.value,
        score: correctAnswers,
    };
    //Stores object into local storage and converts object into string
    localStorage.setItem("userScore", JSON.stringify(userScore));
}

function renderLastScore() {
    //Convert last saved string back into an object
    var lastScore = JSON.parse(localStorage.getItem("userScore"));
    //Verifies that data is in object and exits out of function if not
    if (lastScore !== null) {
        document.getElementById("saved-user-initials").innerHTML = lastScore.initials;
        document.getElementById("saved-user-score").innerHTML = lastScore.score;
    } else {
        return;
    }
}

//Saves and displays user information and displays a message saying so
submitBtn.addEventListener("click", function(event) {
    //Prevent page from refreshing when submit button is clicked
    event.preventDefault();
    document.getElementById("message").textContent = "Your information has been saved.";
    saveLastScore();
    renderLastScore();
    return;
});

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    document.getElementById("saved-user-initials").innerHTML = "";
    document.getElementById("saved-user-score").innerHTML = "";
})

restartBtn.addEventListener("click", init)


