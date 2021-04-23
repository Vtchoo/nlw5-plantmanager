import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../styles/colors'
import { Welcome } from '../pages/Welcome'
import { UserIndentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import { PlantSelect } from '../pages/PlantSelect'

const StackRoutes = createStackNavigator()

const AppRoutes = () => (
    <StackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <StackRoutes.Screen name='Welcome' component={Welcome}/>
        <StackRoutes.Screen name='UserIdentification' component={UserIndentification}/>
        <StackRoutes.Screen name='Confirmation' component={Confirmation}/>
        <StackRoutes.Screen name='PlantSelect' component={PlantSelect}/>
    </StackRoutes.Navigator>
)

export default AppRoutes