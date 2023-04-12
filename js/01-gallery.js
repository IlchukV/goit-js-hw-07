import { galleryItems } from './gallery-items.js';
// Change code below this 

console.log(galleryItems);

//вибираємо місце, куда рендиремо
const imageContainer = document.querySelector(`.gallery`);

// створюємо динамічну розітку
const createImageCardMarkup = (gallery) => gallery.map(({ preview, original, description }) => 
         `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt=""${description}"/>
        </a>
        </li>`
    ).join(``);


// записуэмо створену розмітку в константу
const cardsMarkup = createImageCardMarkup(galleryItems);

// рендиремо cardsMarkup через insertAdjacentHTML, який розпарсює один великий рядок
imageContainer.insertAdjacentHTML(`afterbegin`, cardsMarkup);

//вішаємо слухача подій
imageContainer.addEventListener(`click`, onImageContainerClick);

// функція обробки кліка на контейнері
function onImageContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();

  galletyRef.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  });
}

