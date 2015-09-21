'use strict';

var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Board = (function($) {
  //max rows in board
  var NUM_ROWS = 9;
  //max columns in board
  var NUM_COLS = 32;

  var Board = function() {
    var that = this;
    var rows = createLayout();

    this.getRows = function() {
      return rows;
    };

    this.addBubble = function(bubble, coords) {
      var rowNum = Math.floor(coords.y / BubbleShoot.ui.ROW_HEIGHT);
      var colNum = coords.x / BubbleShoot.ui.BUBBLE_DIMS * 2;

      if (rowNum % 2 == 1 || rowNum % 2 == 0) {
        colNum -= 1;
      }

      colNum = Math.round(colNum / 2) * 2;

      if (!rows[rowNum]) {
        rows[rowNum] = [];
        rows[rowNum][colNum] = bubble;
        bubble.setRow(rowNum);
        bubble.setCol(colNum);
      }
    };

    this.getBubbleAt = function(rowNum, colNum) {
      if (!this.getRows()[rowNum]) {
        return null;
      }
      return this.getRows()[rowNum][colNum];
    };

    this.getBubblesAround = function(curRow, curCol) {
      var bubbles = [];

      for (var rowNum = curRow - 1; rowNum <= curRow + 1; rowNum++) {

        for (var colNum = curCol - 2; colNum <= curCol + 2; colNum++) {
          var bubbleAt = that.getBubbleAt(rowNum, colNum);

          if (bubbleAt && !(colNum == curCol && rowNum == curRow)) {
            bubbles.push(bubbleAt);
          }
        }
      }
      return bubbles;
    };

    this.getGroup = function(bubble, found) {
      var curRow = bubble.getRow();

      //check to see if this bubble has already been found
      if (!found[curRow]) {
        found[curRow] = {};
      }

      if (!found.list) {
        found.list = [];
      }

      //return the found object without creating it again if found
      if (found[curRow][bubble.getCol()]) {
        return found;
      }

      found[curRow][bubble.getCol()] = bubble;
      //store bubble in the found list
      found.list.push(bubble);
      var curCol = bubble.getCol();
      var surrounding = that.getBubblesAround(curRow, curCol);

      //check for a color match
      for (var i = 0; i < surrounding.length; i++) {
        var bubbleAt = surrounding[i];

        //this verifies color matches
        if (bubbleAt.getType() == bubble.getType()) {
          found = that.getGroup(bubbleAt, found);
        }
      }
      return found;
    };

    this.popBubbleAt = function(rowNum, colNum) {
      var row = rows[rowNum];
      delete row[colNum];
    };

    return this;
  };

  //returns a 2-dimensional array of rows and cols
  var createLayout = function() {
    var rows = [];

    for (var i = 0; i < NUM_ROWS; i++) {
      var row = [];
      //this calculates whether to start on col 1 or col 0 depending on whether the row is odd or even
      var startCol = i % 2 == 0 ? 1 : 0;

      for (var j = startCol; j < NUM_COLS; j+= 2) {
        var bubble = BubbleShoot.Bubble.create(i, j);
        row[j] = bubble;
      }
      rows.push(row);
    }
    return rows;
  };

  return Board;
})(jQuery);
