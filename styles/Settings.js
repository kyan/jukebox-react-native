import React, { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222'
  },
  submitContainer: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  smallSquareButton: {
    borderWidth: 2,
    borderColor: '#4e4e4e',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white'
  },
  headerText: {
    color: 'white',
    marginBottom: 20
  },
  settingsForm: {
    flex: 1,
    marginTop: 200,
    justifyContent:'flex-start'
  },
  text: {
    color: 'white',
    marginRight: 10,
    fontFamily: 'Futura'
  },
  textInput: {
    height: 20,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white'
  }
});

module.exports = styles;
