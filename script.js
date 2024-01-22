const startButton = document.getElementById("startButton");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("saveButton");
const repeatButton = document.getElementById("repeatButton");
const previousInitialsDiv = document.getElementById("previousInitials");


let score = 0;
let currentQuestionIndex = 0;


const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "1. Hyper Text Markup Language", correct: true },
            { text: "2. Hyperlink and Text Markup Language", correct: false },
            { text: "3. High Tech Markup Language", correct: false }
        ]
    },
    {
        question: "What is the main purpose of CSS?",
        answers: [
            { text: "1. To create dynamic web pages", correct: false },
            { text: "2. To style HTML elements", correct: true },
            { text: "3. To define JavaScript functions", correct: false }
        ]
    },
    {
        question: "Which programming language is commonly used for web development?",
        answers: [
            { text: "1. Java", correct: false },
            { text: "2. Python", correct: false },
            { text: "3. JavaScript", correct: true }
        ]
    }
];


function startGame() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
}


function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.querySelector("#quizContainer h2");
    const answerButtons = document.querySelectorAll("#quizContainer button");

    questionElement.textContent = currentQuestion.question;

    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index].text;
        button.dataset.correct = currentQuestion.answers[index].correct;
        button.addEventListener("click", selectAnswer);
    });
}


function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        scoreElement.textContent = score;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}


function endGame() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";


    const previousInitials = localStorage.getItem("initials");
    const previousScore = localStorage.getItem("punctuation");

    if (previousInitials && previousScore) {
        previousInitialsDiv.innerHTML = `<p>Previous Initials: ${previousInitials}</p>`;
    }


    repeatButton.addEventListener("click", repeatQuiz);
}


function repeatQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    loadQuestion();
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
}


function saveScore() {
    const initials = initialsInput.value;
    localStorage.setItem("initials", initials);
    localStorage.setItem("punctuation", score);
    alert("Score saved successfully");
}


startButton.addEventListener("click", startGame);
saveButton.addEventListener("click", saveScore);