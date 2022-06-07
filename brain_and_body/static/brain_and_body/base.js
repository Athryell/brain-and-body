const openMenuBtn = document.getElementById('open-menu')
const closeMenuBtn = document.getElementById('close-menu')
const menu = document.getElementById('responsive-menu')

var hostname = checkHostname()
// export var hostname = checkHostname()

function checkHostname(){
    if (window.location.hostname == 'brainandbody.herokuapp.com') {
        return 'brainandbody.herokuapp.com'
    } else if(window.location.hostname == 'localhost') {
        return 'localhost:8000'
    } else if (window.location.hostname == '127.0.0.1') {
        return '127.0.0.1:8000'
    }
}

document.addEventListener('load', () => {console.log(hostname)})
// if (window.location.hostname == 'brainandbody.herokuapp.com') {
//     hostname = 'brainandbody.herokuapp.com'
// } else if(window.location.hostname == 'localhost') {
//     hostname = 'localhost:8000'
// } else if (window.location.hostname == '127.0.0.1') {
//     hostname = '127.0.0.1:8000'
// } else {
//     hostname = 'brainandbody.herokuapp.com'
//     console.log('error with hostname')
// }

openMenuBtn.addEventListener('click', () => {
    openMenuBtn.style.display = 'none'
    menu.style.display = 'flex'
})

closeMenuBtn.addEventListener('click', () => {
    menu.style.display = 'none'
    openMenuBtn.style.display = 'block'
})

