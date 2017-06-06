'use strict';

import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    ActivityIndicator,
    AppRegistry
} from 'react-native';

export default class Register extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: [],
            showProgress: false
        }

        this.redirect = this.redirect.bind(this);
        this.onRegisterPressed = this.onRegisterPressed.bind(this);
        this.onLoginPressed = this.onLoginPressed.bind(this);
    }

    redirect (routeName, token) {
        const { navigate } = this.props.navigation;
        navigate(routeName, { token: token });
    }

    onRegisterPressed () {
        this.redirect('Register');
    }

    async getToken () {
        console.log("getToken");
        try {
            return await AsyncStorage.getItem('access_token') ? true : false;
        } catch (error) {
            console.error("Something went wrong in getToken.", error);
            return false;
        }
    }

    async storeToken (accessToken) {
        console.log("storeToken");
        console.log(accessToken)
        try {
            await AsyncStorage.setItem('access_token', accessToken);
            console.log("Token was stored successfully");
            this.redirect('Home', accessToken);
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    }

    async onLoginPressed () {
        this.setState({showProgress: true})
        try {
            let response = await fetch('http://192.168.0.108:3001/api/authenticate', {
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

    componentWillMount () {
        // Check if our current token is valid
        // if it is, skip the login page
        
    }

    render () {
        return (
            <View>
                <Text> Login: </Text>
                <TextInput
                    onChangeText={ (text) => this.setState({username: text}) }
                    placeholder="Username"
                >
                </TextInput>
                <TextInput
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