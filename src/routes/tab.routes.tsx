import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../styles/colors'
import { PlantSelect } from '../pages/PlantSelect'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MyPlants } from '../pages/MyPlants'

const TabNavigator = createBottomTabNavigator()

function AuthRoutes() {

    return (
        <TabNavigator.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    height: 88,
                },
            }}
        >
            <TabNavigator.Screen
                name='Nova planta'
                component={PlantSelect}
                options={{
                    tabBarIcon: ({ size, color }) => <Icon name='plus-circle-outline' size={size} color={color}/>
                }}
            />
            <TabNavigator.Screen
                name='Minhas plantas'
                component={MyPlants}
                options={{
                    tabBarIcon: ({ size, color }) => <Icon name='sprout-outline' size={size} color={color}/>
                }}
            />
        </TabNavigator.Navigator>
    )
}

export default AuthRoutes