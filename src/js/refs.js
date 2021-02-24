const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('input[name="query"]'),
  imageList: document.querySelector('.gallery'),
  btn: document.querySelector('[data-action="load-more"]'),
  btnGoToUp: document.querySelector('.btn-go-to-up'),
  spinnerBtn: document.querySelector('.spinner-border'),
  spinnerModal: document.querySelector('.modal-spinner'),
};

export const {
  form,
  input,
  imageList,
  btn,
  btnGoToUp,
  spinnerBtn,
  spinnerModal,
} = refs;
