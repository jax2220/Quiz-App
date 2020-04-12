var store = {
    questions: [{
        prompt: 'Who was Vice President during WWI?',
        choices: ['Marshall', 'The Rock', 'Obama', 'Jackson'],
        answer: 'Marshall',
    },
    {
        prompt: `In which state is the US's second busiest airport?`,
        choices: ['Montana', 'Georgia','Wyoming', 'Utah'],
        answer: 'Georgia',

    },
    {
        prompt: 'In which city was the pinball machine invented?',
        choices: ['SaltLake City', 'Atlanta', 'Chicago','Seattle'],
        answer: 'Chicago',

    },
    {
        prompt: 'How many Madison Square Gardens have there been before the existing one?',
        choices: ['One', 'Two', 'Three', 'Five'],
        answer: 'Three',

    },
    {
        prompt: 'The first U.S. state to host the Olympics',
        choices: ['Utah', 'Atlanta', 'California','Missouri'],
        answer: 'Missouri',

    },
]
};

// Global variables
let score = 0;
let q_num = 0;
// start quiz, displays the q_num and score and calls the renderQuestion function
const startQuiz = function(){
    $('#startbtn').on('click', function(event){
        $('.header').hide();
        $('.quiz-section').css("display", "flex");
        $('.question-answers-section').css("display", "flex");
        
        renderQuestion();
    });
    
};

//show current question number and score
function questionPlusScore(){
    $('.questionNum-score-container').html(`
    <h2 class="question-number"> Question <span>${q_num + 1}</span>/5</h2>
    <h2 class="score">Score <span>${score}</span>/5</h2>
    `)
}

//render question
function renderQuestion(){
    questionPlusScore();
    const questionFormat = $(`
    <div class="box questionbox" id="questionbox">
    <legend class="question">${store.questions[q_num].prompt}</legend>
</div>
<form>
    <fieldset>
        <div class="optionbox">
         <label for="option">
             <input type="radio" class="options" name="option" value="${store.questions[q_num].choices[0]}">
             ${store.questions[q_num].choices[0]}
         </label>
    
         <label for="option">
              <input type="radio" class="options" name="option" value="${store.questions[q_num].choices[1]}">
              ${store.questions[q_num].choices[1]}
         </label>
         <br>
         <label for="option">
             <input type="radio" class="options" name="option" value="${store.questions[q_num].choices[2]}">
             ${store.questions[q_num].choices[2]}
         </label>
    
         <label for="option">
             <input type="radio" class="options" name="option" value="${store.questions[q_num].choices[3]}">
             ${store.questions[q_num].choices[3]}
         </label>
         <br>
         <input type="submit" class="button" id="submitbtn" value="Submit">
        </div>
    </fieldset>
</form>
    `);
    $('.question-answers-section').html(questionFormat);
    $('.feedback-section').hide();

}
//logic for checking user answer
function checkAnswer(){
    $('.question-answers-section').on('submit', event => {
        event.preventDefault();
        let userAnswer = $('input[name="option"]:checked').val();
        let rightAnswer = store.questions[q_num].answer;
        $('.question-answers-section').hide();
        $('.feedback-section').css("display", "flex");
        if(userAnswer === rightAnswer){
            score++
            correctAnswer();
        }else{
            wrongAnswer();
        };
    });
};

//logic for correct answer
function correctAnswer(){
    const correctAnswerHtml = $(`
    <h2>You got it, great Job! The answer was:</h2>
            <div class="correct-answer-container">
                <span class="correct-answer">${store.questions[q_num].answer}</span>
            </div>
            <input autofocus type="button" id="nextqbtn" class="button" value="Next Question">
    `);
    $('.feedback-section').html(correctAnswerHtml);
    questionPlusScore();
};

// logic for wrong answer
function wrongAnswer(){
    const wrongAnswerHtml = $(`
    <h2>Oh no, you got it wrong! The correct answer is:</h2>
            <div class="correct-answer-container">
                <span class="correct-answer">${store.questions[q_num].answer}</span>
            </div>
            <input autofocus type="button" id="nextqbtn" class="button" value="Next Question">
    `);
    $('.feedback-section').html(wrongAnswerHtml);
};

//next question logic

function questionUpdate(){
    if(q_num+1 < store.questions.length){
        q_num++
    }else{
        $('main').hide();
        showResults();
    }
};

//next question button
function nextQuestion(){
    $('.feedback-section').on('click', '#nextqbtn', function(){
        $('.feedback-section').hide();
        questionUpdate();
        $('.question-answers-section').show();
        renderQuestion();

    })
}

//show results
function showResults(){
    $('.results').css("display", "flex");

    let resultsForm = $(`
    <h2 class="result-end">Congratulations, you finished!</h2>
    <img class="usaimg" src="./img/united-states.png" alt="united states outline with flag"> 
    <div class="end-page">
      <ul class="final-score">
        <li class="center">Final Score: <br>
          <span class="score">${score}</span>/5
        </li>
      </ul>
      <p class="p-two">See what you've learned and try again!</p>
      <input type="button" id="restartbtn" class="button" value="Restart Quiz">
    </div>
    `);
    $('.results').html(resultsForm);
};
// restart the quiz from the start page
function restart(){
    $('.results').on('click', '#restartbtn', function(){
        $('.results').hide();
        $('main').hide();
        $('.header').show();
        score = 0;
        q_num = 0;
    })
}



function quizApp(){
    startQuiz();
    questionPlusScore();
    renderQuestion();
    checkAnswer();
    nextQuestion();
    showResults();
    restart()  
    $('.results').hide();  
}
 
$(quizApp);
