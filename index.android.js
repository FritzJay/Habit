import React, { Component } from 'react';
import { 
    AppRegistry, 
    View, 
    Text, 
    ScrollView,
    Image,
    StatusBar
 } from 'react-native';
 import App from './src/components/App/App';
 import Config from './src/config';

// --------------------- HABIT ------------------------
class Habit extends Component {
  render() {
    return (
        <View style={{flex:1}}>
            <App url={"http://" + Config.ip + ":" + Config.port + "/api"} />
        </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => Habit);