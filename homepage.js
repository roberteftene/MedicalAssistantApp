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
