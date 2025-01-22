export let queueMapping = ['carLiveQueue', 'busLiveQueue', 'truckLiveQueue', 'motorcycleLiveQueue'];

const response = await fetch(link);
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

await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'ExponentPushToken[IbP3EfBVXECFDQhYzLBuYH]',
    sound: 'default',
    body: ``,
  }),
});

const index = db[currentTrip['currentTrip'].from].zonesFrom.findIndex(
  obj => obj.zoneName === currentTrip['currentTrip'].location
);
const response = await fetch(db[currentTrip['currentTrip'].from].zonesFrom[index].zoneLink);

await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: currentTrip.token,
    sound: 'default',
    body: `${JSON.stringify(body)}`,
  }),
});
