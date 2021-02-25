import { form, imageList, btn, btnGoToUp, input, spinnerBtn } from './refs';
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
  btn.disabled = false;

  btnGoToUp.classList.add('is-hidden');
  spinnerBtn.classList.remove('is-hidden');

  apiService.query = event.target.value;

  apiService
    .imageService()
    .then(data => {
      if (data.length === 0) {
        btn.classList.add('is-hidden');
        error({
          text: 'Тo splits found, please enter another request',
          delay: 2000,
          maxTextHeight: null,
        });
        return;
      }

      if (input.value === '') {
        info({
          text: 'Please enter your request',
          delay: 2000,
        });
        btn.disabled = true;
        return;
      }
      updateMarkup(data);

      btn.classList.remove('is-hidden');
      btn.classList.add('flexbox');
      btnGoToUp.classList.remove('is-hidden');
      btnGoToUp.classList.remove('btn-go-to-up--mod');
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
      if (data.length < 12) {
        updateMarkup(data);
        window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: 'smooth',
        });
        info({
          text: `These are the last ${data.length} results for your query`,
          delay: 4000,
          maxTextHeight: null,
        });
        btnGoToUp.classList.add('btn-go-to-up--mod');
        return;
      }

      updateMarkup(data);
      btn.disabled = false;
      window.scrollTo({
        top:
          document.documentElement.clientHeight +
          document.documentElement.scrollTop,
        behavior: 'smooth',
      });
      // console.log(document.documentElement.scrollTop);
      // console.log(document.documentElement.clientHeight);
    })
    .finally(() => {
      spinnerBtn.classList.add('is-hidden');
    });
}
