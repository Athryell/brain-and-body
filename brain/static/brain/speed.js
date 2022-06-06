const username = JSON.parse(document.getElementById('user_username').textContent)
const canvas = document.getElementById('canvas')
const canvasContainer = document.getElementById('canvas-container')
const ctx = canvas.getContext("2d")
const modal = document.getElementById("memoryModal")
const btnCloseModal = document.querySelector('button')
const restartBtn = document.querySelector('.restart-btn')
const exitBtn = document.querySelector('.exit-btn')
const initialCountdown = document.querySelector('.countdown')
let myRequest

let initialSize = 50 * (canvasContainer.clientWidth * 0.001)
let size = initialSize
let speed = 15
let t
let hits = 0
let circlePosX = Math.floor(Math.random() * canvas.width)
let circlePosY = Math.floor(Math.random() * canvas.height)
let isGameOver = false

canvas.width = canvasContainer.clientWidth
canvas.height = canvasContainer.clientHeight

window.onload = function(){
    let countdownTimer = 3

    initialCountdown.lastElementChild.style.fontSize = '3em'

    const interval = setInterval( () => {
        if(countdownTimer <= 0){
            clearInterval(interval)
            startGame()
        }

        initialCountdown.lastElementChild.innerText = countdownTimer
        countdownTimer -= 1
    }, 1000)
}

function startGame(){
    let t = Date.now()

    initialCountdown.hidden = true

    function draw(){

        let timePassed = (Date.now() - t) / 1000
        t = Date.now()

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.beginPath()
        ctx.arc(circlePosX, circlePosY, size, 0, 2*Math.PI)
        ctx.fillStyle = "#0077B4"
        ctx.fill()
        ctx.strokeStile = "black"
        ctx.stroke()
        if (hits >= 7){
            speed += 0.01
        }
        size -= (speed * timePassed)
        myRequest = window.requestAnimationFrame(draw)

        if (size <= 0){
            endGame()
        }
    }

    myRequest = window.requestAnimationFrame(draw)

    canvas.addEventListener("mousedown", function(e) {
        mousePos = getMousePos(canvas, e)
        if (isGameOver){
            return
        }
        if (mousePos.x >= circlePosX - size && mousePos.x <= circlePosX + size 
            && mousePos.y >= circlePosY - size && mousePos.y <= circlePosY + size){
                hits++
                circlePosX = Math.floor(Math.random() * canvas.width)
                circlePosY = Math.floor(Math.random() * canvas.height)
                size = initialSize
        } else {
            endGame()
        }
    })
    
    function getMousePos(canvas, event){
        var rect = canvas.getBoundingClientRect() // abs. size of element
            scaleX = canvas.width / rect.width    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height  // relationship bitmap vs. element for Y
      
        return {
          x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
          y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    }

    function endGame(){
        cancelAnimationFrame(myRequest)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        isGameOver = true
        endScreen()
    }
    
    let speedPointMultiplier = 0

    function endScreen(){
        speedPointMultiplier = hits * 2

        modal.firstElementChild.firstElementChild.innerHTML = `
        Awesome! <br>
        You manage to hit ${hits} circles!
        You earned ${speedPointMultiplier} points`

        modal.style.display = 'block'
    }

    /* Modal */
    btnCloseModal.onclick = async function() {
        const response = await fetch(`http://${hostname}/${username}/points`)
        const points = await response.json()
        const current_points_speed = points.points_speed

        fetch(`http://${hostname}/${username}/points`, {
            method: 'PUT',
            body: JSON.stringify({
                points_speed: current_points_speed + speedPointMultiplier
            }),
        })
        

        modal.style.display = "none";
        newSpeed()
    }

    function newSpeed(){
        const restartBtn = document.querySelector('.restart-btn')
        const exitBtn = document.querySelector('.exit-btn')
        exitBtn.parentElement.hidden = false
        restartBtn.hidden = false
        btnCloseModal.hidden = true
        
        modal.style.display = 'block'
        modal.firstElementChild.firstElementChild.innerHTML = 'Feel reactive for another round?'

        restartBtn.innerHTML = "Yes!"
        restartBtn.addEventListener('click', () => location.reload())
    }    

}


