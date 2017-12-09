
module.exports = function(injected){
    let TictactoeState = injected('TictactoeState');

    return function(history){
        let gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){
                function applyEvents(events, moreEvents){
                    gameState.processEvents(events);

                    // Check here for game state that may result in additional events
                    eventHandler(events);
                }

                let cmdHandlers = {
                    "CreateGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.gameFull()){
                            applyEvents( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    "LeaveGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameLeft",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }]);
                    },
                    "PlaceMove": function(cmd){
                        if(!gameState.emptyCell(cmd.coordinates.x,cmd.coordinates.y)){
                          applyEvents({
                            gameId: cmd.gameId,
                            type: "IllegalMove",
                            user: cmd.user,
                            timeStamp: cmd.timeStamp,
                            commandId: cmd.commandId,
                            side: cmd.side,
                          });
                            return;
                          }

                          applyEvents([{
                            gameId: cmd.gameId,
                            type: "MoveMade",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            commandId: cmd.commandId,
                            side: cmd.side,
                            coordinates: cmd.coordinates,
                          }]);


                        // Check here for conditions which prevent command from altering state



                    },
                    "RequestGameHistory": function(cmd){
                        // Game does not handle this query command, is declared here for making tests more robust.
                    }
                };

                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};
