let question = 0;
let score = 0;

//create a function
//Take a question from the datastore and put it on a page, using jQuery



//printing question to page
//q represents current question
function printQuestion (q) {
    let questionHeader = $('.container-question > h2');
    questionHeader.text(q.question);

    let answerOptions = $('.option');
    
    for (let i = 0; i < answerOptions.length; i++) {
        
       $(answerOptions[i]).find('span').text(q.options[i]);
       $(answerOptions[i]).find('input').val(q.options[i]);
        
    }
    //console.log(q);
}


function changeQuestion () {
    if (question < DATASTORE.length-1) {
        question++;
        const generateQuestion = DATASTORE[question];
        //console.log(question);
        printQuestion (generateQuestion);
        return true;

    }
    else { 
        return false;
    }
}
//hit start button to start the quiz
function startQuiz () {
    const startButton = $('.startButton');
    startButton.on('click', function (event) {
        event.preventDefault();
        //hide container-start screen and view container-question
        console.log('start button clicked');
        const theStart = $('.container-start');
        const theQuestion = $('.container-question');
        theStart.hide();
        theQuestion.show();

        
    });

}

function nextQuestionButton () {
    //hit submit to render next question
    //we want to attach a function on the click event
    const questionForm = $('.questions-form');
    questionForm.on('submit', function (event) {
        console.log("SEND IT");
        event.preventDefault();
        console.log(correctAnswer());
        showResult();
        const hasNextQuestion = changeQuestion();

        if (hasNextQuestion === false) {
            const theEnd = $('.container-end');
            const theQuestion = $('.container-question');
            theQuestion.hide();
            theEnd.show();
        }
        
        clearSelection();
    });

}

function clearSelection () {
    //make sure all inputs are unselected
    //.find() is queries , .get() is for indexing an array - specific to jQuery
    let answerOptions = $('.option');
    let inputs = answerOptions.find('input');
    inputs.prop('checked', false);
}


//write a function:
//that determines if the user has the correct answer
//what to do if they don't
//adding it to the score if they do have the answer correct

function correctAnswer () {
    let userAnswer = $('.option > input:checked');
    console.log(userAnswer.val());
    console.log(DATASTORE[question].answer);

    if(userAnswer.val() === DATASTORE[question].answer) {
        return true;

    }
    else {
        return false;
    }
    
}


//if correctAnswer === true; then print "CORRECT"
//if correctAnswer === false; then print "WRONG"
//in the case that the user answers correctly, we want to hide the question and tell the user they're correct
//in the case they the user answers incorrectly, we want to hide the question and tell the user they're incorrect
function showResult () {
    const theAnswerResult = $('.container-answerResult');
    const theQuestion = $('.container-question'); 
    theAnswerResult.show();
    theQuestion.hide();
    //let correctAnsP = $('.container-correctAnswer > p');
    if (correctAnswer() === true) {
        theAnswerResult.find('p').text("Correct!");
    } 
    else {
        theAnswerResult.find('p').text("Wrong!");
    }
    
}

function continuteQuestions () {
    const theAnswerResult = $('.container-answerResult');
    const theQuestion = $('.container-question');
    theAnswerResult.hide();
    theQuestion.show();
}

function attachContinueQuestions () {
    $('.nextButton').on('click', function (event) {
        continuteQuestions();
    });
}




//jQuery document loaded function
$(function () {
    const generateQuestion = DATASTORE[question];
    printQuestion (generateQuestion);
    nextQuestionButton();
    startQuiz();
    attachContinueQuestions();
    console.log("page loaded");
});








