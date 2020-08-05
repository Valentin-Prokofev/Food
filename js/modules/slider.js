function slider() {
    
    //создаем слайдер(в последующем можно добавить обработчик на свайпы и на драг движениия)

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),   
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),  //окошко через которое будет виден текущий слайд
          width = window.getComputedStyle(slidesWrapper).width;

    function changeOpasityDot() {
        dots.forEach(dot => dot.style.opacity = '.5');     //изначально у каждой точки устанавливаем стили
        dots[slideIndex - 1].style.opacity = 1;            // меняем стиль прозрачности при перемещении картинки на слайдере у точки
    }    
    
    function changeCurrentNumberSlider() {
        if (slides.length < 10) {                         //текущая нумерация слайдера
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {                                                //изминение нумерации слайдера, инициализация
        total.textContent = slides.length; 
        current.textContent = slideIndex; 
    }


    slidesField.style.width = 100 * slides.length + '%'; //ширина нашего списка слайдов
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';           //плавное перемещение слайдов

    slidesWrapper.style.overflow = 'hidden';             // все что будет под этим тегом в этих размерах будет скрыто для пользователя

    slides.forEach(slide => {                             //каждому отдельному слайду устанавливаем одинаковую ширину
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'), //создаем обертку для точек и стилизуем ее
          dots = [];                                 //массив для изменения класса активности

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);                       //добавляем обертку в слайдер

    for (let i = 0; i < slides.length; i++) {       
        const dot = document.createElement('li');     //создаем точки в зав-ти от кол-ва слайдов
        dot.setAttribute('data-slide-to', i + 1);    // к какому слайду какая точка относится
        dot.style.cssText = `                        // стили для точек
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 25px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;                 // стиль активности точки 
        }
        indicators.append(dot);                      //добавляем в обертку точки
        dots.push(dot);                              // пихаем точки в массив
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {  //когда наш количество слайдов закончилось, а мы жмем next то отступ сбрасывается на ноль и переходит к первой картинке
        offset = 0;
        } else {
            offset += deleteNotDigits(width);       //если впереди еще есть слайды, отступ прибавляется в размере одного слайда
        }

        slidesField.style.transform = `translateX(-${offset}px)`;   //устанавливаем на сколько наш длинный список слайдов будет сдвигаться вправо
        if (slideIndex == slides.length) {                 // при последнем слайде и нажатии на кнопку next выводит первый слайдер
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        changeCurrentNumberSlider();
        changeOpasityDot();
    });

    prev.addEventListener('click', () => {
        if (offset == 0 ) {                                               
        offset = deleteNotDigits(width) * (slides.length - 1);   //когда наш количество слайдов закончилось, а мы жмем prev то отступ сбрасывается на ноль и переходит к первой картинке
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;   //устанавливаем на сколько наш длинный список слайдов будет сдвигаться влеово

        if (slideIndex == 1) {
            slideIndex = slides.length;              // при первом слайде и нажатии на кнопку prev выводит последний слайдер
        } else {
            slideIndex--;
        }

        changeCurrentNumberSlider();
        changeOpasityDot();
    });

    dots.forEach(dot => {                                             // по клику на точку передвигаем картинки на слайдере
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');    // получаем атрибут при клике на точку

            slideIndex = slideTo;      
            offset = deleteNotDigits(width) * (slideTo - 1); 

            slidesField.style.transform = `translateX(-${offset}px)`;

            changeCurrentNumberSlider();
            changeOpasityDot();
        });
    });

    // showSlides(slideIndex); 

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length; 
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
                                                                 //простой способ создания слайдера
    //     if (n < 1) {
    //         slideIndex = slides.length;

    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {                                               
    //         current.textContent = slideIndex; 
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });


}

module.exports = slider;