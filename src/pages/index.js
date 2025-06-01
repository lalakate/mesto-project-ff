import './index.css'
import { createCard, deleteCard, like } from '../scripts/card.js'
import { openPopup, closePopup } from '../scripts/modal.js'
import { editProfile, getInitialCards, getProfileInfo, addNewCard, updateAvatar } from '../scripts/api.js'

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const editPopUp = document.querySelector('.popup_type_edit')
const editAvatarPopUp = document.querySelector('.popup_type_edit-avatar')
const addPopUp = document.querySelector('.popup_type_new-card')
const cardImagePopup = document.querySelector('.popup_type_image')
const popupImage = cardImagePopup.querySelector('.popup__image')
const popupCaption = cardImagePopup.querySelector('.popup__caption')
const closeButtons = document.querySelectorAll('.popup__close')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const editForm = document.forms['edit-profile']
const createForm = document.forms['new-place']
const editAvatarForm = document.forms['edit-avatar']
const editAvatarButton = document.querySelector('.profile__image__edit-button')
const placesList = document.querySelector('.places__list')

editButton.addEventListener('click', () => {
    editForm.name.value = profileName.textContent
    editForm.description.value = profileDescription.textContent
    openPopup(editPopUp)
})

editAvatarButton.addEventListener('click', () => {
    editAvatarForm.avatar.value = ''
    openPopup(editAvatarPopUp)
})

addButton.addEventListener('click', () => openPopup(addPopUp))

closeButtons.forEach(button => {
    const popup = button.closest('.popup')
    button.addEventListener('click', () => closePopup(popup))
})

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const submitButton = editForm.querySelector('.popup__button')
    const originalText = submitButton.textContent
    submitButton.textContent = 'Сохранение...'
    editProfile(editForm.name.value, editForm.description.value)
    .then(() => {
        profileName.textContent = editForm.name.value
        profileDescription.textContent = editForm.description.value
        closePopup(editPopUp)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        submitButton.textContent = originalText
    })
})

createForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const cardData = {
        name: createForm['place-name'].value,
        link: createForm.link.value
    }
    const submitButton = createFormForm.querySelector('.popup__button')
    const originalText = submitButton.textContent
    submitButton.textContent = 'Сохранение...'
    addNewCard(cardData.name, cardData.link)
    .then(newCard => {
        const card = createCard(newCard, deleteCard, openPopup, like, popupImage, popupCaption, cardImagePopup, window.currentUserId)
        placesList.prepend(card)
        closePopup(addPopUp)
        createForm
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        submitButton.textContent = originalText
    })
})

editAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const avatarUrl = editAvatarForm.avatar.value
    editAvatarForm.avatar.value = ''
    const submitButton = editAvatarForm.querySelector('.popup__button')
    const originalText = submitButton.textContent
    submitButton.textContent = 'Сохранение...'
    updateAvatar(avatarUrl)
    .then(profile => {
        document.querySelector('.profile__image').style.backgroundImage = `url('${profile.avatar}')`;
        closePopup(editAvatarPopUp);
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        submitButton.textContent = originalText
    })
})

getProfileInfo()
.then(profile => {
    profileName.textContent = profile.name
    profileDescription.textContent = profile.about
    window.currentUserId = profile._id
    document.querySelector('.profile__image').style.backgroundImage = `url('${profile.avatar}')`

    getInitialCards()
    .then(cards => {
        cards.forEach(cardData => {
            const card = createCard(
                cardData,
                deleteCard,
                openPopup,
                like,
                popupImage,
                popupCaption,
                cardImagePopup,
                window.currentUserId 
            );
            placesList.append(card);
        });
    })
    .catch(err => {
        console.log(err)
    });
})
.catch(err => {
    console.log(err)
})
