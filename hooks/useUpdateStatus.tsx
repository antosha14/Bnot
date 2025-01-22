import { useEffect } from 'react';
import { playAlarm } from '@/helpers/playAlarm';
import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import db from '@/data/sourceDb';
import { queueMapping, queueTypeMapping } from '@/constants/types';
import { changePosition } from '@/store/currentTripSlice';

export function useUpdateStatus() {
  const currentTrip = useSelector((state: RootState) => state.currentTrip);
  const dispatch = useDispatch();

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
          if (newPosition <= 5) {
            playAlarm();
            alert('It is your turn to pass border control! Thanks for using the app!');
          }
        } catch (e) {
          alert(e.message);
        }
      }
    }, 30000);
    return () => clearInterval(intervalId);
  }, [currentTrip.opened, currentTrip]);
}
