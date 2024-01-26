const startButton = document.getElementById("startButton");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("saveButton");
const repeatButton = document.getElementById("repeatButton");
const previousInitialsDiv = document.getElementById("previousInitials");
const timerElement = document.getElementById("timer");

let score = 0;
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

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
    timerElement.style.display = "block";
    loadQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            timerElement.textContent = `${timeLeft} seconds`;
            timeLeft--;
        }
    }, 1000);
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

    clearInterval(timerInterval);
    repeatButton.style.display = "block"; // Mostrar el botón "Repeat Quiz"
    repeatButton.addEventListener("click", repeatQuiz);
}

function repeatQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    timeLeft = 60;
    timerElement.style.display = "block";
    timerElement.textContent = `${timeLeft} seconds`;
    loadQuestion();
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
    startTimer(); // Iniciar el temporizador nuevamente
    repeatButton.style.display = "none"; // Ocultar el botón "Repeat Quiz" después de reiniciar
}

function saveScore() {
    const initials = initialsInput.value;
    localStorage.setItem("initials", initials);
    localStorage.setItem("punctuation", score);
    alert("Score saved successfully");

    const scoreTableBody = document.getElementById("scoreTableBody");
    const row = scoreTableBody.insertRow();
    const initialsCell = row.insertCell(0);
    const scoreCell = row.insertCell(1);
    initialsCell.textContent = initials;
    scoreCell.textContent = score;

    const scoreTable = document.getElementById("scoreTable");
    scoreTable.style.display = "block";
}

startButton.addEventListener("click", startGame);
saveButton.addEventListener("click", saveScore);

function startTimer() {
    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            timerElement.textContent = `${timeLeft} seconds`; // Cambia "segundos" por "seconds"
            timeLeft--;
        }
    }, 1000);
}
// ... Tu código anterior ...

function startTimer() {
    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            timerElement.textContent = `${timeLeft} seconds`;
            if (timeLeft <= 5) { // Agregar un mensaje cuando el tiempo es bajo
                timerElement.style.color = "red";
            }
            timeLeft--;
        }
    }, 1000);
}

function endGame() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    const previousInitials = localStorage.getItem("initials");
    const previousScore = localStorage.getItem("punctuation");

    if (previousInitials && previousScore) {
        previousInitialsDiv.innerHTML = `<p>Previous Initials: ${previousInitials}</p>`;
    }

    clearInterval(timerInterval);
    repeatButton.style.display = "block"; // Mostrar el botón "Repeat Quiz"
    repeatButton.addEventListener("click", repeatQuiz);

    if (timeLeft <= 0) {
        timerElement.textContent = "Time's up!"; // Mostrar un mensaje cuando se agote el tiempo
    }
    timerElement.style.color = "initial"; // Restaurar el color del temporizador
}

function repeatQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    timeLeft = 60;
    timerElement.style.display = "block";
    timerElement.textContent = `${timeLeft} seconds`;
    loadQuestion();
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
    startTimer(); // Iniciar el temporizador nuevamente
    repeatButton.style.display = "none"; // Ocultar el botón "Repeat Quiz" después de reiniciar
}

// ... Tu código anterior ...

startButton.addEventListener("click", startGame);
saveButton.addEventListener("click", saveScore);
