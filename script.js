document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // REQUIREMENT 2: INTERACTIVE QUIZ DATA & LOGIC
    // ==========================================
    const quizData = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Mode Layout"],
            correct: 0
        },
        {
            question: "Which CSS property controls text size?",
            options: ["text-style", "font-style", "font-size"],
            correct: 2
        },
        {
            question: "Which symbol is used for comments in JavaScript?",
            options: ["", "//", "/*"],
            correct: 1
        }
    ];

    let currentQuizIndex = 0;
    let userScore = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");
    const quizResult = document.getElementById("quiz-result");

    function loadQuizQuestion() {
        // Reset state for new question layout
        optionsContainer.innerHTML = "";
        nextBtn.style.display = "none";
        
        if (currentQuizIndex < quizData.length) {
            let currentData = quizData[currentQuizIndex];
            questionText.innerText = currentData.question;

            // Generate option selection options elements
            currentData.options.forEach((option, idx) => {
                const btn = document.createElement("button");
                btn.className = "option-btn";
                btn.innerText = option;
                btn.addEventListener("click", () => handleOptionSelection(idx, btn));
                optionsContainer.appendChild(btn);
            });
        } else {
            // End of Quiz evaluations state reached
            questionText.innerText = "Quiz Completed!";
            optionsContainer.innerHTML = "";
            nextBtn.style.display = "none";
            quizResult.innerText = `Final Score: ${userScore} out of ${quizData.length}`;
        }
    }

    function handleOptionSelection(selectedIndex, clickedButton) {
        let correctIdx = quizData[currentQuizIndex].correct;
        
        // Disable choices after selection to secure values
        const allButtons = optionsContainer.querySelectorAll(".option-btn");
        allButtons.forEach(b => b.disabled = true);

        if (selectedIndex === correctIdx) {
            userScore++;
            clickedButton.style.backgroundColor = "#2ecc71";
            clickedButton.style.color = "white";
        } else {
            clickedButton.style.backgroundColor = "#e74c3c";
            clickedButton.style.color = "white";
            // Highlight right option choice path visually
            allButtons[correctIdx].style.backgroundColor = "#2ecc71";
            allButtons[correctIdx].style.color = "white";
        }
        nextBtn.style.display = "block";
    }

    nextBtn.addEventListener("click", () => {
        currentQuizIndex++;
        loadQuizQuestion();
    });

    // Start quiz instance instantly
    loadQuizQuestion();


    // ==========================================
    // REQUIREMENT 3: FETCH DATA FROM PUBLIC API
    // ==========================================
    const fetchBtn = document.getElementById("fetch-btn");
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    // Async block targeting a public technical quote generation stream
    async function fetchQuotesFromInternet() {
        quoteText.innerText = "Connecting to API stream...";
        quoteAuthor.innerText = "";
        
        try {
            const apiResponse = await fetch("https://dummyjson.com/quotes/random");
            
            if (!apiResponse.ok) {
                throw new Error("Network latency detected.");
            }
            
            const fetchedData = await JSON.parse(await apiResponse.text());
            
            // Dynamic render handling inside UI blocks
            quoteText.innerText = `"${fetchedData.quote}"`;
            quoteAuthor.innerText = `- ${fetchedData.author}`;
            
        } catch (error) {
            console.error(error);
            quoteText.innerText = "Failed to load live data stream. Click to re-try.";
            quoteAuthor.innerText = "";
        }
    }

    fetchBtn.addEventListener("click", fetchQuotesFromInternet);
});