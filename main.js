const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

const headerContainer = document.getElementById("header");
const listContainer = document.getElementById("list");
const submitBtn = document.getElementById("submit");

let score = 0;
let questionIndex = 0;

function clearContainer() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}


function showQuestionAndAnswers() {
  const { question, answers } = questions[questionIndex];

  headerContainer.insertAdjacentHTML("beforeend", `<h2 class="title">${question}</h2>`)

  answers.forEach(answer => listContainer.insertAdjacentHTML("beforeend", `
      <li>
        <label>
          <input value="${answers.indexOf(answer) + 1}"class="answer" name="answer" type="radio">
          <span>${answer}</span>
        </label>
      </li>
    `));
  submitBtn.innerHTML = "NEXT"
  submitBtn.removeEventListener("click", restartQuiz);
  submitBtn.addEventListener("click", checkAnswer);

}

function checkAnswer() {
  const { correct } = questions[questionIndex];
  const selectedAnswer = listContainer.querySelector("input[type='radio']:checked");
  if (!selectedAnswer) return;
  if (selectedAnswer.value == correct) score++;
  questionIndex++;
  if (questionIndex == questions.length) return showResults();
  clearContainer();
  showQuestionAndAnswers();
}

function showResults() {
  const maxScore = questions.length;
  clearContainer();
  headerContainer.insertAdjacentHTML("beforeend", `<h2 class="title">Congratulations</h2>`);

  listContainer.insertAdjacentHTML("beforeend", `
      <li>
        <label>
          <p>ur score is ${score} / ${maxScore}</p>
        </label>
      </li>
    `);



  submitBtn.innerHTML = "RESTART";
  submitBtn.removeEventListener("click", checkAnswer);
  submitBtn.addEventListener("click", restartQuiz)
}

function restartQuiz() {
  score = 0;
  questionIndex = 0;
  clearContainer();
  showQuestionAndAnswers();
}

submitBtn.addEventListener("click", checkAnswer)

clearContainer();
showQuestionAndAnswers();
