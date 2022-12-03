import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, Button, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

function Maps(props) {
  
    console.log(props.route.params.twok.lat)


    let lat = props.route.params.twok.lat
    let lon = props.route.params.twok.lon
    let name = props.route.params.twok.name

    console.log('lat: '+lat+', lon: '+lon)


    
    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: lat,
                longitude: lon,
                latitudeDelta: 1,
                longitudeDelta: 1,
            }}>
                <Marker
                    coordinate={{ latitude: lat, longitude: lon }}
                    title={name}
                    description="twokked from here" />

            </MapView>
        </View>

    )
}

export default Maps