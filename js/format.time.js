function format_time(sec) {
  minutes = Math.floor(sec / 60);
  seconds = Math.floor(sec % 60);
  time = {
    minutes: minutes,
    seconds: seconds,
  };

  return time;
}
