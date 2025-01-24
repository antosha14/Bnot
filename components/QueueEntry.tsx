import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { launch, close } from '@/store/currentTripSlice';
import { useRouter } from 'expo-router';
import { checkpointsToCountries, queueTypeMapping } from '@/constants/types';
import { QueueEntreeForEntryComponent } from '@/constants/types';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

interface QueueEntryProps {
  car: QueueEntreeForEntryComponent;
}

const QueueEntry: React.FC<QueueEntryProps> = ({ car }) => {
  const currentTrip = useSelector((state: RootState) => state.currentTrip);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleTripOpenClick = () => {
    if (currentTrip.opened) {
      Alert.alert(
        'Confirm an action',
        'It seems like you already have a trip opened, do you wish to finish it and open a new one?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch(
                close({
                  ...currentTrip['currentTrip'],
                  endTime: Date.now(),
                  finishStatus: 'Closed while opening new trip',
                })
              );
              dispatch(
                launch({
                  from: car.from,
                  to: checkpointsToCountries[car.checkpoint],
                  regnum: car.regnum,
                  location: car.checkpoint,
                  startTime: car.registration_date,
                  initialQueuePosition: car.initialQueuePosition,
                  vehicleType: queueTypeMapping[car.type_queue],
                  appRegistrationTime: Date.now(),
                  currentQueuePosition: car.initialQueuePosition,
                  link: car.link,
                  token: car.token,
                })
              );
              router.push('/(tabs)/currentTrip');
            },
          },
        ]
      );
    } else {
      dispatch(
        launch({
          from: car.from,
          to: checkpointsToCountries[car.checkpoint],
          location: car.checkpoint,
          regnum: car.regnum,
          startTime: car.registration_date,
          initialQueuePosition: car.initialQueuePosition,
          vehicleType: queueTypeMapping[car.type_queue],
          appRegistrationTime: Date.now(),
          currentQueuePosition: car.initialQueuePosition,
          link: car.link,
          token: car.token,
        })
      );
      router.push('/(tabs)/currentTrip');
    }
  };

  return (
    <View style={styles.entreeContainer}>
      <Text>
        <Text style={styles.highlightedText}>{car.regnum}</Text> Reg. time: {car.registration_date}
      </Text>
      <Pressable
        style={({ pressed }) => [
          styles.startTripButton,
          {
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        onPress={handleTripOpenClick}
      >
        <Text style={styles.startButtonText}>That's me! Start the trip</Text>
      </Pressable>
    </View>
  );
};

export default QueueEntry;

const styles = StyleSheet.create({
  entreeContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 14,
    marginBottom: 5,
  },
  highlightedText: {
    fontWeight: 800,
  },
  startTripButton: {
    display: 'flex',
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: '63%',
    backgroundColor: 'rgb(46, 35, 108)',
    borderRadius: 8,
  },
  startButtonText: {
    color: '#FFF',
    fontWeight: 700,
  },
});
