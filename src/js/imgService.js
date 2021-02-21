import refs from './refs';

export default {
  apiService(searchQuery, page = 1) {
    const key = '20244739-961dea85be28be305e8bcd893';
    const baseURL = 'https://pixabay.com/api/';
    const url = `${baseURL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${key}`;

    // refs.imageList.innerHTML = '';
    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => hits);
  },
};
