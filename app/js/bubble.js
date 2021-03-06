'use strict';

var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Bubble = (function($) {
  var Bubble = function(row, col, type, sprite) {
    var that = this;

    //type corresponds to bubble classes
    this.getType = function() {
      return type;
    };

    this.getSprite = function() {
      return sprite;
    };

    this.getCol = function() {
      return col;
    };

    this.setCol = function(colIn) {
      col = colIn;
    };

    this.getRow = function() {
      return row;
    };

    this.setRow = function(rowIn) {
      row = rowIn;
    };

    this.getCoords = function() {
      //the x-coordinate is left, and the y-coordinate is top
      var coords = {
        left: that.getCol() * BubbleShoot.ui.BUBBLE_DIMS / 2 + BubbleShoot.ui.BUBBLE_DIMS / 2,
        top: that.getRow() * BubbleShoot.ui.ROW_HEIGHT + BubbleShoot.ui.BUBBLE_DIMS / 2
      };
      return coords;
    };
  };

  Bubble.create = function(rowNum, colNum, type) {
    if (type === undefined) {
      //bubble type classes are between bubble_0 through bubble_3
      type = Math.floor(Math.random() * 4);
    }

    var sprite = $(document.createElement('div'));
    sprite.addClass('bubble');
    //bubble type classes are between bubble_0 through bubble_3
    sprite.addClass('bubble_' + type);
    var bubble = new Bubble(rowNum, colNum, type, sprite);
    return bubble;
  };
  return Bubble;
})(jQuery);
