import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import TwokRow from "./TwokRow";
import defaultPic from '../assets/TwitTokImg/defaultPic.png'
import ContextUserInfo from '../ContextUserInfo';
import { useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

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

function FollowedUserRow(props) {
    const context = useContext(ContextUserInfo)
    let helper = context.helper

    const [img, setImg] = useState(defaultPic)

    var user = props.data
    var index = props.index
    //console.log(user.uid)
    useEffect(()=>{
              async function onMount() {
                if(!context.sid){       
                    return <ActivityIndicator size="small" color="#000000"></ActivityIndicator>
                }
                let pic = await helper.getPicture(user.uid, user.pversion)
                if (pic) {
                    //console.log(pic)
                    setImg(pic)
                } else {
                    console.log('Utente ' + user.uid + ' non ha foto')
                    setImg(defaultPic)
                    //console.log('Utente ' + twok.uid + ' non ha foto')
                }
            }
            onMount()
    },[user])


    function renderImage() {
            if (img === defaultPic) {
                return (
                    <Image
                        style={styles.twokkerPic}
                        source={img}
                    />
                )
            } else {
                return (
                    <Image
                        style={styles.twokkerPic}
                        source={{ uri: img }}
                    />
                )
            }




    }
    


    return (
        <TouchableOpacity onPress={() => (props.navigation.navigate('SingleUser', { uid: user.uid }))}>
            <View style={styles.twokkerBar}>
                {renderImage()}
                <Text style={styles.twokkerName}>
                    {user.name}
                </Text>
            </View>
        </TouchableOpacity>




    )



}

export default FollowedUserRow