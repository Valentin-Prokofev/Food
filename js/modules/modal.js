function modal() {
     //Модальное окно через кнопку и таймер

     const modalTrigger = document.querySelectorAll('[data-model]'),
     modal = document.querySelector('.modal');

 function openModal() {
     modal.classList.add('show');
     modal.classList.remove('hide');
     document.body.style.overflow = 'hidden';
     clearInterval(modalTimerId);
 }

 modalTrigger.forEach(btn => {
     btn.addEventListener('click', openModal);
 });

 function closeModal() {
     modal.classList.add('hide');
     modal.classList.remove('show');
     document.body.style.overflow = '';
 }

 modal.addEventListener('click', (e) => {
     if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal();
     }
 });

 document.addEventListener('keydown', (e) => {
     if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
     }
 });

 const modalTimerId = setTimeout(openModal, 500000000000);
 function showModalByScroll() {
     if (window.pageYOffset + document.documentElement.
         clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
     }
 }
 window.addEventListener('scroll', showModalByScroll);

 //Используем классы для карточек


}

module.exports = modal;