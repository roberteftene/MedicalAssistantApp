const items = document.querySelector(".submenu");
const submenu = document.querySelector('.has-submenu');
const navbar = document.querySelector('.navbar');

submenu.addEventListener('click', () => {
    items.setAttribute("id", "submenu-active")
    submenu.style.transform = "none"
    submenu.style.border = "none"
})

document.addEventListener('click', closeSubmenu, false);

/* Close dropdown */
function closeSubmenu(e) {
    let isClickInside = submenu.contains(e.target);
    if (!isClickInside && submenu.querySelector("#submenu-active")) {
        document.getElementById('submenu-active').id = ""

    }
}

/* Go to top button */
let topBtn = document.getElementById('goTopBtn');
let goTopAudio = new Audio('./_assets/audio/goTop.mp3')

window.onscroll = () => {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block"
    } else {
        topBtn.style.display = "none"
    }
}

function goTop() {
    goTopAudio.play();
    document.body.scrollTop = 0;
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}


/* Video section */

let playVideoBtn = document.querySelector('.playBtn').addEventListener('click', () => {
    document.querySelector('.presentation-video').style.visibility = 'visible';
    document.querySelector('.presentation-video').style.animation = 'presentationVideoAnim 2s';
    document.querySelector('.playBtn').style.visibility = 'hidden'
    
})





