import { useSetRecoilState } from 'recoil';
import { openClosedAtom } from './atoms';

export default function StateListener() {
  const setOpenClosed = useSetRecoilState(openClosedAtom);

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if ('SHOW_APP_ON_INIT' in changes) {
      setOpenClosed(changes.SHOW_APP_ON_INIT.newValue);
      console.debug(
        '[@@@@ StateListener] show:',
        changes.SHOW_APP_ON_INIT.newValue
      );
    }
  });

  return null;
}
