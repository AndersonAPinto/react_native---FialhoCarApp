import { Placas } from './PlacasSalvas';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cadastro } from './Cadastro';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function TabNavigator(){
    return(
        <Tab.Navigator>
                <Tab.Screen
                    name="Cadastro"
                    component={Cadastro}
                    screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused,color,  }) => {
                            if (focused) {
                                return <MaterialCommunityIcons name="car-arrow-right" size={40} color={color} />
                            }
                            return <MaterialCommunityIcons name="car-arrow-right" size={40} color={color} />
                        },
                        tabBarActiveTintColor: '#9F7E06',
                    }}
                />
                <Tab.Screen
                    name="Placas Salvas"
                    component={Placas}
                    screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => {
                            if (focused) {
                                return <Entypo size={40} color={color} name='archive' />
                            }
                            return <Entypo size={40} color={color} name='archive' />
                        },
                        tabBarActiveTintColor: '#9F7E06',
                    }}
                />
                </Tab.Navigator>
    )
}