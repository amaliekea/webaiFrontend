console.log("jeg er i frontpage!!");

const urlQuestion = "http://localhost:8081/study-helper";
const sendQuestionButton = document.getElementById("sendQuestion");

sendQuestionButton.addEventListener("click", ()=> {sendQuestion()});

async function sendQuestion() {
    const questionInput = document.getElementById("questionInput").value; //hiver værdien ud ved .value
    console.log("knap kaldt")
    await fetch(urlQuestion, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(questionInput)
    })
}