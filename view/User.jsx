import * as React from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Component } from 'react';
import TwokRow from './TwokRow';
import TwoksBuffer from '../model/twoksBuffer';
import Helper from '../viewModel/Helper';
import { useEffect, useState, useContext } from 'react';
import ContextUserInfo from '../ContextUserInfo';
import following from '../assets/TwitTokImg/following.png'
import notFollowing from '../assets/TwitTokImg/notFollowing.png'


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

function User(props) {

    const [state, setState] = useState({ twoksBuffer: new TwoksBuffer(), following: false})
    const [img, setImg] = useState()
    //const [following, setFollowing] = useState(false)


    const context = useContext(ContextUserInfo)
    let helper = context.helper

   

    //-----RICORDARSI CHE LE IMMAGINI NELLA VARIABILI BISOGNA METTERE IL REQUIRE



    useEffect(() => {

        async function onMount() {
            
            
            if (!context.sid) {
                return <ActivityIndicator size="small" color="#000000"></ActivityIndicator>
            }
            console.log(props.route.params)
            
            let imgTemp
            if (await helper.isFollowed(props.route.params.uid)) {
                state.following = true
               imgTemp=following
            } else {
                state.following = false
                imgTemp=notFollowing

            }
            for (var i = 0; i < 5; i++) {
                state.twoksBuffer = await helper.addTwok(state.twoksBuffer, props.route.params.uid)
            }
            setImg(imgTemp)
            setState(state)
        }
        onMount()
    }, [context])




    async function loadData() {
        state.twoksBuffer = await helper.addTwok(state.twoksBuffer, props.route.params.uid)
        setState(state)
    }

    //gestisce il flag del follow
    async function handlingFollow() {
        let imgTemp
        if (state.following) {
            state.following = false
            imgTemp=notFollowing
            await helper.unfollow(props.route.params.uid)
        } else {
            state.following = true
            imgTemp=following
            await helper.follow(props.route.params.uid)
        }
       // console.log('foto cambiata in -> ' + state.img)
        setImg(imgTemp)
    }

    function renderImage() {
        //e.log('immagine da stampare '+state.img)
        return (
            <Image
                style={{ height: 50, width: 50 }} 
                source={img}
            />
        )
    }

    //console.log('foto renderizzata-> ' + state.img)

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
            <SafeAreaView style={styles.container}>
                <FlatList data={state.twoksBuffer.twoks}
                    renderItem={(twok) => { return <TwokRow data={twok} helper={helper} navigation ={props.navigation} touchDisabled={true} /> }}
                    keyExtractor={(twok, index) => index}
                    snapToInterval={Dimensions.get('window').height}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    onScrollEndDrag={() => loadData()}
                />

            </SafeAreaView>
            <View style={{ bottom: '2%', position: "absolute" }}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handlingFollow()}>
                    <View>
                        {renderImage()}
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}



// class User extends Component {
//     helper
//     uid

//     state = {
//         twoksBuffer: new TwoksBuffer(),
//     }

//     async loadData() {
//         this.state.twoksBuffer = await this.helper.addTwok(this.state.twoksBuffer,this.uid )
//         this.setState(this.state)
//     }

//     async componentDidMount() {
//         this.uid=this.props.route.params.uid
//         this.helper = new Helper(sid)
//         for (var i = 0; i < 5; i++) {
//             this.state.twoksBuffer = await this.helper.addTwok(this.state.twoksBuffer,this.uid)
//         }
//         this.setState(this.state)
//     }

//     render() {

//         //console.log("render called")
//         //console.log(this.state.twoksBuffer.twoks)
//         return (
//             <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
//                 <SafeAreaView style={styles.container}>
//                     <FlatList data={this.state.twoksBuffer.twoks}
//                         renderItem={(twok) => { return <TwokRow data={twok} helper={this.helper} touchDisabled={true}/> }}
//                         keyExtractor={(twok, index) => index}
//                         snapToInterval={Dimensions.get('window').height}
//                         snapToAlignment="start"
//                         decelerationRate="fast"
//                         onScrollEndDrag={() => this.loadData()}
//                     />

//                 </SafeAreaView>
//                 <View style={{ bottom: '2%', position: "absolute" }}>
//                     <TouchableOpacity
//                         style={styles.buttonStyle}
//                         onPress={() => this.setState(this.state)}>
//                         <View>
//                             <Image
//                                 style={{ height: 50, width: 50 }}
//                                 source={require('../assets/TwitTokImg/notFollowing.png')}
//                             />
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </SafeAreaView>
//         );
//     }
// }
export default User

