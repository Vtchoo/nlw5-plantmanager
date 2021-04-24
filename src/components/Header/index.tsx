import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'
import profileImg from '../../assets/profile.png'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Header() {

    const [name, setName] = useState('')

    useEffect(() => { fetchUserName() }, [])

    async function fetchUserName() {
        const name = await AsyncStorage.getItem('@plantmanager:user')
        setName(name || '')
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>{name}</Text>
            </View>
            <Image style={styles.image} source={{ uri: `https://github.com/${name}.png` }} onError={e => console.log(e)}/>
        </View>
    )
}

export { Header }