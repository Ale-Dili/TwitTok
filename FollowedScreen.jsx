import * as React from 'react';
import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FollowedUser from './FollowedUser';
import FollowedList from './FollowedList';

const Stack = createNativeStackNavigator();

class FollowedScreen extends Component {

    render() {
      //console.log(this.props.navigation.navigate)
      return (
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={FollowedList} />
          <Stack.Screen name="SingleUser" component={FollowedUser} /> 
        </Stack.Navigator>
      );
    }
  }

  export default FollowedScreen