import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { queueMapping, queueTypeMapping } from '@/constants/types';
import { store } from '@/store/store';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BACKGROUND_FETCH_TASK = 'background-fetch-task';
const BACKEND_NOTIFICATION_SERVER = 'https://btonnotifications.netlify.app/.netlify/functions/inform';

const sendErrorNotification = async (error: Error) => {
  const currentTrip = store.getState().currentTrip.currentTrip;
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: currentTrip.token,
      sound: 'default',
      body: `Encountered error: ${error.message}`,
    }),
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const currentTrip = store.getState().currentTrip.currentTrip;

    let notifyPosition = '5';
    try {
      notifyPosition = (await AsyncStorage.getItem('notifyPosition')) || '5';
    } catch (error) {
      console.error('Failed to fetch notifyPosition from AsyncStorage:', error);
    }

    const params = new URLSearchParams({
      token: currentTrip.token,
      link: currentTrip.link,
      regnum: currentTrip.regnum,
      queueName:
        queueMapping[
          queueTypeMapping.findIndex(type => {
            return type === currentTrip.vehicleType;
          })
        ],
      notifyPosition: notifyPosition || '5',
    });

    await fetch(`${BACKEND_NOTIFICATION_SERVER}?${params}`);

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    await sendErrorNotification(error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});
export async function registerBackgroundFetchAsync() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 30,
      stopOnTerminate: true,
      startOnBoot: false,
    });
  } catch (error) {
    console.error('Failed to register background fetch task:', error);
  }
}

export async function unregisterBackgroundFetchAsync() {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  } catch (error) {
    console.error('Failed to unregister background fetch task:', error);
  }
}
