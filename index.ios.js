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
    backgroundColor: '#222',
  },
  artwork: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginLeft: 15
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  volume_container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  instructions_alpha: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 5,
    textShadowColor: 'rgba(34,34,34,0.4)'
  },
  slider: {
    margin: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  controls: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  playPauseButton: {
    fontSize: 22
  },
  image_container: {
    flexDirection:'row',
    marginTop: 20
  },
  rating_icon: {
    marginLeft: -15,
    marginTop: -15,
    backgroundColor: '##84d2bd',
    width: 30,
    height: 30,
    borderRadius: 15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  rating_text: {
    color: '#fff'
  },
  progressContainer: {
    alignItems:'center',
    justifyContent:'center'
  },
  timeText: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
    marginTop: 15
  },
  smallButton: {
    margin: 10,
    borderWidth: 2,
    borderColor: '#4e4e4e',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  largeButton: {
    borderWidth: 2,
    borderColor: '#4e4e4e',
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  skipIcon: {
    fontSize: 18
  },
  volumeIcon: {
    fontSize: 15
  },
  controls_spacer: {
    backgroundColor: '#393939',
    alignSelf: 'stretch',
    height: 1,
    marginTop: 25,
    marginBottom: 25
  },
  progressBarContainer: {
    marginTop: 20,
    backgroundColor: '#666',
    borderRadius: 3,
    width: 300,
    height: 6
  },
  progressView: {
    backgroundColor: '#fff',
    borderRadius: 3,
    height: 6
  }
});

var ProgressView = React.createClass({

  getInitialState() {
    return {

    };
  },

  componentDidMount() {

  },

  seconds_to_time(seconds) {
    var seconds = parseInt(seconds,10);
    var minutes = seconds/60;
    var padded = function(number){
      number = number+'';
      return number.length<2 ? '0'+number : number;
    }
    return padded(Math.floor(minutes)) + ':' + padded(seconds%60);
  },

  time_to_seconds(time) {
    if (time != null) {
      time = time.split(':');
      return parseInt(time[0],10)*60 + parseInt(time[1],10);
    }
  },

  render() {
    var time = parseInt(this.props.time,10)+1;
    var duration = this.time_to_seconds(this.props.duration);
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressView} width={(time/duration) * 300} />
        </View>
        <View>
          <Text style={styles.timeText}>
            {this.seconds_to_time(this.props.time)} - {this.props.duration}
          </Text>
        </View>
      </View>
    );
  },
});

class Jukebox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      rating: {},
      playlist: {},
      volume: 0,
      playing: false,
      time: 0
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    jukebox.openConnection(this);
    setInterval(
      () => { this.updateProgress() },
      1000
    );
  }

  updateProgress() {
    var time = parseInt(this.state.time) + 1;
    this.setState({
      time: time
    })
  }

  playPauseName() {
    if (this.state.playing) {
      return 'pause'
    } else {
      return 'play'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.volume_container}>
          <Icon style={styles.volumeIcon} name="volume-down" color="#666" />
          <SliderIOS
          style={styles.slider}
          value={parseInt(this.state.volume)}
          step={1}
          minimumValue={0}
          maximumValue={50}
          minimumTrackTintColor={'#666'}
          maximumTrackTintColor={'#666'}
          onSlidingComplete={
            (value) => jukebox.setVolume(value)
          } />
          <Icon style={styles.volumeIcon} name="volume-up" color="#666" />
        </View>
        <View style={styles.image_container}>
          <Image style={styles.artwork}
                 source={{uri: this.state.track.artwork_url}} />
          <View style={styles.rating_icon}>
            <Text style={styles.rating_text}>
              {this.state.rating.rating || '-'}
            </Text>
          </View>
        </View>
        <Text style={styles.instructions}>
          {this.state.track.artist} '{this.state.track.title}'
        </Text>
        <Text style={styles.instructions_alpha}>
          {this.state.track.album}
        </Text>
        <Text style={styles.instructions_alpha}>
          Chosen by: {this.state.track.added_by}
        </Text>

        <ProgressView time={this.state.time} duration={this.state.track.duration} />

        <View style={styles.controls_spacer} />
        <View style={styles.controls}>
          <TouchableHighlight
            style={styles.smallButton}
            onPress={
              (value) => jukebox.playPause(this)
            }
            underlayColor='transparent'
          >
            <Icon style={styles.skipIcon} name="step-backward" color="#ffffff" />
          </TouchableHighlight>
          <TouchableHighlight
          style={styles.largeButton}
            onPress={
              (value) => jukebox.playPause(this)
            }
            underlayColor='transparent'
          >
            <Icon style={styles.playPauseButton} name={this.playPauseName()} color="#ffffff" />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.smallButton}
            onPress={
              (value) => jukebox.playPause(this)
            }
            underlayColor='transparent'
          >
            <Icon style={styles.skipIcon} name="step-forward" color="#ffffff" />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('JukeboxReactNative', () => Jukebox);
