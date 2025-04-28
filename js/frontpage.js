console.log("jeg er i frontpage!!");
const urlQuestion = "http://localhost:8080/study-helper"; //url der skal sendes data til
const sendQuestionButton = document.getElementById("sendQuestion");
const responseElement = document.getElementById("response");

sendQuestionButton.addEventListener("click", () => {
    sendAndRecieve()
});

async function sendAndRecieve() {
    const questionInput = document.getElementById("questionInput").value.trim(); //trimmer for at fjerne mellemrum i start og slutning
    const includeQuizInput = document.getElementById("includeQuizInput").value.trim(); //vi henter først værdien i funktionen og ikke i starten når DOM indlæses
    const levelInput = document.getElementById("levelInput").value.trim();

    const responseBox = document.getElementById("response");

    // hvis felter er tomme == error besked
    if (!questionInput || !includeQuizInput || !levelInput) {
        responseBox.innerHTML = "⚠️ Please fill out all fields before submitting.";
        responseBox.className = "response-message error";
        responseBox.style.display = "block";
        return;
    }

    const data = { //dataobjekt
        topic: questionInput,
        includeQuiz: includeQuizInput,
        level: levelInput
    };

    try {
        const response = await fetch("http://localhost:8080/study-helper", {
            method: "POST", //sender post
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data) //med json data
        });

        if (!response.ok) {
            const error = await response.json();
            responseBox.innerHTML = `❌ Error: ${error.message}<br>Status code: ${error.statusCode}`;
            responseBox.className = "response-message error";
            return;
        }

        //hvis kaldet var sucess sender vi svaret som tekst
        const text = await response.text(); //vi awaiter indtil vi har fået svar
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