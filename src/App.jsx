import { useState, useEffect } from 'react';

/**
 * 
 * todos
 * remove alert message and dispaly some intresting message using css
 * introduce theme atleast 3 using context
 * check responsiveness
 * push to git repo
 * reset button - done
 * once anybody wins tiles should not be clickable - half done tile is not clickable to should be disabled as well using colors
 * 
 * if noone wins then show message all tiles filled
 * 
 * 
 */

function App() {
  const user1 = 'X';
  const user2 = 'O';
  const notifyUser = 'Please press reset button to play again !';
  const tileDisabled = 'Please choose another tile !';
  //                     0     1     2     3     4     5     6     7     8
  const initialTiles = [null, null, null, null, null, null, null, null, null];
  const [tiles, setTiles] = useState([...initialTiles]);
  const [turn, setTurn] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  useEffect(() => {
    let message = '';
    function winCheck(index1, index2, index3, user) {
      return [tiles[index1], tiles[index2], tiles[index3]].join('') === user.repeat(3)
    }
    // row 1
    /** using array join method to check if all three positions have same value user1 */
    if (winCheck(0, 1, 2, user1)) {
      message = `${user1} won !`;
    }
    if (winCheck(0, 1, 2, user2)) {
      message = `${user2} won !`;
    }
    // row 2
    if (winCheck(3, 4, 5, user1)) {
      message = `${user1} won !`;
    }
    if (winCheck(3, 4, 5, user2)) {
      message = `${user2} won !`;
    }
    // row 3
    if (winCheck(6, 7, 8, user1)) {
      message = `${user1} won !`;
    }
    if (winCheck(6, 7, 8, user2)) {
      message = `${user2} won !`;
    }

    // col 1
    if (winCheck(0, 3, 6, user1)) {
      message = `${user1} won !`;
    }
    if (winCheck(0, 3, 6, user2)) {
      message = `${user2} won !`;
    }
    // col 2
    if (winCheck(1, 4, 7, user1)) {
      message = `${user1} won !`;
    }
    if (winCheck(1, 4, 7, user2)) {
      message = `${user2} won !`;
    }
    // col 3
    if (winCheck(2, 5, 8, user1)) {
      message = `${user1} won !`;
    }
    if (winCheck(2, 5, 8, user2)) {
      message = `${user2} won !`;
    }
    // top left to right digonally
    if (winCheck(0, 4, 8, user1)) {
      message = `${user2} won !`;
    }
    if (winCheck(0, 4, 8, user2)) {
      message = `${user2} won !`;
    }
    // top right to left digonally
    if (winCheck(2, 4, 6, user1)) {
      message = `${user2} won !`;
    }
    if (winCheck(2, 4, 6, user2)) {
      message = `${user2} won !`;
    }
    message.length && setWinMessage(message);
  }, [tiles])

  const handleChange = (index) => {
    if (winMessage === tileDisabled) {
      // if win message is equals to tile disabled msg then clear it
      setWinMessage('');
    }
    if (winMessage) {
      // if someone won then make tiles disable using notify user message
      setWinMessage(`${winMessage} ${notifyUser}`)
      return;
    }
    if (tiles[index] === null) {
      tiles[index] = turn ? user1 : user2;
      setTiles([...tiles]);
      setTurn(!turn);
    } else {
      // if user click tile again which has value
      setWinMessage(tileDisabled);
    }
  }

  const handleReset = () => {
    setTiles([...initialTiles]);
    setTurn(false);
    setWinMessage('');
  }

  return (
    <>
      <div id='title'>Tic tac toe game</div>

      <div id='header'>
        <div className='items'></div>
        <div id='message' className='items'>
          {winMessage}
        </div>
        <div className='items'>
          <ul className='themes'>
            <li>Themes:</li>
            <li>Default</li>
            <li>color1</li>
            <li>color2</li>
          </ul>
        </div>
      </div>

      <div id="game">
        {tiles.map((item, index) => <div onClick={() => handleChange(index)} key={index} className="tiles">{item}</div>)}
      </div>
      <div id='reset'>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  )
}

export default App
