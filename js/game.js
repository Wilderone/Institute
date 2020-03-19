const numDivs = 36;
const maxHits = 11;
let firstHitTime = 0;
let hits = 1;
let misses_count = 0;


function round() {
  // done FIXME: надо бы убрать "target" прежде чем искать новый
    // done FIXME: тут надо определять при первом клике firstHitTime
    //Добавил запрет на выбор алгоритмом "красного" блока
  let divSelector = randomDivId();
  if ($(divSelector).hasClass('miss')) {
    round();
  } else {
  if (firstHitTime == 0) {
     firstHitTime = getTimestamp();
  }
  $(".orange-field").removeClass('target');




  $(divSelector).addClass("target");
  // done TODO: помечать target текущим номером
  $(".target").text(hits);
  if (hits === maxHits) {
    endGame();
  }
}
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(2);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#misses-count").text(misses_count);
  $(".game-field").addClass('d-none');
  $("#win-message").removeClass("d-none");
    if ($(".game-field").hasClass('d-none')) {
      $("#button-start").addClass('d-none')
  }
}

function handleClick(event) {
  // done FIXME: убирать текст со старых таргетов. Кажется есть .text?

  if ($(event.target).hasClass('orange-field') && $(event.target).hasClass('target') == false){
    $(event.target).addClass('miss');
     misses_count++;
  }
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).text("")
    round();
  } 

     

 } 


function init() {
  // done TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
      $(".orange-field").removeClass('miss');
  })
  $("#button-start").click(round);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
