'use strict';

var jukebox = require('./components/jukebox.js')
var Icon = require('react-native-vector-icons/FontAwesome');

import React, {
  AppRegistry,
  Component,
  Image,
  SliderIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

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
    marginBottom: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  slider: {
    marginTop: 20,
    height: 10,
    margin: 10,
    width: 200,
    marginBottom: 30
  },
  controls: {

  },
  playPauseButton: {
    fontSize: 60
  }
});

class Jukebox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      track: {},
      rating: {},
      volume: 0,
      playing: false
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    jukebox.openConnection(this);
  }

  playPauseName() {
    if (this.state.playing) {
      return 'pause-circle'
    } else {
      return 'play-circle'
    };
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
        <SliderIOS
        style={styles.slider}
        value={parseInt(this.state.volume)}
        step={1}
        minimumValue={0}
        maximumValue={50}
        onSlidingComplete={
          (value) => jukebox.setVolume(value)
        } />
        <View style={styles.controls}>
          <TouchableHighlight
            onPress={
              (value) => jukebox.playPause(this)
            }
            underlayColor='transparent'
          >
            <Icon style={styles.playPauseButton} name={this.playPauseName()} color="#000000" />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('JukeboxReactNative', () => Jukebox);
