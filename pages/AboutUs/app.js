const btnSub = document.getElementById('btnSubmit')
const goTopAudio = new Audio('goTop.mp3')
const subscribeAudio = new Audio('success.mp3')
const email = document.getElementById("email")
const topBtn = document.getElementById("goTopBtn")

function messageSubscribed() {
  let valid = true
  if(email.value.length < 10) {
    valid = false
    toastr.error('Your email is too short')
  }
  if(!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    valid = false
    toastr.error('You must enter a valid email address');
  }

  if(valid) {
    toastr.success('You have successfully subscribed to our newsletter!')
    email.value = " "
    subscribeAudio.play(); 
  }
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
