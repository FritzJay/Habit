import React, { Component } from 'react';
import { 
    View, 
    Text
} from 'react-native';

export default class EmptyCard extends Component {
    render () {
        return (
            <View style={{                  // Main Container
                flex: 1,
                flexDirection: 'column',
                height: 181,
                backgroundColor: 'white',
                alignSelf: 'stretch',
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15
            }}>
                <Text style={{              // Title
                    flex: 1,

                }}> 
                    Empty Card
                </Text>
            </View>
        )
    }
}

AppRegistry.registerComponent('EmptyCard', () => EmptyCard);