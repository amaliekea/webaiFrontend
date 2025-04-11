console.log("jeg er i frontpage!!");
const urlQuestion = "http://localhost:8080/study-helper/{modal}";
const sendQuestionButton = document.getElementById("sendQuestion");
const responseElement = document.getElementById("response");

sendQuestionButton.addEventListener("click", () => {
    sendAndRecieve()
});

async function sendAndRecieve() {
    const questionInput = document.getElementById("questionInput").value.trim();
    const includeQuizInput = document.getElementById("includeQuizInput").value.trim();
    const levelInput = document.getElementById("levelInput").value.trim();

    const responseBox = document.getElementById("response");

    // Check if any fields are empty
    if (!questionInput || !includeQuizInput || !levelInput) {
        responseBox.innerHTML = "⚠️ Please fill out all fields before submitting.";
        responseBox.className = "response-message error";
        responseBox.style.display = "block";
        return;
    }

    const data = {
        topic: questionInput,
        includeQuiz: includeQuizInput,
        level: levelInput
    };

    try {
        const response = await fetch("http://localhost:8080/study-helper", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            responseBox.innerHTML = `❌ Error: ${error.message}<br>Status code: ${error.statusCode}`;
            responseBox.className = "response-message error";
            return;
        }

        const text = await response.text();
        responseBox.innerHTML = text;
        responseBox.className = "response-message success";
    } catch (err) {
        responseBox.innerHTML = "🚫 Could not connect to the server.";
        responseBox.className = "response-message error";
    }

    responseBox.style.display = "block";
}

function logout() {
    // Clear the username from localStorage
    localStorage.removeItem('username');

    // Clear the displayed username from the page
    document.getElementById('userInfo').innerText = '';

    // Optionally, redirect the user to the login page
    window.location.href = 'login.html';
}


// Function to toggle the visibility of the correct answer
function toggleAnswer(questionId) {
    const correctAnswerElement = document.getElementById(`correct-answer-${questionId}`);

    // If the correct answer is currently hidden, show it
    if (correctAnswerElement.style.display === "none") {
        correctAnswerElement.style.display = "block";
    } else {
        // Otherwise, hide it again
        correctAnswerElement.style.display = "none";
    }
}

// Example: Assuming the backend returns a list of quiz questions, use this to render the quiz:
async function renderQuiz(parsedData) {
    const quizContainer = document.getElementById("response");
    quizContainer.innerHTML = ''; // Clear previous content

    parsedData.questions.forEach((quiz, index) => {
        // Render question and answers
        const questionId = index; // Use index or any unique ID
        const questionHTML = `
            <div class="quiz-question" id="quiz-question-${questionId}">
                <p>${quiz.question}</p>
                <ul id="answers-${questionId}">
                    ${Object.entries(quiz.answers).map(([key, value]) => {
            return `<li class="answer">${key.toUpperCase()}: ${value}</li>`;
        }).join('')}
                </ul>
                <button onclick="toggleAnswer('${questionId}')">Show Correct Answer</button>
                <p id="correct-answer-${questionId}" style="display:none;">Correct Answer: ${Object.entries(quiz.correct_answers).find(([key, value]) => value === "true")[0].toUpperCase()}</p>
            </div>
        `;
        quizContainer.innerHTML += questionHTML;
    });
}
