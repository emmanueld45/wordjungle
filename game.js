// declare important logic variables
var currect_btn_id;
var no_of_current_word_letters;
var current_word_count = 0;
var final_word = "";
var possibles_words;
var no_of_words_done = 0;

// game container variables
var clear_btn = document.querySelector(".clear");
var display_container = document.querySelector(".display-container");
var display_box = document.getElementsByClassName("display-box");
var btns_container = document.querySelector(".btns-container");
var btns = document.getElementsByClassName("btns");

// levels container variables
var level_btns_container = document.querySelector(".level-btns-container");
var level_btns = document.getElementsByClassName("level-btns");
var current_level;
var current_level_time;
var finished_level = localStorage.getItem("finished_level");

// timer variables
var count_down = new CountDownTimer(".minutes", ".seconds");

// overlays
var tap_anywhere_overlay = document.querySelector(
  ".tap-anywhere-overlay-container"
);
var intro_overlay = document.querySelector(".intro-overlay-container");
var levels_overlay = document.querySelector(".levels-overlay-container");
var win_overlay = document.querySelector(".win-overlay-container");
var lose_overlay = document.querySelector(".lose-overlay-container");

// register a click event on all buttons and set the innerHTML of
// the corresponding display box to the id of the button
for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    btn_click_sound.play();
    this.disabled = true;
    this.classList.add("btn-selected");
    current_btn_id = this.getAttribute("id");
    display_box[current_word_count].innerHTML = current_btn_id;
    current_word_count++;
    final_word += current_btn_id;
    // console.log(final_word);
    if (current_word_count >= no_of_current_word_letters) {
      setTimeout(() => {
        check_result();
      }, 300);
    }
  });
}

// create question
var questions = [
  { words: ["KIND"], letters: ["D", "I", "K", "N"] },
  { words: ["MADE"], letters: ["M", "D", "E", "A"] },
  { words: ["US"], letters: ["S", "U"] },
  { words: ["PEN"], letters: ["E", "N", "P"] },
  { words: ["APE", "PEA"], letters: ["E", "P", "A"] },
];

var letters_array = ["A", "B", "C", "D", "E", "F", "G", "H"];

// load questions
function load_question() {
  var rand = Math.floor(Math.random() * questions.length);
  var words = questions[rand].words;
  var letters = questions[rand].letters;

  no_of_current_word_letters = letters.length;
  var no_of_letters = letters.length;
  possible_words = words;

  for (i = 0; i < no_of_letters; i++) {
    var box = document.createElement("button");
    box.classList.add("display-box");
    display_container.appendChild(box);

    btns[i].innerHTML = letters[i];
    btns[i].setAttribute("id", letters[i]);
    //console.log(btns[i].getAttribute("id"));
  }
}
load_question();

// check results when boxes are filled
function check_result() {
  var x = 0;
  for (i = 0; i < possible_words.length; i++) {
    if (final_word == possible_words[i]) {
      x++;
      word_is_correct();
      return;
    }
  }
  if (x == 0) {
    word_is_not_correct();
  }
}

// reset settings
function reset() {
  display_container.innerHTML = "";
  currect_btn_id;
  no_of_current_word_letters;
  current_word_count = 0;
  final_word = "";
  possible_words;
  for (i = 0; i < btns.length; i++) {
    btns[i].disabled = false;
    btns[i].classList.remove("btn-selected");
  }
}

// clear clicked buttons if mistakes were made
clear_btn.addEventListener("click", function () {
  clear();
});

// clear funcion
function clear() {
  currect_btn_id;
  current_word_count = 0;
  final_word = "";
  for (i = 0; i < btns.length; i++) {
    btns[i].disabled = false;
    btns[i].classList.remove("btn-selected");
  }

  for (i = 0; i < display_box.length; i++) {
    display_box[i].innerHTML = "";
  }

  // console.log("cleared");
}

