import React, { useEffect, useState } from 'react'
import { Alert, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { Button } from '../../components/Button'
import colors from '../../styles/colors'
import styles from './styles'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

function UserIndentification() {

    const navigation = useNavigation()

    const [name, setName] = useState('')

    const [isFocused, setIsFocused] = useState(false)
    const [isFull, setIsFull] = useState(false)

    useEffect(() => { getStoredUsername() }, [])

    async function getStoredUsername() {
        const name = await AsyncStorage.getItem('@plantmanager:user')
        setName(name || '')
    }

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

    async function handleSubmit() {

        if (!name)
            return Alert.alert('Sem nome?', 'Me diz como chamar você')

        try {

            await AsyncStorage.setItem('@plantmanager:user', name)
        
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            })
            
        } catch (error) {
            console.log(error)
            Alert.alert('Ah não', 'Não foi possível salvar o seu nome')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <Text style={styles.emoji}>{isFull ? '😄' : '😃'}</Text>
                    
                        <Text style={styles.title}>{'Como podemos\nchamar você?'}</Text>
                    
                        <TextInput
                            value={name}
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