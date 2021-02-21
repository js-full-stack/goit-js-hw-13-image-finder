import template from '../templates/template.hbs';
import { imageList } from './refs';

function updateMarkup(items) {
  const markup = template(items);
  imageList.insertAdjacentHTML('beforeend', markup);
}

export default updateMarkup;
