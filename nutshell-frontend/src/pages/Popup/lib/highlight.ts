import Fuse from 'fuse.js';
import { Label } from './interface';
import { labelToLabelID } from './utils';

type Opts = {
  forceShow: boolean;
};

export const highLightToggle = (
  labels: Array<Label>,
  opts: Opts = { forceShow: false }
) => {
  const elems = document.querySelectorAll('.oneai__emotion');
  if (elems.length > 0) {
    const active = document.querySelector('.oneai__emotion__active');
    if (active !== null && opts.forceShow === false) {
      Array.from(elems).forEach((el) =>
        el.classList.remove('oneai__emotion__active')
      );
    } else {
      Array.from(elems).forEach((el) =>
        el.classList.add('oneai__emotion__active')
      );
    }
    return;
  }
  const textNodes = textNodesUnder(document.body);
  const options = {
    includeScore: true,
  };

  const fuse = new Fuse(
    textNodes.map((tn) => tn.textContent),
    options
  );
  for (let index = 0; index < labels.length; index++) {
    const label = labels[index];
    highLightLabel(label, index, textNodes, fuse);
  }
};

const highLightLabel = (
  label: Label,
  labelIndex: number,
  textNodes: Array<any>,
  fuse: any
) => {
  const searchRes = fuse.search(label.span_text);
  const index = searchRes[0].refIndex;
  const words = label.span_text.split(' ');
  const text = textNodes[index].textContent;
  const textArr = text.split(' ');
  const res = findCommon(textArr, words);

  textNodes[index].parentElement.innerHTML = textNodes[
    index
  ].parentElement.innerHTML.replace(
    res,
    `<span class="oneai__emotion oneai__emotion__${
      label.name
    } oneai__emotion__active" id="${labelToLabelID(label)}">${res}</span>`
  );
};

const findCommon = (s1: Array<string>, s2: Array<string>) => {
  const arr = Array(s2.length + 1)
    .fill(null)
    .map(() => {
      return Array(s1.length + 1).fill(null);
    });
  for (let j = 0; j <= s1.length; j += 1) {
    arr[0][j] = 0;
  }
  for (let i = 0; i <= s2.length; i += 1) {
    arr[i][0] = 0;
  }
  let len = 0;
  let col = 0;
  let row = 0;
  for (let i = 1; i <= s2.length; i += 1) {
    for (let j = 1; j <= s1.length; j += 1) {
      if (s1[j - 1] === s2[i - 1]) {
        arr[i][j] = arr[i - 1][j - 1] + 1;
      } else {
        arr[i][j] = 0;
      }
      if (arr[i][j] > len) {
        len = arr[i][j];
        col = j;
        row = i;
      }
    }
  }
  if (len === 0) {
    return '';
  }
  let res = '';
  while (arr[row][col] > 0) {
    res = s1[col - 1] + ' ' + res;
    row -= 1;
    col -= 1;
  }
  return res.trim();
};

function textNodesUnder(element: HTMLElement) {
  let n,
    a = [],
    walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  while ((n = walk.nextNode())) a.push(n);
  return a;
}
