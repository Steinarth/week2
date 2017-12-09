const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
      xorY = 'X';
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

          if(event.type==="MovePlaced") {
               if (table[event.coordinates.x][event.coordinates.y] === 0) {
                   table[event.coordinates.x][event.coordinates.y] = event.side;
                   (xorY === 'X') ? xorY='O' : xorY='X';
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
          return xorY == side;
        }

        function emptyCell(x,y) {
          return table[x][y] == 0;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            processEvents: processEvents,
            emptyCell:emptyCell,
            playerTurn: playerTurn
        }
    };
};
