import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Modal, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import  useStorage from '../hooks/UseStorage';
import { PlacasItem } from '../templates/setPlacas/PlacasItem';
import { FontAwesome } from '@expo/vector-icons';
import {useFonts, Dosis_300Light, Dosis_200ExtraLight, Dosis_700Bold, Dosis_800ExtraBold, Dosis_600SemiBold} from '@expo-google-fonts/dosis';



export function Placas() {
    const [listPlacas, setListPlacas] = useState([])
    const focused = useIsFocused();
    const { getPlaca, removePlaca } = useStorage();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState(null);



    useEffect(() => {
        async function loadPlacas() {
            const placas = await getPlaca('@pass')
            setListPlacas(placas)
        }
        loadPlacas();
    }, [focused])

    async function handlePressImage(imgUri) {
        setSelectedImageUri(imgUri);
        setIsModalVisible(true);
    }
    async function deletePlaca(item) {
        const delAndUpdatePlacas = await removePlaca('@pass', item);
        setListPlacas(delAndUpdatePlacas)
        alert('PLACA EXCLUÍDA');
    }
    const [fontLoaded] = useFonts({
        Dosis_300Light, 
        Dosis_200ExtraLight,
        Dosis_700Bold, 
        Dosis_800ExtraBold, 
        Dosis_600SemiBold,
    });
    if(!fontLoaded){
        return null;
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.header}>
                <Text style={styles.title}>Placas Cadastradas</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={listPlacas}
                    keyExtractor={(item) => item.placa} // Usa a propriedade 'placa' como chave
                    renderItem={({ item }) => (
                        <PlacasItem
                            data={item.placa}
                            removePlaca={() => deletePlaca(item)}
                            onPressImage={() => handlePressImage(item.imgUri)} // Função para lidar com a imagem
                        />
                    )}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.contentModal}>
                        <View style={styles.modalView}>
                            <Image source={{ uri: selectedImageUri }} style={styles.imgPhoto} />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    setIsModalVisible(false)
                                   
                                }}
                            >
                                <FontAwesome name="close" size={30} color='#FAE001'></FontAwesome>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor:'#CBBE15',
        paddingTop: 58,
        paddingRight: 14,
        paddingBottom: 14,
        paddingLeft: 17,
        
    },
    title: {
        fontSize: 25,
        color: '#FFF',
        fontFamily: 'Dosis_800ExtraBold',
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
        marginTop:10,
    },
    contentModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    closeButton: {
        position: 'absolute',
        left: 280,
        margin: 10,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 2,
        paddingBottom:2,
        paddingLeft: 3,
        paddingRight: 3,
        alignItems: "center",
        shadowColor: "#000",
    },
    imgPhoto: {
        width: 310, // Ajuste conforme necessário
        height: 550, // Ajuste conforme necessário
        resizeMode: 'contain'
    },

})