import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from "react-native";
import useStorage from "../hooks/UseStorage";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useFonts, Dosis_300Light, Dosis_200ExtraLight, Dosis_700Bold, Dosis_800ExtraBold, Dosis_600SemiBold } from '@expo-google-fonts/dosis';
import { SafeAreaView } from "react-native-safe-area-context";

export function Cadastro() {
    const navigation = useNavigation();
    const { savePlaca } = useStorage();
    const [placa, setPlaca] = useState('');
    const [nome, setNome] = useState('')
    const [imgUri, setImgUri] = useState(null);
    const route = useRoute();

    
    async function savePlacasCadastradas() {

        const placaComNome = nome ? `${placa} - ${nome}` : placa;
        if (!placaComNome) {
            alert('DIGITE UMA PLACA');
            return;
        }
        if (!imgUri) {
            alert('TIRE UMA FOTO');
            return;
        }
        await savePlaca('@pass', { placa: placaComNome, imgUri });
        setPlaca('');
        setNome('')
        setImgUri(null);
        alert('PLACA SALVA COM SUCESSO');
    }
    useEffect(() => {
        if (route.params?.imgUri) {
            setImgUri(route.params.imgUri);
        }
    }, [route.params?.imgUri]);
    const [fontLoaded] = useFonts({
        Dosis_300Light,
        Dosis_200ExtraLight,
        Dosis_700Bold,
        Dosis_800ExtraBold,
        Dosis_600SemiBold,
    });
    if (!fontLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/fialho_car_removeBg.png')}
                    style={styles.pictureFialho}
                />
                <Text style={styles.textStart}>CONTROLE DE COMBUSTÍVEL</Text>
                <View style={styles.content}>
                    <TextInput
                        style={{
                            textAlign: 'center',
                            fontSize: 40,
                            backgroundColor: '#rgba(24, 24, 24, 0.2)',
                            borderRadius: 8,
                            marginBottom: 5,
                            fontFamily: 'Dosis_300Light',
                            textTransform: 'uppercase',
                        }}
                        placeholder="PLACA"
                        value={placa}
                        onChangeText={setPlaca}
                        autoCapitalize="characters"
                    />
                    <TextInput
                        style={styles.nome}
                        placeholder="Nome: (opcional)"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>
                <View style={styles.btnsCadastro}>
                    <TouchableOpacity style={[styles.btns, styles.buttonPhoto]} onPress={() => navigation.navigate('photo')}>
                        <Ionicons size={60} color={'black'} name="camera" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btns, styles.btnAdd]} onPress={savePlacasCadastradas}>
                        <Ionicons size={60} color={'black'} name="person-add" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    textStart: {
        marginBottom: '5%',
        fontSize: 21,
        fontFamily: 'Dosis_800ExtraBold',
    },
    content: {
        width: '70%',
        flexDirection: 'column',
    },
    nome: {
        padding: 2,
        fontSize: 22,
        marginTop: 2,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        borderRadius: 8,
        fontFamily: 'Dosis_300Light',
    },
    btnsCadastro: {
        width: '70%',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    btns: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPhoto: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CBBE15',
        borderRadius: 10,
        height: 70,
        width:50,
    },
    pictureFialho: {
        margin:5,
        width: 250,
        height: 130,
        borderRadius: 10,
    },
})