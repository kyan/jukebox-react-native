'use strict';

import React, {
  Component,
  Image,
  SliderIOS,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
  AppStateIOS
} from 'react-native';

import {Actions} from 'react-native-router-flux'

var Icon = require('react-native-vector-icons/FontAwesome');
var Device = require('react-native-device');
var jukebox = require('./components/jukebox.js')
var ProgressView = require('./ProgressView');

if (Device.isIpad()) {
  var Styles = require('./styles/JukeboxIpad');
}
else {
  var Styles = require('./styles/Jukebox');
}

const { BlurView, VibrancyView } = require('react-native-blur');

class Jukebox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      rating: {},
      playlist: {},
      volume: 0,
      playing: false,
      time: 0,
      timer: null,
      current_user_id: '',
      current_user_initials: '',
      voteUpStyle: Styles.thumbsUpIcon,
      voteDownStyle: Styles.thumbsDownIcon
    };
  }

  async componentDidMount() {
    AppStateIOS.addEventListener('change', this._handleAppStateChange.bind(this));
    jukebox.openConnection(this);
    var userId = await AsyncStorage.getItem('@User:current_user_id');
    this.setState({current_user_id: userId});
    var userInitials = await AsyncStorage.getItem('@User:current_user_initials');
    this.setState({current_user_initials: userInitials});
    if (this.state.playing) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange(appState) {
    if (appState == 'active') {
      jukebox.openConnection(this);
    } else {
      jukebox.closeConnection();
    }
  }

  startTimer() {
    var timer = setInterval(
      () => { this.updateProgress() },
      1000
    );
    this.setState({
      timer: timer
    })
  }

  stopTimer() {
    clearInterval(this.state.timer);
  }

  updateProgress() {
    var time = parseInt(this.state.time) + 1;
    this.setState({
      time: time
    })
  }

  resetRatings() {
    this.setState({
      voteUpStyle: Styles.thumbsUpIcon
    })
    this.setState({
      voteDownStyle: Styles.thumbsDownIcon
    })
  }

  updateRating() {
    this.resetRatings();
    if (this.state.rating.negative_ratings && this.state.rating.negative_ratings.indexOf(this.state.current_user_initials)>=0) {
      this.setState({
        voteUpStyle: Styles.thumbsUpIcon
      })
      this.setState({
        voteDownStyle: Styles.thumbsDownIconActive
      })
    }

    if (this.state.rating.positive_ratings && this.state.rating.positive_ratings.indexOf(this.state.current_user_initials)>=0) {
      this.setState({
        voteUpStyle: Styles.thumbsUpIconActive
      })
      this.setState({
        voteDownStyle: Styles.thumbsDownIcon
      })
    }
  }

  playPauseName() {
    if (this.state.playing) {
      return 'pause'
    } else {
      return 'play'
    };
  }

  playPause(value) {
    if(this.state.playing){
      this.stopTimer()
    } else {
      this.startTimer()
    }
    jukebox.playPause(this);
  }

  voteUp() {
    this.setState({
      voteUpStyle: Styles.thumbsUpIconActive
    })
    this.setState({
      voteDownStyle: Styles.thumbsDownIcon
    })
    jukebox.vote(this, 1)
  }

  voteDown() {
    this.setState({
      voteUpStyle: Styles.thumbsUpIcon
    })
    this.setState({
      voteDownStyle: Styles.thumbsDownIconActive
    })
    jukebox.vote(this, 0)
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.volume_container}>
          <Icon style={Styles.volumeIcon} name="volume-down" color="#666" />
          <SliderIOS
            style={Styles.slider}
            value={parseInt(this.state.volume)}
            step={1}
            minimumValue={0}
            maximumValue={50}
            minimumTrackTintColor={'#666'}
            maximumTrackTintColor={'#666'}
            onSlidingComplete={
              (value) => jukebox.setVolume(this, value)
            } />
          <Icon style={Styles.volumeIcon} name="volume-up" color="#666" />
          </View>

          <View style={Styles.status_container}>
            <Image style={Styles.artwork_full_blur}
              source={{uri: this.state.track.artwork_url}}>
              <BlurView blurType="light" style={Styles.image_blur}>
                <View style={Styles.image_container}>
                  <Image style={Styles.artwork}
                    source={{uri: this.state.track.artwork_url}} />
                  <View style={Styles.rating_icon}>
                    <Text style={Styles.rating_text}>
                      {this.state.rating.rating || '-'}
                    </Text>
                  </View>
                </View>

                <Text style={Styles.instructions}>
                  {this.state.track.title}
                </Text>
                <Text style={Styles.instructions}>
                  {this.state.track.artist}
                </Text>
                <Text style={Styles.instructions_alpha}>
                  {this.state.track.album}
                </Text>
                <Text style={Styles.instructions_alpha}>
                  Chosen by: {this.state.track.added_by}
                </Text>

                <ProgressView time={this.state.time} duration={this.state.track.duration} />
              </BlurView>
            </Image>
          </View>

          <View style={Styles.voteContainer}>
            <TouchableHighlight onPress={
              (value) => this.voteUp()
            }
            underlayColor='transparent'>
              <Icon style={this.state.voteUpStyle} name="thumbs-o-up" />
            </TouchableHighlight>
            <View style={Styles.thumbsSpacer} />
            <TouchableHighlight onPress={
                (value) => this.voteDown()
              }
              underlayColor='transparent'>
              <Icon style={this.state.voteDownStyle} name="thumbs-o-down" />
            </TouchableHighlight>
          </View>

          <View style={Styles.controls_spacer} />
          <View style={Styles.controls}>
            <TouchableHighlight
              style={Styles.smallButton}
              onPress={
                (value) => jukebox.playPrevious(this)
              }
              underlayColor='transparent'
              >
              <Icon style={Styles.skipIcon} name="step-backward" color="#ffffff" />
            </TouchableHighlight>
            <TouchableHighlight
              style={Styles.largeButton}
              onPress={
                (value) => this.playPause(value)
              }
              underlayColor='transparent'
              >
              <Icon style={Styles.playPauseButton} name={this.playPauseName()} color="#ffffff" />
            </TouchableHighlight>
            <TouchableHighlight
              style={Styles.smallButton}
              onPress={
                (value) => jukebox.playNext(this)
              }
              underlayColor='transparent'
              >
              <Icon style={Styles.skipIcon} name="step-forward" color="#ffffff" />
            </TouchableHighlight>
          </View>

          <View style={Styles.nav_container}>
            <TouchableHighlight
              style={Styles.smallSquareButton}
              onPress={Actions.settings}
              underlayColor='transparent'
              >
              <Icon style={Styles.navIcon} name="cog" color="#ffffff" />
            </TouchableHighlight>
          </View>

        </View>
      );
    }
  }

  module.exports = Jukebox;
