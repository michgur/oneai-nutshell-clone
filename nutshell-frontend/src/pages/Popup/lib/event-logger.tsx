import { useRecoilValue } from 'recoil';
import { userIDAtom } from './atoms';
import { Label } from './interface';

enum UserEvent {
  CLICKED_LIKE = 'CLICKED_LIKE',
  CLICKED_DISLIKE = 'CLICKED_DISLIKE',
  CLICKED_SHARE = 'CLICKED_SHARE',
  CLICKED_EMOTIONS_BAR = 'CLICKED_EMOTIONS_BAR',
  CLICKED_EMOTIONS_EYE = 'CLICKED_EMOTIONS_EYE',
  CLICKED_POWERED_BY = 'CLICKED_POWERED_BY',
  SUUMARIZED_ARTICLE = 'SUUMARIZED_ARTICLE',
  MOVED_SLIDER = 'MOVED_SLIDER',
  NUTSHELL_OPENED = 'NUTSHELL_OPENED',
  NUTSHELL_CLOSED = 'NUTSHELL_CLOSED',
}
interface EventData {
  uid?: string | undefined;
  msg?: EventMessage | undefined;
  label?: Label;
  summary_slider?: number;
  url?: string;
}

enum EventMessage {}

const eventLogger = (event: UserEvent, data?: EventData) => {
  console.debug('[event logger] event', event, 'data', data);
};

const useEventLogger = () => {
  const userID = useRecoilValue(userIDAtom);
  const _eventLogger = (event: UserEvent, data?: EventData) => {
    data = { uid: userID, ...data };
    eventLogger(event, data);
  };
  return { eventLogger: _eventLogger };
};

export { useEventLogger, eventLogger, UserEvent, EventMessage };
