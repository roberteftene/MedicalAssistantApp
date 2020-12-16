const btnSub = document.getElementById('btnSubmit')
const goTopAudio = new Audio('goTop.mp3')
const subscribeAudio = new Audio('success.mp3')
const email = document.getElementById("email")
const topBtn = document.getElementById("goTopBtn")

function messageSubscribed() {
  subscribeAudio.play(); 
  email.remove();
}


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
