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
 import SplashScreen from './src/components/SplashScreen/SplashScreen';
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
    SplashScreen:   { screen: SplashScreen },
    Login:          { screen: Login    },
    Home:           { screen: Habit    },
    Register:       { screen: Register },
    HabitEditor:    { screen: HabitEditor },
})

AppRegistry.registerComponent('AwesomeProject', () => HabitRouter);
