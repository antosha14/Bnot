import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { registerBackgroundFetchAsync, unregisterBackgroundFetchAsync } from './backgroundTasks';
import { useNotification } from '@/contexts/NotificationContext';

export function useQueueNotifications() {
  const { expoPushToken } = useNotification();
  const tripOpened = useSelector((state: RootState) => state.currentTrip?.opened);
  useEffect(() => {
    const checkNetwork = async () => {
      if (tripOpened) {
        registerBackgroundFetchAsync();
      }
    };

    checkNetwork();
    return unregisterBackgroundFetchAsync;
  }, [tripOpened, expoPushToken]);
}
