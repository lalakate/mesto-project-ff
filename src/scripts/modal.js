const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const editPopUp = document.querySelector('.popup_type_edit')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const editForm = document.forms['edit-profile']
const closeButtons = document.querySelectorAll('.popup__close')
const addPopUp =document.querySelector('.popup_type_new-card')

let currentOpenPopup = null

export const openPopup = (popup) => {
    if(currentOpenPopup) {
        closePopup(currentOpenPopup)
    }

    if(popup === editPopUp) {
        editForm.name.value = profileName.textContent
        editForm.description.value = profileDescription.textContent
    }

    popup.classList.add('popup_is-animated')
    void popup.offsetWidth;
    popup.classList.add('popup_is-opened')

    currentOpenPopup = popup

    document.addEventListener('keydown', handleEscapeClose)
    document.addEventListener('click', handleOverlayClose)
} 

export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened')
    
    currentOpenPopup = null
    
    document.removeEventListener('keydown', handleEscapeClose)
}

const handleEscapeClose = (evt) => {
    if(evt.key === 'Escape' && currentOpenPopup) {
        closePopup(currentOpenPopup)
    }
}

const handleOverlayClose = (evt) => {
    if(evt.target === currentOpenPopup){
        closePopup(currentOpenPopup)
    }
}

const editProfile = (evt) => {
    evt.preventDefault();
    profileName.textContent = editForm.name.value;
    profileDescription.textContent = editForm.description.value;
    closePopup(editPopUp);
}

editButton.addEventListener('click', () => openPopup(editPopUp))
addButton.addEventListener('click', () => openPopup(addPopUp))
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup')
        if (popup) {
            closePopup(popup)
        }
    })
})
editForm.addEventListener('submit', editProfile)