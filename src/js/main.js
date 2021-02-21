import refs from './refs';
import debounce from 'lodash.debounce';
import imgService from './imgService';
// import apiService from './apiService';
import updateMarkup from './update-markup';

refs.form.addEventListener('input', debounce(requestHandler, 750));

let searchQuery = '';
let page = 1;
function requestHandler(event) {
  event.preventDefault();
  searchQuery = refs.input.value;
  page = 1;
  imgService.apiService(searchQuery, page).then(data => {
    updateMarkup(data);
    page++;
  });
}

function loadMore() {
  imgService.apiService(searchQuery, page).then(data => {
    updateMarkup(data);
    page++;
  });
}

refs.btn.addEventListener('click', loadMore);
