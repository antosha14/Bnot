import { useEffect, useRef } from 'react';
import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import db from '@/data/sourceDb';
import { queueMapping, queueTypeMapping } from '@/constants/types';
import { changePosition, close } from '@/store/currentTripSlice';
import { Audio } from 'expo-av';
import { Alert, Vibration } from 'react-native';
import { useAsyncStorage } from './useAsyncStorage';

const UPDATE_INTERVAL = 30000;
const DEFAULT_NOTIFY_POSITION = 5;

export function useUpdateStatus() {
  const currentTrip = useSelector((state: RootState) => state.currentTrip);
  const dispatch = useDispatch();
  const soundRef = useRef<Audio.Sound | null>(null);
  const [notifyPosition] = useAsyncStorage('notifyPosition', DEFAULT_NOTIFY_POSITION);

  const playSong = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('@/assets/alarm/song.mp3'));
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      alert('Error playing sound');
    }
  };

  const stopSong = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      } catch (error) {
        alert('Error stopping sound');
      }
    }
  };

  useEffect(() => {
    const showAlert = () => {
      Alert.alert(
        'Your turn!',
        'It is your turn to pass border control! Thanks for using the app!',
        [
          {
            text: 'OK',
            onPress: async () => {
              await stopSong();
              dispatch(
                close({
                  ...currentTrip['currentTrip'],
                  endTime: Date.now(),
                  finishStatus: 'Closed by the user',
                })
              );
            },
          },
        ],
        { cancelable: false }
      );
    };

    const fetchTripStatus = async () => {
      const index = db[currentTrip['currentTrip'].from].zonesFrom.findIndex(
        obj => obj.zoneName === currentTrip['currentTrip'].location
      );

      const response = await fetch(db[currentTrip['currentTrip'].from].zonesFrom[index].zoneLink);
      const data = await response.json();
      return data;
    };

    const intervalId = setInterval(async () => {
      if (currentTrip && currentTrip.opened) {
        try {
          const data = await fetchTripStatus();
          const newPosition =
            data[
              queueMapping[
                queueTypeMapping.findIndex(type => {
                  return type === currentTrip['currentTrip'].vehicleType;
                })
              ]
            ].findIndex(trip => {
              return trip.regnum === currentTrip['currentTrip'].regnum;
            }) + 1;
          dispatch(changePosition(newPosition));

          if (newPosition <= Number(notifyPosition)) {
            await playSong();
            Vibration.vibrate(1000);
            showAlert();
          }
        } catch (e) {
          alert(e.message);
        }
      }
    }, UPDATE_INTERVAL);
    return () => {
      clearInterval(intervalId);
      (async () => {
        if (soundRef.current) {
          try {
            await soundRef.current.unloadAsync();
          } catch (error) {
            console.error('Failed to unload sound:', error);
          } finally {
            soundRef.current = null;
          }
        }
      })();
    };
  }, [currentTrip.opened, currentTrip, dispatch, notifyPosition]);
}