// word is correct
function word_is_correct() {
  correct_word_sound.play();
  no_of_words_done++;
  for (i = 0; i < display_box.length; i++) {
    display_box[i].classList.add("correct-answer");
  }
  btns_container.classList.add("rotate");
  if (no_of_words_done >= levels[current_level].number_of_words) {
    btns_container.classList.remove("rotate");
    reset();
    load_question();
    level_ended();
  } else {
    setTimeout(function () {
      btns_container.classList.remove("rotate");
      reset();
      load_question();
    }, 1000);
  }
}

// word is not correct
function word_is_not_correct() {
  incorrect_word_sound.play();
  for (i = 0; i < display_box.length; i++) {
    display_box[i].classList.add("incorrect-answer");
  }
  setTimeout(function () {
    clear();
    for (i = 0; i < display_box.length; i++) {
      display_box[i].classList.remove("incorrect-answer");
    }
  }, 1000);
}

/**** LEVELS SCRIPT START *** */
// contruct levels
var levels = [
  { level: 0, number_of_words: 2, time: 30 },
  { level: 1, number_of_words: 3, time: 30 },
  { level: 2, number_of_words: 2, time: 30 },
  { level: 3, number_of_words: 3, time: 30 },
  { level: 4, number_of_words: 2, time: 30 },
  { level: 5, number_of_words: 3, time: 120 },
  { level: 6, number_of_words: 2, time: 30 },
  { level: 7, number_of_words: 3, time: 30 },
];

// list levels from the constructed levels above
for (i = 0; i < levels.length; i++) {
  var level_btn = document.createElement("button");
  level_btn.classList.add("level-btns");
  level_btn.setAttribute("level", levels[i].level);
  level_btn.setAttribute("number_of_words", levels[i].number_of_words);
  level_btn.setAttribute("time", levels[i].time);
  level_btn.disabled = true;
  // level_btn.innerHTML = levels[i].level;
  level_btn.innerHTML = "<img src='img/buttons/lock.png' class='locked-icon'>";
  level_btns_container.appendChild(level_btn);
}

//  check if player hs finished level and store the currently finished level
// and if not, then set the finished level to 0 and store it
//localStorage.setItem("finished_level", 0);
if (finished_level == null) {
  console.log("no finished level");
  localStorage.setItem("finished_level", 0);
  finished_level = localStorage.getItem("finished_level");
} else {
  console.log(" Finished level is : " + finished_level);
  finished_level = localStorage.getItem("finished_level");
}

// check for all finished levels and unlock them for playing!
for (i = 0; i <= finished_level; i++) {
  var level = level_btns[i].getAttribute("level");
  level_btns[i].innerHTML = level;
  level_btns[i].disabled = false;
}

// set currect level when any level btns is being clicked
for (i = 0; i < level_btns.length; i++) {
  level_btns[i].addEventListener("click", function () {
    btn_click_sound.play();
    current_level = this.getAttribute("level");
    current_level_time = levels[current_level].time;
    levels_overlay.style.display = "none";
    start_level();
    console.log(current_level);
  });
}

// start level
function start_level() {
  setTimeout(() => {
    count_down.set_time(current_level_time);
    count_down.start(level_ended);
  }, 3000);
}

// level ended
function level_ended() {
  console.log("level ended");
  count_down.stop();
  if (no_of_words_done >= levels[current_level].number_of_words) {
    console.log("you finished all words");
    no_of_words_done = 0;
    setTimeout(() => {
      win_overlay.style.display = "block";
      background_sound.pause();
      victory_sound.play();
      document
        .querySelector(".win-overlay-container .box")
        .classList.add("grow");
      setTimeout(() => {
        document
          .querySelector(".win-overlay-container .box")
          .classList.remove("grow");
      }, 2000);
    }, 500);
    unlock_next_level();
  } else {
    console.log("you did not finish all words");
    lose_overlay.style.display = "block";
    document
      .querySelector(".lose-overlay-container .box")
      .classList.add("grow");
    setTimeout(() => {
      document
        .querySelector(".lose-overlay-container .box")
        .classList.remove("grow");
    }, 2000);
  }
}
// level failed
function level_failed() {}

