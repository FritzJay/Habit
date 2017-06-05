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
            password_confirmation: "",
            errors: [],
            showProgress: false
        }
    }

    redirect (routeName, accessToken) {
        this.props.navigator.push({
            name: routName
        });
    }

    async storeToken (accessToken) {
        try {
            await AsyncStorage.setItem('access_token', accessToken);
            console.log("Token was stored successfully");
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    }

    async onRegisterPressed () {
        this.setState({showProgress: true})
        try {
            let response = await fetch('https://192.168.0.108/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user:{
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                        password_confirmation: this.state.password_confirmation
                    }
                })
            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                let accessToken = res;
                console.log(accessToken);
                this.storeToken(accessToken);
                this.redirect('home');
            } else {
                let error = res;
                throw error;
            }
        } catch (error) {
            let formErrors = JSON.parse(errors);
            let errorsArray = [];
            for (var key in formErrors) {
                if (formErrors[key].length > 1) {
                    formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
                } else {
                    erorrsArray.push(`${key} ${formErrors[key]}`);
                }
            }
            this.setState({errors: errorsArray});
            this.setState({showProgress: false});    
        }
    }

    render () {
        return (
            <View>
                <Text> Join us now! </Text>
                <TextInput
                    onChangeInput={ (text) => this.setState({username: text}) }
                    placeholder="Username"
                >
                </TextInput>
                <TextInput
                    onChangeInput={ (text) => this.setState({password: text}) }
                    placeholder="Password"
                    secureTextEntry={true}
                >
                </TextInput>
                <TextInput
                    onChangeInput={ (text) => this.setState({Password: text}) }
                    placeholder="Password Confirm"
                    secureTextEntry={true}
                >
                </TextInput>
                <TouchableHighlight
                    onPress={this.onRegisterPressed.bind(this)}
                >
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
            {props.errors.map((error) => <Text key={i}> {error} </Text>)}
        </View>
    )
}

AppRegistry.registerComponent('Register', () => Register);