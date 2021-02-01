/* eslint-env es6 */
/* eslint-disable */
/*jslint es6:true */

var currentQuestion = 0;
var score = 0;

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const submitButton = document.getElementById('submit');
const selectedButton = document.getElementById('selectedButton')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
   questionElement.style.color = "#ed0e0e";
   questionElement.style.fontSize = "2em"
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}


function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
 
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
	 answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	  if (correct) {
	 questionElement.innerText = 'Correct!'
	  } else {
		questionElement.innerText = 'Incorrect'
	  }
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    submitButton.innerText = 'Submit'
	submitButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
	  score += 1;
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  
}

const questions = [
	
  {
    question: 'Should You Neuter Your Dog?',
    answers: [
      { text: 'Contact Vet', correct: true },
      { text: 'Yes', correct: false },
	  { text: 'No', correct: false },
	  { text: 'Never', correct: false }
		
    ]  
	  
  },

  {
    question: 'Once you have a dog, what is the first thing you do in the morning?',
    answers: [
      { text: 'Get Coffee', correct: false },
      { text: 'Watch TV', correct: false },
      { text: 'Read News', correct: false },
      { text: 'Walk Your Dog', correct: true }
    ]  
  },
  {
    question: 'Socialization of your dog with other dogs and people is not important.',
    answers: [
      { text: 'False', correct: true },
      { text: 'True', correct: false }
    ]
	 
  },
  {
    question: 'Who will be paying for the majority of your dogs needs?',
    answers: [
      { text: 'Other', correct: false },
      { text: 'Me', correct: true },
	  { text: 'Spouse', correct: false},
	  { text: 'Parents', correct: false}
    ] 
  },
	{
    question: 'If a human can eat it, a dog can eat it. The majority of table food is acceptable food for dogs.',
    answers: [
	  { text: 'False', correct: true},
	  { text: 'True', correct: false}
    ] 
  },
	{
    question: 'How much time per week do you plan on training your dog/puppy?',
    answers: [
      { text: '1-2 hours', correct: false },
      { text: '3-4 hours', correct: false },
	  { text: 'None', correct: false},
	  { text: 'As Much As It Takes', correct: true}
    ] 
  },
	{
    question: 'How much free time a day do you have to devote to exercising and playing with your dog?',
    answers: [
      { text: '2 hours +', correct: true },
      { text: '1 hour', correct: true },
	  { text: '20-30 mins', correct: false},
	  { text: 'No Time', correct: false}
    ] 
  },
	{
    question: 'All open fields are good places to let my dog off leash.',
    answers: [	
		{ text: 'True', correct: false},
	    { text: 'False', correct: true}
      
    ] 
  },
	{
    question: 'Which is a sign of aggression in a dog?',
    answers: [
	  { text: 'Rolling on Back', correct: false },
      { text: 'Tail Wagging', correct: false },
	  { text: 'Running', correct: false},
	  { text: 'Growling', correct: true}
    ] 
  }


	
	
]

submitButton.onclick = function(){
	    submitButton.style.display = 'none'
		questionContainerElement.textContent = ('Your Score: ' + (score - 10) + '/10.  ' + 'You are ready for a dog!');
		questionContainerElement.style.color = "#0c1d82";
		questionContainerElement.style.fontSize = "2em"
		
}

