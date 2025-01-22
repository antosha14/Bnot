export interface ApiResponse {}

export interface QueueEntreeFromApi {
  regnum: string;
  status: number;
  order_id: number;
  type_queue: number;
  registration_date: string;
  changed_date: string;
}

export interface QueueEntreeForEntryComponent extends QueueEntreeFromApi {
  from: string;
  checkpoint: string;
  initialQueuePosition: number;
  link: string;
}

export interface QueueEntreeOpen {
  from: string;
  to: string;
  location: string;
  initialQueuePosition: number;
  startTime: string;
  vehicleType: string;
  appRegistrationTime: number;
  currentQueuePosition: number;
  regnum: string;
  link: string;
  token: string;
}

export interface QueueEntreeClose extends QueueEntreeOpen {
  endTime: number;
  finishStatus: string;
}

export let checkpointsToCountries = {
  Benyakoni: 'Lithuania',
  Berestovitsa: 'Poland',
  Brest: 'Poland',
  Grigorovschina: 'Latvia',
  'Kamennii Log': 'Lithuania',
  Kozlovichi: 'Poland',
  Kotlovka: 'Lithuania',
  Urbani: 'Latvia',
};

export let queueMapping = ['carLiveQueue', 'busLiveQueue', 'truckLiveQueue', 'motorcycleLiveQueue'];
export let queueTypeMapping = ['Car', 'Bus', 'Truck', 'Motorcycle'];

export let dummyHistoryEntree = {
  from: 'Belarus',
  to: 'Poland',
  location: 'Brest',
  startTime: Date.now(),
  appRegistrationTime: Date.now(),
  initialQueuePosition: 55,
  endTime: Date.now() + 3100000,
  finishStatus: 'Closed by the user',
  vehicleType: 'Truck',
};
