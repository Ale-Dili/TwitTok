import React, { Component, useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import ContextUserInfo from '../ContextUserInfo';
import defaultPic from '../assets/TwitTokImg/defaultPic.png'


//MANCA POSIZIONAMENTO VERTICALE
function TwokRow(props) {

    const context = useContext(ContextUserInfo)
    let helper = context.helper

    const [img, setImg] = useState(defaultPic)

    var twok = props.data.item;
    let fontSize = 15 + 10 * twok.fontsize;

    const styles = StyleSheet.create({
        twokStyle: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - 80 - 2,
            backgroundColor: "#" + twok.bgcol,
            alignItems: getTextAlign(twok.halign),
        },
        textStyle: {
            fontWeight: "700",
            color: "#" + twok.fontcol,
            fontSize: fontSize,

        },
        twokkerBar: {
            flexDirection: "row",
            height: 80,
            backgroundColor: "#" + twok.bgcol,
            flexDirection: "row",
            justifyContent: "space-between"
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
            color: "#" + twok.fontcol,
            marginEnd: 15

        },
        line: {
            height: 2,
            width: Dimensions.get('window').width,
            backgroundColor: "#" + twok.fontcol,

        },

    });


    useEffect(() => {
      //  console.log(context.sid)

        async function onMount() {
            if(!context.sid){       
                return <ActivityIndicator size="small" color="#000000"></ActivityIndicator>
            }
            let pic = await helper.getPicture(twok.uid, twok.pversion)
            if (pic) {
                //console.log(pic)
                setImg(pic)
            } else {
               // console.log('Utente ' + twok.uid + ' non ha foto')
                setImg(defaultPic)
                //console.log('Utente ' + twok.uid + ' non ha foto')
            }
        }
        onMount()
    }, [context])

    function renderImage() {
        //console.log('immagine da stampare '+state.img)
        //console.log(img)
        if (img === defaultPic){
            //console.log('in teoira qui')

            return (
                <Image
                style={styles.twokkerPic}
                source={img}
            />
            )
        }
        return (
            <Image
            style={styles.twokkerPic}
            source={{uri:img}}
        />
        )
    }

    //console.log('img:'+img)
    return (
        <>
            <View style={styles.twokkerBar}>
                {renderImage()}
                <TouchableOpacity onPress={() => props.navigate(twok.uid)} disabled={props.touchDisabled}>
                    <Text style={styles.twokkerName}>{twok.name}</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.line}></View>

            <View style={[styles.twokStyle]}>
                <View style={styles.verticalTextPositioning}>

                    <Text style={[styles.textStyle,]}>{twok.text}</Text>

                </View>

            </View>
        </>
    );


}



//ritorna left in caso di errore del dato
function getTextAlign(halign) {
    switch (halign) {
        case 0:
            return 'flex-start'
            break;
        case 1:
            return 'center'
            break;
        case 2:
            return 'flex-end'
            break;
        default:
            return 'left'

    }
}

function getVerticalPositioning(valign) {
    // valign += 1
    // var value = 40 + valign * 10
    return { top: '20%' }
}




export default TwokRow;