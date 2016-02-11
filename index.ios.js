/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

class JukeboxReactNative extends Component {

  constructor(props) {
    super(props);
    this.state = {
      track: {},
      rating: {},
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.openConnection();
  }

  openConnection() {
    var self = this;
    var conn = {};
    if (conn.readyState === undefined || conn.readyState > 1) {
      // Connect to the web socket server
      var uri = "ws://jukebox.local:8081";
      conn = new WebSocket(uri);

      conn.onopen = function(){
        console.log("Socket opened");
      }

      conn.onmessage = function(msg){
        var data = JSON.parse(msg.data);
        console.log(data);
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
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.artwork}
          source={{uri: this.state.track.artwork_url}}
        />
        <Text style={styles.instructions}>
          {this.state.track.artist} '{this.state.track.title}'
        </Text>
        <Text style={styles.instructions}>
          {this.state.track.album}
        </Text>
        <Text style={styles.instructions}>
          Added by: {this.state.track.added_by}
        </Text>
        <Text style={styles.instructions}>
          Rating: {this.state.rating.rating || '-'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  artwork: {
    width: 200,
    height: 200,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('JukeboxReactNative', () => JukeboxReactNative);

function updateCurrentSong(track){
  current_track.text(track.title || '-');
  current_artist.text(track.artist || '-');
}
