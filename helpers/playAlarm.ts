import { Audio } from 'expo-av';

export async function playAlarm() {
  const { sound } = await Audio.Sound.createAsync(require('@/assets/alarm/song.mp3'));
  await sound.playAsync();
}
