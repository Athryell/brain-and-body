const username = JSON.parse(document.getElementById('user_username').textContent)
const modal = document.getElementById("memoryModal")
const btnCloseModal = document.querySelector('button')
const cards = document.querySelectorAll('.flip-card')
let revealedCards = 0
let coupleFound = 0
let moves = 1
let card1 = ''
let card2 = ''

cards.forEach(card => {
    card.addEventListener('click', () =>{
        if (revealedCards >= 2)
        {
            coverCards()
        }

        if (card.dataset.isRevealed === "false"){
            card.firstElementChild.style.transform = "rotateY(180deg)"
            card.dataset.isRevealed = "true"
            
            // Compare cards name to check for a match
            if (card1 === ''){
                card1 = card.dataset.name
            } else {
                card2 = card.dataset.name

                if (card1 === card2){
                    setCardsAsFound(card.dataset.name)
                }
            }

            revealedCards++
        }
    })
})

function coverCards(){
    moves++

    cards.forEach(card => {
        if (card.dataset.found === 'false'){
            card.firstElementChild.style.transform = null
            card.dataset.isRevealed = "false"
            revealedCards = 0
            card1 = ''
            card2 = ''
        }
    })
}

function setCardsAsFound(cardName){
    const coupleToHide = document.querySelectorAll(`[data-name="${cardName}"]`)
    coupleToHide.forEach(c => {
        c.dataset.found = "true"
        coupleFound++
    })

    if (coupleFound === cards.length){
        endGame()
    }
}

let memoryPointMultiplier = 0

function endGame(){
    memoryPointMultiplier = cards.length * 2 - Math.round(moves / 2)

    modal.firstElementChild.firstElementChild.innerHTML = `
    Great job! <br>
    It took ${moves} moves <br>
    You earned ${memoryPointMultiplier} points`
    
    modal.style.display = 'block'
}

/* Modal */
btnCloseModal.onclick = async function() {
    const url = `${hostname}/${username}/points`
    const response = await fetch(url)

    const points = await response.json()
    const current_points_memory = points.points_memory

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            points_memory: current_points_memory + memoryPointMultiplier
        }),
    })

    modal.style.display = "none";
    newMemory()
}

function newMemory(){
    const restartBtn = document.querySelector('.restart-btn')
    const exitBtn = document.querySelector('.exit-btn')
    exitBtn.parentElement.hidden = false
    restartBtn.hidden = false
    btnCloseModal.hidden = true
    
    modal.style.display = 'block'
    modal.firstElementChild.firstElementChild.innerHTML = 'Feel fresh for another round?'

    restartBtn.addEventListener('click', () => location.reload())
}

