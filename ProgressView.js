'use strict';

import React, {
  AppRegistry,
  Text,
  View
} from 'react-native';

var Device = require('react-native-device');

if (Device.isIpad()) {
  var Styles = require('./styles/ProgressIpad')
}
else {
  var Styles = require('./styles/Progress')
}

var ProgressView = React.createClass({
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
      <View style={Styles.progressContainer}>
        <View style={Styles.progressBarContainer}>
          <View style={Styles.progressView} width={(time/duration) * 300} />
        </View>
        <View>
          <Text style={Styles.timeText}>
            {this.seconds_to_time(this.props.time)} - {this.props.duration}
          </Text>
        </View>
      </View>
    );
  },
});

module.exports = ProgressView;
