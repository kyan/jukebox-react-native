'use strict';

import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'
import Jukebox from './JukeboxAndroid'

class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
  }
}

export default class Main extends React.Component {
  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>
        <Schema name="tab" type="switch" icon={TabIcon} />

        <Route name="jukebox" component={Jukebox} initial={true} wrapRouter={true} title="Jukebox" hideNavBar={true} />
      </Router>
    );
  }
}

AppRegistry.registerComponent('JukeboxReactNative', () => Main);
