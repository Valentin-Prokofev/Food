/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
    //калькулятор расчета калорий

    const result = document.querySelector('.calculating__result span'); //итоговое количество калорий

    let sex, height, weight, age,
        ratio = 1.375; //дефолтное значение активности

    if (localStorage.getItem('sex')) { //проверяем есть ли значение в БД браузера
        sex = localStorage.getItem('sex'); //если есть присваеваем
    } else {
        sex = 'female'; //если нет то устанавливаем дефолтное значение пола
        localStorage.setItem('sex', 'female'); //и записываем его в БД
    }

    if (localStorage.getItem('ratio')) { //проверяем есть ли значение в БД браузера
        ratio = localStorage.getItem('ratio'); //если есть присваеваем
    } else {
        ratio = 1.375; //если нет то устанавливаем дефолтное значение пола
        localStorage.setItem('ratio', 1.375); //и записываем его в БД
    }

    function initLocalStorage(selector, activeClass) { //применяем класс активности для данных из localStorage
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass); //удаляем класс активности у всех элементов в диве
            if (elem.getAttribute('id') === localStorage.getItem('sex')) { //сравниваем соответствие атрибута и данных из БД браузера
                elem.classList.add(activeClass); // добавляем класс активности той плашечке которая прописана в БД
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { //сравниваем соответствие атрибута и данных из БД браузера
                elem.classList.add(activeClass); // добавляем класс активности той плашечке которая прописана в БД
            }
        });
    }

    initLocalStorage('#gender div', 'calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { //проверка данных на заполнения для расчета, все должно быть true
            result.textContent = '____';
            return; // пропускаем вычисления
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) { // функция для получения статических данных
        const elements = document.querySelectorAll(selector); //получаем все статические плашечки

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => { //обработчик события на ratio
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); // и если есть такой атрибут то берем его значение
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //записываем значение в БД браузера
                } else {
                    sex = e.target.getAttribute('id'); // а если пользователь выбирает пол, то приписывается id.
                    localStorage.setItem('sex', e.target.getAttribute('id')); //записываем значение в БД браузера
                }

                elements.forEach(elem => { //убираем класс активности у всех плашечек
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass); // и назначаем тот на который кликнули

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); //вызываем на выборе пола
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); //вызываем на выборе уровня активности

    function getDynamicInformation(selector) { //функция для получения динамических данных
        const input = document.querySelector(selector);

        input.addEventListener('input', () => { //кейзом проверяем куда какое значение ввели и записываем это значенеи в переменную

            if (input.value.match(/\D/g)) { //проверяем на введение не цифр 
                input.style.border = '3px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 70;
            this.changeToRUR();
        }

        changeToRUR() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span>
                    руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Не можем что то зафетчить ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    // getResourse('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price,}) => {                           //создание карточки через db.json
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price,
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // getResourse('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price,}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>                //вариант с динамическим созданием карточки
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span>
    //                 руб/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms(){
     //Forms

     const forms = document.querySelectorAll('form');

     const message = {
         loading: 'img/form/054 spinner.svg',
         success: 'Спасибо! Скоро мы с вами свяжемся, или не скоро',
         failure: 'Что-то пошло не так...'
     };
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
     const postData = async (url, data) => {
         const res = await fetch(url, {
             method: 'POST',
                 headers: {
                  'Content-type': 'application/json'
                 },
                 body: data
         });
 
         return await res.json();
     };
 
     function bindPostData(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault(); 
 
             let statusMessage = document.createElement('img');
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
             display: block;
             margin: 0 auto;
             `;
             form.insertAdjacentElement('afterend', statusMessage);
 
             const formData = new FormData(form);
 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
                 
             postData('http://localhost:3000/requests', json)
             .then(data => {
                 console.log(data);
                 showThinksModal(message.success);
                 statusMessage.remove();
             }).catch(() => {
                 showThinksModal(message.failure);
             }).finally(() => {
                 form.reset();
             });
 
         });
     }
 
     function showThinksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');
 
         prevModalDialog.classList.add('hide');
         openModal();
 
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
         <div class='modal__content'>
             <div class='modal__close' data-close>×</div>
             <div class='modal__title'>${message}</div>
         </div>
         `;
 
         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hide');
             closeModal();
         }, 4000);
     }
}


module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
    // забабахали переключение табов

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    // Устанавливаем таймер

    const deadLine = '2020-08-20';

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': 1,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(uppdateClock, 1000);

        uppdateClock();

        function uppdateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);




}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
         modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
         timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
         cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
         calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
         forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
         slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

   tabs();      
   modal();      
   timer();      
   cards();      
   calc();      
   forms();      
  slider();       
});




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map