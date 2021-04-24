import { useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '../../components/Button'
import styles from './styles'

export interface ConfirmationScreenParams {
    title: string
    subtitle: string
    buttonTitle: string
    icon: 'smile' | 'hug'
    nextScreen: string
}

const emojis = {
    hug: '🤗',
    smile: '😄'
}

function Confirmation() {

    const navigation = useNavigation()

    const routes = useRoute()
    const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as ConfirmationScreenParams

    function handleContinue() {
        navigation.navigate(nextScreen)
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{emojis[icon]}</Text>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <View style={styles.footer}>
                    <Button text={buttonTitle} onPress={handleContinue}/>
                </View>
            </View>

        </View>
    )
}

export { Confirmation }