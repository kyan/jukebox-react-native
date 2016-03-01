'use strict'
import React, {
  Component
} from 'react-native';

class Jukebox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conn: {}
    };
  }

  openConnection(self) {
    if (this.state.conn.readyState === undefined || this.state.conn.readyState > 1) {
      console.log("Connecting to the web socket server...")
      // Connect to the web socket server
      var uri = "ws://192.168.1.221:8081";
      // var uri = "ws://127.0.0.1:8085";
      this.state.conn = new WebSocket(uri);

      this.state.conn.onopen = () => {
        console.log("Socket opened!");
      };

      this.state.conn.onerror = (e) => {
        console.log("Socket error: " + e.message);
      };

      this.state.conn.onclose = (e) => {
        console.log("Socket closed: " + e.code + e.reason);
      };

      this.state.conn.onmessage = (msg) => {
        var data = JSON.parse(msg.data);
        console.log(data);

        if ("state" in data) {
          self.setState({
            playing: (data["state"] == 'play')
          })
        }

        if ("track" in data) {
          self.setState({
            track: data["track"]
          })
        }

        if ("rating" in data) {
          self.setState({
            rating: data["rating"]
          })
          self.updateRating();
        }

        if ("volume" in data) {
          self.setState({
            volume: data["volume"]
          })
        }

        if ("playlist" in data) {
          self.setState({
            playlist: data["playlist"]
          })
        }

        if ("time" in data) {
          self.setState({
            time: data["time"]
          })
        }

      }
    }
    return this.state.conn;
  }

  buildMPDMessage(self, command, value){
    var payload = { user_id: parseInt(self.state.current_user_id) };
    payload[command] = (value || '');
    var json_payload = JSON.stringify(payload);
    console.log(payload);
    return json_payload;
  }

  vote(self, state) {
    this.state.conn.send( this.buildMPDMessage(self, 'vote', { 'state': state, 'filename': self.state.track.file }) );
  }

  setVolume(self, value) {
    this.state.conn.send( this.buildMPDMessage(self, 'setvol', value) );
  }

  playNext(self) {
    this.state.conn.send( this.buildMPDMessage(self, 'next') );
  }

  playPrevious(self) {
    this.state.conn.send( this.buildMPDMessage(self, 'previous') );
  }

  playPause(self) {
    if(self.state.playing){
      this.state.conn.send( this.buildMPDMessage(self, 'pause') );
    } else {
      this.state.conn.send( this.buildMPDMessage(self, 'play') );
    }
  }
}

module.exports = new Jukebox();
