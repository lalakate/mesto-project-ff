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
