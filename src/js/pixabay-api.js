const apiKey = '45704413-78352b289562c0261d4e7c072';
const baseUrl = 'https://pixabay.com/api/';


export function getGalleryData(queryValue) {
 
  const searchParams = new URLSearchParams({
    key: apiKey,           
    q: queryValue,            
    image_type: 'photo',      
    orientation: 'horizontal',
    safesearch: 'true',        
  });


  return fetch(`${baseUrl}?${searchParams}`)
    .then(response => {
      
      if (!response.ok) {
      
        throw new Error(response.status);
      }
   
      return response.json();
    });
}

