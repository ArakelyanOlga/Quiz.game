const questions = [{
        question: "1.Who is the auther of the book 'Me Before You'?",
        answers: ["Jojo Moyes", "Sharlote Bronte", "Stephen King"],
        correct: 1,
    },
    {
        question: "2.Where was born William Shakespeare?",
        answers: ["Italy", "Germany", "England"],
        correct: 3,
    },
    {
        question: "3.Which book is not written by Alexandre Dumas?",
        answers: ["Ascanio", "Miseri", "The Count of Monte Cristo"],
        correct: 2,
    },
    {
        question: "4.What is the nationality of Siamanto?",
        answers: ["Armenian", "Italian", "Indian"],
        correct: 1,
    },
    {
        question: "5.Who discovers the criminal in the book 'Murder on the Orient Express'?",
        answers: ["Sherlock Holmes", "Scarlet", "Puaro"],
        correct: 3,
    },
    {
        question: "6.Who is the main charachter in the 'Jane Eyre'?",
        answers: ["Jhon Reed", "Jane Eyre", "Bessie Lee"],
        correct: 2,
    },
    {
        question: "7.Who wrote the 'Parvana'?",
        answers: ["Av.Isaakyan", "H.Tumanyan", "P.Duryan"],
        correct: 2,
    },
    {
        question: "8.Where did live William Saroyan?",
        answers: ["Fresno", "New York", "Washington"],
        correct: 1,
    },
    {
        question: "9.Who is the auther of 'David Bek'?",
        answers: ["Siamanto", "Muratsan", "Raffi"],
        correct: 3,
    },
    {
        question: "10.Where is situated Av.Isaakyan's museum?",
        answers: ["In Gyumri", "In Vanadzor", "In Sevan"],
        correct: 1,
    },
];

let score = 0;
let questionIndex = 0;
let answerText = 0;


const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";
}


function showQuestion() {
    const headerTemplate = ` <h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;


    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) {

        const questionTemplate = ` <li>
    <label>
         <input value="%number%" type="radio" class="answer" name="answer">
         <span>%answer%</span>
     </label>
 </li>`;

        let answerHTML = questionTemplate
            .replace('%answer%', answerText)
            .replace('%number%', answerNumber)
        listContainer.innerHTML += answerHTML

        answerNumber++


    }
}



function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    if (!checkedRadio) {
        submitBtn.blur()
        return
    }

    const userAnswer = parseInt(checkedRadio.value)

    if (userAnswer === questions[questionIndex]['correct']) {
        score++
    }


    if (questionIndex !== questions.length - 1) {
        questionIndex++
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