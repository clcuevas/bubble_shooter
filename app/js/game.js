'use strict';

var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function($) {
  var Game = function() {
    var curBubble;
    var board;

    this.init = function() {
      $('.but_start_game').bind('click', startGame);
    };

    var startGame = function() {
      $('.but_start_game').unbind('click');
      BubbleShoot.ui.hideDialog();
      curBubble = getNextBubble();
      board = new BubbleShoot.Board();
      BubbleShoot.ui.drawBoard(board);
      $('#game').bind('click', clickGameScreen);
    };

    var getNextBubble = function() {
      var bubble = BubbleShoot.Bubble.create();
      bubble.getSprite().addClass('cur_bubble');
      $('#board').append(bubble.getSprite());
      return bubble;
    };

    //pass an event object (e) as a parameter
    //object e contains data about the clicked object (i.e. coordinates)
    var clickGameScreen = function(e) {
      var angle = BubbleShoot.ui.getBubbleAngle(curBubble.getSprite(), e);
      var duration = 750;
      var distance = 1000;
      var distX = Math.sin(angle) * distance;
      var distY = Math.cos(angle) * distance;
      var bubbleCoords = BubbleShoot.ui.getBubbleCoords(curBubble.getSprite());
      var coords = {
        x: bubbleCoords.left + distX,
        y: bubbleCoords.top - distY
      };

      BubbleShoot.ui.fireBubble(curBubble, coords, duration);
    };
  };
  return Game;
})(jQuery);
