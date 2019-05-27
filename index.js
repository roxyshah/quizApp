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

function nextQuestionButton () {
    //hit submit to render next question
    const submitButton = $('.submitButton');
    submitButton.on('click', function (event) {
        event.preventDefault();
        const hasNextQuestion = changeQuestion();

        if (hasNextQuestion === false) {
            const theEnd = $('.container-end');
            const theQuestion = $('.container-question');
            theQuestion.hide();
            theEnd.show();
        }
    });

}



//jQuery document loaded function
$(function () {
    const generateQuestion = DATASTORE[question];
    printQuestion (generateQuestion);
    nextQuestionButton();
    console.log("page loaded");
});








