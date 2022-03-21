import { useRecoilValue } from 'recoil';
import { userIDAtom } from './atoms';
import { sendBIEvent } from './comm';
import { Label } from './interface';
import { requestHeader } from './utils';

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

const eventLogger = async (event: UserEvent, data?: EventData) => {
  const userData = { ...data };
  delete userData['uid'];
  const eventData = {
    type: `NUTSHELL_${event}`,
    session_id: 'nutshell',
    user_id: data?.uid,
    api_key: requestHeader['api-key'],
    org_id: 'nutshell',
    data: userData,
  };
  try {
    await sendBIEvent(eventData);
  } catch (error) {}
  console.debug('[event logger] event', eventData);
};

const useEventLogger = () => {
  const userID = useRecoilValue(userIDAtom);
  const _eventLogger = async (event: UserEvent, data?: EventData) => {
    data = { uid: userID, ...data };
    await eventLogger(event, data);
  };
  return { eventLogger: _eventLogger };
};

export { useEventLogger, eventLogger, UserEvent, EventMessage };
