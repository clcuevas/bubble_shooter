'use strict';

var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function($) {
  var Game = function() {
    var startGame = function() {
      $('.but_start_game').unbind('click');
      BubbleShoot.ui.hideDialog();
    };

    this.init = function() {
      $('.but_start_game').bind('click', startGame);
    };
  };
  return Game;
})(jQuery);
