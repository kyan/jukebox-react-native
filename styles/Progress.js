import React, { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  progressContainer: {
    alignItems:'center',
    justifyContent:'center'
  },
  progressBarContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    width: 300,
    height: 6
  },
  progressView: {
    backgroundColor: '#fff',
    borderRadius: 3,
    height: 6
  },
  timeText: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
    marginTop: 15,
    fontFamily: 'Futura'
  }
});

module.exports = styles;
