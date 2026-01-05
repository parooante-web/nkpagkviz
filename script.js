const questions = [
    { q: "Koje godine je osnovan NK Pag?", options: ["1950.", "1992.", "1993.", "2001."], correct: 1 },
    { q: "Kako se zove stadion na kojem igra NK Pag?", options: ["Stanovi", "Velebit", "Julovica", "Solana"], correct: 2 },
    { q: "U kojem rangu natjecanja trenutno igra seniorska momčad?", options: ["3. HNL", "1. Županijska liga", "2. Županijska liga Zadarska", "Međuopćinska liga"], correct: 2 },
    { q: "Kako se zove navijačka skupina koja podržava klub?", options: ["Tornado Pag", "Papataži Pag", "Boduli", "Paška bura"], correct: 1 },
    { q: "Na kojem otoku se nalazi sjedište kluba?", options: ["Ugljan", "Vir", "Rab", "Pag"], correct: 3 },
    { q: "Koju podlogu ima glavni teren stadiona Julovica?", options: ["Umjetna trava", "Prirodna trava", "Beton", "Zemlja"], correct: 1 },
    { q: "Ima li stadion reflektore za službene noćne utakmice?", options: ["Da", "Samo na pomoćnom", "Trenutno nema", "U izgradnji su"], correct: 2 }
];

let currentIdx = 0;
let score = 0;
let playerName = "";

function startQuiz() {
    playerName = document.getElementById("player-name").value.trim();
    if (playerName === "") {
        alert("Molimo unesite ime i prezime!");
        return;
    }
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-content").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentIdx];
    document.getElementById("question-text").innerText = q.q;
    const container = document.getElementById("options-container");
    container.innerHTML = "";
    
    document.getElementById("progress").style.width = `${(currentIdx / questions.length) * 100}%`;

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(i, btn);
        container.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const correct = questions[currentIdx].correct;
    const allBtns = document.querySelectorAll(".option-btn");
    allBtns.forEach(b => b.style.pointerEvents = "none");

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
    document.getElementById("quiz-content").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    
    document.getElementById("final-score-text").innerText = `${playerName}, tvoj rezultat: ${score}/${questions.length}`;
    
    saveScore(playerName, score);
    displayLeaderboard();
}

function saveScore(name, score) {
    let history = JSON.parse(localStorage.getItem("nkPagScores")) || [];
    history.push({ name, score, date: new Date().toLocaleDateString() });
    // Sortiraj da najbolji budu prvi
    history.sort((a, b) => b.score - a.score);
    // Čuvaj samo top 5
    history = history.slice(0, 5);
    localStorage.setItem("nkPagScores", JSON.stringify(history));
}

function displayLeaderboard() {
    const list = document.getElementById("leaderboard-list");
    const history = JSON.parse(localStorage.getItem("nkPagScores")) || [];
    list.innerHTML = history.map((entry, index) => `
        <li>
            <span><span class="rank">${index + 1}.</span> ${entry.name}</span>
            <strong>${entry.score}</strong>
        </li>
    `).join('');
}
