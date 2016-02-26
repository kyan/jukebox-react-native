import React, { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  progressContainer: {
    alignItems:'center',
    justifyContent:'center'
  },
  progressBarContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
    width: 600,
    height: 12
  },
  progressView: {
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 12
  },
  timeText: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
    marginTop: 15,
    fontSize: 18,
    fontFamily: 'Futura'
  }
});

module.exports = styles;
