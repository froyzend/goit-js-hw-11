// Імпорт функції для запиту до API
import { getGalleryData } from './js/pixabay-api';

// Імпорт функцій для роботи з інтерфейсом з файлу render-functions.js
import { addLoader, removeLoader, markup } from './js/render-functions';

// Описаний у документації
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; // Імпорт стилів для SimpleLightbox

// Отримуємо форму пошуку
const form = document.querySelector('.search-form');

// Отримуємо контейнер для галереї
const gallery = document.querySelector('.gallery');

// Ініціалізуємо SimpleLightbox для галереї
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  // отримання даних з форми
  const formData = new FormData(event.target);

  // Преобразовуємо FormData у звичайний об'єкт і отримуємо поле пошуку
  const { searchQuery } = Object.fromEntries(formData.entries());

  // Обрізаємо зайві пробіли на початку та в кінці введеного значення
  const searchValue = searchQuery.trim();

  // Якщо значення пошуку порожнє, показуємо помилку і виходимо з функції
  if (!searchValue) {
    iziToast.error({
      title: 'Error',
      message: 'The search query is empty.',
      position: 'topRight',
    });
    return;
  }

  // Додаємо анімацію лоадера до інтерфейсу
  addLoader(gallery);

  getGalleryData(searchValue)
    .then(data => {
      // Очищаємо галерею перед додаванням нових елементів
      gallery.innerHTML = '';

      // Якщо за запитом не знайдено зображень, показуємо відповідне сповіщення
      if (data.hits.length === 0) {
        iziToast.info({
          position: 'topRight',
          title: 'Info',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      // Створюємо HTML-розмітку для галереї на основі отриманих даних
      const galleryMarkup = markup(data);

      // Додаємо створену розмітку до контейнера галереї
      gallery.insertAdjacentHTML('beforeend', galleryMarkup);

      // Оновлюємо SimpleLightbox після додавання нових елементів
      lightbox.refresh();
    })
    .catch(error => {
      // Якщо виникла помилка, показуємо сповіщення з описом помилки
      console.error('Помилка:', error);
      iziToast.error({
        title: 'Error',
        message: `Error: ${error.message}`,
        position: 'topRight',
      });
    })
    .finally(() => {
      // Видаляємо лоадер після завершення запиту
      removeLoader();
    });
}
