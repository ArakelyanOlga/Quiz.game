const questions = [{
        question: "1.What is equal to '(44+5)/7*11' ",
        answers: ["44", "7", "77"],
        correct: 3,
    },
    {
        question: "2.Who among the following people is a mathematician?",
        answers: ["Pythagoras", "George Bush", "Vivaldi"],
        correct: 1,
    },

    {
        question: "3.How many 'Arabic numerals' are there?",
        answers: ["five", "nine", "ten"],
        correct: 3,
    },

    {
        question: "4.Where is from Isaac Newton?",
        answers: ["France", "England", "Italy"],
        correct: 2,
    },
    {
        question: "5.What is equal to '66+34-24/6*10'?",
        answers: ["60", "100", "44"],
        correct: 1,
    },
    {
        question: "6.If '1=3,2=3,3=5,4=4,5=4', then '6=?'",
        answers: ["6", "3", "5"],
        correct: 2,
    },
    {
        question: "7.Which 3 numbers have the same answer whether they're added or multiplied together?",
        answers: ["2,3 and 4", "10, 4 and 5", "1,2 and 3"],
        correct: 3,
    },
    {
        question: "8.What is equal to 'x' in '3x+2x=25'?",
        answers: ["x=5", "x=10", "x=3"],
        correct: 1,
    },
    {
        question: "9.Two angles of triangle measure 15 deg and 85 deg.What is the measure for the third angle?",
        answers: ["90 deg", "40 deg", "80 deg"],
        correct: 3,
    },
    {
        question: "10.Which of the following fractions is equal to 5/6?",
        answers: ["20/30", "15/24", "40/54"],
        correct: 2,
    },

];



const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


let score = 0;
let questionIndex = 0;
let answerText = 0;


clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;



function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";
}


function showQuestion() {
    const headerTemplate = `<h2 class="title">%title%</h2>`;
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
            .replace("%answer%", answerText)
            .replace('%number%', answerNumber)

        listContainer.innerHTML += answerHTML


        answerNumber++
    }

}


function checkAnswer(){
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    if(!checkedRadio){
        submitBtn.blur() 
        return
    }

    const userAnswer = parseInt(checkedRadio.value)

    if(userAnswer === questions[questionIndex]['correct']){
        score++
    }


    if(questionIndex!== questions.length - 1){
        questionIndex++
        clearPage();
        showQuestion();
        return;
    }
    else{
        clearPage();
        showResults();
    }
}


function showResults(){
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