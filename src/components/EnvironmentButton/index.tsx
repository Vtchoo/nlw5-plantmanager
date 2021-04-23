import React from 'react'
import { Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import styles from './styles'

interface EnvironmentButtonProps extends RectButtonProps {
    title: string
    active?: boolean
}

function EnvironmentButton({ title, active = false, style, ...props}: EnvironmentButtonProps) {

    return (
        <RectButton
            style={[styles.container, active && styles.containerActive, style]}
            {...props}
        >
            <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
        </RectButton>
    )
}

export { EnvironmentButton }