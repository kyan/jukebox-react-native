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
      // Connect to the web socket server
      var uri = "ws://jukebox.local:8081";
      this.state.conn = new WebSocket(uri);

      this.state.conn.onopen = function(){
        console.log("Socket opened");
      }

      this.state.conn.onmessage = function(msg){
        var data = JSON.parse(msg.data);
        console.log(data);

        if ("state" in data) {
          self.setState({
            playing: (data["state"] == 'play')
          })
        }

        if ("track" in data) {
          console.log('update track');
          self.setState({
            track: data["track"]
          })
        }

        if ("rating" in data) {
          console.log('update rating');
          self.setState({
            rating: data["rating"]
          })
        }

        if ("volume" in data) {
          self.setState({
            volume: data["volume"]
          })
        }
      }
    }
    return this.state.conn;
  }

  buildMPDMessage(command, value){
    var payload = { user_id: null };
    payload[command] = (value || '');
    var json_payload = JSON.stringify(payload);
    return json_payload;
  };

  setVolume(value) {
    console.log('setVolume value: ' + value);
    console.log(this.state.conn);
    this.state.conn.send( this.buildMPDMessage('setvol', value) );
  }

  playPause() {
    console.log('playPause');
    console.log(self.state.playing);
    if(self.state.playing){
      console.log('!! play');
      this.state.conn.send( this.buildMPDMessage('play') );
    } else {
      console.log('!! pause');
      this.state.conn.send( this.buildMPDMessage('pause') );
    }
  }
}

module.exports = new Jukebox();
