import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ timestamp }: { timestamp: number }) => {
  const calculateTimeElapsed = () => {
    const now = Date.now();
    const timeElapsed = now - timestamp;

    const seconds = Math.floor((timeElapsed / 1000) % 60);
    const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
    const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const [time, setTime] = useState(calculateTimeElapsed());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <Text style={styles.text}>
      {time.days >= 1 && <Text>{time.days} Days </Text>}
      {time.hours >= 1 && <Text>{time.hours} Hours </Text>}
      <Text>{time.minutes} Minutes </Text>
      <Text>{time.seconds} Seconds </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: { color: 'green' },
});

export default Timer;
