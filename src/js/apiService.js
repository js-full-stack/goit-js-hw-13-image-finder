export default {
  searchQuery: '',
  page: 1,

  apiService() {
    const key = '20244739-961dea85be28be305e8bcd893';
    const baseURL = 'https://pixabay.com/api/';
    const url = `${baseURL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=3&key=${key}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.page++;
        return hits;
      });
  },
  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
