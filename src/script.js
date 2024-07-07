const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const startButton = document.getElementById('start');
const answerButton = document.getElementById('answer');
const nextButton = document.getElementById('next');
const restartButton = document.getElementById('restart');

const finishedQuestions = [];

// Import questions

const response = await fetch('./src/questionData.json');
const questions = await response.json();

startButton.addEventListener('click', () => {
    // Set buttons visibility
    questionEl.setAttribute('class', 'visible');
    startButton.setAttribute('class', 'hidden');
    nextButton.setAttribute('class', 'visible');
    restartButton.setAttribute('class', 'visible');

    const index = Math.floor(questions.length * Math.random());

    let thisQuestion = document.createElement('h3')
    thisQuestion.innerText = questions[index].question;
    questionEl.append(thisQuestion);
    }
)

restartButton.addEventListener('click', () => {
   location.reload();
})