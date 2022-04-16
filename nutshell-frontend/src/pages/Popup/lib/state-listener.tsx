import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { openClosedAtom } from './atoms';

export default function StateListener() {
  const setOpenClosed = useSetRecoilState(openClosedAtom);
  useEffect(() => {
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      if ('SHOW_APP_ON_INIT' in changes) {
        setOpenClosed(changes.SHOW_APP_ON_INIT.newValue);
        console.debug(
          '[@@@@ StateListener] show:',
          changes.SHOW_APP_ON_INIT.newValue
        );
      }
      return true;
    });
    chrome.storage.sync.get(['SHOW_APP_ON_INIT'], (items) => {
      setOpenClosed(items.SHOW_APP_ON_INIT);
      console.debug(
        '[@@@@ StateListener] show on init:',
        items.SHOW_APP_ON_INIT
      );
    });
  }, []);

  return null;
}
