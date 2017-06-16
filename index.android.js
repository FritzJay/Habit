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
 import Login from './src/components/Authentication/Login/Login';
 import App from './src/components/App/App';
 import HabitEditor from './src/components/HabitEditor/HabitEditor';
 import Config from './src/config';

// --------------------- HABIT ------------------------
class Habit extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
    return (
        <View style={{flex:1}}>
            <App url={"http://" + Config.ip + ":" + Config.port + "/api"} navigation={this.props.navigation} />
        </View>
    );
    }
}

const HabitRouter = StackNavigator({
    Login:          { screen: Login    },
    Register:       { screen: Register },
    Home:           { screen: Habit    },
    HabitEditor:    { screen: HabitEditor }
})

AppRegistry.registerComponent('AwesomeProject', () => HabitRouter);
