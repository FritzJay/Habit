import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    AppRegistry
} from 'react-native';

export default class HabitCard extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View style={{                  // Main Container
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                alignSelf: 'stretch',
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                padding: 15,
                borderColor: '#EEE',
                borderStyle: 'solid',
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderRightWidth: 1
            }}>
                <View style={{                      //Top container (Img, title, and info)
                    flex: 10,
                    flexDirection: 'row',
                    marginBottom: 10
                }}>
                    <View style={{                  //IMG container
                        flex: 3,
                        alignItems: 'center',
                        marginBottom: -10,
                    }}>
                        <Image 
                            source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                            style={{
                                width: 100, 
                                height: 120
                        }}/>
                    </View>

                    <View style={{                  //Top right container (title, info)
                        flex: 4,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{                  //Title container
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={{              // Title
                                flex: 1,
                                borderStyle: 'solid',
                                borderBottomColor: '#CFCFCF',
                                borderBottomWidth: 1,
                                marginBottom: 5,
                            }}> 
                                {this.props.title}
                            </Text>
                            <Text style={{              //Info
                                flex: 3,
                                textAlign: 'center',
                                padding: 10,
                                borderColor: '#CFCFCF',
                                borderTopWidth: 1,
                                borderRightWidth: 2,
                                borderLeftWidth: 2,
                                borderBottomWidth: 3
                            }}>
                                {this.props.info}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{                          //Temporary StreakBar
                    flex: 1,
                    alignSelf: 'stretch',
                    backgroundColor: '#CCC',
                    height: 12,
                    marginRight: -15,
                    marginLeft: -15
                }} />
                <View style={{                          //Bottom Container (notes, icons, streak)
                    flex: 3,
                    flexDirection: 'row',
                    marginTop: 10
                }}>

                    <Text style={{                      //Notes
                        marginLeft: 15,
                        flex: 1,
                    }}>
                        {this.props.notes}
                    </Text>

                    <View style={{                      //Icons
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginRight: 15
                    }}>

                        <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                        <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                        <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                    </View>

                </View>
            </View>
        )
    }
}

AppRegistry.registerComponent('HabitCard', () => HabitCard);