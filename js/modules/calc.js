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