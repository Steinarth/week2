  let should = require('should');
  let _ = require('lodash');

  let TictactoeState = require('./tictactoe-state')(inject({}));

  let tictactoe = require('./tictactoe-game')(inject({
      TictactoeState
  }));

  let createEvent = {
      type: "GameCreated",
      user: {
          userName: "TheGuy"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
  };

  let joinEvent = {
      type: "GameJoined",
      user: {
          userName: "Gummi"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
  };


  describe('create game command', function() {


      let given, when, then;

      beforeEach(function(){
          given=undefined;
          when=undefined;
          then=undefined;
      });

      afterEach(function () {
          tictactoe(given).executeCommand(when, function(actualEvents){
              should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
          });
      });


      it('should emit game created event', function(){

          given = [];
          when =
              {
                  id:"123987",
                  type: "CreateGame",
                  user: {
                      userName: "TheGuy"
                  },
                  name: "TheFirstGame",
                  timeStamp: "2014-12-02T11:29:29"
              };
          then = [
              {
                  type: "GameCreated",
                  user: {
                      userName: "TheGuy"
                  },
                  name: "TheFirstGame",
                  timeStamp: "2014-12-02T11:29:29",
                  side:'X'
              }
          ];

      })
  });


  describe('join game command', function () {
      let given, when, then;

      beforeEach(function () {
          given = undefined;
          when = undefined;
          then = undefined;
      });

      afterEach(function () {
          tictactoe(given).executeCommand(when, function (actualEvents) {
              should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
          });
      });

      it('should emit game joined event...', function () {

          given = [{
              type: "GameCreated",
              user: {
                  userName: "TheGuy"
              },
              name: "TheFirstGame",
              timeStamp: "2014-12-02T11:29:29"
          }
          ];
          when =
              {
                  type: "JoinGame",
                  user: {
                      userName: "Gummi"
                  },
                  name: "TheFirstGame",
                  timeStamp: "2014-12-02T11:29:29"
              };
          then = [
              {
                  type: "GameJoined",
                  user: {
                      userName: "Gummi"
                  },
                  name: "TheFirstGame",
                  timeStamp: "2014-12-02T11:29:29",
                  side:'O'
              }
          ];

      });

      it('should emit FullGameJoinAttempted event when game full', function () {
        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side:'O'
        }
        ];
        when =
            {
                type: "JoinGame",
                user: {
                    userName: "Gulli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            }
      then = [
          {
              type: "FullGameJoinAttempted",
              user: {
                  userName: "Gulli"
              },
              name: "TheFirstGame",
              timeStamp: "2014-12-02T11:30:29"
          }
      ];
  });
  });

  describe('Place move', function(){
    let given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function (){
      tictactoe(given).executeCommand(when, function (actualEvents) {
          should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
      });
    });

    it('should emit MovePlaced on first game move', function(){
      given = [ createEvent, joinEvent ];
      when = {
          "gameId":"fiskur",
          "type": "PlaceMove",
          "user": { "userName": "TheGuy" },
          "name": "UberGame",
          "timeStamp": "2016-12-07T20:56:29",
          "commandId": "003",
          "side": "X",
          "coordinates": { "x": 0, "y": 0 }
      };
      then = [{
          "gameId": "fiskur",
          "type": "MovePlaced",
          "user": { "userName": "TheGuy" },
          "name": "UberGame",
          "timeStamp": "2016-12-07T20:56:29",
          "commandId": "003",
          "side": "X",
          "coordinates": { "x": 0, "y": 0 }
      }];
});

      it('should emit IllegalMove when square is already occupied', function(){
        given = [ createEvent, joinEvent,{
          "gameId":"fiskur",
          "type": "MovePlaced",
          "user": { "userName": "TheGuy" },
          "timeStamp": "2016-12-07T20:56:29",
          "commandId": "003",
          "side": "X",
          "coordinates": { "x": 0, "y": 0 }
        }];
        when = {
          "gameId":"fiskur",
          "type": "PlaceMove",
          "user": { "userName": "Gummi" },
          "timeStamp": "2016-12-07T20:56:30",
          "commandId": "004",
          "side": "O",
          "coordinates": { "x": 0, "y": 0 }
        };
        then = {
          "gameId":"fiskur",
          "type": "IllegalMove",
          "user": { "userName": "Gummi" },
          "timeStamp": "2016-12-07T20:56:30",
          "commandId": "004",
          "side": "O"
        }
      });

      it('Should emit NotYourMove if attempting to make move out of turn', function(){
        given = [ createEvent, joinEvent,{
          "gameId":"fiskur",
          "type": "MovePlaced",
          "user": { "userName": "TheGuy" },
          "timeStamp": "2016-12-07T20:56:29",
          "commandId": "003",
          "side": "X",
          "coordinates": { "x": 0, "y": 0 }
        }];
        when = {
          "gameId":"fiskur",
          "type": "PlaceMove",
          "user": { "userName": "TheGuy" },
          "timeStamp": "2016-12-07T20:56:30",
          "commandId": "004",
          "side": "X",
          "coordinates": { "x": 1, "y": 0 }
        };
        then = {
          "gameId":"fiskur",
          "type": "NotYourMove",
          "user": { "userName": "TheGuy" },
          "side": "X",
          "timeStamp": "2016-12-07T20:56:30"
        }
      });

// Should emit NotYourMove if attempting to make move out of turn

  });
