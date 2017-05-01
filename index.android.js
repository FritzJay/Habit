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
            <App url={"http://" + Config.ip + ":" + Config.port + "/api/users/58e5f621734d1d12d73a0e5f"} />
        </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => Habit);