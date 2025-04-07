console.log("jeg er i frontpage!!");
const urlQuestion = "http://localhost:8080/study-helper";
const sendQuestionButton = document.getElementById("sendQuestion");
const responseElement = document.getElementById("response");

sendQuestionButton.addEventListener("click", () => {
    sendAndRecieve()
});

async function sendAndRecieve() {
    const questionInput = document.getElementById("questionInput").value; //hiver værdien ud ved .value
    const includeQuizInput = document.getElementById("includeQuizInput").value;
    const levelInput = document.getElementById("levelInput").value;
    console.log("knap kaldt")
    const data = {"topic": questionInput, includeQuizInput, levelInput}
    console.log(data)
  const response =  await fetch(urlQuestion, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    //show response
    const text = await response.text(); //fordi backend retunerer string
    responseElement.textContent = text;
    responseElement.style.display = "block";
    console.log("Svar fra backend:", text);
}