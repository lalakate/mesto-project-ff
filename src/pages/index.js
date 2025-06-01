import './index.css'
import { createCard, deleteCard, like } from '../scripts/card.js'
import { openPopup, closePopup, setButtonLoading } from '../scripts/modal.js'
import { editProfile, getInitialCards, getProfileInfo, addNewCard, updateAvatar } from '../scripts/api.js'
import { enableValidation, resetValidation } from '../scripts/validation.js'

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
const avatarImage = document.querySelector('.profile__image')

enableValidation()

editButton.addEventListener('click', () => {
    editForm.name.value = profileName.textContent
    editForm.description.value = profileDescription.textContent
    openPopup(editPopUp)
})

editAvatarButton.addEventListener('click', () => {
    editAvatarForm.reset()
    resetValidation(editAvatarForm)
    openPopup(editAvatarPopUp)
})

addButton.addEventListener('click', () => {
    createForm.reset()
    openPopup(addPopUp)
})

closeButtons.forEach(button => {
    const popup = button.closest('.popup')
    button.addEventListener('click', () => closePopup(popup))
})

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = editForm.querySelector('.popup__button');
    // Set button loading state
    setButtonLoading(submitButton, true);

    editProfile(editForm.name.value, editForm.description.value)
      .then(() => {
          profileName.textContent = editForm.name.value;
          profileDescription.textContent = editForm.description.value;
          closePopup(editPopUp);
      })
      .catch(err => {
          console.log(err);
      })
      .finally(() => {
          setButtonLoading(submitButton, false);
      });
});

createForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const cardData = {
        name: createForm['place-name'].value,
        link: createForm.link.value
    }
    const submitButton = createForm.querySelector('.popup__button')
    setButtonLoading(submitButton, true)
    addNewCard(cardData.name, cardData.link)
    .then(newCard => {
        const card = createCard(newCard, deleteCard, openPopup, like, popupImage, popupCaption, cardImagePopup, window.currentUserId)
        placesList.prepend(card)
        closePopup(addPopUp)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        setButtonLoading(submitButton, false)
    })
})

editAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const avatarUrl = editAvatarForm.avatar.value;
    editAvatarForm.avatar.value = '';
    const submitButton = editAvatarForm.querySelector('.popup__button');
    setButtonLoading(submitButton, true);

    updateAvatar(avatarUrl)
      .then(profile => {
          document.querySelector('.profile__image').style.backgroundImage = `url('${profile.avatar}')`;
          closePopup(editAvatarPopUp);
      })
      .catch(err => {
          console.log(err);
      })
      .finally(() => {
          setButtonLoading(submitButton, false);
      });
});

getProfileInfo()
.then(profile => {
    profileName.textContent = profile.name
    profileDescription.textContent = profile.about
    window.currentUserId = profile._id
    avatarImage.style.backgroundImage = `url('${profile.avatar}')`

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
