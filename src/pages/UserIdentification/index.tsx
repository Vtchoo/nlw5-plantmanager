import React, { useState } from 'react'
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { Button } from '../../components/Button'
import colors from '../../styles/colors'
import styles from './styles'
import { useNavigation } from '@react-navigation/core'

function UserIndentification() {

    const navigation = useNavigation()

    const [name, setName] = useState('')

    const [isFocused, setIsFocused] = useState(false)
    const [isFull, setIsFull] = useState(false)


    function handleInputBlur() {
        setIsFocused(false)
        setIsFull(!!name)
    }

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputChange(value: string) {
        setIsFocused(!!value)
        setName(value)
    }

    function handleSubmit() {
        navigation.navigate('Confirmation')
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <Text style={styles.emoji}>{isFull ? '😄' : '😃' }</Text>
                    
                    <Text style={styles.title}>{'Como podemos\nchamar você?'}</Text>
                    
                    <TextInput
                        style={[
                            styles.input,
                            (isFocused || isFull) && { borderColor: colors.green }
                        ]}
                        placeholder='Digite seu nome...'
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        onChangeText={handleInputChange}
                    />

                    <View style={styles.footer}>
                        <Button
                            text='Confirmar'
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export { UserIndentification }