const STORE = [
  {
    question: 'Which of the four lobes in your brain is responsible for decision making?',
    options: [
      'Parietal',
      'Occipital',
      'Frontal',
      'Temporal'
    ],
    answer: 'Frontal'
  },
  {
    question: 'You want to perform an exercise that targets your gastrocnemius. Which exercise would target this muscle?',
    options: [
      'Crunches',
      'Push-ups',
      'Shoulder press',
      'Calf raises'
    ],
    answer: 'Calf raises'
  },
  {
    question: 'Which of these muscles is not part of the rotator cuff?',
    options: [
      'Sartorius',
      'Infraspinatus',
      'Subscapularis',
      'Teres minor'
    ],
    answer: 'Sartorius'
  },
  {
    question: 'You have tendinitis. That means you have [blank] of the tendon.',
    options: [
      'Bruising',
      'Inflammation',
      'A full tear',
      'Snapping'
    ],
    answer: 'Inflammation'
  },
  {
    question: 'What is the medical term for your big toe?',
    options: [
      'Tubercle',
      'Epicondyle',
      'Hallux',
      'Atlas'
    ],
    answer: 'Hallux'
  },
  {
    question: 'Which is one of the three anatomical planes of the body?',
    options: [
      'Sagittal',
      'Boeing',
      'Ventricle',
      'Quadratus'
    ],
    answer: 'Sagittal'
  },
  {
    question: 'The hip joint is an example of which type of joint?',
    options: [
      'Hinge',
      'Saddle',
      'Ball and socket',
      'Pivot'
    ],
    answer: 'Ball and socket'
  },
  {
    question: 'Which system is responsible for producing and secreting hormones?',
    options: [
      'Endocrine system',
      'Reproductive system',
      'Nervous system',
      'Muscular system'
    ],
    answer: 'Endocrine system'
  },
  {
    question: 'What is crepitus?',
    options: [
      'Tearing of the muscle',
      'Crackling, popping sounds around the joint',
      'Discoloration of the skin',
      'A hairline fracture in the bone'
    ],
    answer: 'Crackling, popping sounds around the joint'
  },
  {
    question: 'To measure the angle or range of motion at a joint, which instrument is commonly used in a rehabilitation setting?',
    options: [
      'Stethoscope',
      'Protractor',
      'Your eyes',
      'Goniometer'
    ],
    answer: 'Goniometer'
  }
];

function handlePageLoad() {
  // console.log('handlePageLoad ran');
  $('.current-standing-box').hide();
  $('.question-box').hide();
  $('.answer-box').hide();
  $('.final-box').hide();
}

function handleClicks() {
  $('.start-button').click(function (event) {
    event.preventDefault();
    // console.log('start button click');
    $('.start-quiz-box').hide();
    $('.current-standing-box').show();
    $('.question-box').show();
    $('.answer-box').hide();
    $('.final-box').hide();
  });

  $('.submit-button').click(function (event) {
    event.preventDefault();
    let userAnswer = $("input[class='option']:checked").val();
    if (userAnswer) {
      let storeAnswer = STORE[questionNumber].answer;
      // console.log(storeAnswer, userAnswer);
      if (userAnswer == storeAnswer) {
        score++;
        updateScore(score);
        correctAnswer();
      }
      else {
        wrongAnswer();
      }
      // console.log('submit button click');
      $('.start-quiz-box').hide();
      $('.current-standing-box').show();
      $('.question-box').hide();
      $('.final-box').hide();
    }
    else {
      alert('Please select an option.');
    }
  });

  $('.next-button').click(function (event) {
    event.preventDefault();
    // console.log('next button click');
    if (questionNumber < STORE.length) {
      questionNumber++;
      // console.log(questionNumber);
      updateQuestionNumber(questionNumber);
      nextQuestion(questionNumber);
      $('.start-quiz-box').hide();
      $('.current-standing-box').show();
      $('.question-box').show();
      $('.answer-box').hide();
      $('.final-box').hide();
    }

    if (questionNumber === STORE.length) {
      generateFinalScore(score);
      $('.final-box').show();
      $('.start-quiz-box').hide();
      $('.current-standing-box').hide();
      $('.answer-box').hide();
      $('.question-box').hide();
    }
  });

  $('.restart-button').click(function (event) {
    event.preventDefault();
    // console.log('restart button click');
    location.reload();
  });
}

let questionNumber = 0;
let score = 0;

// Generates each question in the STORE
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createQuestion(questionNumber);
  }
}

// Create HTML for question
function createQuestion(questionNumber) {
  $('.question-text').html(STORE[questionNumber].question);
  $('.question-options').html();

  STORE[questionNumber].options.forEach(function (answerValue) {
    // console.log(answerValue);
    $('.question-options').append(`
    <li>
      <input class="option" type="radio" name="option" value="${answerValue}">${answerValue}
    </li>`);
  });
}

// Shows correct answer box
function correctAnswer() {
  // console.log('correct');
  $('.js-correct-answer').show();
  $('.js-incorrect-answer').hide();
}

// Shows incorrect answer box
function wrongAnswer() {
  // console.log('incorrect');
  $('.js-correct-answer').hide();
  $('.js-incorrect-answer').show();
  wrongAnswerText();
}

// Shows the correct answer in the incorrect answer box
function wrongAnswerText() {
  let wrongText = STORE[questionNumber].answer;
  // console.log(wrongText);
  $('.correctAnswerText').text(wrongText);
}

// Increments the number value of questionNumber variable by 1 and updates question number in quiz
function updateQuestionNumber(questionNumber) {
  console.log(questionNumber);
  $('.question-number').text(questionNumber);
}

// Increments the number value of the score variable by 1 and updates score in quiz
function updateScore(score) {
  $('.score-number').text(score);
}

// Creates next question unless the user has reached the last question
function nextQuestion(questionNumber) {
  if (questionNumber == STORE.length) {
    $('.questions-correct').text(updateScore(score));
    $('.current-standing-box').hide();
    $('.question-box').hide();
    $('.answer-box').hide();
    $('.js-final').show();
  }
  else {
    let storeQuestion = STORE[questionNumber].question;
    // console.log(storeQuestion);
    $('.question-text').text(storeQuestion);
    let questionValue = questionNumber + 1;
    $('.question-number').text(questionValue);
    $('.question-options').text('');
    createQuestion(questionNumber);
  }
}

// Shows the final score out of 10 in the final box
function generateFinalScore(score) {
  // console.log(score);
  $('.questions-correct').text(score);
}

handlePageLoad();
handleClicks();
generateQuestion();