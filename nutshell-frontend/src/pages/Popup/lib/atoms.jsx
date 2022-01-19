import { atom } from 'recoil';

const summaryState = atom({
  key: 'summaryState',
  default: '',
});

const urlState = atom({
  key: 'urlState',
  default: '',
});

export { summaryState, urlState };
