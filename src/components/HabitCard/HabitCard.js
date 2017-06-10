import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import config from '../../config';
import ProgressBar from './ProgressBar/ProgressBar';
import PushController from '../PushController/PushController';
import { 
    View, 
    Text,
    Image,
    Vibration,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

export default class HabitCard extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isNotifiActive: false,
            id: this.props.id,
            interval: this.props.interval,
            progress: 0
        }

        this.updateProgress = this.updateProgress.bind(this);
    }

    onNotificationPressed () {
        Vibration.vibrate([0, 50]);
        if (!this.state.isNotifiActive) {
            console.log('Notification is now enabled');
            PushNotification.localNotificationSchedule({
                id: this.state.id,
                ticker: "My Notification Ticker",
                bigText: "My Big Text",
                smallText: "My Small Text",
                subText: "Subtext",
                vibrate: true,
                vibration: 300,
                tag: 'My Tag',
                ongoing: true,
                message: "My Notification Message",
                date: new Date(Date.now() + (5 * 1000)),
                title: "My Notification Title",
                playSound: true,
                soundName: 'default',
                number: '100',
                repeatType: 'time',
                repeatTime: (this.state.interval * 1000)
            })
            this.setState({
                isNotifiActive: true
            })
        } else {
            console.log('Notifications are now disabled.');
            PushNotification.cancelLocalNotifications({ id: this.state.id })
            this.setState({
                isNotifiActive: false
            })
        }
    }

    updateProgress () {
        // Find the total hours that this habit will be active for per day.
        let activeHours = 24;

        // Divide the active hours by the interval amount in order to find the total
        // number of ticks per day.
        let totalTicks = activeHours / this.state.interval;

        // Set the tick amount to 100 / the total number of ticks
        this.setState({ progress: this.state.progress + (100 / totalTicks) });
    }

    render () {
        return (
            <View style={ styles.mainContainer }>
                <View style={ styles.topContainer }>
                    <View style={ styles.imageContainer }>
                        <Image 
                            style={ styles.picture }
                            source={{ uri: "http://" + config.ip + ":" + config.port + "/pics/" + this.props.picture }}
                        />
                    </View>

                    <View style={ styles.topRightContainer}>
                        <View style={ styles.titleContainer }>
                            <Text 
                                style={ styles.title }> 
                                {this.props.title}
                            </Text>
                            <Text style={ styles.info }>
                                {this.props.info}
                            </Text>
                        </View>
                    </View>
                </View>

                <ProgressBar
                    progress={ this.state.progress }
                    accentColor={this.props.accentColor} 
                />

                <View style={ styles.bottomContainer }>

                    <Text style={ styles.notes }>
                        Notes will go here.
                    </Text>

                    <View style={ styles.iconContainer }>

                        <Image 
                            source={require('./icons/edit.png')}
                            style={ styles.icon }
                        />
                        <Image 
                            source={require('./icons/heart.png')}
                            style={ styles.icon }
                        />
                        <Image 
                            source={require('./icons/share.png')}
                            style={ styles.icon }
                        />
                        <TouchableHighlight
                            onPress={this.onNotificationPressed.bind(this)}
                        >
                            <View>
                                <Image 
                                    source={require('./icons/notification.png')}
                                    style={ styles.icon }
                                />
                            </View>
                        </TouchableHighlight>
                    </View>

                </View>
                <PushController 
                    updateProgress={this.updateProgress}
                    interval={this.state.interval}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignSelf: 'stretch',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        padding: 15,
        borderColor: '#EEE',
        borderLeftColor: '#FFF',
        borderTopColor: '#FFF',
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderRadius: 5
    },
    topContainer: {
        flex: 10,
        flexDirection: 'row',
        marginBottom: 10
    },
    imageContainer: {
        flex: 3,
        alignItems: 'center',
        marginBottom: -10,
    },
    picture: {
            width: 100, 
            height: 120
    },
    topRightContainer: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    title: {
        flex: 1,
        borderStyle: 'solid',
        borderBottomColor: '#CFCFCF',
        borderBottomWidth: 1,
        marginBottom: 15
    },
    info: {
        flex: 3,
        textAlign: 'center',
        padding: 10,
        borderColor: '#CFCFCF',
        borderTopWidth: 1,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 3
    },
    bottomContainer: {
        flex: 3,
        flexDirection: 'row',
        marginTop: 10
    },
    notes: {
        marginLeft: 15,
        flex: 1,
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15
    },
    icon: {
        width: 20, 
        height: 20
    }
});