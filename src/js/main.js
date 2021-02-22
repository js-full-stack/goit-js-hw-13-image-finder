import debounce from 'lodash.debounce';
import apiService from './apiService';
import updateMarkup from './update-markup';
import { form, imageList, btn } from './refs';
form.addEventListener('input', debounce(requestHandler, 750));

function requestHandler(event) {
  event.preventDefault();
  apiService.resetPage();
  imageList.innerHTML = '';
  btn.classList.add('is-hidden');
  apiService.query = event.target.value;

  apiService.imageService().then(data => {
    updateMarkup(data);
    btn.classList.remove('is-hidden');
  });
}

function loadMore() {
  apiService.imageService().then(data => {
    updateMarkup(data);
    window.scrollTo({
      top: 1000000000000,
      behavior: 'smooth',
    });
  });
}

btn.addEventListener('click', loadMore);
