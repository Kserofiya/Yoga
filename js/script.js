window.addEventListener('DOMContentLoaded', function() {

'use strict';

    // Tabs

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (var i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (var i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadline = '2020-12-08';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
            // hours = Math.floor((t/1000/60/60) % 24),
            // days = Math.floor((t/(1000*60*60*24)));

            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (seconds.textContent < 10) {
                seconds.textContent = '0' + seconds.textContent;
            }
            if (minutes.textContent < 10) {
                minutes.textContent = '0' + minutes.textContent;
            }
            if (hours.textContent < 10) {
                hours.textContent = '0' + hours.textContent;
            }

            if (t.total <= 0) {
                clearInterval(timeInterval);
                seconds.textContent = '00';
                minutes.textContent = '00';
                hours.textContent = '00';
            }
        }
    }
    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        descr = document.querySelector('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    descr.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = 'scroll';
    });

    // Второе задание

// let age = document.getElementById('age');
 
// function showUser(surname, name) {
//          alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
// }
 
// showUser.apply(age, ["Горький","Максим"]);

// Третье задание
// class Options {
// 	constructor(height, width, bg, fontSize, textAlign) {
// 		this.height = height;
// 		this.width = width;
// 		this.bg = bg;
// 		this.fontSize = fontSize;
// 		this.textAlign = textAlign;
// 	}

// 	createDiv() {
// 		let elem = document.createElement('div');
// 		document.body.appendChild(elem);
// 		let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
// 		elem.style.cssText = param;
// 	}
// }

// const item = new Options(300, 350, "red", 14, "center");

// item.createDiv();


// Form
    let message = {
        loading: 'Загрузка...',
        sucess: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    }

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);
        
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.sucess;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
});