import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import TwokRow from "./TwokRow";

const styles = StyleSheet.create({
    row: {

        width: Dimensions.get('window').width,
        height: 80,
        borderColor: '#aaaaaa',
        //borderBottomWidth:1,
        borderTopWidth: 1
    },
    twokkerPic: {
        marginTop: 15,
        marginStart: 5,
        height: 50,
        width: 50,
    },
    twokkerName: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: "700",
        marginEnd: 15

    },
    twokkerBar: {
        flexDirection: "row",
        width: Dimensions.get('window').width,
        height: 80,
        borderColor: '#aaaaaa',
        //borderBottomWidth:1,
        borderTopWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    }

});

function FollowedUserRow(props, { navigation }) {
    var user = props.data
    var index = props.index
    //console.log(user.uid)

    return (
        <TouchableOpacity onPress={() => (props.navigation.navigate('SingleUser',{uid:user.uid}))}>
            <View style={styles.twokkerBar}>
                <Image
                    style={styles.twokkerPic}
                    source={require('./assets/TwitTokImg/defaultPic.png')}
                />
                <Text style={styles.twokkerName}>
                    {user.name}
                </Text>
            </View>
        </TouchableOpacity>




    )


}

export default FollowedUserRow