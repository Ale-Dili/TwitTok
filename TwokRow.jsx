import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


function TwokRow(props) {
    var twok = props.data.item
    let fontSize = 30+15*twok.fontsize;
    console.log(fontSize)
    return (
        <View style={[styles.twokStyle,{backgroundColor:"#"+twok.bgcol, }]}>
            <Text style={[styles.textStyle,{color:"#"+twok.fontcol,fontSize:fontSize }]}>{twok.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    twokStyle: {
        width: Dimensions.get('window').width,
        
        height: Dimensions.get('window').height,

    },
    textStyle: {
        fontWeight: "700"
    }
});

export default TwokRow;