import { galleryItems } from './gallery-items.js';
// Change code below this 
import * as basicLightbox from 'basiclightbox'

const instance = basicLightbox.create(`
    <img src="assets/images/image.png" width="800" height="600">
`)

instance.show()

// 2. Рендиремо створену розмітку в наш Ul

//вибираємо місце, куда рендиремо
const imageContainer = document.querySelector(`.gallery`);
// записуэмо створену розмытку в константу
const cardsMarkup = createImageCardMarkup(galleryItems);

// рендиремо cardsMarkup через insertAdjacentHTML, який розпарсює один великий ряядок
imageContainer.insertAdjacentHTML(`beforeend`, cardsMarkup);

//3.Делегування
//вішаємо слухача подій
imageContainer.addEventListener(`click`, onImageContainerClick);


// 1. створюємо динамічну розітку
function createImageCardMarkup(galleryItems) {
    //повертаємо в cardsMarkup створену розмітку з параметрами вхідного масиву
    return galleryItems.map(({ preview, original, description }) => {
        //повертаємо шаблонну строку з необхідниими значеннями preview, original, description з вхідного масиву 
        return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt=""${description}"/>
        </a>
        </li>`;
    }).join(``);
}

// функція обробки кліка на контейнері
function onImageContainerClick(e) {
    //задаємо умову при якій будемо відловлювати кліки лише на зображенні
    const isGalleryLinkEl = e.turget.classList.contains(`gallery__link`);
    if (!isGalleryLinkEl) {
        return
    };

//отриуємо доступ до всіх елементів нашого малюнка
    const imgEl = e.turget;

//  шукаємо посилання на прабатька цього елемента через метод closest
    const parentImgCard = imgEl.closest(`.gallery__item`);

    //виклик функції видалення класу is - active
    removeActiveCardClass();
     //виклик функції додавання класу `is - active` з параметром parentImgCard) 
    addActiveCardClass(parentImgCard);

// виклик функції відкриття модального вікна    
    openImgModal(imgEl.dataset.original);
}

// функція видалення класу is - active
function removeActiveCardClass() {

    // - видаляємо клас
    //шукаємо поточну активну картку - елемент з класом gallery__item, який ще має клас is-active
    const curentActiveCard = document.querySelector(`.gallery__item.is-active`);

    if (curentActiveCard) {
        curentActiveCard.classList.remove(`is - active`);
    }
};

// функція додавання класу is - active
function addActiveCardClass(card) {

   // вішаємо клас "is-active" на прабатька parentImgCard
    card.classList.add(`is-active`);
};

// функція відкриття модального вікна
function openImgModal(color) {
    document.body.backgraundColor = color
};

