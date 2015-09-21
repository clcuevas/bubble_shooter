'use strict';
/*
  The math portion that is coded inside the findIntersection method
  is trigonometry.
*/
var BubbleShoot = window.BubbleShoot || {};
//create an object called CollisionDetector
BubbleShoot.CollisionDetector = (function($) {
  var CollisionDetector = {
    //curBubble is an instance of the Bubble class
    //board is an instance of the object Board
    //angle at which the bubble is being fired
    //these three arguments are needed to know about the starting situation
    findIntersection: function(curBubble, board, angle) {
      var rows = board.getRows();
      //collision holds the bubble that's been collided with
      var collision = null;
      //pos and start retrieves the bubble's starting position as an obj
      var pos = curBubble.getSprite().position();
      var start = {
        left: pos.left + BubbleShoot.ui.BUBBLE_DIMS / 2,
        top: pos.top + BubbleShoot.ui.BUBBLE_DIMS / 2
      };
      //dx, dy define how much a bubble moves left or right (dx) or up (dy)
      var dx = Math.sin(angle);
      var dy = -Math.cos(angle);

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        for (var j = 0; j < row.length; j++) {
          var bubble = row[j];

          //start calculating collisions, geometry being used
          if (bubble) {
            var coords = bubble.getCoords();

            var distToBubble = {
              x: start.left - coords.left,
              y: start.top - coords.top
            };

            //this line tells us at what proportion of the fired bubble's total movement it will be closest to the candidate bubble's center
            var t = dx * distToBubble.x + dy * distToBubble.y;
            //calculate where the collision happens
            var ex = -t * dx + start.left;
            var ey = -t * dy + start.top;
            //if the distance is less than double the candiate bubble's radius, a collision occurs
            var distEC = Math.sqrt((ex - coords.left) * (ex - coords.left) + (ey - coords.top) * (ey - coords.top));

            if (distEC < BubbleShoot.ui.BUBBLE_DIMS * 0.75) {
              var dt = Math.sqrt(BubbleShoot.ui.BUBBLE_DIMS * BubbleShoot.ui.BUBBLE_DIMS - distEC * distEC);

              var offset1 = {
                x: (t - dt) * dx,
                y: -(t - dt) * dy
              };

              var offset2 = {
                x: (t + dt) * dx,
                y: -(t + dt) * dy
              };

              var distToCollision1 = Math.sqrt(offset1.x * offset1.x + offset1.y * offset1.y);
              var distToCollision2 = Math.sqrt(offset2.x * offset2.x + offset2.y * offset2.y);

              if (distToCollision1 < distToCollision2) {
                var distToCollision = distToCollision1;

                var dest = {
                  x: offset1.x + start.left,
                  y: offset1.y + start.top
                };
              } else {
                var distToCollision = distToCollision2;

                var dest = {
                  x: -offset2.x + start.left,
                  y: offset2.y + start.top
                };
              }

              if (!collision || collision.distToCollision > distToCollision) {
                collision = {
                  bubble: bubble,
                  distToCollision: distToCollision,
                  coords: dest
                };
              }
            }
          } //end if (bubble) condition
        } //end inner for loop
      } //end outer for loop

      //return the collision object that stores all the collision data
      return collision;
    }
  };
  return CollisionDetector;
})(jQuery);
