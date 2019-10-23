import React from "react";
import "./App.css";
import Board from "./Board";

class App extends React.Component {
  state = {
    goodGuy: {
      image: "",
      position: [0, 0]
    },
    badGuy: {
      image: "",
      position: [4, 4]
    },
    captured: false
  };

  // Todo handle file uploads
  handleGoodFileSubmit = event => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    this.setState({
      goodGuy: {
        image: imageUrl,
        position: this.state.goodGuy.position
      }
    });
  };

  handleBadFileSubmit = event => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);

    this.setState({
      badGuy: {
        image: imageUrl,
        position: this.state.badGuy.position
      }
    });
  };

  handleKeyDown = event => {
    const keyCode = event.keyCode;

    let [badX, badY] = this.state.badGuy.position;
    let goodGuy = { ...this.state.goodGuy };
    let newY, newX;
    if (this.state.captured) {
      return;
    }
    //down
    if (keyCode === 40) {
      newY = goodGuy.position[1] + 1;
      if (newY < 8) {
        goodGuy.position[1] = newY;
        this.setState({ goodGuy });
      }
    }
    // up
    if (keyCode === 38) {
      newY = goodGuy.position[1] - 1;
      if (newY >= 0) {
        goodGuy.position[1] = newY;
        this.setState({ goodGuy });
      }
    }

    // left
    if (keyCode === 37) {
      newX = goodGuy.position[0] - 1;
      if (newX >= 0) {
        goodGuy.position[0] = newX;
        this.setState({ goodGuy });
      }
    }

    // right
    if (keyCode === 39) {
      newX = goodGuy.position[0] + 1;
      if (newX < 8) {
        goodGuy.position[0] = newX;
        this.setState({ goodGuy });
      }
    }

    // Check if you've captured the badguy.
    let [goodX, goodY] = this.state.goodGuy.position;
    if (goodX === badX && goodY === badY) {
      this.setState({
        captured: true
      });
      clearInterval(this.badGuyMove);
    }
  };

  handleBadGuyMove = () => {
    // settimeout to generate new random position x and y
    this.badGuyMove = setInterval(() => {
      let newX = Math.floor(Math.random() * 7);
      let newY = Math.floor(Math.random() * 7);

      if (
        this.state.goodGuy.position[0] === newX &&
        this.state.badGuy.position[1] === newY
      ) {
        return;
      }
      let badGuy = { ...this.state.badGuy };
      badGuy.position[0] = newX;
      badGuy.position[1] = newY;
      this.setState({ badGuy });
    }, 1000);
  };

  componentDidMount() {
    this.handleBadGuyMove();
  }

  render() {
    const message = this.state.captured
      ? "🎉You've caught the bad guy 🎉"
      : "😈Bad guy still on the loose 😈";
    return (
      <div className="App" onKeyDown={this.handleKeyDown} tabIndex="0">
        <header className="App-header">Capture</header>
        <main>
          <div id="upload">
            <form>
              <label htmlFor="player__good">
                Good Guy Avatar
                <input
                  type="file"
                  id="player__good"
                  onChange={this.handleGoodFileSubmit}
                />
              </label>
            </form>
            <form>
              <label htmlFor="player__bad">
                Bad Guy Avatar
                <input
                  type="file"
                  id="player__bad"
                  onChange={this.handleBadFileSubmit}
                />
              </label>
            </form>
          </div>
          <p>{message}</p>
          <Board
            goodGuy={this.state.goodGuy}
            badGuy={this.state.badGuy}
            captured={this.state.captured}
          />
        </main>
      </div>
    );
  }
}

export default App;
