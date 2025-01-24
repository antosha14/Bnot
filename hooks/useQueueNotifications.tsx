import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { registerBackgroundFetchAsync, unregisterBackgroundFetchAsync } from './backgroundTasks';

export function useQueueNotifications() {
  const tripOpened = useSelector((state: RootState) => state.currentTrip?.opened);
  useEffect(() => {
    const registerTask = async () => {
      if (tripOpened) {
        try {
          registerBackgroundFetchAsync();
        } catch (error) {
          console.error('Failed to register background fetch task:', error);
        }
      }
    };

    registerTask();
    return () => {
      (async () => {
        try {
          await unregisterBackgroundFetchAsync();
        } catch (error) {
          console.error('Failed to unregister background fetch task:', error);
        }
      })();
    };
  }, [tripOpened]);
}
