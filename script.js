const questions = [
    {
        q: "Koje godine je osnovan NK Pag?",
        options: ["1920.", "1992.", "1993.", "1950."],
        correct: 2 // Indeks 2 je 1993.
    },
    {
        q: "Kako se zove domaći teren NK Paga?",
        options: ["Gradski stadion Pag", "Julovica", "Velebit", "Solana"],
        correct: 1
    },
    {
        q: "Koje su tradicionalne boje kluba?",
        options: ["Crno-bijela", "Crveno-bijela", "Plavo-bijela", "Zelena"],
        correct: 2
    }
];

let currentIdx = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progress = document.getElementById("progress");
const counter = document.getElementById("question-counter");
const quizBody = document.getElementById("quiz-body");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");

function loadQuestion() {
    const q = questions[currentIdx];
    questionText.innerText = q.q;
    optionsContainer.innerHTML = "";
    counter.innerText = `Pitanje ${currentIdx + 1} od ${questions.length}`;
    progress.style.width = `${((currentIdx) / questions.length) * 100}%`;

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(i, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const correct = questions[currentIdx].correct;
    const allBtns = document.querySelectorAll(".option-btn");
    
    allBtns.forEach(b => b.style.pointerEvents = "none"); // Zabrani klikanje ostalih

    if (selected === correct) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        allBtns[correct].classList.add("correct");
    }

    setTimeout(() => {
        currentIdx++;
        if (currentIdx < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1200);
}

function showResults() {
    quizBody.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    progress.style.width = "100%";
    finalScore.innerText = `Ostvarili ste ${score} od ${questions.length} bodova!`;
}

loadQuestion();
