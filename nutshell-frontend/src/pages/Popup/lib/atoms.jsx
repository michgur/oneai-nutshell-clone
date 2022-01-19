import { atom } from 'recoil';

const summaryState = atom({
  key: 'summaryState',
  default: '',
});

export { summaryState };
