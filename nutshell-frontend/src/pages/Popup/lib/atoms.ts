import { atom, selector } from 'recoil';
import { DATA_LOADING } from './data-bus';
import { niceTicks } from './nice-ticks';

console.debug('[@@@@ atoms localStorage data]', localStorage);

export const LS_PREFIX = 'OneAI_URL';

// const buildUrlKey = (key:string, url:string, summaryPercent:string)=>{
//       return  `${LS_PREFIX}__${key}__${url}__${summaryPercent}`;

// }

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet, getLoadable }: any) => {
    const summaryPercent = getLoadable(summaryPercentState).contents;
    const url = localStorage.getItem(LS_PREFIX);
    let ulrKey = `${LS_PREFIX}__${key}__${url}`;
    if (key === 'summaryState') {
      ulrKey = `${ulrKey}__${summaryPercent}`;
    }
    const savedValue = localStorage.getItem(ulrKey);
    console.debug(
      '[@@@@ atoms localStorageEffect], url:',
      ulrKey,
      'savedValue:',
      savedValue
    );
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    } else {
      setSelf(DATA_LOADING);
    }
    onSet((newValue: any) => {
      const summaryPercent = getLoadable(summaryPercentState).contents;
      const url = localStorage.getItem(LS_PREFIX);
      let ulrKey = `${LS_PREFIX}__${key}__${url}`;
      if (key === 'summaryState') {
        ulrKey = `${ulrKey}__${summaryPercent}`;
      }
      console.debug('[@@@@ atoms localStorageEffect], onSet:', newValue);
      if (newValue) {
        localStorage.setItem(ulrKey, JSON.stringify(newValue));
      }
    });
  };

const log = ({ setSelf, onSet, node }: any) => {
  onSet((newState: any) => {
    console.debug('[@@@@ atoms log], atom', node.key, '\nnewState', newState);
  });
};

const urlState = atom({
  key: 'urlState',
  default: '',
  effects_UNSTABLE: [log],
});

const userIDAtom = atom({
  key: 'userIDAtom',
  default: '',
  effects_UNSTABLE: [log],
});

const pageTitleAtom = atom({
  key: 'pageTitleAtom',
  default: '',
  effects_UNSTABLE: [log],
});

const summaryState = atom({
  key: 'summaryState',
  default: ' ',
  effects_UNSTABLE: [localStorageEffect('summaryState')],
});

const entitiesStateAtom = atom({
  key: 'entitiesStateAtom',
  default: [],
  effects_UNSTABLE: [localStorageEffect('entitiesStateAtom')],
});

const emotionsLabelsState = atom({
  key: 'emotionsLabelsState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('emotionsLabelsState')],
});

const summaryPercentState = atom({
  key: 'summaryPercentState',
  default: 150,
  effects_UNSTABLE: [log],
});

const articleTextAtom = atom({
  key: 'articleTextAtom',
  default: '',
});

const extractHTMLAtom = atom<any>({
  key: 'extractHTMLAtom',
  default: {},
});

const shareAtom = atom<any>({
  key: 'shareAtom',
  default: {},
});

const summaryPercentRangeSelector = selector({
  key: 'summaryPercentSelector',
  get: ({ get }) => {
    const percent = get(summaryPercentState);
    const text = get(articleTextAtom);
    if (text.length === 0) {
      return [10, 250];
    }
    let { lower, upper } = niceTicks(10, Math.floor(text.length * 0.2));
    lower = Math.max(10, lower);
    return [lower, upper];
  },
});

const openClosedAtom = atom({ key: 'openClosedAtom', default: false });

const htmlDocumentState = atom({
  key: 'htmlDocumentState',
  default: '',
  effects_UNSTABLE: [log],
});

export {
  summaryState,
  entitiesStateAtom,
  emotionsLabelsState,
  urlState,
  userIDAtom,
  summaryPercentState,
  summaryPercentRangeSelector,
  articleTextAtom,
  extractHTMLAtom,
  shareAtom,
  htmlDocumentState,
  openClosedAtom,
  pageTitleAtom,
};
