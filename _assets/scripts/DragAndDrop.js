let imageUploadContainer = document.querySelector('.image-upload');
let imagesUploaded = []
imageUploadContainer.ondragover = (e) => {
    e.preventDefault();
}
imageUploadContainer.ondrop = e => {
    e.preventDefault();
    let files = e.target.files;
    if (!files || files.length === 0)
        files = (e.dataTransfer ? e.dataTransfer.files : e.originalEvent.dataTransfer.files);
    console.log(files)
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let imagesArea = document.querySelector('.image-upload');
            let fileReader = new FileReader()
            fileReader.onload = (e) => {
                let draggedImage = new Image()
                draggedImage.src = e.target.result
                draggedImage.id = "image-" + imagesUploaded.length;
                draggedImage.classList.add('uploaded-image');
                draggedImage.selected = 0;
                imagesUploaded.push(draggedImage);
                imagesArea.appendChild(draggedImage);

                let checkedInput = document.createElement('input')
                checkedInput.setAttribute('type','checkbox');
                checkedInput.id = 'checkbox-' + (imagesUploaded.length - 1);

                checkedInput.addEventListener('change', (e) => {
                    
                    let checkboxId = e.target.id
                    let imgSelectedId = 'image-'+checkboxId.split('-')[1];
                    let selectedImg = document.getElementById(imgSelectedId);
                    if(e.target.checked) {
                        selectedImg.selected = 1
                        deleteImageBtn.style.visibility = 'visible'
                    } else {
                        selectedImg.selected = 0
                        deleteImageBtn.style.visibility = 'hidden'
                    }
                })
                imagesArea.append(checkedInput);
            }
            fileReader.readAsDataURL(files[i])
        }
    }
}

function removeImages() {
    let imagesToBeRemoved = []
    imagesUploaded.forEach( (el) => {
        if(el.selected === 1) {
            imagesToBeRemoved.push(el)
        }
    })
    imagesToBeRemoved.forEach( (el) => {
        let selectedCheckbox = document.getElementById('checkbox-' + el.id.split('-')[1])
        selectedCheckbox.parentNode.removeChild(selectedCheckbox)
        el.parentNode.removeChild(el)
        let removedPos = imagesUploaded.indexOf(el)
        if(removedPos > -1) {
            imagesUploaded.splice(removedPos,1)
        }
    })
}