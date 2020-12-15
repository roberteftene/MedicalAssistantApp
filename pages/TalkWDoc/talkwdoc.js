document.addEventListener('DOMContentLoaded', app);
const profileForm = document.querySelector('.form-profile');
const deseaseForm = document.querySelector('.form-desease');
const formSteps = document.querySelector('.form-steps-list');
const displayFormOption = document.querySelector('.option-completeForm');
const profileFormOption = document.querySelector('.form-step-1');
const emergencyFormOption = document.querySelector('.form-step-2');
const validateFormOption = document.querySelector('.form-step-3');
let deleteImageBtn = document.querySelector('.delete-images');
function app() {
    profileForm.style.display = "none";
    deseaseForm.style.display = 'none';
    formSteps.style.display = "none"
    deleteImageBtn.style.visibility = 'hidden'
}

displayFormOption.addEventListener('click', () => {
    profileForm.style.display = "flex"
    formSteps.style.display = 'flex'
    profileFormOption.classList.add('option-border')
    emergencyFormOption.classList.add('form-step-border');

})

profileFormOption.addEventListener('click', () => {
    deseaseForm.style.display = 'none'
    profileForm.style.display = "flex"
    emergencyFormOption.classList.remove('option-border')
    profileFormOption.classList.add('option-border')
    profileFormOption.classList.remove('form-step-border');
    emergencyFormOption.classList.add('form-step-border');
})

emergencyFormOption.addEventListener('click', () => {
    profileForm.style.display = 'none'
    profileFormOption.classList.remove('option-border')
    emergencyFormOption.classList.add('option-border')
    deseaseForm.style.display = 'flex'
    profileFormOption.classList.add('form-step-border');
    emergencyFormOption.classList.add('form-step-border');
    emergencyFormOption.classList.remove('form-step-border');

})