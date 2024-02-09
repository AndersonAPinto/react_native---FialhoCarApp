import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picture } from './templates/Picture';
import { TabNavigator } from './templates/TabNavigator';

const Stack = createNativeStackNavigator();

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Cadastro' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="TabNav" component={TabNavigator} />
                <Stack.Screen name="photo" component={Picture} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}