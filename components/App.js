import React, { Component } from 'react';
import HabitContainer from 'components/HabitContainer';
import View from 'react-native';


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { user: '' }
    this.queryDB = this.queryDB.bind(this)
  }

  queryDB () {
    Axios.get(this.props.url)
    .then(res => {
      this.setState({ user: res.data });
    })
  }

  componentDidMount () {
    this.queryDB();
  }

  render () {
      return (
        <View>
            <HabitContainer habits={user.habits} url={this.props.url} />
        </View>
      );
  }
}