import { View, Text, StyleSheet, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export type Trip = {
  from: string;
  to: string;
  location: string;
  startTime: Date;
  initialQueuePosition: number;
  endTime: Date;
  finishStatus: number;
  vehicleType: string;
};

let statusDescription = {
  1: 'An invitation was shown and accepted',
  2: "An invitation was shown but wasn't accepted",
  3: 'Trip closed before invitation was shown',
};

let parseDate = function (date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

let parseDuration = function (date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours} hours and ${minutes} minutes`;
};

export const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Text style={styles.pathText}>
          {`${trip.from} `}
          <Entypo name="arrow-long-right" size={14} color="black" />
          <Text>{` ${trip.to} ${parseDate(trip.startTime)}`}</Text>
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
        {`Waiting time: `}
        <Text style={styles.normalText}>{parseDate(trip.endTime)}</Text>
      </Text>

      <Text style={styles.descriptionText}>
        {`Trip status: `}
        <Text style={[styles.normalText, { color: trip.finishStatus === 1 ? 'green' : 'red' }]}>
          {statusDescription[`${trip.finishStatus}`]}
        </Text>
      </Text>

      <Pressable style={({ pressed }) => [styles.deleteButton, { opacity: pressed ? 0.8 : 1 }]}>
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
