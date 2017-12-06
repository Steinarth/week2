Test examples
====

#### Feature: Create Game
Scenario:  Create a new game
  * Given nothing
  * When  user creates i game
  * Then  a game is created

#### Feature: Join game

Scenario: Player joins a game that has been created
  *  Given that a game exists
  *  When  i join the game
  *  Then  i should be included in the game

Scenario: Player joins a full game
  * Given that a game exists and someone has joined the game
  * When  i join the game
  * Then  i should be notified that the game is full, and not be able to     participate

Scenario: Player joins a non-existing game
  * Given Nothing
  * When  I join the game
  * Then  I should be notified that the game does not exist,and not be able to participate

#### Feature: Place move

Scenario: player places a valid move
  * Given that a game exists
  * When  I place a legal move
  * Then  the space which matches the move will be marked with my symbol

Scenario: player places a non-valid move (already occupied)
  * Given that a game exists
  * When  I place an illegal move on space that does not belong to me
  * Then  I should be notified that the move was illegal, and the space does not belong to me, and not be able to mark the space.

Scenario: player places a move when it is not his turn
  * Given that a game exists
  * When  I mark a space when it is not my turn
  * Then  I should be notified that it is not my turn and not be able to mark the space.

#### Feature: Win the game

Scenario: Player wins by having a complete diagonal row
  * Given that a game exists and needs one turn to win by a complete diagonal row
  * When  I mark the missing space in the diagonal row
  * Then  I should be notified that i have won the game.

Scenario: Player wins by having a complete row
  * Given that a game exists and needs one turn to win by a complete row
  * When  I mark the missing space in the row
  * Then  I should be notified that i have won the game.

Scenario: Player wins by having a complete column
  * Given that a game exists and needs one turn to win by a complete column
  * When  I mark the missing space in the column
  * Then  I should be notified that i have won the game.


#### Feature: The game is a Draw

Scenario: A game has no available moves left, and no winner
  * Given that a game exists and all but one spaces are marked, and no one has won
  * When  I choose the last space
  * Then  the game is a draw
