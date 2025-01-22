import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { queueMapping, queueTypeMapping } from '@/constants/types';
import { store } from '@/store/store';
import * as Notifications from 'expo-notifications';

export const BACKGROUND_FETCH_TASK = 'background-fetch-task';
const BACKEND_NOTIFICATION_SERVER = 'https://btonnotifications.netlify.app/.netlify/functions/inform';

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
    const settings = store.getState().settings;

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
      notifyPosition: `${settings.notifyPosition}`,
    });

    await fetch(`${BACKEND_NOTIFICATION_SERVER}?${params}`);

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    const currentTrip = store.getState().currentTrip.currentTrip;
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: currentTrip.token,
        sound: 'default',
        body: `Encountered error: ${error}`,
      }),
    });
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundFetchAsync() {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 30,
    stopOnTerminate: true,
    startOnBoot: false,
  });
}

export async function unregisterBackgroundFetchAsync() {
  await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
