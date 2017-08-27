'use strict';

import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    ActivityIndicator,
    AppRegistry,
    Keyboard
} from 'react-native';
import CheckBox from 'react-native-check-box'
import config from '../../../config.js'
import SplashScreen from '../../SplashScreen/SplashScreen';


export default class Register extends React.Component {
    static navigationOptions = {
        header: null
    };
    
    constructor (props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            token: "",
            errors: [],
            showProgress: false,
        };

        this.redirect = this.redirect.bind(this)
        this.onRegisterPressed = this.onRegisterPressed.bind(this)
        this.onLoginPressed = this.onLoginPressed.bind(this)
        this.storeToken = this.storeToken.bind(this)
        this.getToken = this.getToken.bind(this)
        this.clearShowSplash = this.clearShowSplash.bind(this)
    }

    redirect (routeName, token) {
        const { navigate } = this.props.navigation;
        navigate(routeName, { token: token });
    }

    onRegisterPressed () {
        this.redirect('Register');
        Keyboard.dismiss();
    }

    async onLoginPressed () {
        this.setState({showProgress: true})
        try {
            let response = await fetch('http://' + config.ip + ':' + config.port + '/api/authenticate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    session:{
                        username: this.state.username,
                        password: this.state.password
                    }
                })
            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                let result = JSON.parse(res);
                console.log("AccessToken:");
                console.log(result.token);
                Keyboard.dismiss();
                this.storeToken(result.token);
            } else {
                let error = res;
                console.log('Error!');
                throw error;
            }
        } catch (error) {
            let formErrors = JSON.parse(error);
            console.log(formErrors);
            this.setState({errors: formErrors});
            this.setState({showProgress: false});
        }
    }

    async storeToken (accessToken) {
        try {
            await AsyncStorage.setItem('access_token', accessToken);
            console.log("Login.storeToken: Token was stored successfully");
            this.redirect('Home', accessToken);
        } catch (error) {
            console.log("Login.storeToken: Something went wrong: " + error);
        }
    }

    async getToken () {
        // If a token is already stored on the device
        // redirect to home and send the token as a param
        AsyncStorage.getItem('access_token').then((data) => {
            if (data) {
                console.log('Login.getToken: data = ' + data)
                this.redirect('Home', data);
            }
        });
    }

    componentWillMount () {
        this.getToken()
    }

    async clearShowSplash () {
        // Temp function to clear showSplash AsyncStorage
        AsyncStorage.removeItem('seen_splash')
        console.log('Login.clearShowSplash: Cleared "seen_splash" from storage.')
    }

    render () {
        return (
            <View>
                <Text> Login: </Text>
                <TextInput
                    onChangeText={ (text) => this.setState({username: text}) }
                    value={this.state.username}
                    placeholder="Username"
                >
                </TextInput>
                <TextInput
                    value={this.state.password}
                    onChangeText={ (text) => this.setState({password: text}) }
                    placeholder="Password"
                    secureTextEntry={true}
                >
                </TextInput>
                <TouchableHighlight
                    onPress={this.onLoginPressed}
                >
                    <Text> Login </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.onRegisterPressed}>
                    <Text> Register </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.clearShowSplash}>
                    <Text> Clear 'seen_splash' </Text>
                </TouchableHighlight>

                <Errors errors={this.state.errors}/>

                <ActivityIndicator animating={this.state.showProgress} size="large" />
            </View>
        );
    }
}

const Errors = (props) => {
    return (
        <View>
            {props.errors.map((error, i) => <Text key={i}> {error} </Text>)}
        </View>
    )
}

AppRegistry.registerComponent('Login', () => Login);