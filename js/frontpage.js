console.log("jeg er i frontpage!!");
const urlQuestion = "http://localhost:8080/study-helper";
const sendQuestionButton = document.getElementById("sendQuestion");
const responseElement = document.getElementById("response");

sendQuestionButton.addEventListener("click", () => {
    sendAndRecieve()
});

async function sendAndRecieve() {
    const questionInput = document.getElementById("questionInput").value; //hiver værdien ud ved .value
    const includeQuizInput = document.getElementById("includeQuizInput").value; //vigtigt først at hive værdien ud når der er trykket på kanp
    const levelInput = document.getElementById("levelInput").value;
    console.log("knap kaldt")
    const data = {
        topic: questionInput,
        includeQuiz: includeQuizInput,
        level: levelInput
    }
    console.log(data)
    const response = await fetch(urlQuestion, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    let text = await response.text();


    responseElement.innerHTML = text;
    responseElement.style.display = "block";


}

function logout() {
    // Clear the username from localStorage
    localStorage.removeItem('username');

    // Clear the displayed username from the page
    document.getElementById('userInfo').innerText = '';

    // Optionally, redirect the user to the login page
    window.location.href = 'login.html';
}
