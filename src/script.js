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

// Confetti Package

const confetti = window.window.confetti;
var myCanvas = document.createElement('canvas');

// Import questions

const response = await fetch('./src/questionData.json');
// const response = await fetch('./src/test.json');
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
    counter.innerText = `Finished Questions: ${finishedQuestions.length} / ${questions.length}`;

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
    // Clear elements and redo counter for repeated questions
    questionEl.innerHTML = "";
    answerEl.innerHTML = "";
    answerHeader.setAttribute('class', 'hidden');
    answerButton.setAttribute('class', 'visible');
    counter.innerText = `Repeated Questions Left: ${repeatedQuestions.length}`;

    // Append repeated question to the page
    let thisQuestion = document.createElement('h3');
    thisQuestion.innerText = questions[repeatedQuestions[0]].question;
    questionEl.append(thisQuestion);
    repeatedQuestions.shift();
}

const confettiBurst = () => {
    // Confetti burst
    done.appendChild(myCanvas);

    var myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
    });

    myConfetti({
        particleCount: 100,
        spread: 300,
    });
}

const finishQuiz = () => {
    // Reset Quiz
    questionHeader.setAttribute('class', 'hidden');
    answerButton.setAttribute('class', 'hidden');
    nextButton.setAttribute('class', 'hidden');
    counterEl.setAttribute('class', 'hidden');
    redoButton.setAttribute('class', 'hidden');
    repeatedQuestions = [];
    finishedQuestions = [];
    currentIndex = 0;

    // Done message
    done.setAttribute('class', 'visible');

    confettiBurst();
}

done.addEventListener('click', confettiBurst);

const getNextQuestion = () => {
    questionEl.innerHTML = "";
    answerEl.innerHTML = "";
    answerHeader.setAttribute('class', 'hidden');
    answerButton.setAttribute('class', 'visible');
    counter.innerText = `Finished Questions: ${finishedQuestions.length} / ${questions.length}`;

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