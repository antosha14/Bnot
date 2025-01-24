import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { queueMapping, queueTypeMapping } from '@/constants/types';
import { store } from '@/store/store';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BACKGROUND_FETCH_TASK = 'background-fetch-task';

const notificationContent = {
  title: 'Tour turn',
  body: 'It is your turn to pass border control',
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

    const response = await fetch(currentTrip.link);
    const data = await response.json();

    const newPosition =
      data[
        queueMapping[
          queueTypeMapping.findIndex(type => {
            return type === currentTrip.vehicleType;
          })
        ]
      ].findIndex(trip => {
        return trip.regnum === currentTrip.regnum;
      }) + 1;

    if (newPosition <= notifyPosition) {
      Notifications.scheduleNotificationAsync({ content: notificationContent, trigger: null });
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
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
