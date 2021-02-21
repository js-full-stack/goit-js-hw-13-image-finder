import debounce from 'lodash.debounce';
import imgService from './apiService';
import updateMarkup from './update-markup';
import { form, input, imageList, btn } from './refs';
form.addEventListener('input', debounce(requestHandler, 750));

function requestHandler(event) {
  event.preventDefault();
  imgService.resetPage();
  imageList.innerHTML = '';
  imgService.query = event.target.value;
  imgService.apiService().then(updateMarkup);
}

function loadMore() {
  imgService.apiService().then(updateMarkup);
}

btn.addEventListener('click', loadMore);
