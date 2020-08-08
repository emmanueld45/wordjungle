function format_time(secs, minutes_display, seconds_display) {
  var minutes = Math.floor(secs / 60);
  var seconds = Math.floor(secs % 60);
  //  $(minutes_display).html(minutes);
  // $(seconds_display).html(seconds);
  document.querySelector(minutes_display).innerHTML = minutes;
  document.querySelector(seconds_display).innerHTML = seconds;
}

/**** COUNT DOWN TIMER START *** */
class CountDownTimer {
  minutes;
  seconds;
  milli_seconds;
  count_down_interval;
  minutes_display;
  seconds_display;

  constructor(minutes_display, seconds_display) {
    this.minutes_display = minutes_display;
    this.seconds_display = seconds_display;
  }

  format_time() {
    var minutes = Math.floor(this.seconds / 60);
    var seconds = Math.floor(this.seconds % 60);
    // $(this.minutes_display).html(minutes);
    // $(this.seconds_display).html(seconds);
    document.querySelector(this.minutes_display).innerHTML = minutes;
    document.querySelector(this.seconds_display).innerHTML = seconds;
  }

  set_time(secs) {
    this.seconds = secs;
  }

  start(callback) {
    this.count_down_interval = setInterval(() => {
      this.seconds--;
      this.format_time();
      if (this.seconds <= 0) {
        clearInterval(this.count_down_interval);
        callback();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.count_down_interval);
  }
}
/**** COUNT DOWN TIMER START *** */

/**** COUNT UP TIMER START *** */
class CountUpTimer {
  seconds;
  count_up_interval;
  minutes_display;
  seconds_display;

  constructor(minutes_display, seconds_display) {
    this.minutes_display = minutes_display;
    this.seconds_display = seconds_display;
  }

  format_time() {
    var minutes = Math.floor(this.seconds / 60);
    var seconds = Math.floor(this.seconds % 60);
    // $(this.minutes_display).html(minutes);
    // $(this.seconds_display).html(seconds);
    document.querySelector(this.minutes_display).innerHTML = minutes;
    document.querySelector(this.seconds_display).innerHTML = seconds;
  }

  start(secs) {
    this.seconds = secs;
    this.count_up_interval = setInterval(() => {
      this.seconds++;
      this.format_time();
    }, 1000);
  }

  stop() {
    clearInterval(this.count_up_interval);
  }

  get_seconds() {
    return this.seconds;
  }
}

/**** COUNT UP TIMER END *** */
