import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Modal, Image } from "react-native";
import { useEffect, useState, useRef } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export function Picture() {
    const camRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');

        })();
    }, [])

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text> Acesso Negado! </Text>;
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
            setOpen(false);
            navigation.navigate('Cadastro', { imgUri: data.uri });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            
            {capturedPhoto && (<Modal
                animationType="slide"
                transparent={true}
                visible={open}
            >
                <View style={styles.contentModal}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setOpen(false)
                            navigation.navigate('Cadastro');
                        }}
                    >
                        <FontAwesome name="close" size={50} color='#FFF'></FontAwesome>
                    </TouchableOpacity>

                    <Image style={styles.imgPhoto} source={{ uri: capturedPhoto }} />

                </View>
            </Modal>
            )}
            <Camera
                style={{ flex: 1, width: '100%', height: 40 }}
                type={type}
                ref={camRef}
            >
                <View style={styles.positionBtnCam}>
                    <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
                        <FontAwesome
                            name="camera"
                            size={43}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    buttonCamera: {
        alignItems:'center',
        backgroundColor: '#CBBE15',
        borderRadius: 10,
        position:'relative',
        width:60,
        height:55,
        justifyContent:'center',
    },
    positionBtnCam:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        margin:30,
    },
    contentModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        left: 2,
        margin: 10,

    },
    imgPhoto: {
        width: '100%',
        height: 400,
    },

})