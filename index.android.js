import React, { Component } from 'react';
import { 
    AppRegistry, 
    View, 
    Text, 
    ScrollView,
    Image,
    StatusBar
 } from 'react-native';
 import { StackNavigator } from 'react-navigation';
 import Register from './src/components/Authentication/Register/Register';
 import App from './src/components/App/App'
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

const HabitRouter = StackNavigator({
    Register:   { screen: Register },
    Home:       { screen: Habit },
})

AppRegistry.registerComponent('AwesomeProject', () => HabitRouter);
