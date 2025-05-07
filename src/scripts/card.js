export const deleteCard = (cardElement) => {
    cardElement.remove();
}
  
export const like = (likeButton) => {
    likeButton.classList.toggle('card__like-button_is-active');
}
  
export const createCard = (card, deleteCard, openPopup, like, popupImage, popupCaption, cardImagePopup) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
  
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
  
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    likeButton.addEventListener('click', () => like(likeButton));
  
    cardImage.addEventListener('click', () => openCardImage(card, popupImage, popupCaption, cardImagePopup, openPopup))
  
    return cardElement;
}

const openCardImage = (card, popupImage, popupCaption, cardImagePopup, openPopup) => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openPopup(cardImagePopup);
}
  