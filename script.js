const questions = [
    {
        q: "Koje godine je osnovan NK Pag?",
        options: ["1950.", "1992.", "1993.", "2001."],
        correct: 1 // 1992.
    },
    {
        q: "Kako se zove stadion na kojem igra NK Pag?",
        options: ["Stanovi", "Velebit", "Julovica", "Solana"],
        correct: 2 // Julovica
    },
    {
        q: "U kojem rangu natjecanja trenutno igra seniorska momčad?",
        options: ["3. HNL", "1. Županijska liga", "2. Županijska liga Zadarska", "Međuopćinska liga"],
        correct: 2 // 2. Županijska liga Zadarska
    },
    {
        q: "Kako se zove navijačka skupina koja podržava klub?",
        options: ["Tornado Pag", "Papataži Pag", "Boduli", "Paška bura"],
        correct: 1 // Papataži Pag
    },
    {
        q: "Na kojem otoku se nalazi sjedište kluba?",
        options: ["Ugljan", "Vir", "Rab", "Pag"],
        correct: 3 // Pag
    },
    {
        q: "Koju podlogu ima glavni teren stadiona Julovica?",
        options: ["Umjetna trava", "Prirodna trava", "Beton", "Zemlja"],
        correct: 1 // Prirodna trava
    },
    {
        q: "Ima li stadion reflektore za službene noćne utakmice?",
        options: ["Da, vrhunske", "Samo na pomoćnom terenu", "Trenutno nema", "U izgradnji su"],
        correct: 2 // Trenutno nema
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
    
    // Progres bar se puni kako igrač odgovara
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
    
    // Onemogući ponovno klikanje
    allBtns.forEach(b => b.style.pointerEvents = "none");

    if (selected === correct) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        allBtns[correct].classList.add("correct");
    }

    // Kratka pauza prije idućeg pitanja da igrač vidi odgovor
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
    
    let poruka = "";
    if (score === questions.length) poruka = "Pravi si Papataž! Svaka čast!";
    else if (score > questions.length / 2) poruka = "Dobar si, ali može i bolje!";
    else poruka = "Moraš češće na Julovicu!";

    finalScore.innerHTML = `<strong>Ostvarili ste ${score} od ${questions.length} bodova!</strong><br>${poruka}`;
}

loadQuestion();
