import { openPopup, closePopup } from "./modal"

const cardImagePopup = document.querySelector('.popup_type_image')
const popupImage = cardImagePopup.querySelector('.popup__image')
const popupCaption = cardImagePopup.querySelector('.popup__caption')
const createForm = document.forms['new-place']
const placesList = document.querySelector('.places__list')
const addPopUp = document.querySelector('.popup_type_new-card')

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const deleteCard = (cardElement) => {
  cardElement.remove()
}

const createCard = (card, deleteCard, openPopup, like) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button')
  
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement)
  })
  
  cardImage.addEventListener('click', () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openPopup(cardImagePopup);
  });

  likeButton.addEventListener('click', () => {
    like(likeButton)
  })
  
  return cardElement;
}

const addCard = (evt) => {
  evt.preventDefault()

  const cardData = {
    name: createForm['place-name'].value,
    link: createForm.link.value
  }

  const card = createCard(cardData, deleteCard, openPopup, like)
  
  placesList.prepend(card)
  closePopup(addPopUp)
}

const like = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active')
}

initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard, openPopup, like);
  placesList.append(cardElement);
});

createForm.addEventListener('submit', addCard)