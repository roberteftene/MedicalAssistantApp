document.addEventListener('DOMContentLoaded', app);
const profileForm = document.querySelector('.form-profile');
const deseaseForm = document.querySelector('.form-desease');
const validateForm = document.querySelector('.form-validate');
const formSteps = document.querySelector('.form-steps-list');
const displayFormOption = document.querySelector('.option-completeForm');
const profileFormOption = document.querySelector('.form-step-1');
const emergencyFormOption = document.querySelector('.form-step-2');
const validateFormOption = document.querySelector('.form-step-3');
const nextBtnProfileForm = document.getElementById('next-btn-profile');
const deseasaSubmitFormBtn = document.getElementById('deseaseFormSubmitBtn');
let getLocation = document.querySelector('.getLocation');
let locationCoordinates;

// Form data
let profileData;
let deseaseData;
const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const country = document.getElementById('country')
const phone = document.getElementById('phone');
const birthday = document.getElementById('birthday');
const genderMale = document.getElementById('male');
const genderFemale = document.getElementById('female');
const genderOther = document.getElementById('other');
let genderSelected;
const coughSym = document.getElementById('coughSym');
const feverSym = document.getElementById('feverSym');
const headacheSym = document.getElementById('headacheSym');
const backPainSym = document.getElementById('backPainSym');
const otherSym = document.getElementById('otherSym');
let symptomsInputs = [coughSym, feverSym, headacheSym, backPainSym, otherSym];
const deseaseCategory = document.getElementById('desease-category');
const deseaseDescription = document.getElementById('desease-description')
const lastConsult = document.getElementById('last-consult');
const imageArea = document.querySelector('.image-upload');

let finishConsultBtn;
// Toastr configuration
function initToastr() {
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = 'swing';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
    toastr.options.newestOnTop = false;
}

function app() {
    profileForm.style.display = "none";
    deseaseForm.style.display = 'none';
    validateForm.style.display = 'none'
    formSteps.style.display = "none"
    deleteImageBtn.style.visibility = 'hidden'
}

// Events listeners for form steps list

displayFormOption.addEventListener('click', () => {
    profileForm.style.display = "flex"
    formSteps.style.display = 'flex'
    profileFormOption.classList.add('option-border')
    emergencyFormOption.classList.add('form-step-border');
    validateFormOption.classList.add('form-step-border');
    document.querySelector('footer').style.position = 'unset';

})

profileFormOption.addEventListener('click', () => {
    deseaseForm.style.display = 'none'
    validateForm.style.display = 'none'
    profileForm.style.display = "flex"
    emergencyFormOption.classList.remove('option-border')
    validateFormOption.classList.remove('option-border')
    profileFormOption.classList.add('option-border')
    profileFormOption.classList.remove('form-step-border');
    emergencyFormOption.classList.add('form-step-border');
    validateFormOption.classList.add('form-step-border');
})

emergencyFormOption.addEventListener('click', () => {
    profileForm.style.display = 'none'
    validateForm.style.display = 'none'
    profileFormOption.classList.remove('option-border')
    validateFormOption.classList.remove('option-border');
    emergencyFormOption.classList.add('option-border')
    deseaseForm.style.display = 'flex'
    profileFormOption.classList.add('form-step-border');
    validateFormOption.classList.add('form-step-border');
    emergencyFormOption.classList.remove('form-step-border');

})

validateFormOption.addEventListener('click', () => {
    deseaseForm.style.display = 'none'
    profileForm.style.display = 'none'
    validateForm.style.display = 'flex'
    profileFormOption.classList.remove('option-border')
    emergencyFormOption.classList.remove('option-border')
    validateFormOption.classList.add('option-border')
    profileFormOption.classList.add('form-step-border')
    emergencyFormOption.classList.add('form-step-border')
    validateFormOption.classList.remove('form-step-border')

})

getLocation.addEventListener('click',() => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        this.innerHTML = 'Geolocation is not supported'
    }
})

function showPosition(pos) {
    locationCoordinates = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
    }
    console.log(locationCoordinates)
}


