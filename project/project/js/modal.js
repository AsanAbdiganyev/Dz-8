const modal = document.querySelector('.modal')
const triggerButton = document.querySelector('#btn-get')
const closeButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

const showModalOnScroll = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        openModal(); // Открываем модальное окно
        window.removeEventListener('scroll', showModalOnScroll); // Убираем обработчик
    }
};

triggerButton.onclick = () => openModal()
closeButton.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        openModal()
        window.removeEventListener('scroll', handleScroll)
    }
}

window.addEventListener('scroll', handleScroll)

const showModalAfterDelay = () => {
    setTimeout(() => {
        openModal()
        window.removeEventListener('scroll', handleScroll)
    }, 10000)
}

window.addEventListener('load', showModalAfterDelay)
