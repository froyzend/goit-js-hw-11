import { getGalleryData } from './js/pixabay-api';
import { addLoader, removeLoader, markup } from './js/render-functions';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

// Ініціалізуємо SimpleLightbox
let lightbox = null;

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { searchQuery } = Object.fromEntries(formData.entries());
  const searchValue = searchQuery.trim();

  if (!searchValue) {
    iziToast.error({
      title: 'Error',
      message: 'The search query is empty.',
      position: 'topRight',
    });
    return;
  }

  
  gallery.innerHTML = '';

  
  addLoader(gallery);


  if (lightbox) {
    lightbox.destroy();
  }

  getGalleryData(searchValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          position: 'topRight',
          title: 'Info',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      // Створюємо HTML-розмітку для галереї
      const galleryMarkup = markup(data);
      gallery.insertAdjacentHTML('beforeend', galleryMarkup);

     
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch(error => {
      console.error('Помилка:', error);
      iziToast.error({
        title: 'Error',
        message: `Error: ${error.message}`,
        position: 'topRight',
      });
    })
    .finally(() => {
      removeLoader(); 
    });
}
