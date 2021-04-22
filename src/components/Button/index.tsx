import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../../styles/colors'

interface ButtonProps extends TouchableOpacityProps{
    text: string
}

function Button({ text, ...props }: ButtonProps) {

    return (
        <TouchableOpacity activeOpacity={.7} style={styles.container} {...props}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: colors.white,
    }
})

export { Button }