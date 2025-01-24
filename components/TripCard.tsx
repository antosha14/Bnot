import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { QueueEntreeClose } from '@/constants/types';
import { parseDate, parseDuration } from '@/helpers/helpers';

interface TripCardProps {
  trip: QueueEntreeClose;
  setHistory?: (callback: (prevHistory: QueueEntreeClose[]) => QueueEntreeClose[]) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, setHistory }) => {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.pathText}>
          {`${trip.from} `}
          <Entypo name="arrow-long-right" size={14} color="black" />
          <Text>{` ${trip.to} ${parseDate(trip.endTime)}`}</Text>
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
        {`Initial queue position: `}
        <Text style={styles.normalText}>{trip.initialQueuePosition}</Text>
      </Text>

      <Text style={styles.descriptionText}>
        {`Time since trip started: `}
        <Text style={styles.normalText}>{parseDuration(trip.appRegistrationTime, trip.endTime)}</Text>
      </Text>

      <Text style={styles.descriptionText}>
        {`Trip status: `}
        <Text style={[styles.normalText, { color: trip.finishStatus === 'Closed by the user' ? 'green' : 'red' }]}>
          {`${trip.finishStatus}`}
        </Text>
      </Text>

      <Pressable
        style={({ pressed }) => [styles.deleteButton, { opacity: pressed ? 0.8 : 1 }]}
        onPress={() => {
          if (setHistory) {
            setHistory(prevHistory => {
              return prevHistory.filter(tripFromHistory => tripFromHistory.endTime !== trip.endTime);
            });
          }
        }}
      >
        <Text style={styles.deleteButtonText}>Delete Trip</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 6,
    marginBottom: 6,
    padding: 12,
    minWidth: '95%',
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
