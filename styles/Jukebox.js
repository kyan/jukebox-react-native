import React, { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  artwork: {
    flex: 1,
    width: 250,
    height: 250,
    marginBottom: 20,
    marginLeft: 15
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
    fontSize: 15,
    fontFamily: 'Futura'
  },
  volume_container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 25,
    marginLeft: 100,
    marginRight: 100
  },
  instructions_alpha: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 5,
    textShadowColor: 'rgba(34,34,34,0.4)',
    fontSize: 12,
    fontFamily: 'Futura'
  },
  slider: {
    margin: 10,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  controls: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  playPauseButton: {
    fontSize: 22
  },
  image_container: {
    flexDirection:'row',
    marginTop: 20,
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
  smallSquareButton: {
    borderWidth: 2,
    borderColor: '#4e4e4e',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
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
  navIcon: {
    fontSize: 15
  },
  volumeIcon: {
    fontSize: 22
  },
  controls_spacer: {
    backgroundColor: '#393939',
    alignSelf: 'stretch',
    height: 1,
    marginBottom: 20
  },
  status_container: {
    alignSelf: 'stretch',
  },
  image_blur: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems:'center',
    justifyContent:'center'
  },
  artwork_full_blur: {
    alignSelf: 'stretch'
  },
  nav_container: {
    flex: 1,
    alignItems:'flex-end',
    justifyContent:'flex-end',
    alignSelf: 'stretch'
  },
  voteContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 20,
    marginBottom: 20
  },
  thumbsUpIcon: {
    fontSize: 28,
    color: '#666'
  },
  thumbsUpIconActive: {
    fontSize: 28,
    color: '#33cc33'
  },
  thumbsSpacer: {
    marginLeft: 20,
    marginRight: 20
  },
  thumbsDownIcon: {
    fontSize: 28,
    color: '#666'
  },
  thumbsDownIconActive: {
    fontSize: 28,
    color: '#cc3333'
  }
});

module.exports = styles;
