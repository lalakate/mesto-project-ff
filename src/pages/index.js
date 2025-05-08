import './index.css'
import { initialCards } from '../scripts/cards.js'
import { createCard, deleteCard, like } from '../scripts/card.js'
import { openPopup, closePopup } from '../scripts/modal.js'

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const editPopUp = document.querySelector('.popup_type_edit')
const addPopUp = document.querySelector('.popup_type_new-card')
const cardImagePopup = document.querySelector('.popup_type_image')
const popupImage = cardImagePopup.querySelector('.popup__image')
const popupCaption = cardImagePopup.querySelector('.popup__caption')
const closeButtons = document.querySelectorAll('.popup__close')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const editForm = document.forms['edit-profile']
const createForm = document.forms['new-place']
const placesList = document.querySelector('.places__list')

document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup'))
        closePopup(evt.target)
})

editButton.addEventListener('click', () => {
    editForm.name.value = profileName.textContent
    editForm.description.value = profileDescription.textContent
    openPopup(editPopUp)
})

addButton.addEventListener('click', () => openPopup(addPopUp))

closeButtons.forEach(button => {
    const popup = button.closest('.popup')
    button.addEventListener('click', () => closePopup(popup))
})

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    profileName.textContent = editForm.name.value
    profileDescription.textContent = editForm.description.value
    closePopup(editPopUp)
})

createForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const cardData = {
        name: createForm['place-name'].value,
        link: createForm.link.value
    }
    const card = createCard(cardData, deleteCard, openPopup, like, popupImage, popupCaption, cardImagePopup)
    placesList.prepend(card)
    closePopup(addPopUp)
    createForm.reset()
})

initialCards.forEach(cardData => {
    const card = createCard(cardData, deleteCard, openPopup, like, popupImage, popupCaption, cardImagePopup)
    placesList.append(card)
})
