import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '@/store/currentTripSlice';
import { QueueEntreeOpen, QueueEntreeClose } from '@/constants/types';
import { RootState } from '@/store/store';
import { parseDate } from '@/helpers/helpers';
import Entypo from '@expo/vector-icons/Entypo';
import Timer from './Timer';

const OpenedTrip = () => {
  const dispatch = useDispatch();
  const trip = useSelector((state: RootState) => state.currentTrip['currentTrip']);
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.pathText}>
          {`${trip.from} `}
          <Entypo name="arrow-long-right" size={14} color="black" />
          <Text>{` ${trip.to} ${parseDate(trip.appRegistrationTime)}`}</Text>
        </Text>
      </View>

      <Text style={styles.descriptionText}>
        {`Customs Checkpoint: `}
        <Text style={styles.normalText}>{trip.location}</Text>
      </Text>

      <Text style={styles.descriptionText}>
        {`Vehicle type: `}
        <Text style={styles.normalText}>{trip.vehicleType}</Text>
      </Text>

      <Text style={styles.descriptionText}>
        {`Current queue position: `}
        <Text style={styles.normalText}>{trip.initialQueuePosition}</Text>
      </Text>

      <Text style={styles.descriptionText}>
        {`Current trip duration: `}
        <Text style={styles.normalText}>
          <Timer timestamp={trip.appRegistrationTime} />
        </Text>
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.startTripButton,
          {
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        onPress={() => {
          dispatch(
            close({
              ...trip,
              endTime: Date.now(),
              finishStatus: 'Closed by the user',
            })
          );
        }}
      >
        <Text style={styles.startButtonText}>Close the trip</Text>
      </Pressable>
    </View>
  );
};

export default OpenedTrip;

const styles = StyleSheet.create({
  startTripButton: {
    display: 'flex',
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'rgb(46, 35, 108)',
    borderRadius: 8,
    zIndex: 100,
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonText: {
    color: '#FFF',
    fontWeight: 700,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 6,
    marginBottom: 6,
    padding: 12,
    minWidth: '95%',
    height: 'auto',
  },
  pathText: {
    fontSize: 18,
    fontWeight: 800,
  },
  deleteButton: {
    backgroundColor: '#d11a2a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 6,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 600,
  },
  descriptionText: {
    fontWeight: 600,
    marginTop: 2,
    marginBottom: 2,
  },
  normalText: {
    fontWeight: 300,
  },
});
