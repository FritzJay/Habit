import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {

    constructor(props) {
        super(props);
    }

    handleNotification () {
        console.log(this.props.habit)
        this.props.habit.updateProgress(this.props.habit);
    }

    componentDidMount () {
        PushNotification.configure({
            onNotification: this.handleNotification.bind(this),
            popInitialNotification: false,
            requestPermissions: true
        });
    }

    render() {
        return null;
    }
}