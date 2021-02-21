import refs from './refs';
import debounce from 'lodash.debounce';
import apiService from './apiService';
import updateMarkup from './update-markup';

let searchQuery = '';
let page = 1;
refs.form.addEventListener('input', debounce(requestHandler, 500));

function requestHandler(event) {
  event.preventDefault();
  searchQuery = refs.input.value;

  page = 1;
  apiService(refs.input.value).then(hits => {
    updateMarkup(hits);
    page += 1;
  });
}

refs.btn.addEventListener('click', () => {
  apiService(searchQuery, page).then(hits => {
    updateMarkup(hits);
    page += 1;
  });
});

// function loadMoreIMG(page) {

// }
