import React from "react";
import { StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import {useFonts, Dosis_300Light,} from '@expo-google-fonts/dosis';


export function PlacasItem({ data, removePlaca, onPressImage }) {
    const [fontLoaded] = useFonts({
        Dosis_300Light, 
    });
    if(!fontLoaded){
        return null;
    }
    return (
        <Pressable onLongPress={removePlaca} style={styles.container}>
            <Text style={styles.text}>{data}</Text>
            <TouchableOpacity onPress={() => onPressImage(data)}>
                <Entypo size={50} color={'#C8BC16'} name="image-inverted" />
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0e0e0e',
        padding: 5,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text:{
        color: '#FFF',
        fontSize:22,
        fontFamily:'Dosis_300Light',
    },
})