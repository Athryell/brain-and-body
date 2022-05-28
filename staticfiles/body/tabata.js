const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')
const panel = document.getElementById('tabata-panel')
const header = document.querySelector('h3')
const timesBeforeChoosing = 12
const milliseconds = 100
// TODO: Bring value back after debug
const tabataCounts = 3                   // TODO: -> 8
const activeTimer = 3                  // TODO: -> 20
const restTimer = 3                     // TODO: -> 10
const getReadyTimer = 3
let counter = 1
let runningTimer = 0
let isActive = false
let helperText = 'Get ready!'
let currentExercise
let exercisesToHighlight
let updateTimerInterval
let roundsAlreadyDone = 0

textarea.focus()

textarea.addEventListener('keyup', (e) => {

    createTags(e.target.value)

    if(e.key === 'Enter'){
        textarea.parentElement.hidden = true
        panel.hidden = false
    
        // The first iteration starts immediately
        randomSelect()
    }
})

function createTags(input){
    const tags = input.split(',').filter(tag => tag.trim()
    !== '').map(tag => tag.trim())
    
    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag.charAt(0).toUpperCase() + tag.slice(1);
        tagsEl.appendChild(tagEl)
    })
}

function createWorkout(tagText){
    const newExercise = document.createElement('span')
    newExercise.classList.add('exercise')
    newExercise.innerText = `${counter} - ${tagText}`
    panel.appendChild(newExercise)
}

function randomSelect(){
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, milliseconds)
    }, milliseconds)

    // Choose the exercise
    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            superHighlightTag(randomTag)
            createWorkout(randomTag.innerHTML)

            if (counter != tabataCounts ){
                randomSelect()
                counter++
            } else if (counter === tabataCounts){
                askToStart()
            }

            setTimeout(() => {
                unHighlightTag(randomTag)
            }, milliseconds)
        }, milliseconds)

    }, timesBeforeChoosing * milliseconds)
}

function askToStart(){
    tagsEl.hidden = true

    header.innerHTML = 'This is going to be your 4 minutes workout <br> 20s activity - 10s rest'

    // Create button
    const startBtn = document.createElement('button')
    startBtn.setAttribute('type', 'button')
    startBtn.classList.add('start-btn')
    startBtn.style.border = 'none'
    startBtn.style.borderRadius = '50px'
    startBtn.style.backgroundColor = 'green'
    startBtn.style.width = '50%'
    startBtn.style.margin = '0 auto'
    startBtn.innerHTML = "Let's go!"
    startBtn.addEventListener('click', startTabata)
    panel.appendChild(startBtn)
    startBtn.focus()

}

function startTabata(){
    document.querySelector('.start-btn').hidden = true

    runningTimer = getReadyTimer

    const getReadyCountdown = setInterval(() => {

        header.innerHTML = `${helperText} - ${runningTimer}`
        header.style.backgroundColor = 'green'

        if (runningTimer <= 1){
            clearInterval(getReadyCountdown)

            exercisesToHighlight = document.querySelectorAll('.exercise')

            updateTimerInterval = setInterval(updateTimer, 1000)

        }

        runningTimer -= 1
        
    }, 1000)
}

function updateTimer(){
    if (runningTimer <= 1){
        if (roundsAlreadyDone >= tabataCounts){
        
            clearInterval(updateTimerInterval)
            endGame()
        }

        if (isActive){ // Start rest
            currentExercise.style.backgroundColor = 'grey'
            currentExercise.style.border = 'none'
            currentExercise.style.padding = '8px 20px'

            isActive = false
            runningTimer = restTimer + 1
            header.style.backgroundColor = '#0077B4'
            helperText = 'Rest'
        } else { // Start workout
            
            currentExercise = exercisesToHighlight[roundsAlreadyDone]
            currentExercise.style.border = '2px dashed red'
            currentExercise.style.padding = '6px 18px'
            
            roundsAlreadyDone ++

            isActive = true
            runningTimer = activeTimer + 1
            header.style.backgroundColor = '#FE9A1F'
            helperText = 'Go!'
        }
    }

    runningTimer -= 1
    header.innerHTML = `${helperText} - ${runningTimer}`
}


function pickRandomTag(){
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag){
    tag.classList.add('highlight')
}

function superHighlightTag(tag){
    tag.classList.add('super-highlight')
}

function unHighlightTag(tag){
    tag.classList.remove('highlight')
    tag.classList.remove('super-highlight')
}

// Update Points

const username = JSON.parse(document.getElementById('user_username').textContent)
const modal = document.getElementById("memoryModal")
const btnCloseModal = document.querySelector('button')
let tabataPointMultiplier = 0

function endGame(){
    tabataPointMultiplier = 40

    modal.firstElementChild.firstElementChild.innerHTML = `
    Great job! <br>
    You earned ${tabataPointMultiplier} points`
    
    modal.style.display = 'block'
}

/* Modal */
btnCloseModal.onclick = async function() {

    const response = await fetch(`http://localhost:8000/${username}/points`)
    const points = await response.json()
    const current_points_tabata = points.points_tabata

    fetch(`http://localhost:8000/${username}/points`, {
        method: 'PUT',
        body: JSON.stringify({
            points_tabata: current_points_tabata + tabataPointMultiplier
        }),
    })

    modal.style.display = "none"
    newTabata()
}

function newTabata(){
    const restartBtn = document.querySelector('.restart-btn')
    const exitBtn = document.querySelector('.exit-btn')
    exitBtn.parentElement.hidden = false
    restartBtn.hidden = false
    btnCloseModal.hidden = true
    
    modal.style.display = 'block'
    modal.firstElementChild.firstElementChild.innerHTML = 'Do you crave for another round?'

    restartBtn.addEventListener('click', () => location.reload())
}