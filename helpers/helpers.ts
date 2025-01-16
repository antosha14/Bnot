export let parseDate = function (dateMs: number) {
  let date = new Date(Number(dateMs));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

export let parseDuration = function (startTimestamp: number, endTimestamp: number) {
  const durationTimestamp = Number(endTimestamp) - Number(startTimestamp);
  const totalSeconds = Math.floor(durationTimestamp / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours > 0 ? `${hours} hours and` : ''} ${minutes} minutes and ${totalSeconds % 60} seconds`;
};
