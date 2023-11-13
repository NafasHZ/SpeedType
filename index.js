
const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEL = document.getElementById('score')
const timeEL = document.getElementById('time')
const endgameEL = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('setting-btn')
const settings = document.getElementById('setting')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

const words = [
    "firm",
    "loyal",
    "truehearted",
    "tight",
    "immobile",
    "flying",
    "quick",
    "fasting",
    "debauched",
    "degenerate",
    "degraded",
    "dissipated",
    "dissolute",
    "libertine",
    "profligate",
    "riotous"
]
let randomWord;
let score = 0;
let time = 10;
text.focus();

//select easy hard medium as localStorege
difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium'

//select easy hard medium ofter update
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium'


//Game Over Function
function GameOver() {
    endgameEL.innerHTML = `
    <h1>Time Run Out </h1>
    <p>Your Score is : ${score}</p>
    <button onclick="location.reload()">Reload</button>`

    endgameEL.style.display = 'flex'
}
//rendom select word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function addWordToDom() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord
}
addWordToDom()
//update score
function updateScore() {
    score++;
    scoreEL.innerHTML = score
}

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDom();
        e.target.value = '';
        updateScore();
        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3
        } else {
            time += 5
        }
        updateTime()
    }
})
// Timer
const timeInterval = setInterval(updateTime, 1000)
function updateTime() {
    time--;
    timeEL.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        GameOver();
    }
}
//show and hide selected
settingsBtn.addEventListener('click', () => {
    console.log('object');
    settings.classList.toggle('hidden')
})
//chenge selected
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})