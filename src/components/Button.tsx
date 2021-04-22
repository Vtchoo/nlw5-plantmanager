import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import colors from "../styles/colors"

interface ButtonProps extends TouchableOpacityProps {
    text: string
}

function Button({ text, ...props }: ButtonProps) {

    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={.7}
            {...props}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    }
})

export { Button }