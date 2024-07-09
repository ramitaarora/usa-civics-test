// Define HTML Elements

const questionEl = document.getElementById('question');
const questionHeader = document.getElementById('question-header');
const answerEl = document.getElementById('answers');
const answerHeader = document.getElementById('answer-header');
const startButton = document.getElementById('start');
const answerButton = document.getElementById('answer');
const nextButton = document.getElementById('next');
const restartButton = document.getElementById('restart');
const done = document.getElementById('done');
const counter = document.getElementById('counter');
const counterEl = document.getElementById('counter-div');
const redoButton = document.getElementById('redo');

// Variables used to determine questions and not repeat any questions

let finishedQuestions = [];
let currentIndex;
let repeatedQuestions = [];
let finishedRepeatedQuestions = [];

// Import questions

const response = await fetch('./src/questionData.json');
const questions = await response.json();

startButton.addEventListener('click', () => {
    // Set buttons visibility
    questionEl.setAttribute('class', 'visible');
    questionHeader.setAttribute('class', 'visible');
    startButton.setAttribute('class', 'hidden');
    nextButton.setAttribute('class', 'visible');
    answerButton.setAttribute('class', 'visible');
    restartButton.setAttribute('class', 'visible');
    counterEl.setAttribute('class', 'visible');
    redoButton.setAttribute('class', 'visible');
    counter.innerText = `${finishedQuestions.length} / ${questions.length}`;

    // Get random index for first question
    currentIndex = Math.floor(questions.length * Math.random());
    finishedQuestions.push(currentIndex);

    // Appending answer to questionEl
    let thisQuestion = document.createElement('h3')
    thisQuestion.innerText = questions[currentIndex].question;
    questionEl.append(thisQuestion);
})

answerButton.addEventListener('click', () => {
    // Answer element is visible and button is hidden
    answerEl.setAttribute('class', 'visible');
    answerButton.setAttribute('class', 'hidden');
    answerHeader.setAttribute('class', 'visible');

    // Get all answers and append to answerEl div
    let allAnswers = questions[currentIndex].answer;

    for (let i = 0; i < allAnswers.length; i++) {
        let eachAnswer = document.createElement('p');
        eachAnswer.innerText = allAnswers[i];
        answerEl.append(eachAnswer);
    }
})

const repeatQuestions = () => {
    questionEl.innerHTML = "";
    answerEl.innerHTML = "";
    answerHeader.setAttribute('class', 'hidden');
    answerButton.setAttribute('class', 'visible');
    counter.innerText = `${finishedRepeatedQuestions.length} / ${repeatedQuestions.length}`;

    // Check if repeated questions have been completed, if not, append to page
    let isFinished = true;

    if (repeatedQuestions.length != finishedRepeatedQuestions.length) {
        while (isFinished) {
            currentIndex = Math.floor(repeatedQuestions.length * Math.random());
            let findIndex = finishedRepeatedQuestions.includes(currentIndex);

            if (findIndex) {
                isFinished = true;
            } else {
                isFinished = false;

                // Appending answer to questionEl
                finishedRepeatedQuestions.push(currentIndex);
                let thisQuestion = document.createElement('h3')
                thisQuestion.innerText = questions[currentIndex].question;
                questionEl.append(thisQuestion);
            }
        }
    } else {
        finishQuiz();
    }
}

const finishQuiz = () => {
    // Finish Quiz
    questionHeader.setAttribute('class', 'hidden');
    answerButton.setAttribute('class', 'hidden');
    nextButton.setAttribute('class', 'hidden');
    counterEl.setAttribute('class', 'hidden');
    done.setAttribute('class', 'visible');
    repeatedQuestions = [];
    finishedQuestions = [];
}

const getNextQuestion = () => {
    questionEl.innerHTML = "";
    answerEl.innerHTML = "";
    answerHeader.setAttribute('class', 'hidden');
    answerButton.setAttribute('class', 'visible');
    counter.innerText = `${finishedQuestions.length} / ${questions.length}`;

    if (questions.length != finishedQuestions.length) {
        // Get random index for next question, first checking if the question has already been completed
        let isFinished = true;

        while (isFinished) {
            currentIndex = Math.floor(questions.length * Math.random());
            let findIndex = finishedQuestions.includes(currentIndex);

            if (findIndex) {
                isFinished = true;
            } else {
                isFinished = false;

                // Appending answer to questionEl
                finishedQuestions.push(currentIndex);
                let thisQuestion = document.createElement('h3')
                thisQuestion.innerText = questions[currentIndex].question;
                questionEl.append(thisQuestion);
            }
        }
    } else {
        // If there are repeated questions, repeat them
        if (repeatedQuestions.length) {
            redoButton.setAttribute('class', 'hidden');
            repeatQuestions();
        } else {
            finishQuiz();
        }
    }
}

nextButton.addEventListener('click', getNextQuestion)

redoButton.addEventListener('click', () => {
    repeatedQuestions.push(finishedQuestions[finishedQuestions.length - 1]);
    getNextQuestion();
})

restartButton.addEventListener('click', () => {
    location.reload();
})