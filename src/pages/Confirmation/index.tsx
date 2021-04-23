import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '../../components/Button'
import styles from './styles'

function Confirmation() {

    const navigation = useNavigation()

    function handleContinue() {
        navigation.navigate('PlantSelect')
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>😄</Text>

                <Text style={styles.title}>Prontinho</Text>
                <Text style={styles.subtitle}>Vamos começar a cuidar das duas plantinhas com muito cuidado.</Text>
                <View style={styles.footer}>
                    <Button text='Começar' onPress={handleContinue}/>
                </View>
            </View>

        </View>
    )
}

export { Confirmation }