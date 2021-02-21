import template from '../templates/template.hbs';
import refs from './refs';

function updateMarkup(items) {
  const markup = template(items);
  refs.imageList.insertAdjacentHTML('beforeend', markup);
}

export default updateMarkup;
