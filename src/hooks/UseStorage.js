import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {

    const getPlaca = async (key) => {
        try {
            const placas = await AsyncStorage.getItem(key);
            return JSON.parse(placas) || []
        } catch (error) {
            console.log('ERRO AO BUSCAR A PLACA', error)
            return [];
        }
    }

    const savePlaca = async (key, value) => {
        try {
            if (!value || !value.placa) {
               alert('Erro', 'Digite uma placa');
            } else {
                let placas = await getPlaca(key);
                placas.push(value); 
    
                await AsyncStorage.setItem(key, JSON.stringify(placas));
            }
        } catch (error) {
            console.log('Erro ao salvar a placa', error);
        }
    };

    const removePlaca = async (key, item) => {
        try {
            let placas = await getPlaca(key);
            let myPlacas = placas.filter((placas) => placas.placa !== item.placa)   
            await AsyncStorage.setItem(key, JSON.stringify(myPlacas))
            return myPlacas;
        } catch (error) {
            console.log('ERRO AO REMOVER A PLACA', error)
        }
    }
    return {
        getPlaca,
        savePlaca,
        removePlaca,
    };
}

export default useStorage;