// level passed
function level_passed() {}

// got to next level after current level has been password
function unlock_next_level() {
  if (current_level == finished_level) {
    if (current_level != levels.length - 1) {
      current_level++;
      localStorage.setItem("finished_level", current_level);
    }
  }
}

// clear  all levels when the clear levels btn is clicked
function clear_levels() {
  localStorage.setItem("finished_level", 0);
  finished_level = localStorage.getItem("finished_level");

  reload_level_btns();
  console.log("levels cleared");
}

function reload_level_btns() {
  finished_level = localStorage.getItem("finished_level");

  // empty the level btns container
  level_btns_container.innerHTML = "";

  // lock all levels
  // list levels from the constructed levels above
  for (i = 0; i < levels.length; i++) {
    var level_btn = document.createElement("button");
    level_btn.classList.add("level-btns");
    level_btn.setAttribute("level", levels[i].level);
    level_btn.setAttribute("number_of_words", levels[i].number_of_words);
    level_btn.setAttribute("time", levels[i].time);
    level_btn.disabled = true;
    // level_btn.innerHTML = levels[i].level;
    level_btn.innerHTML =
      "<img src='img/buttons/lock.png' class='locked-icon'>";
    level_btns_container.appendChild(level_btn);
  }
  // unlock the first level
  for (i = 0; i <= finished_level; i++) {
    var level = level_btns[i].getAttribute("level");
    level_btns[i].innerHTML = level;
    level_btns[i].disabled = false;
  }

  // set new event listenners to new created btns to set currect level when any level btns is being clicked
  for (i = 0; i < level_btns.length; i++) {
    level_btns[i].addEventListener("click", function () {
      current_level = this.getAttribute("level");
      current_level_time = levels[current_level].time;
      levels_overlay.style.display = "none";
      start_level();
      console.log(current_level);
    });
  }
}
/**** LEVELS SCRIPT END ***** */

/*** AUDION SCRIPT START *** */
var background_sound = new Audio();
background_sound.src = "sounds/background1.mp3";
background_sound.loop = true;

var btn_click_sound = new Audio();
btn_click_sound.src = "sounds/click1.mp3";

var victory_sound = new Audio();
victory_sound.src = "sounds/victory-sound.wav";

var correct_word_sound = new Audio();
correct_word_sound.src = "sounds/correct-word.wav";

var incorrect_word_sound = new Audio();
incorrect_word_sound.src = "sounds/incorrect-word.wav";
/**** AUDIO SCRIPT END ***** */

/**** DISPLAY SCRIPT START ****/
// grab all btns for clicking again
var play_btn = document.querySelector(".play-btn");
var menu_btn = document.querySelector(".menu-btn");
var retry_btn = document.querySelector(".retry-btn");
var next_btn = document.querySelector(".next-btn");

// tap_anywhere_overlay.addEventListener("click", function () {
//   tap_anywhere_overlay.style.display = "none";
//   intro_overlay.style.display = "block";
//   background_sound.play();
// });

play_btn.addEventListener("click", function () {
  background_sound.play();
  btn_click_sound.play();
  intro_overlay.style.display = "none";
  levels_overlay.style.display = "block";
});

//menu_btn.addEventListener("click", function () {
function go_to_intro() {
  reload_level_btns();
  victory_sound.pause();
  background_sound.play();
  btn_click_sound.play();
  win_overlay.style.display = "none";
  lose_overlay.style.display = "none";
  levels_overlay.style.display = "none";
  intro_overlay.style.display = "block";
}
//});

next_btn.addEventListener("click", function () {
  reload_level_btns();
  victory_sound.pause();
  background_sound.play();
  btn_click_sound.play();
  win_overlay.style.display = "none";
  levels_overlay.style.display = "block";
});
retry_btn.addEventListener("click", function () {
  reload_level_btns();
  background_sound.play();
  btn_click_sound.play();
  lose_overlay.style.display = "none";
  levels_overlay.style.display = "block";
});

/**** DISPLAY SCRIPT END ****/
