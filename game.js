const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What player wore #33 for the Avalanche",
    choice1: "Ray Bourque",
    choice2: "Joe Sakic",
    choice3: "Patrick Roy",
    choice4: "Milan Hejduk",
    answer: 3,
  },
  {
    question: "Who was the highest draft pick in Colorado Avalanche history?",
    choice1: "Alex Tangauy",
    choice2: "Matt Duchene",
    choice3: "Gabriel Landeskog",
    choice4: "Nathan MacKinnon",
    answer: 4,
  },
  {
    question:
      "How many former Avalanche players have been inducted into the Hockey Hall of Fame?",
    choice1: "5",
    choice2: "3",
    choice3: "7",
    choice4: "2",
    answer: 1,
  },
  {
    question: "What year did the Quebec Nordiques move to Colorado?",
    choice1: "2001",
    choice2: "1995",
    choice3: "1990",
    choice4: "1994",
    answer: 2,
  },
  {
    question:
      "What former Avalanche Player currently server as the teams General Manager?",
    choice1: "Patrick Roy",
    choice2: "Peter Forsberg",
    choice3: "Joe Sakic",
    choice4: "Chris Drury",
    answer: 3,
  },
  {
    question: "How many Presidents Trophies have the Colorado Avalanche won?",
    choice1: "3",
    choice2: "4",
    choice3: "1",
    choice4: "0",
    answer: 1,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    console.log(classToApply);

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();
