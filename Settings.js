'use strict';

import React, {
  Component,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux'
var Device = require('react-native-device');

if (Device.isIpad()) {
  var Styles = require('./styles/SettingsIpad')
}
else {
  var Styles = require('./styles/Settings')
}

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userInitials: ''
    };
  }

  async componentDidMount() {
    var userId = await AsyncStorage.getItem('@User:current_user_id');
    this.setState({userId: userId});
  }

  onChangeUserId(text) {
    var userId = text.text;
    this.setState({userId: userId})
    try {
      AsyncStorage.setItem('@User:current_user_id', userId);
      console.log("Saved: " + userId);
    } catch (error) {
      console.log("AsyncStorage error:" + error.message);
    }
  }

  render(){
    return (
      <View style={Styles.container}>

        <View style={Styles.settingsForm}>
          <Text style={Styles.headerText}>Jukebox Credentials</Text>

          <View style={Styles.form}>
            <Text style={Styles.text}>User ID:</Text>
            <TextInput keyboardType='numeric' style={Styles.textInput}
              onChangeText={(text) => this.onChangeUserId({text})}
              value={this.state.userId}
            />
          </View>

          <View style={Styles.form}>
            <Text style={Styles.text}>User Initials:</Text>
            <TextInput style={Styles.textInput}
              onChangeText={(text) => this.onChangeUserId({text})}
              value={this.state.userInitials}
            />
          </View>
        </View>

        <View style={Styles.submitContainer}>
          <TouchableHighlight
            style={Styles.smallSquareButton}
            onPress={Actions.pop}
            underlayColor='transparent'
            >
            <Text style={Styles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = Settings;
