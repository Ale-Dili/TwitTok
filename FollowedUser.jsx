import * as React from 'react';
import {SafeAreaView, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Component } from 'react';
import TwokRow from './TwokRow';
import TwoksBuffer from './model/twoksBuffer';
import Helper from './viewModel/Helper';


const styles = StyleSheet.create({
    twokStyle: {
        width: "100%",
        height: Dimensions.get('window').height,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 40,
        fontWeight: "700"
    },
    buttonStyle: {
        borderRadius: 100,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fcba03'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

const sid = "KQW81h8HDaswwBIvBjG8"
//const helper = new Helper(sid)

class FollowedUser extends Component {
    helper

    state = {
        twoksBuffer: new TwoksBuffer(),
    }

    async loadData() {
        this.state.twoksBuffer = await this.helper.addTwok(this.state.twoksBuffer, sid)
        this.setState(this.state)
    }

    async componentDidMount() {
        this.helper = new Helper(sid)
        for (var i = 0; i < 5; i++) {
            this.state.twoksBuffer = await this.helper.addTwok(this.state.twoksBuffer, sid)
        }
        this.setState(this.state)
    }

    render() {

        //console.log("render called")
        //console.log(this.state.twoksBuffer.twoks)
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
                <SafeAreaView style={styles.container}>
                    <FlatList data={this.state.twoksBuffer.twoks}
                        renderItem={(twok) => { return <TwokRow data={twok} helper={this.helper} /> }}
                        keyExtractor={(twok, index) => index}
                        snapToInterval={Dimensions.get('window').height}
                        snapToAlignment="start"
                        decelerationRate="fast"
                        onScrollEndDrag={() => this.loadData()}
                    />

                </SafeAreaView>
                <View style={{ bottom: '2%', position: "absolute" }}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => this.setState(this.state)}>
                        <View>
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={require('./assets/TwitTokImg/plus-sign.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
export default FollowedUser

