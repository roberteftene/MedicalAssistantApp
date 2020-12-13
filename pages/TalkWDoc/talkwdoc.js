document.addEventListener('DOMContentLoaded', app);
const profileForm = document.querySelector('.form-actual');
const formSteps = document.querySelector('.form-steps-list');
const displayFormOption = document.querySelector('.option-completeForm');
const profileFormOption = document.querySelector('.form-step-1');
const emergencyFormOption = document.querySelector('.form-step-2');
const validateFormOption = document.querySelector('.form-step-3');
function app() {
    profileForm.style.display = "none";
    formSteps.style.display = "none"
}

displayFormOption.addEventListener('click', () => {
    profileForm.style.display = "flex"
    formSteps.style.display = 'flex'
    profileFormOption.classList.add('option-border')
})

profileFormOption.addEventListener('click', () => {
    profileForm.style.display = "flex"
    formSteps.style.display = 'flex'
    emergencyFormOption.classList.remove('option-border')
    profileFormOption.classList.add('option-border')
})

emergencyFormOption.addEventListener('click', () => {
    profileForm.style.display = 'none'
    profileFormOption.classList.remove('option-border')
    emergencyFormOption.classList.add('option-border')
})