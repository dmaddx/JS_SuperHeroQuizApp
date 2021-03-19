const questions = [
    {
        question: "What is Iron Man's civilian name?",
        answers: [
            {posAns: "Bruce Banner", result: false},
            {posAns: "Peter Parker", result: false},
            {posAns: "T'Chaka Udaku", result: false},
            {posAns: "Tony Stark", result: true}
        ]
    },
    {
        question: "What is Steve Rogers' super hero name?",
        answers: [
            {posAns: "The Hulk", result: false},
            {posAns: "Captain America", result: true},
            {posAns: "Spiderman", result: false},
            {posAns: "Cap'N Crunch", result: false},
        ]
    },
    {
        question: "Which universe is Hellboy from?",
        answers: [
            {posAns: "Dark Horse", result: true},
            {posAns: "Image Comics", result: false},
            {posAns: "DC", result: false},
            {posAns: "Marvel", result: false},
        ]
    },
    {
        question: "What is Ant Man's super power?",
        answers: [
            {posAns: "Can create ants with magic", result: false},
            {posAns: "Turns people into ants", result: false},
            {posAns: "Shrinks down to ant size", result: true},
            {posAns: "Can lift 10 times his weight", result: false},
        ]
    },
    {
        question: "Doctor Octopus (Doc Ock) is mainly a villian to which super hero?",
        answers: [
            {posAns: "Iron Man", result: false},
            {posAns: "Spiderman", result: true},
            {posAns: "Aquaman", result: false},
            {posAns: "Doctor Strange", result: false},
        ]
    },
    {
        question: "What is Black Panther's suit and Captain America's sheild made of?",
        answers: [
            {posAns: "Chromium", result: false},
            {posAns: "Adamantium", result: false},
            {posAns: "Titanium", result: false},
            {posAns: "Vibranium", result: true},
        ]
    },
];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const quizScoreElement = document.getElementById('score');

let shuffledQuestions;
let currentQuestionIndex;
let score = 0;
let clickedOnce = 0;

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startQuiz(){
    quizScoreElement.innerHTML = "Score: " + score + '/' + questions.length;
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    startButton.style.display = "none";
    questionContainerElement.style.display = "block";
    nextButton.style.display = "block";
    setNextQuestion()
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(questionFromArray){
    questionElement.innerHTML = (currentQuestionIndex + 1) + ") " + questionFromArray.question;
    questionFromArray.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.posAns;
        button.classList.add('btn');
        if (answer.result){
            button.dataset.result = answer.result;
        }
        button.onclick = selectAnswer;
        answerButtonElement.appendChild(button);
    });
}

function resetState(){
    nextButton.style.visibility = "hidden";
    while (answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(selectedEvent) {
    const selectedButton = selectedEvent.target;
    const correct = selectedButton.dataset.result;
    Array.from(answerButtonElement.children).forEach(button => {
        setStatus(button, button.dataset.result);
    });
    if (correct){
        score++;
        quizScoreElement.innerHTML = "Score: " + score + '/' + questions.length;
        selectedButton.innerHTML = "&#10003; ".bold() + selectedButton.innerText;
    } else {
        selectedButton.innerHTML = "X ".fontcolor('black').bold() + selectedButton.innerText;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.style.visibility = "visible";
    } else {
        nextButton.style.display = "none";
        startButton.style.display = "block";
        startButton.innerText = "Restart";
        score = 0;
    }
}

function setStatus(buttonElement, result){
    clearStatus(buttonElement);
    if(result){
        buttonElement.classList.add('correct');
    } else {
        buttonElement.classList.add('wrong');
    }
    buttonElement.onclick = null;
    nextButton.style.visibility = "visible";
}

function clearStatus(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function init() {
    'use strict';
    questionContainerElement.style.display = "none";
    nextButton.style.display = "none";
    startButton.onclick = startQuiz;
} 
window.onload = init;

