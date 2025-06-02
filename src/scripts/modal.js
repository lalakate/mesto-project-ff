let currentOpenPopup = null

export const openPopup = (popup) => {
    if(currentOpenPopup) {
        closePopup(currentOpenPopup)
    }
    popup.classList.add('popup_is-animated')
    void popup.offsetWidth;
    popup.classList.add('popup_is-opened')

    currentOpenPopup = popup

    document.addEventListener('keydown', handleEscapeClose)
    popup.addEventListener('click', handleOverlayClose)

    const form = popup.querySelector('.popup__form');
} 

export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened')
    currentOpenPopup = null
    document.removeEventListener('keydown', handleEscapeClose)
    popup.removeEventListener('click', handleOverlayClose)
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

