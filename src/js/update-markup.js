import galleryTplt from '../templates/galleryTplt.hbs';
import { imageList } from './refs';

function updateMarkup(items) {
  const markup = galleryTplt(items);
  imageList.insertAdjacentHTML('beforeend', markup);
}

export default updateMarkup;
