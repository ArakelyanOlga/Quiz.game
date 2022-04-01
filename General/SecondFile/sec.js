const questions = [{
        question: "1.Which is the capital of the United Kingdom?",
        answers: ["London", "Madrid", "Paris"],
        correct: 1,
    },


    {
        question: "2.Which is the longest river in the world?",
        answers: ["Amazon", "Sen", "Nile"],
        correct: 3,
    },


    {
        question: "3.Which is the biggest continent?",
        answers: ["Africa", "Eurasia", "Australia"],
        correct: 2,
    },

    {
        question: "4.Which is the largest ocean?",
        answers: ["The Atlantic", "The Indian", "The Pacific"],
        correct: 3,
    },

    {
        question: "5.Who did discover America?",
        answers: ["Marco Polo", "Christopher Columbus", "Fernan Magellan"],
        correct: 2,
    },


    {
        question: "6.What colors is the Italian flag made of?",
        answers: ["green,white,red", "white,blue,red", "red,yellow,black"],
        correct: 1,
    },

    {
        question: "7.Which is the highest mountain in the world?",
        answers: ["McKinley", "Kilimanjaro", "Everest"],
        correct: 3,
    },

    
    {
        question: "8.What does mean 'New York'?",
        answers: ["small watch", "big apple", "old town"],
        correct: 2,
    },

    {
        question: "9.Which is the biggest island in the world?",
        answers: ["Madagascar", "Greenland", "New Zeland"],
        correct: 2,
    },
    {
        question: "10.Which is the biggest country in the world?",
        answers: ["Russia", "Armenia", "America"],
        correct: 1,
    }



];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


let score = 0;
let questionIndex = 0;
let answerText = 0;

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer;


function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";


}


function showQuestion() {

    const headerTemplate = `<h2 class="title"> %title% </h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;


    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) {

        const questionTemplate = ` <li>
                <label>
                     <input value="%number%" type="radio" class="answer" name="answer">
                     <span>%answer%</span>
                 </label>
             </li>`

        let answerHTML = questionTemplate
            .replace('%answer%', answerText)
            .replace('%number%', answerNumber);

        listContainer.innerHTML += answerHTML

        answerNumber++;
    }

}

function checkAnswer() {

    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

    if (!checkedRadio) {
        submitBtn.blur()
        return
    }

    const userAnswer = parseInt(checkedRadio.value)

    if (userAnswer === questions[questionIndex]['correct']) {
        score++

    }

    if (questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
        return;

    } else {

        clearPage();
        showResults();
    }
}

function showResults() {

    const resultsTemplate = `

        <h2 class="title">%title%</h2>
        
        <h3 class="summary">%message%</h3>
        
        <h4 class="result">%result%</h4> `;


    let title, message;


    if (score === questions.length) {
        title = 'Congratulations!';
        message = 'You answerd right to all the questions!';
    } else if (score * 100 / questions.length >= 50) {
        title = 'Not bad result!';
        message = 'You answerd right half of the questions!';

    } else {
        title = 'Need to work better!';
        message = 'You did not answer even half of the questions.';

    }

    let result = `${score} of ${questions.length}`


    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result)

    headerContainer.innerHTML = finalMessage;


    submitBtn.blur();
    submitBtn.innerHTML = 'Start again';
    submitBtn.onclick = () => {
        history.go()
    };



}