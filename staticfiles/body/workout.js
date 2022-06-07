const buildBtn = document.getElementById('build-workout')
const resetBtn = document.getElementById('reset-workout')
const startBtn = document.getElementById('start-workout')
const stopBtn = document.getElementById('stop-workout')
const formGroup = document.getElementById('form-group')
const workoutPanel = document.getElementById('workout-panel')
const workoutHeader = document.getElementById('workout-header')
const workoutBody = document.getElementById('workout-body')

let focus = ''
let timeInterval
let timePassed = 0
// let hours = 0
let minutes = 0
let seconds = 0

buildBtn.addEventListener('click', () => {
    const rounds = document.getElementById('id_rounds').value
    const isUpper = document.getElementById('id_district_upperbody').checked
    const isLower = document.getElementById('id_district_lowerbody').checked

    if (rounds <= 0){
        alert("You have to do at least 1 round...")
    } else if (!isUpper && !isLower){
        alert("You have to select at least 1 district (Upper Body - Lower Body)")
    } else {
        formGroup.hidden = true
        createWorkout(rounds, isUpper, isLower)
        workoutPanel.hidden = false
    }
})

resetBtn.addEventListener('click', () => {
    formGroup.hidden = false
    workoutPanel.hidden = true
    // Clear divs with exercises
    while (workoutBody.firstChild) {
        workoutBody.removeChild(workoutBody.firstChild)
    }
})

startBtn.addEventListener('click', () => {
    stopBtn.hidden = false
    startBtn.hidden = true
    resetBtn.hidden = true

    startTimer()
})

stopBtn.addEventListener('click', () => {
    stopBtn.hidden = true
    startBtn.hidden = false
    resetBtn.hidden = false

    clearInterval(timeInterval)
    
    endGame()
})

function startTimer(){
    let zeroS = '0'
    let zeroM = '0'

    const title = document.querySelector('h1')
    title.innerHTML = `${focus} routine`
    const timer = document.querySelector('h3')
    timer.innerText = `${zeroM}${minutes}:${zeroS}${seconds}`
    timer.style.backgroundColor = '#FE9A1F'

    timeInterval = setInterval( () => {
        timePassed ++
        seconds ++

        if (seconds % 60 === 0){
            minutes ++
            seconds = 0
        }
        if (seconds < 10){
            zeroS = '0'
        } else {
            zeroS = ''
        }
        if (minutes < 10){
            zeroM = '0'
        } else {
            zeroM = ''
        }

        timer.innerHTML = `${zeroM}${minutes}:${zeroS}${seconds}`

    }, 1000)
}

function createWorkout(rounds, isUpper, isLower){
    const exercises = JSON.parse(document.getElementById('exercisesList').textContent)
    let exercisesToUse = []
    
    // Check which exercises need to be used
    if (isUpper && !isLower){
        focus = 'Upper Body'
        exercisesToUse = chooseExercises(exercises, focus)  
    }else if (!isUpper && isLower){
        focus = 'Lower Body'
        exercisesToUse = chooseExercises(exercises, focus)
    }else{
        focus = 'Full Body'
        exercisesToUse = Object.values(exercises)
    }

    workoutHeader.innerHTML = `
    <div>
        <h3> ${focus} routine </h3>
    </div>`

    // Display random chosen exercises
    for(let i = 0; i < Number(rounds); i++){
        // Pick a random exercise
        e = exercisesToUse[Math.floor(Math.random() * exercisesToUse.length)]

        console.log(e)
        // Create element with exercise name
        exerciseContainer = document.createElement('div')
        exerciseContainer.className = 'exercise-container'
        // Change background color according to category
        if (e.category === 'Lower Body'){
            exerciseContainer.style.backgroundColor = 'LightCoral'
        } else if (e.category === 'Upper Body') {
            exerciseContainer.style.backgroundColor = 'LightGreen'
        } else {
            exerciseContainer.style.background = 'LightBlue'
        }
        exerciseContainer.innerHTML = `${e.name}`
        workoutBody.append(exerciseContainer)
    }
}

function chooseExercises(exercisesList, body_focus){
    list = []
    exercisesList.forEach(e => {
        if (e.category === body_focus){
            list.push(e)
        }
    })
    console.log(list)
    return list
}

// Update Points

const username = JSON.parse(document.getElementById('user_username').textContent)
const modal = document.getElementById("memoryModal")
const btnCloseModal = document.querySelector('.close-btn')
let workoutPointMultiplier = 1

function endGame(){
    workoutPointMultiplier = timePassed * workoutPointMultiplier

    const finalTimer = document.querySelector('h3')

    modal.firstElementChild.firstElementChild.innerHTML = `
    ${finalTimer.textContent}<br>
    Great job!<br>
    You earned ${workoutPointMultiplier} points`
    
    modal.style.display = 'block'
}

/* Modal */
btnCloseModal.onclick = async function() {
    const url = `${hostname}/${username}/points`
    const response = await fetch(url)
    const points = await response.json()
    const current_points_workout = points.points_workout

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            points_workout: current_points_workout + workoutPointMultiplier
        }),
    })

    modal.style.display = "none";
    newWorkout()
}

function newWorkout(){
    const restartBtn = document.querySelector('.restart-btn')
    const exitBtn = document.querySelector('.exit-btn')
    exitBtn.parentElement.hidden = false
    restartBtn.hidden = false
    btnCloseModal.hidden = true
    
    modal.style.display = 'block'
    modal.firstElementChild.firstElementChild.innerHTML = 'Do you want to go again?'

    restartBtn.addEventListener('click', () => location.reload())
}