import { useNetInfo } from '@react-native-community/netinfo';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Vibration } from 'react-native';
import * as Notifications from 'expo-notifications';

const notificationContent = {
  title: 'Network Connection Lost',
  body: "You have lost your internet connection. Application will not be able to notify you correctly if connection wouldn't restore. Be conscious of queue position and check it yourself",
};

const VIBRATION_PATTERN = [1000, 1000, 1000];

export function useOnlineNotification() {
  const { type, isConnected } = useNetInfo();
  const tripOpened = useSelector((state: RootState) => state.currentTrip?.opened);
  useEffect(() => {
    let notificationId: string | undefined;

    const checkNetwork = async () => {
      if (!isConnected && tripOpened) {
        try {
          notificationId = await Notifications.scheduleNotificationAsync({
            content: notificationContent,
            trigger: null,
          });

          Vibration.vibrate(VIBRATION_PATTERN);
          alert(notificationContent.body);
        } catch (error) {
          console.error('Failed to schedule notification:', error);
        }
      }
    };

    checkNetwork();
    return () => {
      if (notificationId) {
        Notifications.dismissNotificationAsync(notificationId);
      }
    };
  }, [isConnected, tripOpened]);
}
