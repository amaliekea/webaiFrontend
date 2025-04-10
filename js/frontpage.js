console.log("jeg er i frontpage!!");
const urlQuestion = "http://localhost:8081/study-helper";
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

    if (!questionInput || !includeQuizInput || !levelInput) {
        responseBox.innerHTML = "⚠️ Udfyld venligst alle felter før du sender.";
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
        const response = await fetch("http://localhost:8081/study-helper", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            responseBox.innerHTML = `❌ Fejl: ${error.message}<br>Statuskode: ${error.statusCode}`;
            responseBox.className = "response-message error";
            return;
        }

        const text = await response.text();
        responseBox.innerHTML = text;
        responseBox.className = "response-message success";
    } catch (err) {
        responseBox.innerHTML = "🚫 Kunne ikke få forbindelse til serveren.";
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