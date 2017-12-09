const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
      side = 'O';
      var gamefull=false;
      var table = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];

        function processEvent(event) {
          if(event.type==="GameJoined"){
            gamefull=true;
          }

          if(event.type==="MoveMade") {
               if ((table)[event.coordinates.x][event.coordinates.y] === 0) {
                   (table)[event.coordinates.x][event.coordinates.y] = event.side;
                   side = event.side;
               }
          }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
          return gamefull;
        }

        function playerTurn(side){
          return side;
        }

        function emptyCell(x,y) {
          return table[x][y] == 0;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            processEvents: processEvents,
            playerTurn: playerTurn,
            emptyCell:emptyCell
        }
    };
};
