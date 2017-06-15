import React, { Component } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import { 
    View,
    Text, 
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class EmptyCard extends Component {
    constructor (props) {
        super(props);

        this.onAddHabitPress = this.onAddHabitPress.bind(this);
    }

    onAddHabitPress () {
        console.log('AddHabit has been pressed')
    }

    render () {
        return (
            <View style={ styles.opacityContainer }>
                <View style={ styles.mainContainer }>
                    <View style={ styles.topContainer }>
                        <View style={ styles.imageContainer }>
                        </View>

                        <View style={ styles.topRightContainer}>
                            <View style={ styles.titleContainer }>
                                <Text>
                                </Text>
                                <Text style={ styles.info }>
                                </Text>
                            </View>
                        </View>
                    </View>

                    <ProgressBar
                        progress={ 0 }
                        accentColor={ '#000' }
                    />

                    <View style={ styles.bottomContainer }>

                        <Text style={ styles.notes }>
                        </Text>

                        <View style={ styles.iconContainer }>

                            <Image 
                                source={require('../icons/edit.png')}
                                style={ styles.icon }
                            />
                            <Image 
                                source={require('../icons/heart.png')}
                                style={ styles.icon }
                            />
                            <Image 
                                source={require('../icons/share.png')}
                                style={ styles.icon }
                            />
                            <Image 
                                source={require('../icons/notification.png')}
                                style={ styles.icon }
                            />
                        </View>

                    </View>
                </View>
                <View style={ styles.addHabitContainer}>
                    <TouchableOpacity
                        onPress={this.onAddHabitPress}
                    >
                        <Image
                            style={ styles.addHabitImage }
                            source={require('./AddHabit.png')}
                            tintColor={ this.props.accentColor }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    opacityContainer: {
        alignSelf: 'stretch'
    },
    addHabitContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    addHabitImage: {
        opacity: 0.87,
        width: 75,
        height: 75
    },
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
        opacity: 0.38,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15
    },
    iconButton: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    icon: {
        width: 20, 
        height: 20
    }
});