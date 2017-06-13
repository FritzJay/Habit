import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {

    constructor(props) {
        super(props);
    }

    handleNotification (data) {
        console.log("Handle Notification index: " + data.index);
        this.props.habitContainer.updateProgress(data.index);
    }

    componentDidMount () {
        PushNotification.configure({
            onNotification: this.handleNotification.bind(this),
            popInitialNotification: false,
            requestPermissions: true
        });
    }

    render() {
        console.log(this.props.habitContainer)
        return null;
    }
}