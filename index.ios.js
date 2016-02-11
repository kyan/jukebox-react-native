'use strict';
// import React, {
//   AppRegistry,
// } from 'react-native';

//var Jukebox = require('./components/jukebox.js')
var openConnection = require('./components/open_connection.js')

import React, {
  AppRegistry,
  Component,
  Image,
  SliderIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  artwork: {
    width: 200,
    height: 200,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  slider: {
    height: 10,
    margin: 10,
    width: 200
  }
});

class Jukebox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      track: {},
      rating: {},
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    openConnection(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.artwork}
          source={{uri: this.state.track.artwork_url}}
        />
        <Text style={styles.instructions}>
          {this.state.track.artist} '{this.state.track.title}'
        </Text>
        <Text style={styles.instructions}>
          {this.state.track.album}
        </Text>
        <Text style={styles.instructions}>
          Added by: {this.state.track.added_by}
        </Text>
        <Text style={styles.instructions}>
          Rating: {this.state.rating.rating || '-'}
        </Text>
        <SliderIOS
        style={styles.slider}
        //{...this.props}
        step={1}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(value) => this.setState({value: value})} />
      </View>
    );
  }
}


AppRegistry.registerComponent('JukeboxReactNative', () => Jukebox);
