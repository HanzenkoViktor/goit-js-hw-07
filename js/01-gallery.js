import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryCardSet = galleryItems.map(createGalleryCard).join("");

galleryRef.insertAdjacentHTML("afterbegin", galleryCardSet);

galleryRef.addEventListener("click", onOpenModal);

let modal; // = basicLightbox.create

function createGalleryCard({ preview, original, description }) {
  return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
}

function onOpenModal(e) {
  e.preventDefault();
  const isImage = e.target.classList.contains("gallery__image");

  if (!isImage) {
    return;
  }
  createModal(e.target).show();
}

function createModal(params) {
  const html = `<div class="modal">
  <img src="${params.dataset.source}" alt="${params.alt}" />
  </div>`;

  modal = basicLightbox.create(html, {
    onShow: () => {
      window.addEventListener("keyup", onCloseModalKeyUp);
    },
    onClose: () => {
      window.removeEventListener("keyup", onCloseModalKeyUp);
    },
  });
  return modal;
}

function onCloseModalKeyUp(e) {
  console.log(e.code);
  if (e.code !== "Escape") return;
  modal.close();
}
