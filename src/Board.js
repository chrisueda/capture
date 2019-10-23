import React, { Component } from "react";

export default class Board extends Component {
  renderBoard({ goodGuy, badGuy }) {
    let board = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let key = `${i}${j}`;
        let goodGuySquare = goodGuy.image ? (
          <div
            style={{ backgroundImage: `url(${goodGuy.image})` }}
            key={key}
            className="square goodguy"
          ></div>
        ) : (
          <div key={key} className="square goodguy"></div>
        );
        let badGuySquare = badGuy.image ? (
          <div
            style={{ backgroundImage: `url(${badGuy.image})` }}
            key={key}
            className="square badguy"
          ></div>
        ) : (
          <div key={key} className="square badguy"></div>
        );
        if (goodGuy.position[0] === j && goodGuy.position[1] === i) {
          board.push(goodGuySquare);
        } else if (badGuy.position[0] === j && badGuy.position[1] === i) {
          board.push(badGuySquare);
        } else {
          board.push(<div key={key} className="square"></div>);
        }
      }
    }

    return board;
  }

  render() {
    return <div id="board">{this.renderBoard(this.props)}</div>;
  }
}
