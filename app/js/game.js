'use strict';

var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function($) {
  var Game = function() {
    var curBubble;
    var board;
    //store number of bubbles user has fired/ used
    var numBubbles;
    var MAX_BUBBLES = 70;

    this.init = function() {
      $('.but_start_game').bind('click', startGame);
    };

    var startGame = function() {
      $('.but_start_game').unbind('click');
      //beginning of game number of bubbles left is at MAX
      numBubbles = MAX_BUBBLES;
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
      //display the number of remaining bubbles in the game
      BubbleShoot.ui.drawBubblesRemaining(numBubbles);
      numBubbles--;
      return bubble;
    };

    //pass an event object (e) as a parameter
    //object e contains data about the clicked object (i.e. coordinates)
    var clickGameScreen = function(e) {
      var angle = BubbleShoot.ui.getBubbleAngle(curBubble.getSprite(), e);
      var duration = 750;
      var distance = 1000;
      var collision = BubbleShoot.CollisionDetector.findIntersection(curBubble, board, angle);

      if (collision) {
        var coords = collision.coords;
        duration = Math.round(duration * collision.distToCollision / distance);
      } else {
        var distX = Math.sin(angle) * distance;
        var distY = Math.cos(angle) * distance;
        var bubbleCoords = BubbleShoot.ui.getBubbleCoords(curBubble.getSprite());

        var coords = {
          x: bubbleCoords.left + distX,
          y: bubbleCoords.top - distY
        };
      }

      BubbleShoot.ui.fireBubble(curBubble, coords, duration);
      //call this function each time a bubble is fired to prepare a new one
      curBubble = getNextBubble();
    };
  };
  return Game;
})(jQuery);
