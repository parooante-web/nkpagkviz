const quizData = [
    {
        question: "Koje godine je osnovan NK Pag?",
        a: "1920.",
        b: "1992.",
        c: "1993.",
        correct: "c"
    },
    {
        question: "Kako se zove stadion na kojem igra NK Pag?",
        a: "Julovica",
        b: "Poljud",
        c: "Stanovi",
        correct: "a"
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = [];
    quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for(letter in currentQuestion) {
            if(letter !== 'question' && letter !== 'correct') {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion[letter]}
                    </label><br>`
                );
            }
        }
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if(userAnswer === currentQuestion.correct) {
            numCorrect++;
        }
    });
    resultsContainer.innerHTML = `Pogodili ste ${numCorrect} od ${quizData.length}!`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
