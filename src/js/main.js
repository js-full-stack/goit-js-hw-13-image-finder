import {
  form,
  imageList,
  btn,
  btnGoToUp,
  input,
  spinnerBtn,
  spinnerModal,
} from './refs';
import { error, info } from './notification';
import openModalOnClick from './modal';

import debounce from 'lodash.debounce';
import apiService from './apiService';
import updateMarkup from './update-markup';
import 'basiclightbox/dist/basicLightbox.min.css';
// import { Spinner } from 'spin.js';

form.addEventListener('input', debounce(requestHandler, 750));
btn.addEventListener('click', loadMore);
btnGoToUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
imageList.addEventListener('click', openModalOnClick);

function requestHandler(event) {
  event.preventDefault();
  apiService.resetPage();
  imageList.innerHTML = '';
  btn.classList.remove('flexbox');
  btnGoToUp.classList.add('is-hidden');
  spinnerBtn.classList.remove('is-hidden');

  apiService.query = event.target.value;

  apiService
    .imageService()
    .then(data => {
      if (data.length === 0) {
        return error({
          text: 'Тo splits found, please enter another request',
          delay: 2000,
          maxTextHeight: null,
        });
      }
      if (input.value === '') {
        return info({
          text: 'Please enter your request',
          delay: 2000,
        });
      }
      updateMarkup(data);
      btn.classList.remove('is-hidden');
      btn.classList.add('flexbox');
      btnGoToUp.classList.remove('is-hidden');
    })
    .finally(() => {
      spinnerBtn.classList.add('is-hidden');
    });
}

function loadMore() {
  spinnerBtn.classList.remove('is-hidden');
  btn.disabled = true;

  apiService
    .imageService()
    .then(data => {
      if (data.length === 0) {
        return info({
          text: 'On request ended results',
          delay: 2000,
          maxTextHeight: null,
        });
      }

      updateMarkup(data);
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .finally(() => {
      spinnerBtn.classList.add('is-hidden');
      btn.disabled = false;
    });
}
