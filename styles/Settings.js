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
    marginBottom: 20,
    flexDirection:'row',
    alignSelf: 'stretch',
    alignItems:'flex-end',
    justifyContent:'flex-end'
  },
  smallSquareButton: {
    flex: 1,
    flexDirection:'row',
    borderWidth: 2,
    borderColor: '#4e4e4e',
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Futura'
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Futura',
    marginBottom: 30
  },
  settingsForm: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginRight: 10,
    fontFamily: 'Futura'
  },
  form: {
    flexDirection:'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: 200,
    height: 28,
    paddingLeft: 5,
    fontSize: 18,
    margin: 1,
    fontFamily: 'Futura',
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white'
  }
});

module.exports = styles;
