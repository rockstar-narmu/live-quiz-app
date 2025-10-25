let userAnswers = []; // stores {question, selected, correct}

// 🌸 Quiz Questions
const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style System",
      "Creative Style Syntax",
      "Color Sheet Script",
    ],
    correct: 0,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language",
    ],
    correct: 1,
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: 1,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Sun Microsystems", "Oracle"],
    correct: 0,
  },
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "float", "String"],
    correct: 0,
  },
  {
    question: "Which symbol is used for comments in CSS?",
    options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
    correct: 2,
  },
  {
    question: "Which property is used to change text color in CSS?",
    options: ["text-color", "font-color", "color", "text-style"],
    correct: 2,
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<css>", "<script>", "<style>", "<design>"],
    correct: 2,
  },
  {
    question: "Which of the following is not a JavaScript framework?",
    options: ["React", "Angular", "Django", "Vue"],
    correct: 2,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer; // holds interval reference
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");
const timerEl = document.getElementById("timer");

// Set total questions
totalQuestionsEl.textContent = questions.length;

// Load the first question
loadQuestion();

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  timerEl.textContent = timeLeft;

  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  // Clear previous options
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectAnswer(index));
    optionsEl.appendChild(button);
  });

  // Update progress
  currentQuestionEl.textContent = currentQuestionIndex + 1;
  nextBtn.disabled = true;

  // Start timer
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  const buttons = document.querySelectorAll(".option");
  const currentQuestion = questions[currentQuestionIndex];

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQuestion.correct) {
      btn.classList.add("correct");
    }
  });

  // Record the answer as "No Answer" if time ran out
  userAnswers.push({
    question: currentQuestion.question,
    selected: "No Answer",
    correct: currentQuestion.options[currentQuestion.correct],
  });

  nextBtn.disabled = false;
}

function selectAnswer(selectedIndex) {
  clearInterval(timer); // stop timer when answered
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".option");

  buttons.forEach((btn) => (btn.disabled = true));

  // Track the user's answer
  userAnswers.push({
    question: currentQuestion.question,
    selected: currentQuestion.options[selectedIndex],
    correct: currentQuestion.options[currentQuestion.correct],
  });

  if (selectedIndex === currentQuestion.correct) {
    buttons[selectedIndex].classList.add("correct");
    score += 10;
    scoreEl.textContent = score;
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[currentQuestion.correct].classList.add("correct");
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    // Save answers and score only here, after quiz is finished
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("finalScore", score);
    window.location.href = "result.html";
  }
});
