const apiKey = '45704413-78352b289562c0261d4e7c072';
const baseUrl = 'https://pixabay.com/api/';

// Функція для отримання даних з API Pixabay
export function getGalleryData(queryValue) {
  // Створюємо параметри запиту
  const searchParams = new URLSearchParams({
    key: apiKey,              // Без підкреслення
    q: queryValue,            // Пошуковий запит
    image_type: 'photo',      // Тип зображення
    orientation: 'horizontal',// Орієнтація
    safesearch: 'true',       // Безпечний пошук
  });

  // Виконуємо запит до API і повертаємо результат
  return fetch(`${baseUrl}?${searchParams}`)
    .then(response => {
      // Перевіряємо, чи запит успішний (код 200)
      if (!response.ok) {
        // Якщо запит не успішний, кидаємо помилку
        throw new Error(response.status);
      }
      // Повертаємо дані у форматі JSON
      return response.json();
    });
}

