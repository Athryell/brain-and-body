const openMenuBtn = document.getElementById('open-menu')
const closeMenuBtn = document.getElementById('close-menu')
const menu = document.getElementById('responsive-menu')

openMenuBtn.addEventListener('click', () => {
    openMenuBtn.style.display = 'none'
    menu.style.display = 'flex'
})

closeMenuBtn.addEventListener('click', () => {
    menu.style.display = 'none'
    openMenuBtn.style.display = 'block'
})