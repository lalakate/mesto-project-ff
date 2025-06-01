import { deleteCard as deleteCardFromApi, likeCard, dislikeCard } from "./api";

export const deleteCard = (cardElement, cardId) => {
    deleteCardFromApi(cardId)
    .then(() => {
        cardElement.remove();
    })
}
  
export const like = (likeButton) => {
    const cardId = likeButton.dataset.cardId;
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const apiCall = isLiked ? dislikeCard : likeCard;

    apiCall(cardId)
    .then((res) => {
        const currentUserId = String(window.currentUserId);
        // Compare as strings for safety
        const userLiked = res.likes.some(user => String(user._id) === currentUserId);
        if (userLiked) {
            likeButton.classList.add('card__like-button_is-active');
        } else {
            likeButton.classList.remove('card__like-button_is-active');
        }
        const likeCount = likeButton.closest('.card').querySelector('.card__like-count');
        likeCount.textContent = res.likes.length;
        likeButton.dataset.cardId = res._id;
    })
    .catch(err => {
        console.log(err);
    });
}
  
export const createCard = (card, deleteCard, openPopup, like, popupImage, popupCaption, cardImagePopup, currentUserId) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    likeCount.textContent = card.likes.length;
  
    if(card.owner && card.owner._id === currentUserId) {
        deleteButton.addEventListener('click', () => deleteCard(cardElement, card._id));
    }
    else {
        deleteButton.style.display = 'none'
    }

    likeButton.dataset.cardId = card._id;
    likeButton.addEventListener('click', () => like(likeButton));
  
    cardImage.addEventListener('click', () => openCardImage(card, popupImage, popupCaption, cardImagePopup, openPopup))
  
    if (card.likes.some(user => String(user._id) === String(currentUserId))) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }
  
    return cardElement;
}

const openCardImage = (card, popupImage, popupCaption, cardImagePopup, openPopup) => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openPopup(cardImagePopup);
}
