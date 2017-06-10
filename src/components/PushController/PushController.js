import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {

    handleNotification (notification) {
        this.props.updateProgress();
    }

    componentDidMount () {
        PushNotification.configure({
            onNotification: (notification) => this.handleNotification(notification),
            popInitialNotification: true,
            requestPermissions: true
        
        });
    }

    render() {
        return null;
    }
}