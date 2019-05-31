let question = 0;
let scoreCorrect = 0;
let scoreIncorrect = 0;


/**
 * //print on screen how many questions have been answered
 * 
 * @param {number} count 
 * @param  {number} total
 */ 
function printQuestionCount (count, total) {

    const questionCountDisplay = $('.questionNumber-Score span.question');
    questionCountDisplay.text(count + " out of " + total);
}


//update score text
function printScore (correct, incorrect) {

    const scoreDisplay = $('.questionNumber-Score span.score');
    scoreDisplay.text(correct + " correct, " + incorrect + " incorrect")
  }

//printing the overall score
function overallScore (correct, total) {
    const correctDisplay = $('.container-end span.correct');
    const totalDisplay = $('.container-end span.total');
    correctDisplay.text(correct);
    totalDisplay.text(total);
}


/** Take a question from the datastore and put it on a page, using jQuery
//printing question to page
//q represents current question*/
function printQuestion (q) {
    let questionHeader = $('.container-question > h2');
    questionHeader.text(q.question);

    let answerOptions = $('.option');
    
    for (let i = 0; i < answerOptions.length; i++) {
        
       $(answerOptions[i]).find('span').text(q.options[i]);
       $(answerOptions[i]).find('input').val(q.options[i]);
        
    }
}

//
function getNextQuestion () {
   
    if (question < DATASTORE.length-1) {
        question++;

        const generateQuestion = DATASTORE[question];
        return generateQuestion;
    }
    else { 
        return null;
    }
}

/**hit start button to start the quiz*/
function startQuiz () {
    printQuestionCount(question, DATASTORE.length);
    printScore(scoreCorrect, scoreIncorrect);

    const startButton = $('.startButton');

    startButton.on('click', function (event) {
        printQuestionCount(question + 1, DATASTORE.length);
        printScore(scoreCorrect, scoreIncorrect);
        event.preventDefault();
        console.log('start button clicked');
        const theStart = $('.container-start');
        const theQuestion = $('.container-question');
        theStart.hide();
        theQuestion.show();
    });

}


//taking the user input, comparing it to the correct answer, switching to the answerResult screen
function selectSubmit () {
    //hit submit to render next question
    //we want to attach a function on the click event
    const questionForm = $('.questions-form');
    questionForm.on('submit', function (event) {
        console.log("SEND IT");
        event.preventDefault();
        console.log(correctAnswer());
        showResult();
        printScore(scoreCorrect, scoreIncorrect);
        clearSelection();
    });

}


/**
 * check if there is a next question
 * if there are no more questions, show the end page
 * if there are more questions, show the question page again
 */
function continuteQuestion () {
    const nextQuestion = getNextQuestion();
    const theAnswerResult = $('.container-answerResult');
    theAnswerResult.hide();

    printQuestionCount(question + 1, DATASTORE.length);

    if (nextQuestion) {
        const theQuestion = $('.container-question');
        printQuestion(nextQuestion);
        theQuestion.show();

    } else {
        const theEnd = $('.container-end');
        const theRestartOption = $('.container-restart');
        theRestartOption.show();
        theEnd.show(); 
        overallScore(scoreCorrect, DATASTORE.length);
        restartQuiz();
    }

}
/**theEnd.hide() and theRestartOption.hide() and theStart.show() ....when trying to switch from final screen to start screen again */
function restartQuiz () {
    const restartButton = $('.restartButton');
    const theStart = $('.container-start');
    
    restartButton.on('click', function (event) {
        event.preventDefault();
        console.log('restart button clicked');

        const theRestartOption = $('.container-restart');
        const theEnd = $('.container-end');

        question = 0;
        printQuestionCount(question, DATASTORE.length);

        scoreCorrect = 0;
        scoreIncorrect = 0;
        printScore(scoreCorrect, scoreIncorrect);
        
        theRestartOption.hide();
        theEnd.hide();
        theStart.show();
    });

    printQuestion(DATASTORE[question]);
}


function clearSelection () {
    //make sure all inputs are unselected
    //.find() is queries , .get() is for indexing an array - specific to jQuery
    let answerOptions = $('.option');
    let inputs = answerOptions.find('input');
    inputs.prop('checked', false);
}



//TODO: write a function that determines if the user has the correct answer and what to do if they don't
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


/**if correctAnswer === true; then print "CORRECT"
if correctAnswer === false; then print "WRONG"
in the case that the user answers correctly, we want to hide the question and tell the user they're correct
in the case they the user answers incorrectly, we want to hide the question and tell the user they're incorrect*/
function showResult () {
    const theAnswerResult = $('.container-answerResult');
    const theQuestion = $('.container-question'); 
    theAnswerResult.show();
    theQuestion.hide();
    //let correctAnsP = $('.container-correctAnswer > p');
    if (correctAnswer() === true) {
        theAnswerResult.find('p').text("That's correct!");
        scoreCorrect++;
    } 
    else {
        theAnswerResult.find('p').text("I'm sorry, that's incorrect. The correct answer is " + DATASTORE[question].answer + ".");
        scoreIncorrect++;
    }
    
}

function attachContinueQuestions () {
    $('.nextButton').on('click', function (event) {
        continuteQuestion();
    });
}

// //the end
// const theEnd = $('.container-end');
// theEnd.show();


//jQuery document loaded function
$(function () {
    const generateQuestion = DATASTORE[question];
    printQuestion (generateQuestion);
    selectSubmit();
    startQuiz();
    //restartQuiz();
    attachContinueQuestions();
    console.log("page loaded");
});








