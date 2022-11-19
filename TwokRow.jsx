import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';


function TwokRow(props) {
    var twok = props.data.item

    let fontSize = 30 + 15 * twok.fontsize;

    const styles = StyleSheet.create({
        twokStyle: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - 80 - 2,
            backgroundColor: "#" + twok.bgcol
        },
        textStyle: {
            fontWeight: "700",
            color: "#" + twok.fontcol,
            fontSize: fontSize
        },
        twokkerBar: {
            flexDirection: "row",
            height: 80,
            backgroundColor: "#" + twok.bgcol
        },
        twokkerPic: {
            marginTop: 15,
            marginLeft: 20,
            height: 50,
            width: 50,


        },
        twokkerName: {
            fontSize: 40,
            fontWeight: "700",
            marginLeft: 30,
            marginTop: 15,
            color:"#" + twok.fontcol,

        },
        line: {
            height: 2,
            width: Dimensions.get('window').width,
            backgroundColor: "#" + twok.fontcol,

        },

    });

    return (
        <>
            <View style={styles.twokkerBar}>
                <Image
                    style={styles.twokkerPic}
                    source={require('./assets/TwitTokImg/defaultPic.png')}
                />
                <Text style={styles.twokkerName}>{twok.name}</Text>
            </View>

            <View style={styles.line}></View>
            <View style={[styles.twokStyle]}>
                <Text style={[styles.textStyle]}>{twok.text}</Text>
            </View>
        </>
    );


}




export default TwokRow;