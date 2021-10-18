const quizEl = document.querySelector("#quiz-wrapper");
const startEl = document.querySelector("#start");
const questionEl = document.querySelector("#question");
const optionListEl = document.querySelector("#option-list");
const questionResultEl = document.querySelector("#question-result");
const timerEl = document.querySelector("#timer");



let questionIndex = 0;
let correctCount = 0;

let time = 60;
let intervalId;

let questions = [
  {
    question: "document.querySelector('#wrapper'); will select an html element by its...?",
    choices: ["class", "id", "data-type", "wrapper"],
    answer: "id",
  },
  {
    question:
      "Where should we prevent a browser's default response?",
    choices: ["A submit button's event listener", "When the first function on a page is called", "When a button is querySelected", "Never"],
    answer: "A submit button's event listener",
  },
  {
    question:
      "What does the acronym 'API' represent?",
    choices: ["Auto-Programming Interface", "Application Processing Integer", "Automatic Program Inception", "Application Programming Interface"],
    answer: "Application Programming Interface",
  },
  {
    question:
      "What is the only data type that can be stores in local storage?",
    choices: ["string", "integer", "JSON", "XML"],
    answer: "string",
  },
  {
    question:
      "Write should you write to execute a block of code repeatedly?",
    choices: ["if statement", "while loop", "if loop", "for loop"],
    answer: "for loop",
  },
];

// QUIZ FUNCTIONS

// runs on page load (...)
const pageLoad = () => {
  // start container creation
  const startContainer = document.createElement("div");
  startContainer.classList = "container center-align"
  startContainer.innerHTML =
    "<h1>pop() Quiz!</h1> <p class='flow-text'>Ready to flex those javaScript muscles? Click the button below and get ready to think fast! A wrong answer will deduct from your time!</p>";
  startEl.appendChild(startContainer);

  // start button creation
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.setAttribute("class", "btn start-button red white-text");
  startButton.setAttribute("id", "startId");
  startContainer.appendChild(startButton);
};

// END QUIZ 

//displays score 
const endQuiz = () => {
  clearInterval(intervalId);
  timerEl.textContent = '';
  questionResultEl.innerHTML = "";
  optionListEl.innerHTML = "";
  questionEl.innerHTML = "The End! You scored "
    + correctCount
    + "<br/>";

  //form to enter name
  const scoreForm = document.createElement("form");
  scoreForm.setAttribute("id", "score-form-wrapper");
  scoreForm.innerHTML = 
  `<div class="valign-wrapper row">
    <p class="col s4">Enter your initials:</p>
    <input class="col s4" type="text" name="user-name" placeholder="MJP"/>
    <button class="btn blue waves col s3" id="save-user" type="submit">Submit</button>
  </div>`;
  questionEl.appendChild(scoreForm);
  // save user and score
  var saveButton = scoreForm.querySelector("#save-user");
  saveButton.addEventListener("click", (e) =>{
    e.preventDefault();

// write if to validate

    let userInput = scoreForm.querySelector("input[name='user-name']").value;
    if (!userInput) {
      alert("Please enter your initials, Donkey-Kong style (up to 3 characters).");
      return;
    } else if (userInput.length > 3) {
      alert("Please enter your initials, Donkey-Kong style (up to 3 characters).");
      return;
    } else {
    var highScores =
    JSON.parse(window.localStorage.getItem("highscores")) || [];
    const userDataObj = {
      name: userInput,
      score: correctCount
    }
    highScores.push(userDataObj);
    window.localStorage.setItem("highscores", JSON.stringify(highScores));
        // redirect to next page
        window.location.href = "scores.html";
  }
  })

  // button to restart quiz
  const restartButton = document.createElement("button");
  restartButton.setAttribute("class", "btn red");
  restartButton.setAttribute("id", "restart-button");
  restartButton.textContent = "Restart";
  questionEl.appendChild(restartButton);
  restartButton.addEventListener("click", (e) => {
    document.location.reload(true);
  });
};


function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

// creates the question and appends
const renderQuestion = () => {

  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);

  questionEl.textContent = questions[questionIndex].question;
  questionEl.classList = "center-align flow-text blue-text";
  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";
  questionResultEl.classList = "center-align";

  let choices = questions[questionIndex].choices;

  for (let i = 0; i < choices.length; i++) {
    let questionListItem = document.createElement("li");
    questionListItem.classList = "center-align white z-depth-4";
    questionListItem.textContent = choices[i];
    optionListEl.classList = "flow-text blue-text pulse";
    optionListEl.append(questionListItem);
  }
}

// increments the question index and renders next question
function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    let answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      questionResultEl.classList = "green center-align white-text flow-text";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      questionResultEl.classList = "red center-align white-text flow-text";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

pageLoad();

// after first click, renders first question
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", renderQuestion);
// hides the start div after first click
startButton.addEventListener("click", (e) => {
  document.getElementById("start").style.display = 'none';
});

// Checks for when a list option is selected 
optionListEl.addEventListener("click", checkAnswer);