function finishProfileForm(e) {
    e.preventDefault();
    initToastr()
    let valid = true;
    if (!firstName.value) {
        toastr.error('You forgot to enter the first name')
        valid = false
    }
    if (!firstName.value.match(/^[a-zA-Z\-ăĂîÎțȚţŢșȘşŞâÂ]{3,30}$/)) {
        toastr.error('Your first name cannot contain spaces or special characters')
    }
    if (firstName.value.length < 2) {
        toastr.error('First name is too short')
        valid = false;
    }

    if (!lastName.value) {
        toastr.error('You forgot to enter the last name')
        valid = false
    }
    if (!lastName.value.match(/^[a-zA-Z\-ăĂîÎțȚţŢșȘşŞâÂ]{3,30}$/)) {
        toastr.error('Your last name cannot contain spaces or special characters')
    }
    if (lastName.value.length < 2) {
        toastr.error('Last name is too short')
        valid = false;
    }

    if (!country.value) {
        toastr.error('You forgot to enter the country')
        valid = false
    }
    if (!country.value.match(/^[a-zA-Z\-ăĂîÎțȚţŢșȘşŞâÂ]{3,30}$/)) {
        toastr.error('Your country cannot contain spaces, number or special characters')
    }
    if (country.value.length < 2) {
        toastr.error('Country is too short')
        valid = false;
    }

    if (!phone.value) {
        toastr.error('You forgot to enter your phone')
        valid = false
    }
    if (!phone.value.match(
            /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/)) {
        toastr.error('The mobile number cannot contain letters')
        valid = false
    }
    if (parseInt(birthday.value.split('-', 3)[0]) >= 2010) {
        toastr.info('We prefer to have this form completed by adults')
    }

    if (genderMale.checked && (!genderFemale.checked) && (!genderOther.checked)) {
        genderSelected = 'male'
    } else if ((!genderMale.checked) && (genderFemale.checked) && (!genderOther.checked)) {
        genderSelected = 'female'
    } else if ((!genderMale.checked) && (!genderFemale.checked) && (genderOther.checked)) {
        genderSelected = 'other'
    } else {
        toastr.error('Please select a gender')
        valid = false
    }

    if (valid === true) {
        toastr.success('Perfect! Continue to next section!');
        profileData = {
            firstName: firstName.value,
            lastName: lastName.value,
            country: country.value,
            phone: phone.value,
            gender: genderSelected,
            birthday: birthday.value

        }
        console.log(profileData);
        profileForm.style.display = 'none'
        profileFormOption.classList.remove('option-border')
        emergencyFormOption.classList.add('option-border')
        deseaseForm.style.display = 'flex'
        profileFormOption.classList.add('form-step-border');
        emergencyFormOption.classList.add('form-step-border');
        emergencyFormOption.classList.remove('form-step-border');
    }
} 

/* Get the data from the second form */
deseasaSubmitFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    initToastr();
    let symptoms = []
    symptomsInputs.forEach(element => {
        if (element.checked) {
            symptoms.push(element.value)
        }
    });

    let valid = true;

    if (symptoms.length == 0) {
        toastr.error('Please select other if you dont have any displayed symptom')
        valid = false;
    }

    if (deseaseDescription.value.length < 10) {
        toastr.error('Please provide a detalied description of the emergency')
        valid = false
    }

    if (valid === true) {
        toastr.success('Perfect! Now please verify your form responses');

        deseaseData = {
            symptoms: symptoms,
            emergencyCategory: deseaseCategory.value,
            emergencyDescription: deseaseDescription.value,
            lastConsultDate: lastConsult.value
        }
        let fullData = {
            ...profileData,
            ...deseaseData
        };
        loadData(fullData);
        deseaseForm.style.display = 'none'
        profileForm.style.display = 'none'
        validateForm.style.display = 'flex'
        profileFormOption.classList.remove('option-border')
        emergencyFormOption.classList.remove('option-border')
        validateFormOption.classList.add('option-border')
        profileFormOption.classList.add('form-step-border')
        emergencyFormOption.classList.add('form-step-border')
        validateFormOption.classList.remove('form-step-border')
    }

})

/* Validate data form */

function loadData(data) {
    while (validateForm.firstChild) {
        validateForm.removeChild(validateForm.lastChild)
    }

    let p = document.createElement('p')
    p.setAttribute('class', 'label-principle')
    p.style.fontSize = '15px'
    p.style.textTransform = 'uppercase'
    p.style.letterSpacing = '1px'
    p.style.marginBottom = '20px'
    p.style.lineHeight = '22px'
    p.innerHTML = 'Please find below your informations. If is something you would want to change please select from above at which section you would like to go back'
    validateForm.appendChild(p)

    for (const [key, value] of Object.entries(data)) {


        let item = document.createElement('p')
        let keyUpper = key.toUpperCase();
        item.classList.add('validate-details');
        item.innerText = `${keyUpper}: ${value}`
        item.classList.add('label-principle')

        validateForm.appendChild(item)

    }
    let locationPar = document.createElement('p')
    locationPar.setAttribute('class', 'label-principle')
    locationPar.style.fontSize = '15px'
    locationPar.style.textTransform = 'uppercase'
    locationPar.style.letterSpacing = '1px'
    locationPar.style.marginBottom = '20px'
    locationPar.style.lineHeight = '22px'
    locationPar.innerHTML = 'Below is your location: '
    if(Object.values(locationCoordinates).length !== 0) {
        validateForm.appendChild(locationPar)
    }
    let latlon = locationCoordinates.latitude + ',' + locationCoordinates.longitude;
    let img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyCUWzvTm9vwPpmQzpBM83ptvk39gIQY3zM";
    let map = document.createElement('div')
    map.innerHTML = "<img src='"+img_url+"'>";
    validateForm.appendChild(map)

    finishConsultBtn = document.createElement('button')
    finishConsultBtn.setAttribute('class','next-step-btn');
    finishConsultBtn.setAttribute('type','submit')
    finishConsultBtn.setAttribute('form','form-validate')
    finishConsultBtn.setAttribute('onclick','finishConsult()')
    finishConsultBtn.style.marginTop = '20px'
    finishConsultBtn.id = 'finish-consult'
    finishConsultBtn.innerHTML = 'Finish'
    validateForm.appendChild(finishConsultBtn);

}

function finishConsult(e) {
    e.preventDefault();
    toastr.success('Thank you for your time, we will come back to you')
}