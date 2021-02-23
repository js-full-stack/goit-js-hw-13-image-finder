import { form, imageList, btn } from './refs';
import debounce from 'lodash.debounce';
import apiService from './apiService';
import updateMarkup from './update-markup';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

form.addEventListener('input', debounce(requestHandler, 750));
btn.addEventListener('click', loadMore);
imageList.addEventListener('click', openOriginImgOnClick);

function requestHandler(event) {
  event.preventDefault();
  apiService.resetPage();
  imageList.innerHTML = '';
  btn.classList.remove('flexbox');
  btn.classList.add('is-hidden');

  apiService.query = event.target.value;

  apiService.imageService().then(data => {
    updateMarkup(data);
    btn.classList.remove('is-hidden');
    btn.classList.add('flexbox');
  });
}

function loadMore() {
  apiService.imageService().then(data => {
    updateMarkup(data);

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function openOriginImgOnClick(event) {
  const tagName = event.target.tagName;
  const originalImg = event.target.dataset.source;

  if (tagName === 'IMG') {
    const instance = basicLightbox.create(`
    <img src="${originalImg}" width="800">`);
    instance.show();
  }
}

const key = '20244739-961dea85be28be305e8bcd893';
const baseURL = 'https://pixabay.com/api/';
const url = `${baseURL}?image_type=photo&orientation=horizontal&q=page=&per_page=12&key=${key}`;

fetch(url).then(res => res.json());
