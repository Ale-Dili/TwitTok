import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Component } from 'react';
import Helper from './viewModel/Helper';
import FollowedUserRow from './FollowedUserRow';

const sid = "KQW81h8HDaswwBIvBjG8"

class FollowedList extends Component {
    state = {
        followed: []
    }
    
    helper
    async componentDidMount() {
        this.helper = new Helper(sid)
        this.state.followed = await this.helper.getFollowed(sid)
        //console.log(this.state.followed)
        this.setState(this.state)
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList data={this.state.followed} renderItem={({ item, index }) =>         
                        <FollowedUserRow data={item} index={index} navigation={this.props.navigation} ></FollowedUserRow>              
                }></FlatList>
            </SafeAreaView>
        )
    }
}
export default FollowedList