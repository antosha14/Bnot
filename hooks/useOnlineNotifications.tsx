import { useNetInfo } from '@react-native-community/netinfo';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Vibration } from 'react-native';
import * as Notifications from 'expo-notifications';

export function useOnlineNotification() {
  const { type, isConnected } = useNetInfo();
  const tripOpened = useSelector((state: RootState) => state.currentTrip?.opened);
  useEffect(() => {
    if (!isConnected) {
      const checkNetwork = async () => {
        if (!isConnected && tripOpened) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Network Connection Lost',
              body: "You have lost your internet connection. Application will not be able to notify you correctly if connection whouldn't restore. Be conscious of queue position and check it yourself",
            },
            trigger: null,
          });

          Vibration.vibrate([1000, 1000, 1000]);
          alert(
            "You have lost your internet connection. Application will not be able to notify you correctly if connection whouldn't restore. Be conscious of queue position and check it yourself"
          );
        }
      };

      checkNetwork();
    }
  }, [isConnected, tripOpened]);
}
