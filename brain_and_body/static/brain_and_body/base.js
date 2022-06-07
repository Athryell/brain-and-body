const openMenuBtn = document.getElementById('open-menu')
const closeMenuBtn = document.getElementById('close-menu')
const menu = document.getElementById('responsive-menu')

var protocol = window.location.protocol
var host = window.location.hostname
var hostname = checkHostname()

function checkHostname(){
    if (host.includes('brainandbody')) {
        return `${protocol}//${host}`
    } else if(host.includes('localhost') || host.includes('127.0.0.1')) {
        return `${protocol}//${host}:8000`
    }
}

openMenuBtn.addEventListener('click', () => {
    openMenuBtn.style.display = 'none'
    menu.style.display = 'flex'
})

closeMenuBtn.addEventListener('click', () => {
    menu.style.display = 'none'
    openMenuBtn.style.display = 'block'
})

