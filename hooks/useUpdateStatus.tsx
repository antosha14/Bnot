import { useEffect, useState, Vibration } from 'react';
import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import db from '@/data/sourceDb';
import { queueMapping, queueTypeMapping } from '@/constants/types';
import { changePosition, close } from '@/store/currentTripSlice';
import { Audio } from 'expo-av';
import { Alert } from 'react-native';
import { useAsyncStorage } from './useAsyncStorage';

export function useUpdateStatus() {
  const currentTrip = useSelector((state: RootState) => state.currentTrip);
  const dispatch = useDispatch();
  const [sound, setSound] = useState(null);
  const [notifyPosition] = useAsyncStorage('notifyPosition', 5);

  const playSong = async () => {
    const { sound } = await Audio.Sound.createAsync(require('@/assets/alarm/song.mp3'));
    setSound(sound);
    await sound.playAsync();
  };

  const stopSong = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Your turn!',
      'It is your turn to pass border control! Thanks for using the app!',
      [
        {
          text: 'OK',
          onPress: async () => {
            Vibration.vibrate(1000);
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

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (currentTrip && currentTrip.opened) {
        try {
          const index = db[currentTrip['currentTrip'].from].zonesFrom.findIndex(
            obj => obj.zoneName === currentTrip['currentTrip'].location
          );

          const response = await fetch(db[currentTrip['currentTrip'].from].zonesFrom[index].zoneLink);
          const data = await response.json();
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
            playSong();
            showAlert();
          }
        } catch (e) {
          alert(e.message);
        }
      }
    }, 30000);
    return () => {
      clearInterval(intervalId);
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentTrip.opened, currentTrip, dispatch]);
}
