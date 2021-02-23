export default {
  searchQuery: '',
  page: 1,

  imageService() {
    const key = '20244739-961dea85be28be305e8bcd893';
    const baseURL = 'https://pixabay.com/api/';
    const url = `${baseURL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${key}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page++;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
