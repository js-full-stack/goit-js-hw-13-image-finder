import { form, imageList, btn, btnGoToUp, input } from './refs';
import { error, info, success } from './notification';

import debounce from 'lodash.debounce';
import apiService from './apiService';
import updateMarkup from './update-markup';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

form.addEventListener('input', debounce(requestHandler, 750));
btn.addEventListener('click', loadMore);
btnGoToUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
imageList.addEventListener('click', openOriginImgOnClick);

function requestHandler(event) {
  event.preventDefault();
  apiService.resetPage();
  imageList.innerHTML = '';
  btn.classList.remove('flexbox');
  btn.classList.add('is-hidden');
  btnGoToUp.classList.add('is-hidden');

  apiService.query = event.target.value;

  apiService.imageService().then(data => {
    if (data.length === 0) {
      return error({
        text: 'Тo splits found, please enter another request',
        delay: 2000,
        maxTextHeight: null,
      });
    }
    updateMarkup(data);
    btn.classList.remove('is-hidden');
    btn.classList.add('flexbox');
    btnGoToUp.classList.remove('is-hidden');
  });
}

function loadMore() {
  apiService.imageService().then(data => {
    if (data.length === 0) {
      return info({
        text: 'On request ended results',
        delay: 2000,
        maxTextHeight: null,
      });
    } else {
      updateMarkup(data);

      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    }
  });
}

function openOriginImgOnClick(event) {
  const tagName = event.target.tagName;
  const originalImg = event.target.dataset.source;

  if (tagName === 'IMG') {
    const instance = basicLightbox.create(`
    <img src="${originalImg}">`);
    instance.show();
  }
}

// const key = '20244739-961dea85be28be305e8bcd893';
// const baseURL = 'https://pixabay.com/api/';
// const url = `${baseURL}?image_type=photo&orientation=horizontal&q=page=&per_page=12&key=${key}`;

// fetch(url).then(res => res.json());
console.dir(input);
